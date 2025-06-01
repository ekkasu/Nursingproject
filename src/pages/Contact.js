import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { validateEmail, validatePhone, formatPhoneNumber } from '../utils/validation';

const ContactContainer = styled.div`
  min-height: 100vh;
  background: rgba(26, 143, 76, 0.1);
  position: relative;
  padding: 100px 0;
  display: flex;
  align-items: center;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: start;
  background: rgba(26, 143, 76, 0.05);
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(26, 143, 76, 0.1);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 800px;
  }
`;

const LeftSection = styled.div`
  color: #1a8f4c;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a8f4c;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
  max-width: 400px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #1a8f4c;
  gap: 10px;
`;

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const FormSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a8f4c;
    box-shadow: 0 0 0 3px rgba(26, 143, 76, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #333;
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #1a8f4c;
    box-shadow: 0 0 0 3px rgba(26, 143, 76, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  background: #1a8f4c;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #156e3a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(26, 143, 76, 0.3);
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    emailError: '',
    phone: '',
    phoneError: '',
    address: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Format phone number
      const formattedPhone = formatPhoneNumber(value);
      const isValid = validatePhone(formattedPhone);
      
      setFormData({
        ...formData,
        phone: formattedPhone,
        phoneError: !isValid && formattedPhone.length > 0 
          ? 'Please enter a valid 10-digit phone number' 
          : ''
      });
    } else if (name === 'email') {
      // Validate email
      const isValid = validateEmail(value);
      setFormData({
        ...formData,
        email: value,
        emailError: !isValid && value.length > 0 
          ? 'Please enter a valid email from a popular provider' 
          : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateEmail(formData.email) || !validatePhone(formData.phone)) {
      return;
    }
    
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Header />
      <ContactContainer>
        <ContactContent>
          <LeftSection>
            <Title>Contact Us</Title>
            <Subtitle>
              Not sure what you need? The team at NMCON will be happy to listen to
              you and suggest event ideas you hadn't considered
            </Subtitle>
            <ContactInfo>
              <ContactItem>
                <span>📧</span>
                <span>Contact@Conferaevent.Co</span>
              </ContactItem>
              <ContactItem>
                <span>📞</span>
                <span>Support: 1-2344-2345-23</span>
              </ContactItem>
            </ContactInfo>
          </LeftSection>

          <FormContainer>
            <FormTitle>We'd love to hear from you!</FormTitle>
            <FormSubtitle>Let's get in touch</FormSubtitle>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <Input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required 
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company" 
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required 
                  />
                  {formData.emailError && (
                    <ErrorText>{formData.emailError}</ErrorText>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number (10 digits)"
                    required
                    pattern="[0-9]{10}"
                  />
                  {formData.phoneError && (
                    <ErrorText>{formData.phoneError}</ErrorText>
                  )}
                </FormGroup>
              </FormGrid>
              <FormGroup>
                <Input 
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address" 
                />
              </FormGroup>
              <FormGroup>
                <TextArea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required 
                />
              </FormGroup>
              <SubmitButton 
                type="submit"
                disabled={!validateEmail(formData.email) || !validatePhone(formData.phone)}
              >
                Send Message
              </SubmitButton>
            </form>
          </FormContainer>
        </ContactContent>
      </ContactContainer>
    </>
  );
};

export default Contact; 