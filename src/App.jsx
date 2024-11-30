import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Results from "./Results";
import Summary from "./Summary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
};

export default App;
