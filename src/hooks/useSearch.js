import { useState } from "react";

export default function useSearch(baseUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}?name=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json.data || []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, search };
}
