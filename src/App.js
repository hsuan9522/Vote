import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.css";

import Vote from "./vote";
import Home from "./home";
import Result from "./result";

export default function App() {
  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/vote" exact component={Vote} />
          <Route path="/result" exact component={Result} />
        </Switch>
      </div>
    </Router>
  );
}
