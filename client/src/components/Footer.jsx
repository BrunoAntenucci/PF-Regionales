import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((e)=>({
  footer:{
  padding: "40px",
  background: "grey",
//background: "linear-gradient(112deg,"+e.palette.secondary.main+" 11%, "+e.palette.secondary.dark+" 33%, "+e.palette.secondary.main+" 55%)",

  color:"white",
  fontSize:"1.5em"
  }
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Ayuda</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contacto
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Soporte
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                Política de privacidad
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Cuenta</Box>
              <Box>
                <Link href="http://localhost:3000/signin" color="inherit">
                  Acceder
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Registrarse
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Redes Sociales</Box>
              <Box>
                <Link href="https://www.facebook.com/profile.php?id=100072715101850" target="_blank" color="inherit">
                  Facebook
                </Link>
              </Box>
              <Box>
                <Link href="https://twitter.com/AlumnoHenry" target="_blank" color="inherit">
                  Twitter
                </Link>
              </Box>
              <Box>
                <Link href="https://www.instagram.com/" target="_blank" color="inherit">
                  Instagram
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            e-MARKET &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      
      </footer>
  );
}