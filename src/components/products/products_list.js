import React, { useEffect, useState } from "react";
import DashNav from "../DashNav";

export default function Products_List() {
  
  return (
    <>
      <div className="dashboard_container">
        <h2 className="navbar-text">Welcome! </h2>
            <DashNav />
        <div className="dashboard_content">
            <h1>Products List</h1>
            <p>Content goes here.</p>
        </div>
      </div>
      
    </>
  );
};