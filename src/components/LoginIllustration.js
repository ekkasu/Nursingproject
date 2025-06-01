import React from 'react';
import styled from 'styled-components';

const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Phone = styled.div`
  width: 300px;
  height: 600px;
  background: #F3F4F6;
  border-radius: 40px;
  position: relative;
  transform: rotate(-10deg);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 15px solid #1F2937;

  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 25px;
    background: #1F2937;
    border-radius: 20px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(26, 143, 76, 0.3), rgba(26, 143, 76, 0.1));
  }
`;

const PhoneContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fingerprint = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid #1a8f4c;
  border-radius: 50%;
  position: relative;
  margin-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border: 3px solid #1a8f4c;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background: #1a8f4c;
    border-radius: 50%;
  }
`;

const Lock = styled.div`
  position: absolute;
  right: -50px;
  top: 50%;
  width: 60px;
  height: 80px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    border: 8px solid white;
    border-radius: 40px;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  }
`;

const CheckMark = styled.div`
  position: absolute;
  left: -40px;
  top: 20%;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    width: 30px;
    height: 15px;
    border-left: 4px solid #1a8f4c;
    border-bottom: 4px solid #1a8f4c;
    transform: rotate(-45deg) translate(2px, -5px);
  }
`;

const LoginIllustration = () => {
  return (
    <IllustrationContainer>
      <Phone>
        <PhoneContent>
          <Fingerprint />
        </PhoneContent>
      </Phone>
      <Lock />
      <CheckMark />
    </IllustrationContainer>
  );
};

export default LoginIllustration; 