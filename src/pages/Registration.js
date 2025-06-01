import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

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
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #1a8f4c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 3rem;
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
`;

const SuccessTitle = styled.h2`
  color: #1a8f4c;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SuccessText = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const RedirectText = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-top: 30px;
`;

const ProcessSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const ProcessTitle = styled.h2`
  font-size: 1.8rem;
  color: #156e3a;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);

  &::after {
    content: '';
    display: block;
    width: 60%;
    height: 3px;
    background: linear-gradient(90deg, #1a8f4c, #FFD700);
    margin: 10px auto 0;
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ProcessStep = styled.div`
  text-align: center;
  padding: 30px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  border: 1px solid rgba(26, 143, 76, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 215, 0, 0.3);
  }

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: #FFD700;
    color: #156e3a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 2px solid white;
  }
`;

const StepTitle = styled.h3`
  color: #156e3a;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const AccommodationCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f0fff4' : 'white'};
  border-color: ${props => props.selected ? '#1a8f4c' : '#e2e8f0'};

  &:hover {
    border-color: #1a8f4c;
    transform: translateY(-2px);
  }
`;

const AccommodationTitle = styled.h3`
  color: #1a8f4c;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const AccommodationDetails = styled.div`
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const AccommodationPrice = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
`;

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profession: '',
    organization: '',
    experience: '',
    interests: [],
    dietaryRestrictions: '',
    emergencyContact: '',
    agreeTerms: false,
    agreePrivacy: false,
    accommodation: ''
  });
  
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // Here you would verify the code with your backend
    if (verificationCode) {
      setCodeVerified(true);
      setCurrentStep(1);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeTerms' || name === 'agreePrivacy') {
        setFormData({
          ...formData,
          [name]: checked
        });
      } else {
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
    if (currentStep === 1) {
      // Validate passwords before proceeding
      if (formData.password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      setPasswordError('');
    }
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Move to success step
      setCurrentStep(6);
      
      // Clear form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        profession: '',
        organization: '',
        experience: '',
        interests: [],
        dietaryRestrictions: '',
        emergencyContact: '',
        agreeTerms: false,
        agreePrivacy: false,
        accommodation: ''
      });

    } catch (error) {
      console.error('Registration failed:', error);
      // Here you would typically show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Validation for each step
  const validateStep1 = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.password && 
           formData.confirmPassword;
  };
  
  const validateStep2 = () => {
    return formData.profession && formData.organization && formData.experience;
  };
  
  const validateStep3 = () => {
    return formData.agreeTerms && formData.agreePrivacy;
  };
  
  const validateStep4 = () => {
    return formData.accommodation !== '';
  };
  
  useEffect(() => {
    if (currentStep === 6) {
      const redirectTimer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [currentStep, navigate]);
  
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Register for NMCON 2025</PageTitle>
          <PageDescription>
            {!codeVerified 
              ? "Enter your verification code received after ticket purchase to begin registration."
              : "Join us for an enriching experience of learning, networking, and professional growth."
            }
          </PageDescription>

          {!codeVerified ? (
            <FormContainer>
              <form onSubmit={handleCodeSubmit}>
                <h2>Verification Required</h2>
                <p>Please enter the verification code sent to you after your ticket purchase.</p>
                
                <FormGroup>
                  <Label htmlFor="verificationCode">Verification Code *</Label>
                  <Input 
                    type="text" 
                    id="verificationCode" 
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter your verification code"
                    required
                  />
                </FormGroup>

                <ButtonGroup>
                  <div></div>
                  <Button type="submit">
                    Verify Code
                  </Button>
                </ButtonGroup>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Link to="/tickets" style={{ color: '#1a8f4c', textDecoration: 'none' }}>
                    Need to purchase a ticket first?
                  </Link>
                </div>
              </form>
            </FormContainer>
          ) : (
            <>
              <ProcessSection>
                <ProcessTitle>Registration Process</ProcessTitle>
                <ProcessSteps>
                  <ProcessStep number="1">
                    <StepTitle>Enter Details</StepTitle>
                    <StepDescription>
                      Complete all required personal and professional information in the registration form.
                    </StepDescription>
                  </ProcessStep>
                  
                  <ProcessStep number="2">
                    <StepTitle>Select Accommodation</StepTitle>
                    <StepDescription>
                      Choose from available accommodation options for your stay during the conference.
                    </StepDescription>
                  </ProcessStep>
                  
                  <ProcessStep number="3">
                    <StepTitle>Create Account</StepTitle>
                    <StepDescription>
                      Set up your login credentials for accessing the conference portal.
                    </StepDescription>
                  </ProcessStep>
                  
                  <ProcessStep number="4">
                    <StepTitle>Access Portal</StepTitle>
                    <StepDescription>
                      Log into the portal to access conference materials and updates.
                    </StepDescription>
                  </ProcessStep>
                </ProcessSteps>
              </ProcessSection>

              <FormContainer>
                {currentStep <= 5 && (
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
                    <Step active={currentStep === 4} completed={currentStep > 4} label="Accommodation">
                      4
                    </Step>
                    <Step active={currentStep === 5} completed={currentStep > 5} label="Confirm">
                      5
                    </Step>
                  </StepIndicator>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  <StepContent active={currentStep === 1}>
                    <h2>Personal Information</h2>
                    <p>Please provide your contact details and create your account password.</p>
                    
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

                    <FormGroup>
                      <Label htmlFor="password">Password *</Label>
                      <Input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Minimum 8 characters"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      {passwordError && (
                        <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          {passwordError}
                        </div>
                      )}
                    </FormGroup>
                    
                    <ButtonGroup>
                      <div></div>
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
                  
                  {/* Step 4: Accommodation */}
                  <StepContent active={currentStep === 4}>
                    <h2>Select Accommodation</h2>
                    <p>Choose your preferred accommodation option for the duration of the conference.</p>

                    <FormGroup>
                      <AccommodationCard 
                        selected={formData.accommodation === 'standard'}
                        onClick={() => handleInputChange({ target: { name: 'accommodation', value: 'standard' } })}
                      >
                        <AccommodationTitle>Standard Room</AccommodationTitle>
                        <AccommodationDetails>
                          <ul>
                            <li>Single occupancy</li>
                            <li>En-suite bathroom</li>
                            <li>Basic amenities</li>
                            <li>Daily housekeeping</li>
                          </ul>
                        </AccommodationDetails>
                        <AccommodationPrice>$150/night</AccommodationPrice>
                      </AccommodationCard>

                      <AccommodationCard 
                        selected={formData.accommodation === 'deluxe'}
                        onClick={() => handleInputChange({ target: { name: 'accommodation', value: 'deluxe' } })}
                      >
                        <AccommodationTitle>Deluxe Room</AccommodationTitle>
                        <AccommodationDetails>
                          <ul>
                            <li>Spacious room with city view</li>
                            <li>Premium amenities</li>
                            <li>Work desk and seating area</li>
                            <li>24/7 room service</li>
                          </ul>
                        </AccommodationDetails>
                        <AccommodationPrice>$250/night</AccommodationPrice>
                      </AccommodationCard>

                      <AccommodationCard 
                        selected={formData.accommodation === 'suite'}
                        onClick={() => handleInputChange({ target: { name: 'accommodation', value: 'suite' } })}
                      >
                        <AccommodationTitle>Executive Suite</AccommodationTitle>
                        <AccommodationDetails>
                          <ul>
                            <li>Separate living area</li>
                            <li>Luxury amenities</li>
                            <li>Complimentary breakfast</li>
                            <li>VIP services</li>
                          </ul>
                        </AccommodationDetails>
                        <AccommodationPrice>$350/night</AccommodationPrice>
                      </AccommodationCard>

                      <AccommodationCard 
                        selected={formData.accommodation === 'none'}
                        onClick={() => handleInputChange({ target: { name: 'accommodation', value: 'none' } })}
                      >
                        <AccommodationTitle>No Accommodation Needed</AccommodationTitle>
                        <AccommodationDetails>
                          Select this option if you have your own accommodation arrangements.
                        </AccommodationDetails>
                      </AccommodationCard>
                    </FormGroup>

                    <ButtonGroup>
                      <Button type="button" onClick={prevStep} secondary>
                        Previous Step
                      </Button>
                      <Button type="button" onClick={nextStep} disabled={!validateStep4()}>
                        Next Step
                      </Button>
                    </ButtonGroup>
                  </StepContent>
                  
                  {/* Step 5: Confirmation */}
                  <StepContent active={currentStep === 5}>
                    <h2>Confirm Registration</h2>
                    <p>Please review your information and confirm your registration.</p>
                    
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Registration Summary</h3>
                      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                        <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Profession:</strong> {formData.profession}</p>
                        <p><strong>Organization:</strong> {formData.organization}</p>
                        <p><strong>Experience:</strong> {formData.experience}</p>
                        <p><strong>Accommodation:</strong> {
                          formData.accommodation === 'none' 
                            ? 'No accommodation needed'
                            : formData.accommodation.charAt(0).toUpperCase() + formData.accommodation.slice(1) + ' Room'
                        }</p>
                      </div>
                    </div>
                    
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
                      <Button 
                        type="submit" 
                        disabled={!validateStep3() || isSubmitting}
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? 'Processing...' : 'Complete Registration'}
                      </Button>
                    </ButtonGroup>
                  </StepContent>
                  
                  {/* Success Message */}
                  <StepContent active={currentStep === 6}>
                    <SuccessMessage>
                      <SuccessIcon>✓</SuccessIcon>
                      <SuccessTitle>Registration Successful!</SuccessTitle>
                      <SuccessText>
                        Congratulations! Your registration for NMCON 2025 has been completed successfully.
                        We've sent a confirmation email to {formData.email} with your registration details.
                      </SuccessText>
                      <SuccessText>
                        Get ready for an enriching experience of learning, networking, and professional growth!
                      </SuccessText>
                      <RedirectText>
                        Redirecting you to login page in 3 seconds...
                      </RedirectText>
                    </SuccessMessage>
                  </StepContent>
                </form>
              </FormContainer>
            </>
          )}
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Registration;