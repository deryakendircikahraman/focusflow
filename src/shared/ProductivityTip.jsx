import { useEffect, useState } from 'react'

const FALLBACK_TIPS = [
  'Break large tasks into smaller, focused blocks.',
  'Put your phone out of reach during deep work.',
  'Plan your next study session before you finish the current one.',
  'Review briefly before you start, not while you work.',
]

function ProductivityTip() {
  const [tip, setTip] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  async function fetchTip() {
    try {
      setIsLoading(true)
      setHasError(false)

      const response = await fetch('https://zenquotes.io/api/random', {
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      let adviceText = ''

      if (Array.isArray(data) && data.length > 0) {
        adviceText = data[0].q
      } else if (data && typeof data === 'object' && data.q) {
        adviceText = data.q
      }

      if (!adviceText) {
        throw new Error('Unexpected response format')
      }

      setTip(adviceText)
    } catch (error) {
      // Fall back to a local tip so the UI still shows something useful
      const randomIndex = Math.floor(Math.random() * FALLBACK_TIPS.length)
      setTip(FALLBACK_TIPS[randomIndex])
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTip()
  }, [])

  return (
    <section className="tip-card">
      <p className="tip-card__title">Today's Productivity Tip</p>

      {isLoading && <p className="tip-card__loading">Loading productivity tip...</p>}

      {!isLoading && tip && <p className="tip-card__text">“{tip}”</p>}

      <div style={{ marginTop: '0.75rem' }}>
        <button type="button" onClick={fetchTip}>
          Get New Tip
        </button>
      </div>
    </section>
  )
}

export default ProductivityTip

