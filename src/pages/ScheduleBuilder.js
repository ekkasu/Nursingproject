import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import LoadingSpinner from '../components/LoadingSpinner';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 20px 60px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
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

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 150px repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const TimeSlot = styled.div`
  padding: 15px;
  background: #e2e8f0;
  border-radius: 8px;
  font-weight: 600;
  color: #2d3748;

  @media (max-width: 768px) {
    padding: 10px 15px;
    background: transparent;
    color: #1a8f4c;
    font-size: 0.9rem;
  }
`;

const Session = styled.div`
  padding: 15px;
  background: ${props => props.selected ? '#1a8f4c' : 'white'};
  color: ${props => props.selected ? 'white' : '#2d3748'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  touch-action: manipulation;

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 10px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SessionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
`;

const SessionDetails = styled.p`
  font-size: 0.9rem;
  color: ${props => props.selected ? 'rgba(255, 255, 255, 0.9)' : '#4a5568'};
  margin-bottom: 8px;
`;

const Speaker = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.selected ? 'rgba(255, 255, 255, 0.9)' : '#1a8f4c'};
`;

const DayTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 0 20px;
    margin: 0 -20px 30px;
  }

  /* Hide scrollbar */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DayTab = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? '#1a8f4c' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  touch-action: manipulation;

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }

  &:hover {
    background: ${props => props.active ? '#158f3d' : '#cbd5e0'};
  }
`;

const MyScheduleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 15px 30px;
  background: #1a8f4c;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(26, 143, 76, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  touch-action: manipulation;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    left: 20px;
    width: calc(100% - 40px);
    padding: 18px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 143, 76, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const scheduleData = {
  'Day 1': [
    {
      time: '09:00 - 10:30',
      sessions: [
        {
          id: '1-1',
          title: 'Opening Keynote',
          details: 'Future of Nursing Leadership',
          speaker: 'Dr. Sarah Johnson',
          room: 'Main Hall'
        },
        {
          id: '1-2',
          title: 'Workshop A',
          details: 'Clinical Excellence in Practice',
          speaker: 'Prof. Michael Chen',
          room: 'Room 101'
        },
        {
          id: '1-3',
          title: 'Panel Discussion',
          details: 'Innovation in Healthcare',
          speaker: 'Various Experts',
          room: 'Room 102'
        }
      ]
    },
    {
      time: '11:00 - 12:30',
      sessions: [
        {
          id: '2-1',
          title: 'Research Presentation',
          details: 'Evidence-Based Practice',
          speaker: 'Dr. Emily White',
          room: 'Room 201'
        },
        {
          id: '2-2',
          title: 'Workshop B',
          details: 'Patient Care Technologies',
          speaker: 'Dr. James Wilson',
          room: 'Room 202'
        },
        {
          id: '2-3',
          title: 'Breakout Session',
          details: 'Mental Health Nursing',
          speaker: 'Dr. Lisa Brown',
          room: 'Room 203'
        }
      ]
    }
  ],
  'Day 2': [
    {
      time: '09:00 - 10:30',
      sessions: [
        {
          id: '3-1',
          title: 'Keynote Speech',
          details: 'Digital Transformation in Healthcare',
          speaker: 'Dr. Robert Taylor',
          room: 'Main Hall'
        },
        {
          id: '3-2',
          title: 'Workshop C',
          details: 'Leadership Development',
          speaker: 'Prof. Anna Martinez',
          room: 'Room 301'
        },
        {
          id: '3-3',
          title: 'Panel Discussion',
          details: 'Future of Nursing Education',
          speaker: 'Various Experts',
          room: 'Room 302'
        }
      ]
    }
  ],
  'Day 3': [
    {
      time: '09:00 - 10:30',
      sessions: [
        {
          id: '4-1',
          title: 'Closing Keynote',
          details: 'The Path Forward',
          speaker: 'Dr. David Thompson',
          room: 'Main Hall'
        },
        {
          id: '4-2',
          title: 'Awards Ceremony',
          details: 'Excellence Recognition',
          speaker: 'Conference Committee',
          room: 'Grand Hall'
        },
        {
          id: '4-3',
          title: 'Networking Session',
          details: 'Professional Connections',
          speaker: 'All Attendees',
          room: 'Exhibition Hall'
        }
      ]
    }
  ]
};

const ScheduleBuilder = () => {
  const [selectedDay, setSelectedDay] = useState('Day 1');
  const [selectedSessions, setSelectedSessions] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    // Simulate loading schedule data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(async () => {
    // Simulate refresh - replace with actual data fetching
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  const { handlers, refreshing } = usePullToRefresh(handleRefresh);

  const toggleSession = (sessionId) => {
    setSelectedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      // Store in localStorage for offline access
      localStorage.setItem('selectedSessions', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  // Load selected sessions from localStorage on mount
  React.useEffect(() => {
    const savedSessions = localStorage.getItem('selectedSessions');
    if (savedSessions) {
      setSelectedSessions(new Set(JSON.parse(savedSessions)));
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner text="Loading conference schedule..." fullScreen />;
  }

  return (
    <>
      <Header />
      <PageContainer {...handlers}>
        <RefreshIndicator visible={refreshing}>
          <div className="ptr-spinner" />
        </RefreshIndicator>

        <ContentWrapper>
          <Title>Build Your Schedule</Title>

          {!isOnline && (
            <OfflineIndicator>
              You're offline. Your schedule is saved locally.
            </OfflineIndicator>
          )}

          <DayTabs>
            {Object.keys(scheduleData).map(day => (
              <DayTab
                key={day}
                active={selectedDay === day}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </DayTab>
            ))}
          </DayTabs>

          {scheduleData[selectedDay].map((timeSlot, index) => (
            <ScheduleGrid key={index}>
              <TimeSlot>{timeSlot.time}</TimeSlot>
              {timeSlot.sessions.map(session => (
                <Session
                  key={session.id}
                  selected={selectedSessions.has(session.id)}
                  onClick={() => toggleSession(session.id)}
                >
                  <SessionTitle>{session.title}</SessionTitle>
                  <SessionDetails selected={selectedSessions.has(session.id)}>
                    {session.details}
                  </SessionDetails>
                  <SessionDetails selected={selectedSessions.has(session.id)}>
                    Room: {session.room}
                  </SessionDetails>
                  <Speaker selected={selectedSessions.has(session.id)}>
                    {session.speaker}
                  </Speaker>
                </Session>
              ))}
            </ScheduleGrid>
          ))}

          <MyScheduleButton>
            View My Schedule ({selectedSessions.size} sessions)
          </MyScheduleButton>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default ScheduleBuilder; 