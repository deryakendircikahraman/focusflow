import { useEffect, useState } from 'react'
import StatsSummary from '../features/stats/StatsSummary.jsx'

function HistoryPage() {
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('focusflow:sessions')

      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSessions(parsed)
        }
      }
    } catch (error) {
      setSessions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <section>
      <h1>Study History</h1>
      <p>Review your past study sessions and see how your focus has improved over time.</p>

      {isLoading ? <p>Loading stats...</p> : <StatsSummary sessions={sessions} />}
    </section>
  )
}

export default HistoryPage
