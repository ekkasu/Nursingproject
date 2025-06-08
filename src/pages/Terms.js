import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: 120px 0 80px;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #1a8f4c;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
`;

const TermsContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const TermsContent = styled.div`
  color: #4a5568;
  font-size: 16px;
  line-height: 1.8;

  p {
    margin-bottom: 20px;
  }

  ul {
    padding-left: 25px;
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 12px;
  }

  strong {
    color: #2d3748;
  }
`;

const Terms = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Container>
          <SectionHeader>
            <Title>Terms and Conditions</Title>
          </SectionHeader>
          
          <TermsContainer>
            <TermsContent>
              <p>
                By registering for this conference and paying the registration fee, you're all set to join us! Please note that we've incurred costs to prepare for the event, and your payment is non-refundable.
              </p>
              
              <p><strong>Important Details:</strong></p>
              <ul>
                <li>Your Registration is complete only if you have done full payment of the conference fee of GHS 3,500</li>
                <li>All payments Must be done by 22nd August being the Deadline for Registration and Payment</li>
                <li>If you have fully paid and you're unable to attend, Kindly inform us one week before the deadline for 50% refund</li>
                <li>If you fully paid and unable to attend and you notify us after the deadline you will not qualify for any refund</li>
              </ul>
              
              <p>
                <strong>Note that</strong>, the GHS 3,500 conference is ONLY for the days lunch + snacks and souvenirs and the awards dinner. Accommodation is NOT included. You will be expected to make your own reservation based on the MoH recommended Hotel List.
              </p>
              
              <p>
                By registering, you confirm that you've read and agree to these terms. We're looking forward to seeing you at the conference!
              </p>
            </TermsContent>
          </TermsContainer>
        </Container>
      </PageContainer>
    </>
  );
};

export default Terms; 