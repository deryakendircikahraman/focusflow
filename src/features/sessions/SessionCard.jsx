function SessionCard({ session, onEdit }) {
  if (!session) return null

  const readableStatus = session.status
    ? session.status.charAt(0).toUpperCase() + session.status.slice(1)
    : 'Planned'

  return (
    <article className="planner-card">
      <header className="planner-card__header">
        <h2>{session.title}</h2>
        <span className={`badge badge--${session.status}`}>{session.status}</span>
      </header>

      <p className="planner-card__topic">{session.topic}</p>

      <dl className="planner-card__meta">
        <div>
          <dt>Focus</dt>
          <dd>{session.duration} minutes</dd>
        </div>
        <div>
          <dt>Break</dt>
          <dd>{session.breakDuration} minutes</dd>
        </div>
      </dl>

      <p className="planner-card__status">Status: {readableStatus}</p>

      <button
        type="button"
        className="session-card__edit"
        onClick={() => onEdit && onEdit(session)}
      >
        Edit
      </button>
    </article>
  )
}

export default SessionCard

