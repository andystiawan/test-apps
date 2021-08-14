import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Detail from "./details/Detail";
import Home from "./home/Home";


function Routes(){
    return(
        <Router>
          <Switch>
            <Route path="/detail/:id">
              <Detail/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    );
}

export default Routes;