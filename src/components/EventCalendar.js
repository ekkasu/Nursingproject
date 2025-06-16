import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CalendarSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1a8f4c;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 700;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #FFD700;
    margin: 15px auto 0;
  }
`;

const EventsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const EventCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EventDate = styled.div`
  background: #1a8f4c;
  color: white;
  padding: 15px;
  text-align: center;
  font-weight: 600;
  
  .month {
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  
  .day {
    font-size: 2rem;
    line-height: 1;
  }
  
  .year {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const EventContent = styled.div`
  padding: 20px;
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  color: #1a8f4c;
  margin-bottom: 10px;
  font-weight: 600;
`;

const EventDetails = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
  
  p {
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      font-size: 1.1rem;
    }
  }
  
  .location::before {
    content: '📍';
  }
  
  .time::before {
    content: '🕒';
  }
  
  .type::before {
    content: '🎯';
  }
`;

const EventButton = styled(Link)`
  display: inline-block;
  background: #1a8f4c;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #156e3a;
    transform: translateY(-2px);
  }
`;

const ViewAllButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 40px auto 0;
  padding: 12px 30px;
  background: white;
  color: #1a8f4c;
  border: 2px solid #1a8f4c;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #1a8f4c;
    color: white;
    transform: translateY(-2px);
  }
`;

const EventCalendar = () => {
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // Event data with correct dates and details
  const upcomingEvents = [
    {
      id: 1,
      title: "Conference Arrival & Registration",
      date: { month: "Sep", day: "02", year: "2025" },
      location: "Global Dream Hotel, Temale",
      time: "9:00 AM - 4:00 PM",
      type: "Day 1: Arrival, Registration & Welcome Reception",
      link: "/conference-details"
    },
    {
      id: 2,
      title: "Conference Opening Day",
      date: { month: "Sep", day: "03", year: "2025" },
      location: "Global Dream Hotel, Temale",
      time: "9:00 AM - 5:00 PM",
      type: "Day 2: Opening Ceremony & Leadership Sessions",
      link: "/conference-details"
    },
    {
      id: 3,
      title: "Main Conference Day",
      date: { month: "Sep", day: "04", year: "2025" },
      location: "Global Dream Hotel, Temale",
      time: "9:00 AM - 5:00 PM",
      type: "Day 3: Keynote Speeches & Workshops",
      link: "/conference-details"
    },
    {
      id: 4,
      title: "Excellence & Hall of Fame Awards",
      date: { month: "Sep", day: "05", year: "2025" },
      location: "Global Dream Hotel, Temale",
      time: "10:00 AM - 4:00 PM",
      type: "Day 4: Awards Ceremony & Gala Dinner",
      link: "/conference-details"
    },
    {
      id: 5,
      title: "Conference Closing Day",
      date: { month: "Sep", day: "06", year: "2025" },
      location: "Global Dream Hotel, Temale",
      time: "9:00 AM - 2:00 PM",
      type: "Day 5: Closing Sessions & Departure",
      link: "/conference-details"
    }
  ];

  // Get events to display based on showFullSchedule state
  const displayEvents = showFullSchedule ? upcomingEvents : upcomingEvents.slice(0, 3);

  return (
    <CalendarSection>
      <SectionTitle>Conference Schedule</SectionTitle>
      <EventsContainer>
        {displayEvents.map(event => (
          <EventCard key={event.id}>
            <EventDate>
              <div className="month">{event.date.month}</div>
              <div className="day">{event.date.day}</div>
              <div className="year">{event.date.year}</div>
            </EventDate>
            <EventContent>
              <EventTitle>{event.title}</EventTitle>
              <EventDetails>
                <p className="location">{event.location}</p>
                <p className="time">{event.time}</p>
                <p className="type">{event.type}</p>
              </EventDetails>
              <EventButton to={event.link}>Learn More</EventButton>
            </EventContent>
          </EventCard>
        ))}
      </EventsContainer>
      <ViewAllButton 
        onClick={() => setShowFullSchedule(!showFullSchedule)}
        as="button"
        style={{ cursor: 'pointer' }}
      >
        {showFullSchedule ? 'Show Less' : 'View Full Schedule'}
      </ViewAllButton>
    </CalendarSection>
  );
};

export default EventCalendar; 