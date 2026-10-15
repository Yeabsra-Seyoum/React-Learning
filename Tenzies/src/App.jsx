import React from "react";
import "./App.css";
import Die from "./Die.jsx";

function App() {
  const val = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 6) + 1,
  );

  return (
    <main className="dice-container">
      <Die value={val[0]} />
      <Die value={val[1]} />
      <Die value={val[2]} />
      <Die value={val[3]} />
      <Die value={val[4]} />
      <Die value={val[5]} />
      <Die value={val[6]} />
      <Die value={val[7]} />
      <Die value={val[8]} />
      <Die value={val[9]} />
    </main>
  );
}

export default App;
