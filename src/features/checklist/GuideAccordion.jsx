import { useState } from 'react'

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
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
