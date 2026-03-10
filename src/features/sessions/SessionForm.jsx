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
        {isEditing ? 'Edit session' : 'Plan a new session'}
      </h2>

      <div className="session-form__row">
        <label>
          Session title
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
          Study topic
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
          Focus duration (minutes)
          <input
            type="number"
            min="10"
            max="180"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </label>

        <label>
          Break duration (minutes)
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

      <div className="session-form__actions">
        <button type="submit" className="session-form__submit">
          {isEditing ? 'Update session' : 'Add session'}
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

