import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

// const useStyles = makeStyles((e) =>({
//     buttonPage:{
//         fontSize:"22px",
//         padding:"20px",
//         width:"max-content",
//         margin:"0 4px",
//         background:"#0000",
//         color:"white",
//         border:"none",
//         cursor:"pointer",
//         borderRadius:"50%",
//         backgroundColor:e.palette.primary.main,
//         "&:hover": {
//            // backgroundColor: e.palette.primary.light
//           },
       
// },
// button:{
//     fontSize:"22px",
//     padding:"20px",
//     width:"max-content",
//     margin:"0 4px",
//     background:"#0000",
//     border:"none",
//     cursor:"pointer",
//     color:e.palette.primary.dark,
//     borderRadius:"50%",
//     "&:hover": {
//         backgroundColor: e.palette.primary.light
//       },
   
// },

//  ul:{
//     width:"max-content",
//     listStyleType: "none",
//     display:"flex"
//  },
//  h2:{
//     color:"#aaa"
//  }
// }))

  //-----MUI Pagination----------------------
const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  //------------------------------------------


function Paginate({ prodPerPage, allProducts, paginate, pageN}) {

  const classes = useStyles();
  

  //-----MUI Pagination----------------------
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    console.log('value',value);
    setPage(value);
    paginate(value)
  };

  console.log('page',page);
  console.log('pageN',pageN);
  //------------------------------------------

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allProducts/prodPerPage); i++) {
        pageNumbers.push(i)
    }
    
   
    return (
  //-----MUI Pagination----------------------
        <div className={classes.root}>
            <Pagination 
                count={pageNumbers.length} 
                page={pageN} 
                onChange={handleChange}
                //onClick={() => paginate(page)} 
                color="primary"
                variant="outlined"
                size="large"
            />
        </div>
  //------------------------------------------
    
    //    <>
       
    //         <ul className={classes.ul}>
    //                 {
    //                     pageNumbers && pageNumbers.map(num => {
    //                      if (num === pageN){
    //                         return(<li key={num}>
    //                                 <button className={classes.buttonPage}
                                    
    //                                  onClick={() => paginate(num)}>{num}</button>
    //                             </li>)
                                
    //                     }
    //                         else if(num !== pageN){
    //                             return(
    //                                 <li key={num} >
    //                                 <button className={classes.button}
    //                                  onClick={() => paginate(num)}>{num}</button>
    //                             </li>
                                    
    //                             );     
                           
    //                     }})
    //                 }
    //             </ul>
    //             {/* <h2 className={classes.h2}>{pageN}</h2> */}
    //    </>
    )
}

export default Paginate
