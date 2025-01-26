import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../contexts/UserContext';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';

import EventsList from '../components/events-view/EventsList';

type GeoPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type Location = {
  latitude: null | number;
  longitude: null | number;
};

type EventData = {
  id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  address: string;
  description: string;
  venue_id: number;
  created_by: number;
  chatroom_id: number;
  createdAt: Date;
  updatedAt: Date;
  User_Event?: {
    user_attending: boolean;
  };
};

function Events() {
  const { user } = useContext(UserContext);

  // The latitude and longitude of the user will be stored in state on page load
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  // Events the user can attend will be stored in state on page load
  const [events, setEvents] = useState<EventData[]>([]);

  // Events the user can attend will be stored in state on page load
  const [attendingEvents, setAttendingEvents] = useState<EventData[]>([]);

  const [bailedEvents, setBailedEvents] = useState<EventData[]>([]);

  const getGeoLocation = () => {
    const success = (position: GeoPosition) => {
      const { latitude, longitude } = position.coords;

      setLocation({ latitude, longitude });
    };

    const error = () => {
      console.error('Unable to retrieve your location');
    };

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const getAttendEvents = () => {
    axios
      .get('/api/event/attend/true')
      .then(({ data }) => {
        if (data) {
          setAttendingEvents(data);
        }
      })
      .catch((err: unknown) => {
        console.error('Failed to getAttendEvents:', err);
      });
  };

  const getBailedEvents = () => {
    axios
      .get('/api/event/attend/false')
      .then(({ data }) => {
        if (data) {
          setBailedEvents(data);
        }
      })
      .catch((err: unknown) => {
        console.error('Failed to getAttendEvents:', err);
      });
  };

  const getEvents = () => {
    axios
      .get('/api/event')
      .then(({ data }) => {
        setEvents(data);
      })
      .then(getAttendEvents)
      .then(getBailedEvents)
      .catch((err: unknown) => {
        console.error('Failed to getEvents:', err);
      });
  };

  const getLocation = () => {
    if (location.latitude && location.longitude) {
      axios
        .get(`/api/event/location/${location.latitude}/${location.longitude}`)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err: unknown) => {
          console.error('Failed getLocation:', err);
        });
    }
  };

  useEffect(() => {
    getGeoLocation();
    getEvents();
  }, []);

  useEffect(() => {
    getLocation();
  }, [location]);

  // console.log('Events:', events);
  // console.log('Attending Events:', attendingEvents);
  // console.log('Bailed Events:', bailedEvents);
  console.log(location);

  return (
    <div className="container mx-auto px-4 content-center">
      <Tabs
        defaultValue="upcoming"
        className="container mx-auto px-4 content-center"
      >
        <TabsList>
          <TabsTrigger value="upcoming">{`Upcoming (${events.length})`}</TabsTrigger>
          <TabsTrigger value="attending">{`Attending (${attendingEvents.length})`}</TabsTrigger>
          <TabsTrigger value="bailed">{`Bailed (${bailedEvents.length})`}</TabsTrigger>
        </TabsList>
        <TabsContent
          value="upcoming"
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          <EventsList
            events={events}
            getEvents={getEvents}
            category="upcoming"
          />
        </TabsContent>
        <TabsContent
          value="attending"
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          <EventsList
            events={attendingEvents}
            getEvents={getEvents}
            category="attending"
          />
        </TabsContent>
        <TabsContent
          value="bailed"
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          <EventsList
            events={bailedEvents}
            getEvents={getEvents}
            category="bailed"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Events;
