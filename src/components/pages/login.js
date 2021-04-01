import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import ErrorNotice from "../services/ErrorNotice";
import { loginUser } from "../../actions/user.actions";
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";

// import StyledForm from "../styles";

function Login(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  // const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      
      dispatch(loginUser(user)).then(res =>{
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
    <div className="login_section">
      <h2 className="title">Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      {/* <StyledForm> */}
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div> 

          <input type="submit" value="Log In" />
          
          <div className="form-group">
            <div className="float-left">
              <a href="/forgot_password">Forgot password?</a>
            </div>
            <div className="float-right">
              <a href="/register">Signup</a>
            </div>
          </div>
        </form>
        
      {/* </StyledForm> */}
      
    </div>
  );
}

export default withRouter(Login);

