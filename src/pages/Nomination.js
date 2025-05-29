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

const Nomination = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Nominator Information
    nominatorName: '',
    nominatorEmail: '',
    nominatorPhone: '',
    relationship: '',
    
    // Nominee Information
    nomineeName: '',
    nomineeTitle: '',
    nomineeOrganization: '',
    nomineeEmail: '',
    nomineePhone: '',
    
    // Nomination Details
    awardCategory: '',
    reasonForNomination: '',
    achievements: '',
    impactDescription: '',
    supportingDocuments: '',
    
    // Confirmation
    agreeTerms: false,
    agreePrivacy: false
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Nomination submitted:', formData);
    // Move to success step
    nextStep();
  };
  
  // Validation for each step
  const validateStep1 = () => {
    return formData.nominatorName && formData.nominatorEmail && formData.relationship;
  };
  
  const validateStep2 = () => {
    return formData.nomineeName && formData.nomineeTitle && formData.nomineeOrganization;
  };
  
  const validateStep3 = () => {
    return formData.awardCategory && formData.reasonForNomination && formData.achievements;
  };
  
  const validateStep4 = () => {
    return formData.agreeTerms && formData.agreePrivacy;
  };
  
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Nominate a Healthcare Professional</PageTitle>
          <PageDescription>
            Recognize excellence in healthcare by nominating an outstanding professional for our annual awards. Your nomination helps highlight the incredible work being done in the nursing and healthcare community.
          </PageDescription>
          
          <FormContainer>
            {currentStep <= 5 && (
              <StepIndicator>
                <Step active={currentStep === 1} completed={currentStep > 1} label="Nominator">
                  1
                </Step>
                <Step active={currentStep === 2} completed={currentStep > 2} label="Nominee">
                  2
                </Step>
                <Step active={currentStep === 3} completed={currentStep > 3} label="Details">
                  3
                </Step>
                <Step active={currentStep === 4} completed={currentStep > 4} label="Supporting">
                  4
                </Step>
                <Step active={currentStep === 5} completed={currentStep > 5} label="Confirm">
                  5
                </Step>
              </StepIndicator>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Nominator Information */}
              <StepContent active={currentStep === 1}>
                <h2>Nominator Information</h2>
                <p>Please provide your contact details as the person submitting this nomination.</p>
                
                <FormGroup>
                  <Label htmlFor="nominatorName">Your Full Name *</Label>
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
                  <Label htmlFor="nominatorEmail">Your Email Address *</Label>
                  <Input 
                    type="email" 
                    id="nominatorEmail" 
                    name="nominatorEmail" 
                    value={formData.nominatorEmail}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nominatorPhone">Your Phone Number</Label>
                  <Input 
                    type="tel" 
                    id="nominatorPhone" 
                    name="nominatorPhone" 
                    value={formData.nominatorPhone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="relationship">Your Relationship to Nominee *</Label>
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
                  <div></div> {/* Empty div for spacing */}
                  <Button type="button" onClick={nextStep} disabled={!validateStep1()}>
                    Next Step
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 2: Nominee Information */}
              <StepContent active={currentStep === 2}>
                <h2>Nominee Information</h2>
                <p>Please provide details about the healthcare professional you are nominating.</p>
                
                <FormGroup>
                  <Label htmlFor="nomineeName">Nominee's Full Name *</Label>
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
                  <Label htmlFor="nomineeTitle">Nominee's Title/Position *</Label>
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
                  <Label htmlFor="nomineeOrganization">Nominee's Organization/Institution *</Label>
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
                  <Label htmlFor="nomineeEmail">Nominee's Email Address</Label>
                  <Input 
                    type="email" 
                    id="nomineeEmail" 
                    name="nomineeEmail" 
                    value={formData.nomineeEmail}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nomineePhone">Nominee's Phone Number</Label>
                  <Input 
                    type="tel" 
                    id="nomineePhone" 
                    name="nomineePhone" 
                    value={formData.nomineePhone}
                    onChange={handleInputChange}
                  />
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
              
              {/* Step 3: Nomination Details */}
              <StepContent active={currentStep === 3}>
                <h2>Nomination Details</h2>
                <p>Tell us why you believe this healthcare professional deserves recognition.</p>
                
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
                    <option value="Excellence in Clinical Practice">Excellence in Clinical Practice</option>
                    <option value="Nursing Leadership">Nursing Leadership</option>
                    <option value="Innovation in Healthcare">Innovation in Healthcare</option>
                    <option value="Compassionate Care">Compassionate Care</option>
                    <option value="Nursing Education">Nursing Education</option>
                    <option value="Lifetime Achievement">Lifetime Achievement</option>
                    <option value="Rising Star">Rising Star (Less than 5 years experience)</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="reasonForNomination">Reason for Nomination *</Label>
                  <Textarea 
                    id="reasonForNomination" 
                    name="reasonForNomination" 
                    value={formData.reasonForNomination}
                    onChange={handleInputChange}
                    placeholder="Briefly explain why you are nominating this person"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="achievements">Key Achievements *</Label>
                  <Textarea 
                    id="achievements" 
                    name="achievements" 
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="List specific accomplishments, awards, or recognition"
                    required
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="button" onClick={prevStep} secondary>
                    Previous Step
                  </Button>
                  <Button type="button" onClick={nextStep} disabled={!validateStep3()}>
                    Next Step
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Step 4: Supporting Information */}
              <StepContent active={currentStep === 4}>
                <h2>Supporting Information</h2>
                <p>Provide additional details to strengthen this nomination.</p>
                
                <FormGroup>
                  <Label htmlFor="impactDescription">Impact Description</Label>
                  <Textarea 
                    id="impactDescription" 
                    name="impactDescription" 
                    value={formData.impactDescription}
                    onChange={handleInputChange}
                    placeholder="Describe the impact this person has had on patients, colleagues, or the healthcare community"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="supportingDocuments">Supporting Documents (Optional)</Label>
                  <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                    You may upload letters of recommendation, testimonials, or other supporting documents later via email.
                  </p>
                  <Input 
                    type="text" 
                    id="supportingDocuments" 
                    name="supportingDocuments" 
                    value={formData.supportingDocuments}
                    onChange={handleInputChange}
                    placeholder="Describe any documents you plan to submit"
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
                  <Button type="button" onClick={prevStep} secondary>
                    Previous Step
                  </Button>
                  <Button type="submit" disabled={!validateStep4()}>
                    Submit Nomination
                  </Button>
                </ButtonGroup>
              </StepContent>
              
              {/* Success Message */}
              <StepContent active={currentStep === 6}>
                <SuccessMessage>
                  <SuccessIcon>✓</SuccessIcon>
                  <h2>Nomination Submitted Successfully!</h2>
                  <p>Thank you for nominating an outstanding healthcare professional. Your nomination has been received and will be reviewed by our awards committee.</p>
                  <p>We've sent a confirmation email to {formData.nominatorEmail} with details of your submission.</p>
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