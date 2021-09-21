import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';


const BarChart = () => {
    const [order, setOrder] = useState()
    useEffect( async () => {
    const response = await axios({
    method: "GET",
    withCredentials: true,
    url: '/analytics/byUser/all'})
    
    setOrder(response.data)
    
    },[]) 
    console.log(order, "orderANALITICS")

    return(
    
    
    <div> 
        <div>
    <Doughnut 
     data={{labels: ['cantOrders', 'cantCreate', 'cantProcessing', 'cantComplete', 'cantCancelled'],
    datasets:[{
      label:"# of Orders",
      data:[order?.cantOrders, order?.cantCreate, order?.cantProcessing, order?.cantComplete, order?.cantCancelled]
    }]}}
     height={350}
     width={300}
     options={{
       maintainAspectRatio:false
     }}
     />
        </div>
        <div> 
    <Bar 
     data={{labels: ['totalOrders','totalProcessing', 'totalComplete','totalCancelled'],
    datasets:[{
      label:"Pesos ($)",
      data:[order?.totalOrders, order?.totalProcessing, order?.totalComplete, order?.totalCancelled,]
    }]}}
     height={350}
     width={300}
     options={{
       maintainAspectRatio:false
     }}
     />
     </div>
    {/* {order &&(order.cantOrders)}
    {order &&(order?.totalOrders)}
    {order &&(order?.totalCreate)}
    {order &&(order?.totalProcessing)}
    {order &&(order?.totalComplete)}
    {order &&(order?.totalCancelled)}
    {order &&(order?.cantCreate)}
    {order &&(order?.cantProcessing)}
    {order &&(order?.cantComplete)}
    {order &&(order?.cantCancelled)} */}
        
        
    </div>
    
    
    ) 
}


export default BarChart;