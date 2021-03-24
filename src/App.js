import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/header";
import Home from "./components/home";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import UserContext from "./context/userContext";
import { Redirect } from 'react-router';
import config from "./config";


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const authGuard = (Component) => () => {
    return localStorage.getItem("auth-token") ? (
      <Component />
    ) : (
      <Redirect to="/login" />
    );
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        `${config.baseUrl}/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(`${config.baseUrl}/`, {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" render={authGuard(Profile)} />
              <Route path="/dashboard" render={authGuard(Dashboard)}/>
              <Route path="/customers" render={authGuard(Dashboard)}/>

            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}