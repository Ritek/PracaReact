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

// teacher
import CreateGroup from './components/teacher/CreateGroup';
import MenageGroup from './components/teacher/MenageGroup';

// student
import JoinGroup from './components/student/JoinGroup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkToken()) setIsLoggedIn(true);
    else setIsLoggedIn(false);
    //console.log("in app:", checkToken());
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


            <Route path="/login" component={Login} value={setIsLoggedIn} />

            {/* protected routes */}
            <ProtectedRoute path="/user" exact component={UserDashboard} value={isLoggedIn} /> 

            {/* teacher routes */}
            {/* <ProtectedRoute path="/user/creategroup" exact component={(props) => <CreateGroup {...props}  value={isLoggedIn} /> } /> */}
            <ProtectedRoute path="/user/creategroup" exact component={CreateGroup} value={isLoggedIn} />
            <ProtectedRoute path="/user/menagegroups" exact component={MenageGroup} value={isLoggedIn} />
            
            {/* student routes */}
            <ProtectedRoute path="/user/joingroup" exact component={JoinGroup} value={isLoggedIn} />

            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
