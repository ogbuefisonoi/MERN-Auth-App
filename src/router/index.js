import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "../components/sections/header";
import Home from "../components/pages/home";
import Login from "../components/pages/login";
import Register from "../components/pages/register";
import Dashboard from "../components/dashboard";
import UserContext from "../context/userContext";
import { Redirect } from 'react-router';
import config from "../config";
import Forgot_Password from "../components/pages/forgot_password";
import Analytics from "../components/analytics";
import Accounts_List from "../components/accounts/accounts_list";
import Profile from "../components/accounts/profile";
import Accounts_Add from "../components/accounts/account_add";
import Rep_Management from "../components/rep_management"
import Products_List from "../components/products/products_list";
import Product_Detail from "../components/products/product_detail";
import Product_Add from "../components/products/product_add";
import Customers from "../components/customers/customers";
import Projects from "../components/customers/projects";
import Members from "../components/customers/members";

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
              <Route path="/accounts/profile" render={authGuard(Profile)} />
              <Route path="/dashboard" render={authGuard(Dashboard)}/>
              <Route path="/forgot_password" component={Forgot_Password}/>
              <Route path="/analytics" render={authGuard(Analytics)}/>
              <Route path="/accounts/all" render={authGuard(Accounts_List)}/>
              <Route path="/accounts/add" render={authGuard(Accounts_Add)}/>
              <Route path="/rep_management" render={authGuard(Rep_Management)}/>
              <Route path="/products/all" render={authGuard(Products_List)}/>
              <Route path="/products/detail" render={authGuard(Product_Detail)}/>
              <Route path="/products/add" render={authGuard(Product_Add)}/>
              <Route path="/customers" render={authGuard(Customers)}/>
              <Route path="/customers/projects" render={authGuard(Projects)}/>
              <Route path="/customers/members" render={authGuard(Members)}/>
              <Route path="/tokenIsValid" componenet={Login}/>
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}