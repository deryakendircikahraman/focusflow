import SessionCard from './SessionCard.jsx'

function SessionList({ sessions, onEdit }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="session-list-empty">
        <h2>No sessions yet</h2>
        <p>Add your first FocusFlow session using the form above to get started.</p>
      </div>
    )
  }

  return (
    <div className="planner-list">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} onEdit={onEdit} />
      ))}
    </div>
  )
}

export default SessionList

