import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductivityTip from '../shared/ProductivityTip.jsx'

function HomePage() {
  const [totalSessions, setTotalSessions] = useState(0)
  const [completedSessions, setCompletedSessions] = useState(0)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('focusflow:sessions')

      if (!stored) return

      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setTotalSessions(parsed.length)
        setCompletedSessions(parsed.filter((session) => session.status === 'completed').length)
      }
    } catch {
      setTotalSessions(0)
      setCompletedSessions(0)
    }
  }, [])

  return (
    <section>
      <header>
        <h1>FocusFlow</h1>
        <p>Study Session Planner</p>
      </header>

      <p>
        Plan focused study sessions, balance short breaks, and track how much quality focus time you
        complete over time.
      </p>

      <ProductivityTip />

      <div className="home-summary">
        <div className="home-summary__card">
          <h2>Total sessions</h2>
          <p className="home-summary__value">{totalSessions}</p>
        </div>
        <div className="home-summary__card">
          <h2>Completed sessions</h2>
          <p className="home-summary__value">{completedSessions}</p>
        </div>
      </div>

      <div className="home-actions">
        <Link to="/planner" className="home-actions__primary">
          Go to Planner
        </Link>
        <Link to="/history" className="home-actions__secondary">
          View History
        </Link>
      </div>
    </section>
  )
}

export default HomePage
