import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTransfer from "./components/AddTransfer";
import Transfer from "./components/Transfer";
import ListTransfer from "./components/ListTransfer";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/transfers"} className="navbar-brand">
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/transfers"} className="nav-link">
                Transfers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addtransfer"} className="nav-link">
                New Transfer
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/transfers"]} component={ListTransfer} />
            <Route exact path="/addtransfer" component={AddTransfer} />            
            <Route path="/transfers/:id" component={Transfer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
