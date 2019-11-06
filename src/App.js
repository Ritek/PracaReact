import React, {useState, useEffect}  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// components
import About from './components/About';
import NavBar from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import UserDashboard from './components/UserDashboard';
import EditProfie from './components/protected/EditProfile';

// authorization
import checkToken from './components/checkLoginStatus';
import ProtectedRoute from './components/ProtectedRoute';

// teacher
import TeacherDashboard from './components/protected/TeacherDashboard'

import CreateGroup from './components/teacher/groups/CreateGroup';
import ShowAllGroups from './components/teacher/groups/ShowAllGroups';
import EditGroup from './components/teacher/groups/EditGroup';
import CreateTest from './components/teacher/teachersTest/CreateTest';
import TestList from './components/teacher/teachersTest/TestList';

// student
import StudentDashboard from './components/protected/StudentDashboard'

import JoinGroup from './components/student/JoinGroup';
import SolveTest from './components/student/SolveTest';
import AssignedTests from './components/student/AssignedTests';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeLoginState = (newState) => {
    console.log('New state!!!');
    setIsLoggedIn(newState);
  }

  useEffect(() => {
    if (checkToken()) changeLoginState(true);
    else changeLoginState(false);
    //console.log("in app:", checkToken());
  }, []);

  return (
    <Router>
      <div className="App" style={{marginBottom: '100px'}}>
        <NavBar value={[isLoggedIn, setIsLoggedIn]}/>
        <div className="container text-break">
          <Switch>
          <Route path="/" exact component={Home}/>
            <Route path="/about" render={props => <About {...props} value={isLoggedIn} />} />

            <Route path="/register" component={Register}/>
            <Route path="/login" render={props => <Login {...props} onChange={setIsLoggedIn} />} />

            {/* protected routes */}
            <ProtectedRoute path="/user" exact component={UserDashboard} value={isLoggedIn} /> 
            <ProtectedRoute path="/edituser" exact component={EditProfie} />

            {/* teacher routes */}

            {/* <ProtectedRoute path="/user/creategroup" exact component={(props) => <CreateGroup {...props}  value={isLoggedIn} /> } /> */}
            <ProtectedRoute path="/user/teacherdashboard" exact component={TeacherDashboard} />

            <ProtectedRoute path="/user/creategroup" exact component={CreateGroup} />
            <ProtectedRoute path="/user/menagegroups" exact component={ShowAllGroups} />
            <ProtectedRoute path="/user/menagegroups/:id" component={EditGroup} />
            <ProtectedRoute path="/user/createtest" exact component={CreateTest} />
            <ProtectedRoute path="/user/edittest/:id" component={CreateTest} />
            <ProtectedRoute path="/user/testlist" component={TestList} />

            
            {/* student routes */}
            <ProtectedRoute path="/user/studentdashboard" exact component={StudentDashboard} />

            <ProtectedRoute path="/user/joingroup" exact component={JoinGroup} />
            <ProtectedRoute path="/user/solvetest" exact component={AssignedTests} />
            <ProtectedRoute path="/user/solvetest/:id" component={SolveTest} />
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
