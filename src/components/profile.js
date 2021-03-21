import React, { useEffect, useState } from 'react';
import config from "../config";
import Axios from "axios";
import DashNav from "./DashNav";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    
    let header = {
      headers: {
        'x-auth-token': localStorage.getItem("auth-token"), 
      }
    }
    const profileShow = () => {
      Axios.get(`${config.baseUrl}/profile`,header).then(
        (res)=>{
          // console.log("profile show:", res.data)
          setUserName(res.data.userName)
          setUserEmail(res.data.email)
        }
      )
    }
    
    profileShow();

    const submit = () =>{

    }

      return (
        <div className="dashboard_container">
          <h2>Profile</h2>
          <DashNav />
          <div className="dashboard_content">
            <form className="form" onSubmit={submit}>
                <label>Username</label>
                <input
                  className="user-name"
                  type="text"
                  // onChange={(e) => setEmail(e.target.value)}
                  value={userName}
                />

                <label>Email</label>
                <input
                  className="user-email"
                  type="email"
                  // onChange={(e) => setPassword(e.target.value)}
                  value={userEmail}
                />
                <label>Password</label>
                <input
                  className="user-password"
                  type="password"
                  // onChange={(e) => setEmail(e.target.value)}
                  value=""
                />

                <input type="submit" value="Update" />
              </form>
          </div>
        </div>
      )
}