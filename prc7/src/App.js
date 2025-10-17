import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebarr/Sidebarj';
import Home from './Pages/Home';
import Depstar from './Pages/Depstar';
import Charusat from './Pages/Charusat';
import Cse from './Pages/Cse';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? '×' : '☰'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/depstar" element={<Depstar />} />
            <Route path="/charusat" element={<Charusat />} />
            <Route path="/cse" element={<Cse />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;