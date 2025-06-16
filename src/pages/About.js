import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: rgba(26, 143, 76, 0.1);
`;

const HeroSection = styled.div`
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #1a8f4c 0%, #156e3a 100%);
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  width: 90%;
  max-width: 800px;

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h1 {
      margin-bottom: 15px;
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #1a8f4c;
  margin-bottom: 30px;
  text-align: left;
  font-family: 'Playfair Display', serif;
  position: relative;
  max-width: 800px;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: #FFD700;
    margin: 20px 0;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 50px;
  max-width: 800px;
`;

const Section = styled.section`
  margin-bottom: 60px;
  background: #ffffff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(26, 143, 76, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #1a8f4c;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(26, 143, 76, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(26, 143, 76, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a8f4c;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: #FFD700;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;

  li {
    padding-left: 25px;
    position: relative;
    margin-bottom: 15px;
    color: #333;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #1a8f4c;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin: 50px 0;
`;

const StatCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(26, 143, 76, 0.1);
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  color: #1a8f4c;
  margin-bottom: 10px;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: #666;
`;

const About = () => {
  return (
    <AboutContainer>
      <Header />
      <HeroSection>
        <HeroContent>
          <h1>About NMLMCON 2025</h1>
          <p>Celebrating Excellence in Nursing and Midwifery</p>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <Subtitle>
          The Nursing and Midwifery Leaders & Mangers Conference (NMLMCON) 2025 is Ghana's premier healthcare event, 
          bringing together the brightest minds in nursing and midwifery to celebrate excellence, 
          share knowledge, and shape the future of healthcare delivery.
        </Subtitle>

        <StatsGrid>
          <StatCard>
            <StatNumber>150+</StatNumber>
            <StatLabel>CEU Credits</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50+</StatNumber>
            <StatLabel>Expert Speakers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Attendees</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>30+</StatNumber>
            <StatLabel>Workshops</StatLabel>
          </StatCard>
        </StatsGrid>
      </ContentContainer>

      <ContentContainer>
        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <Text>
            NMLMCON 2025 is dedicated to advancing nursing and midwifery excellence through education,
            innovation, and collaboration. We bring together healthcare professionals
            from across Ghana and beyond to share knowledge, celebrate achievements,
            and shape the future of nursing and midwifery care.
          </Text>
        </Section>

        <Section>
          <SectionTitle>What We Offer</SectionTitle>
          <Grid>
            <Card>
              <CardTitle><span>🎓</span> Education</CardTitle>
              <List>
                <li>Expert-led workshops and seminars</li>
                <li>Hands-on training sessions</li>
                <li>Continuing education credits</li>
                <li>Latest research presentations</li>
              </List>
            </Card>
            <Card>
              <CardTitle><span>🤝</span> Networking</CardTitle>
              <List>
                <li>Professional networking events</li>
                <li>Mentorship opportunities</li>
                <li>Industry connections</li>
                <li>Career development resources</li>
              </List>
            </Card>
            <Card>
              <CardTitle><span>🏆</span> Recognition</CardTitle>
              <List>
                <li>Excellence awards ceremony</li>
                <li>Innovation showcases</li>
                <li>Research competitions</li>
                <li>Leadership recognition</li>
              </List>
            </Card>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Our Impact</SectionTitle>
          <Text>
            Since its inception, NMLMCON has been at the forefront of nursing and midwifery excellence,
            making significant contributions to healthcare education and practice in Ghana.
          </Text>
          <StatsGrid>
            <StatCard>
              <StatNumber>5000+</StatNumber>
              <Text>Healthcare Professionals Trained</Text>
            </StatCard>
            <StatCard>
              <StatNumber>200+</StatNumber>
              <Text>Expert Speakers</Text>
            </StatCard>
            <StatCard>
              <StatNumber>50+</StatNumber>
              <Text>Partner Organizations</Text>
            </StatCard>
            <StatCard>
              <StatNumber>100+</StatNumber>
              <Text>Research Papers Presented</Text>
            </StatCard>
          </StatsGrid>
        </Section>
      </ContentContainer>

      <ContentContainer>
        <Section>
          <SectionTitle>Conference Highlights</SectionTitle>
          <Text>
            Join us for four days of intensive learning, networking, and professional growth. 
            Our conference features keynote speeches from renowned healthcare leaders, 
            hands-on workshops, research presentations, and excellence awards ceremonies 
            celebrating the outstanding achievements in nursing and midwifery.
          </Text>
          <Text>
            The event will be held at the prestigious Accra Teaching Hospital, offering 
            state-of-the-art facilities and a conducive environment for learning and 
            collaboration. Don't miss this opportunity to be part of Ghana's largest 
            nursing and midwifery conference.
          </Text>
        </Section>
      </ContentContainer>
    </AboutContainer>
  );
};

export default About; 