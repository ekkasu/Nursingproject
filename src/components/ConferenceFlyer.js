import React from 'react';
import styled from 'styled-components';
import eventFlyer from '../assets/images/flyer/event_flyer.jpg';

const FlyerContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  padding: 10px;

  @media (max-width: 768px) {
    max-width: 350px;
    padding: 5px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const FlyerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ConferenceFlyer = () => {
  const handleImageClick = () => {
    window.open(eventFlyer, '_blank');
  };

  return (
    <FlyerContainer>
      <FlyerImage 
        src={eventFlyer} 
        alt="NMCON 2025 Conference Flyer" 
        onClick={handleImageClick}
        title="Click to view full size"
      />
    </FlyerContainer>
  );
};

export default ConferenceFlyer; 