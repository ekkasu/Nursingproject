import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { validateEmail, validatePhone, formatPhoneNumber } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

// Main container styles
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  position: relative;
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

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
`;

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showProcessOverview, setShowProcessOverview] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data from API endpoints
  const [jobTitles, setJobTitles] = useState([]);
  const [userTitles, setUserTitles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    user_title_id: '',
    full_name: '',
    phone: '',
    email: '',
    gender: '',
    job_title_id: '',
    place_of_work: '',
    region_id: '',
    district_id: '',
    profile: '',
    password: '',
    password_confirmation: ''
  });

  // Fetch all necessary data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting to fetch data...');
        const [
          jobTitlesRes,
          userTitlesRes,
          regionsRes,
          categoriesRes
        ] = await Promise.all([
          api.getJobTitles(),
          api.getUserTitles(),
          api.getRegions(),
          api.getCategories()
        ]);

        console.log('Job Titles Response:', jobTitlesRes);
        console.log('User Titles Response:', userTitlesRes);
        console.log('Regions Response:', regionsRes);
        console.log('Categories Response:', categoriesRes);

        setJobTitles(jobTitlesRes);
        setUserTitles(userTitlesRes);
        setRegions(regionsRes);
        setCategories(categoriesRes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch districts when region changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.region_id) {
        try {
          const response = await api.getDistricts(formData.region_id);
          setDistricts(response);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    };

    fetchDistricts();
  }, [formData.region_id]);

  // Check if user came from payment page or accessed directly
  useEffect(() => {
    // If there's no state or referrer, redirect to tickets page
    if (!location.state?.fromPayment) {
      navigate('/tickets', { replace: true });
    }
    
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, location]);
  
  useEffect(() => {
    if (currentStep === 6) {
      const redirectTimer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [currentStep, navigate]);

  if (isLoading) {
    return <LoadingSpinner text="Loading registration form..." fullScreen />;
  }
  
  if (isSubmitting) {
    return <LoadingSpinner text="Processing your registration..." fullScreen />;
  }

  // If redirecting, return null to prevent rendering
  if (!location.state?.fromPayment) {
    return null;
  }
  
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // Here you would verify the code with your backend
    if (verificationCode) {
      setCodeVerified(true);
      setCurrentStep(1);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const isValid = validatePhone(value);
      if (!isValid && value.length > 0) {
        // Handle phone validation error
        return;
      }
    } else if (name === 'email') {
      const isValid = validateEmail(value);
      if (!isValid && value.length > 0) {
        // Handle email validation error
        return;
      }
    } else if (name === 'password_confirmation') {
      if (value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const startRegistration = () => {
    setShowProcessOverview(false);
    setCurrentStep(1);
    // Smooth scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const nextStep = () => {
    if (currentStep === 1) {
      // Validate passwords before proceeding
      if (formData.password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        return;
      }
      if (formData.password !== formData.password_confirmation) {
        setPasswordError('Passwords do not match');
        return;
      }
      setPasswordError('');
    }
    setCurrentStep(currentStep + 1);
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    if (currentStep === 1) {
      // If going back from first step, show process overview again
      setShowProcessOverview(true);
    } else {
      setCurrentStep(currentStep - 1);
    }
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.register(formData);
      
      if (response) {
        // Handle successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update the button validation logic
  const validateForm = () => {
    return (
      formData.user_title_id &&
      formData.full_name &&
      formData.phone &&
      validatePhone(formData.phone) &&
      formData.email &&
      validateEmail(formData.email) &&
      formData.gender &&
      formData.job_title_id &&
      formData.place_of_work &&
      formData.region_id &&
      formData.district_id &&
      formData.password &&
      formData.password_confirmation &&
      !passwordError
    );
  };

  // Function to get button text based on current step
  const getNextButtonText = () => {
    if (currentStep === 5) return "Submit";
    return "Next Step";
  };

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
              {showProcessOverview ? (
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
                  
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Button 
                      onClick={startRegistration}
                      style={{
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        backgroundColor: '#1a8f4c',
                        color: 'white',
                        borderRadius: '30px',
                        boxShadow: '0 4px 10px rgba(26, 143, 76, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Start Registration
                    </Button>
                  </div>
                </ProcessSection>
              ) : (
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
                        <Label htmlFor="user_title_id">Title *</Label>
                        <Select
                          id="user_title_id"
                          name="user_title_id"
                          value={formData.user_title_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Title</option>
                          {userTitles.map(title => (
                            <option key={title.id} value={title.id}>
                              {title.name}
                            </option>
                          ))}
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input
                          type="text"
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
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
                        <Label htmlFor="gender">Gender *</Label>
                        <Select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="job_title_id">Job Title *</Label>
                        <Select
                          id="job_title_id"
                          name="job_title_id"
                          value={formData.job_title_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Job Title</option>
                          {jobTitles && jobTitles.length > 0 ? (
                            jobTitles.map(title => {
                              console.log('Rendering job title:', title);
                              return (
                                <option key={title.id} value={title.id}>
                                  {title.name || title.title || 'Unnamed Title'}
                                </option>
                              );
                            })
                          ) : (
                            <option value="" disabled>Loading job titles...</option>
                          )}
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="place_of_work">Place of Work *</Label>
                        <Input
                          type="text"
                          id="place_of_work"
                          name="place_of_work"
                          value={formData.place_of_work}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="region_id">Region *</Label>
                        <Select
                          id="region_id"
                          name="region_id"
                          value={formData.region_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Region</option>
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>
                              {region.name}
                            </option>
                          ))}
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="district_id">District *</Label>
                        <Select
                          id="district_id"
                          name="district_id"
                          value={formData.district_id}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.region_id}
                        >
                          <option value="">Select District</option>
                          {districts.map(district => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="profile">Profile</Label>
                        <Input
                          as="textarea"
                          id="profile"
                          name="profile"
                          value={formData.profile}
                          onChange={handleInputChange}
                          rows={4}
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
                          minLength={8}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="password_confirmation">Confirm Password *</Label>
                        <Input
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          required
                        />
                        {passwordError && (
                          <ErrorText>{passwordError}</ErrorText>
                        )}
                      </FormGroup>
                      
                      <ButtonGroup>
                        <Button 
                          type="button" 
                          onClick={prevStep} 
                          secondary
                          style={{
                            padding: '12px 20px',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}
                        >
                          Back to Overview
                        </Button>
                        <Button 
                          type="button" 
                          onClick={nextStep} 
                          disabled={!validateForm()}
                          style={{
                            padding: '12px 20px',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}
                        >
                          Next Step
                        </Button>
                      </ButtonGroup>
                    </StepContent>
                    
                    {/* Step 2: Professional Information */}
                    <StepContent active={currentStep === 2}>
                      <h2>Professional Information</h2>
                      <p>Tell us about your professional background to help us tailor the event to your needs.</p>
                      
                      <FormGroup>
                        <Label htmlFor="job_title_id">Job Title *</Label>
                        <Select
                          id="job_title_id"
                          name="job_title_id"
                          value={formData.job_title_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Job Title</option>
                          {jobTitles.map(title => (
                            <option key={title.id} value={title.id}>
                              {title.name}
                            </option>
                          ))}
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="place_of_work">Place of Work *</Label>
                        <Input
                          type="text"
                          id="place_of_work"
                          name="place_of_work"
                          value={formData.place_of_work}
                          onChange={handleInputChange}
                          required
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
                    
                    {/* Step 3: Preferences */}
                    <StepContent active={currentStep === 3}>
                      <h2>Preferences & Additional Information</h2>
                      <p>Help us make your conference experience better by sharing your preferences.</p>
                      
                      <FormGroup>
                        <Label htmlFor="region_id">Region *</Label>
                        <Select
                          id="region_id"
                          name="region_id"
                          value={formData.region_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Region</option>
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>
                              {region.name}
                            </option>
                          ))}
                        </Select>
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="district_id">District *</Label>
                        <Select
                          id="district_id"
                          name="district_id"
                          value={formData.district_id}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.region_id}
                        >
                          <option value="">Select District</option>
                          {districts.map(district => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </Select>
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
                        <Button type="button" onClick={nextStep} disabled={!validateForm()}>
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
                          <p><strong>Name:</strong> {formData.full_name}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                          <p><strong>Job Title:</strong> {formData.job_title_id}</p>
                          <p><strong>Place of Work:</strong> {formData.place_of_work}</p>
                          <p><strong>Region:</strong> {formData.region_id}</p>
                          <p><strong>District:</strong> {formData.district_id}</p>
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
                          disabled={!validateForm() || isSubmitting}
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
              )}
            </>
          )}
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Registration;