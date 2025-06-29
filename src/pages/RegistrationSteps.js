import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 40px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
`;

const Title = styled.h1`
  color: #1a8f4c;
  font-size: 2.5rem;
  margin-bottom: 24px;
`;

const RegistrationSteps = () => (
  <Wrapper>
    <Title>Registration Steps</Title>
    <p>Here you will find the step-by-step process for registering for the conference. (Add your content here.)</p>
  </Wrapper>
);

export default RegistrationSteps; 