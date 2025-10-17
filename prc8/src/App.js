import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("gymCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  // Save count whenever it changes
  useEffect(() => {
    localStorage.setItem("gymCount", count);
  }, [count]);

  return (
    <div className="app">
      <div className="counter-box">
        <h1> Gym Reps Counter</h1>
        <p className="count">{count}</p>

        <div className="buttons">
          <button className="btn decrease" onClick={() => setCount(count - 1)}>-</button>
          <button className="btn increase" onClick={() => setCount(count + 1)}>+</button>
        </div>

        <button className="btn reset" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default App;