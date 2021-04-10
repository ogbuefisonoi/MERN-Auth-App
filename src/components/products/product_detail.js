import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";
import {useParams} from "react-router-dom"

export default function Products_Details() {
    const [product, setProduct] = useState([]);
    const _id = useParams()
    console.log(_id);
    const productShow = () => {
      Axios.get(`${config.products_baseUrl}/`+_id).then(
        (res)=>{
          setProduct(res.data);
          console.log(res.data);   
        }
      )
    }
    
    const detailShow = () => {

    }
    useEffect(() => {
      productShow()
    })

    return (
        <div className="dashboard_container">
          <Breadcrumb />
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
                </tr>
              </thead>
              <tbody>
                  <tr className="border-b h-10 border-gray-200">
                    <td className="w-28	h-10 text-center">11</td>
                    <td className="w-96	h-10 text-center">{product.name}</td>
                    <td className="w-28	h-10 text-center">{product.sku}</td>
                    <td className="w-28	h-10 text-center">{product.stock}</td>
                    <td className="w-28	h-10 text-center">${product.price}</td>
                    <td className="w-28	h-10 text-center">
                      <img 
                      className="m-auto cursor-pointer hover:scale-110 motion-reduce:transform-none" 
                      src="https://img.icons8.com/android/24/000000/edit.png"
                      >
                      </img></td>
                  </tr>
             
              </tbody>
            </table>
          </div>
        </div>
      )
}