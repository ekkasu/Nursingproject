import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: 120px 0 80px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  perspective: 1000px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
  }

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
  margin-bottom: 5px;
  font-weight: 700;
`;

const TicketDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  font-style: italic;
  white-space: pre-line;
  text-align: center;
  line-height: 1.5;
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

const BuyButton = styled(motion.button)`
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
  cursor: pointer;

  &:hover {
    background: transparent;
    color: ${props => props.featured ? '#FFD700' : '#1a8f4c'};
  }
`;

const PaymentModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  z-index: 1000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  
  &:hover {
    color: #1a8f4c;
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormTitle = styled.h2`
  color: #1a8f4c;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Playfair Display', serif;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a8f4c;
    box-shadow: 0 0 0 2px rgba(26, 143, 76, 0.1);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
`;

const SubmitButton = styled(motion.button)`
  background: #1a8f4c;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: #156e3a;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const OrderSummary = styled.div`
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #4a5568;

  &:last-child {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e2e8f0;
    font-weight: 600;
    color: #1a8f4c;
  }
`;

const TermsLink = styled(Link)`
  display: block;
  text-align: center;
  margin: 40px auto 0;
  color: #1a8f4c;
  font-weight: 600;
  text-decoration: underline;
  font-size: 16px;
  
  &:hover {
    color: #156e3a;
  }
`;

const Tickets = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const tickets = [
    {
      name: "Online",
      apiValue: "online",
      description: "Virtual attendance with full digital access to all sessions",
      price: 2000,
      currency: "GHS",
      featured: false,
      features: [
        "Live Stream All Sessions",
        "Virtual Networking Platform",
        "Digital Conference Materials",
        "On-Demand Session Recordings",
        "Virtual Q&A Participation",
        "Digital Certificate of Completion"
      ]
    },
    {
      name: "Onsite",
      apiValue: "onsite",
      description: "In-person attendance with full VIP conference experience",
      price: 3500,
      currency: "GHS",
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
      name: "Reservation",
      description: "Reserve your spot now and pay later",
      hidePrice: true,
      featured: false,
      features: [
        "Lock in Current Pricing",
        "Payment Deadline: August 19, 2025",
        "Flexible Payment Options",
        "Priority Access to Sessions",
        "Free Schedule Changes",
        "Special Group Rates Available"
      ],
      customButton: "Reserve Now"
    }
  ];

  const getCardStyles = (index) => {
    if (hoveredCard === null) {
      return {
        scale: index === 1 ? 1.1 : 1,
        translateY: index === 1 ? -15 : 0,
        zIndex: index === 1 ? 2 : 1,
        opacity: 1
      };
    }

    if (hoveredCard === index) {
      return {
        scale: 1.12,
        translateY: -20,
        zIndex: 2,
        opacity: 1
      };
    }

    return {
      scale: 0.95,
      translateY: 0,
      zIndex: 1,
      opacity: 0.5
    };
  };

  const handlePurchase = (ticket) => {
    if (ticket.name === "Reservation") {
      navigate('/reservation');
    } else {
      navigate('/registration', { state: { selectedTicket: ticket } });
    }
  };

  const handleSelectTicket = (ticket) => {
    if (ticket.name === "Reservation") {
      navigate('/reservation');
    } else {
      const ticketForRegistration = {
        ...ticket,
        registration_type: ticket.apiValue
      };
      navigate('/registration', { state: { selectedTicket: ticketForRegistration } });
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Container>
          <SectionHeader>
            <Title>Choose Your Ticket</Title>
            <Subtitle>Select between Online or Onsite attendance for the NMCON 2025 conference.</Subtitle>
          </SectionHeader>

          <TicketsGrid
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {tickets.map((ticket, index) => (
              <TicketCard
                key={index}
                featured={ticket.featured}
                style={getCardStyles(index)}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <TicketName featured={ticket.featured}>{ticket.name}</TicketName>
                <TicketDescription>{ticket.description}</TicketDescription>
                {!ticket.hidePrice && (
                  <Price featured={ticket.featured}>
                    {ticket.currency} {ticket.price}
                    <span>/person</span>
                  </Price>
                )}
                <FeaturesList>
                  {ticket.features.map((feature, i) => (
                    <Feature key={i} featured={ticket.featured}>
                      {feature}
                    </Feature>
                  ))}
                </FeaturesList>
                <BuyButton
                  featured={ticket.featured}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectTicket(ticket)}
                >
                  {ticket.customButton || "Select This Ticket"}
                </BuyButton>
              </TicketCard>
            ))}
          </TicketsGrid>

          <TermsLink to="/terms">View Conference Registration Terms and Conditions</TermsLink>
        </Container>
      </PageContainer>
    </>
  );
};

export default Tickets; 