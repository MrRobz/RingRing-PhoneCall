import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./index.scss"
import CreateRoom from './components/create-room/CreateRoom';
import RingRoom from './components/ring-room/RingRoom';

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ CreateRoom }/>
        <Route path="/room/:id" component={ RingRoom }/>
      </Switch>
    </Router>
  );
}
