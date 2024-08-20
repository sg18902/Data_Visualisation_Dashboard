import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  const [sidebaropened, setsidebaropened] = useState(false);
  
  const handlesidebarchange = () => {
    setsidebaropened(!sidebaropened);
  };


  return (
    <div style={{ 
      backgroundColor: '#F6F5F2',
      minHeight: '100vh', 
      margin: 0 
  }}>
      <Router>
          {/* Main Content */}
          <main >
              <Routes>
                  <Route path="/" element={<Home />} />
              </Routes>
          </main>
      </Router>
  </div>
  );
};

export default App;
