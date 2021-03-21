import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import Axios from "axios";
import ErrorNotice from "./ErrorNotice";
import config from "../config";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [userName, setUserName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, userName };
      await Axios.post(`${config.baseUrl}/register`, newUser);
      const loginRes = await Axios.post(`${config.baseUrl}/login`, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/dashboard");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="register_section">
      <h2 className="title">Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="register-password">Confirm Your Password</label>
        <input
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-user-name">User name</label>
        <input
          id="register-user-name"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}