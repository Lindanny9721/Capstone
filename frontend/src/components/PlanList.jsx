import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserPlans();
  }, []);

  const getUserPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to be logged in to view your plans.');
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plans/planner`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Error fetching plans.');
    }
  };

  return (
    <div className="plan-container">
      <h3>Your Plans</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="plan-info">
        <h4>Total Plans: {plans.length}</h4>
        {plans.map((plan, index) => (
          <Link to={`/plans/${plan._id}`} key={index} className="plan-item">
            <p>{plan.name} - {plan.places.length} places</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlanList;
