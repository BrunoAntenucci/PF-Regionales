import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';


const AdminAnalytics = () => {
    const [orderVendor, setorderVendor] = useState()
    useEffect( async () => {
    const response = await axios({
    method: "GET",
    withCredentials: true,
    url: '/analytics/forVendor/all'})
    
    setorderVendor(response.data)
    
    },[]) 
    console.log(orderVendor, "orderANALITICS")

    return(
    
    
    <div> 
        <div>
    <Doughnut 
     data={{labels: ['cantOrders', 'cantCreate', 'cantProcessing', 'cantComplete', 'cantCancelled'],
    datasets:[{
      label:"# of Orders",
      data:[orderVendor?.cantOrders, orderVendor?.cantCreate, orderVendor?.cantProcessing, orderVendor?.cantComplete, orderVendor?.cantCancelled],
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
      plugins: {
       title: {
           display: true,
           text: 'ORDENES-VENTAS',
           align: 'start',
           labels: {
               fontSize: 10
           }
           
             },
             legend: {
                 display: true,
                 position: 'left'
             }
   }
    }}
     />
        </div>
        <div> 
    <Doughnut 
     data={{labels: ['totalOrders','totalProcessing', 'totalComplete','totalCancelled'],
    datasets:[{
      label:"Pesos ($)",
      data:[orderVendor?.totalOrders, orderVendor?.totalProcessing, orderVendor?.totalComplete, orderVendor?.totalCancelled,],
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
           text: ' INGRESOS-VENTAS',
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


export default AdminAnalytics;