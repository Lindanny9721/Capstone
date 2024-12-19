import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import SignUpPage from './pages/SignUpPage'
import Homepage from './pages/HomePage';
import PlanListPage from './pages/PlanListPage';
import PlanDetailsPage from './pages/PlanDetailsPage';
import './App.css';
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/map' element={<MapPage/>}/>
        <Route path='/planlist' element={<PlanListPage/>}/>;
        <Route path="/plans/:planId" element={<PlanDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;