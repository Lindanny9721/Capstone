import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');
  const [editingPlan, setEditingPlan] = useState(null);
  const [newName, setNewName] = useState('');

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
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Error fetching plans.');
    }
  };
  
  const handleEditClick = (plan) => {
    setEditingPlan(plan);
    setNewName(plan.name);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdatePlanName = async () => {
    if (!newName) {
      setError('Plan name cannot be empty.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/plans/planner/${editingPlan._id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlans(plans.map(plan => 
        plan._id === editingPlan._id ? { ...plan, name: newName } : plan
      ));
      setEditingPlan(null);
      setNewName('');
      setError('');
    } catch (error) {
      console.error('Error updating plan:', error);
      setError('Error updating plan.');
    }
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
    setNewName('');
    setError('');
  };
  const handleDelete = async (planId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/plans/planner/${planId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setPlans(plans.filter(plan => plan._id !== planId));
    } catch (error) {
      console.error('Error deleting plan:', error);
      setError('Error deleting plan.');
    }
  };

  return (
    <div className="plan-container">
      <h3>Your Plans</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="plan-info">
        <h4>Total Plans: {plans.length}</h4>
        {plans.map((plan, index) => (
          <div key={index} className="plan-item">
            {editingPlan && editingPlan._id === plan._id ? (
              <div>
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  placeholder="Enter new name"
                />
                <button onClick={handleUpdatePlanName}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <Link to={`/plans/${plan._id}`} className="plan-link">
                <p>{plan.name} - {plan.places.length} places</p>
                </Link>
                <button onClick={() => handleEditClick(plan)}>Edit</button>
              </>
            )}
            <button 
              onClick={() => handleDelete(plan._id)} 
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanList;
