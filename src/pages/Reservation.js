import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: 120px 0 80px;
  position: relative;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 48px;
  color: #1a8f4c;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #156e3a;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #1a8f4c;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #1a8f4c;
  }
  
  option[disabled] {
    color: #aaa;
    font-style: italic;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #1a8f4c;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #34495e;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  background-color: #1a8f4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background-color: #156e3a;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;

const DeadlineBox = styled.div`
  background-color: #fff8e1;
  border-left: 4px solid #ffd700;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
`;

const DeadlineTitle = styled.h3`
  color: #1a8f4c;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const DeadlineText = styled.p`
  color: #34495e;
  margin-bottom: 0;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #1a8f4c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 2.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
  
  .spinner {
    border: 4px solid rgba(26, 143, 76, 0.1);
    border-radius: 50%;
    border-top: 4px solid #1a8f4c;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  p {
    color: #1a8f4c;
    font-weight: 600;
  }
`;

const Reservation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    ticketType: '',
    quantity: '1',
    specialRequirements: '',
    agreeTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Here you would typically send the reservation data to your backend
      
      setIsSubmitted(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setIsLoading(false);
      alert('Failed to submit reservation. Please try again.');
    }
  };
  
  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <LoadingSpinner>
        <div className="spinner"></div>
        <p>Processing your reservation...</p>
      </LoadingSpinner>
    );
  }
  
  return (
    <>
      <Header />
      <PageContainer>
        <Container>
          <SectionHeader>
            <Title>Reserve Your Spot</Title>
            <Subtitle>Secure your place at our conference with a reservation now and pay later.</Subtitle>
          </SectionHeader>
          
          {!isSubmitted ? (
            <FormContainer>
              <DeadlineBox>
                <DeadlineTitle>Payment Deadline</DeadlineTitle>
                <DeadlineText>
                  <strong>August 19, 2025</strong> (2 weeks before the conference)
                </DeadlineText>
                <DeadlineText>
                  Make your reservation now to lock in early bird pricing. Complete your payment by the deadline to confirm your attendance.
                </DeadlineText>
              </DeadlineBox>
              
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="organization">Organization/Institution</Label>
                  <Input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="ticketType">Ticket Type *</Label>
                  <Select
                    id="ticketType"
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select ticket type</option>
                    <option value="vip">VIP Experience (GHS 3500)</option>
                    <option value="digital">Digital Pass (GHS 1500)</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="quantity">Number of Tickets *</Label>
                  <Select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                    <option value="more">More than 10</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="specialRequirements">Special Requirements or Comments</Label>
                  <Input
                    type="text"
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <CheckboxLabel htmlFor="agreeTerms">
                      I understand that I must complete payment by August 19, 2025 to confirm my reservation *
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FormGroup>
                
                <Button type="submit" disabled={!formData.agreeTerms}>
                  Submit Reservation
                </Button>
              </form>
            </FormContainer>
          ) : (
            <FormContainer>
              <SuccessMessage>
                <SuccessIcon>✓</SuccessIcon>
                <h2>Reservation Submitted Successfully!</h2>
                <p>Thank you for reserving your spot at our conference.</p>
                <p>We've sent a confirmation email to {formData.email} with details about your reservation.</p>
                <p><strong>Remember:</strong> Complete your payment by August 19, 2025 to confirm your attendance.</p>
                <Button onClick={handleNext} style={{ marginTop: '30px' }}>
                  Return to Homepage
                </Button>
              </SuccessMessage>
            </FormContainer>
          )}
        </Container>
      </PageContainer>
    </>
  );
};

export default Reservation; 