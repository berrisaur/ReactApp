import { useNavigate } from "react-router-dom";

export default function CardList({ cards }) {
  const navigate = useNavigate();

  if (cards.length === 0) {
    return <p className="no-results">Search for a card to begin.</p>;
  }

  return (
    <div className="results-list">
      {cards.map((card) => (
        <div
          key={card.slug}
          className="result-card"
          onClick={() => navigate(`/card/${card.slug}`)}
        >
          <h2>{card.name || "Unknown Card"}</h2>
          <p><strong>Types:</strong> {card.types && card.types.join(", ")}</p>
          <p><strong>Elements:</strong> {card.elements && card.elements.join(", ")}</p>
          <p className="card-slug">{card.slug}</p>
        </div>
      ))}
    </div>
  );
}