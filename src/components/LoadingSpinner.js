import React from 'react';
import styled, { keyframes } from 'styled-components';

const heartbeat = keyframes`
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  10% {
    transform: scale(0.95);
  }
  15% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.95);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(26, 143, 76, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(26, 143, 76, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 143, 76, 0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
  background: ${props => props.fullScreen ? '#fff' : 'transparent'};
`;

const Heart = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 30px;
  animation: ${heartbeat} 1.5s ease-in-out infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 30px;
    height: 50px;
    border-radius: 30px 30px 0 0;
    background-color: #1a8f4c;
    transform-origin: bottom;
  }

  &::before {
    left: 30px;
    transform: rotate(-45deg);
  }

  &::after {
    left: 0;
    transform: rotate(45deg);
  }
`;

const PulseCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const LoadingText = styled.p`
  color: #1a8f4c;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.8;
  text-align: center;
`;

const LoadingSpinner = ({ text = 'Loading...', fullScreen = false }) => {
  return (
    <Container fullScreen={fullScreen}>
      <div style={{ position: 'relative' }}>
        <PulseCircle />
        <Heart />
      </div>
      <LoadingText>{text}</LoadingText>
    </Container>
  );
};

export default LoadingSpinner; 