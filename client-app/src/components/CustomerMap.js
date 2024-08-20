import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Typography, Paper } from '@mui/material';


const CustomerMap = () => {
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);


  useEffect(() => {
    // Fetch customer data from the API
    axios.get(`${process.env.REACT_APP_API_URL}/customers/city`)
      .then(response => {
        const data = response.data;
        const savedLocations = JSON.parse(localStorage.getItem('locations')) || {};

        // Fetch coordinates for each city
        const fetchCoordinates = async (location) => {
          const city = location.city.city;
          const count = location.count;

          // Check if the coordinates are already saved in localStorage
          if (savedLocations[city]) {
            return { city, count, lat: savedLocations[city].lat, lon: savedLocations[city].lon };
          }

          // If not saved, fetch coordinates from OpenCageData API
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${process.env.REACT_APP_API_KEY}&limit=1`;

          try {
            const res = await axios.get(url);
            if (res.data.results.length > 0) {
              const { lat, lng } = res.data.results[0].geometry;

              // Save the coordinates in localStorage
              savedLocations[city] = { lat, lon: lng };
              localStorage.setItem('locations', JSON.stringify(savedLocations));

              return { city, count, lat, lon: lng };
            }
          } catch (error) {
            console.error('Error fetching coordinates:', error);
          }
          return null;
        };

        // Fetch coordinates for all locations
        const fetchAllCoordinates = async () => {
          const promises = data.map(location => fetchCoordinates(location));
          const results = await Promise.all(promises);
          setLocations(results.filter(location => location !== null));
        };

        fetchAllCoordinates();
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  useEffect(() => {
    if (map) {
      map.on('click', (e) => {
        console.log(e.latlng);
      });
    }
  }, [map]);

  // Default center position (San Francisco)
  const centerPosition = [37.7749, -122.4194];
  const handleMouseOver = (e) => {
    e.target.openPopup();
  };

  const handleMouseOut = (e) => {
    e.target.closePopup();
  };
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      p: 2
    }}
  >
    <Paper
      elevation={3}
      sx={{
        p: 1,
        mb: 2,
        width: '70%',
        maxWidth: 1200,
        textAlign: 'center',
      }}
    >
      <Typography variant="body1"  >
        Customer Geographical Distribution
      </Typography>
    </Paper>
    <Box
      sx={{
        marginRight: '40px',
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: 4
      }}
    >
      <MapContainer
        center={centerPosition}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lon]}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })}
            eventHandlers={{
              mouseover: handleMouseOver,
              mouseout: handleMouseOut,
            }}
          >
            <Popup>
              <Typography variant="body2"><strong>City:</strong> {location.city}</Typography>
              <Typography variant="body2"><strong>Count:</strong> {location.count}</Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  </Box>
  );
};

export default CustomerMap;
