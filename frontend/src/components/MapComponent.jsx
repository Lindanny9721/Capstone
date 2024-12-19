import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  flex: 1,
  height: '100vh',
};

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [radius, setRadius] = useState(400);
  const [error, setError] = useState(null);
  const [selectedPlaceType, setSelectedPlaceTypes] = useState('restaurant');
  const [activePlace, setActivePlace] = useState(null);
  const [planner, setPlanner] = useState([]);
  const [plannerName, setPlannerName] = useState('');
  const placeTypes = ['restaurant', 'cafe', 'park'];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    await fetchPlaces(lat, lng, radius, selectedPlaceType);
  };

  const handlePlaceTypeChange = (e) => {
    setSelectedPlaceTypes(e.target.value);
  };

  const fetchPlaces = async (lat, lng, radius, placeType) => {
    setError('');
    try {
      console.log(placeType);
      const response = await axios.post('http://localhost:4000/apiPlaces/places', { lat, lng, radius, placeType });
      setPlaces(response.data);
      console.log(places);
    } catch (error) {
      setError('Error fetching places: ' + error.message);
    }
  };

  const handlePlaceClick = (place) => {
    console.log(place);
    setActivePlace(place);
  };

  const handlePlaceTypeSelect = async (newPlaceType) => {
    if(activePlace) setPlanner((prevPlanner) => [...prevPlanner, activePlace]);
    setActivePlace(null); 
    const lat = selectedLocation ? selectedLocation.lat : currentLocation.lat;
    const lng = selectedLocation ? selectedLocation.lng : currentLocation.lng;
    console.log(planner);
    await fetchPlaces(lat, lng, radius, newPlaceType);
  };

  const savePlannerData = async () => {
    try {
      console.log(plannerName);
      const response = await axios.post('http://localhost:4000/plans/planner', { name: plannerName, planner });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving planner data:', error);
    }
  };
  const handlePlannerNameChange = (event) => {
    setPlannerName(event.target.value);
  };

  return (
    <div className="main-container">
      {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="place-container">
        <h3>Select Place Types</h3>
        <div>
        <label>Planner Name: </label>
        <input 
          type="text" 
          value={plannerName} 
          onChange={handlePlannerNameChange} 
          placeholder="Enter planner name" 
        />
      </div>
        <button onClick={savePlannerData}>Save Planner to Backend</button>
        {placeTypes.map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="placeType"
              value={type}
              checked={selectedPlaceType === type}
              onChange={handlePlaceTypeChange}
            />
            {type}
          </label>
        ))}
        <h3>Places</h3>
        {places.length === 0 && <p>No places found.</p>}
        {places.map((place, index) => (
          <div key={index} onClick={() => handlePlaceClick(place)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <h4>{place.name}</h4>
            {place.image && <img className="place-image" src={place.image} alt={place.name} />}
            <p>{place.vicinity}</p>
          </div>
        ))}
      </div>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          onClick={handleMapClick}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
            />
          ))}
          <Marker position={selectedLocation} />
          {activePlace && (
            <InfoWindow
              position={{
                lat: activePlace.geometry.location.lat,
                lng: activePlace.geometry.location.lng,
              }}
              onCloseClick={() => setActivePlace(null)}
            >
              <div>
                <h4>{activePlace.name}</h4>
                <img style={{width: '80%'}} src = {activePlace.image}></img>
                <p>{activePlace.vicinity}</p>
                <h5>Select a new place type:</h5>
                <select onChange={(e) => handlePlaceTypeSelect(e.target.value)} value={selectedPlaceType}>
                  <option value="">Select Place Type</option>
                  {placeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
