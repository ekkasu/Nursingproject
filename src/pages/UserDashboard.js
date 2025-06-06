import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Styled components for dashboard
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
  padding: 120px 0 80px;
`;

const DashboardWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WelcomeSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WelcomeInfo = styled.div`
  flex: 1;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
  border: 3px solid #1a8f4c;
  margin-left: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 20px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ecf0f1;
`;

const NavMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 10px;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: ${props => props.active ? 'white' : '#2c3e50'};
  background: ${props => props.active ? '#1a8f4c' : 'transparent'};
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  
  &:hover {
    background: ${props => props.active ? '#1a8f4c' : '#f1f5f9'};
  }
  
  svg {
    margin-right: 10px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: ${props => props.color || '#f1f5f9'};
  border-radius: 10px;
  padding: 20px;
  color: ${props => props.textColor || '#2c3e50'};
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const UpcomingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

const EventDate = styled.div`
  background: #f1f5f9;
  min-width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const Month = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #7f8c8d;
`;

const Day = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventTitle = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const EventDetails = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const Button = styled.button`
  padding: 8px 15px;
  background: #1a8f4c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #156e3a;
  }
`;

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const BadgeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color || '#f1f5f9'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  
  svg {
    color: white;
    font-size: 25px;
  }
`;

const BadgeTitle = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ecf0f1;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${props => props.active ? '#1a8f4c' : '#7f8c8d'};
  border-bottom: 2px solid ${props => props.active ? '#1a8f4c' : 'transparent'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const DocumentIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  
  svg {
    color: #64748b;
  }
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.div`
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 2px;
`;

const DocumentMeta = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
`;

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('documents');
  
  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    role: 'Registered Nurse',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  };
  
  return (
    <>
      <Header />
      <DashboardContainer>
        <DashboardWrapper>
          <WelcomeSection>
            <WelcomeInfo>
              <WelcomeTitle>Welcome back, {user.name}!</WelcomeTitle>
              <WelcomeSubtitle>{user.role}</WelcomeSubtitle>
              <Button as={Link} to="/profile">Edit Profile</Button>
            </WelcomeInfo>
            <ProfileImage>
              <img src={user.profileImage} alt="Profile" />
            </ProfileImage>
          </WelcomeSection>
          
          <DashboardGrid>
            <Sidebar>
              <CardTitle>Dashboard Menu</CardTitle>
              <NavMenu>
                <NavItem>
                  <NavLink href="#" active={true}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    My Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Event Schedule
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    Resources
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    Support
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Logout
                  </NavLink>
                </NavItem>
              </NavMenu>
              
              <DashboardCard style={{ marginTop: '30px' }}>
                <CardTitle>Your Badges</CardTitle>
                <BadgeList>
                  <Badge>
                    <BadgeIcon color="#1a8f4c">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </BadgeIcon>
                    <BadgeTitle>Early Bird</BadgeTitle>
                  </Badge>
                  <Badge>
                    <BadgeIcon color="#FFD700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </BadgeIcon>
                    <BadgeTitle>Gold Member</BadgeTitle>
                  </Badge>
                  <Badge>
                    <BadgeIcon color="#1a8f4c">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    </BadgeIcon>
                    <BadgeTitle>Bookmarked</BadgeTitle>
                  </Badge>
                </BadgeList>
              </DashboardCard>
            </Sidebar>
            
            <MainContent>
              <DashboardCard>
                <CardTitle>Overview</CardTitle>
                <StatsGrid>
                  <StatCard color="#e2f5ea" textColor="#1a8f4c">
                    <StatValue>5</StatValue>
                    <StatLabel>Attended Events</StatLabel>
                  </StatCard>
                  <StatCard color="#fff8e1" textColor="#d4ac0d">
                    <StatValue>2</StatValue>
                    <StatLabel>Certificates</StatLabel>
                  </StatCard>
                  <StatCard color="#e2f5ea" textColor="#1a8f4c">
                    <StatValue>75%</StatValue>
                    <StatLabel>Profile Completion</StatLabel>
                  </StatCard>
                  <StatCard color="#fff8e1" textColor="#d4ac0d">
                    <StatValue>12</StatValue>
                    <StatLabel>CPD Points</StatLabel>
                  </StatCard>
                </StatsGrid>
              </DashboardCard>
              
              <DashboardCard>
                <CardTitle>Upcoming Events</CardTitle>
                <UpcomingItem>
                  <EventDate>
                    <Month>Jul</Month>
                    <Day>15</Day>
                  </EventDate>
                  <EventInfo>
                    <EventTitle>NMCON 2025 - VIP Session</EventTitle>
                    <EventDetails>9:00 AM - 11:00 AM • Online Webinar</EventDetails>
                  </EventInfo>
                  <Button>Join</Button>
                </UpcomingItem>
                <UpcomingItem>
                  <EventDate>
                    <Month>Aug</Month>
                    <Day>02</Day>
                  </EventDate>
                  <EventInfo>
                    <EventTitle>Nursing Leadership Workshop</EventTitle>
                    <EventDetails>1:00 PM - 4:00 PM • Main Conference Hall</EventDetails>
                  </EventInfo>
                  <Button>Details</Button>
                </UpcomingItem>
                <UpcomingItem>
                  <EventDate>
                    <Month>Sep</Month>
                    <Day>10</Day>
                  </EventDate>
                  <EventInfo>
                    <EventTitle>Healthcare Innovation Summit</EventTitle>
                    <EventDetails>10:00 AM - 5:00 PM • Convention Center</EventDetails>
                  </EventInfo>
                  <Button>RSVP</Button>
                </UpcomingItem>
              </DashboardCard>
              
              <DashboardCard>
                <CardTitle>Your Resources</CardTitle>
                <TabContainer>
                  <Tab 
                    active={activeTab === 'documents'} 
                    onClick={() => setActiveTab('documents')}
                  >
                    Documents
                  </Tab>
                  <Tab 
                    active={activeTab === 'certificates'} 
                    onClick={() => setActiveTab('certificates')}
                  >
                    Certificates
                  </Tab>
                  <Tab 
                    active={activeTab === 'courses'} 
                    onClick={() => setActiveTab('courses')}
                  >
                    Courses
                  </Tab>
                </TabContainer>
                
                {activeTab === 'documents' && (
                  <DocumentsList>
                    <DocumentItem>
                      <DocumentIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </DocumentIcon>
                      <DocumentInfo>
                        <DocumentTitle>Conference Handbook.pdf</DocumentTitle>
                        <DocumentMeta>1.2 MB • Uploaded July 1, 2025</DocumentMeta>
                      </DocumentInfo>
                      <Button>Download</Button>
                    </DocumentItem>
                    <DocumentItem>
                      <DocumentIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </DocumentIcon>
                      <DocumentInfo>
                        <DocumentTitle>Presentation Slides.pptx</DocumentTitle>
                        <DocumentMeta>3.5 MB • Uploaded June 28, 2025</DocumentMeta>
                      </DocumentInfo>
                      <Button>Download</Button>
                    </DocumentItem>
                    <DocumentItem>
                      <DocumentIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </DocumentIcon>
                      <DocumentInfo>
                        <DocumentTitle>Research Paper.docx</DocumentTitle>
                        <DocumentMeta>825 KB • Uploaded July 5, 2025</DocumentMeta>
                      </DocumentInfo>
                      <Button>Download</Button>
                    </DocumentItem>
                  </DocumentsList>
                )}
                
                {activeTab === 'certificates' && (
                  <div>
                    <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px 0' }}>
                      Your certificates will appear here after completion of events.
                    </p>
                  </div>
                )}
                
                {activeTab === 'courses' && (
                  <div>
                    <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px 0' }}>
                      You haven't enrolled in any courses yet.
                    </p>
                  </div>
                )}
              </DashboardCard>
            </MainContent>
          </DashboardGrid>
        </DashboardWrapper>
      </DashboardContainer>
    </>
  );
};

export default UserDashboard; 