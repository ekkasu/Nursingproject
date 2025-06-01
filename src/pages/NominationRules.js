import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a8f4c;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #FFD700;
    margin: 15px auto 0;
  }
`;

const RulesSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding: 15px 0 15px 30px;
    border-bottom: 1px solid #e8f5ee;
    color: #34495e;
    font-size: 1.1rem;
    line-height: 1.6;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #1a8f4c;
      font-size: 1.5rem;
      line-height: 1.2;
    }
  }
`;

const ImportantNote = styled.div`
  background: linear-gradient(135deg, #1a8f4c10 0%, #FFD70010 100%);
  border-left: 4px solid #1a8f4c;
  padding: 20px;
  margin-top: 30px;
  border-radius: 0 10px 10px 0;

  p {
    color: #34495e;
    margin: 0;
    font-weight: 500;
  }
`;

const CategorySection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a8f4c;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
`;

const CategorySubtitle = styled.div`
  text-align: center;
  color: #FFD700;
  font-weight: 600;
  margin-bottom: 30px;
  font-size: 1.1rem;
  background: #1a8f4c;
  padding: 8px;
  border-radius: 5px;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const CriteriaHeader = styled.h3`
  color: #34495e;
  font-size: 1.2rem;
  margin: 20px 0;
  font-weight: 600;
`;

const CriteriaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding: 12px 0 12px 30px;
    border-bottom: 1px solid #e8f5ee;
    color: #34495e;
    font-size: 1.1rem;
    line-height: 1.6;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #1a8f4c;
      font-weight: bold;
    }
  }
`;

const AreaConditions = styled.div`
  background: linear-gradient(135deg, #1a8f4c10 0%, #FFD70010 100%);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;

  h4 {
    color: #1a8f4c;
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding: 8px 0 8px 25px;
      color: #34495e;
      font-size: 1.1rem;
      line-height: 1.5;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #FFD700;
        font-size: 1.5rem;
        line-height: 1;
      }
    }
  }
`;

const PrizesSection = styled.div`
  background: linear-gradient(135deg, #1a8f4c 0%, #156e3a 100%);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  color: white;
`;

const PrizesTitle = styled.h2`
  font-size: 2rem;
  color: #FFD700;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #FFD700;
    margin: 15px auto 0;
  }
`;

const PrizesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  li {
    position: relative;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &::before {
      content: '🏆';
      margin-right: 15px;
      font-size: 1.5rem;
    }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
  padding: 0 20px;
  position: sticky;
  bottom: 30px;
  z-index: 10;
`;

const NavButton = styled.button`
  background: ${props => props.disabled ? '#cccccc' : '#1a8f4c'};
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover:not(:disabled) {
    background: #156e3a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(26, 143, 76, 0.3);
  }

  &::before {
    content: ${props => props.prev ? '"←"' : 'none'};
  }

  &::after {
    content: ${props => props.next ? '"→"' : 'none'};
  }
`;

const SectionIndicator = styled.div`
  background: rgba(26, 143, 76, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  color: #1a8f4c;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NominationRules = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    { title: "General Rules", component: (
      <RulesSection>
        <RulesList>
          <li>Nominations start on 21st May, 2025 and the deadline for submissions is 30th June 2025</li>
          <li>The nominee must fulfill the requirements of the category nominated for</li>
          <li>You cannot nominate yourself</li>
          <li>A nominee cannot be nominated for a category where he/she has previously received an award</li>
          <li>Previous winners can be nominated into a different category</li>
          <li>Nominees can be in active service or retired</li>
          <li>You cannot nominate more than one person for one category. Double nominations for the same category will be rejected</li>
          <li>Nominees must be informed before being nominated and indicate their acceptance of the nomination</li>
          <li>Successful nominees will be communicated to and publicly acknowledged</li>
          <li>Supporting documents and evidence should be attached</li>
          <li>All submitted applications will undergo a review by a panel of experts after the nomination period to assess eligibility and alignment with the established criteria for the category</li>
          <li>Ten Highest Shortlisted nominees in line with all requirements will undergo interviews except the Regulation Category</li>
          <li>The final selection of winners in each category will be determined using the following weighted evaluation: 70% based on interview performance and 30% based on public voting</li>
          <li>Public voting via a short code applicable for all networks or through a web-based portal will attract a fee of GHC1</li>
          <li>Interviews and voting processes will be from July to August, 2025</li>
          <li>Winners will be invited to the 6th Nursing and Midwifery Leaders and Managers Conference to receive their awards</li>
        </RulesList>
        <ImportantNote>
          <p>Please ensure you have read and understood all rules and criteria before proceeding with any nomination. All nominations must comply with these guidelines to be considered valid.</p>
        </ImportantNote>
      </RulesSection>
    )},
    { title: "Clinical Excellence Award", component: (
      <CategorySection>
        <CategoryTitle>Category 1: Nursing and Midwifery Clinical Excellence Award</CategoryTitle>
        <CategorySubtitle>ONLY 5 AWARDS AVAILABLE</CategorySubtitle>
        <CriteriaHeader>An individual registered NURSE/MIDWIFE who:</CriteriaHeader>
        <CriteriaList>
          <li>Provides exemplary direct patient care and contributes to the advancement of nursing practice by demonstrating a commitment to personal leadership development and serving as an inspirational role model for others</li>
          <li>Contributed significantly to the advancement of professional nurses and midwives</li>
          <li>Improved the quality of direct patient care in his/her facility</li>
          <li>Recognized by peers for demonstrating professional behaviour in the provision of direct patient care</li>
          <li>Role model for compassion and exemplary practice</li>
          <li>Creates an environment that fosters care and compassion</li>
          <li>Creates an environment where attributes of trust, compassion, mutual respect, continued professional development and ethical behaviour are modelled and supported</li>
          <li>Is a mentor to staff</li>
          <li>Accessible, available and responsive to the needs of others, encouraging critical thinking and problem solving for individuals</li>
          <li>Promotes and enhances the image of nursing and midwifery within the organisation, community and the profession</li>
          <li>Demonstrates superior clinical nursing knowledge and expert skills for patient care</li>
          <li>Exhibits excellent customer service skills</li>
          <li>In good standing with the Nursing and Midwifery Council of Ghana</li>
        </CriteriaList>
      </CategorySection>
    )},
    { title: "Education & Research Excellence", component: (
      <CategorySection>
        <CategoryTitle>Category 2: Nursing and Midwifery Education and Research Excellence Award</CategoryTitle>
        <CategorySubtitle>ONLY 5 AWARDS AVAILABLE</CategorySubtitle>
        <CriteriaHeader>Criteria:</CriteriaHeader>
        <CriteriaList>
          <li>The nominee has made or is currently making contributions to the well-being and healthcare of patients through active participation in nursing and midwifery research</li>
          <li>Should have published at least two (2) papers in a recognized journal</li>
          <li>Involved in the process if conducting research independently or in collaboration with other disciplines</li>
          <li>Models professionalism via excellence as a mentor, educator and/or preceptor</li>
          <li>Demonstrates excellence through successful mentoring, education and/or preceptor relationship with others</li>
          <li>Demonstrates a passion for excellence and exemplifies integrity and fairness</li>
          <li>Inspires other healthcare professionals by using an optimistic approach for change and encourages the building of relationships that will challenge the learners' viewpoints</li>
          <li>Must be in good standing with the Nursing and Midwifery Council of Ghana</li>
        </CriteriaList>
      </CategorySection>
    )},
    { title: "Regulation & Ethics", component: (
      <CategorySection>
        <CategoryTitle>Category 3: Nursing and Midwifery Regulation and Ethics Award</CategoryTitle>
        <CategorySubtitle>ONLY 3 AWARDS AVAILABLE</CategorySubtitle>
        <CriteriaHeader>The nominee shall be someone who:</CriteriaHeader>
        <CriteriaList>
          <li>Promotes public policy related to the safety and effective practice of nursing and midwifery in the interest of public welfare</li>
          <li>Provides education, service and research through collaborative leadership to promote evidence-based regulatory excellence for patient safety and public protection</li>
          <li>Made an identifiable, significant contribution to the mission and vision of the Nursing and Midwifery Council consistently at all levels</li>
          <li>Has authentically demonstrated the promotion of the highest standards of nursing and midwifery ethics at national and international levels</li>
          <li>Must be in good standing with the Nursing and Midwifery Council of Ghana</li>
        </CriteriaList>
      </CategorySection>
    )},
    { title: "Leadership & Governance", component: (
      <CategorySection>
        <CategoryTitle>Category 4: Nursing and Midwifery Leadership and Governance Award</CategoryTitle>
        <CategorySubtitle>ONLY 5 AWARDS AVAILABLE</CategorySubtitle>
        <CriteriaHeader>The nominee must:</CriteriaHeader>
        <CriteriaList>
          <li>Possess extraordinary passion, creativity and dedication to the Nursing and Midwifery profession</li>
          <li>Be respected as a visionary, innovative leader and change agent</li>
          <li>Move the profession forward through work in patient care, administration, education or research via professional activities, endeavours and/or contributions</li>
          <li>Demonstrate significant contributions fostering the goals of the Professional Nursing and Midwifery Practice Model</li>
          <li>Have a positive attitude even in challenging situations</li>
          <li>Be a team player</li>
          <li>Act professionally- dedicated, maintains high standards, adaptable and flexible</li>
          <li>Be a role model – exhibits behaviours that others want to emulate, serves as an example for others and has a positive effect on all</li>
          <li>Be committed to learning – inquisitive with a thirst for knowledge and critical thinking</li>
          <li>Have contributed to policy development at national and international levels</li>
          <li>Is currently occupying or has occupied a management position at national, regional, district or agency levels eg. Director, Deputy Director, CNMO, Registrar, Nurse Manager at a facility</li>
          <li>Must be in good standing with the Nursing and Midwifery Council of Ghana</li>
        </CriteriaList>
      </CategorySection>
    )},
    { title: "Deprived Area Award", component: (
      <CategorySection>
        <CategoryTitle>Category 5: Deprived Area Award: Minister for Health Award</CategoryTitle>
        <AreaConditions>
          <h4>Deprived Area Conditions:</h4>
          <ul>
            <li>Rural or remote location with limited healthcare access</li>
            <li>Economically disadvantaged community</li>
            <li>Inadequate healthcare infrastructure and social amenities</li>
          </ul>
        </AreaConditions>
        <CriteriaHeader>Criteria:</CriteriaHeader>
        <CriteriaList>
          <li>Registered nurses or midwives practicing in Ghana</li>
          <li>Minimum 2 years of service in a designated deprived area</li>
          <li>Demonstrated impact on community health outcomes</li>
          <li>Innovative solutions to resource constraints</li>
          <li>Leadership in improving local healthcare delivery</li>
          <li>Community engagement and health education efforts</li>
          <li>Detailed description of nominee's work and achievements</li>
          <li>Supporting evidence (e.g., statistics, testimonials)</li>
          <li>In good standing with the Nursing and Midwifery council of Ghana</li>
        </CriteriaList>
      </CategorySection>
    )},
    { title: "Hall of Fame", component: (
      <CategorySection>
        <CategoryTitle>Category 6: Hall of Fame Awards</CategoryTitle>
        <CategorySubtitle>ONLY 3 AWARDS AVAILABLE</CategorySubtitle>
        <CriteriaHeader>Criteria:</CriteriaHeader>
        <CriteriaList>
          <li>Nominee may be living or deceased</li>
          <li>Outstanding contributions in each of the following areas:
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Distinguished service that spans an entire career as demonstrated by a strong commitment and active involvement in local, state, national, and/or international nursing and midwifery and other health-related organizations through elected office, committee service, contributions to program development and cited publications</li>
              <li>Exceptional leadership in nursing and midwifery practice, nursing and midwifery education, nursing and midwifery administration, or nursing and midwifery research that positively impacted the health and/or social/political history of Ghana and that have had an enduring value to nursing and midwifery</li>
              <li>Sustained commitment to mentoring as demonstrated by a commitment to guiding, supporting, and promoting the development of others</li>
              <li>Long-standing engagement in advocacy on behalf of the nursing and midwifery professions domestically and/or globally</li>
              <li>Future-oriented leader that has prepared for the evolution of the nursing and midwifery profession and nursing and midwifery practice by embracing technology, fostering innovation, developing partnerships, and encouraging collaboration across disciplines and settings</li>
            </ul>
          </li>
          <li>Must be in good standing with NMC</li>
        </CriteriaList>
      </CategorySection>
    )},
    { title: "Award Prizes", component: (
      <PrizesSection>
        <PrizesTitle>Award Prizes</PrizesTitle>
        <PrizesList>
          <li>Customized Crystal Glass Plague</li>
          <li>Congratulatory Sash</li>
          <li>1 day opportunity to participate in the Leaders and Managers Conference</li>
          <li>1 night Accommodation to participate in the Awards Night with your partner/relative</li>
          <li>Any other additional consolation prices that may be introduced</li>
        </PrizesList>
      </PrizesSection>
    )}
  ];

  const handlePrevious = () => {
    setCurrentSection(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSection(prev => Math.min(sections.length - 1, prev + 1));
  };

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>General Rules and Criteria for Nomination</PageTitle>
          
          {sections[currentSection].component}

          <NavigationButtons>
            <NavButton 
              onClick={handlePrevious} 
              disabled={currentSection === 0}
              prev
            >
              Previous Section
            </NavButton>
            
            <SectionIndicator>
              {sections[currentSection].title} ({currentSection + 1}/{sections.length})
            </SectionIndicator>

            <NavButton 
              onClick={handleNext} 
              disabled={currentSection === sections.length - 1}
              next
            >
              Next Section
            </NavButton>
          </NavigationButtons>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default NominationRules; 