import SessionCard from './SessionCard.jsx'

function SessionList({ sessions, onEdit }) {
  if (!sessions || sessions.length === 0) {
    return <p>No sessions planned yet.</p>
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

