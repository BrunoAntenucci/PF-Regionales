import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

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
    <Bar 
     data={{labels: ['Orders', 'Total', 'Yellow'],
    datasets:[{
      label:"# of Orders",
      data:[order?.cantOrders,order?.totalOrders,16]
    }]}}
     height={350}
     width={300}
     options={{
       maintainAspectRatio:false
     }}
     />
    {/* {order &&(order.cantOrders)}
    {order &&(order.totalOrders)}
    {order &&(order.totalCreate)}
    {order &&(order.totalProcessing)}
    {order &&(order.totalComplete)}
    {order &&(order.totalCancelled)}
    {order &&(order.cantCreate)}
    {order &&(order.cantProcessing)}
    {order &&(order.cantComplete)}
    {order &&(order.cantCancelled)} */}
        
        
    </div>
    
    
    ) 
}


export default BarChart;