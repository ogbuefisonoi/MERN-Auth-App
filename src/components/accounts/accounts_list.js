import React, {  } from "react";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";

export default function Accounts_List() {
  
  return (
    <>
      <div className="dashboard_container">
      <Breadcrumb />

        <h2 className="navbar-text">Welcome! </h2>
            <DashNav />
        <div className="dashboard_content">
            <h1>Accounts List</h1>
            <p>Content goes here.</p>
        </div>
      </div>
      
    </>
  );
};