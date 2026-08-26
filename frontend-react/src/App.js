import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">
          <span className="app-title-prefix">{">"} </span>
          Pipeline Analyzer
        </h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;