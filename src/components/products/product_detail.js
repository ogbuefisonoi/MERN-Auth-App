import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";
import {useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";

export default function Products_Details() {
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");

    const {_id} = useParams();
    // console.log(_id);

    const handleCancel = () => {
      history.push("/products/all")
    }

    const handleSubmit = () => {
      const regular_price = price;
      const updateProduct = { name, sku, stock, regular_price, _id };
      Axios.post(`${config.products_baseUrl}/updateProduct`, updateProduct).then(res=>{
        console.log("res",res.data)
      });
      history.push("/products/all")
    }

    const productShow = () => {
      Axios.get(`${config.products_baseUrl}/`+_id)
        .then((res)=>{
          setProduct(res.data);
          setName(res.data.name);
          setSku(res.data.sku);
          setStock(res.data.stock);
          setPrice(res.data.price);

          // console.log("res.data", res.data);   
        })
        .catch((err) => alert(err))
    }
    
    useEffect(() => {
      productShow()
    }, [])

    return (
        <div className="dashboard_container">
          <Breadcrumb />
          <DashNav />
          <div className="dashboard_content">
              <div className="w-2/5 float-left	">
                {/* <img src={product.images[0].src}></img> */}
              </div>
              <div className="w-2/5 float-right	">
                  <div className="m-8">
                      <label className="block">Name:</label> 
                      <input 
                      className="border-gray-200 text-gray-600	"
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      ></input>
                  </div>
                  <div className="m-8">
                      <label className="block">SKU:</label> 
                      <input 
                      className="border-gray-200 text-gray-600	"
                      type="text" 
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      ></input>
                  </div>
                  <div className="m-8">
                      <label className="block">Stock:</label> 
                      <input 
                      className="border-gray-200 text-gray-600	"
                      type="text" 
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      ></input>
                  </div>
                  <div className="m-8">
                      <label className="block">Price:</label> 
                      $<input 
                      className="border-gray-200 text-gray-600	"
                      type="text" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      ></input>
                  </div>
                  <div className="m-8">
                      <input className="w-2/5	border border-solid	border-gray-500 cursor-pointer"
                      type="button" value="Cancel" onClick={handleCancel}></input>
                      <input className="w-2/5	border border-solid	border-gray-500 m-2"
                      type="submit" value="Update" onClick={handleSubmit}></input>

                  </div>
              </div>  
          </div>
        </div>
      )
}