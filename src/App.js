import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Exam from "./Exam";
import "./style.css";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Exam</Link>
            </li>
            <li>
              <Link to="/record">Record</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/record">
            <Record />
          </Route>
          <Route path="/">
            <Exam />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Record() {
  return <h2>Record</h2>;
}

