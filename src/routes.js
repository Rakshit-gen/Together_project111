import React from 'react';
import { Router, Route } from 'react-router-dom';
import EventList from './App';
import EventDetails from './EventDetails';
import events from './events.json'

const routes = () => {
  return (
    <Router>
      
        <Route path="/" exact component={EventList} />
        <Route path={`/events/${events.id}`} component={EventDetails} />
    </Router>
  );
};

export default routes;