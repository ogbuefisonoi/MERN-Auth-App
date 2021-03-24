import { useHistory } from "react-router-dom";
import React from "react";


export default function DashNav() {
    const profile = () => history.push("/profile");
    const dashboard = () => history.push("/dashboard");
    const customers = () => history.push("/customers")
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
                onClick={() => customers()}
              >
                Customers
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={() => profile()}
              >
                Account
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
