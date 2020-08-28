import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";

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
import TodoList from "./components/todoList";
import isEmpty from "./utils/is-empty";

import { GET_PORTFOLIO } from "./queries";

const App = (props) => {
  const [searchText, setSearchText] = useState("");
  const [auth, setAuth] = useState({ isAuthenticated: false, user: {} });

  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    skip: !auth.isAuthenticated,
  });

  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
      setAuth({
        user: decoded,
        isAuthenticated: !isEmpty(decoded),
      });
    }
  }, []);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Router>
      <Layout auth={auth} setAuth={setAuth}>
        {/* <TodoList auth={auth} /> */}
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/portfolio">
            {auth.isAuthenticated && !loading ? (
              <Portfolio auth={auth} portfolio={data.portfolio} />
            ) : (
              <span>Please log in</span>
            )}
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
            {auth.isAuthenticated && !loading ? (
              <Currencies
                auth={auth}
                data={data.portfolio.currencies}
                portfolioLoading={loading}
              />
            ) : (
              <div>Please log in</div>
            )}
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/signup">
            <Signup setAuth={setAuth} />
          </Route>
          <Route path="/login">
            <Login setAuth={setAuth} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
export default App;
