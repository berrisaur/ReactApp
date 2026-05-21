import { useState } from "react";
import useSearch from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data: cards, loading, search: runSearch } = useSearch(
    "https://api.gatcg.com/cards/search"
  );

  function handleSearch(query = search) {
    const trimmed = typeof query === "string" ? query.trim() : search.trim();
    if (!trimmed) return;
    setSearch(trimmed);
    runSearch(trimmed);
  }

  return (
    <div className="container">
      <h1>Grand Archive Explorer</h1>
      <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
      {loading
        ? <p className="loading-message">Loading cards...</p>
        : <CardList cards={cards} />
      }
    </div>
  );
}