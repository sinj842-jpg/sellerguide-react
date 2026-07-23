import { useState } from 'react'

export function GuideSubAccordion({ criteriaGuide }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`guide-sub-accordion${open ? ' open' : ''}`}>
      <button className="guide-sub-trigger" type="button" onClick={() => setOpen((prev) => !prev)}>
        <span>{criteriaGuide.title}</span>
        <i>{open ? '⌃' : '⌄'}</i>
      </button>
      {open && (
        <div className="guide-sub-content">
          <p className="guide-sub-intro">{criteriaGuide.intro}</p>
          <div className="guide-type-examples">
            {criteriaGuide.examples.map((item) => (
              <div className="guide-type-card" key={item.type}>
                <strong>{item.type}</strong>
                <span className="guide-type-criteria">{item.criteria}</span>
                <span className="guide-type-example">예시: {item.example}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function GuideNoteBox({ note }) {
  return (
    <div className="guide-note-box">
      <strong>{note.title}</strong>
      {note.body.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  )
}

export function GuideAccordion({ items }) {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]))

  function toggle(index) {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="guide-accordion" aria-label="실행 가이드 아코디언">
      {items.map((guide, index) => {
        const open = openIndexes.has(index)
        return (
          <article key={`${guide.title}-${index}`} className={`guide-item${open ? ' open' : ''}`}>
            <button className="guide-trigger" type="button" onClick={() => toggle(index)}>
              <span>
                <b>{index + 1}</b>
                {guide.title}
              </span>
              <i>{open ? '⌃' : '⌄'}</i>
            </button>
            <div className="guide-content">
              <div className="guide-sequence">
                <div className="guide-sequence-copy">
                  <strong>
                    {index + 1}. {guide.title}
                  </strong>
                </div>
                <div className="guide-shot">
                  안내 이미지
                  <br />
                  {index + 1}
                </div>
                <div className="guide-sequence-copy">
                  <p>{guide.body}</p>
                  {guide.criteriaGuide && <GuideSubAccordion criteriaGuide={guide.criteriaGuide} />}
                  {guide.note && <GuideNoteBox note={guide.note} />}
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
