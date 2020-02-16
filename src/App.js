import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./index.scss"
import CreateRoom from './components/create-room/CreateRoom';

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

function RingRoom() {
  return (
    <div>
      <h2>RingRoom</h2>
    </div>
  );
}
