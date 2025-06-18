import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 40px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  
  @media (max-width: 768px) {
    margin: 40px auto;
    padding: 30px 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    margin: 30px auto;
    padding: 25px 15px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  color: #1a8f4c;
  font-size: 2.5rem;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 18px;
  }
`;

const Content = styled.div`
  line-height: 1.6;
  color: #333;
  
  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const NominationRequirements = () => (
  <Wrapper>
    <Title>Nomination Requirements</Title>
    <Content>
      <p>Here you will find the requirements for nominating a candidate. (Add your content here.)</p>
    </Content>
  </Wrapper>
);

export default NominationRequirements; 