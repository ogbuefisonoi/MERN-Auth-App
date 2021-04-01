import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import ErrorNotice from "../services/ErrorNotice";
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/user.actions";

function Register(props) {
  const dispatch = useDispatch();

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
      const user = { email, password, passwordCheck, userName};
      
      dispatch(registerUser(user)).then(res =>{
        if(res.payload){
          localStorage.setItem("auth-token", res.data);
          props.history.push("/dashboard");
        }
        else{

        }
      })
      // localStorage.setItem("auth-token", loginRes.data.token);
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
        <div className="form-group">
            <div className="float-left">
              <span>Already have an account?</span>
            </div>
            <div className="float-right">
              <a href="/Login">Login</a>
            </div>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Register)
