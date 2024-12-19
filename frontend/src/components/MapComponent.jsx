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
  const [placeTypes, setPlaceTypes] = useState(['restaurant', 'cafe', 'park']);
  const [newPlaceType, setNewPlaceType] = useState('');

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/apiPlaces/places`, { lat, lng, radius, placeType });
      setPlaces(response.data);
    } catch (error) {
      setError('Error fetching places: ' + error.message);
    }
  };

  const handlePlaceClick = (place) => {
    setActivePlace(place);
  };

  const handlePlaceTypeSelect = async (newPlaceType) => {
    setSelectedPlaceTypes(newPlaceType);
    if(activePlace) setPlanner((prevPlanner) => [...prevPlanner, activePlace]);
    setActivePlace(null); 
    const lat = selectedLocation ? selectedLocation.lat : currentLocation.lat;
    const lng = selectedLocation ? selectedLocation.lng : currentLocation.lng;
    await fetchPlaces(lat, lng, radius, newPlaceType);
  };

  const savePlannerData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to be logged in to save your plans.');
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/plans/planner`, 
        { name: plannerName, planner },
        { headers: {Authorization: `Bearer ${token}`}}
      );
    } catch (error) {
      console.error('Error saving planner data:', error);
    }
  };
  const handlePlannerNameChange = (event) => {
    setPlannerName(event.target.value);
  };
  const handleAddPlaceType = () => {
    if (newPlaceType && !placeTypes.includes(newPlaceType)) {
      setPlaceTypes((prevTypes) => [...prevTypes, newPlaceType]);
      setNewPlaceType('');
    } else {
      setError('Please enter a valid and unique place type');
    }
  };

  return (
    <div className="main-container">
      {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="left-container">
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
        <div>
          <label>Add a New Place Type:</label>
          <input
            type="text"
            value={newPlaceType}
            onChange={(e) => setNewPlaceType(e.target.value)}
            placeholder="Enter new place type"
          />
          <button onClick={handleAddPlaceType}>Add Place Type</button>
        </div>
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
          <div className= "place-container" key={index} onClick={() => handlePlaceClick(place)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
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
