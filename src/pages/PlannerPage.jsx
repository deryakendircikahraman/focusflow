import { useState } from 'react'
import SessionForm from '../features/sessions/SessionForm.jsx'
import SessionList from '../features/sessions/SessionList.jsx'

const initialSessions = [
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
  const [sessions, setSessions] = useState(initialSessions)

  function handleAddSession(newSession) {
    setSessions((currentSessions) => [newSession, ...currentSessions])
  }

  return (
    <section>
      <h1>Study Planner</h1>
      <p>
        Plan focused study blocks, set short breaks, and keep everything in one simple list before
        you start your timer.
      </p>

      <SessionForm onSubmit={handleAddSession} />

      <h2>Upcoming sessions</h2>
      <SessionList sessions={sessions} />
    </section>
  )
}

export default PlannerPage
