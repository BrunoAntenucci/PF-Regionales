import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

export default function Footer() {
  return (
    <footer style={{margin:"0 auto"}}>
      <Box
        
        px={{ xs: 3, sm: 10 }}
        bgcolor="text.secondary"
        py={{ xs: 5, sm: 10 }}
        color="white"
        width= '91.20%'
      >
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
      </Box>
      </footer>
  );
}