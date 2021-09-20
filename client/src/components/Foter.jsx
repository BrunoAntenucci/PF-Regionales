import styled from "styled-components";
// import Image from 'next/image' 


const Root = styled.div`
width: 100%;
background: radial-gradient(circle, #E3E8D6 0%, #C8CAC4  100%);
padding: 80px 60px;
@media(max-width: 375px){
  font-size: 100px;
  }
`

const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;

`

// export const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     max-width: 1024px;
//     margin: 0 auto;
//     /* background: red; */
// `

const Text = styled.a`
    font-size: 0.8rem;
    color: black;
    margin: 0 4px;
    margin-bottom: 20px;
    &:hover {
      color: #7ECAFF;
      transition: 0.1s ease-in;
  }
`

// const StyledCopyright = styled.a`
//     font-size: 0.7rem;
//     color: #FFF;
//     margin-bottom: 20px;
//     text-decoration: none;
// `

// const StyledBar = styled.a`
//     width: 1px;
//     height: 50px;
//     background-color: #FFF;
// `

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  @media(max-width: 375px){
    margin-left: 30px;
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  color: black;
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: bold;
  font-family: Georgia;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Icon = styled.i`
    font-size: 18px;
    margin-right: 16px;
`

// const StyledImage = styled.div`
//     margin-left: -10px;
// `

const Footer = () => {

    // const logoWhite = "https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg";

    return (
        <Root >
            <Conteiner>
                <Row>
                    <Column>
                    <Title>Acerca de</Title>                      
                        <Text href="#">Política de privacidad</Text>
                        <Text href="#">Términos de uso</Text>
                    </Column>
                    <Column>
                    <Title>Contacto</Title>
                        <Text href="#">Email</Text>
                        <Text href="#">Ayuda</Text>
                    </Column>
                    <Column>
                    <Title>Redes sociales</Title>
                        <Text href="https://www.facebook.com/profile.php?id=100072715101850" target="_blank">Facebook</Text>
                        <Text href="https://twitter.com/AlumnoHenry" target="_blank">Twitter</Text>
                        <Text href="https://www.instagram.com/" target="_blank">Instagram</Text>
                        
                    </Column>
                    <Column>
                    <Title>Mi cuenta</Title>
                        <Text href="http://localhost:3000/signin" target="_blank">Login</Text>
                        <Text href="http://localhost:3000/favourites" target="_blank">Favoritos</Text>
                        <Text href="http://localhost:3000/cart" target="_blank">Mi carrito</Text>
                        
                    </Column>
                </Row>
            </Conteiner>
        </Root>
    )
}

export default Footer;
