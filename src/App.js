import logo from './logo.svg';
import './App.css';

import Navbar from './component/navbar';
import AdminScreen from './screens/adminScreen';
import HomeScreen from './screens/homeScreen';
import {BrowserRouter, Route, Link} from "react-router-dom";
import LandingScreen from './screens/landingScreen';
import BookingScreen from './screens/bookingScreen';
import Login from './screens/login';
import Register from './screens/register';
import ProfileScreen from './screens/profileScreen';

function App() {
  return (
    <div className="App">
    
      <Navbar/>
     <BrowserRouter>
     <Route path="/home" exact component={HomeScreen} />
     <Route path="/admin" exact component={AdminScreen} />
     <Route path="/" exact component={LandingScreen} />
     <Route path="/book/:roomid/:fromdate/:todate" exact component={BookingScreen} />
     <Route path="/login" exact component={Login} />
     <Route path="/register" exact component={Register} />
     <Route path="/profile" exact component={ProfileScreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
