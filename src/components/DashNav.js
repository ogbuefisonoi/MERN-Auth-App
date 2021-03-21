import { useHistory } from "react-router-dom";
import config from "../config";
import React, { useEffect, useState } from "react";


export default function DashNav() {
    // const [dashboard, setDashboard] = useState(null);
    const profile = () => history.push("/profile");
    const dashboard = () => history.push("/dashboard");
    const logout = () => {
        /* eslint-disable */
        const toLogout = confirm("Are you sure to logout ?");
        /* eslint-enable */
        if (toLogout) {
          localStorage.clear();
          history.push("/login");
        }
      };
    
    const history = useHistory();

    return(
        <nav className="navbar_container">
          <ul className="navbar-nav">
          <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={() => dashboard()}
              >
                Dashboard
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={() => profile()}
              >
                Profile
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </span>
            </li>
          </ul>
        </nav>
    )
}
