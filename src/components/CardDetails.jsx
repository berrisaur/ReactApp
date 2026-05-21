import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import EditionGrid from "../components/EditionGrid";

//the following segmentation logic is a bit complex, 
// but it allows us to handle both bold and italic formatting in the effect text, as well as the common "TRIGGER: effect" format used in many cards. 
// It splits the effect text into segments that can be rendered with the appropriate styling in the JSX below.
// due to the slightly more complex format of the api return, I had to use AI to support the formatting for the following 3 functions for card details. 
function parseSegments(text) {
  const parts = text.split(/(\*\*.*?\*\*|\*[^*].*?\*)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return { bold: true, italic: false, text: part.slice(2, -2) };
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return { bold: false, italic: true, text: part.slice(1, -1) };
    }
    return { bold: false, italic: false, text: part };
  }).filter((p) => p.text !== "");
}

function parseEffectLine(line) {
  const colonIdx = line.indexOf(":");
  if (colonIdx > 0 && colonIdx < 60) {
    const trigger = line.slice(0, colonIdx + 1);
    const rest = line.slice(colonIdx + 1);
    if (/^[A-Z]/.test(trigger) && rest.trim().length > 0) {
      return [{ bold: true, italic: false, text: trigger }, ...parseSegments(rest)];
    }
  }
  return parseSegments(line);
}

export default function CardDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: card, loading, error } = useFetch(
    slug ? `https://api.gatcg.com/cards/${slug}` : null
  );

  const effectSegments = useMemo(() => {
    if (!card) return null;
    const effectText = (card.effect || card.effect_raw || "")
      .replaceAll("CARDNAME", card.name);
    if (!effectText) return null;
    return effectText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => parseEffectLine(line.trim()));
  }, [card]);

  if (loading) return <p className="loading-message">Loading card...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!card) return <p className="error-message">Card not found.</p>;


  return (
    <div className="details-container">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="details-header">
        <h1>{card.name}</h1>
      </div>
      <div className="card-info">
        <p><strong>Types:</strong> {card.types.join(", ")}</p>
        <p><strong>Elements:</strong> {card.elements.join(", ")}</p>
        <p><strong>Classes:</strong> {card.classes.join(", ")}</p>
        <p><strong>Subtypes:</strong> {card.subtypes.join(", ")}</p>
      </div>
      <div className="card-effect-box">
        <h2>Effect</h2>
        {effectSegments ? (
          effectSegments.map((segments, i) => (
            <div key={i} className="effect-block">
              <p>
                {segments.map((seg, j) => {
                  if (seg.bold) return <strong key={j}>{seg.text}</strong>;
                  if (seg.italic) return <em key={j}>{seg.text}</em>;
                  return <span key={j}>{seg.text}</span>;
                })}
              </p>
            </div>
          ))
        ) : (
          <p>No effect text available.</p>
        )}
      </div>
      <EditionGrid editions={card.editions} />
    </div>
  );
}