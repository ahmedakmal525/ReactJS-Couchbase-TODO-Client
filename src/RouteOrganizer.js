import React, { Component } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Login from './components/Login'
import Profile from './components/Profile'

class RouteOrganizer extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} strict component={Login}/>
          <Route path="/profile" exact={true} strict component={Profile}/>
        </div>
      </Router>
    );
  }
}

export default RouteOrganizer
