import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#2563eb', '#f97316', '#0d9488', '#ec4899', '#64748b', '#22c55e']

function buildTopicData(sessions) {
  if (!Array.isArray(sessions)) return []

  const totals = {}

  sessions.forEach((session) => {
    const topic = session.topic || 'Other'
    const minutes = Number(session.duration || 0)

    if (!totals[topic]) {
      totals[topic] = 0
    }

    totals[topic] += minutes
  })

  return Object.entries(totals).map(([topic, value]) => ({
    name: topic,
    value,
  }))
}

function TopicDurationChart({ sessions }) {
  const data = buildTopicData(sessions)

  if (!data.length) {
    return (
      <section>
        <h2>Study time by topic</h2>
        <p>You don&apos;t have any sessions yet. Once you start studying, we&apos;ll visualize it here.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Study time by topic</h2>
      <p>This chart shows how your total planned focus time is distributed across topics.</p>

      <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default TopicDurationChart

