import { useState } from 'react'

function SessionForm({ onSubmit, initialValues, isEditing, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [topic, setTopic] = useState(initialValues?.topic || '')
  const [duration, setDuration] = useState(initialValues?.duration || 50)
  const [breakDuration, setBreakDuration] = useState(initialValues?.breakDuration || 10)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('Title is required.')
      return
    }

    setError('')

    const sessionToSave = {
      id: initialValues?.id || crypto.randomUUID(),
      title: title.trim(),
      topic: topic.trim() || 'General',
      duration: Number(duration),
      breakDuration: Number(breakDuration),
      status: initialValues?.status || 'planned',
      createdAt: initialValues?.createdAt || new Date().toISOString(),
    }

    if (onSubmit) {
      onSubmit(sessionToSave)
    }

    if (!isEditing) {
      setTitle('')
      setTopic('')
      setDuration(50)
      setBreakDuration(10)
    }
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2 className="session-form__title">
        {isEditing ? 'Edit Session' : 'Create Session'}
      </h2>

      <div className="session-form__row">
        <label htmlFor="session-form-title">
          Session title
        </label>
        <input
          id="session-form-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Focus block for React study"
          aria-describedby={error ? 'session-form-error' : undefined}
        />
      </div>

      <div className="session-form__row">
        <label htmlFor="session-form-topic">
          Study topic
        </label>
        <input
          id="session-form-topic"
          type="text"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="React, Algorithms, Linear Algebra..."
        />
      </div>

      <div className="session-form__grid">
        <div className="session-form__field">
          <label htmlFor="session-form-duration">
            Focus duration (minutes)
          </label>
          <input
            id="session-form-duration"
            type="number"
            min="10"
            max="180"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
        <div className="session-form__field">
          <label htmlFor="session-form-break">
            Break duration (minutes)
          </label>
          <input
            id="session-form-break"
            type="number"
            min="0"
            max="60"
            value={breakDuration}
            onChange={(event) => setBreakDuration(event.target.value)}
          />
        </div>
      </div>

      {error && (
        <p id="session-form-error" className="session-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="session-form__actions">
        <button type="submit" className="session-form__submit">
          {isEditing ? 'Update Session' : 'Create Session'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="session-form__cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default SessionForm

