import React from "react";
import { NavbarContainer, ButtonsContainer, Button,Title } from "./NavbarStyled";
import { Link } from "react-router-dom";


const Navbar = () => {
    
    return (

            <NavbarContainer>
                <Title>Herolo weather app</Title>
                <ButtonsContainer >
                    <Button as={Link} to='/'  >
                   
                    Home
                    </Button>
                    <Button as={Link} to='/favorites' >
                  
                    Favorites
                    </Button>
                </ButtonsContainer>
            </NavbarContainer>

    );
};



export default (Navbar);
