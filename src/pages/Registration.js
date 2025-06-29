import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { validatePhone, formatPhoneNumber } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

// Main container styles
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 40px;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

// Form container and elements
const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 25px 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
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
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 25px;
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
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
    
    &::after {
      font-size: 0.7rem;
      width: 70px;
      top: 40px;
    }
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
    
    &::after {
      font-size: 0.6rem;
      width: 60px;
      top: 35px;
    }
  }
`;

const StepContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }
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
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.95rem;
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
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.95rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #1a8f4c;
  
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #34495e;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
  }
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
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.95rem;
    width: 100%;
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
  
  @media (max-width: 768px) {
    padding: 30px 15px;
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
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
    margin-bottom: 25px;
  }
`;

const SuccessTitle = styled.h2`
  color: #1a8f4c;
  font-size: 2rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
`;

const SuccessText = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 15px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const RedirectText = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-top: 25px;
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  padding: 12px 30px;
  background-color: #1a8f4c;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: #156e3a;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 0.95rem;
    width: 100%;
    max-width: 300px;
  }
`;

const ProcessSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 25px 20px;
    margin-bottom: 20px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 25px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
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
  
  @media (max-width: 768px) {
    padding: 25px 15px;
    
    &::before {
      width: 25px;
      height: 25px;
      font-size: 0.9rem;
    }
  }
`;

const StepTitle = styled.h3`
  color: #156e3a;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 12px;
  }
`;

const AccommodationTitle = styled.h3`
  color: #1a8f4c;
  margin-bottom: 10px;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
`;

const AccommodationDetails = styled.div`
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }
`;

const AccommodationPrice = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  
  ul {
    margin-top: 5px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 3px;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PasswordStrengthIndicator = styled.div`
  height: 5px;
  margin-top: 8px;
  border-radius: 3px;
  background: ${props => {
    if (props.strength === 'strong') return '#1a8f4c';
    if (props.strength === 'medium') return '#f39c12';
    if (props.strength === 'weak') return '#e74c3c';
    return '#e0e0e0';
  }};
  transition: all 0.3s ease;
`;

// Add ProcessOverview component
const ProcessOverview = ({ onStart, steps }) => {
  return (
    <ProcessSection>
      <ProcessTitle>Registration Process</ProcessTitle>
      <ProcessSteps>
        {steps.map((step, index) => (
          <ProcessStep key={index} number={index + 1}>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </ProcessStep>
        ))}
      </ProcessSteps>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button 
          onClick={onStart}
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
  );
};

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showProcessOverview, setShowProcessOverview] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [profilePictureError, setProfilePictureError] = useState('');
  
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
    password_confirmation: '',
    accommodation: 'none',
    registration_type: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  // Add state for profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  // Add registrationSteps
  const registrationSteps = [
    {
      title: "Terms & Conditions",
      description: "Please read and agree to our terms and conditions."
    },
    {
      title: "Personal Information",
      description: "Fill in your basic contact details and create your account."
    },
    {
      title: "Accommodation",
      description: "Choose your accommodation preferences for the conference."
    },
    {
      title: "Review & Submit",
      description: "Review your information and complete your registration."
    }
  ];

  // Add getStepLabel function
  const getStepLabel = (step) => {
    switch (step) {
      case 1:
        return "Terms";
      case 2:
        return "Personal";
      case 3:
        return "Accommodation";
      case 4:
        return "Confirm";
      default:
        return "";
    }
  };

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
        console.log('Regions Response Type:', typeof regionsRes);
        console.log('Regions Array Check:', Array.isArray(regionsRes));
        console.log('Regions Length:', regionsRes ? regionsRes.length : 'undefined');
        if (regionsRes && regionsRes.length > 0) {
          console.log('First Region Item:', regionsRes[0]);
        }
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
          setIsLoadingDistricts(true);
          const response = await api.getDistrictsByRegion(formData.region_id);
          setDistricts(response);
        } catch (error) {
          console.error('Error fetching districts:', error);
        } finally {
          setIsLoadingDistricts(false);
        }
      }
    };

    fetchDistricts();
  }, [formData.region_id]);

  // Check if user has selected a ticket
  useEffect(() => {
    // If there's no selected ticket, redirect to tickets page
    if (!location.state?.selectedTicket) {
      navigate('/tickets', { replace: true });
    } else {
      // Set registration type based on selected ticket
      setFormData(prev => ({
        ...prev,
        registration_type: location.state.selectedTicket.registration_type || 'online'
      }));
    }
    
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  if (isLoading) {
    return <LoadingSpinner text="Loading registration form..." fullScreen />;
  }
  
  if (isSubmitting) {
    return <LoadingSpinner text="Processing your registration..." fullScreen />;
  }

  // If no ticket selected, return null to prevent rendering
  if (!location.state?.selectedTicket) {
    return null;
  }
  
  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
      
      // Convert image to base64 if needed by the API
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Store the base64 string in case the API needs it instead of a file
        setFormData(prev => ({
          ...prev,
          profileBase64: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox inputs differently
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }
    
    if (name === 'phone') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedDigits = digitsOnly.slice(0, 10);
      
      // Always update the form data
      setFormData(prev => ({
        ...prev,
        [name]: limitedDigits
      }));
      
      // Only show validation errors if there's input and it's invalid
      if (limitedDigits && limitedDigits.length > 0) {
        if (limitedDigits.length !== 10) {
          setPhoneError('Phone number must be exactly 10 digits');
        } else {
          setPhoneError('');
        }
      } else {
        setPhoneError('');
      }
      return;
    } else if (name === 'email') {
      // Always update the form data without validation
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear any existing email errors
      setEmailError('');
      return;
    } else if (name === 'password') {
      // Validate password strength
      if (value.length > 0) {
        const passwordCheck = checkPasswordStrength(value);
        setPasswordStrength(passwordCheck.strength);
        if (!passwordCheck.isValid) {
          setPasswordError(passwordCheck.message);
        } else {
          // If password confirmation exists, check if they match
          if (formData.password_confirmation && value !== formData.password_confirmation) {
            setPasswordError('Passwords do not match');
          } else {
            setPasswordError('');
          }
        }
      } else {
        setPasswordError('');
        setPasswordStrength('');
      }
    } else if (name === 'password_confirmation') {
      if (formData.password && value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    } else if (name === 'region_id') {
      // Clear the district selection when a new region is selected
      setFormData(prev => ({
        ...prev,
        [name]: value,
        district_id: ''
      }));
      return;
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
      if (!formData.agreeTerms || !formData.agreePrivacy) {
        return;
      }
    }

    if (currentStep === 2) {
      if (!profilePicture) {
        setProfilePictureError('Profile picture is required');
        return;
      } else {
        setProfilePictureError('');
      }
      const passwordCheck = checkPasswordStrength(formData.password);
      if (!passwordCheck.isValid) {
        setPasswordError(passwordCheck.message);
        return;
      }
      if (formData.password !== formData.password_confirmation) {
        setPasswordError('Passwords do not match');
        return;
      }
      setPasswordError('');
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    if (currentStep === 1) {
      // If going back from first step, show process overview again
      setShowProcessOverview(true);
    } else {
      setCurrentStep(prev => prev - 1);
    }
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordError) {
      setRegistrationError(passwordError);
      setIsSubmitting(false);
      return;
    }

    // Clear any previous registration errors
    setRegistrationError('');
    setIsSubmitting(true);

    try {
      // Make sure the terms checkboxes are checked
      if (!formData.agreeTerms || !formData.agreePrivacy) {
        setRegistrationError('Please agree to the terms and privacy policy');
        setIsSubmitting(false);
        return;
      }

      // Ensure all required fields are present
      const requiredFields = [
        'user_title_id', 'full_name', 'phone', 'email', 'gender',
        'job_title_id', 'place_of_work', 'region_id', 'district_id',
        'password', 'password_confirmation', 'registration_type'
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        setRegistrationError(`Missing required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }
      
      // Verify passwords match and meet minimum length
      if (formData.password !== formData.password_confirmation) {
        setRegistrationError('Passwords do not match');
        setIsSubmitting(false);
        return;
      }
      
      if (formData.password.length < 8) {
        setRegistrationError('Password must be at least 8 characters long');
        setIsSubmitting(false);
        return;
      }

      let response;
      
      // Log the data we're about to send
      console.log('Preparing to submit registration form with data:', {
        ...formData,
        password: '********', // Don't log actual password
        password_confirmation: '********',
        profilePicture: profilePicture ? `File: ${profilePicture.name}` : 'None'
      });
      
      // Try with simple JSON payload first - sometimes FormData can cause issues
      try {
        console.log('Trying registration with direct JSON payload');
        
        // Create a clean JSON payload
        const jsonData = {
          user_title_id: String(formData.user_title_id),
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          gender: formData.gender,
          job_title_id: String(formData.job_title_id),
          place_of_work: formData.place_of_work,
          region_id: String(formData.region_id),
          district_id: String(formData.district_id),
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          registration_type: formData.registration_type
        };
        
        // Add profile if available
        if (formData.profileBase64) {
          jsonData.profile = formData.profileBase64;
        }
        
        console.log('JSON data keys:', Object.keys(jsonData));
        response = await api.registerWithProfilePicture(jsonData);
      } catch (jsonError) {
        console.error('JSON approach failed:', jsonError);
        
        // If JSON fails, try with FormData (file upload approach)
        console.log('Trying registration with FormData approach');
        const formDataToSend = new FormData();
        
        // Add all form fields to FormData - ensure all values are strings
        Object.keys(formData).forEach(key => {
          if (key !== 'profile' && key !== 'profileBase64' && key !== 'agreeTerms' && key !== 'agreePrivacy' && key !== 'accommodation') {
            // Convert all values to strings
            const value = formData[key] === null || formData[key] === undefined ? '' : String(formData[key]);
            formDataToSend.append(key, value);
            console.log(`Adding form field: ${key} = ${key.includes('password') ? '********' : value}`);
          }
        });
        
        // Add profile picture if selected
        if (profilePicture) {
          formDataToSend.append('profile', profilePicture);
          console.log(`Adding profile picture: ${profilePicture.name} (${profilePicture.type}, ${profilePicture.size} bytes)`);
        }
        
        response = await api.registerWithProfilePicture(formDataToSend);
      }
      
      console.log('Registration response:', response);
      
      if (response) {
        // Handle successful registration
        setRegistrationSuccess(true);
        
        // Redirect to external portal after 5 seconds
        setTimeout(() => {
          window.location.href = 'https://portal.mohannualcon.com/';
        }, 5000);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      
      // Extract error message if available
      let errorMessage = 'Registration failed. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }
      
      // Check if it's a validation error and format it nicely
      if (typeof errorMessage === 'string' && errorMessage.startsWith('Validation failed:')) {
        const validationErrors = errorMessage.replace('Validation failed:', '').trim();
        
        // Split by semicolon and format as bullet points
        const errorPoints = validationErrors.split(';').map(err => err.trim());
        
        errorMessage = (
          <div>
            <strong>Please fix the following errors:</strong>
            <ul style={{ textAlign: 'left', marginTop: '10px' }}>
              {errorPoints.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      setRegistrationError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update the validateForm function
  const validateForm = () => {
    // For terms and conditions step (step 1)
    if (currentStep === 1) {
      return formData.agreeTerms && formData.agreePrivacy;
    }

    // For other steps
    const isPhoneValid = formData.phone && formData.phone.length === 10 && /^\d{10}$/.test(formData.phone);
    const isEmailValid = formData.email && formData.email.length > 0;
    const isPasswordValid = formData.password && formData.password.length >= 8;
    const doPasswordsMatch = formData.password === formData.password_confirmation;
    const isProfilePictureValid = !!profilePicture;
    
    // Basic validation for all steps
    const baseValidation = (
      formData.user_title_id &&
      formData.full_name &&
      isPhoneValid &&
      isEmailValid &&
      formData.gender &&
      formData.job_title_id &&
      formData.place_of_work &&
      formData.region_id &&
      formData.district_id &&
      isPasswordValid &&
      doPasswordsMatch &&
      formData.registration_type &&
      !passwordError &&
      !phoneError &&
      isProfilePictureValid
    );
    
    // Additional validation for final confirmation step
    if (currentStep === 4) {
      return baseValidation && formData.agreeTerms && formData.agreePrivacy;
    }
    
    return baseValidation;
  };

  // Function to get button text based on current step
  const getNextButtonText = () => {
    if (currentStep === 3) return "Submit";
    return "Next Step";
  };

  // Generate a strong random password following ISO 27001 standards
  const generateStrongPassword = () => {
    // Define character sets
    const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Removed confusing chars like I, O
    const lowercaseChars = 'abcdefghijkmnopqrstuvwxyz'; // Removed confusing chars like l
    const numberChars = '23456789'; // Removed confusing chars like 0, 1
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Password length between 12-16 characters
    const length = Math.floor(Math.random() * 5) + 12;
    
    let password = '';
    
    // Ensure at least one character from each set
    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    
    // Fill the rest of the password
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = 4; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    // Update form state with the new password
    setFormData(prev => ({
      ...prev,
      password: password,
      password_confirmation: password
    }));
    
    // Set password strength to strong
    setPasswordStrength('strong');
    setPasswordError('');
    
    // Show the password temporarily
    setShowPassword(true);
    
    // Hide password after 10 seconds for security
    setTimeout(() => {
      setShowPassword(false);
    }, 10000);
  };
  
  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) return { isValid: false, message: 'Password is required', strength: '' };
    
    let score = 0;
    let strength = '';
    
    // Check minimum length
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long', strength: 'weak' };
    } else {
      // Length score: 0-2 points
      score += Math.min(2, Math.floor(password.length / 4));
    }
    
    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must include at least one uppercase letter', strength: 'weak' };
    } else {
      // Uppercase score: 0-1 points
      score += 1;
    }
    
    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must include at least one lowercase letter', strength: 'weak' };
    } else {
      // Lowercase score: 0-1 points
      score += 1;
    }
    
    // Check for numbers
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must include at least one number', strength: 'weak' };
    } else {
      // Number score: 0-1 points
      score += 1;
    }
    
    // Check for special characters
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { isValid: false, message: 'Password must include at least one special character', strength: 'weak' };
    } else {
      // Special char score: 0-2 points
      score += 2;
    }
    
    // Calculate strength based on score (max score: 7)
    if (score >= 6) {
      strength = 'strong';
    } else if (score >= 4) {
      strength = 'medium';
    } else {
      strength = 'weak';
    }
    
    return { isValid: true, message: 'Password is valid', strength };
  };

  // Add Terms and Conditions content
  const TermsAndConditions = () => (
    <div style={{ 
      maxHeight: '400px', 
      overflowY: 'auto', 
      padding: window.innerWidth <= 768 ? '15px' : '20px', 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px', 
      marginBottom: '20px',
      fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem'
    }}>
      <h3 style={{ 
        color: '#1a8f4c', 
        marginBottom: '15px',
        fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.3rem'
      }}>
        Terms and Conditions for NMLMCON 2025
      </h3>
      
      <p>
        By registering for this conference and paying the registration fee, you're all set to join us! Please note that we've incurred costs to prepare for the event, and your payment is non-refundable.
      </p>
      
      <p><strong>Important Details:</strong></p>
      <ul style={{ 
        paddingLeft: window.innerWidth <= 768 ? '15px' : '20px', 
        marginBottom: '20px',
        fontSize: 'inherit'
      }}>
        <li>Your Registration is complete only if you have done full payment of the conference fee of GHS 3,500</li>
        <li>All payments Must be done by 22nd August being the Deadline for Registration and Payment</li>
        <li>If you have fully paid and you're unable to attend, Kindly inform us one week before the deadline for 50% refund</li>
        <li>If you fully paid and unable to attend and you notify us after the deadline you will not qualify for any refund</li>
      </ul>
      
      <p>
        <strong>Note that</strong>, the GHS 3,500 conference is ONLY for the days lunch + snacks and souvenirs and the awards dinner. Accommodation is NOT included. You will be expected to make your own reservation based on the MoH recommended Hotel List.
      </p>
      
      <p>
        By registering, you confirm that you've read and agree to these terms. We're looking forward to seeing you at the conference!
      </p>
    </div>
  );

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Register for NMLMCON 2025</PageTitle>
          <PageDescription>
            Join us for an enriching experience of learning, networking, and professional growth.
          </PageDescription>

          <FormContainer>
            {showProcessOverview ? (
              <ProcessOverview onStart={startRegistration} steps={registrationSteps} />
            ) : registrationSuccess ? (
              // Show success message only after successful registration
              <SuccessMessage>
                <SuccessIcon>✓</SuccessIcon>
                <SuccessTitle>Registration Successful!</SuccessTitle>
                <SuccessText>
                  Congratulations! Your registration for NMLMCON 2025 has been completed successfully.
                  We've sent a confirmation email to {formData.email} with your registration details.
                </SuccessText>
                <SuccessText>
                  <strong>Next Step:</strong> Kindly login below to make payment on the portal.
                  Your credentials have been sent to your email and phone number.
                </SuccessText>
                <SuccessText>
                  Get ready for an enriching experience of learning, networking, and professional growth!
                </SuccessText>
                <div style={{ 
                  marginTop: '25px',
                  padding: '15px',
                  backgroundColor: '#f0fff4',
                  borderRadius: '8px',
                  border: '1px solid #1a8f4c'
                }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#1a8f4c' }}>
                    Important:
                  </p>
                  <p style={{ margin: '0', fontSize: '0.95rem' }}>
                    1. Check your email for login credentials<br />
                    2. Login to the portal using the button below<br />
                    3. Complete your payment to secure your spot<br />
                    4. Access accommodation options and resources
                  </p>
                </div>
                <div style={{ marginTop: '25px' }}>
                  <LoginButton href="https://portal.mohannualcon.com/" target="_blank">
                    Login to Make Payment
                  </LoginButton>
                </div>
                <RedirectText>
                  Redirecting you to the payment portal in 5 seconds...
                </RedirectText>
              </SuccessMessage>
            ) : (
              <form onSubmit={handleSubmit}>
                <StepIndicator>
                  {[1, 2, 3, 4].map((step) => (
                    <Step
                      key={step}
                      active={currentStep === step}
                      completed={currentStep > step}
                      label={getStepLabel(step)}
                    >
                      {step}
                    </Step>
                  ))}
                </StepIndicator>
                
                {/* Step 1: Terms and Conditions */}
                <StepContent active={currentStep === 1}>
                  <h2>Terms and Conditions</h2>
                  <p>Please read and agree to our terms and conditions before proceeding with registration.</p>
                  
                  <TermsAndConditions />
                  
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
                        I have read and agree to the terms and conditions *
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
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      secondary
                    >
                      Back to Overview
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      disabled={!formData.agreeTerms || !formData.agreePrivacy}
                    >
                      Next Step
                    </Button>
                  </ButtonGroup>
                </StepContent>
                
                {/* Step 2: Personal Information */}
                <StepContent active={currentStep === 2}>
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
                    <Label htmlFor="registration_type">Registration Type *</Label>
                    <Input
                      type="text"
                      id="registration_type"
                      name="registration_type"
                      value={formData.registration_type === 'online' ? 'Online' : formData.registration_type === 'onsite' ? 'Onsite' : formData.registration_type}
                      readOnly
                      style={{ backgroundColor: '#f9f9f9', cursor: 'not-allowed' }}
                    />
                    <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                      Based on your selected ticket. This field cannot be changed.
                    </small>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 0201234567"
                      maxLength={10}
                      required
                    />
                    {phoneError && (
                      <ErrorText>{phoneError}</ErrorText>
                    )}
                    <small style={{ color: '#666', display: 'block', marginTop: '5px', fontSize: '0.8rem' }}>
                      Enter exactly 10 digits (e.g., 0201234567)
                    </small>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. your.name@example.com"
                      required
                    />
                    {emailError && (
                      <ErrorText>{emailError}</ErrorText>
                    )}
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
                        jobTitles.map(title => (
                          <option key={title.id} value={title.id}>
                            {title.name || title.title || 'Unnamed Title'}
                          </option>
                        ))
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
                      {regions && regions.length > 0 ? (
                        regions.map(region => (
                          <option key={region.id} value={region.id}>
                            {region.region_name || region.name || 'Unnamed Region'}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>Loading regions...</option>
                      )}
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
                      disabled={!formData.region_id || isLoadingDistricts}
                    >
                      <option value="">Select District</option>
                      {isLoadingDistricts ? (
                        <option value="" disabled>Loading districts...</option>
                      ) : districts && districts.length > 0 ? (
                        districts.map(district => (
                          <option key={district.id} value={district.id}>
                            {district.district_name || district.name || 'Unnamed District'}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>{formData.region_id ? 'No districts found for this region' : 'Select a region first'}</option>
                      )}
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="profile">Profile Picture <span style={{ color: '#000000' }}>*</span></Label>
                    <div>
                      <Input
                        type="file"
                        id="profile"
                        name="profile"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ marginBottom: '10px' }}
                      />
                      {profilePicturePreview && (
                        <div style={{ marginTop: '10px' }}>
                          <img 
                            src={profilePicturePreview} 
                            alt="Profile Preview" 
                            style={{ 
                              width: '100px', 
                              height: '100px', 
                              objectFit: 'cover',
                              borderRadius: '50%',
                              border: '2px solid #1a8f4c'
                            }} 
                          />
                        </div>
                      )}
                      {profilePictureError && (<ErrorText>{profilePictureError}</ErrorText>)}
                      <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                        Upload a profile picture (required)
                      </small>
                    </div>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="password">Password *</Label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
                      <div style={{ flex: 1, position: 'relative', width: '100%' }}>
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={8}
                        />
                        {formData.password && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#1a8f4c',
                              fontSize: window.innerWidth <= 768 ? '1.2rem' : '1rem'
                            }}
                          >
                            {showPassword ? '🔒' : '👁️'}
                          </button>
                        )}
                        {formData.password && (
                          <>
                            <PasswordStrengthIndicator strength={passwordStrength} />
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              marginTop: '5px',
                              fontSize: window.innerWidth <= 768 ? '0.75rem' : '0.8rem'
                            }}>
                              <span>Password Strength:</span>
                              <span style={{ 
                                color: passwordStrength === 'strong' ? '#1a8f4c' : 
                                       passwordStrength === 'medium' ? '#f39c12' : '#e74c3c',
                                fontWeight: 'bold'
                              }}>
                                {passwordStrength === 'strong' ? 'Strong' : 
                                 passwordStrength === 'medium' ? 'Medium' : 'Weak'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={generateStrongPassword}
                        style={{
                          padding: window.innerWidth <= 768 ? '12px 15px' : '10px 15px',
                          backgroundColor: '#1a8f4c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem',
                          width: window.innerWidth <= 768 ? '100%' : 'auto'
                        }}
                      >
                        {window.innerWidth <= 768 ? 'Generate Password' : 'Generate Secure Password'}
                      </button>
                    </div>
                    {showPassword && (
                      <div style={{ 
                        marginTop: '10px', 
                        padding: '10px', 
                        backgroundColor: '#f0fff4', 
                        border: '1px solid #1a8f4c',
                        borderRadius: '5px',
                        fontSize: window.innerWidth <= 768 ? '0.85rem' : '0.9rem'
                      }}>
                        <p style={{ margin: 0, fontSize: 'inherit' }}>
                          <strong>Your secure password:</strong> {formData.password}
                        </p>
                        <p style={{ margin: '5px 0 0 0', fontSize: window.innerWidth <= 768 ? '0.75rem' : '0.8rem', color: '#666' }}>
                          This password will be hidden in 10 seconds. Please make sure to save it somewhere secure.
                        </p>
                      </div>
                    )}
                    <div style={{ marginTop: '5px', fontSize: window.innerWidth <= 768 ? '0.75rem' : '0.8rem', color: '#666' }}>
                      Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="password_confirmation">Confirm Password *</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
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
                    >
                      Back to Overview
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      disabled={!validateForm()}
                    >
                      Next Step
                    </Button>
                  </ButtonGroup>
                </StepContent>
                
                {/* Step 3: Accommodation */}
                <StepContent active={currentStep === 3}>
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
                    <Button type="button" onClick={nextStep}>
                      Next Step
                    </Button>
                  </ButtonGroup>
                </StepContent>
                
                {/* Step 4: Confirmation */}
                <StepContent active={currentStep === 4}>
                  <h2>Confirm Registration</h2>
                  <p>Please review your information and confirm your registration.</p>
                  
                  {console.log('Summary Data:', {
                    userTitles,
                    jobTitles,
                    regions,
                    districts,
                    formData
                  })}
                  
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Registration Summary</h3>
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                      <p><strong>Title:</strong> {userTitles.find(title => String(title.id) === String(formData.user_title_id))?.name || formData.user_title_id}</p>
                      <p><strong>Name:</strong> {formData.full_name}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Registration Type:</strong> {formData.registration_type === 'online' ? 'Online' : formData.registration_type === 'onsite' ? 'Onsite' : formData.registration_type}</p>
                      <p><strong>Job Title:</strong> {jobTitles.find(title => String(title.id) === String(formData.job_title_id))?.name || formData.job_title_id}</p>
                      <p><strong>Place of Work:</strong> {formData.place_of_work}</p>
                      <p><strong>Region:</strong> {regions.find(region => String(region.id) === String(formData.region_id))?.region_name || regions.find(region => String(region.id) === String(formData.region_id))?.name || formData.region_id}</p>
                      <p><strong>District:</strong> {districts.find(district => String(district.id) === String(formData.district_id))?.district_name || districts.find(district => String(district.id) === String(formData.district_id))?.name || formData.district_id}</p>
                      <p><strong>Accommodation:</strong> {formData.accommodation === 'standard' ? 'Standard Room' : 
                                                       formData.accommodation === 'deluxe' ? 'Deluxe Room' : 
                                                       formData.accommodation === 'suite' ? 'Executive Suite' : 
                                                       formData.accommodation === 'none' ? 'No Accommodation Needed' : 
                                                       formData.accommodation || 'None selected'}</p>
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
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Registration'}
                    </Button>
                  </ButtonGroup>

                  {registrationError && (
                    <div style={{ 
                      marginTop: '20px', 
                      padding: '15px', 
                      backgroundColor: '#ffebee', 
                      color: '#c62828', 
                      borderRadius: '5px',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      {registrationError}
                    </div>
                  )}
                </StepContent>
              </form>
            )}
          </FormContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Registration;