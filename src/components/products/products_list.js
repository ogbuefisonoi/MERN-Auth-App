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
            <table className="table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-28	text-center"></th>
                  <th className="w-96	text-center">Name</th>
                  <th className="w-28	text-center">SKU</th>
                  <th className="w-28	text-center">Stock</th>
                  <th className="w-28	text-center">Price</th>
                  <th className="w-28	text-center">Preview</th>
                </tr>
              </thead>
              <tbody>
                {allproducts.map(product =>(
                  <tr className="border-b h-10 border-gray-200">
                    <td className="w-28	h-10 text-center"><img src={product.images[0].src}></img></td>
                    <td className="w-96	h-10 text-center">{product.name}</td>
                    <td className="w-28	h-10 text-center">{product.sku}</td>
                    <td className="w-28	h-10 text-center">{product.stock}</td>
                    <td className="w-28	h-10 text-center">${product.price}</td>
                    <td className="w-28	h-10 text-center"><img className="m-auto cursor-auto" src="https://img.icons8.com/material-rounded/24/000000/preview-pane.png"></img></td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      )
}