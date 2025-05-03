'use client'

import { ResponsiveBar } from '@nivo/bar'

const data = [
  { language: 'Python', score: 85 },
  { language: 'JavaScript', score: 75 },
  { language: 'Java', score: 65 },
  { language: 'C++', score: 55 },
  { language: 'Go', score: 45 },
]

const Chart = () => (
  <div className="h-[400px] w-full bg-white p-6 rounded-xl shadow-md">
    <ResponsiveBar
      data={data}
      keys={['score']}
      indexBy="language"
      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
      padding={0.5}
      groupMode="grouped" // ⬅️ This makes bars side-by-side (non-stacked)
      layout="vertical"  // ⬅️ For vertical bars (horizontal flips it)
      colors="#3b82f6"    // Tailwind's blue-500
      borderRadius={4}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Language',
        legendPosition: 'middle',
        legendOffset: 36
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Score',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      enableGridY={false}
      labelTextColor="#fff"
      animate={true}
    />
  </div>
)

export default Chart
