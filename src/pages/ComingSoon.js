import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1a8f4c;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const Icon = styled.div`
  font-size: 5rem;
  margin-bottom: 30px;
  color: #1a8f4c;
`;

const Button = styled.button`
  padding: 12px 30px;
  background: #1a8f4c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #156e3a;
    transform: translateY(-2px);
  }
`;

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which feature is coming soon based on the path
  let feature = "This feature";
  if (location.pathname === "/nomination") {
    feature = "Nomination";
  } else if (location.pathname === "/vote") {
    feature = "Voting";
  } else if (location.pathname === "/login") {
    feature = "Login";
  } else if (location.pathname === "/tickets" || location.pathname === "/reservation") {
    feature = "Registration";
  }
  
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <Icon>🚧</Icon>
          <Title>Coming Soon!</Title>
          <Subtitle>
            {feature} is currently under development and will be available soon. 
            Thank you for your patience as we work to bring you the best experience.
          </Subtitle>
          <Button onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default ComingSoon; 