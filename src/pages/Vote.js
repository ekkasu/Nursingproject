import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
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

const RulesSummarySection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a8f4c;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 600;
`;

const RulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const RuleCard = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  border-radius: 10px;
  padding: 25px;
  border-left: 4px solid #1a8f4c;

  h3 {
    color: #1a8f4c;
    font-size: 1.2rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: '${props => props.icon}';
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: #34495e;
      font-size: 0.95rem;
      line-height: 1.6;
      padding-left: 20px;
      position: relative;
      margin-bottom: 10px;

      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: #1a8f4c;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled(Link)`
  background: ${props => props.primary ? '#1a8f4c' : 'white'};
  color: ${props => props.primary ? 'white' : '#1a8f4c'};
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid #1a8f4c;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${props => props.primary ? '#156e3a' : '#f5f7fa'};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(26, 143, 76, 0.3);
  }

  &::before {
    content: ${props => props.icon || 'none'};
  }
`;

const Vote = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Nomination & Voting</PageTitle>

          <RulesSummarySection>
            <SummaryTitle>Key Nomination Guidelines</SummaryTitle>
            <RulesGrid>
              <RuleCard icon="📅">
                <h3>Important Dates</h3>
                <ul>
                  <li>Nominations: 21st May - 30th June, 2025</li>
                  <li>Interviews & Voting: July to August 2025</li>
                  <li>Winners announced at 6th Leaders Conference</li>
                </ul>
              </RuleCard>

              <RuleCard icon="📋">
                <h3>Nomination Process</h3>
                <ul>
                  <li>Obtain nominee's consent before nomination</li>
                  <li>Submit all required supporting documents</li>
                  <li>One nomination per category only</li>
                </ul>
              </RuleCard>

              <RuleCard icon="🎯">
                <h3>Selection Process</h3>
                <ul>
                  <li>Expert panel review of applications</li>
                  <li>Top 10 nominees undergo interviews</li>
                  <li>70% interview, 30% public voting weight</li>
                </ul>
              </RuleCard>

              <RuleCard icon="🗳️">
                <h3>Voting Information</h3>
                <ul>
                  <li>GHC 1 per vote via short code or web portal</li>
                  <li>Available for all mobile networks</li>
                  <li>Results contribute 30% to final selection</li>
                </ul>
              </RuleCard>
            </RulesGrid>

            <ButtonGroup>
              <ActionButton to="/nomination-rules" icon="'📋'">
                View Complete Guidelines
              </ActionButton>
              <ActionButton to="/voting-form" primary icon="'🗳️'">
                Start Voting Now
              </ActionButton>
            </ButtonGroup>
          </RulesSummarySection>

          {/* Rest of the voting page content */}
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Vote; 