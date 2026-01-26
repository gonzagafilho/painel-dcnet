export default function StatusCard({ label, value, unit, level }) {
  const colors = {
    ok: 'border-green-500 text-green-400',
    warning: 'border-yellow-500 text-yellow-400',
    critical: 'border-red-500 text-red-400'
  }

  return (
    <div className={`border rounded-lg p-4 ${colors[level]}`}>
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-bold">
        {value}{unit}
      </div>
    </div>
  )
}
