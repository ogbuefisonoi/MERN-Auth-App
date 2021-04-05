import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";

export default function Products_List() {
    const [allproducts, setAllProducts] = useState([]);
    
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
                  <th className="w-28	text-center">Image</th>
                  <th className="w-28	text-center">Name</th>
                  <th className="w-28	text-center">SKU</th>
                  <th className="w-28	text-center">Stock</th>
                  <th className="w-28	text-center">Price</th>
                  <th className="w-28	text-center">Tags</th>
                  <th className="w-28	text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {allproducts.map(product =>(
                  <tr>
                    <td className="w-28	text-center"><img src={product.images[0].src}></img></td>
                    <td className="w-28	text-center">{product.name}</td>
                    <td className="w-28	text-center">{product.sku}</td>
                    <td className="w-28	text-center">{product.stock}</td>
                    <td className="w-28	text-center">${product.price}</td>
                    <td className="w-28	text-center">{product.tags}</td>
                    <td className="w-28	text-center">{product.date}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      )
}