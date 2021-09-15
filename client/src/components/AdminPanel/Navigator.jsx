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
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { getAllUsers } from '../../actions';
import { useDispatch } from 'react-redux';
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

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllUsers());
  }

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
            <ListItem disablePadding>
              <ListItemButton selected="active" sx={item}  onClick={handleClick}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText>Users</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton selected="active" sx={item} >
                  <ListItemIcon><DnsRoundedIcon /></ListItemIcon>
                  <ListItemText>Petitions</ListItemText>
                </ListItemButton>
              </ListItem>
            <Divider sx={{ mt: 2 }} />
          </Box>

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