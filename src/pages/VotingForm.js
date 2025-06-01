import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a8f4c;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #FFD700;
    margin: 15px auto 0;
  }
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
  font-size: 1rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #34495e;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #1a8f4c;
    box-shadow: 0 0 0 2px rgba(26, 143, 76, 0.1);
  }
`;

const NomineeCard = styled.div`
  background: ${props => props.selected ? 'rgba(26, 143, 76, 0.1)' : '#f8f9fa'};
  border: 2px solid ${props => props.selected ? '#1a8f4c' : '#ddd'};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NomineeName = styled.h3`
  font-size: 1.2rem;
  color: #1a8f4c;
  margin-bottom: 10px;
`;

const NomineeDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const VoteButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #1a8f4c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #156e3a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(26, 143, 76, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const PaymentInfo = styled.div`
  background: #fff9e6;
  border: 1px solid #ffd700;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
`;

const VotingForm = () => {
  const [category, setCategory] = useState('');
  const [selectedNominee, setSelectedNominee] = useState(null);

  // Mock data - replace with actual API data
  const categories = [
    'Clinical Excellence',
    'Education & Research Excellence',
    'Leadership & Governance',
    'Innovation in Healthcare',
    'Community Impact'
  ];

  const nominees = [
    {
      id: 1,
      name: 'Jane Smith',
      title: 'Senior Nurse Practitioner',
      organization: 'Central Hospital',
      achievements: 'Led COVID-19 response team, Implemented new patient care protocols'
    },
    {
      id: 2,
      name: 'John Doe',
      title: 'Head of Nursing Education',
      organization: 'Medical University',
      achievements: 'Published research on nursing practices, Mentored 50+ nurses'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      title: 'Community Health Nurse',
      organization: 'Rural Health Services',
      achievements: 'Established mobile clinic program, Improved vaccination rates'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement payment and voting logic here
    alert('Proceeding to payment...');
  };

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Cast Your Vote</PageTitle>
          
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="category">Select Award Category</Label>
                <Select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Choose a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </Select>
              </FormGroup>

              {category && (
                <FormGroup>
                  <Label>Select Nominee</Label>
                  {nominees.map((nominee) => (
                    <NomineeCard
                      key={nominee.id}
                      selected={selectedNominee === nominee.id}
                      onClick={() => setSelectedNominee(nominee.id)}
                    >
                      <NomineeName>{nominee.name}</NomineeName>
                      <NomineeDetails>
                        <p><strong>{nominee.title}</strong></p>
                        <p>{nominee.organization}</p>
                        <p><em>Key Achievements:</em> {nominee.achievements}</p>
                      </NomineeDetails>
                    </NomineeCard>
                  ))}
                </FormGroup>
              )}

              {selectedNominee && (
                <>
                  <PaymentInfo>
                    <p>🔒 Secure Payment Required</p>
                    <p>• Cost per vote: GHC 1</p>
                    <p>• Available for all mobile networks</p>
                    <p>• Your vote contributes 30% to the final selection</p>
                  </PaymentInfo>

                  <VoteButton type="submit">
                    Proceed to Vote (GHC 1)
                  </VoteButton>
                </>
              )}
            </form>
          </FormContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default VotingForm; 