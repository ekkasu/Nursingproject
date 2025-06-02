import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Header from '../components/Header';
import TicketSection from '../components/TicketSection';
import SponsorsSection from '../components/SponsorsSection';
import NewsFeed from '../components/NewsFeed';
import ConferenceFlyer from '../components/ConferenceFlyer';
import EventCalendar from '../components/EventCalendar';
import { Link, useNavigate } from 'react-router-dom';

// Import hero images
import hero1 from '../assets/images/Hero/005A0041.JPG';
import hero2 from '../assets/images/Hero/005A0024.JPG';
import hero3 from '../assets/images/Hero/005A0006.JPG';
import hero4 from '../assets/images/Hero/005A0097.JPG';

// Sample speakers data
const speakers = [
  {
    name: "Dr. James Smith",
    title: "Chief of Nursing Excellence, Accra Medical Center",
    image: hero1 // Using hero1 as a placeholder, you should replace with actual speaker images
  },
  {
    name: "Dr. Anna Paulman",
    title: "Director of Healthcare Innovation",
    image: hero2
  },
  {
    name: "Dr. David Gibson",
    title: "Head of Clinical Research",
    image: hero3
  },
  {
    name: "Dr. Lori Mendoza",
    title: "Lead Nursing Education Specialist",
    image: hero4
  }
];

const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  margin: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - 60px);
    margin-top: 60px;
  }
`;

const SlideContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const HeroBackground = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => props.backgroundImage ? `linear-gradient(to bottom, rgba(26, 143, 76, 0.5), rgba(21, 110, 58, 0.6)), url(${props.backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    z-index: -1;
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 15px;
    text-align: center;
  }
`;

const MainHeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 25px;
  }
`;

const MainHeadingPart = styled.span`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  display: inline;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }
`;

const GreenText = styled(MainHeadingPart)`
  color: #64f4ac;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 10px;
    display: block;
    margin-bottom: 5px;
  }
`;

const WhiteText = styled(MainHeadingPart)`
  color: #ffffff;

  @media (max-width: 768px) {
    display: block;
  }
`;

const EventDetails = styled(motion.div)`
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  color: #64f4ac;
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
  
  span {
    color: #ffffff;
  }
`;

const Divider = styled.span`
  color: #ffffff;
  opacity: 0.5;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    gap: 12px;
    margin-top: 30px;
  }
`;

const Button = styled(Link)`
  padding: 16px 32px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 24px;
    min-width: unset;
    font-size: 0.9rem;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #64f4ac;
  color: #000000;
  border: none;
  
  &:hover {
    background-color: #4cd893;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #64f4ac;
  color: #64f4ac;

  &:hover {
    background-color: #64f4ac;
    color: #000000;
  }
`;

const Section = styled.section`
  padding: 100px 0;
  background-color: ${props => props.dark ? '#0a0a0a' : '#ffffff'};
  color: ${props => props.dark ? '#ffffff' : '#0a0a0a'};
`;

const SectionContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  opacity: 0;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 20px;
    text-align: center;
  font-family: 'Playfair Display', serif;
  color: ${props => props.dark ? '#ffffff' : '#0a0a0a'};
`;

const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: ${props => props.dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
  
  @media (max-width: 768px) {
    bottom: 20px;
    gap: 8px;
  }
`;

const CarouselDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #FFD700;
  background: ${props => props.active ? '#FFD700' : 'transparent'};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const scrollFadeInVariant = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scrollStaggerVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const EventTimerSection = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: clamp(40px, 6vw, 80px) 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const TimerTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #156e3a !important;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }
`;

const TimerSubtitle = styled(SectionSubtitle)`
  color: #1a8f4c !important;
  opacity: 0.9;
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(10px, 2vw, 20px);
  margin: clamp(20px, 4vw, 40px) 0;
  flex-wrap: wrap;
`;

const CountdownBox = styled.div`
  background: rgba(26, 143, 76, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  padding: clamp(15px, 2vw, 25px) clamp(10px, 1.5vw, 20px);
  min-width: clamp(80px, 12vw, 120px);
  text-align: center;
  
  @media (max-width: 768px) {
    min-width: 70px;
    padding: 12px 8px;
  }
`;

const CountdownNumber = styled.div`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #156e3a;
  line-height: 1;
  margin-bottom: 6px;
`;

const CountdownLabel = styled.div`
  font-size: clamp(0.7rem, 1vw, 0.8rem);
  color: #1a8f4c;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const SpeakersSection = styled.section`
  padding: clamp(40px, 6vw, 80px) 0;
  background: #f8fafc;
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const SpeakersHeader = styled.div`
    text-align: center;
  margin-bottom: 80px;
  max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  padding: 0 20px;
  position: relative;
`;

const SpeakersTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #156e3a;
  margin: 0;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #1a8f4c, #FFD700);
    margin: 20px auto 0;
  }
`;

const SpeakersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const SpeakersTrack = styled(motion.div)`
  display: flex;
  gap: 30px;
  padding: 20px 0;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #1a8f4c;
  
  &:hover {
    background: #1a8f4c;
    color: white;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #e0e0e0;
  }

  &.prev {
    left: -25px;
  }

  &.next {
    right: -25px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &.prev {
      left: -10px;
    }

    &.next {
      right: -10px;
    }
  }
`;

const SpeakerCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  flex: 0 0 280px;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SpeakerImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.7) 85%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SpeakerInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  color: white;
  z-index: 1;
`;

const SpeakerName = styled.h3`
  font-size: 2rem;
  margin: 0 0 5px 0;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const SpeakerTitle = styled.p`
  font-size: 1.1rem;
  margin: 0;
  color: #64f4ac;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProgramSection = styled.section`
  padding: clamp(40px, 6vw, 80px) 0;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const ProgramContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    gap: 30px;
  }
`;

const ProgramContent = styled.div`
  h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    color: #1a4332;
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif;

    @media (max-width: 768px) {
      font-size: clamp(1.5rem, 3vw, 2rem);
    }
  }

  p {
    color: #475569;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    line-height: 1.7;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 20px;
    }
  }
`;

const ProgramFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 25px;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1a4332;
  font-weight: 500;
  font-size: clamp(0.9rem, 1.5vw, 1rem);

  svg {
    width: 18px;
    height: 18px;
    color: #1a8f4c;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const FlyerContainer = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  aspect-ratio: 3/4;
  background: #f8fafc;

  @media (max-width: 768px) {
    max-width: 300px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  img {
  width: 100%;
  height: 100%;
  object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProgramButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: #1a8f4c;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
  }
  
  &:hover {
    background: #156e3a;
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const QuickActionsSection = styled.section`
  background: #1a8f4c;
  padding: 12px 0;
  position: relative;
  z-index: 10;
  margin-top: -40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    margin-top: -25px;
    padding: 8px 0;
  }
`;

const QuickActionsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const heartbeat = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(26, 143, 76, 0.4);
  }
  25% {
    transform: scale(1.1);
    box-shadow: 0 0 0 15px rgba(26, 143, 76, 0);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(26, 143, 76, 0);
  }
  75% {
    transform: scale(1.1);
    box-shadow: 0 0 0 15px rgba(26, 143, 76, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(26, 143, 76, 0);
  }
`;

const ActionIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0;
  }
`;

const ActionTitle = styled.h3`
  font-size: 0.9rem;
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
  color: #1a8f4c;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const QuickActionButton = styled(Link)`
  background: white;
  border: none;
  color: #1a8f4c;
  padding: 12px 8px;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: #FFD700;
    color: #1a4332;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

    ${ActionTitle} {
      color: #1a4332;
    }
  }
  
  @media (max-width: 768px) {
    padding: 8px;
    gap: 3px;
  }

  &.ticket-button {
    background: white;
    animation: ${heartbeat} 1.5s ease-in-out infinite;

    &:hover {
      animation-play-state: paused;
      background: #FFD700;
    }

    ${ActionIcon} {
      font-size: 1.7rem;
      
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }
`;

const Home = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const navigate = useNavigate();
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const speakersContainerRef = useRef(null);

  // Refs for scroll animations
  const timerSectionRef = useRef(null);
  const speakersSectionRef = useRef(null);

  // useInView hooks
  const timerInView = useInView(timerSectionRef, { once: true, margin: "-100px" });
  const speakersInView = useInView(speakersSectionRef, { once: true, margin: "-100px" });

  const slides = [
    {
      image: hero1,
      title: "6th Annual",
      subtitle: "Nursing and Midwifery Leaders & Managers Conference"
    },
    {
      image: hero2,
      title: "5th Excellence",
      subtitle: "and Hall of Fame Awards"
    },
    {
      image: hero3,
      title: "Celebrating",
      subtitle: "Healthcare Leadership"
    },
    {
      image: hero4,
      title: "Recognizing",
      subtitle: "Nursing Excellence"
    }
  ];

  const imageIndex = Math.abs(page % slides.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 20000);

    return () => clearInterval(timer);
  }, [page]);

  useEffect(() => {
    // Set your event date here (Year, Month-1, Day, Hour, Minute)
    const eventDate = new Date(2025, 8, 2, 9, 0, 0); // September 2nd, 2025, 9:00 AM
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSpeaker = () => {
    if (currentSpeaker < speakers.length - 1) {
      setCurrentSpeaker(prev => prev + 1);
    }
  };

  const prevSpeaker = () => {
    if (currentSpeaker > 0) {
      setCurrentSpeaker(prev => prev - 1);
    }
  };

  return (
    <HomeContainer>
      <Header />
      <HeroSection>
        <AnimatePresence mode="wait">
          <SlideContainer
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroBackground backgroundImage={slides[imageIndex].image} />
            <HeroContent>
              <MainHeadingContainer>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GreenText>{slides[imageIndex].title}</GreenText>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <WhiteText>{slides[imageIndex].subtitle}</WhiteText>
                </motion.div>
              </MainHeadingContainer>

              <ButtonGroup
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {imageIndex === 0 && (
                  <>
                    <PrimaryButton to="/tickets">
                      Register Now
                    </PrimaryButton>
                    <SecondaryButton to="/conference-details">
                      Conference Details
                    </SecondaryButton>
                  </>
                )}
                {imageIndex === 1 && (
                  <>
                    <PrimaryButton to="/nominate">
                      Nominate Now
                    </PrimaryButton>
                    <SecondaryButton to="/awards-criteria">
                      Awards Criteria
                    </SecondaryButton>
                  </>
                )}
                {imageIndex === 2 && (
                  <>
                    <PrimaryButton to="/speakers">
                      Meet Our Speakers
                    </PrimaryButton>
                    <SecondaryButton to="/schedule">
                      View Schedule
                    </SecondaryButton>
                  </>
                )}
                {imageIndex === 3 && (
                  <>
                    <PrimaryButton to="/registration">
                      Join Us
                    </PrimaryButton>
                    <SecondaryButton to="/about">
                      Learn More
                    </SecondaryButton>
                  </>
                )}
              </ButtonGroup>
            </HeroContent>
          </SlideContainer>
        </AnimatePresence>

        <CarouselControls>
          {slides.map((_, index) => (
            <CarouselDot
              key={index}
              active={index === imageIndex}
              onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
            />
          ))}
        </CarouselControls>
      </HeroSection>
      
      <QuickActionsSection>
        <QuickActionsContainer>
          <QuickActionButton to="/tickets" className="ticket-button">
            <ActionIcon>🎟️</ActionIcon>
            <ActionTitle>Buy Tickets</ActionTitle>
          </QuickActionButton>
          
          <QuickActionButton to="/nomination">
            <ActionIcon>🏆</ActionIcon>
            <ActionTitle>Nominate</ActionTitle>
          </QuickActionButton>
          
          <QuickActionButton to="/nomination-rules">
            <ActionIcon>📋</ActionIcon>
            <ActionTitle>Guidelines</ActionTitle>
          </QuickActionButton>

          <QuickActionButton to="/gallery">
            <ActionIcon>📸</ActionIcon>
            <ActionTitle>Gallery</ActionTitle>
          </QuickActionButton>
        </QuickActionsContainer>
      </QuickActionsSection>
      
      <EventTimerSection
        ref={timerSectionRef}
        as={motion.section}
        initial="hidden"
        animate={timerInView ? "visible" : "hidden"}
        variants={scrollStaggerVariant}
      >
        <SectionContainer
          variants={scrollFadeInVariant}
        >
          <motion.div variants={scrollFadeInVariant}>
            <TimerTitle>Nursing Excellence Conference 2025</TimerTitle>
            <TimerSubtitle>
              Join us from September 2nd - 5th, 2025 for four days of excellence in nursing leadership
            </TimerSubtitle>
          </motion.div>
          
          <motion.div variants={scrollFadeInVariant}>
            <TimerSubtitle>
              Countdown to Day 1
            </TimerSubtitle>
          </motion.div>
            
            <CountdownContainer>
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.5
                    }
                  }
                }}
              >
              <CountdownBox>
                  <CountdownNumber>{value}</CountdownNumber>
                  <CountdownLabel>{unit.charAt(0).toUpperCase() + unit.slice(1)}</CountdownLabel>
              </CountdownBox>
              </motion.div>
            ))}
            </CountdownContainer>
            
          <motion.div 
            variants={scrollFadeInVariant}
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            <PrimaryButton 
              to="/tickets" 
              style={{ 
                background: '#ffffff', 
                color: '#1a8f4c',
                minWidth: '250px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}
            >
              Reserve Your Spot Now
            </PrimaryButton>
          </motion.div>
        </SectionContainer>
        </EventTimerSection>
        
      <SpeakersSection
        ref={speakersSectionRef}
        as={motion.section}
        initial="hidden"
        animate={speakersInView ? "visible" : "hidden"}
        variants={scrollStaggerVariant}
      >
        <SpeakersHeader>
          <motion.div variants={scrollFadeInVariant}>
            <SpeakersTitle>Featured Speakers</SpeakersTitle>
          </motion.div>
        </SpeakersHeader>

        <SpeakersContainer ref={speakersContainerRef}>
          <NavigationButton 
            className="prev" 
            onClick={prevSpeaker}
            disabled={currentSpeaker === 0}
          >
            ←
          </NavigationButton>
          
          <NavigationButton 
            className="next" 
            onClick={nextSpeaker}
            disabled={currentSpeaker === speakers.length - 1}
          >
            →
          </NavigationButton>

          <SpeakersTrack
            animate={{
              x: currentSpeaker * -310 // 280px card width + 30px gap
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {speakers.map((speaker, index) => (
              <SpeakerCard key={speaker.name}>
                <SpeakerImage image={speaker.image} />
                <SpeakerInfo>
                  <SpeakerName>{speaker.name}</SpeakerName>
                  <SpeakerTitle>{speaker.title}</SpeakerTitle>
                </SpeakerInfo>
              </SpeakerCard>
            ))}
          </SpeakersTrack>
        </SpeakersContainer>
      </SpeakersSection>
        
      <ProgramSection>
        <ProgramContainer>
          <ProgramContent>
            <motion.div
              initial="hidden"
              whileInView="visible"
      viewport={{ once: true }}
              variants={scrollFadeInVariant}
            >
              <h2>6th Annual Nursing and Midwifery Leaders & Managers Conference & 5th Excellence and Hall of Fame Awards</h2>
              <p>
                Join us for this prestigious four-day event from September 2nd - 5th, 2025, that brings together nursing and midwifery leaders 
                to celebrate excellence in healthcare leadership. This dual event combines our annual 
                conference with the recognition of outstanding achievements in nursing and midwifery.
              </p>
              <ProgramFeatures>
                <Feature>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                  </svg>
                  <span>Leadership Conference</span>
                </Feature>
                <Feature>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                  </svg>
                  <span>Excellence Awards</span>
                </Feature>
                <Feature>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                  </svg>
                  <span>Networking Events</span>
                </Feature>
                <Feature>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                  </svg>
                  <span>Hall of Fame</span>
                </Feature>
              </ProgramFeatures>
              <ProgramButton to="/conference-and-awards">
                Learn More
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 17L8.59 15.59L13.17 11H3V9H13.17L8.59 4.41L10 3L17 10L10 17Z"/>
                </svg>
              </ProgramButton>
            </motion.div>
          </ProgramContent>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeInVariant}
          >
            <FlyerContainer>
              <ConferenceFlyer />
            </FlyerContainer>
          </motion.div>
        </ProgramContainer>
      </ProgramSection>

      <EventCalendar />
      
      <TicketSection />
      <SponsorsSection />
      <NewsFeed />
    </HomeContainer>
  );
};

export default Home;