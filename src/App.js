import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Import pages
import Home from './pages/Home';
import Registration from './pages/Registration';
import Nomination from './pages/Nomination';

// Global styles
const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/nomination" element={<Nomination />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;