// 
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Import pages
import Home from './pages/Home';
import Registration from './pages/Registration';
import Nomination from './pages/Nomination';
import MediaGallery from './pages/MediaGallery';
import Vote from './pages/Vote';
import VotingForm from './pages/VotingForm';
import RegistrationSteps from './pages/RegistrationSteps';
import NominationRequirements from './pages/NominationRequirements';
import NominationRules from './pages/NominationRules';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import News from './pages/News';
import Footer from './components/Footer';
import Tickets from './pages/Tickets';
import Payment from './pages/Payment';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import ComingSoon from './pages/ComingSoon';

// Global styles
const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

// Component to handle conditional footer rendering
const AppContent = () => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/tickets', '/nomination', '/payment', '/reservation', '/coming-soon'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <AppContainer>
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<ComingSoon />} />
          <Route path="/tickets" element={<ComingSoon />} />
          <Route path="/payment" element={<ComingSoon />} />
          <Route path="/nomination" element={<Nomination />} />
          <Route path="/media" element={<MediaGallery />} />
          <Route path="/vote" element={<ComingSoon />} />
          <Route path="/voting-form" element={<ComingSoon />} />
          <Route path="/registration-steps" element={<RegistrationSteps />} />
          <Route path="/nomination-requirements" element={<NominationRequirements />} />
          <Route path="/nomination-rules" element={<NominationRules />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<ComingSoon />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reservation" element={<ComingSoon />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </MainContent>
      {shouldShowFooter && <Footer />}
    </AppContainer>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;