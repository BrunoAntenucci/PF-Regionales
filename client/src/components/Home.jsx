import React from 'react';
import Header from './Header';
import { getProducts } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
=======

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  import { createTheme , ThemeProvider} from '@material-ui/core';
const theme = createTheme({
    palette: {
      primary: {
        light: '#d0ebc1',
        main: '#BAD799',
        dark: '#798f60',
        contrastText: '#fff',
      },
      secondary: {
        light: '#b3a773e4',
        main: '#97630e',
        dark: '#5f3e0a',
        contrastText: '#000',
      },
      transparent: {
        light: '#ffffff',
        main: '#fafafa0',
        dark: '#000000',
        contrastText: '#000',
      },
    //   error:{

    //   },
    //   warning:{

    //   },
    //   info:{

    //   },
    //   success:{

    //   }
    },
  });

  
function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    return (
        <ThemeProvider theme={theme}>
        <div>
            <Header />
            {
                allProducts?.map(p => { return(
                    <div key={p.id}>
                    <p>{p.title}</p>
                    <p>Price: {p.price}</p>
                    <p>Category: {p.category}</p>
                    {p.image}
                    </div>
                )})
            }
        </div>
        </ThemeProvider>
    )
}

export default Home
