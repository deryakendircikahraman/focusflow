import SessionCard from './SessionCard.jsx'

function SessionList({ sessions, onEdit, onDelete, onStartTimer }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="session-list-empty">
        <h2>No study sessions yet</h2>
        <p>Create your first session to start planning your study time.</p>
      </div>
    )
  }

  return (
    <div className="planner-list">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onEdit={onEdit}
          onDelete={onDelete}
          onStartTimer={onStartTimer}
        />
      ))}
    </div>
  )
}

export default SessionList

