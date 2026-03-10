import { useState } from 'react'

function SessionForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState(50)
  const [breakDuration, setBreakDuration] = useState(10)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('Title is required.')
      return
    }

    setError('')

    const newSession = {
      id: crypto.randomUUID(),
      title: title.trim(),
      topic: topic.trim() || 'General',
      duration: Number(duration),
      breakDuration: Number(breakDuration),
      status: 'planned',
      createdAt: new Date().toISOString(),
    }

    if (onSubmit) {
      onSubmit(newSession)
    }

    setTitle('')
    setTopic('')
    setDuration(50)
    setBreakDuration(10)
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2 className="session-form__title">Plan a new session</h2>

      <div className="session-form__row">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Focus block for React study"
          />
        </label>
      </div>

      <div className="session-form__row">
        <label>
          Topic
          <input
            type="text"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="React, Algorithms, Linear Algebra..."
          />
        </label>
      </div>

      <div className="session-form__grid">
        <label>
          Duration (minutes)
          <input
            type="number"
            min="10"
            max="180"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </label>

        <label>
          Break (minutes)
          <input
            type="number"
            min="0"
            max="60"
            value={breakDuration}
            onChange={(event) => setBreakDuration(event.target.value)}
          />
        </label>
      </div>

      {error && <p className="session-form__error">{error}</p>}

      <button type="submit" className="session-form__submit">
        Add session
      </button>
    </form>
  )
}

export default SessionForm

