import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NEWS, ARTICLES } from '../constants/text';

const SectionContainer = styled.section`
  padding: clamp(40px, 6vw, 80px) 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);

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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(20px, 3vw, 30px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const NewsCard = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    border-radius: 10px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const NewsHeader = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  color: white;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const NewsIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  border-radius: 50%;
`;

const NewsContent = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const NewsDate = styled.span`
  font-size: 0.9rem;
  color: #64748b;
  display: block;
  margin-bottom: 10px;
`;

const NewsTitle = styled.h3`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #1a4332;
  margin-bottom: 10px;
  line-height: 1.4;
  font-weight: 600;
`;

const NewsExcerpt = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: #475569;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1a8f4c;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #156e3a;

    svg {
      transform: translateX(5px);
    }
  }
`;

const NewsFeed = () => {
  const colors = ['#2563EB', '#1A8F4C', '#9333EA'];
  const icons = ['📰', '🎉', '🏆'];

  return (
    <SectionContainer>
      <Container>
        <SectionTitle>Latest Updates</SectionTitle>
        <SectionSubtitle>
          Stay informed about the latest news, announcements, and updates about NMCON 2025.
        </SectionSubtitle>
        <NewsGrid>
          {ARTICLES.map((item, index) => (
            <NewsCard
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewsHeader color={colors[index % colors.length]}>
                <NewsIcon>
                  {icons[index % icons.length]}
                </NewsIcon>
              </NewsHeader>
              <NewsContent>
                <NewsDate>{item.date}</NewsDate>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsExcerpt>{item.excerpt}</NewsExcerpt>
                <ReadMoreLink to={`/news/${item.id}`}>
                  Read More
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                  </svg>
                </ReadMoreLink>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </SectionContainer>
  );
};

export default NewsFeed; 