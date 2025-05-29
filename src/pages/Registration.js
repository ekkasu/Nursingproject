import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

// Main container styles
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 700;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 40px;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

// Form container and elements
const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active ? '#1a8f4c' : props.completed ? '#2ab06e' : '#e0e0e0'};
  color: ${props => props.active || props.completed ? 'white' : '#777'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  
  &::after {
    content: '${props => props.label}';
    position: absolute;
    top: 45px;
    font-size: 0.8rem;
    color: ${props => props.active ? '#1a8f4c' : '#777'};
    width: 80px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StepContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  background-color: ${props => props.secondary ? 'white' : '#1a8f4c'};
  color: ${props => props.secondary ? '#1a8f4c' : 'white'};
  border: ${props => props.secondary ? '1px solid #1a8f4c' : 'none'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background-color: ${props => props.secondary ? '#f9f9f9' : '#156e3a'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
    border: none;
  }
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

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    organization: '',
    experience: '',
    interests: [],
    dietaryRestrictions: '',
    emergencyContact: '',
    agreeTerms: false,
    agreePrivacy: false
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeTerms' || name === 'agreePrivacy') {
        setFormData({
          ...formData,
          [name]: checked
        });
      } else {
        // For interest checkboxes
        const updatedInterests = [...formData.interests];
        if (checked) {
          updatedInterests.push(value);
        } else {
          const index = updatedInterests.indexOf(value);
          if (index > -1) {
            updatedInterests.splice(index, 1);
          }
        }
        
        setFormData({
          ...formData,
          interests: updatedInterests
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Move to success step
    nextStep();
  };
  
  // Validation for each step
  const validateStep1 = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone;
  };
  
  const validateStep2 = () => {
    return formData.profession && formData.organization && formData.experience;
  };
  
  const validateStep3 = () => {
    return formData.agreeTerms && formData.agreePrivacy;
  };
  
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Registration</PageTitle>
          <PageDescription>
            Register for the Annual Healthcare Conference 2024. Complete the form below to secure your spot at the most comprehensive nursing and healthcare event of the year.
          </PageDescription>
          
          <FormContainer>
            {currentStep <= 4 && (
              <StepIndicator>
                <Step active={currentStep === 1} completed={currentStep > 1} label="Personal">
                  1
                </Step>
                <Step active={currentStep === 2} completed={currentStep > 2} label="Professional">
                  2
                </Step>
                <Step active={currentStep === 3} completed={currentStep > 3} label="Preferences">
                  3
                </Step>
                <Step active={currentStep === 4} completed={currentStep > 4} label="Confirm">
                  4
                </Step>
              </StepIndicator>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              <StepContent active={currentStep === 1}>
                <h2>Personal Information</h2>
                <p>Please provide your contact details so we can keep you updated about the event.</p>
                
                <FormGroup>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
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
                
                <ButtonGroup>
                  <div></div> {/* Empty div for spacing */}
                  <Button type="button" onClick={nextStep} disabled={!validateStep1()}>
                    Next Step
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 2: Professional Information */}
              <StepContent active={currentStep === 2}>
                <h2>Professional Information</h2>
                <p>Tell us about your professional background to help us tailor the event to your needs.</p>
                
                <FormGroup>
                  <Label htmlFor="profession">Profession/Specialty *</Label>
                  <Select 
                    id="profession" 
                    name="profession" 
                    value={formData.profession}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select your profession</option>
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="Nurse Practitioner">Nurse Practitioner</option>
                    <option value="Clinical Nurse Specialist">Clinical Nurse Specialist</option>
                    <option value="Nurse Educator">Nurse Educator</option>
                    <option value="Nurse Administrator">Nurse Administrator</option>
                    <option value="Nursing Student">Nursing Student</option>
                    <option value="Other Healthcare Professional">Other Healthcare Professional</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="organization">Organization/Institution *</Label>
                  <Input 
                    type="text" 
                    id="organization" 
                    name="organization" 
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select 
                    id="experience" 
                    name="experience" 
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select years of experience</option>
                    <option value="Student">Student</option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="11-15 years">11-15 years</option>
                    <option value="16+ years">16+ years</option>
                  </Select>
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>
                    Previous Step
                  </Button>
                  <Button type="button" onClick={nextStep} disabled={!validateStep2()}>
                    Next Step
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 3: Preferences */}
              <StepContent active={currentStep === 3}>
                <h2>Preferences & Additional Information</h2>
                <p>Help us make your conference experience better by sharing your preferences.</p>
                
                <FormGroup>
                  <Label>Areas of Interest (Select all that apply)</Label>
                  <CheckboxGroup>
                    <Checkbox 
                      type="checkbox" 
                      id="interest1" 
                      name="interests" 
                      value="Clinical Practice"
                      checked={formData.interests.includes('Clinical Practice')}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel htmlFor="interest1">Clinical Practice</CheckboxLabel>
                  </CheckboxGroup>
                  
                  <CheckboxGroup>
                    <Checkbox 
                      type="checkbox" 
                      id="interest2" 
                      name="interests" 
                      value="Research"
                      checked={formData.interests.includes('Research')}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel htmlFor="interest2">Research</CheckboxLabel>
                  </CheckboxGroup>
                  
                  <CheckboxGroup>
                    <Checkbox 
                      type="checkbox" 
                      id="interest3" 
                      name="interests" 
                      value="Education"
                      checked={formData.interests.includes('Education')}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel htmlFor="interest3">Education</CheckboxLabel>
                  </CheckboxGroup>
                  
                  <CheckboxGroup>
                    <Checkbox 
                      type="checkbox" 
                      id="interest4" 
                      name="interests" 
                      value="Leadership"
                      checked={formData.interests.includes('Leadership')}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel htmlFor="interest4">Leadership</CheckboxLabel>
                  </CheckboxGroup>
                  
                  <CheckboxGroup>
                    <Checkbox 
                      type="checkbox" 
                      id="interest5" 
                      name="interests" 
                      value="Technology"
                      checked={formData.interests.includes('Technology')}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel htmlFor="interest5">Technology</CheckboxLabel>
                  </CheckboxGroup>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions/Preferences</Label>
                  <Input 
                    type="text" 
                    id="dietaryRestrictions" 
                    name="dietaryRestrictions" 
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    placeholder="If any"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="emergencyContact">Emergency Contact Information</Label>
                  <Input 
                    type="text" 
                    id="emergencyContact" 
                    name="emergencyContact" 
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Name and phone number"
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>
                    Previous Step
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next Step
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 4: Confirmation */}
              <StepContent active={currentStep === 4}>
                <h2>Confirm Registration</h2>
                <p>Please review your information and confirm your registration.</p>
                
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
                      I agree to the terms and conditions of the conference *
                    </CheckboxLabel>
                  </CheckboxGroup>
                  
                  <CheckboxGroup>
                    <Checkbox 
                      type="checkbox" 
                      id="agreePrivacy" 
                      name="agreePrivacy" 
                      checked={formData.agreePrivacy}
                      onChange={handleInputChange}
                      required
                    />
                    <CheckboxLabel htmlFor="agreePrivacy">
                      I consent to the processing of my personal data in accordance with the privacy policy *
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>
                    Previous Step
                  </Button>
                  <Button type="submit" disabled={!validateStep3()}>
                    Complete Registration
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Success Message */}
              <StepContent active={currentStep === 5}>
                <SuccessMessage>
                  <SuccessIcon>✓</SuccessIcon>
                  <h2>Registration Successful!</h2>
                  <p>Thank you for registering for the Annual Healthcare Conference 2024. We've sent a confirmation email to {formData.email} with all the details.</p>
                  <p>We look forward to seeing you at the event!</p>
                </SuccessMessage>
              </StepContent>
            </form>
          </FormContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Registration;