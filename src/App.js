// 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import ComingSoon from './pages/ComingSoon';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Terms from './pages/Terms';

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
  const hideFooterPaths = ['/login', '/tickets', '/nomination', '/reservation', '/coming-soon', '/dashboard', '/admin'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname) && !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin');

  return (
    <AppContainer>
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/nomination" element={<Nomination />} />
          <Route path="/media" element={<MediaGallery />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/voting-form" element={<VotingForm />} />
          <Route path="/registration-steps" element={<RegistrationSteps />} />
          <Route path="/nomination-requirements" element={<NominationRequirements />} />
          <Route path="/nomination-rules" element={<NominationRules />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/terms" element={<Terms />} />
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