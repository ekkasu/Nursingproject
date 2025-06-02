import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SectionWrapper = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Title = styled.h2`
  font-size: 48px;
  color: #1a8f4c;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #156e3a;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TicketsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  perspective: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    perspective: none;
    max-width: 350px;
  }
`;

const TicketCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: ${props => props.featured ? '40px 30px' : '30px 25px'};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.featured ? '#FFD700' : '#1a8f4c'};
  }

  ${props => props.featured && `
    &::after {
      content: 'RECOMMENDED';
      position: absolute;
      top: 15px;
      right: -30px;
      background: #FFD700;
      color: #1a8f4c;
      padding: 3px 30px;
      transform: rotate(45deg);
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }
  `}

  @media (max-width: 768px) {
    transform: none !important;
    opacity: 1 !important;
    padding: 30px 20px;
  }
`;

const TicketName = styled.h3`
  font-size: ${props => props.featured ? '22px' : '20px'};
  color: #1a8f4c;
  margin-bottom: 15px;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: ${props => props.featured ? '42px' : '36px'};
  color: ${props => props.featured ? '#FFD700' : '#1a8f4c'};
  font-weight: 700;
  margin-bottom: 25px;
  
  span {
    font-size: ${props => props.featured ? '18px' : '16px'};
    color: #666;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
`;

const Feature = styled.li`
  color: #156e3a;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: ${props => props.featured ? '14px' : '13px'};

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '✓';
    color: ${props => props.featured ? '#FFD700' : '#1a8f4c'};
    margin-right: 8px;
    font-weight: bold;
  }
`;

const BuyButton = styled(Link)`
  display: inline-block;
  padding: ${props => props.featured ? '12px 30px' : '10px 25px'};
  background: ${props => props.featured ? '#FFD700' : '#1a8f4c'};
  color: ${props => props.featured ? '#1a8f4c' : 'white'};
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.featured ? '#FFD700' : '#1a8f4c'};
  font-size: 13px;

  &:hover {
    background: transparent;
    color: ${props => props.featured ? '#FFD700' : '#1a8f4c'};
  }
`;

const TicketSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const tickets = [
    {
      name: "Join Us In Person",
      price: 240,
      featured: true,
      features: [
        "Full Conference Access (3 Days)",
        "Exclusive VIP Networking Events",
        "Premium Seating at All Sessions",
        "Gourmet Lunch & Refreshments Daily",
        "VIP Lounge Access with Speakers",
        "Professional Headshot Session",
        "Printed Conference Materials",
        "Personalized Certificate of Excellence"
      ]
    },
    {
      name: "Join Us Online",
      price: 79,
      featured: false,
      features: [
        "Live Stream All Sessions",
        "Virtual Networking Platform",
        "Digital Conference Materials",
        "On-Demand Session Recordings",
        "Virtual Q&A Participation",
        "Digital Certificate of Completion"
      ]
    }
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Title>Choose Your Experience</Title>
          <Subtitle>Select the ticket that best suits your needs and be part of this transformative event.</Subtitle>
        </SectionHeader>
        <TicketsGrid
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {tickets.map((ticket, index) => (
            <TicketCard
              key={ticket.name}
              featured={ticket.featured}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <TicketName featured={ticket.featured}>{ticket.name}</TicketName>
              <Price featured={ticket.featured}>
                ${ticket.price} <span>USD</span>
              </Price>
              <FeaturesList>
                {ticket.features.map((feature, i) => (
                  <Feature key={i} featured={ticket.featured}>
                    {feature}
                  </Feature>
                ))}
              </FeaturesList>
              <BuyButton to="/tickets" featured={ticket.featured}>
                Register Now
              </BuyButton>
            </TicketCard>
          ))}
        </TicketsGrid>
      </Container>
    </SectionWrapper>
  );
};

export default TicketSection; 