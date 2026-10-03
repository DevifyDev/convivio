'use client'

import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import {
  streamAssistantReply,
  type AssistantHistoryMessage
} from '@/lib/assistant'
import styles from './Chat.module.css'

type ChatMessage = AssistantHistoryMessage & {
  id: string
  status: 'complete' | 'streaming' | 'error'
}

type ChatProps = {
  bookingUrl?: string
  giftCardUrl?: string
}

const apiUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL
const siteId = process.env.NEXT_PUBLIC_ASSISTANT_SITE_ID

const suggestions = [
  'What are this week’s specials?',
  'Tell me about the menu and wine list',
  'How do I get there?'
]

export default function Chat({
  bookingUrl,
  giftCardUrl
}: ChatProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showLauncher, setShowLauncher] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const dialogRef = useRef<HTMLDialogElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const followRepliesRef = useRef(true)
  const loadingRef = useRef(false)

  function openChat(opener?: HTMLElement) {
    openerRef.current =
      opener ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null)

    setIsOpen(true)
  }

  function closeChat() {
    setIsOpen(false)
  }

  useEffect(() => {
    setMounted(true)

    return () => {
      abortRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const hero = document.getElementById('home')
    const footer =
      document.querySelector<HTMLElement>('[data-site-footer]') ??
      document
        .querySelector<HTMLAnchorElement>('a[href="/studio"]')
        ?.closest('footer')

    let frame = 0

    function updateLauncher() {
      frame = 0

      // Show once 48px of the section below the hero is exposed.
      setShowLauncher(
        hero
          ? hero.getBoundingClientRect().bottom <= window.innerHeight - 104
          : window.scrollY > 104
      )

      // Keep the launcher above the site footer.
      const footerTop = footer?.getBoundingClientRect().top
      const lift =
        footerTop === undefined
          ? 0
          : Math.max(0, window.innerHeight - footerTop)

      launcherRef.current?.style.setProperty(
        '--footer-lift',
        `${lift}px`
      )
    }

    function requestUpdate() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateLauncher)
      }
    }

    function handleAssistantLink(event: MouseEvent) {
      if (!(event.target instanceof Element)) return

      const link = event.target.closest<HTMLAnchorElement>(
        'a[href="#assistant"]'
      )

      if (!link) return

      event.preventDefault()
      openChat(link)
    }

    function handleOpenEvent() {
      openChat()
    }

    const observer = new ResizeObserver(requestUpdate)

    if (hero) observer.observe(hero)
    if (footer) observer.observe(footer)

    observer.observe(document.body)
    updateLauncher()

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('open-website-assistant', handleOpenEvent)
    document.addEventListener('click', handleAssistantLink)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()

      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('open-website-assistant', handleOpenEvent)
      document.removeEventListener('click', handleAssistantLink)
    }
  }, [mounted])

  useEffect(() => {
    const dialog = dialogRef.current

    if (!mounted || !dialog) return

    if (!isOpen) {
      if (dialog.open) dialog.close()
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.body.classList.add('assistant-open')

    dialog.showModal()

    // Avoid opening the mobile keyboard until the visitor selects the input.
    dialog.querySelector<HTMLButtonElement>('button')?.focus({
      preventScroll: true
    })

    return () => {
      if (dialog.open) dialog.close()

      document.body.classList.remove('assistant-open')
      document.body.style.overflow = previousOverflow

      const opener = openerRef.current

      if (opener?.isConnected && opener.getClientRects().length) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [isOpen, mounted])

  useEffect(() => {
    const conversation = conversationRef.current

    if (!isOpen || !conversation || !followRepliesRef.current) return

    conversation.scrollTop = conversation.scrollHeight
  }, [messages, isOpen])

  async function sendMessage(value: string) {
    const message = value.trim()

    if (!message || loadingRef.current) return

    if (!apiUrl || !siteId) {
      setError(
        'The assistant is not connected yet. Please try again shortly.'
      )
      return
    }

    loadingRef.current = true
    followRepliesRef.current = true

    setIsLoading(true)
    setError('')

    const history = messages
      .filter((item) => item.status === 'complete')
      .slice(-8)
      .map(({ role, content }) => ({ role, content }))

    const replyId = crypto.randomUUID()
    const controller = new AbortController()

    abortRef.current = controller

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        status: 'complete'
      },
      {
        id: replyId,
        role: 'assistant',
        content: '',
        status: 'streaming'
      }
    ])

    setInput('')

    try {
      await streamAssistantReply({
        apiUrl,
        siteId,
        message,
        history,
        signal: controller.signal,

        onDelta(delta) {
          setMessages((current) =>
            current.map((item) =>
              item.id === replyId
                ? {
                    ...item,
                    content: item.content + delta
                  }
                : item
            )
          )
        }
      })

      setMessages((current) =>
        current.map((item) =>
          item.id === replyId
            ? {
                ...item,
                status: 'complete',
                content:
                  item.content ||
                  'No reply came through. Please try again.'
              }
            : item
        )
      )
    } catch (requestError) {
      if (controller.signal.aborted) return

      console.error('Assistant request failed:', requestError)

      setMessages((current) =>
        current.map((item) =>
          item.id === replyId
            ? {
                ...item,
                status: 'error',
                content:
                  'Sorry, I couldn’t finish that reply. Please try again, or contact the team using the details below.'
              }
            : item
        )
      )
    } finally {
      loadingRef.current = false
      abortRef.current = null
      setIsLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(input)
  }

  function handleInputKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      <button
        ref={launcherRef}
        type='button'
        className={`${styles.launcher} ${
          showLauncher && !isOpen ? styles.launcherVisible : ''
        }`}
        aria-label='Open Convivio AI assistant'
        aria-haspopup='dialog'
        aria-controls='convivio-assistant'
        tabIndex={showLauncher && !isOpen ? 0 : -1}
        onClick={(event) => openChat(event.currentTarget)}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          aria-hidden='true'
        >
          <path
            d='M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z'
            strokeLinejoin='round'
          />
          <path d='M7 10h8M7 14h5' strokeLinecap='round' />
        </svg>

        Ask Convivio
      </button>

      <dialog
        ref={dialogRef}
        id='convivio-assistant'
        className={styles.dialog}
        aria-labelledby='convivio-assistant-title'
        onCancel={(event) => {
          event.preventDefault()
          closeChat()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeChat()
        }}
        onWheel={(event) => {
          if (event.target === event.currentTarget) closeChat()
        }}
        onTouchMove={(event) => {
          if (event.target === event.currentTarget) closeChat()
        }}
      >
        <div className={styles.panel}>
          <header className={styles.header}>
            <div>
            <p className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden='true' />
              Online
            </p>
              <h2
                id='convivio-assistant-title'
                className={styles.title}
              >
                Ask Convivio
              </h2>
            </div>

            <button
              type='button'
              className={styles.closeButton}
              aria-label='Close assistant'
              onClick={closeChat}
            >
              ×
            </button>
          </header>

          <div
            ref={conversationRef}
            className={styles.messages}
            role='log'
            aria-label='Conversation'
            aria-live='polite'
            aria-relevant='additions text'
            aria-busy={isLoading}
            onScroll={(event) => {
              const element = event.currentTarget

              followRepliesRef.current =
                element.scrollHeight -
                  element.scrollTop -
                  element.clientHeight <
                80
            }}
          >
            <div className={styles.assistantMessage}>
              Welcome to Convivio! I can help with the menu, wine list,
              weekly specials, directions, bookings and gift cards.
              What would you like to know?
            </div>

            {messages.length === 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((suggestion) => (
                  <button
                    type='button'
                    key={suggestion}
                    disabled={isLoading}
                    onClick={() => void sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage
                }
              >
                <span className={styles.srOnly}>
                  {message.role === 'user' ? 'You: ' : 'Assistant: '}
                </span>

                {message.content || 'Thinking…'}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            {bookingUrl && (
              <a
                href={bookingUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Book a table
              </a>
            )}

            {giftCardUrl && (
              <a
                href={giftCardUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Gift cards
              </a>
            )}

            <a href='#location' onClick={closeChat}>
              Contact the team
            </a>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label
              className={styles.srOnly}
              htmlFor='assistant-message'
            >
              Your message
            </label>

            <textarea
              id='assistant-message'
              className={styles.input}
              value={input}
              maxLength={1000}
              rows={2}
              placeholder='What would you like to know?'
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />

            {error && (
              <p className={styles.error} role='alert'>
                {error}
              </p>
            )}

            <button
              type='submit'
              className={styles.sendButton}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? 'Replying…' : 'Send message'}
            </button>
          </form>

          <p className={styles.notice}>
            AI replies can make mistakes. Please don’t share sensitive
            information.
          </p>
        </div>
      </dialog>
    </>,
    document.body
  )
}