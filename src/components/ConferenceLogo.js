import React from 'react';
import styled from 'styled-components';
import logoImage from '../assets/images/logos/nurse_conference_logo.png';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImage = styled.img`
  height: ${props => props.height || '45px'};
  width: auto;
  object-fit: contain;
  filter: ${props => props.isWhite ? 'brightness(0) invert(1)' : 'none'};
  
  @media (max-width: 768px) {
    height: ${props => props.mobileHeight || '35px'};
  }
`;

const LogoText = styled.div`
  font-family: 'Playfair Display', serif;
  color: ${props => props.color || '#1a8f4c'};
  font-weight: bold;
  font-size: ${props => props.fontSize || '1.5rem'};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: ${props => props.mobileFontSize || '1.2rem'};
  }
`;

const ConferenceLogo = ({ height, mobileHeight, fontSize, mobileFontSize, showText = true, color, isWhite = false }) => {
  return (
    <LogoContainer>
      <LogoImage 
        src={logoImage}
        alt="NMCON 2025 Logo"
        height={height} 
        mobileHeight={mobileHeight}
        isWhite={isWhite}
      />
      {showText && (
        <LogoText 
          fontSize={fontSize} 
          mobileFontSize={mobileFontSize}
          color={color}
        >
          NMCON
          <br />
          2025
        </LogoText>
      )}
    </LogoContainer>
  );
};

export default ConferenceLogo; 