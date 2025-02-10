import React, { useState, useEffect } from 'react';



const GeoLocation = ({socket}) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    errorMessage: ''
  });


  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            errorMessage: ''
          });
          // console.log("Call");
          socket.emit("geo-location",{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          // On error
          setLocation((prevState) => ({
            ...prevState,
            errorMessage: error.message
          }));
        }
      );
    } else {
      setLocation((prevState) => ({
        ...prevState,
        errorMessage: 'Geolocation is not supported by this browser.'
      }));
    }
  };



  useEffect(() => {
    // Function to get the current geo location
    setInterval(()=>getGeoLocation(),2000)
    ;
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div>
      <h2>Current Location</h2>
      {location.errorMessage ? (
        <p>Error: {location.errorMessage}</p>
      ) : (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocation;
