import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: clamp(40px, 6vw, 80px) 0;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #1a4332;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: 15px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: #475569;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 30px;
  }
`;

const SponsorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: clamp(20px, 3vw, 30px);
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const SponsorCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 250px;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 10px;
    max-width: 200px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const SponsorName = styled.h3`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: #2563EB;
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

const SponsorType = styled.p`
  font-size: 0.9rem;
  color: #64748B;
  text-align: center;
  margin: 5px 0 0 0;
`;

const SponsorsSection = () => {
  const sponsors = [
    { name: 'MediCare', type: 'Healthcare Partner' },
    { name: 'HealthEdu', type: 'Education Provider' },
    { name: 'PharmaCare', type: 'Medical Supplies' }
  ];

  return (
    <SectionContainer>
      <Container>
        <SectionTitle>Our Sponsors</SectionTitle>
        <SectionSubtitle>
          We are proud to partner with leading organizations in healthcare and education
          who share our commitment to advancing nursing excellence.
        </SectionSubtitle>
        <SponsorsGrid>
          {sponsors.map((sponsor, index) => (
            <SponsorCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div>
                <SponsorName>{sponsor.name}</SponsorName>
                <SponsorType>{sponsor.type}</SponsorType>
              </div>
            </SponsorCard>
          ))}
        </SponsorsGrid>
      </Container>
    </SectionContainer>
  );
};

export default SponsorsSection; 