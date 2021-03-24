import React, { useEffect, useState } from 'react';
import config from "../config";
import Axios from "axios";
import DashNav from "./DashNav";
import { useHistory } from "react-router-dom";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let header = {
      headers: {
        'x-auth-token': localStorage.getItem("auth-token"), 
      }
    }
    const profileShow = () => {
      Axios.get(`${config.baseUrl}/profile`,header).then(
        (res)=>{
          // console.log("profile show:", res.data)
          setName(res.data.userName)
          setEmail(res.data.email)
        }
      )
    }
    
    const profileUpdate = () => {
      var self = this;
      Axios.post('/updateProfile', {
        name: name,
        password: password
      })
      .then(function (response) {
        if(response){
          // history.push('/')  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }

    useEffect(() => {
      profileShow()
    }, [])

    const submit = () =>{
      profileUpdate();
    }

      return (
        <div className="dashboard_container">
          <h2>Profile</h2>
          <DashNav />
          <div className="dashboard_content">
            <form className="form" onSubmit={submit}>
                <label>Email</label>
                <input
                  className="user-email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled = "disabled"

                />

                <label>Username</label>
                <input
                  className="user-name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                <label>Password</label>
                <input
                  className="user-password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value="password"
                />

                <input type="submit" value="Update" />
              </form>
          </div>
        </div>
      )
}