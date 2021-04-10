import React, { useEffect, useState } from 'react';
import config from "../../config";
import Axios from "axios";
import DashNav from "../sections/DashNav";
import Breadcrumb from "../sections/breadcrumb";
import {CanvasJSChart} from 'canvasjs-react-charts'
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;


 
export default function Salestotal() {	
		
        const [salestotal, setSalestotal] = useState({});
        
        const analyticsShow = () => {
        Axios.get(`${config.reports_baseUrl}/sales`).then(
            (res)=>{
            setSalestotal(res.data[0])
            console.log(res.data);   
            }
        )
        }
        
        useEffect(() => {
            analyticsShow()
        },[])
        
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Sales Total"
			},
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ label: "Total Sales", y: parseFloat(salestotal.total_sales) },
					
					{ label: "Average Sales", y: parseFloat(salestotal.average_sales) }
				]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		);
	
}
 
