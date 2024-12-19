import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlanDetails = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPlanDetails();
  }, [planId]);

  const getPlanDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to be logged in to view this plan.');
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plans/planner/${planId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlan(response.data);
    } catch (error) {
      console.error('Error fetching plan details:', error);
      setError('Error fetching plan details.');
    }
  };

  return (
    <div className="plan-details-container">
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {plan ? (
        <div>
          <h3>{plan.name}</h3>
          <p>{plan.places.length} places</p>
          <ul>
            {plan.places.map((place, index) => (
              <li key={index}>
                {place.name} - {place.vicinity}
                <img src={place.image} alt={place.name} />
                <p>Rating: {place.rating}</p>
                <p>Total Rating: {place.user_ratings_total} </p>
                
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlanDetails;
