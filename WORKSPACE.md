# Workspace Export
Generated: 2026-10-03T10:05:42.073Z

## ./src/components/Events/Events.module.css
```css
.events {
  position: relative;
  z-index: 1;
  padding-block: 6rem;
  padding-inline: 6rem;
  background: var(--dark-background);
  color: var(--light-text);
}

.events::before,
.events::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 24px;
  background: var(--dark-background);
  filter: url('#roughen');
  pointer-events: none;
}

.events::before {
  top: -12px;
}

.events::after {
  bottom: -12px;
}

.container {
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

/* SECTION HEADINGS */

.weeklySection {
  margin-top: 5rem;
}

.specialSection {
  margin-top: 6rem;
}

.subheadingRow {
  margin-bottom: 2rem;
}

.sectionEyebrow {
  margin: 0 0 0.6rem;
  color: var(--primary-gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.subheading {
  margin: 0;
  color: var(--light-text);
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: -1px;
}

/* WEEKLY EVENTS */

.weeklyGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 1.25rem;
}

.weeklyCard {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  align-items: start;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  border: 0.25px solid rgba(200, 185, 149, 0.7);
  background: rgba(248, 247, 244, 0.035);
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}

.weeklyCard:hover {
  transform: translateY(-2px);
}

.dayName {
  margin: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--primary-gold);
  color: var(--primary-gold);
  font-family: var(--display-font), serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: anywhere;
}

:global(html[data-theme='convivio']) .dayName {
  position: relative;
  width: max-content;
  max-width: 100%;
  justify-self: center;
  padding-bottom: 0.85rem;
  border-bottom: 0;
}

:global(html[data-theme='convivio']) .dayName::after,
:global(html[data-theme='convivio']) .date::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 8px;
  background: var(--primary-gold);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='8' viewBox='0 0 32 8'%3E%3Cpath d='M0 4 Q8 0 16 4 T32 4' fill='none' stroke='black' stroke-width='0.75'/%3E%3C/svg%3E") left center / 32px 8px repeat-x;
}

.weeklyContent {
  min-width: 0;
}

.weeklyTitle {
  margin: 0 0 0.4rem;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.2;
}

.weeklyTime {
  margin: 0 0 0.9rem;
  color: var(--primary-gold);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.weeklyDescription {
  margin: 0;
  color: var(--light-text);
  opacity: 0.9;
  font-size: 0.85rem;
  font-weight: 200;
  line-height: 1.6;
  white-space: pre-line;
}

.weeklyPrice {
  margin: 0 0 0.9rem;
  color: var(--accent-on-dark, var(--primary-gold));
  font-family: var(--body-copy-font), serif;
  font-size: 1rem;
  font-weight: 700;
}

/* SPECIAL EVENTS */

.specialEvents {
  display: grid;
  gap: 1rem;
}

.specialEvent {
  display: grid;
  grid-template-columns: 5rem 13rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem 1rem 1.5rem;
  border: 0.25px solid rgba(200, 185, 149, 0.7);
  background: rgba(248, 247, 244, 0.035);
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}

.specialEvent:hover {
  transform: translateY(-2px);
}

.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dateDay {
  color: var(--primary-gold);
  font-family: var(--display-font), serif;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
}

.dateMonth {
  margin-top: 0.4rem;
  color: rgba(242, 242, 242, 0.65);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.eventImage {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.eventImage:empty {
  visibility: hidden;
}

.image {
  object-fit: cover;
}

.eventContent {
  min-width: 0;
}

.eventMeta {
  margin: 0 0 0.5rem;
  color: var(--primary-gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.eventTitle {
  margin: 0 0 0.6rem;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
}

.eventDescription {
  max-width: 38rem;
  margin: 0;
  color: var(--light-text);
  opacity: 0.9;
  font-size: 0.85rem;
  font-weight: 200;
  line-height: 1.6;
}

.price {
  margin: 0;
  color: var(--light-text);
  font-family: var(--display-font), serif;
  font-size: 1.05rem;
  white-space: nowrap;
}

/* CONVIVIO THEME */

:global(html[data-theme='convivio']) .sectionEyebrow,
:global(html[data-theme='convivio']) .dayName,
:global(html[data-theme='convivio']) .weeklyTime,
:global(html[data-theme='convivio']) .dateDay,
:global(html[data-theme='convivio']) .eventMeta {
  color: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .dateMonth {
  color: var(--accent-on-dark);
  font-family: var(--display-font);
  font-size: 1.1rem;
}

:global(html[data-theme='convivio']) .dayName::after,
:global(html[data-theme='convivio']) .date::after {
  background: var(--accent-on-dark);
}

:global(html[data-theme='convivio']) .date {
  position: relative;
  width: max-content;
  max-width: 100%;
  justify-self: center;
  padding-bottom: 0.85rem;
}

/* CONTINUOUS DAY AND DATE RIPPLES */

@keyframes dayWaveRipple {
  from {
    -webkit-mask-position: 0 center;
    mask-position: 0 center;
  }

  to {
    -webkit-mask-position: 32px center;
    mask-position: 32px center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  :global(html[data-theme='convivio']) .dayName::after,
  :global(html[data-theme='convivio']) .date::after {
    animation: dayWaveRipple 4000ms linear infinite;
  }

  :global(html[data-theme='convivio'])
    .weeklyCard:nth-child(even) .dayName::after,
  :global(html[data-theme='convivio'])
    .specialEvent:nth-child(even) .date::after {
    animation-delay: -2000ms;
  }
}

/* SMALL DESKTOP / TABLET */

@media (max-width: 1350px) {
  .events {
    padding-inline: 3rem;
  }

  .specialEvent {
    grid-template-columns: 5rem 11rem minmax(0, 1fr);
  }

  .price {
    grid-column: 3;
  }
}

/* MOBILE / NARROW TABLET */

@media (max-width: 1000px) {
  .events {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .weeklySection {
    margin-top: 4rem;
  }

  .specialSection {
    margin-top: 4rem;
  }

  .weeklyGrid {
    grid-template-columns: 1fr;
  }

  .specialEvent {
    grid-template-columns: 4.5rem 9rem minmax(0, 1fr);
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .eventImage {
    grid-column: 2;
  }

  .eventContent {
    grid-column: 3;
  }

  .price {
    grid-column: 3;
  }

  .date {
    grid-row: auto;
    padding-top: 0;
  }

  .eventTitle {
    font-size: 1.3rem;
  }
}

/* SMALL MOBILE */

@media (max-width: 550px) {
  .weeklyCard {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    padding: 1.5rem;
  }

  .dayName {
    font-size: 0.9rem;
  }

  .weeklyCard .dayName {
    justify-self: start;
    text-align: left;
  }

  .specialEvent {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }

  .date {
    grid-row: auto;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  :global(html[data-theme='convivio']) .date {
    justify-self: start;
  }

  .dateDay {
    font-size: 2rem;
  }

  .dateMonth {
    margin-top: 0;
  }

  .eventImage,
  .eventContent,
  .price {
    grid-column: 1;
  }

  .eventImage {
    width: 100%;
    height: 11rem;
    aspect-ratio: auto;
  }

  .eventImage:empty {
    display: none;
  }
}
```

## ./src/components/Faq/Faq.module.css
```css
.faq {
  position: relative;
  z-index: 1;
  padding: 6rem;
  background: var(--primary-black);
  color: var(--light-text);
}

.container {
  position: relative;
  width: 100%;
  max-width: var(--page-width);
  margin-inline: auto;
}

.questions {
  max-width: 54rem;
  margin: 4rem auto 0;
}

.item {
  margin: 0;
  border-bottom: 1px solid rgb(248 247 244 / 0.1);
}

.question {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) 1.5rem;
  align-items: center;
  gap: 1.25rem;
  padding-block: 1.75rem;
  border: 0;
  background: transparent;
  color: var(--light-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.questionText {
  font-family: var(--body-copy-font), sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.toggle {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  justify-self: end;
}

.toggle::before,
.toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1px;
  background: var(--primary-gold);
  transform: translate(-50%, -50%);
}

.toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
  transition: transform 180ms ease;
}

.item[data-open='true'] .toggle::after {
  transform: translate(-50%, -50%) rotate(0);
}

.question:focus-visible {
  outline: 2px solid var(--primary-gold);
  outline-offset: 4px;
}

.answerPanel {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  opacity: 0;
  transition:
    grid-template-rows 480ms ease,
    opacity 360ms ease;
}

.item[data-open='true'] .answerPanel {
  grid-template-rows: 1fr;
  opacity: 1;
}

.answerInner {
  min-height: 0;
  overflow: hidden;
}

.answer {
  max-width: 44rem;
  margin: -0.25rem 2.75rem 2rem 0;
  color: rgb(248 247 244 / 0.85);
  font-family: var(--body-copy-font), sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

/* Convivio theme */

:global(html[data-theme='convivio']) .faq {
  background: var(--primary-blue);
}

:global(html[data-theme='convivio']) .faq::before,
:global(html[data-theme='convivio']) .faq::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 24px;
  background: var(--primary-blue);
  filter: url('#roughen');
  clip-path: inset(-12px 0);
  pointer-events: none;
}

:global(html[data-theme='convivio']) .faq::before {
  top: -12px;
}

:global(html[data-theme='convivio']) .faq::after {
  bottom: -12px;
}

:global(html[data-theme='convivio']) .questions {
  margin-top: 2.5rem;
}

@media (max-width: 800px) {
  .faq {
    padding-block: 4rem;
    padding-inline: var(--inline-padding);
  }

  .questions {
    margin-top: 3rem;
  }

  .question {
    grid-template-columns: minmax(0, 1fr) 1.25rem;
    gap: 0.75rem;
    padding-block: 1.5rem;
  }

  .questionText {
    font-size: 1rem;
  }

  .answer {
    margin: -0.25rem 2rem 1.75rem 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toggle::after,
  .answerPanel {
    transition: none;
  }
}
```