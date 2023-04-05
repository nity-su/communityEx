import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/board/Index";
import Display from "./pages/board/DisplayContents";
import Writing from "./pages/board/Writing";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/page/:num" element={<Index />} />
        <Route path="/write" element={<Writing />} />
        <Route path="/reader" element={<Display />} />
      </Routes>
    </>
  );
}
