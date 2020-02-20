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
        <Route exact path="/">
          <CreateRoom />
        </Route>
        <Route path="/room/:id">
          <RingRoom />
        </Route>
      </Switch>
    </Router>
  );
}
