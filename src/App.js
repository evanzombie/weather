import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Landing from "./components/Landing";
import Detail from "./components/Detail";
import "./App.css";

const cities = ["newyork", "london", "berlin", "beijing", "mexicocity"];

const FourOhFour = () => (
  <div className="centerArea " style={{ color: "white" }}>
    <h1>404</h1> <h1>Oops... Page Not Found!</h1>
  </div>
);

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        {/*<Route path="/details/:city" component={() => <Detail />}  />*/}
        <Route
          path="/details/:city"
          component={({ match }) => {
            if (
              cities.find(city => {
                return city === match.params.city;
              })
            ) {
              return <Detail city={match.params.city} />;
            } else {
              return <FourOhFour />;
            }
          }}
        />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
