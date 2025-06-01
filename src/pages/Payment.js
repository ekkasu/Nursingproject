import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { validatePhone, formatPhoneNumber } from '../utils/validation';

const PaymentContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 50px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a8f4c;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Playfair Display', serif;
`;

const PaymentSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const PaymentOption = styled.div`
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#1a8f4c' : '#e0e0e0'};
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'rgba(26, 143, 76, 0.1)' : 'white'};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProviderIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ProviderName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const ProviderType = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0 0 0;
`;

const PaymentForm = styled.form`
  margin-top: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1a8f4c;
  }
`;

const Button = styled.button`
  background: #1a8f4c;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #156e3a;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
`;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;
  const [selectedMethod, setSelectedMethod] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    phoneError: ''
  });

  // Redirect if no ticket is selected
  if (!ticket) {
    navigate('/tickets');
    return null;
  }

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const formattedPhone = formatPhoneNumber(value);
    const isValid = validatePhone(formattedPhone);
    
    setFormData({
      phone: formattedPhone,
      phoneError: !isValid && formattedPhone.length > 0 
        ? 'Please enter a valid 10-digit mobile money number' 
        : ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validatePhone(formData.phone)) {
      return;
    }
    
    // Handle payment submission
    console.log('Payment submitted:', { selectedMethod, phone: formData.phone });
    navigate('/registration');
  };

  const paymentMethods = [
    { 
      id: 'mtn',
      name: 'MTN',
      type: 'Mobile Money',
      color: '#FFD700',
      icon: '💰'
    },
    { 
      id: 'telecel',
      name: 'Telecel',
      type: 'Mobile Payment',
      color: '#1a8f4c',
      icon: '💳'
    },
    { 
      id: 'airteltigo',
      name: 'AirtelTigo',
      type: 'Money',
      color: '#2563EB',
      icon: '📱'
    }
  ];

  return (
    <>
      <Header />
      <PaymentContainer>
        <ContentWrapper>
          <Title>Payment Method</Title>
          
          <PaymentSection>
            <h2>Select Payment Method</h2>
            <PaymentOptions>
              {paymentMethods.map((method) => (
                <PaymentOption 
                  key={method.id}
                  selected={selectedMethod === method.id} 
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <ProviderIcon color={method.color}>
                    {method.icon}
                  </ProviderIcon>
                  <ProviderName>{method.name}</ProviderName>
                  <ProviderType>{method.type}</ProviderType>
                </PaymentOption>
              ))}
            </PaymentOptions>

            {selectedMethod && (
              <PaymentForm onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Mobile Money Number * (10 digits)</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your mobile money number"
                    required
                    pattern="[0-9]{10}"
                  />
                  {formData.phoneError && (
                    <ErrorText>{formData.phoneError}</ErrorText>
                  )}
                </FormGroup>
                <Button 
                  type="submit"
                  disabled={!validatePhone(formData.phone)}
                >
                  Proceed to Payment
                </Button>
              </PaymentForm>
            )}
          </PaymentSection>
        </ContentWrapper>
      </PaymentContainer>
    </>
  );
};

export default Payment; 