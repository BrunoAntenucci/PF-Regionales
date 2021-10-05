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
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StyleIcon from '@mui/icons-material/Style';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { getUsers, getAllPetitions, getOrderDetail, getAllOrders, getCategories, getStore } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUser } from '../../actions/index';

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
  const name = useSelector(state => state.user);
  const dispatch = useDispatch();
  const role = useSelector(state => state.user.role)
  
  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])
  
  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.innerText === "Users"){
      props.setComp("Users")
      dispatch(getUsers());
      console.log(e)
    }else if(e.target.innerText === "Categories"){
      props.setComp("Categorias")
      console.log(e.target.innerText)
      dispatch(getCategories());
    }else if(e.target.innerText === "Create"){
      props.setComp("Create")
      console.log(e.target.innerText)
    }else if(e.target.innerText === "Stores"){
      props.setComp("Stores")
      console.log(e.target.innerText)
      dispatch(getStore());  
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
    } else if(e.target.innerText === "Products"){
      props.setComp("Products")
      console.log(e.target.innerText)
    }
      else if(e.target.innerText === "Analytics"){
      props.setComp("Analytics")
      console.log(e.target.innerText)

    } else if(e.target.innerText === "AdminAnalytics"){
      props.setComp("AdminAnalytics")
      console.log(e.target.innerText)
    }
    console.log(props.comp, "props comp")
  }


  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          <HomeIcon />
          <Link to='/products' style={{textDecoration:"none",  color:"inherit", marginLeft:"10px"}}>E-market</Link>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <EmojiEmotionsIcon />
          </ListItemIcon>
          <ListItemText sx={{ fontSize: "18px", color: '#fff' }}>Hola {name.first_name}!</ListItemText>
        </ListItem>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: '#fff' }}>Actions</ListItemText>
          </ListItem>
            
            {
              role === "superAdmin" ?
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
              <ListItemButton selected="active" sx={item}  onClick={handleClick}>
                <ListItemIcon><LocalOfferOutlinedIcon /></ListItemIcon>
                <ListItemText>Categories</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected="active" sx={item}  onClick={handleClick}>
                <ListItemIcon><StorefrontOutlinedIcon /></ListItemIcon>
                <ListItemText>Stores</ListItemText>
              </ListItemButton>
            </ListItem> 
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} onClick={handleClick}>
                  <ListItemIcon><LocalMallIcon /></ListItemIcon>
                  <ListItemText>Mis compras</ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} onClick={handleClick}>
                  <ListItemIcon><StyleIcon /></ListItemIcon>
                  <ListItemText>Products</ListItemText>
                </ListItemButton>
            </ListItem>
          </>
          : role === "User" ?
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
          </>
          : role === "Admin"?
          <>
            <ListItem disablePadding>
              <ListItemButton selected="active" sx={item}  onClick={handleClick} >
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText>Orders</ListItemText>
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
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} onClick={handleClick}>
                  <ListItemIcon><StyleIcon /></ListItemIcon>
                  <ListItemText>Products</ListItemText>
                </ListItemButton>
            </ListItem>
            </>
          : "null"
          }

          <Divider sx={{ mt: 2 }} />
        </Box>

        {(role === "Admin"||role === "superAdmin")?
        <>
          <Divider sx={{ mt: 2 }} /> 
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Quality</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected="active" sx={item} onClick={handleClick}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText>Analytics</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} onClick={handleClick}>
                  <ListItemIcon><SettingsSuggestIcon /></ListItemIcon>
                  <ListItemText>Admin Analytics</ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </Box>
        </>:null}
      </List>
    </Drawer>
  );
}