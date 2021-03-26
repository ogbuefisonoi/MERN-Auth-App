import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../DashNav";
import Breadcrumb from "../breadcrumb";

export default function Profile() {
    const [allproducts, setAllProducts] = useState("");
    
    const productShow = () => {
      Axios.get(`${config.baseUrl}/products/all`).then(
        (res)=>{
          setAllProducts(res.data)   
        }
      )
    }
    
    useEffect(() => {
      productShow()
    })

    return (
        <div className="dashboard_container">
          <Breadcrumb />
          <h2>Products List</h2>
          <DashNav />
          <div className="dashboard_content">
            <table class="table-auto">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Tags</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allproducts.map(product =>(
                  <tr>
                    <td>{product.image}</td>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td>{product.tags}</td>
                    <td>{product.date}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      )
}