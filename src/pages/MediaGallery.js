import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a8f4c;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Playfair Display', serif;
`;

const ComingSoonMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    color: #1a8f4c;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const MediaGallery = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Container>
          <Title>Media Gallery</Title>
          <ComingSoonMessage>
            <h2>Coming Soon!</h2>
            <p>
              Our media gallery is currently under construction. Check back soon to view photos
              and videos from our previous events and conferences.
            </p>
          </ComingSoonMessage>
        </Container>
      </PageContainer>
    </>
  );
};

export default MediaGallery; 