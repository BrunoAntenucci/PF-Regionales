import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';






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

// ---------------------------------------- MENSUAL

    const [orderMensual, setOrderMensual] = useState()
    useEffect( async () => {
    const response = await axios({
    method: "POST",
    withCredentials: true,
    url: '/analytics/byUser/months',
    data: {
    "monthStart": 1,
    "monthEnd": 5,  
    }

})
    
    setOrderMensual(response.data)
    
    },[]) 
    console.log(orderMensual, "ORDERMENSUAL")
// ----------------------------------------------------

    
    return(
    <div> 
        <div>
    <Doughnut 
     data={{labels: ['cantOrders', 'cantCreate', 'cantProcessing', 'cantComplete', 'cantCancelled'],
    datasets:[{
      label:"# of Orders",
      data:[order?.cantOrders, order?.cantCreate, order?.cantProcessing, order?.cantComplete, order?.cantCancelled],
      backgroundColor: [
          'rgba(103, 175, 243, 0.6)',
          'rgba(171, 103, 243, 0.6)',
          'rgb(243, 171, 103)',
          'rgb(115, 241, 115)',
          'rgb(242, 42, 46)',
      ]
    }]}}
     height={350}
     width={300}
     options={{
       maintainAspectRatio:false,
       fontSize: 20,
       plugins: {
        title: {
            display: true,
            text: ' ORDENES',
            align: 'CENTER',
            labels: {
                fontSize: 10
            }
            
              },
    }
}}
     />
        </div>
        
        <div> 
    <Bar 
     data={{labels: ['totalOrders','totalProcessing', 'totalComplete','totalCancelled'],
    datasets:[{
      label:"Pesos ($)",
      data:[order?.totalOrders, order?.totalProcessing, order?.totalComplete, order?.totalCancelled,],
      backgroundColor: [
        'rgba(103, 175, 243, 0.6)',
        'rgb(243, 171, 103)',
        'rgb(115, 241, 115)',
        'rgb(242, 42, 46)',
    ],
    borderWidth: 1,

    }]}}
     height={350}
     width={300}
     options={{
      
       maintainAspectRatio:false,
       plugins: {
       title: {
            display: true,
            text: ' GASTADO',
            align: 'start'
            
              },
        legend: {
            display: true,
            position: 'left'
        }
        },
       
    }
    
}
     />
     </div>    
        
<div> 
<Line 
     data={{labels: ['cantOrders','totalProcessing', 'totalComplete','totalCancelled'],
    datasets:[{
      label:"Pesos ($)",
      data:[orderMensual?.totalOrders, orderMensual?.totalProcessing, orderMensual?.totalComplete, orderMensual?.totalCancelled,],
      backgroundColor: [
        'rgba(103, 175, 243, 0.6)',
        'rgb(243, 171, 103)',
        'rgb(115, 241, 115)',
        'rgb(242, 42, 46)',
    ],
    borderWidth: 1,

    }]}}
     height={350}
     width={300}
     options={{
       maintainAspectRatio:false,
       plugins: {
       title: {
            display: true,
            text: ' GASTADO MENSUAL',
            align: 'start'
            
              },
        legend: {
            display: true,
            position: 'left'
        }
        },
       
    }
    
}
     />
</div>
        
    </div>
    
    
    ) 
}


export default BarChart;