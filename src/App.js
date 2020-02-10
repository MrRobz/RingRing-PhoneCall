import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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

function CreateRoom() {
  return (
    <div>
      <h2>CreateRoom</h2>
    </div>
  );
}

function RingRoom() {
  return (
    <div>
      <h2>RingRoom</h2>
    </div>
  );
}
