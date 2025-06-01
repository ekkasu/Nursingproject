import React from 'react';
import styled from 'styled-components';

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 40px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const LogoWrapper = styled.div`
  background: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width: 150px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 120px;
    height: 48px;
    padding: 10px 20px;
  }
`;

const PaymentName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  font-weight: bold;
  text-align: center;
`;

const PaymentType = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 2px 0 0 0;
  text-align: center;
`;

const PaymentLogos = () => {
  const paymentMethods = [
    { name: 'MTN', type: 'Mobile Money' },
    { name: 'Telecel', type: 'Mobile Payment' },
    { name: 'AirtelTigo', type: 'Money' }
  ];

  return (
    <LogosContainer>
      {paymentMethods.map((method, index) => (
        <LogoWrapper key={index}>
          <PaymentName>{method.name}</PaymentName>
          <PaymentType>{method.type}</PaymentType>
        </LogoWrapper>
      ))}
    </LogosContainer>
  );
};

export default PaymentLogos; 