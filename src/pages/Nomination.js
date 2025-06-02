import React, { useState } from 'react';
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
  padding: 0 20px;
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
  margin-bottom: 100px; /* Add space for fixed buttons */
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: white;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
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

const Nomination = () => {
  const [currentStep, setCurrentStep] = useState(0); // Start with requirements (step 0)
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Nominator's Details
    nominatorName: '',
    nominatorEmail: '',
    nominatorPhone: '',
    nominatorOrganization: '',
    relationship: '',
    
    // Nominee's Details
    nomineeName: '',
    nomineeEmail: '',
    nomineePhone: '',
    nomineeTitle: '',
    nomineeOrganization: '',
    nomineeYearsExperience: '',
    nomineeYearsExperienceError: '',
    nomineeQualifications: '',
    
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
    nomineeEmailError: '',
    nominatorPhoneError: '',
    nomineePhoneError: '',
  });
  
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
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear any previous errors
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Here you would typically send the data to your backend
      console.log('Nomination submitted:', formData);
      
      // Show success message by moving to step 6
      setCurrentStep(6);
      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting nomination:', error);
      setErrors({ submit: 'Failed to submit nomination. Please try again.' });
      setIsLoading(false);
    }
  };
  
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
      formData.nomineeEmail?.trim() &&
      validateEmail(formData.nomineeEmail) &&
      formData.nomineePhone?.trim() &&
      validatePhone(formData.nomineePhone) &&
      formData.nomineeTitle?.trim() &&
      formData.nomineeOrganization?.trim() &&
      formData.nomineeYearsExperience &&
      !formData.nomineeYearsExperienceError &&
      formData.nomineeQualifications?.trim()
    );
  };

  const validateDocuments = () => {
    return formData.passportPicture && formData.cv;
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
      title: "Nominee's Passport Picture",
      description: "A recent passport-sized photograph of the nominee in high resolution (taken within the last 6 months).",
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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [type]: file
      });
    }
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
                <div></div>
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
                  <Label htmlFor="nomineeTitle">Professional Title/Position *</Label>
                  <Input 
                    type="text" 
                    id="nomineeTitle" 
                    name="nomineeTitle" 
                    value={formData.nomineeTitle}
                    onChange={handleInputChange}
                    required
                  />
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
                  <Label htmlFor="nomineeEmail">Email Address *</Label>
                  <Input 
                    type="email" 
                    id="nomineeEmail" 
                    name="nomineeEmail" 
                    value={formData.nomineeEmail}
                    onChange={handleInputChange}
                    required
                  />
                  {formData.nomineeEmailError && (
                    <ErrorText>{formData.nomineeEmailError}</ErrorText>
                  )}
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
                
                <FormGroup>
                  <Label htmlFor="nomineeYearsExperience">Years of Experience *</Label>
                  <Input 
                    type="text"
                    id="nomineeYearsExperience"
                    name="nomineeYearsExperience"
                    value={formData.nomineeYearsExperience}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter years of experience (0-50)"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                  {formData.nomineeYearsExperienceError && (
                    <ErrorText>{formData.nomineeYearsExperienceError}</ErrorText>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nomineeQualifications">Professional Qualifications *</Label>
                  <Textarea 
                    id="nomineeQualifications" 
                    name="nomineeQualifications" 
                    value={formData.nomineeQualifications}
                    onChange={handleInputChange}
                    required
                    placeholder="List relevant degrees, certifications, and professional qualifications"
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>Previous</Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>Next</Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 3: Required Documents */}
              <StepContent active={currentStep === 3}>
                <h2>Required Documents</h2>
                <p>Please upload the required documents for the nominee.</p>
                
                <FormGroup>
                  <Label>Passport Picture *</Label>
                  <FileUploadContainer onClick={() => document.getElementById('passportPicture').click()}>
                    <FileInput
                      type="file"
                      id="passportPicture"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'passportPicture')}
                    />
                    <UploadIcon>📸</UploadIcon>
                    <UploadText>Click to upload a recent passport picture</UploadText>
                    <UploadText>(Maximum size: 2MB, Format: JPG, PNG)</UploadText>
                    {formData.passportPicture && (
                      <FileName>{formData.passportPicture.name}</FileName>
                    )}
                  </FileUploadContainer>
                </FormGroup>
                
                <FormGroup>
                  <Label>Curriculum Vitae (CV) *</Label>
                  <FileUploadContainer onClick={() => document.getElementById('cv').click()}>
                    <FileInput
                      type="file"
                      id="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'cv')}
                    />
                    <UploadIcon>📄</UploadIcon>
                    <UploadText>Click to upload the nominee's CV</UploadText>
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
                  <Label htmlFor="awardCategory">Award Category *</Label>
                  <Select 
                    id="awardCategory" 
                    name="awardCategory" 
                    value={formData.awardCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select award category</option>
                    <option value="Clinical Excellence">Clinical Excellence</option>
                    <option value="Education & Research">Education & Research Excellence</option>
                    <option value="Leadership">Leadership & Governance</option>
                    <option value="Innovation">Innovation in Healthcare</option>
                    <option value="Community Impact">Community Impact</option>
                  </Select>
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
                    <Button onClick={handleNextAfterSuccess}>Next</Button>
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