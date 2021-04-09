import React, { useState } from "react";
import Axios from "axios";
import ErrorNotice from "../services/ErrorNotice";
import config from "../../config";
import { useHistory } from "react-router-dom";

// import StyledForm from "../styles";

export default function Forgot_Password() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try{
        await Axios.post(`${config.users_baseUrl}/forgot_password`, email)
            .then(
                // setError("Sent successfully!");
                history.push('/login')
                );
    }
    catch(err){
        err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="login_section py-20">
      <p className="max-w-sm p-4 m-auto text-gray-500">Please enter your username or email address. You will receive an email message with instructions on how to reset your password.</p>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      {/* <StyledForm> */}
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="login-email">Enter your Email</label>
            <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          
          <input type="submit" value="Submit" />
          
          <div className="form-group">
            <div className="float-left">
              <a href="/login">Login?</a>
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


