import React, { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

export default function Header() {
  // const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const [isUser, setUser] = useState(false)
  const login = () => history.push("/login");
  const dashboard = () => history.push("/dashboard");
  const logout = () => {
    history.push("/login");
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    if(localStorage.getItem("auth-token").length>0) setUser(true)
    console.log("isUser", isUser);
  }, [localStorage.getItem("auth-token")])
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