import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function ChartHead() {
  const [harajatData, setHarajatData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/harajat')
      const data = await response.json()

      console.log('API data:', data)

      if (Array.isArray(data) && data.length > 0) {
        setHarajatData(data)
      } else {
        setError("Ma'lumot topilmadi")
      }
      setLoading(false)
    } catch (err) {
      console.error('Xato:', err)
      setError('API xatosi')
      setLoading(false)
    }
  }

  // Line Chart ma'lumotlari - Oylar bo'yicha
  const getLineChartData = () => {
    const monthMap = {}

    harajatData.forEach((item) => {
      if (!item.date) return

      const date = new Date(item.date)
      const monthIndex = date.getMonth()
      const monthNames = [
        'Yan',
        'Fev',
        'Mar',
        'Apr',
        'May',
        'Iyn',
        'Iyl',
        'Avg',
        'Sen',
        'Okt',
        'Noy',
        'Dek',
      ]
      const monthKey = monthNames[monthIndex]

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = { name: monthKey, total: 0 }
      }

      monthMap[monthKey].total += parseInt(item.amount) || 0
    })

    return Object.values(monthMap)
  }

  // Pie Chart ma'lumotlari - Kategoriya bo'yicha
  const getPieChartData = () => {
    const categoryMap = {}

    harajatData.forEach((item) => {
      const category = item.category || 'Boshqa'

      if (!categoryMap[category]) {
        categoryMap[category] = { name: category, value: 0 }
      }

      categoryMap[category].value += parseInt(item.amount) || 0
    })

    return Object.values(categoryMap)
  }

  // Bar Chart ma'lumotlari - Kategoriya bo'yicha
  const getBarChartData = () => {
    return getPieChartData()
  }

  // Statistika kartalar
  const getStatistics = () => {
    const total = harajatData.reduce((sum, item) => sum + (parseInt(item.amount) || 0), 0)
    const average = harajatData.length > 0 ? Math.round(total / harajatData.length) : 0
    const maxItem = harajatData.reduce(
      (max, item) => ((parseInt(item.amount) || 0) > (parseInt(max.amount) || 0) ? item : max),
      harajatData[0] || {}
    )
    const count = harajatData.length

    return { total, average, maxItem, count }
  }

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '20px',
        }}
      >
        ⏳ Yuklanyapti...
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '20px',
          color: 'red',
        }}
      >
        ❌ {error}
      </div>
    )
  }

  if (harajatData.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '20px',
        }}
      >
        📊 Ma'lumot topilmadi
      </div>
    )
  }

  const lineData = getLineChartData()
  const pieData = getPieChartData()
  const barData = getBarChartData()
  const stats = getStatistics()

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Line Chart - Oylar bo'yicha */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            marginBottom: '30px',
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString('uz-UZ') + " so'm"} />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 5 }}
                activeDot={{ r: 7 }}
                name="Jami Harajat"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart va Bar Chart */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          {/* Pie Chart */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toLocaleString('uz-UZ')}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString('uz-UZ') + " so'm"} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString('uz-UZ') + " so'm"} />
                <Bar dataKey="value" fill="#3b82f6" name="Summa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
