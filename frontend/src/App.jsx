import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
// import PlannerList from './components/Plan';
import SignUpPage from './pages/SignUpPage'
import Homepage from './pages/HomePage';
import './App.css';
const App = () => {
  return (
    <div className="App">
      <Homepage/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/map' element={<MapPage/>}/>
      </Routes>
    </div>
  );
};

export default App;