import React, {useState}  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// components
import About from './components/About';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

// context hook
export const UserContext = React.createContext();
export const UserLoginContext = React.createContext();

function App() {
  const [user, setUser] = useState([]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="container text-break">
          <Switch>
            <UserContext.Provider value={user}>
              <Route path="/" exact component={Home}/>
              <Route path="/about" component={About} />
              <UserLoginContext.Provider value={setUser}>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
              </UserLoginContext.Provider>
            </UserContext.Provider>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
