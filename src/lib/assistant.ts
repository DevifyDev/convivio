export type AssistantHistoryMessage = {
  role: "user" | "assistant"
  content: string
}

type StreamAssistantOptions = {
  apiUrl: string
  siteId: string
  message: string
  history: AssistantHistoryMessage[]
  signal?: AbortSignal
  onStart?: (requestId: string) => void
  onDelta: (delta: string) => void
  onDone?: (requestId: string) => void
}

type StreamEventPayload = {
  requestId?: string
  delta?: string
  message?: string
}

function processEventBlock({
  block,
  onStart,
  onDelta,
  onDone,
}: {
  block: string
  onStart?: (requestId: string) => void
  onDelta: (delta: string) => void
  onDone?: (requestId: string) => void
}) {
  const lines = block.split(/\r?\n/)

  let eventName = "message"
  const dataLines: string[] = []

  for (const line of lines) {
    if (line.startsWith("event:")) {
      eventName = line
        .slice("event:".length)
        .trim()

      continue
    }

    if (line.startsWith("data:")) {
      dataLines.push(
        line.slice("data:".length).trimStart(),
      )
    }
  }

  if (!dataLines.length) {
    return
  }

  const data = JSON.parse(
    dataLines.join("\n"),
  ) as StreamEventPayload

  if (
    eventName === "start" &&
    data.requestId
  ) {
    onStart?.(data.requestId)
    return
  }

  if (
    eventName === "delta" &&
    typeof data.delta === "string"
  ) {
    onDelta(data.delta)
    return
  }

  if (
    eventName === "done" &&
    data.requestId
  ) {
    onDone?.(data.requestId)
    return
  }

  if (eventName === "error") {
    throw new Error(
      data.message ||
        "The assistant stream failed.",
    )
  }
}

export async function streamAssistantReply({
  apiUrl,
  siteId,
  message,
  history,
  signal,
  onStart,
  onDelta,
  onDone,
}: StreamAssistantOptions) {
  const baseUrl = apiUrl.replace(/\/$/, "")

  const response = await fetch(
    `${baseUrl}/v1/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },

      body: JSON.stringify({
        siteId,
        message,
        history,
      }),

      signal,
    },
  )

  if (!response.ok) {
    let errorMessage =
      "The assistant is temporarily unavailable."

    try {
      const data = (await response.json()) as {
        error?: string
      }

      if (data.error) {
        errorMessage = data.error
      }
    } catch {
    }

    throw new Error(errorMessage)
  }

  if (!response.body) {
    throw new Error(
      "The assistant returned no response stream.",
    )
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ""

  try {
    while (true) {
      const {done, value} =
        await reader.read()

      buffer += decoder.decode(value, {
        stream: !done,
      })

      const eventBlocks =
        buffer.split(/\r?\n\r?\n/)

      buffer = eventBlocks.pop() ?? ""

      for (const block of eventBlocks) {
        if (!block.trim()) {
          continue
        }

        processEventBlock({
          block,
          onStart,
          onDelta,
          onDone,
        })
      }

      if (done) {
        break
      }
    }

    if (buffer.trim()) {
      processEventBlock({
        block: buffer,
        onStart,
        onDelta,
        onDone,
      })
    }
  } finally {
    reader.releaseLock()
  }
}