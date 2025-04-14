import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.scss';
import { Toaster } from 'react-hot-toast';



const App: React.FC = () => {
  return (
    <>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
    <Toaster position="top-right" />
    </>
  );
};

export default App;