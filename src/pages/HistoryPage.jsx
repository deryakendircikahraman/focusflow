import { useEffect, useState } from 'react'
import StatsSummary from '../features/stats/StatsSummary.jsx'
import TopicDurationChart from '../features/stats/TopicDurationChart.jsx'

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

  if (isLoading) {
    return (
      <section>
        <h1>Study History</h1>
        <p>Review your past study sessions and see how your focus has improved over time.</p>
        <p>Loading stats...</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Study History</h1>
      <p>Review your past study sessions and see how your focus has improved over time.</p>

      <StatsSummary sessions={sessions} />
      <TopicDurationChart sessions={sessions} />
    </section>
  )
}

export default HistoryPage
