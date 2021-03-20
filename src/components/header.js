import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";

export default function Header() {
    const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const profile = () => history.push("/profile");
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
                <button onClick={logout}>Log out</button>
                <button onClick={profile}>Profile</button>
                </>
            ) : (
                <>
                <button onClick={register}>Register</button>
                <button onClick={login}>Log in</button>
                </>
            )}
        </nav>
    </header>
  );
}