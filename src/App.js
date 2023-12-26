import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from './routes';
import { BrowserRouter } from 'react-router-dom'
import './App.css'

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/events.json')
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const groupEventsByDate = () => {
    const today = new Date();
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() + 7);

    const todayEvents = events.filter(event => new Date(event.date) <= today);
    const thisWeekEvents = events.filter(event => new Date(event.date) > today && new Date(event.date) <= thisWeek);
    const upcomingEvents = events.filter(event => new Date(event.date) > thisWeek);

    return {
      today: todayEvents,
      thisWeek: thisWeekEvents,
      upcoming: upcomingEvents,
    };
  };

  const renderEventCards = (eventList) => {
    return eventList.map(event => (
      <div key={event.id} className="event-card">
        <h3>{event.name}</h3>
        <p>Date: {formatDate(event.date)}</p>
        <p>Location: {event.location}</p>
        <p>Description: {event.description}</p>
        <a><Link to={`/events/${event.id}`}><button>View Details</button></Link></a>
      </div>
    ));
  };

  const groupedEvents = groupEventsByDate();

  return (
    <BrowserRouter>
    <div className="event-list">
      <div className="event-section">
        <h2>Today and Passed</h2>
        <div className="event-cards">{renderEventCards(groupedEvents.today)}</div>
      </div>
      <div className="event-section">
        <h2>This Week</h2>
        <div className="event-cards">{renderEventCards(groupedEvents.thisWeek)}</div>
      </div>
      <div className="event-section">
        <h2>Upcoming</h2>
        <div className="event-cards">{renderEventCards(groupedEvents.upcoming)}</div>
      </div>
    </div>
    </BrowserRouter>
  );
};

export default EventList;
