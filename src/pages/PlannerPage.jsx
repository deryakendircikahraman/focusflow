const sampleSessions = [
  {
    id: 'sess-1',
    title: 'Deep Work – Algorithms',
    topic: 'Data Structures & Algorithms',
    duration: 50,
    breakDuration: 10,
    status: 'planned',
    createdAt: '2026-03-10T09:00:00Z',
  },
  {
    id: 'sess-2',
    title: 'React Practice – Components',
    topic: 'React & Frontend',
    duration: 40,
    breakDuration: 5,
    status: 'active',
    createdAt: '2026-03-10T11:30:00Z',
  },
  {
    id: 'sess-3',
    title: 'Review – Linear Algebra',
    topic: 'Math & Foundations',
    duration: 60,
    breakDuration: 15,
    status: 'completed',
    createdAt: '2026-03-09T18:15:00Z',
  },
]

function PlannerPage() {
  return (
    <section>
      <h1>Study Planner</h1>
      <p>
        This is a preview of how your FocusFlow study sessions will look once you start planning and
        tracking them.
      </p>

      <div className="planner-list">
        {sampleSessions.map((session) => (
          <article key={session.id} className="planner-card">
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
          </article>
        ))}
      </div>
    </section>
  )
}

export default PlannerPage
