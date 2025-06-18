import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

// API base URL
const API_BASE_URL = 'https://portal.mohannualcon.com/api';

// Utility function to safely read response data
const safelyReadResponse = async (response) => {
  // Always clone before reading
  const clonedResponse = response.clone();
  
  try {
    // Try to parse as JSON first
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // If not JSON, read as text
      return await clonedResponse.text();
    }
  } catch (error) {
    console.error('Error reading response:', error);
    // Fallback to text if JSON parsing fails
    try {
      return await clonedResponse.text();
    } catch (textError) {
      console.error('Error reading response as text:', textError);
      return { error: 'Failed to read response' };
    }
  }
};

// Main container styles
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  position: relative;
  padding-top: 80px;
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 60px;
  }
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 40px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  position: relative;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  @media (max-width: 768px) {
    height: auto;
    padding: 0 15px 30px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px 20px;
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
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 10px;
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
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 25px;
  }
`;

// Form container and elements
const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 25px 20px;
    margin-bottom: 30px;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
    margin-bottom: 25px;
    border-radius: 6px;
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
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
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
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 5px;
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
  
  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border 0.3s ease;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1a8f4c;
  }
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.95rem;
    min-height: 100px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 0.9rem;
    min-height: 80px;
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
  
  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px;
  }
`;

const RadioInput = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #1a8f4c;
  
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  
  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;

const RadioLabel = styled.label`
  font-size: 0.95rem;
  color: #34495e;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #1a8f4c;
  margin-top: 2px;
  
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  
  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #34495e;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
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
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-top: 25px;
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
    width: 100%;
    padding: 12px 20px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  h2 {
    color: #1a8f4c;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  p {
    color: #4a5568;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  @media (max-width: 768px) {
    padding: 30px 15px;
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    p {
      font-size: 0.95rem;
      margin-bottom: 25px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 25px 10px;
    
    h2 {
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    
    p {
      font-size: 0.9rem;
      margin-bottom: 20px;
    }
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #1a8f4c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

// Add new styled components for requirements section
const RequirementsSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

const RequirementsTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a8f4c;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 600;
`;

const RequirementsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const RequirementCard = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: 25px;
  border-radius: 8px;
  border: 1px solid rgba(26, 143, 76, 0.1);

  h3 {
    color: #1a8f4c;
    font-size: 1.2rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    color: #4a5568;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

// Add new styled components for file upload
const FileUploadContainer = styled.div`
  border: 2px dashed #1a8f4c;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  
  &:hover {
    background: #e8f5ee;
    border-color: #156e3a;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 6px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 6px;
  }
`;

const UploadText = styled.div`
  color: #1a8f4c;
  font-size: 0.9rem;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 3px;
  }
`;

const FileName = styled.div`
  color: #156e3a;
  font-weight: 600;
  margin-top: 10px;
  font-size: 0.85rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 6px;
  }
`;

// Add a styled component for image preview
const ImagePreview = styled.div`
  margin-top: 15px;
  text-align: center;
  
  img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
    border: 2px solid #1a8f4c;
  }
  
  @media (max-width: 768px) {
    margin-top: 12px;
    
    img {
      max-width: 150px;
      max-height: 150px;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 10px;
    
    img {
      max-width: 120px;
      max-height: 120px;
    }
  }
`;

const Nomination = () => {
  const [currentStep, setCurrentStep] = useState(0); // Start with requirements (step 0)
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  
  const [formData, setFormData] = useState({
    // Nominator's Details
    nominatorName: '',
    nominatorPhone: '',
    nominatorOrganization: '',
    relationship: '',
    
    // Nominee's Details
    nomineeName: '',
    nomineePhone: '',
    user_title_id: '',
    job_title_id: '',
    nomineeOrganization: '',
    
    // Files
    passportPicture: null,
    cv: null,
    
    // Nomination Details
    awardCategory: '',
    reasonForNomination: '',
    
    // Confirmation
    agreeTerms: false,
    agreePrivacy: false,
    nomineePhoneError: '',
    nominatorPhoneError: '',
  });
  
  // State for professional titles and job titles
  const [professionalTitles, setProfessionalTitles] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  
  // Add validation for popular email domains
  const validateEmail = (email) => {
    const popularDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'protonmail.com',
      'zoho.com',
      'mail.com'
    ];
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Check if domain is in popular domains list
    const domain = email.split('@')[1].toLowerCase();
    return popularDomains.includes(domain);
  };

  // Add validation for phone number (10 digits)
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name.includes('Phone')) {
      // Only allow numbers and limit to 10 digits
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: numbersOnly
      });
    } else if (name.includes('Email')) {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Error`]: !validateEmail(value) ? 'Please enter a valid email from a popular provider' : ''
      });
    } else if (name === 'nomineeYearsExperience') {
      // Only allow digits and validate range
      const numbersOnly = value.replace(/\D/g, '');
      const numberValue = parseInt(numbersOnly, 10);
      let error = '';
      
      if (numbersOnly.length > 0 && (numberValue < 0 || numberValue > 50)) {
        error = 'Years of experience must be between 0 and 50';
      }

      setFormData({
        ...formData,
        nomineeYearsExperience: numbersOnly,
        nomineeYearsExperienceError: error
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const nextStep = () => {
    if (currentStep < 5) {
    setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear any previous errors
    
    console.log('======= NOMINATION SUBMISSION STARTED =======');
    console.log('Browser details:', navigator.userAgent);
    
    // Use the confirmed API endpoint
    const apiEndpoint = `${API_BASE_URL}/nominate`;
    console.log(`Using confirmed API endpoint: ${apiEndpoint}`);
    
    try {
      // Create a payload with all required fields
      const payload = {
        nominee_full_name: formData.nomineeName,
        nominee_institution: formData.nomineeOrganization,
        nominee_phone: formData.nomineePhone,
        nominator_name: formData.nominatorName,
        nominator_phone: formData.nominatorPhone,
        nominator_relationship: formData.relationship,
        primary_nomination_reason: formData.reasonForNomination,
        category_id: String(formData.awardCategory),
        user_title_id: String(formData.user_title_id),
        job_title_id: String(formData.job_title_id)
      };
      
      // Convert image to base64 if available
      if (formData.passportPicture) {
        try {
          const base64Image = await convertFileToBase64(formData.passportPicture);
          payload.profile = base64Image;
        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }
      
      // Convert CV to base64 if available, but format as image/png
      if (formData.cv) {
        try {
          // Get raw base64 data without the mime type prefix
          const base64CV = await convertFileToBase64(formData.cv);
          // Extract just the base64 data part (remove the data:application/pdf;base64, prefix)
          const base64Data = base64CV.split(',')[1];
          // Format with the required image/png prefix regardless of actual file type
          payload.cv = `data:image/png;base64,${base64Data}`;
        } catch (error) {
          console.error('Error converting CV to base64:', error);
        }
      }
      
      // Log the payload
      console.log('Sending payload:', payload);
      
      // Make a single API request with FormData for better compatibility
      const formDataToSend = new FormData();
      
      // Add all fields to FormData
      Object.entries(payload).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      console.log('Sending nomination data to API...');
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: formDataToSend
      });
      
      console.log('API response status:', response.status);
      
      if (response.ok) {
        console.log('Nomination submission successful!');
        await handleApiResponse(response.clone());
      } else {
        // If the request failed, throw an error to be caught below
        const errorData = await safelyReadResponse(response);
        console.error('Error response from API:', errorData);
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting nomination:', error);
      
      // Show a more detailed error message
      let errorMessage = error.message || 'Failed to submit nomination. Please try again.';
      
      // Add troubleshooting information
      setErrors({ 
        submit: `${errorMessage}\n\nTroubleshooting tips:\n- Check your internet connection\n- Verify all fields are completed correctly\n- If problems persist, please contact support at support@mohannualcon.com with error details shown in the browser console (F12)`
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to handle API responses
  const handleApiResponse = async (response) => {
    // Get the response content regardless of status code
    let responseData;
    
    try {
      responseData = await safelyReadResponse(response);
      console.log('Response data:', responseData);
    } catch (error) {
      console.error('Error reading response:', error);
      throw new Error('Failed to read server response: ' + error.message);
    }
    
    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 404) {
        throw new Error(`API endpoint not found (404). Please check the URL.`);
      } else if (response.status === 500) {
        console.error('Server 500 Error Details:', {
          url: response.url,
          status: response.status,
          statusText: response.statusText,
          responseData: responseData,
          headers: Object.fromEntries(response.headers.entries())
        });
        throw new Error(`Server error (500). The server encountered an internal error. Check the developer console for details.`);
      } else if (response.status === 422) {
        // Handle validation errors
        let errorMsg = 'Validation failed: ';
        if (responseData.errors && typeof responseData.errors === 'object') {
          errorMsg += Object.entries(responseData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
        } else {
          errorMsg += responseData.message || 'Invalid data provided';
        }
        throw new Error(errorMsg);
      } else {
        throw new Error(responseData.message || `Server error (Status: ${response.status})`);
      }
    }
    
    console.log('Nomination submitted successfully:', responseData);
    
    // Show success message by moving to step 6
    setCurrentStep(6);
  };
  
  // Fetch award categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        // Try multiple possible endpoints for categories
        const endpoints = [
          `${API_BASE_URL}/utils/categories/get`,
          `${API_BASE_URL}/categories`,
          `${API_BASE_URL}/award-categories`
        ];
        
        let categoryData = null;
        let fetchSuccess = false;
        
        // Try each endpoint until one works
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying to fetch categories from ${endpoint}...`);
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true'
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log('Categories data from', endpoint, ':', data);
              
              // Handle different response formats
              if (Array.isArray(data)) {
                categoryData = data;
              } else if (data.data && Array.isArray(data.data)) {
                categoryData = data.data;
              } else if (typeof data === 'object') {
                // If it's an object with keys that look like categories
                categoryData = Object.entries(data).map(([id, name]) => ({ id, name }));
              }
              
              if (categoryData && categoryData.length > 0) {
                fetchSuccess = true;
                break;
              }
            }
          } catch (err) {
            console.error(`Error trying endpoint ${endpoint}:`, err);
          }
        }
        
        if (fetchSuccess && categoryData) {
          setCategories(categoryData);
        } else {
          throw new Error('Could not fetch categories from any endpoint');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to hardcoded categories if fetch fails
        setCategories([
          { id: '1', name: 'Clinical Excellence' },
          { id: '2', name: 'Education & Research Excellence' },
          { id: '3', name: 'Leadership & Governance' },
          { id: '4', name: 'Innovation in Healthcare' },
          { id: '5', name: 'Community Impact' }
        ]);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch professional titles and job titles when component mounts
  useEffect(() => {
    const fetchTitles = async () => {
      setIsLoadingTitles(true);
      try {
        // Fetch professional titles
        const professionalTitlesResponse = await fetch(`${API_BASE_URL}/utils/user-title/get`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        // Fetch job titles
        const jobTitlesResponse = await fetch(`${API_BASE_URL}/utils/job-title/get`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        if (professionalTitlesResponse.ok) {
          const professionalTitlesData = await professionalTitlesResponse.json();
          console.log('Professional titles data:', professionalTitlesData);
          
          // Handle different response formats
          if (Array.isArray(professionalTitlesData)) {
            setProfessionalTitles(professionalTitlesData);
          } else if (professionalTitlesData.data && Array.isArray(professionalTitlesData.data)) {
            setProfessionalTitles(professionalTitlesData.data);
          } else if (typeof professionalTitlesData === 'object') {
            // If it's an object with keys that look like titles
            const titlesArray = Object.entries(professionalTitlesData).map(([id, title]) => ({ id, title }));
            setProfessionalTitles(titlesArray);
          }
        } else {
          console.error('Failed to fetch professional titles:', professionalTitlesResponse.status);
          // Set default professional titles
          setProfessionalTitles([
            { id: '1', title: 'Dr.' },
            { id: '2', title: 'Mr.' },
            { id: '3', title: 'Mrs.' },
            { id: '4', title: 'Ms.' },
            { id: '5', title: 'Prof.' }
          ]);
        }
        
        if (jobTitlesResponse.ok) {
          const jobTitlesData = await jobTitlesResponse.json();
          console.log('Job titles data:', jobTitlesData);
          
          // Handle different response formats
          if (Array.isArray(jobTitlesData)) {
            setJobTitles(jobTitlesData);
          } else if (jobTitlesData.data && Array.isArray(jobTitlesData.data)) {
            setJobTitles(jobTitlesData.data);
          } else if (typeof jobTitlesData === 'object') {
            // If it's an object with keys that look like titles
            const titlesArray = Object.entries(jobTitlesData).map(([id, title]) => ({ id, title }));
            setJobTitles(titlesArray);
          }
        } else {
          console.error('Failed to fetch job titles:', jobTitlesResponse.status);
          // Set default job titles
          setJobTitles([
            { id: '1', title: 'Registered Nurse' },
            { id: '2', title: 'Nurse Practitioner' },
            { id: '3', title: 'Clinical Nurse Specialist' },
            { id: '4', title: 'Nurse Manager' },
            { id: '5', title: 'Director of Nursing' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching titles:', error);
        // Set default values if fetch fails
        setProfessionalTitles([
          { id: '1', title: 'Dr.' },
          { id: '2', title: 'Mr.' },
          { id: '3', title: 'Mrs.' },
          { id: '4', title: 'Ms.' },
          { id: '5', title: 'Prof.' }
        ]);
        
        setJobTitles([
          { id: '1', title: 'Registered Nurse' },
          { id: '2', title: 'Nurse Practitioner' },
          { id: '3', title: 'Clinical Nurse Specialist' },
          { id: '4', title: 'Nurse Manager' },
          { id: '5', title: 'Director of Nursing' }
        ]);
      } finally {
        setIsLoadingTitles(false);
      }
    };
    
    fetchTitles();
  }, []);
  
  const handleNextAfterSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  // Validation functions for each step
  const validateNominator = () => {
    return (
      formData.nominatorName?.trim() &&
      formData.nominatorPhone?.trim() &&
      validatePhone(formData.nominatorPhone) &&
      formData.relationship
    );
  };
  
  const validateNominee = () => {
    return (
      formData.nomineeName?.trim() &&
      formData.nomineePhone?.trim() &&
      validatePhone(formData.nomineePhone) &&
      formData.user_title_id &&
      formData.job_title_id &&
      formData.nomineeOrganization?.trim()
    );
  };
  
  const validateDocuments = () => {
    // Profile picture is now required
    return formData.passportPicture !== null;
  };

  const validateReasons = () => {
    return (
      formData.awardCategory &&
      formData.reasonForNomination?.trim()
    );
  };
  
  const validateConfirmation = () => {
    return formData.agreeTerms && formData.agreePrivacy;
  };

  // Function to check if next button should be enabled for current step
  const canProceed = () => {
    switch (currentStep) {
      case 0: // Requirements page - always allow proceeding
        return true;
      case 1:
        return validateNominator();
      case 2:
        return validateNominee();
      case 3:
        return validateDocuments();
      case 4:
        return validateReasons();
      case 5:
        return validateConfirmation();
      default:
        return false;
    }
  };

  const requirements = [

    {
      title: "Nominator's Details",
      description: "Your complete contact information and relationship to the nominee for verification purposes.",
      icon: "✍️"
    },
    
    {
      title: "Nominee's Details",
      description: "Complete personal and professional information about the nominee, including full name, title, and contact information.",
      icon: "👤"
    },

    {
      title: "Nominee's Passport Picture ",
      description: "A passport-sized photograph of the nominee is required.",
      icon: "📸"
    },
    {
      title: "Nominee's CV",
      description: "An up-to-date curriculum vitae highlighting the nominee's professional experience, achievements, and qualifications.",
      icon: "📄"
    },
    {
      title: "Reasons for Nomination",
      description: "Detailed explanation of why the nominee deserves recognition, including specific examples of their contributions and impact.",
      icon: "🏆"
    },
    
  ];

  // Helper function to resize an image to reduce file size
  const resizeImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      // Create a FileReader to read the image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        // Create an image element to load the file
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * maxWidth / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * maxHeight / height);
              height = maxHeight;
            }
          }
          
          // Set canvas dimensions and draw the resized image
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            // Create a new file from the blob with the same name
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            
            console.log(`Image resized: ${file.size} bytes → ${resizedFile.size} bytes`);
            resolve(resizedFile);
          }, file.type, quality);
        };
        
        img.onerror = (error) => {
          reject(error);
        };
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type for images
    if (type === 'passportPicture') {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG or PNG)');
        e.target.value = ''; // Clear the file input
        return;
      }
      
      // Check file size - 2MB limit
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        console.log(`File size (${file.size} bytes) exceeds 2MB limit. Attempting to resize...`);
        
        // Resize the image
        resizeImage(file)
          .then(resizedFile => {
            // Check if resizing was sufficient
            if (resizedFile.size > maxSize) {
              console.log(`Image still too large after resizing: ${resizedFile.size} bytes`);
              alert('Image is too large even after resizing. Please select a smaller image.');
              e.target.value = ''; // Clear the file input
              return;
            }
            
            console.log(`Image resized successfully to ${resizedFile.size} bytes`);
            setFormData(prev => ({
              ...prev,
              [type]: resizedFile
            }));
          })
          .catch(error => {
            console.error('Error resizing image:', error);
            alert('Error processing image. Please try another image.');
            e.target.value = ''; // Clear the file input
          });
        return;
      }
    } else if (type === 'cv') {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid document (PDF, DOC, or DOCX)');
        e.target.value = ''; // Clear the file input
        return;
      }
      
      // Check file size - 5MB limit
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('CV file size should not exceed 5MB. Please upload a smaller file.');
        e.target.value = ''; // Clear the file input
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  // Helper function to convert File to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // This automatically adds the data:image/xxx;base64, prefix
      reader.onload = () => {
        console.log('Base64 conversion complete. Format check:', reader.result.substring(0, 30) + '...');
        resolve(reader.result); // This already includes the data:image/xxx;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Please wait..." fullScreen />;
  }
  
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Call For Nominations - Nurses and Midwives Excellence Awards 2025</PageTitle>
          <PageDescription>
          The awards are for recognition of outstanding nurses and midwives. Your nomination helps highlight the incredible work being done in the nursing and midwives community.
          </PageDescription>
          
          {/* Requirements Section */}
          <StepContent active={currentStep === 0}>
            <RequirementsSection>
              <RequirementsTitle>Nomination Requirements</RequirementsTitle>
              <p style={{ textAlign: 'center', color: '#4a5568', marginBottom: '20px' }}>
                Please ensure you have all the following information ready before proceeding with your nomination:
              </p>
              <RequirementsList>
                {requirements.map((req, index) => (
                  <RequirementCard key={index}>
                    <h3>{req.icon} {req.title}</h3>
                    <p>{req.description}</p>
                  </RequirementCard>
                ))}
              </RequirementsList>
              <ButtonGroup>
                <Button onClick={() => navigate('/')} secondary>Back to Home</Button>
                <Button onClick={nextStep}>Next</Button>
              </ButtonGroup>
            </RequirementsSection>
          </StepContent>

          {/* Nomination Form */}
          <FormContainer>
              <StepIndicator>
              <Step active={currentStep === 1} completed={currentStep > 1} label="Nominator">1</Step>
              <Step active={currentStep === 2} completed={currentStep > 2} label="Nominee">2</Step>
              <Step active={currentStep === 3} completed={currentStep > 3} label="Documents">3</Step>
              <Step active={currentStep === 4} completed={currentStep > 4} label="Reasons">4</Step>
              <Step active={currentStep === 5} completed={currentStep > 5} label="Confirm">5</Step>
              </StepIndicator>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Nominator's Details */}
              <StepContent active={currentStep === 1}>
                <h2>Nominator's Details</h2>
                <p>Please provide your information as the person submitting this nomination.</p>
                
                <FormGroup>
                  <Label htmlFor="nominatorName">Full Name *</Label>
                  <Input 
                    type="text" 
                    id="nominatorName" 
                    name="nominatorName" 
                    value={formData.nominatorName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nominatorPhone">Phone Number * (10 digits)</Label>
                  <Input 
                    type="tel" 
                    id="nominatorPhone" 
                    name="nominatorPhone" 
                    value={formData.nominatorPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 10 digit number"
                    pattern="[0-9]{10}"
                  />
                  {!validatePhone(formData.nominatorPhone) && formData.nominatorPhone && (
                    <ErrorText>Please enter a valid 10-digit phone number</ErrorText>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="relationship">Relationship to Nominee *</Label>
                  <Select 
                    id="relationship" 
                    name="relationship" 
                    value={formData.relationship}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Subordinate">Subordinate</option>
                    <option value="Patient">Patient</option>
                    <option value="Family of Patient">Family of Patient</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>Previous</Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>Next</Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 2: Nominee's Details */}
              <StepContent active={currentStep === 2}>
                <h2>Nominee's Details</h2>
                <p>Please provide comprehensive information about the Nurses or Midwives you are nominating.</p>
                
                <FormGroup>
                  <Label htmlFor="user_title_id">Title *</Label>
                  <Select 
                    id="user_title_id" 
                    name="user_title_id" 
                    value={formData.user_title_id}
                    onChange={handleInputChange}
                    disabled={isLoadingTitles}
                    required
                  >
                    <option value="">Select title</option>
                    {isLoadingTitles ? (
                      <option disabled>Loading titles...</option>
                    ) : professionalTitles.length > 0 ? (
                      professionalTitles.map(title => (
                        <option key={title.id} value={title.id}>
                          {title.title || title.name || 'Unknown Title'}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="1">Dr.</option>
                        <option value="2">Mr.</option>
                        <option value="3">Mrs.</option>
                        <option value="4">Ms.</option>
                        <option value="5">Prof.</option>
                      </>
                    )}
                  </Select>
                  {isLoadingTitles && (
                    <div style={{ fontSize: '0.85rem', color: '#1a8f4c', marginTop: '5px' }}>
                      Loading titles...
                    </div>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nomineeName">Full Name *</Label>
                  <Input 
                    type="text" 
                    id="nomineeName" 
                    name="nomineeName" 
                    value={formData.nomineeName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="job_title_id">Job Title *</Label>
                  <Select 
                    id="job_title_id" 
                    name="job_title_id" 
                    value={formData.job_title_id}
                    onChange={handleInputChange}
                    disabled={isLoadingTitles}
                    required
                  >
                    <option value="">Select job title</option>
                    {isLoadingTitles ? (
                      <option disabled>Loading job titles...</option>
                    ) : jobTitles.length > 0 ? (
                      jobTitles.map(title => (
                        <option key={title.id} value={title.id}>
                          {title.title || title.name || 'Unknown Job Title'}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="1">Registered Nurse</option>
                        <option value="2">Nurse Practitioner</option>
                        <option value="3">Clinical Nurse Specialist</option>
                        <option value="4">Nurse Manager</option>
                        <option value="5">Director of Nursing</option>
                      </>
                    )}
                  </Select>
                  {isLoadingTitles && (
                    <div style={{ fontSize: '0.85rem', color: '#1a8f4c', marginTop: '5px' }}>
                      Loading job titles...
                    </div>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nomineeOrganization">Organization/Institution *</Label>
                  <Input 
                    type="text" 
                    id="nomineeOrganization" 
                    name="nomineeOrganization" 
                    value={formData.nomineeOrganization}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nomineePhone">Phone Number * (10 digits)</Label>
                  <Input 
                    type="tel" 
                    id="nomineePhone" 
                    name="nomineePhone" 
                    value={formData.nomineePhone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 10 digit number"
                    pattern="[0-9]{10}"
                  />
                  {!validatePhone(formData.nomineePhone) && formData.nomineePhone && (
                    <ErrorText>Please enter a valid 10-digit phone number</ErrorText>
                  )}
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>Previous</Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>Next</Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 3: Required Documents */}
              <StepContent active={currentStep === 3}>
                <h2>Documents</h2>
                <p>Please upload a passport picture of the nominee and their CV.</p>
                
                <FormGroup>
                  <Label>Passport Picture *</Label>
                  <FileUploadContainer onClick={() => document.getElementById('passportPicture').click()}>
                    <FileInput
                      type="file"
                      id="passportPicture"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'passportPicture')}
                      required
                    />
                    <UploadIcon>📸</UploadIcon>
                    <UploadText>Click to upload a passport picture (required)</UploadText>
                    <UploadText>(Maximum size: 2MB, Format: JPG, PNG)</UploadText>
                    {formData.passportPicture && (
                      <FileName>{formData.passportPicture.name}</FileName>
                    )}
                  </FileUploadContainer>
                  
                  {formData.passportPicture && (
                    <ImagePreview>
                      <img 
                        src={URL.createObjectURL(formData.passportPicture)} 
                        alt="Passport Preview" 
                      />
                    </ImagePreview>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label>Curriculum Vitae (CV) *</Label>
                  <FileUploadContainer onClick={() => document.getElementById('cv').click()}>
                    <FileInput
                      type="file"
                      id="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'cv')}
                      required
                    />
                    <UploadIcon>📄</UploadIcon>
                    <UploadText>Click to upload nominee's CV (required)</UploadText>
                    <UploadText>(Maximum size: 5MB, Format: PDF, DOC, DOCX)</UploadText>
                    {formData.cv && (
                      <FileName>{formData.cv.name}</FileName>
                    )}
                  </FileUploadContainer>
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>Previous</Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>Next</Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 4: Reasons for Nomination */}
              <StepContent active={currentStep === 4}>
                <h2>Reasons for Nomination</h2>
                <p>Please provide detailed information about why this nominee deserves recognition.</p>
                
                <FormGroup>
                  <Label htmlFor="awardCategory">Category *</Label>
                  <Select 
                    id="awardCategory" 
                    name="awardCategory" 
                    value={formData.awardCategory}
                    onChange={handleInputChange}
                    required
                    disabled={isLoadingCategories}
                  >
                    <option value="">Select category</option>
                    {isLoadingCategories ? (
                      <option disabled>Loading categories...</option>
                    ) : categories.length > 0 ? (
                      categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name || category.category_name || 'Unnamed Category'}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </Select>
                  {isLoadingCategories && (
                    <div style={{ fontSize: '0.85rem', color: '#1a8f4c', marginTop: '5px' }}>
                      Loading categories...
                    </div>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="reasonForNomination">Reason for Nomination *</Label>
                  <Textarea 
                    id="reasonForNomination" 
                    name="reasonForNomination" 
                    value={formData.reasonForNomination}
                    onChange={handleInputChange}
                    required
                    placeholder="Explain why you are nominating this person"
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>Previous</Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>Next</Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 5: Confirmation */}
              <StepContent active={currentStep === 5}>
                <h2>Confirm Nomination</h2>
                <p>Please review your nomination and confirm submission.</p>
                
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
                      I confirm that all information provided is accurate and truthful *
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
                      I consent to the processing of this nomination data in accordance with the privacy policy *
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FormGroup>
                
                {errors.submit && (
                  <div style={{ 
                    backgroundColor: '#ffebee', 
                    color: '#c62828', 
                    padding: '12px 15px', 
                    borderRadius: '5px', 
                    marginBottom: '20px', 
                    fontSize: '0.9rem',
                    whiteSpace: 'pre-line'
                  }}>
                    <strong>Error: </strong>{errors.submit}
                  </div>
                )}
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>Previous</Button>
                  <Button type="submit" disabled={!canProceed()}>Submit</Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Success Message */}
              <StepContent active={currentStep === 6}>
                <SuccessMessage>
                  <SuccessIcon>✓</SuccessIcon>
                  <h2>Nomination Submitted Successfully!</h2>
                  <p>Thank you for nominating an outstanding Nurses or Midwives. Your nomination has been received and will be reviewed by our awards committee.</p>
                  <ButtonGroup>
                    <div></div>
                    <Button onClick={handleNextAfterSuccess}>Back to Home</Button>
                  </ButtonGroup>
                </SuccessMessage>
              </StepContent>
            </form>
          </FormContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Nomination;