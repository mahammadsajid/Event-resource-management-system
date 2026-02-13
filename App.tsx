
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import EventManagement from './components/EventManagement.tsx';
import InfrastructureView from './components/InfrastructureView.tsx';
import AIChatAssistant from './components/AIChatAssistant.tsx';
import Login from './components/Login.tsx';
import { INITIAL_VENUES, INITIAL_RESOURCES, INITIAL_EVENTS } from './constants.ts';
import { Event, Venue, Resource, EventStatus, User } from './types.ts';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [venues, setVenues] = useState<Venue[]>(INITIAL_VENUES);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldOpenEventForm, setShouldOpenEventForm] = useState(false);

  // Load session
  useEffect(() => {
    const savedUser = localStorage.getItem('eventflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedData = localStorage.getItem('eventflow_data');
    if (savedData) {
      const { events, venues, resources } = JSON.parse(savedData);
      setEvents(events);
      setVenues(venues);
      setResources(resources);
    }
    setIsInitialLoad(false);
  }, []);

  // Save session
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('eventflow_data', JSON.stringify({ events, venues, resources }));
      if (user) {
        localStorage.setItem('eventflow_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('eventflow_user');
      }
    }
  }, [events, venues, resources, user, isInitialLoad]);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('eventflow_user');
  };

  const handleUpdateStatus = (id: number, status: EventStatus) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm('Archive this event request?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    const eventWithId: Event = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id), 0) + 1,
    } as Event;
    setEvents(prev => [eventWithId, ...prev]);
    setShouldOpenEventForm(false);
  };

  const handleToggleVenueAvailability = (id: number) => {
    setVenues(prev => prev.map(v => v.id === id ? { ...v, is_available: !v.is_available } : v));
  };

  const handleRestockResource = (id: number) => {
    setResources(prev => prev.map(r => 
      r.id === id ? { ...r, available_qty: Math.min(r.total_qty, r.available_qty + 5) } : r
    ));
  };

  const handleNewEventRequest = () => {
    setActiveTab('events');
    setShouldOpenEventForm(true);
  };

  if (isInitialLoad) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard events={events} venues={venues} resources={resources} onNavigateToInfra={() => setActiveTab('infrastructure')} />;
      case 'events':
        return (
          <EventManagement 
            events={events} 
            venues={venues} 
            resources={resources}
            onUpdateStatus={handleUpdateStatus} 
            onDeleteEvent={handleDeleteEvent}
            onAddEvent={handleAddEvent} 
            currentUser={user}
            forceOpenForm={shouldOpenEventForm}
            onFormClose={() => setShouldOpenEventForm(false)}
          />
        );
      case 'infrastructure':
        return (
          <InfrastructureView 
            venues={venues} 
            resources={resources} 
            onToggleVenue={handleToggleVenueAvailability}
            onRestock={handleRestockResource}
          />
        );
      default:
        return <Dashboard events={events} venues={venues} resources={resources} onNavigateToInfra={() => setActiveTab('infrastructure')} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      user={user} 
      onLogout={handleLogout}
      onNewEventClick={handleNewEventRequest}
    >
      {renderContent()}
      <AIChatAssistant 
        venues={venues} 
        resources={resources} 
        recentEvents={events} 
      />
    </Layout>
  );
};

export default App;
