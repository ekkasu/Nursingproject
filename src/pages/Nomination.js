import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

// Main container styles
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  position: relative;
  padding-top: 80px;
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
  margin-bottom: 40px;
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

const RadioGroup = styled.div`
  margin-bottom: 15px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Radio = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #1a8f4c;
`;

const RadioLabel = styled.label`
  font-size: 0.9rem;
  color: #34495e;
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
  min-width: 120px;
  
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

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
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
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(26, 143, 76, 0.05);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: #1a8f4c;
  margin-bottom: 10px;
`;

const UploadText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const FileName = styled.div`
  color: #1a8f4c;
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 600;
`;

// Add a disabled button component
const DisabledButton = styled.span`
  padding: 12px 25px;
  font-size: 1rem;
  background-color: #e0e0e0;
  color: #999;
  border: none;
  border-radius: 5px;
  cursor: not-allowed;
  font-weight: 600;
  min-width: 120px;
  position: relative;
  display: inline-block;
  text-align: center;
  
  &:hover::after {
    content: 'Coming soon';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 10;
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
    nominatorEmail: '',
    nominatorPhone: '',
    nominatorOrganization: '',
    relationship: '',
    
    // Nominee's Details
    nomineeName: '',
    nomineePhone: '',
    nomineeTitle: '',
    jobTitle: '',
    nomineeOrganization: '',
    
    // Files
    passportPicture: null,
    cv: null,
    
    // Nomination Details
    awardCategory: '',
    reasonForNomination: '',
    professionalAchievements: '',
    impactDescription: '',
    contributionToNursing: '',
    
    // Confirmation
    agreeTerms: false,
    agreePrivacy: false,
    nominatorEmailError: '',
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
    const apiEndpoint = 'https://portal.mohannualcon.com/api/nominate';
    console.log(`Using confirmed API endpoint: ${apiEndpoint}`);
    
    try {
      // Create a payload without user_title_id and job_title_id
      const payload = {
        nominee_full_name: formData.nomineeName,
        nominee_institution: formData.nomineeOrganization,
        nominee_phone: formData.nomineePhone,
        nominator_name: formData.nominatorName,
        nominator_phone: formData.nominatorPhone,
        nominator_relationship: formData.relationship,
        primary_nomination_reason: formData.reasonForNomination,
        professional_achievements: formData.professionalAchievements,
        impact_on_health_care: formData.impactDescription,
        contribution_to_nursing_excellence: formData.contributionToNursing,
        category_id: String(formData.awardCategory),
        profile: "data:image/png;base64,"
      };
      
      // Log the payload
      console.log('Sending payload without title IDs:', payload);
      
      // Try different content-type headers
      const contentTypes = [
        'application/json',
        'application/json; charset=UTF-8',
        'application/json;charset=UTF-8'
      ];
      
      let successfulResponse = null;
      
      // Try each content type
      for (let i = 0; i < contentTypes.length; i++) {
        const contentType = contentTypes[i];
        console.log(`Attempt ${i+1}: Using Content-Type: ${contentType}`);
        
        try {
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': contentType,
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(payload)
          });
          
          console.log(`Attempt ${i+1} response status:`, response.status);
          
          // Try to get response data
          let responseData;
          try {
            const respContentType = response.headers.get('content-type');
            if (respContentType && respContentType.includes('application/json')) {
              responseData = await response.json();
              console.log(`Attempt ${i+1} response data:`, responseData);
            } else {
              responseData = await response.text();
              console.log(`Attempt ${i+1} response text:`, responseData);
            }
          } catch (parseError) {
            console.error(`Error parsing response for attempt ${i+1}:`, parseError);
          }
          
          if (response.ok) {
            console.log(`Attempt ${i+1} successful!`);
            successfulResponse = response;
            break;
          }
        } catch (fetchError) {
          console.error(`Error in attempt ${i+1}:`, fetchError);
        }
      }
      
      // If any attempt was successful
      if (successfulResponse) {
        await handleApiResponse(successfulResponse);
        return;
      }
      
      // If all attempts with profile failed, try without profile
      console.log('All attempts with profile failed. Trying without profile...');
      
      const payloadWithoutProfile = { ...payload };
      delete payloadWithoutProfile.profile;
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payloadWithoutProfile)
      });
      
      console.log('Response without profile status:', response.status);
      
      if (response.ok) {
        console.log('Submission without profile successful!');
        await handleApiResponse(response);
        return;
      }
      
      // If all attempts failed, try with FormData instead of JSON
      console.log('All JSON attempts failed. Trying FormData...');
      
      const formDataToSend = new FormData();
      
      // Add all fields to FormData
      Object.entries(payloadWithoutProfile).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      const formDataResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: formDataToSend
      });
      
      console.log('FormData response status:', formDataResponse.status);
      
      if (formDataResponse.ok) {
        console.log('FormData submission successful!');
        await handleApiResponse(formDataResponse);
        return;
      }
      
      throw new Error(`All submission attempts failed. Please check the console for detailed error information.`);
    } catch (error) {
      console.error('Error submitting nomination:', error);
      
      // Show a more detailed error message
      let errorMessage = error.message || 'Failed to submit nomination. Please try again.';
      
      // Add troubleshooting information
      setErrors({ 
        submit: `${errorMessage}\n\nTroubleshooting tips:\n- Check your internet connection\n- Verify all fields are completed correctly\n- Try submitting with just the required fields\n- If problems persist, please contact support at support@mohannualcon.com with error details shown in the browser console (F12)`
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to handle API responses
  const handleApiResponse = async (response) => {
    // Get the response content regardless of status code
    let responseData;
    let responseText = '';
    
    try {
      // Try to get text response first
      responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      // Then try to parse as JSON if possible
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed JSON response:', responseData);
      } catch (e) {
        console.log('Response is not valid JSON, using text response');
        responseData = { message: responseText || 'Unknown server error' };
      }
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
          responseText: responseText,
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
          'https://portal.mohannualcon.com/api/utils/categories/get',
          'https://portal.mohannualcon.com/api/categories',
          'https://portal.mohannualcon.com/api/award-categories'
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
        const professionalTitlesResponse = await fetch('https://portal.mohannualcon.com/api/utils/user-title/get', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        // Fetch job titles
        const jobTitlesResponse = await fetch('https://portal.mohannualcon.com/api/utils/job-title/get', {
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
      formData.nominatorEmail?.trim() &&
      validateEmail(formData.nominatorEmail) &&
      formData.nominatorPhone?.trim() &&
      validatePhone(formData.nominatorPhone) &&
      formData.nominatorOrganization?.trim() &&
      formData.relationship
    );
  };
  
  const validateNominee = () => {
    return (
      formData.nomineeName?.trim() &&
      formData.nomineePhone?.trim() &&
      validatePhone(formData.nomineePhone) &&
      // Title fields are no longer required
      formData.nomineeOrganization?.trim()
    );
  };
  
  const validateDocuments = () => {
    // Profile picture is no longer required
    return true;
  };

  const validateReasons = () => {
    return (
      formData.awardCategory &&
      formData.reasonForNomination?.trim() &&
      formData.professionalAchievements?.trim() &&
      formData.impactDescription?.trim() &&
      formData.contributionToNursing?.trim()
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
      title: "Nominee's Details",
      description: "Complete personal and professional information about the nominee, including full name, title, and contact information.",
      icon: "👤"
    },
    {
      title: "Nominee's Passport Picture (Optional)",
      description: "A passport-sized photograph of the nominee can be included but is not required.",
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
    {
      title: "Nominator's Details",
      description: "Your complete contact information and relationship to the nominee for verification purposes.",
      icon: "✍️"
    }
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
    }

    setFormData(prev => ({
      ...prev,
        [type]: file
    }));
  };

  // Debug submission to identify problematic fields
  const debugFieldSubmission = async (endpoint) => {
    console.log('=========== DEBUGGING FIELD SUBMISSION ===========');
    console.log(`Testing fields one by one with endpoint: ${endpoint}`);
    
    // Define all possible fields to test
    const allFields = [
      { key: 'nominee_full_name', value: formData.nomineeName },
      { key: 'nominee_name', value: formData.nomineeName },
      { key: 'nominee_institution', value: formData.nomineeOrganization },
      { key: 'nominee_organization', value: formData.nomineeOrganization },
      { key: 'nominee_org', value: formData.nomineeOrganization },
      { key: 'nominee_phone', value: formData.nomineePhone },
      { key: 'nominee_phone_number', value: formData.nomineePhone },
      { key: 'nominator_name', value: formData.nominatorName },
      { key: 'nominator', value: formData.nominatorName },
      { key: 'nominator_phone', value: formData.nominatorPhone },
      { key: 'nominator_email', value: formData.nominatorEmail },
      { key: 'email', value: formData.nominatorEmail },
      { key: 'phone', value: formData.nominatorPhone },
      { key: 'category_id', value: formData.awardCategory },
      { key: 'award_category', value: formData.awardCategory },
      { key: 'category', value: formData.awardCategory },
      { key: 'nominator_relationship', value: formData.relationship },
      { key: 'relationship', value: formData.relationship },
      { key: 'primary_nomination_reason', value: formData.reasonForNomination },
      { key: 'reason', value: formData.reasonForNomination },
      { key: 'nomination_reason', value: formData.reasonForNomination },
      { key: 'professional_achievements', value: formData.professionalAchievements },
      { key: 'achievements', value: formData.professionalAchievements },
      { key: 'impact_on_health_care', value: formData.impactDescription },
      { key: 'impact', value: formData.impactDescription },
      { key: 'contribution_to_nursing_excellence', value: formData.contributionToNursing },
      { key: 'contribution', value: formData.contributionToNursing }
    ];
    
    // Test sets of fields to narrow down problems
    const fieldSets = [
      ['nominee_full_name', 'nominee_institution', 'nominee_phone'],
      ['nominator_name', 'nominator_phone', 'nominator_email'],
      ['category_id', 'primary_nomination_reason'],
      ['professional_achievements', 'impact_on_health_care', 'contribution_to_nursing_excellence'],
      ['nominator_relationship']
    ];
    
    let acceptedFields = [];
    let rejectedFields = [];
    
    // First test sets of fields
    console.log('Testing sets of fields...');
    for (const fieldSet of fieldSets) {
      const formDataToSend = new FormData();
      
      // Add this set of fields
      for (const fieldKey of fieldSet) {
        const field = allFields.find(f => f.key === fieldKey);
        if (field && field.value) {
          formDataToSend.append(field.key, field.value);
        }
      }
      
      try {
        console.log(`Testing field set: ${fieldSet.join(', ')}`);
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        if (response.status !== 500) {
          console.log(`✅ Field set accepted: ${fieldSet.join(', ')} - Status: ${response.status}`);
          acceptedFields = [...acceptedFields, ...fieldSet];
        } else {
          console.log(`❌ Field set rejected: ${fieldSet.join(', ')} - Status: ${response.status}`);
          rejectedFields = [...rejectedFields, ...fieldSet];
        }
      } catch (error) {
        console.error(`Error testing field set ${fieldSet.join(', ')}:`, error);
        rejectedFields = [...rejectedFields, ...fieldSet];
      }
    }
    
    // Then test individual fields from rejected sets
    const fieldsToTest = [...new Set(rejectedFields)];
    console.log('\nTesting individual fields from rejected sets...');
    
    for (const fieldKey of fieldsToTest) {
      const field = allFields.find(f => f.key === fieldKey);
      if (!field || !field.value) continue;
      
      const formDataToSend = new FormData();
      formDataToSend.append(field.key, field.value);
      
      try {
        console.log(`Testing individual field: ${field.key}`);
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        if (response.status !== 500) {
          console.log(`✅ Field accepted: ${field.key} - Status: ${response.status}`);
          acceptedFields.push(field.key);
        } else {
          console.log(`❌ Field rejected: ${field.key} - Status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error testing field ${field.key}:`, error);
      }
    }
    
    // Test file uploads separately
    console.log('\nTesting file uploads...');
    if (formData.passportPicture) {
      const fileFields = [
        { key: 'profile', file: formData.passportPicture },
        { key: 'photo', file: formData.passportPicture },
        { key: 'picture', file: formData.passportPicture },
        { key: 'passport_picture', file: formData.passportPicture },
        { key: 'image', file: formData.passportPicture }
      ];
      
      for (const field of fileFields) {
        const formDataToSend = new FormData();
        formDataToSend.append(field.key, field.file);
        
        try {
          console.log(`Testing file field: ${field.key}`);
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          });
          
          if (response.status !== 500) {
            console.log(`✅ File field accepted: ${field.key} - Status: ${response.status}`);
            acceptedFields.push(field.key);
          } else {
            console.log(`❌ File field rejected: ${field.key} - Status: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error testing file field ${field.key}:`, error);
        }
      }
    }
    
    if (formData.cv) {
      const fileFields = [
        { key: 'cv', file: formData.cv },
        { key: 'document', file: formData.cv },
        { key: 'resume', file: formData.cv },
        { key: 'documents', file: formData.cv }
      ];
      
      for (const field of fileFields) {
        const formDataToSend = new FormData();
        formDataToSend.append(field.key, field.file);
        
        try {
          console.log(`Testing file field: ${field.key}`);
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          });
          
          if (response.status !== 500) {
            console.log(`✅ File field accepted: ${field.key} - Status: ${response.status}`);
            acceptedFields.push(field.key);
          } else {
            console.log(`❌ File field rejected: ${field.key} - Status: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error testing file field ${field.key}:`, error);
        }
      }
    }
    
    // Summarize findings
    console.log('\n=========== FIELD TESTING SUMMARY ===========');
    console.log('Accepted fields:', acceptedFields);
    console.log('Rejected fields:', rejectedFields.filter(f => !acceptedFields.includes(f)));
    console.log('==============================================');
    
    // Return the list of accepted fields
    return acceptedFields;
  };

  // Try a minimal submission with the absolute minimum fields
  const tryMinimalSubmission = async (endpoint) => {
    console.log(`Attempting minimal submission to ${endpoint}...`);
    
    try {
      // Create the absolute minimum form data
      const minimalFormData = new FormData();
      
      // Just include the most essential fields with the simplest names
      minimalFormData.append('name', formData.nomineeName);
      minimalFormData.append('email', formData.nominatorEmail);
      
      console.log('Sending minimal request...');
      const response = await fetch(endpoint, {
        method: 'POST',
        body: minimalFormData,
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('Minimal submission response:', response.status, response.statusText);
      
      if (response.ok) {
        console.log('Minimal submission succeeded!');
        return await handleApiResponse(response);
      } else {
        // If minimal doesn't work, try single field submissions to find what works
        console.log('Trying single field submissions...');
        const fields = [
          { key: 'nominee', value: formData.nomineeName },
          { key: 'name', value: formData.nomineeName },
          { key: 'email', value: formData.nominatorEmail },
          { key: 'phone', value: formData.nominatorPhone },
          { key: 'category', value: formData.awardCategory }
        ];
        
        for (const field of fields) {
          const singleFieldFormData = new FormData();
          singleFieldFormData.append(field.key, field.value);
          
          console.log(`Testing single field: ${field.key}`);
          const singleFieldResponse = await fetch(endpoint, {
            method: 'POST',
            body: singleFieldFormData,
            headers: {
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          });
          
          if (singleFieldResponse.status !== 500) {
            console.log(`Field ${field.key} accepted with status ${singleFieldResponse.status}`);
            
            if (singleFieldResponse.ok) {
              console.log(`Single field submission with ${field.key} succeeded!`);
              return await handleApiResponse(singleFieldResponse);
            }
          } else {
            console.log(`Field ${field.key} rejected with status 500`);
          }
        }
        
        throw new Error(`Minimal submission failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Minimal submission failed:', error);
      throw error;
    }
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
          <PageTitle>Nominate a Healthcare Professional</PageTitle>
          <PageDescription>
            Recognize excellence in healthcare by nominating an outstanding professional for our annual awards. Your nomination helps highlight the incredible work being done in the nursing and healthcare community.
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
                  <Label htmlFor="nominatorEmail">Email Address *</Label>
                  <Input 
                    type="email" 
                    id="nominatorEmail" 
                    name="nominatorEmail" 
                    value={formData.nominatorEmail}
                    onChange={handleInputChange}
                    required
                  />
                  {formData.nominatorEmailError && (
                    <ErrorText>{formData.nominatorEmailError}</ErrorText>
                  )}
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
                  <Label htmlFor="nominatorOrganization">Organization/Institution *</Label>
                  <Input 
                    type="text" 
                    id="nominatorOrganization" 
                    name="nominatorOrganization" 
                    value={formData.nominatorOrganization}
                    onChange={handleInputChange}
                    required
                  />
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
                <p>Please provide comprehensive information about the healthcare professional you are nominating.</p>
                
                <FormGroup>
                  <Label htmlFor="nomineeTitle">Title (Optional)</Label>
                  <Select 
                    id="nomineeTitle" 
                    name="nomineeTitle" 
                    value={formData.nomineeTitle}
                    onChange={handleInputChange}
                    disabled={isLoadingTitles}
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
                  <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                  <Select 
                    id="jobTitle" 
                    name="jobTitle" 
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    disabled={isLoadingTitles}
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
                <p>You can upload a passport picture of the nominee if available, but it's not required.</p>
                
                <FormGroup>
                  <Label>Passport Picture (Optional)</Label>
                  <FileUploadContainer onClick={() => document.getElementById('passportPicture').click()}>
                    <FileInput
                      type="file"
                      id="passportPicture"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'passportPicture')}
                    />
                    <UploadIcon>📸</UploadIcon>
                    <UploadText>Click to upload a passport picture (optional)</UploadText>
                    <UploadText>(Maximum size: 2MB, Format: JPG, PNG)</UploadText>
                    {formData.passportPicture && (
                      <FileName>{formData.passportPicture.name}</FileName>
                    )}
                  </FileUploadContainer>
                </FormGroup>
                
                <FormGroup>
                  <Label>Curriculum Vitae (CV)</Label>
                  <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    textAlign: 'center'
                  }}>
                    <div style={{ color: '#777', fontSize: '1.5rem', marginBottom: '10px' }}>📄</div>
                    <div style={{ color: '#777' }}>CV upload is currently disabled</div>
                    <div style={{ color: '#999', fontSize: '0.9rem', marginTop: '5px' }}>
                      Only passport picture is required for nomination
                    </div>
                  </div>
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
                  <Label htmlFor="reasonForNomination">Primary Reason for Nomination *</Label>
                  <Textarea 
                    id="reasonForNomination" 
                    name="reasonForNomination" 
                    value={formData.reasonForNomination}
                    onChange={handleInputChange}
                    required
                    placeholder="Explain the main reasons why you are nominating this person"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="professionalAchievements">Professional Achievements *</Label>
                  <Textarea 
                    id="professionalAchievements" 
                    name="professionalAchievements" 
                    value={formData.professionalAchievements}
                    onChange={handleInputChange}
                    required
                    placeholder="List specific accomplishments, awards, or recognition"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="impactDescription">Impact on Healthcare *</Label>
                  <Textarea 
                    id="impactDescription" 
                    name="impactDescription" 
                    value={formData.impactDescription}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the impact this person has had on patients, colleagues, or the healthcare community"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="contributionToNursing">Contribution to Nursing Excellence *</Label>
                  <Textarea 
                    id="contributionToNursing" 
                    name="contributionToNursing" 
                    value={formData.contributionToNursing}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe how the nominee has contributed to advancing nursing excellence"
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
                  <p>Thank you for nominating an outstanding healthcare professional. Your nomination has been received and will be reviewed by our awards committee.</p>
                  <p>We've sent a confirmation email to {formData.nominatorEmail} with details of your submission.</p>
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