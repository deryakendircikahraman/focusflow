import { useState, useEffect, useCallback } from 'react'
import SessionForm from '../features/sessions/SessionForm.jsx'
import SessionList from '../features/sessions/SessionList.jsx'
import FocusTimer from '../features/sessions/FocusTimer.jsx'

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
  const [sessions, setSessions] = useState([])
  const [editingSession, setEditingSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timerSession, setTimerSession] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('focusflow:sessions')

      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSessions(parsed)
          setIsLoading(false)
          return
        }
      }

      setSessions(initialSessions)
    } catch (error) {
      setSessions(initialSessions)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('focusflow:sessions', JSON.stringify(sessions))
    }
  }, [sessions, isLoading])

  const handleAddSession = useCallback((newSession) => {
    setSessions((currentSessions) => [newSession, ...currentSessions])
  }, [])

  const handleEditClick = useCallback((session) => {
    setEditingSession(session)
  }, [])

  const handleUpdateSession = useCallback((updatedSession) => {
    setSessions((currentSessions) =>
      currentSessions.map((session) =>
        session.id === updatedSession.id ? { ...session, ...updatedSession } : session,
      ),
    )
    setEditingSession(null)
  }, [])

  const handleCancelEdit = useCallback(() => {
    setEditingSession(null)
  }, [])

  const handleDeleteSession = useCallback((idToDelete) => {
    setSessions((currentSessions) =>
      currentSessions.filter((session) => session.id !== idToDelete),
    )

    setEditingSession((current) =>
      current && current.id === idToDelete ? null : current,
    )
  }, [])

  const handleStartTimerForSession = useCallback((session) => {
    if (!session || session.status === 'completed') {
      return
    }

    setTimerSession(session)
    setSessions((currentSessions) =>
      currentSessions.map((item) => {
        if (item.id === session.id && item.status !== 'completed') {
          return { ...item, status: 'active' }
        }
        if (item.status === 'active' && item.id !== session.id) {
          return { ...item, status: 'planned' }
        }
        return item
      }),
    )
  }, [])

  const handleFocusComplete = useCallback((sessionId) => {
    setSessions((currentSessions) =>
      currentSessions.map((session) =>
        session.id === sessionId ? { ...session, status: 'completed' } : session,
      ),
    )
  }, [])

  useEffect(() => {
    if (editingSession) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [editingSession])

  useEffect(() => {
    if (timerSession) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [timerSession])

  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1
    if (b.status === 'completed' && a.status !== 'completed') return -1
    return 0
  })

  return (
    <section>
      <h1>Study Planner</h1>
      <p>
        Plan focused study blocks, set short breaks, and keep everything in one simple list before
        you start your timer.
      </p>

      <p>
        1) Create or edit a session below. 2) Use the &quot;Start Focus&quot; button on a session card to
        load it into the timer. 3) Start the timer to focus on that single task.
      </p>

      {isLoading && <p className="sessions-loading">Loading sessions...</p>}

      <FocusTimer session={timerSession} onFocusComplete={handleFocusComplete} />

      <SessionForm
        key={editingSession ? editingSession.id : 'new'}
        onSubmit={editingSession ? handleUpdateSession : handleAddSession}
        initialValues={editingSession}
        isEditing={Boolean(editingSession)}
        onCancel={handleCancelEdit}
      />

      <h2>Upcoming sessions</h2>
      <SessionList
        sessions={sortedSessions}
        onEdit={handleEditClick}
        onDelete={handleDeleteSession}
        onStartTimer={handleStartTimerForSession}
      />
    </section>
  )
}

export default PlannerPage
