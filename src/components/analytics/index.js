import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";
import Salestotal from "./salestotal";

export default function() {
    
    return (
        <div className="dashboard_container">
          <Breadcrumb />
          <DashNav />
          <div className="dashboard_content">
            <Salestotal />
          </div>
        </div>
      )
}