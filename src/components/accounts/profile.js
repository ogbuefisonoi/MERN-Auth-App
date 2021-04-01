import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";

export default function Profile() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    let header = {
      headers: {
        'x-auth-token': localStorage.getItem("auth-token"), 
      }
    }
    const profileShow = () => {
      Axios.get(`${config.baseUrl}/accounts/profile`,header).then(
        (res)=>{
          // console.log("profile show:", res.data)
          setUserName(res.data.userName)
          setEmail(res.data.email)
        }
      )
    }
    
    const profileUpdate = () => {
      const updateUser = { email, password, userName };
      Axios.post(`${config.baseUrl}/editProfile`, updateUser);

    }

    useEffect(() => {
      profileShow()
    })

    const submit = () =>{
      if( password === checkPassword)
        profileUpdate();
    }

      return (
        <div className="dashboard_container">
          <Breadcrumb />
          <h2>Profile</h2>
          <DashNav />
          <div className="dashboard_content">
            <form className="form" onSubmit={submit}>
                <label>Email</label>
                <input
                  className="text-gray-500"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled = "disabled"

                />

                <label>Username</label>
                <input
                  className="user-name"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />

                <label>Password</label>
                <input
                  className="user-password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label>Confirm Password</label>
                <input
                  className="user-password"
                  type="password"
                  onChange={(e) => setCheckPassword(e.target.value)}
                  value={checkPassword}
                />

                <input type="submit" value="Update" />
              </form>
          </div>
        </div>
      )
}