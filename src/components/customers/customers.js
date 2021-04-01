import React, { useEffect, useState } from "react";
import DashNav from "../sections/DashNav";
import config from "../../config";
import Breadcrumb from "../sections/breadcrumb";

export default function Customers() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    fetch(`${config.baseUrl}/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        setCustomers(data);
      });
  }, []);

  return (
    <>
      <div className="dashboard_container">
        <Breadcrumb />
        <h2 className="dashboard_navbar">Welcome! {customers?.user?.name}</h2>
            <DashNav />
        <div className="dashboard_content">
            <h1>{customers?.title}</h1>
            <p>{customers?.content}</p>
        </div>
      </div>
      
    </>
  );
};