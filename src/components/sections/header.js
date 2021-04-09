import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Header() {
  // const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const [isUser, setUser] = useState(false)
  const login = () => history.push("/login");
  const dashboard = () => history.push("/dashboard");
  const logout = () => {
    alert("Do you want to logout?");
    history.push("/login");
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    if(localStorage.getItem("auth-token")) {
      setUser(true)
    }
    else
    {
      setUser(false)
    }
    console.log("isUser", isUser);
  })
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">MERN Auth App</h1>
      </Link>
        <nav className="auth-options">
            {isUser ? (
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