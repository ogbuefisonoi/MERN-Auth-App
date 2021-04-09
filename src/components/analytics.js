import React, { useEffect, useState } from 'react';
import config from "../config";
import Axios from "axios";
import DashNav from "./sections/DashNav";
import Breadcrumb from "./sections/breadcrumb";

export default function Analytics() {
    const [sales, setSales] = useState([]);
    
    const analyticsShow = () => {
      Axios.get(`${config.users_baseUrl}/reports/sales`).then(
        (res)=>{
          setSales(res.data)   
        }
      )
    }
    
    const detailShow = () => {
      
    }
    useEffect(() => {
      analyticsShow()
    })

    return (
        <div className="dashboard_container">
          <Breadcrumb />
          <h2>Analytics</h2>
          <DashNav />
          <div className="dashboard_content">
            <table className="table-auto">
              <thead>
                {sales}
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
      )
}