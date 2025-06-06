import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components for dashboard
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
`;

const Sidebar = styled.div`
  width: 260px;
  background: #1a8f4c;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 25px 20px;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  span {
    color: #FFD700;
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const NavItem = styled.li`
  margin-bottom: 5px;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  background: ${props => props.active ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid ${props => props.active ? '#FFD700' : 'transparent'};
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: white;
  }
  
  svg {
    margin-right: 10px;
  }
`;

const MainContent = styled.div`
  margin-left: 260px;
  padding: 20px;
  width: calc(100% - 260px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: #1a8f4c;
    }
  }
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  
  .notification {
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    
    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #FFD700;
      color: #1a8f4c;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .user-info {
    .name {
      font-weight: 600;
      color: #2d3748;
    }
    
    .role {
      font-size: 0.8rem;
      color: #718096;
    }
  }
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #1a8f4c;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: ${props => props.color || '#e6fffa'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  
  svg {
    color: ${props => props.iconColor || '#1a8f4c'};
  }
`;

const StatInfo = styled.div`
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 5px;
  }
  
  .label {
    font-size: 0.9rem;
    color: #718096;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
  }
  
  th {
    background: #f7fafc;
    color: #1a8f4c;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  tr {
    border-bottom: 1px solid #edf2f7;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  tbody tr:hover {
    background: #f7fafc;
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#e2f5ea';
      case 'pending': return '#fff8e1';
      case 'inactive': return '#f9e9e8';
      default: return '#e2e8f0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#1a8f4c';
      case 'pending': return '#d4ac0d';
      case 'inactive': return '#e53e3e';
      default: return '#718096';
    }
  }};
`;

const Button = styled.button`
  padding: ${props => props.small ? '5px 10px' : '8px 15px'};
  background: ${props => props.secondary ? 'transparent' : '#1a8f4c'};
  color: ${props => props.secondary ? '#1a8f4c' : 'white'};
  border: ${props => props.secondary ? '1px solid #1a8f4c' : 'none'};
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.secondary ? '#e2f5ea' : '#156e3a'};
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Mock data
  const recentRegistrations = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', registrationType: 'VIP', date: '2023-07-10', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', registrationType: 'Digital Pass', date: '2023-07-09', status: 'pending' },
    { id: 3, name: 'Michael Johnson', email: 'michael.j@example.com', registrationType: 'VIP', date: '2023-07-08', status: 'active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@example.com', registrationType: 'Digital Pass', date: '2023-07-07', status: 'inactive' },
    { id: 5, name: 'Robert Brown', email: 'robert.b@example.com', registrationType: 'VIP', date: '2023-07-06', status: 'active' },
  ];
  
  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>NMCON <span>Admin</span></Logo>
        <NavMenu>
          <NavItem>
            <NavLink href="#" active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'users'} onClick={() => setActiveSection('users')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'events'} onClick={() => setActiveSection('events')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Events
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'content'} onClick={() => setActiveSection('content')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              Content
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'media'} onClick={() => setActiveSection('media')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Media
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'nominations'} onClick={() => setActiveSection('nominations')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Nominations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'payments'} onClick={() => setActiveSection('payments')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              Payments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'reports'} onClick={() => setActiveSection('reports')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              Reports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active={activeSection === 'settings'} onClick={() => setActiveSection('settings')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </NavLink>
          </NavItem>
        </NavMenu>
      </Sidebar>
      
      <MainContent>
        <Header>
          <SearchBar>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search..." />
          </SearchBar>
          
          <UserMenu>
            <div className="notification">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="badge">3</span>
            </div>
            
            <UserProfile>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" />
              <div className="user-info">
                <div className="name">Admin User</div>
                <div className="role">Super Admin</div>
              </div>
            </UserProfile>
          </UserMenu>
        </Header>
        
        {activeSection === 'dashboard' && (
          <>
            <PageTitle>Dashboard Overview</PageTitle>
            
            <Grid>
              <StatCard>
                <StatIcon color="#e2f5ea" iconColor="#1a8f4c">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </StatIcon>
                <StatInfo>
                  <div className="value">1,254</div>
                  <div className="label">Total Registrations</div>
                </StatInfo>
              </StatCard>
              
              <StatCard>
                <StatIcon color="#fff8e1" iconColor="#d4ac0d">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </StatIcon>
                <StatInfo>
                  <div className="value">352</div>
                  <div className="label">Nominations</div>
                </StatInfo>
              </StatCard>
              
              <StatCard>
                <StatIcon color="#e2f5ea" iconColor="#1a8f4c">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                </StatIcon>
                <StatInfo>
                  <div className="value">$45,290</div>
                  <div className="label">Total Revenue</div>
                </StatInfo>
              </StatCard>
              
              <StatCard>
                <StatIcon color="#fff8e1" iconColor="#d4ac0d">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </StatIcon>
                <StatInfo>
                  <div className="value">24</div>
                  <div className="label">Pending Issues</div>
                </StatInfo>
              </StatCard>
            </Grid>
            
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Recent Registrations</h2>
                <Button as={Link} to="/admin/registrations">View All</Button>
              </div>
              
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map(registration => (
                    <tr key={registration.id}>
                      <td>{registration.name}</td>
                      <td>{registration.email}</td>
                      <td>{registration.registrationType}</td>
                      <td>{registration.date}</td>
                      <td>
                        <Badge status={registration.status}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <FlexRow>
                          <Button small>View</Button>
                          <Button small secondary>Edit</Button>
                        </FlexRow>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </>
        )}
        
        {activeSection === 'users' && (
          <div>
            <PageTitle>User Management</PageTitle>
            <p>User management interface will be displayed here.</p>
          </div>
        )}
        
        {activeSection === 'nominations' && (
          <div>
            <PageTitle>Nominations</PageTitle>
            <p>Nominations management interface will be displayed here.</p>
          </div>
        )}
        
        {activeSection === 'events' && (
          <div>
            <PageTitle>Event Management</PageTitle>
            
            <Card style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Upcoming Events</h2>
                <Button>+ Create New Event</Button>
              </div>
              
              <Table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Registrations</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nursing Leadership Summit</td>
                    <td>Sep 15, 2023</td>
                    <td>Grand Hall</td>
                    <td>142/200</td>
                    <td><Badge status="active">Upcoming</Badge></td>
                    <td>
                      <FlexRow>
                        <Button small>Edit</Button>
                        <Button small secondary>View</Button>
                      </FlexRow>
                    </td>
                  </tr>
                  <tr>
                    <td>Clinical Practice Workshop</td>
                    <td>Oct 10, 2023</td>
                    <td>Conference Room B</td>
                    <td>32/50</td>
                    <td><Badge status="active">Upcoming</Badge></td>
                    <td>
                      <FlexRow>
                        <Button small>Edit</Button>
                        <Button small secondary>View</Button>
                      </FlexRow>
                    </td>
                  </tr>
                  <tr>
                    <td>Nursing Ethics Seminar</td>
                    <td>Oct 25, 2023</td>
                    <td>Online</td>
                    <td>198/500</td>
                    <td><Badge status="pending">Draft</Badge></td>
                    <td>
                      <FlexRow>
                        <Button small>Edit</Button>
                        <Button small secondary>Preview</Button>
                      </FlexRow>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
            
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Create/Edit Event</h2>
                <div>
                  <Button style={{ marginRight: '10px' }}>Save as Draft</Button>
                  <Button>Publish Event</Button>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>
                    Event Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter event name" 
                    style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>
                    Event Category
                  </label>
                  <select style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: '1px solid #e2e8f0' }}>
                    <option>Conference</option>
                    <option>Workshop</option>
                    <option>Seminar</option>
                    <option>Webinar</option>
                    <option>Training</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>
                    Start Date & Time
                  </label>
                  <input 
                    type="datetime-local" 
                    style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>
                    End Date & Time
                  </label>
                  <input 
                    type="datetime-local" 
                    style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>
                  Event Description
                </label>
                <textarea 
                  placeholder="Enter event description" 
                  rows="5" 
                  style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: '1px solid #e2e8f0', resize: 'vertical' }} 
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4a5568' }}>
                  Event Image
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '150px', 
                    height: '100px', 
                    background: '#f1f5f9', 
                    borderRadius: '5px',
                    marginRight: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                  <Button>Choose Image</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {activeSection === 'payments' && (
          <div>
            <PageTitle>Payment Records</PageTitle>
            <p>Payment management interface will be displayed here.</p>
          </div>
        )}
        
        {activeSection === 'reports' && (
          <div>
            <PageTitle>Reports & Analytics</PageTitle>
            <p>Reporting interface will be displayed here.</p>
          </div>
        )}
        
        {activeSection === 'settings' && (
          <div>
            <PageTitle>System Settings</PageTitle>
            <p>Settings interface will be displayed here.</p>
          </div>
        )}

        {activeSection === 'content' && (
          <div>
            <PageTitle>Content Management</PageTitle>
            
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Website Pages</h2>
                <Button>Create New Page</Button>
              </div>
              
              <Table>
                <thead>
                  <tr>
                    <th>Page Title</th>
                    <th>URL</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Home Page</td>
                    <td>/</td>
                    <td>2023-07-15</td>
                    <td><Badge status="active">Published</Badge></td>
                    <td>
                      <FlexRow>
                        <Button small>Edit</Button>
                        <Button small secondary>View</Button>
                      </FlexRow>
                    </td>
                  </tr>
                  <tr>
                    <td>About Us</td>
                    <td>/about</td>
                    <td>2023-07-12</td>
                    <td><Badge status="active">Published</Badge></td>
                    <td>
                      <FlexRow>
                        <Button small>Edit</Button>
                        <Button small secondary>View</Button>
                      </FlexRow>
                    </td>
                  </tr>
                  <tr>
                    <td>Conference Schedule</td>
                    <td>/schedule</td>
                    <td>2023-07-10</td>
                    <td><Badge status="pending">Draft</Badge></td>
                    <td>
                      <FlexRow>
                        <Button small>Edit</Button>
                        <Button small secondary>Preview</Button>
                      </FlexRow>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
            
            <Card style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Navigation Menu</h2>
                <Button>Save Changes</Button>
              </div>
              
              <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ margin: '0 0 10px 0', color: '#1a8f4c', fontWeight: 'bold' }}>Drag and drop to reorder menu items</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '10px', background: 'white', marginBottom: '5px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Home</div>
                    <FlexRow>
                      <Button small secondary>Edit</Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </FlexRow>
                  </li>
                  <li style={{ padding: '10px', background: 'white', marginBottom: '5px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>About</div>
                    <FlexRow>
                      <Button small secondary>Edit</Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </FlexRow>
                  </li>
                  <li style={{ padding: '10px', background: 'white', marginBottom: '5px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Speakers</div>
                    <FlexRow>
                      <Button small secondary>Edit</Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </FlexRow>
                  </li>
                  <li style={{ padding: '10px', background: 'white', marginBottom: '5px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Schedule</div>
                    <FlexRow>
                      <Button small secondary>Edit</Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </FlexRow>
                  </li>
                </ul>
                <Button style={{ marginTop: '10px' }} secondary>+ Add Menu Item</Button>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'media' && (
          <div>
            <PageTitle>Media Library</PageTitle>
            
            <Card style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Upload Media</h2>
                <div>
                  <Button style={{ marginRight: '10px' }}>Upload Image</Button>
                  <Button>Upload Video</Button>
                </div>
              </div>
              
              <div style={{ border: '2px dashed #e2e8f0', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a8f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '1.1rem' }}>Drag and drop files here or click to browse</p>
                <p style={{ margin: '0', color: '#718096', fontSize: '0.9rem' }}>Supported formats: JPG, PNG, GIF, MP4, WebM</p>
              </div>
            </Card>
            
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#1a8f4c', margin: 0 }}>Media Files</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '15px' }}>
                    <select style={{ padding: '8px 10px', borderRadius: '5px', border: '1px solid #e2e8f0' }}>
                      <option>All Media</option>
                      <option>Images</option>
                      <option>Videos</option>
                      <option>Documents</option>
                    </select>
                  </div>
                  <SearchBar style={{ width: '200px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Search media..." />
                  </SearchBar>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                  <div key={item} style={{ position: 'relative', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                    <img 
                      src={`https://picsum.photos/150/100?random=${item}`} 
                      alt={`Media item ${item}`}
                      style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '0', 
                      right: '0', 
                      bottom: '0',
                      background: 'rgba(0, 0, 0, 0.5)',
                      opacity: '0',
                      transition: 'opacity 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      ':hover': { opacity: '1' }
                    }} className="media-overlay">
                      <button style={{ background: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a8f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button style={{ background: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a8f4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button style={{ background: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                    <div style={{ padding: '5px 8px', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        image-{item}.jpg
                      </div>
                      <div style={{ color: '#718096', fontSize: '0.7rem' }}>
                        {Math.floor(Math.random() * 1000) + 100} KB
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button secondary>Load More</Button>
              </div>
            </Card>
          </div>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 