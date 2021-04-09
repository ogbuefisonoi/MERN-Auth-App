import React, { useEffect, useState } from "react";
import DashNav from "./sections/DashNav";
import config from "../config";
import Breadcrumb from "./sections/breadcrumb";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetch(`${config.users_baseUrl}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        setDashboard(data);
      });
  }, []);

  return (
    <>
      <div className="dashboard_container">
        <Breadcrumb />
        <h2 className="navbar-text">Welcome! {dashboard?.user?.name}</h2>
            <DashNav />
        <div className="dashboard_content">
            <h1>{dashboard?.title}</h1>
            <p>{dashboard?.content}</p>
        </div>
      </div>
      
    </>
  );
};