import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";

export default function Header() {
    const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const login = () => history.push("/login");
  const dashboard = () => history.push("/dashboard");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">MERN Auth App</h1>
      </Link>
        <nav className="auth-options">
            {userData.user ? (
                <>
                <button onClick={dashboard}>Dashboard</button>
                <button onClick={logout}>Log out</button>
                </>
            ) : (
                <>
                <button onClick={login}>Log in</button>
                </>
            )}
        </nav>
    </header>
  );
}