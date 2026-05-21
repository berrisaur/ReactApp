export default function SearchBar({ search, setSearch, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(search);
  }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Grand Archive cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}