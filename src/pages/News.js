import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NEWS, ARTICLES } from '../constants/text';
import Header from '../components/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 80px 0;
`;

const HeroSection = styled.div`
  background: #1a4332;
  padding: 60px 0;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(230, 255, 110, 0.1);
  }

  &::before {
    top: -100px;
    left: -100px;
  }

  &::after {
    bottom: -50px;
    right: -50px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
  margin: 0;
  font-family: 'Playfair Display', serif;
  position: relative;
  z-index: 1;

  &::before {
    content: 'BLOG';
    display: block;
    font-size: 1rem;
    color: #e6ff6e;
    margin-bottom: 10px;
    letter-spacing: 4px;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? '#1a4332' : '#e2e8f0'};
  color: ${props => props.active ? '#ffffff' : '#475569'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#1a4332' : '#cbd5e1'};
    transform: translateY(-2px);
  }
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled(motion.article)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArticleHeader = styled.div`
  width: 100%;
  height: 220px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  padding: 20px;
  text-align: center;
`;

const ArticleContent = styled.div`
  padding: 25px;
`;

const ArticleMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const MetaItem = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ArticleTitle = styled.h3`
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0 0 15px 0;
  line-height: 1.4;
`;

const ArticleExcerpt = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ReadMore = styled.a`
  color: #1a4332;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(5px);
  }
`;

const News = () => {
  const [activeCategory, setActiveCategory] = useState(NEWS.CATEGORIES.ALL);
  const categories = Object.values(NEWS.CATEGORIES);
  
  const colors = ['#2563EB', '#1A8F4C', '#9333EA', '#EA580C', '#0891B2', '#4F46E5'];

  const articlesWithColors = ARTICLES.map((article, index) => ({
    ...article,
    color: colors[index % colors.length],
    icon: ['📰', '🎉', '🏆', '📊', '🎓', '🌟'][index % 6]
  }));

  const filteredArticles = activeCategory === NEWS.CATEGORIES.ALL
    ? articlesWithColors
    : articlesWithColors.filter(article => article.category === activeCategory);

  return (
    <PageContainer>
      <Header />
      <HeroSection>
        <Container>
          <PageTitle>{NEWS.SECTION_TITLE}</PageTitle>
        </Container>
      </HeroSection>

      <Container>
        <CategoryFilter>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </CategoryFilter>

        <ArticlesGrid>
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleHeader color={article.color}>
                {article.icon}
              </ArticleHeader>
              <ArticleContent>
                <ArticleMeta>
                  <MetaItem>{article.date}</MetaItem>
                  <MetaItem>{article.category}</MetaItem>
                </ArticleMeta>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                <ReadMore href={`/news/${article.id}`}>Read More</ReadMore>
              </ArticleContent>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </Container>
    </PageContainer>
  );
};

export default News; 