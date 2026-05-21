import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CardDetails from "./components/CardDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card/:slug" element={<CardDetails />} />
    </Routes>
  );
}