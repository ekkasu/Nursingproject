import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Tabs, Tab, Box, InputBase, Avatar, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DonutChart from '../components/DonutChart';

const data = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

const transactions = [
  { id: 1, name: 'Premium T-Shirt', date: 'Jul 12th 2024', status: 'Completed', reference: 'GJWEJS75NC' },
  { id: 2, name: 'Playstation 5', date: 'Jul 12th 2024', status: 'Pending', reference: 'GJWEJS75NC' },
  { id: 3, name: 'Hoodie Gombrang', date: 'Jul 12th 2024', status: 'Pending', reference: 'GJWEJS75NC' },
  { id: 4, name: 'iPhone 15 Pro Max', date: 'Jul 12th 2024', status: 'Completed', reference: 'GJWEJS75NC' },
];

const voteData = [
  { name: 'Jan', votes: 1200 },
  { name: 'Feb', votes: 2100 },
  { name: 'Mar', votes: 800 },
  { name: 'Apr', votes: 1600 },
  { name: 'May', votes: 900 },
];

const nominationData = [
  { name: 'Jan', nominations: 300 },
  { name: 'Feb', nominations: 500 },
  { name: 'Mar', nominations: 200 },
  { name: 'Apr', nominations: 400 },
  { name: 'May', nominations: 350 },
];

const registrationData = [
  { name: 'Jan', registrations: 1000 },
  { name: 'Feb', registrations: 1500 },
  { name: 'Mar', registrations: 1200 },
  { name: 'Apr', registrations: 1800 },
  { name: 'May', registrations: 1100 },
];

const performanceData = [
  { name: 'View Count', value: 23 },
  { name: 'Percentage', value: 68 },
  { name: 'Sales', value: 16 }
];

const nominationTableData = [
  { nominator: 'Alice Johnson', candidate: 'John Doe', award: 'Best Nurse' },
  { nominator: 'Bob Smith', candidate: 'Jane Lee', award: 'Best Midwife' },
  { nominator: 'Carol White', candidate: 'John Doe', award: 'Best Nurse' },
  { nominator: 'David Brown', candidate: 'Emily Clark', award: 'Best Researcher' },
  { nominator: 'Eve Black', candidate: 'Jane Lee', award: 'Best Midwife' },
];

const individualVotesData = [
  { nominee: 'John Doe', votes: 3 },
  { nominee: 'Jane Lee', votes: 5 },
  { nominee: 'Emily Clark', votes: 2 },
  { nominee: 'Michael Green', votes: 1 },
];

const voteTrendData = [
  { day: 'Mon', votes: 2 },
  { day: 'Tue', votes: 3 },
  { day: 'Wed', votes: 4 },
  { day: 'Thu', votes: 2 },
  { day: 'Fri', votes: 5 },
  { day: 'Sat', votes: 3 },
  { day: 'Sun', votes: 6 },
];

const votesByCategory = [
  { name: 'Best Nurse', value: 8 },
  { name: 'Best Midwife', value: 5 },
  { name: 'Best Researcher', value: 3 },
];

const recentVotes = [
  { voter: 'Alice Johnson', nominee: 'John Doe', category: 'Best Nurse', date: '2024-06-01', time: '10:15' },
  { voter: 'Bob Smith', nominee: 'Jane Lee', category: 'Best Midwife', date: '2024-06-01', time: '10:10' },
  { voter: 'Carol White', nominee: 'Emily Clark', category: 'Best Researcher', date: '2024-05-31', time: '16:45' },
  { voter: 'David Brown', nominee: 'Jane Lee', category: 'Best Midwife', date: '2024-05-31', time: '15:30' },
];

// Nomination analytics dummy data
const nominationTrendData = [
  { day: 'Mon', nominations: 1 },
  { day: 'Tue', nominations: 2 },
  { day: 'Wed', nominations: 2 },
  { day: 'Thu', nominations: 1 },
  { day: 'Fri', nominations: 3 },
  { day: 'Sat', nominations: 2 },
  { day: 'Sun', nominations: 4 },
];

const nominationsByCategory = [
  { name: 'Best Nurse', value: 5 },
  { name: 'Best Midwife', value: 4 },
  { name: 'Best Researcher', value: 2 },
];

const recentNominations = [
  { nominator: 'Alice Johnson', candidate: 'John Doe', category: 'Best Nurse', date: '2024-06-01', time: '09:45' },
  { nominator: 'Bob Smith', candidate: 'Jane Lee', category: 'Best Midwife', date: '2024-06-01', time: '09:30' },
  { nominator: 'Carol White', candidate: 'Emily Clark', category: 'Best Researcher', date: '2024-05-31', time: '15:10' },
  { nominator: 'David Brown', candidate: 'Jane Lee', category: 'Best Midwife', date: '2024-05-31', time: '14:50' },
];

// Registration analytics dummy data
const registrationTrendData = [
  { day: 'Mon', registrations: 10 },
  { day: 'Tue', registrations: 15 },
  { day: 'Wed', registrations: 12 },
  { day: 'Thu', registrations: 18 },
  { day: 'Fri', registrations: 20 },
  { day: 'Sat', registrations: 14 },
  { day: 'Sun', registrations: 22 },
];

const registrationsByCategory = [
  { name: 'Standard', value: 40 },
  { name: 'VIP', value: 20 },
  { name: 'Student', value: 15 },
];

const recentRegistrations = [
  { name: 'Alice Johnson', category: 'Standard', date: '2024-06-01', time: '08:45' },
  { name: 'Bob Smith', category: 'VIP', date: '2024-06-01', time: '08:30' },
  { name: 'Carol White', category: 'Student', date: '2024-05-31', time: '13:10' },
  { name: 'David Brown', category: 'Standard', date: '2024-05-31', time: '12:50' },
];

const VoteTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    color: #666;
    font-weight: 500;
    background: #f5f5f5;
  }
`;

const RegistrationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    color: #666;
    font-weight: 500;
    background: #f5f5f5;
  }
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7f8fa;
`;

const Sidebar = styled.div`
  width: 80px;
  background: #11131a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 1rem 0;
  gap: 1.5rem;
`;

const SidebarIcon = styled.div`
  color: #fff;
  background: ${props => props.active ? '#2563eb' : 'transparent'};
  border-radius: 16px;
  padding: 0.7rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 700;
  color: #18181b;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0.4rem 1rem;
  margin-right: 1.5rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(16,30,54,0.04);
  padding: 2rem 2rem 1.5rem 2rem;
  margin-bottom: 2rem;
`;

const TabCard = styled(Card)`
  margin-bottom: 0;
  padding-bottom: 0.5rem;
`;

const StatRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(16,30,54,0.04);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatTitle = styled.div`
  font-size: 1rem;
  color: #888fa0;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #18181b;
`;

const StatChange = styled.div`
  font-size: 0.95rem;
  color: #22c55e;
  margin-top: 0.2rem;
`;

const ChartCard = styled(Card)`
  height: 340px;
  display: flex;
  flex-direction: column;
`;

const NominationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    color: #666;
    font-weight: 500;
    background: #f5f5f5;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const Analytics = () => {
  const [tab, setTab] = useState(0);
  const [voteRange, setVoteRange] = useState('week');
  const [nominationRange, setNominationRange] = useState('week');
  const [registrationRange, setRegistrationRange] = useState('week');

  // Vote tab stats
  const totalNominees = individualVotesData.length;
  const votesToday = 4; // dummy
  const mostVoted = individualVotesData.reduce((max, curr) => curr.votes > max.votes ? curr : max, individualVotesData[0]);

  // Nomination tab stats
  const uniqueNominators = [...new Set(nominationTableData.map(row => row.nominator))].length;
  const uniqueCandidates = [...new Set(nominationTableData.map(row => row.candidate))].length;
  const nominationsToday = 2; // dummy
  const candidateCounts = nominationTableData.reduce((acc, row) => { acc[row.candidate] = (acc[row.candidate] || 0) + 1; return acc; }, {});
  const mostNominated = Object.entries(candidateCounts).reduce((max, curr) => curr[1] > max[1] ? curr : max, Object.entries(candidateCounts)[0] || [null, 0]);

  // Registration tab stats
  const totalRegistrations = 75; // dummy
  const uniqueAttendees = [...new Set(recentRegistrations.map(row => row.name))].length;
  const registrationsToday = 2; // dummy
  const categoryCounts = registrationsByCategory.reduce((acc, row) => { acc[row.name] = row.value; return acc; }, {});
  const mostPopularCategory = Object.entries(categoryCounts).reduce((max, curr) => curr[1] > max[1] ? curr : max, Object.entries(categoryCounts)[0] || [null, 0]);

  return (
    <Layout>
      <Sidebar>
        <SidebarIcon active><DashboardIcon /></SidebarIcon>
        <SidebarIcon><HowToVoteIcon /></SidebarIcon>
        <SidebarIcon><EmojiEventsIcon /></SidebarIcon>
        <SidebarIcon><PersonAddIcon /></SidebarIcon>
      </Sidebar>
      <Main>
        <TopBar>
          <Title>Analytics <span role="img" aria-label="peace">✌️</span></Title>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchBox>
              <SearchIcon style={{ color: '#b0b3b8', marginRight: 8 }} />
              <InputBase placeholder="Search..." sx={{ fontSize: 16 }} />
            </SearchBox>
            <Avatar alt="User" src="/avatar.png" />
          </div>
        </TopBar>
        <Box sx={{ px: 4, pt: 3 }}>
          <TabCard>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="analytics tabs" sx={{ minHeight: 0 }}>
              <Tab label="Vote" id="analytics-tab-0" aria-controls="analytics-tabpanel-0" sx={{ fontWeight: 600, fontSize: 16, minHeight: 0, minWidth: 120 }} />
              <Tab label="Nomination" id="analytics-tab-1" aria-controls="analytics-tabpanel-1" sx={{ fontWeight: 600, fontSize: 16, minHeight: 0, minWidth: 120 }} />
              <Tab label="Registration" id="analytics-tab-2" aria-controls="analytics-tabpanel-2" sx={{ fontWeight: 600, fontSize: 16, minHeight: 0, minWidth: 120 }} />
            </Tabs>
          </TabCard>

          <TabPanel value={tab} index={0}>
            {/* Stat Cards Row */}
            <StatRow>
              <StatCard>
                <StatTitle>Total Votes</StatTitle>
                <StatValue>6,600</StatValue>
                <StatChange>+12% from last month</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Total Nominees</StatTitle>
                <StatValue>{totalNominees}</StatValue>
                <StatChange style={{ color: '#2563eb' }}>+2 new</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Votes Cast Today</StatTitle>
                <StatValue>{votesToday}</StatValue>
                <StatChange style={{ color: '#f59e42' }}>+1 since yesterday</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Most Voted Nominee</StatTitle>
                <StatValue>{mostVoted.nominee}</StatValue>
                <StatChange style={{ color: '#22c55e' }}>{mostVoted.votes} votes</StatChange>
              </StatCard>
            </StatRow>
            {/* Date Range Filter */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 500, marginRight: 8 }}>Range:</span>
              <Select
                value={voteRange}
                onChange={e => setVoteRange(e.target.value)}
                size="small"
                sx={{ minWidth: 120, background: '#f3f4f6', borderRadius: 2 }}
              >
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </div>
            {/* Trend and Donut Row */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: 24 }}>
              <ChartCard style={{ flex: 2, height: 220 }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Voting Trend</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={voteTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="votes" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard style={{ flex: 1, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Votes by Category</div>
                <DonutChart data={votesByCategory} centerText={votesByCategory.reduce((a, b) => a + b.value, 0) + ' votes'} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
                  {votesByCategory.map((cat, idx) => (
                    <span key={cat.name} style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#888fa0', marginRight: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: ['#2563eb','#22c55e','#f59e42','#a855f7','#f43f5e'][idx], display: 'inline-block', marginRight: 6 }}></span>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </ChartCard>
            </div>
            {/* Live Votes by You Bar Chart */}
            <ChartCard>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Live Votes by You</div>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={individualVotesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nominee" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            {/* Recent Voting Activity Table */}
            <ChartCard style={{ height: 'auto' }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Recent Voting Activity</div>
              <VoteTable>
                <thead>
                  <tr>
                    <th>Voter</th>
                    <th>Nominee</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVotes.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.voter}</td>
                      <td>{row.nominee}</td>
                      <td>{row.category}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </VoteTable>
            </ChartCard>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            {/* Stat Cards Row */}
            <StatRow>
              <StatCard>
                <StatTitle>Total Nominations</StatTitle>
                <StatValue>1,750</StatValue>
                <StatChange style={{ color: '#2563eb' }}>+8% from last month</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Unique Nominators</StatTitle>
                <StatValue>{uniqueNominators}</StatValue>
                <StatChange style={{ color: '#22c55e' }}>+1 new</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Unique Candidates</StatTitle>
                <StatValue>{uniqueCandidates}</StatValue>
                <StatChange style={{ color: '#f59e42' }}>+1 new</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Most Nominated</StatTitle>
                <StatValue>{mostNominated ? mostNominated[0] : '-'}</StatValue>
                <StatChange style={{ color: '#a855f7' }}>{mostNominated ? mostNominated[1] : 0} nominations</StatChange>
              </StatCard>
            </StatRow>
            {/* Date Range Filter */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 500, marginRight: 8 }}>Range:</span>
              <Select
                value={nominationRange}
                onChange={e => setNominationRange(e.target.value)}
                size="small"
                sx={{ minWidth: 120, background: '#f3f4f6', borderRadius: 2 }}
              >
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </div>
            {/* Trend and Donut Row */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: 24 }}>
              <ChartCard style={{ flex: 2, height: 220 }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Nomination Trend</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={nominationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="nominations" stroke="#a855f7" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard style={{ flex: 1, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Nominations by Category</div>
                <DonutChart data={nominationsByCategory} centerText={nominationsByCategory.reduce((a, b) => a + b.value, 0) + ' nominations'} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
                  {nominationsByCategory.map((cat, idx) => (
                    <span key={cat.name} style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#888fa0', marginRight: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: ['#2563eb','#22c55e','#f59e42','#a855f7','#f43f5e'][idx], display: 'inline-block', marginRight: 6 }}></span>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </ChartCard>
            </div>
            {/* Individuals & Their Nominations Table */}
            <ChartCard style={{ height: 'auto' }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Individuals & Their Nominations</div>
              <NominationTable>
                <thead>
                  <tr>
                    <th>Nominator</th>
                    <th>Candidate</th>
                    <th>Award</th>
                  </tr>
                </thead>
                <tbody>
                  {nominationTableData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.nominator}</td>
                      <td>{row.candidate}</td>
                      <td>{row.award}</td>
                    </tr>
                  ))}
                </tbody>
              </NominationTable>
            </ChartCard>
            {/* Recent Nomination Activity Table */}
            <ChartCard style={{ height: 'auto' }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Recent Nomination Activity</div>
              <NominationTable>
                <thead>
                  <tr>
                    <th>Nominator</th>
                    <th>Candidate</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentNominations.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.nominator}</td>
                      <td>{row.candidate}</td>
                      <td>{row.category}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </NominationTable>
            </ChartCard>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            {/* Stat Cards Row */}
            <StatRow>
              <StatCard>
                <StatTitle>Total Registrations</StatTitle>
                <StatValue>{totalRegistrations}</StatValue>
                <StatChange style={{ color: '#ff9800' }}>+20% from last month</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Unique Attendees</StatTitle>
                <StatValue>{uniqueAttendees}</StatValue>
                <StatChange style={{ color: '#2563eb' }}>+3 new</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Registrations Today</StatTitle>
                <StatValue>{registrationsToday}</StatValue>
                <StatChange style={{ color: '#22c55e' }}>+1 since yesterday</StatChange>
              </StatCard>
              <StatCard>
                <StatTitle>Most Popular Category</StatTitle>
                <StatValue>{mostPopularCategory ? mostPopularCategory[0] : '-'}</StatValue>
                <StatChange style={{ color: '#a855f7' }}>{mostPopularCategory ? mostPopularCategory[1] : 0} regs</StatChange>
              </StatCard>
            </StatRow>
            {/* Date Range Filter */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 500, marginRight: 8 }}>Range:</span>
              <Select
                value={registrationRange}
                onChange={e => setRegistrationRange(e.target.value)}
                size="small"
                sx={{ minWidth: 120, background: '#f3f4f6', borderRadius: 2 }}
              >
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </div>
            {/* Trend and Donut Row */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: 24 }}>
              <ChartCard style={{ flex: 2, height: 220 }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Registration Trend</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={registrationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="registrations" stroke="#ff9800" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard style={{ flex: 1, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Registrations by Category</div>
                <DonutChart data={registrationsByCategory} centerText={registrationsByCategory.reduce((a, b) => a + b.value, 0) + ' regs'} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
                  {registrationsByCategory.map((cat, idx) => (
                    <span key={cat.name} style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#888fa0', marginRight: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: ['#2563eb','#22c55e','#f59e42','#a855f7','#f43f5e'][idx], display: 'inline-block', marginRight: 6 }}></span>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </ChartCard>
            </div>
            {/* Registrations Over Time Bar Chart */}
            <ChartCard>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Registrations Over Time</div>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={registrationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="registrations" fill="#ff9800" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            {/* Recent Registration Activity Table */}
            <ChartCard style={{ height: 'auto' }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Recent Registration Activity</div>
              <RegistrationTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.name}</td>
                      <td>{row.category}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </RegistrationTable>
            </ChartCard>
          </TabPanel>
        </Box>
      </Main>
    </Layout>
  );
};

export default Analytics; 