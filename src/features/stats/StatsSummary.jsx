function StatsSummary({ sessions }) {
  const safeSessions = Array.isArray(sessions) ? sessions : []

  const totalSessions = safeSessions.length

  const totalPlannedMinutes = safeSessions.reduce(
    (sum, session) => sum + Number(session.duration || 0),
    0,
  )

  const totalCompletedSessions = safeSessions.filter(
    (session) => session.status === 'completed',
  ).length

  return (
    <section>
      <h2>Study stats</h2>
      <p>Here&apos;s a quick overview of how much you&apos;ve been studying.</p>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total sessions</h3>
          <p className="stats-card__value">{totalSessions}</p>
          <p className="stats-card__label">planned + active + completed</p>
        </div>

        <div className="stats-card">
          <h3>Planned focus time</h3>
          <p className="stats-card__value">{totalPlannedMinutes} min</p>
          <p className="stats-card__label">across all sessions</p>
        </div>

        <div className="stats-card">
          <h3>Completed sessions</h3>
          <p className="stats-card__value">{totalCompletedSessions}</p>
          <p className="stats-card__label">finished focus blocks</p>
        </div>
      </div>
    </section>
  )
}

export default StatsSummary

