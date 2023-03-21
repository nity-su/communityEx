import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Index from "./pages/board/Index";
import Writing from "./pages/board/Writing";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="write" element={<Writing />} />
        </Route>
      </Routes>
    </>
  );
}
