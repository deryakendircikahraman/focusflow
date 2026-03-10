import { useEffect, useState } from 'react'

const DEFAULT_FOCUS_MINUTES = 25
const DEFAULT_BREAK_MINUTES = 5

function FocusTimer({ session, onFocusComplete }) {
  const focusMinutes = session?.duration || DEFAULT_FOCUS_MINUTES
  const breakMinutes = session?.breakDuration || DEFAULT_BREAK_MINUTES

  const [mode, setMode] = useState('focus') // 'focus' | 'break'
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // When the selected session changes, reset the timer to that session's focus duration
    setIsRunning(false)
    setMode('focus')
    setSecondsLeft(focusMinutes * 60)
  }, [session?.id, focusMinutes])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === 'focus' ? 'break' : 'focus'
          setMode(nextMode)
          const nextMinutes = nextMode === 'focus' ? focusMinutes : breakMinutes

          if (mode === 'focus' && nextMode === 'break' && session && onFocusComplete) {
            onFocusComplete(session.id)
          }

          return nextMinutes * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning, mode, focusMinutes, breakMinutes, session, onFocusComplete])

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  function handleStartPause() {
    setIsRunning((prev) => !prev)
  }

  function handleReset() {
    setIsRunning(false)
    setMode('focus')
    setSecondsLeft(focusMinutes * 60)
  }

  return (
    <section className="timer">
      <h2>Focus timer</h2>
      {session ? (
        <p className="timer__mode">
          {mode === 'focus' ? 'Focus time' : 'Break time'} · {session.title}
        </p>
      ) : (
        <p className="timer__mode">Select a session and press “Start Focus”.</p>
      )}

      <p className="timer__time">
        {minutes}:{seconds}
      </p>
      <div className="timer__actions">
        <button type="button" onClick={handleStartPause} disabled={!session}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button type="button" onClick={handleReset} disabled={!session}>
          Reset
        </button>
      </div>
    </section>
  )
}

export default FocusTimer

