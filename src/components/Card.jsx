export default function Card({ titulo, valor }) {
  return (
    <div className="card-hover">
      <p className="card-title">{titulo}</p>
      <h2 className="card-value">{valor}</h2>
    </div>
  )
}
