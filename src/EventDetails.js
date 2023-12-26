import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();

  return (
    <div>
      <h2>Event Details</h2>
      <p>Details for Event ID: {eventId}</p>
    </div>
  );
};

export default EventDetails;