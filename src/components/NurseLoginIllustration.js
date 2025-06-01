import React from 'react';
import styled from 'styled-components';

const IllustrationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  svg {
    width: 100%;
    height: auto;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NurseLoginIllustration = () => {
  return (
    <IllustrationContainer>
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle cx="400" cy="300" r="250" fill="#E8F5EE" />
        
        {/* Medical Cross */}
        <rect x="350" y="200" width="100" height="200" rx="10" fill="#1a8f4c" />
        <rect x="300" y="250" width="200" height="100" rx="10" fill="#1a8f4c" />
        
        {/* Decorative Elements */}
        <circle cx="200" cy="150" r="20" fill="#64f4ac" opacity="0.5" />
        <circle cx="600" cy="450" r="30" fill="#64f4ac" opacity="0.3" />
        <circle cx="150" cy="400" r="15" fill="#1a8f4c" opacity="0.4" />
        <circle cx="650" cy="200" r="25" fill="#1a8f4c" opacity="0.2" />
        
        {/* Abstract Lines */}
        <path
          d="M100,300 Q200,100 300,300 T500,300"
          stroke="#64f4ac"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M300,500 Q400,300 500,500 T700,500"
          stroke="#1a8f4c"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </IllustrationContainer>
  );
};

export default NurseLoginIllustration; 