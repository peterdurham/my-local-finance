import React, { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Portfolio from "./components/portfolio";

import Layout from "./components/layout";
import Stocks from "./components/assets/stocks";
import Stock from "./components/assets/stock";
import Cryptos from "./components/assets/cryptos";
import Crypto from "./components/assets/crypto";
import Currencies from "./components/assets/currencies";
import Settings from "./components/settings";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";

const App = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route exact path="/stocks">
            <Stocks searchText={searchText} setSearchText={setSearchText} />
          </Route>
          <Route path="/stocks/:id">
            <Stock />
          </Route>
          <Route exact path="/cryptos">
            <Cryptos searchText={searchText} setSearchText={setSearchText} />
          </Route>
          <Route path="/cryptos/:id">
            <Crypto />
          </Route>
          <Route path="/currencies">
            <Currencies />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
export default App;
