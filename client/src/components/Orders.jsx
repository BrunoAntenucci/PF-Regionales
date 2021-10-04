import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getAllOrders, completeOrder, cancelOrder, deleteOrder, getOrderByStatus } from '../actions';
import Notification from './Notification';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OrderDetail from './OrderDetail';


const columns = [
    { id: 'order_id', label: 'Order Id', minWidth: 170, align: 'center' },
    { id: 'owner', label: 'Owner', minWidth: 100, align: 'center' },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'complete_button',
      label: '',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'cancel_button',
      label: '',
      minWidth: 100,
      align: 'center',
    },
    {
        id: 'delete_button',
        label: '',
        minWidth: 100,
        align: 'center',
      }
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

const Orders = () => {

  const classes = useStyles();
  const allOrders = useSelector(state => state.orders);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const dispatch = useDispatch();
  const [idOrder, setIdOrder] = React.useState("")
    
  const handleComplete = async (id) => {
        await dispatch(completeOrder(id));
        setNotify({
          isOpen: true,
          message: 'Orden aceptada',
          type: 'success'
      })
        await dispatch(getAllOrders());
    }

  const handleCancel = async (id) => {
      await dispatch(cancelOrder(id));
      setNotify({
        isOpen: true,
        message: 'Orden cancelada',
        type: 'error'
    })
      await dispatch(getAllOrders());
  }

  const handleDelete = async (id) => {
      await dispatch(deleteOrder(id));
      setNotify({
        isOpen: true,
        message: 'Orden eliminada',
        type: 'error'
    })
      await dispatch(getAllOrders());
  }


  const [status, setStatus] = React.useState('');

  const handleChange = (e) => {
    console.log('handleChange',e.target.value);
    e.preventDefault();
    setStatus(e.target.value);
    dispatch(getOrderByStatus(e.target.value));
  };

  const handleOrderDetailonClick = (e) => {
    // console.log("handlerdetail",e.target.outerText)
      e.preventDefault()
      setIdOrder(e.target.outerText)
      //setIdOrder(e.target.value)
  }

  let arr = [];
  allOrders.forEach(order => {
      arr.push({
          order_id: order._id, 
          owner: order.owner, 
          status: order.status,
      });
  });
    
    //console.log('array',arr);

  function createData(order_id, owner, status, complete_button, cancel_button, delete_button ) {
      return { order_id, owner, status, complete_button, cancel_button, delete_button };
    }

  let rows = [];
  for (let i = 0; i < arr.length; i++) {
      rows.push(createData(
          <p name={arr[i].order_id}
          style={{cursor:"pointer"}}
            onClick={(e) => handleOrderDetailonClick(e)}>{arr[i].order_id}</p>, 
          arr[i].owner, 
          arr[i].status, 
          <Button variant="outlined" color="success" onClick={() => handleComplete(arr[i].order_id)}>Aceptar</Button>,
          <Button variant="outlined" color="error" onClick={() => handleCancel(arr[i].order_id)}>Cancelar</Button>,
          <Button variant="outlined" color="secondary" onClick={() => handleDelete(arr[i].order_id)}>Eliminar</Button>
      ));
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


    return (
      <>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Orders</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value='Todas'>Todas</MenuItem>
          <MenuItem value='Creada'>Creada</MenuItem>
          <MenuItem value='Procesando'>Procesando</MenuItem>
          <MenuItem value='Cancelada'>Cancelada</MenuItem>
          <MenuItem value='Completa'>Completa</MenuItem>
        </Select>
      </FormControl>
    </Box>
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <OrderDetail idOrder ={idOrder}/>
      <Notification
          notify={notify}
          setNotify={setNotify}
      />
      </>
    )
}

export default Orders



//------------------OPCION 1 NO ANDA ESTA SHIT----------------------------------
// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import {
//   DataGrid,
//   GridToolbarDensitySelector,
//   GridToolbarFilterButton,
// } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import ClearIcon from '@mui/icons-material/Clear';
// import SearchIcon from '@mui/icons-material/Search';
// import { createTheme } from '@mui/material/styles';
// import { createStyles, makeStyles } from '@mui/styles';
// import Button from '@mui/material/Button';


// function escapeRegExp(value) {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// }

// const defaultTheme = createTheme();
// const useStyles = makeStyles(
//   (theme) =>
//     createStyles({
//       root: {
//         padding: theme.spacing(0.5, 0.5, 0),
//         justifyContent: 'space-between',
//         display: 'flex',
//         alignItems: 'flex-start',
//         flexWrap: 'wrap',
//       },
//       textField: {
//         [theme.breakpoints.down('xs')]: {
//           width: '100%',
//         },
//         margin: theme.spacing(1, 0.5, 1.5),
//         '& .MuiSvgIcon-root': {
//           marginRight: theme.spacing(0.5),
//         },
//         '& .MuiInput-underline:before': {
//           borderBottom: `1px solid ${theme.palette.divider}`,
//         },
//       },
//     }),
//   { defaultTheme },
// );

// function QuickSearchToolbar(props) {
//   const classes = useStyles();
  

//   return (
//     <div className={classes.root}>
//       <div>
//         <GridToolbarFilterButton />
//         <GridToolbarDensitySelector />
//       </div>
//       <TextField
//         variant="standard"
//         value={props.value}
//         onChange={props.onChange}
//         placeholder="Search…"
//         className={classes.textField}
//         InputProps={{
//           startAdornment: <SearchIcon fontSize="small" />,
//           endAdornment: (
//             <IconButton
//               title="Clear"
//               aria-label="Clear"
//               size="small"
//               style={{ visibility: props.value ? 'visible' : 'hidden' }}
//               onClick={props.clearSearch}
//             >
//               <ClearIcon fontSize="small" />
//             </IconButton>
//           ),
//         }}
//       />
//     </div>
//   );
// }

// QuickSearchToolbar.propTypes = {
//   clearSearch: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };

// export default function QuickFilteringGrid() {
//     const allOrders = useSelector(state => state.orders);

// //   const { data } = useDemoData({
// //     dataSet: 'Commodity',
// //     rowLength: 100,
// //     maxColumns: 6,
// //   });

// //   console.log('data',data);

//   let arr = [];
//     allOrders.forEach(order => {
//         arr.push({
//             order_id: order._id, 
//             owner: order.owner?.role, 
//             status: order.status,
//             complete: <Button variant="outlined" color="success">Complete</Button>,
//             cancel: <Button variant="outlined" color="error">Cancel</Button>,
//             delete: <Button variant="outlined" color="secondary">Delete</Button>
//         });
//     });
//     console.log('array',arr);

//   let data = {
//       columns: [
//         {field: "order_id", editable: false, header: "Order Id"}, 
//         {field: "owner", editable: false, header: "Owner"}, 
//         {field: "status", editable: false, header: "Status"}, 
//         {field: "complete", editable: false, header: "Complete"},
//         {field: "cancel", editable: false, header: "Cancel"},
//         {field: "delete", editable: false, header: "Delete"}
//     ],
//     rows: arr,
//     rowLength: 300,
//     maxColumns: 6,
//   } 
  

//    //console.log('data', data);

//   const [searchText, setSearchText] = React.useState('');
//   const [rows, setRows] = React.useState(data.rows);

//   const requestSearch = (searchValue) => {
//     setSearchText(searchValue);
//     const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
//     const filteredRows = data.rows.filter((row) => {
//       return Object.keys(row).some((field) => {
//         return searchRegex.test(row[field].toString());
//       });
//     });
//     setRows(filteredRows);
//   };

//   React.useEffect(() => {
//     setRows(data.rows);
//   }, [data.rows]);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         components={{ Toolbar: QuickSearchToolbar }}
//         rows={rows}
//         columns={data.columns}
//         componentsProps={{
//           toolbar: {
//             value: searchText,
//             onChange: (event) => requestSearch(event.target.value),
//             clearSearch: () => requestSearch(''),
//           },
//         }}
//       />
//     </div>
//   );
// }
 ///////////-----------------------OTRA OPCION QUE TAMPOCO ANDA-------------------------------------------------

// import * as React from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { useSelector, useDispatch } from 'react-redux';
// import Button from '@mui/material/Button';

// export default function BasicFilteringGrid() {
//     const allOrders = useSelector(state => state.orders);
// //   const { data } = useDemoData({
// //     dataSet: 'Commodity',
// //     rowLength: 100,
// //     maxColumns: 6,
// //   });

// let arr = [];
//     allOrders.forEach(order => {
//         arr.push({
//             order_id: order._id, 
//             owner: order.owner?.role, 
//             status: order.status,
//             complete: <Button variant="outlined" color="success">Complete</Button>,
//             cancel: <Button variant="outlined" color="error">Cancel</Button>,
//             delete: <Button variant="outlined" color="secondary">Delete</Button>
//         });
//     });
//     console.log('array',arr);

//   let data = {
//       columns: [
//         {field: "order_id", editable: false, header: "Order Id"}, 
//         {field: "owner", editable: false, header: "Owner"}, 
//         {field: "status", editable: false, header: "Status"}, 
//         {field: "complete", editable: false, header: "Complete"},
//         {field: "cancel", editable: false, header: "Cancel"},
//         {field: "delete", editable: false, header: "Delete"}
//     ],
//     rows: arr,
//     rowLength: 300,
//     maxColumns: 6,
//   } 


//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         {...data}
//         components={{
//           Toolbar: GridToolbar,
//         }}
//         filterModel={{
//           items: [
//             { columnField: 'status', operatorValue: 'contains', value: 'rice' },
//           ],
//         }}
//       />
//     </div>
//   );
// }
