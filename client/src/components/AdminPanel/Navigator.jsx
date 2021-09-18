import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { getAllUsers, getAllPetitions, getOrderDetail, getAllOrders } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
  const role = useSelector(state => state.user.role)
  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.innerText === "Users"){
      props.setComp("Users")
      dispatch(getAllUsers());
      console.log(e)

    }else if(e.target.innerText === "Create"){
      props.setComp("Create")
      console.log(e.target.innerText)
      
    } else if(e.target.innerText === "Petitions"){
      props.setComp("Petitions")
      dispatch(getAllPetitions());
      console.log(e.target.innerText)
      
    } else if(e.target.innerText === "Mis compras"){
      props.setComp("Mis compras")
      dispatch(getOrderDetail());
      console.log(e.target.innerText)

    } else if(e.target.innerText === "Orders"){
      props.setComp("Orders")
      dispatch(getAllOrders());
      console.log(e.target.innerText)
      
    }
    console.log(props.comp, "props comp")
  }


console.log(props, "props")

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          <Link to='/products' style={{textDecoration:"none",  color:"inherit"}}>E-market</Link>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
        </ListItem>
        
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Actions</ListItemText>
            </ListItem>
          
              {role=="Admin"?
              <>
            <ListItem disablePadding>
              <ListItemButton selected="active" sx={item}  onClick={handleClick}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText>Users</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton selected="active" sx={item}  onClick={handleClick} >
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText>Orders</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton selected="active" sx={item} onClick={handleClick}>
                <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                <ListItemText>Petitions</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item}  onClick={handleClick} >
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <ListItemText>Create</ListItemText>
                </ListItemButton>
              </ListItem>
             
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} onClick={handleClick}>
                  <ListItemIcon><LocalMallIcon /></ListItemIcon>
                  <ListItemText>Mis compras</ListItemText>
                </ListItemButton>
              </ListItem>
              </>: role=="User"?
            <>
             <ListItem disablePadding>
                <ListItemButton selected="active" sx={item}  onClick={handleClick} >
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <ListItemText>Create</ListItemText>
                </ListItemButton>
              </ListItem>
             
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} onClick={handleClick}>
                  <ListItemIcon><LocalMallIcon /></ListItemIcon>
                  <ListItemText>Mis compras</ListItemText>
                </ListItemButton>
              </ListItem>
            </>:
            <>
            
            
            </>
              }
          
            <Divider sx={{ mt: 2 }} />
          </Box>
          <Divider sx={{ mt: 2 }} /> 
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Quality</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected="active" sx={item}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText>Analytics</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </Box>
      </List>
    </Drawer>
  );
}