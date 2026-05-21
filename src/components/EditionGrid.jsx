function editionImageUrl(image) {
  if (image.startsWith("/")) return `https://api.gatcg.com${image}`;
  return image;
}

export default function EditionGrid({ editions }) {
  if (!editions || !editions.length) return null;

  return (
    <>
      <h2>Card Editions</h2>
      <div className="edition-grid">
        {editions.map((edition) => (
          <div key={edition.uuid} className="edition-card">
            <img
              src={editionImageUrl(edition.image)}
              alt={edition.slug}
            />
            <div className="edition-details">
              <h3>{edition.set && edition.set.name}</h3>
              <p>{edition.slug}</p>
              <p>
                {edition.set && edition.set.prefix ? `${edition.set.prefix} • ` : ""}
                {edition.collector_number || "#"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}