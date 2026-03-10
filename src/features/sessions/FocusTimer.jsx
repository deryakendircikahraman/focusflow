import { useEffect, useState } from 'react'

const FOCUS_MINUTES = 25
const BREAK_MINUTES = 5

function FocusTimer() {
  const [mode, setMode] = useState('focus') // 'focus' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_MINUTES * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === 'focus' ? 'break' : 'focus'
          setMode(nextMode)
          return (nextMode === 'focus' ? FOCUS_MINUTES : BREAK_MINUTES) * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning, mode])

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  function handleStartPause() {
    setIsRunning((prev) => !prev)
  }

  function handleReset() {
    setIsRunning(false)
    setMode('focus')
    setSecondsLeft(FOCUS_MINUTES * 60)
  }

  return (
    <section className="timer">
      <h2>Focus timer</h2>
      <p className="timer__mode">{mode === 'focus' ? 'Focus time' : 'Break time'}</p>
      <p className="timer__time">
        {minutes}:{seconds}
      </p>
      <div className="timer__actions">
        <button type="button" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  )
}

export default FocusTimer

