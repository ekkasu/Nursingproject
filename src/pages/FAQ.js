import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { usePullToRefresh, useOnlineStatus } from '../utils/mobileUtils';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 20px 60px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a8f4c;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 700;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #1a8f4c;
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const FAQContainer = styled.div`
  display: grid;
  gap: 20px;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Question = styled.button`
  width: 100%;
  text-align: left;
  padding: 20px 25px;
  background: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;

  &:hover {
    background: #f8f9fa;
  }

  span {
    margin-right: 15px;
  }
`;

const Answer = styled.div`
  padding: ${props => props.isOpen ? '0 25px 20px' : '0 25px'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  line-height: 1.6;
  color: #4a5568;
`;

const Icon = styled.span`
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const SearchContainer = styled.div`
  margin-bottom: 40px;
`;

const RefreshIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const OfflineIndicator = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for cleaner mobile appearance */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Improve touch scrolling */
  @media (max-width: 768px) {
    padding: 10px 0;
    margin: 0 -20px 20px;
    padding: 0 20px;
  }
`;

const CategoryTab = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? '#1a8f4c' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s ease;
  touch-action: manipulation;

  /* Larger touch target on mobile */
  @media (max-width: 768px) {
    padding: 14px 28px;
  }

  &:hover {
    background: ${props => props.active ? '#158f3d' : '#cbd5e0'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 25px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  -webkit-appearance: none;

  /* Larger touch target on mobile */
  @media (max-width: 768px) {
    padding: 16px 25px;
    font-size: 16px; /* Prevent iOS zoom on focus */
  }

  &:focus {
    outline: none;
    border-color: #1a8f4c;
    box-shadow: 0 0 0 3px rgba(26, 143, 76, 0.1);
  }
`;

const faqData = [
  {
    category: 'Registration',
    questions: [
      {
        q: "What are the registration fees and deadlines?",
        a: "Early Bird (Until March 1, 2025): $299\nStandard (Until May 1, 2025): $399\nLate Registration: $599\nAll fees include access to all conference sessions, materials, and networking events."
      },
      {
        q: "How can I modify my registration?",
        a: "You can modify your registration by logging into your account and visiting the 'My Registration' section. Changes can be made up to 2 weeks before the conference."
      },
      {
        q: "What's included in the registration fee?",
        a: "Registration includes access to all conference sessions, workshop materials, lunch and refreshments, networking events, and a certificate of attendance."
      }
    ]
  },
  {
    category: 'Accommodation',
    questions: [
      {
        q: "What accommodation options are available?",
        a: "We offer three types of rooms:\nStandard Room ($150/night)\nDeluxe Room ($250/night)\nExecutive Suite ($350/night)\nAll rooms include breakfast and WiFi."
      },
      {
        q: "Can I extend my stay before or after the conference?",
        a: "Yes, you can extend your stay at the conference rate for up to 3 days before and after the event, subject to availability."
      }
    ]
  },
  {
    category: 'Program',
    questions: [
      {
        q: "What is the conference schedule?",
        a: "The conference runs from July 15-17, 2025. Each day includes keynote sessions, breakout workshops, and networking events. A detailed schedule will be provided 1 month before the conference."
      },
      {
        q: "Are there CPD/CEU credits available?",
        a: "Yes, attendees can earn up to 20 CPD/CEU credits. Certificates will be provided after completing the conference evaluation."
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: "What if I forget my password?",
        a: "You can reset your password using the 'Forgot Password' link on the login page. A reset link will be sent to your registered email address."
      },
      {
        q: "How can I access the virtual components?",
        a: "Virtual components can be accessed through our conference portal using your registration credentials. A guide will be sent to all participants."
      }
    ]
  }
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState({});
  const isOnline = useOnlineStatus();

  const handleRefresh = useCallback(async () => {
    // Simulate refresh - replace with actual data fetching
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  const { handlers, refreshing } = usePullToRefresh(handleRefresh);

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFAQs = faqData.filter(category => {
    if (activeCategory !== 'All' && category.category !== activeCategory) return false;
    
    if (searchQuery) {
      return category.questions.some(
        q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
             q.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <>
      <Header />
      <PageContainer {...handlers}>
        <RefreshIndicator visible={refreshing}>
          <div className="ptr-spinner" />
        </RefreshIndicator>

        <ContentWrapper>
          <Title>Frequently Asked Questions</Title>

          {!isOnline && (
            <OfflineIndicator>
              You're offline. Some content may not be up to date.
            </OfflineIndicator>
          )}

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <CategoryTabs>
            <CategoryTab
              active={activeCategory === 'All'}
              onClick={() => setActiveCategory('All')}
            >
              All
            </CategoryTab>
            {faqData.map(category => (
              <CategoryTab
                key={category.category}
                active={activeCategory === category.category}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <FAQContainer>
            {filteredFAQs.map((category, categoryIndex) => (
              <React.Fragment key={category.category}>
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  return (
                    <FAQItem key={key}>
                      <Question
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      >
                        {faq.q}
                        <Icon isOpen={openQuestions[key]}>▼</Icon>
                      </Question>
                      <Answer isOpen={openQuestions[key]}>
                        {faq.a.split('\n').map((line, i) => (
                          <p key={i} style={{ marginBottom: i < faq.a.split('\n').length - 1 ? '10px' : '0' }}>
                            {line}
                          </p>
                        ))}
                      </Answer>
                    </FAQItem>
                  );
                })}
              </React.Fragment>
            ))}
          </FAQContainer>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default FAQ; 