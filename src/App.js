import React, {useState, useEffect}  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// components
import About from './components/About';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RegConf from './components/RegConf';

import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import checkToken from './components/checkLoginStatus';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkToken()) setIsLoggedIn(true);
    else setIsLoggedIn(false);
    console.log("in app:", checkToken());
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav value={[isLoggedIn, setIsLoggedIn]}/>
        <div className="container text-break">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/about" component={(props) => <About {...props} value={isLoggedIn} />} />

            <Route path="/register" component={Register}/>
            <Route path="/confirmation" component={RegConf}/>

            <ProtectedRoute path="/user" component={(props) => <UserDashboard {...props} value={isLoggedIn} /> } /> 

            <Route path="/login" component={(props) => <Login {...props} value={setIsLoggedIn} /> }/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
