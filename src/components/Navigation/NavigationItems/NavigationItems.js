import React from 'react';
import { Container, Navbar, Collapse, Nav, NavbarBrand } from 'reactstrap';

import NavigationItem from './NavigationItem/NavigationItem';
import Logo from '../../UI/Logo/Logo';

const navigationItems = ({ isAuth }) => (
    <Navbar color="white" className="shadow-sm position-sticky" style={{ top: 0, zIndex: 1100 }} light expand>
        <Container>
            <NavbarBrand href="/">
                <Logo />
            </NavbarBrand>
            <Collapse navbar>
                <Nav className="mr-auto" navbar>
                    <NavigationItem icon="home" href="/">Accueil</NavigationItem>
                    <NavigationItem icon="address-card" href="/about-us">À propos</NavigationItem>
                    <NavigationItem icon="rss" href="/news">Actualités</NavigationItem>
                    <NavigationItem icon="blog" href="/blog">Blog</NavigationItem>
                    <NavigationItem icon="id-card-alt" href="/contact">Contact</NavigationItem>
                    <NavigationItem icon="shopping-cart" href="/shop">Achats</NavigationItem>
                </Nav>
                {!isAuth ?
                    <Nav className="ml-auto text-uppercase font-family-raleway" navbar>
                        <NavigationItem href="/login" className="text-info">Connexion</NavigationItem>
                        <NavigationItem href="/signup" className="text-danger">Inscription</NavigationItem>
                    </Nav>
                    : null}
            </Collapse>
        </Container>
    </Navbar>
);

export default navigationItems;