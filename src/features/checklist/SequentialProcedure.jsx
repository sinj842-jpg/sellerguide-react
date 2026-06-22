import { useRef, useState } from 'react'
import { useToast } from '../../context/ToastContext'

export function SequentialProcedure({ steps, isCompliance = false, onAllComplete, className = '' }) {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]))
  const [doneIndexes, setDoneIndexes] = useState(() => new Set())
  const stepRefs = useRef([])
  const { showToast } = useToast()

  function toggleOpen(index) {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function handleComplete(index) {
    setDoneIndexes((prev) => new Set(prev).add(index))
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      next.delete(index)
      if (index + 1 < steps.length) next.add(index + 1)
      return next
    })

    if (index + 1 < steps.length) {
      requestAnimationFrame(() => {
        stepRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    if (isCompliance) {
      showToast('마지막 행정 세팅 단계까지 완료했습니다.')
    } else {
      onAllComplete?.()
    }
  }

  return (
    <div className={`smartstore-steps${className ? ` ${className}` : ''}`}>
      {steps.map((step, index) => {
        const open = openIndexes.has(index)
        const done = doneIndexes.has(index)
        return (
          <article
            key={step.key ?? index}
            ref={(el) => {
              stepRefs.current[index] = el
            }}
            className={`smartstore-step${open ? ' open' : ''}${done ? ' done' : ''}`}
          >
            <button className="smartstore-trigger" type="button" onClick={() => toggleOpen(index)}>
              <i>{done ? '✓' : index + 1}</i>
              <span>
                <strong>{step.title}</strong>
                <span>{step.summary}</span>
              </span>
              <b>{open ? '⌃' : '⌄'}</b>
            </button>
            <div className="smartstore-content">
              {step.content}
              <div className="step-complete-row">
                <button
                  className="step-complete-btn"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    handleComplete(index)
                  }}
                >
                  {index === steps.length - 1 ? '완료' : '완료하고 다음으로'}
                </button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
