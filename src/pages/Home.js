import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import awardImage1 from '../assets/images/005A0006.JPG';
import awardImage2 from '../assets/images/005A0024.JPG';
import awardImage3 from '../assets/images/005A0041.JPG';
import awardImage4 from '../assets/images/005A0097.JPG';

const fadeInUp = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const HomeContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  height: 100vh;
  padding-top: 80px;
  position: relative;
`;

const CarouselSlide = styled.div`
  height: calc(100vh - 80px);
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(26, 143, 76, 0.3) 0%, rgba(21, 110, 58, 0.3) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 2;
  position: relative;
`;

const MainHeading = styled(motion.h1)`
  font-size: 4rem;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled(motion.p)`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 40px;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 15px 40px;
  font-size: 1.2rem;
  background-color: #1a8f4c; /* Changed from #f2381a to nurse green */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;

  &:hover {
    background-color: #156e3a; /* Darker nurse green */
    transform: translateY(-2px);
  }
`;

const CustomCarousel = styled(Carousel)`
  .carousel .slide {
    background: transparent;
  }
  
  .carousel .control-dots {
    bottom: 30px;
    z-index: 10;
  }
  
  .carousel .control-dots .dot {
    background: rgba(255, 255, 255, 0.5);
    width: 12px;
    height: 12px;
    margin: 0 8px;
    border-radius: 50%;
  }
  
  .carousel .control-dots .dot.selected {
    background: #1a8f4c; /* Changed from #f2381a to nurse green */
  }
  
  .carousel .control-arrow {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  
  .carousel .control-arrow:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  
  .carousel .control-arrow.control-prev {
    left: 20px;
  }
  
  .carousel .control-arrow.control-next {
    right: 20px;
  }
`;

// Event Timer Section Styles
const EventTimerSection = styled(motion.section)`
  background: linear-gradient(135deg, #156e3a 100%);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
    opacity: 0.3;
  }
`;

const TimerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const EventTitle = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EventSubtitle = styled.p`
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 50px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    gap: 15px;
    flex-wrap: wrap;
  }
`;

const CountdownBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 25px 20px;
  min-width: 120px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    min-width: 80px;
    padding: 20px 15px;
  }
`;

const CountdownNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CountdownLabel = styled.div`
  font-size: 0.9rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const EventButton = styled.button`
  padding: 18px 45px;
  font-size: 1.1rem;
  background-color: white;
  color: #1a8f4c; /* Changed to nurse green */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(26, 143, 76, 0.3); /* Changed shadow color */
  
  &:hover {
    background-color: #f9f9f9;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 143, 76, 0.4); /* Changed shadow color */
  }
  
  @media (max-width: 768px) {
    padding: 15px 35px;
    font-size: 1rem;
  }
`;

// Conference Description Section Styles
const ConferenceSection = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: 100px 0;
  position: relative;
`;

const ConferenceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ConferenceContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const ConferenceText = styled.div`
  color: #2c3e50;
`;

const ConferenceTitle = styled.h2`
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 700;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ConferenceDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 25px;
  color: #34495e;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ConferenceHighlights = styled.div`
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #1a8f4c; /* Changed from #f2381a to nurse green */
`;

const HighlightsTitle = styled.h3`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: 600;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HighlightItem = styled.li`
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 15px;
  padding-left: 25px;
  position: relative;
  line-height: 1.6;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #1a8f4c; /* Changed from #f2381a to nurse green */
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatBox = styled.div`
  text-align: center;
  background: white;
  padding: 25px 15px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a8f4c; /* Changed from #f2381a to nurse green */
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #34495e;
  font-weight: 500;
`;

const SpeakersSection = styled.section`
  background: #ffffff;
  padding: 100px 0;
`;

const SpeakersContainer = styled.div`
  padding: 60px 0;
  background-color: #f9f9f9;
  
  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #333;
  }
  
  .section-subtitle {
    text-align: center;
    font-size: 1rem;
    color: #777;
    margin-bottom: 50px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
`;

const SpeakerCard = styled.div`
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
`;

const SpeakerImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
`;

const SpeakerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${SpeakerCard}:hover & {
    transform: scale(1.05);
  }
`;

const SpeakerInfo = styled.div`
  padding: 25px 20px;
  text-align: center;
  border-top: 3px solid #1a8f4c; /* Changed from #f2381a to nurse green */
`;

const SpeakerName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
`;

const SpeakerTitle = styled.div`
  font-size: 0.9rem;
  color: #1a8f4c; /* Changed from #f2381a to nurse green */
  margin-bottom: 15px;
  font-weight: 500;
`;

const SpeakerBio = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SpeakerSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 15px;
`;

const SocialLink = styled.a`
  color: #666;
  font-size: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    background-color: #1a8f4c; /* Changed from #f2381a to nurse green */
  }
`;

const Home = () => {
  const heroSlides = [
    {
      title: "Neutek Nursing Services",
      subtitle: "Professional Healthcare Solutions for Your Needs",
      buttonText: "Get Started",
      backgroundImage: awardImage1,
      bgGradient: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(135deg, #1a8f4c 0%, #156e3a 100%)"
    },
    {
      title: "Excellence in Healthcare",
      subtitle: "Recognizing outstanding contributions in nursing and healthcare",
      buttonText: "Learn More",
      backgroundImage: awardImage2,
      bgGradient: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(135deg, #156e3a 0%, #1a8f4c 100%)"
    },
    {
      title: "Celebrating Healthcare Heroes",
      subtitle: "Honoring dedication and excellence in nursing practice",
      buttonText: "View Awards",
      backgroundImage: awardImage3,
      bgGradient: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(135deg, #1a8f4c 0%, #2ab06e 100%)"
    },
    {
      title: "Healthcare Innovation Awards",
      subtitle: "Recognizing excellence and innovation in healthcare delivery",
      buttonText: "Learn More",
      backgroundImage: awardImage4,
      bgGradient: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(135deg, #156e3a 0%, #1a8f4c 100%)"
    }
  ];

  const speakers = [
    {
      name: "Dr. Sarah Johnson",
      title: "Chief of Nursing Innovation",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&size=400&background=random",
      bio: "Dr. Johnson leads groundbreaking research in patient care methodologies and has over 15 years of experience in emergency medicine.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Prof. Michael Chen",
      title: "Director of Healthcare Technology",
      image: "https://ui-avatars.com/api/?name=Michael+Chen&size=400&background=random",
      bio: "A pioneer in healthcare technology integration, Prof. Chen specializes in implementing AI-driven solutions in nursing practices.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Emily Rodriguez",
      title: "Head of Patient Care Innovation",
      image: "https://ui-avatars.com/api/?name=Emily+Rodriguez&size=400&background=random",
      bio: "With expertise in patient-centered care models, Dr. Rodriguez has transformed nursing protocols across multiple healthcare systems.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. James Wilson",
      title: "Healthcare Policy Advisor",
      image: "https://ui-avatars.com/api/?name=James+Wilson&size=400&background=random",
      bio: "A respected voice in healthcare policy, Dr. Wilson bridges the gap between clinical practice and regulatory frameworks.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  // Event countdown logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set your event date here (Year, Month-1, Day, Hour, Minute)
    const eventDate = new Date(2024, 11, 25, 10, 0, 0); // December 25, 2024, 10:00 AM
    
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

  return (
    <>
      <Header />
      <HomeContainer>
        <HeroSection>
          <CustomCarousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            swipeable
            emulateTouch
            stopOnHover
          >
            {heroSlides.map((slide, index) => (
              <div key={index}>
                <CarouselSlide 
          key={index}
          backgroundImage={slide.backgroundImage}
          bgGradient={slide.bgGradient}
        >
                  <HeroContent
                    key={index}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <MainHeading variants={fadeInUp}>
                      {slide.title}
                    </MainHeading>
                    <SubHeading 
                      variants={fadeInUp}
                      transition={{ delay: 0.2 }}>
                      {slide.subtitle}
                    </SubHeading>
                    <CTAButton 
                      variants={fadeInUp}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {slide.buttonText}
                    </CTAButton>
                  </HeroContent>
                </CarouselSlide>
              </div>
            ))}
          </CustomCarousel>
        </HeroSection>
        
        {/* Event Timer Section */}
        <EventTimerSection
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <TimerContainer>
            <EventTitle>Annual Healthcare Conference 2024</EventTitle>
            <EventSubtitle>Join us for the most comprehensive nursing and healthcare event of the year</EventSubtitle>
            
            <CountdownContainer>
              <CountdownBox>
                <CountdownNumber>{timeLeft.days}</CountdownNumber>
                <CountdownLabel>Days</CountdownLabel>
              </CountdownBox>
              <CountdownBox>
                <CountdownNumber>{timeLeft.hours}</CountdownNumber>
                <CountdownLabel>Hours</CountdownLabel>
              </CountdownBox>
              <CountdownBox>
                <CountdownNumber>{timeLeft.minutes}</CountdownNumber>
                <CountdownLabel>Minutes</CountdownLabel>
              </CountdownBox>
              <CountdownBox>
                <CountdownNumber>{timeLeft.seconds}</CountdownNumber>
                <CountdownLabel>Seconds</CountdownLabel>
              </CountdownBox>
            </CountdownContainer>
            
            <EventButton>Register Now</EventButton>
          </TimerContainer>
        </EventTimerSection>
        
        {/* Conference Description Section */}
        <ConferenceSection>
          <ConferenceContainer>
            <ConferenceContent>
              <ConferenceText>
                <ConferenceTitle>About the Conference</ConferenceTitle>
                <ConferenceDescription>
                  Since 2015, the Annual Healthcare Conference has been the premier gathering for nursing professionals, healthcare administrators, and medical innovators. What started as a small regional meeting has grown into the largest healthcare symposium in the region.
                </ConferenceDescription>
                <ConferenceDescription>
                  Our mission is to advance healthcare excellence through education, networking, and the sharing of best practices. Each year, we bring together thought leaders, researchers, and practitioners to explore the latest developments in patient care, medical technology, and healthcare management.
                </ConferenceDescription>
                <ConferenceDescription>
                  This year's theme, "Innovation in Patient Care," reflects our commitment to embracing new technologies and methodologies that improve patient outcomes and enhance the healthcare experience.
                </ConferenceDescription>
                
                <StatsContainer>
                  <StatBox>
                    <StatNumber>2,500+</StatNumber>
                    <StatLabel>Attendees</StatLabel>
                  </StatBox>
                  <StatBox>
                    <StatNumber>150+</StatNumber>
                    <StatLabel>Speakers</StatLabel>
                  </StatBox>
                  <StatBox>
                    <StatNumber>50+</StatNumber>
                    <StatLabel>Sessions</StatLabel>
                  </StatBox>
                </StatsContainer>
              </ConferenceText>
              
              <ConferenceHighlights>
                <HighlightsTitle>What to Expect</HighlightsTitle>
                <HighlightsList>
                  <HighlightItem>Keynote presentations from industry leaders and healthcare innovators</HighlightItem>
                  <HighlightItem>Interactive workshops on the latest nursing techniques and technologies</HighlightItem>
                  <HighlightItem>Panel discussions on healthcare policy and future trends</HighlightItem>
                  <HighlightItem>Networking opportunities with professionals from across the healthcare spectrum</HighlightItem>
                  <HighlightItem>Exhibition showcasing cutting-edge medical equipment and solutions</HighlightItem>
                  <HighlightItem>Continuing education credits for nursing and healthcare professionals</HighlightItem>
                  <HighlightItem>Awards ceremony recognizing excellence in patient care and innovation</HighlightItem>
                  <HighlightItem>Special sessions on mental health, patient safety, and quality improvement</HighlightItem>
                </HighlightsList>
              </ConferenceHighlights>
            </ConferenceContent>
          </ConferenceContainer>
        </ConferenceSection>
        
        {/* Speakers Section */}
        <SpeakersSection>
          <SpeakersContainer>
            <h2>Our Featured Speakers</h2>
            <p className="section-subtitle">Meet our industry experts and thought leaders who will share their knowledge and insights</p>
            <SpeakersGrid>
              {speakers.map((speaker, index) => (
                <SpeakerCard key={index}>
                  <SpeakerImageContainer>
                    <SpeakerImage src={speaker.image} alt={speaker.name} />
                  </SpeakerImageContainer>
                  <SpeakerInfo>
                    <SpeakerName>{speaker.name}</SpeakerName>
                    <SpeakerTitle>{speaker.title}</SpeakerTitle>
                    <SpeakerBio>{speaker.bio}</SpeakerBio>
                    <SpeakerSocial>
                      <SocialLink href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </SocialLink>
                      <SocialLink href={speaker.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                      </SocialLink>
                    </SpeakerSocial>
                  </SpeakerInfo>
                </SpeakerCard>
              ))}
            </SpeakersGrid>
          </SpeakersContainer>
        </SpeakersSection>
        
        {/* Blog Section */}
        <BlogSection>
          <BlogContainer>
            <h2>Latest Updates</h2>
            <p className="section-subtitle">Stay connected with our latest news, events, and social media activities</p>
            
            <BlogGrid>
              {blogPosts.map((post, index) => (
                <BlogCard key={index}>
                  <BlogImageContainer>
                    <BlogImage src={post.image} alt={post.title} />
                    <BlogCategory>{post.category}</BlogCategory>
                  </BlogImageContainer>
                  <BlogContent>
                    <BlogDate>{post.date}</BlogDate>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                    <BlogFooter>
                      <BlogReadMore href={post.link}>Read More</BlogReadMore>
                      <BlogSocialShare>
                        <SocialShareButton href={`https://www.facebook.com/sharer/sharer.php?u=${post.link}`} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-facebook-f"></i>
                        </SocialShareButton>
                        <SocialShareButton href={`https://twitter.com/intent/tweet?url=${post.link}&text=${post.title}`} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-twitter"></i>
                        </SocialShareButton>
                        <SocialShareButton href={`https://www.linkedin.com/shareArticle?mini=true&url=${post.link}&title=${post.title}`} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin-in"></i>
                        </SocialShareButton>
                      </BlogSocialShare>
                    </BlogFooter>
                  </BlogContent>
                </BlogCard>
              ))}
            </BlogGrid>
          </BlogContainer>
        </BlogSection>
        
        {/* Sponsors Section */}
        <SponsorsSection>
          <SponsorsContainer>
            <h2>Our Sponsors</h2>
            <p className="section-subtitle">We're proud to partner with these leading organizations</p>
            
            <SponsorsGrid>
              {sponsors.map((sponsor, index) => (
                <SponsorLink key={index} href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <SponsorLogo src={sponsor.logo} alt={sponsor.name} />
                </SponsorLink>
              ))}
            </SponsorsGrid>
          </SponsorsContainer>
    </SponsorsSection>

    <MediaSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <MediaContainer>
        <MediaTitle>Last Year's Event Highlights</MediaTitle>
        <MediaSubtitle>Relive the memorable moments from our previous healthcare excellence celebration</MediaSubtitle>
        
        <MediaGrid>
          <MediaCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <MediaImage src={awardImage1} alt="Opening Ceremony" />
            <MediaOverlay>
              <MediaCaption>Opening Ceremony</MediaCaption>
              <MediaDate>December 2023</MediaDate>
            </MediaOverlay>
          </MediaCard>

          <MediaCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <MediaImage src={awardImage2} alt="Award Presentation" />
            <MediaOverlay>
              <MediaCaption>Award Presentation</MediaCaption>
              <MediaDate>December 2023</MediaDate>
            </MediaOverlay>
          </MediaCard>

          <MediaCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MediaImage src={awardImage3} alt="Keynote Speech" />
            <MediaOverlay>
              <MediaCaption>Keynote Speech</MediaCaption>
              <MediaDate>December 2023</MediaDate>
            </MediaOverlay>
          </MediaCard>

          <MediaCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <MediaImage src={awardImage4} alt="Networking Session" />
            <MediaOverlay>
              <MediaCaption>Networking Session</MediaCaption>
              <MediaDate>December 2023</MediaDate>
            </MediaOverlay>
          </MediaCard>
        </MediaGrid>
      </MediaContainer>
    </MediaSection>
  </HomeContainer>
</>
  );
};



// Add these styled components above the Home component
const BlogSection = styled.section`
  background: #ffffff;
  padding: 100px 0;
`;

const BlogContainer = styled.div`
  padding: 60px 0;
  background-color: #f9f9f9;
  
  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #333;
  }
  
  .section-subtitle {
    text-align: center;
    font-size: 1rem;
    color: #777;
    margin-bottom: 50px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
`;

const BlogImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogCategory = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #1a8f4c;
  color: white;
  padding: 5px 10px;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
`;

const BlogContent = styled.div`
  padding: 25px 20px;
`;

const BlogDate = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 10px;
`;

const BlogTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const BlogReadMore = styled.a`
  font-size: 0.9rem;
  color: #1a8f4c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #156e3a;
    text-decoration: underline;
  }
`;

const BlogSocialShare = styled.div`
  display: flex;
  gap: 8px;
`;

const SocialShareButton = styled.a`
  color: #666;
  font-size: 0.9rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    background-color: #1a8f4c;
  }
`;

const MediaSection = styled(motion.section)`
  background: #f9f9f9;
  padding: 100px 0;
`;

const MediaContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MediaTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

const MediaSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const MediaCard = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MediaOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

const MediaCaption = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const MediaDate = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const SponsorsSection = styled.section`
  background: #ffffff;
  padding: 80px 0;
`;

const SponsorsContainer = styled.div`
  padding: 50px 0;
  background-color: #f9f9f9;
  
  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #333;
  }
  
  .section-subtitle {
    text-align: center;
    font-size: 1rem;
    color: #777;
    margin-bottom: 50px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const SponsorsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SponsorLink = styled.a`
  display: block;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SponsorLogo = styled.img`
  height: 60px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: filter 0.3s ease, opacity 0.3s ease;
  
  ${SponsorLink}:hover & {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

// Add this sample data above the Home component
const blogPosts = [
  {
    title: "Latest Advancements in Nursing Technology",
    excerpt: "Discover how cutting-edge technology is transforming patient care and improving outcomes in modern nursing practice.",
    date: "June 15, 2023",
    category: "Technology",
    image: "https://placehold.co/600x400/1a8f4c/FFF?text=Nursing+Tech",
    link: "#"
  },
  {
    title: "Self-Care Strategies for Healthcare Professionals",
    excerpt: "Learn essential self-care practices to maintain your wellbeing while providing care for others in demanding healthcare environments.",
    date: "June 10, 2023",
    category: "Wellness",
    image: "https://placehold.co/600x400/1a8f4c/FFF?text=Self+Care",
    link: "#"
  },
  {
    title: "Upcoming Nursing Conference: What to Expect",
    excerpt: "Get a preview of our annual nursing conference, featuring keynote speakers, workshops, and networking opportunities.",
    date: "June 5, 2023",
    category: "Events",
    image: "https://placehold.co/600x400/1a8f4c/FFF?text=Conference",
    link: "#"
  }
];

const sponsors = [
  {
    name: "MediTech Solutions",
    logo: "https://placehold.co/300x150/FFFFFF/333333?text=MediTech",
    website: "https://example.com/meditech"
  },
  {
    name: "HealthCare Partners",
    logo: "https://placehold.co/300x150/FFFFFF/333333?text=HealthCare",
    website: "https://example.com/healthcare"
  },
  {
    name: "NurseLink International",
    logo: "https://placehold.co/300x150/FFFFFF/333333?text=NurseLink",
    website: "https://example.com/nurselink"
  },
  {
    name: "MedSupply Pro",
    logo: "https://placehold.co/300x150/FFFFFF/333333?text=MedSupply",
    website: "https://example.com/medsupply"
  },
  {
    name: "Global Health Initiative",
    logo: "https://placehold.co/300x150/FFFFFF/333333?text=GlobalHealth",
    website: "https://example.com/globalhealth"
  }
];

// Event Schedule Section
const ScheduleSection = styled.section`
  padding: var(--spacing-xl) 0;
  background-color: var(--white);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, var(--primary-color) 10%, transparent 70%);
    opacity: 0.1;
    border-radius: 50%;
    transform: translate(150px, -150px);
  }
`;

const ScheduleContainer = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-sm);
`;

const ScheduleHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

const ScheduleTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 2.5rem);
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
`;

const ScheduleTimeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg) 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--primary-color);
    transform: translateX(-50%);
  }
`;

const TimelineEvent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  opacity: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin-bottom: var(--spacing-xl);
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const EventTime = styled.div`
  flex: 1;
  padding: var(--spacing-md);
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EventDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  margin: 0 var(--spacing-md);
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const EventContent = styled.div`
  flex: 1;
  padding: var(--spacing-md);
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Urgent Countdown Section
const UrgentCountdown = styled.section`
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
  padding: var(--spacing-lg) 0;
  color: var(--white);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before {
    top: -100px;
    left: -100px;
  }

  &::after {
    bottom: -100px;
    right: -100px;
  }
`;

const UrgentMessage = styled.h3`
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CountdownTimer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TimerUnit = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  min-width: 100px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  h4 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
  }
`;

export default Home;