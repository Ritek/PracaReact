import React, {useState, useEffect, useContext}  from 'react';
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

import SeeSolved from './components/teacher/solvedTests/SeeSolved';
import GradeTest from './components/teacher/solvedTests/GradeTest';

// student
import StudentDashboard from './components/protected/StudentDashboard'

import JoinGroup from './components/student/JoinGroup';
import SolveTest from './components/solveTest/SolveTest';
import AssignedTests from './components/student/AssignedTests';
import CheckGraded from './components/solveTest/CheckGraded';
import CheckErrors from './components/solveTest/CheckErrors';


import {AuthContext} from './components/AuthContext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <Router>
      <div className="App" style={{marginBottom: '100px'}}>
          <NavBar value={[isLoggedIn, setIsLoggedIn]}/>
        <div className="container text-break">  
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/about" component={About} />

            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login} />

            {/* protected routes */}
            <ProtectedRoute path="/user" exact component={UserDashboard} /> 
            <ProtectedRoute path="/edituser" exact component={EditProfie}/>

            {/* teacher routes */}
            {/* <ProtectedRoute path="/user/creategroup" exact component={(props) => <CreateGroup {...props}  value={isLoggedIn} /> } /> */}
            <ProtectedRoute path="/user/teacherdashboard" exact component={TeacherDashboard} />

            <ProtectedRoute path="/user/creategroup" exact component={CreateGroup} />
            <ProtectedRoute path="/user/menagegroups" exact component={ShowAllGroups} />
            <ProtectedRoute path="/user/menagegroups/:id" component={EditGroup} />
            <ProtectedRoute path="/user/createtest" exact component={CreateTest} />
            <ProtectedRoute path="/user/edittest/:id" component={CreateTest} />
            <ProtectedRoute path="/user/testlist" component={TestList} />

            <ProtectedRoute path="/user/allsolvedtests" exact component={SeeSolved} />
            {/* <ProtectedRoute path="/user/allsolvedtests/:id" component={GradeTest} /> */}

            
            {/* student routes */}
            <ProtectedRoute path="/user/studentdashboard" exact component={StudentDashboard} />

            <ProtectedRoute path="/user/joingroup" exact component={JoinGroup} />
            <ProtectedRoute path="/user/solvetest" exact component={AssignedTests} />
            <ProtectedRoute path="/user/solvetest/:id" component={SolveTest} />
            <ProtectedRoute path="/user/checkgraded" exact component={CheckGraded} />
            <ProtectedRoute path="/user/checkgraded/:id" component={CheckErrors} />
            
          </Switch>
        </div>
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
