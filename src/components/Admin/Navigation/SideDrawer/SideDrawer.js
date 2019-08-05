import React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavDivider from '../../UI/NavDivider/NavDivider';
import SideDrawerItem from './SideDrawerItem/SideDrawerItem';
import './SideDrawer.css';

const sideDrawer = ({ name, photo, role }) => {
    let features = null;
    switch (role) {
        case 'Administrateur':
            features = <>
                <NavDivider>Fonctionnalités</NavDivider>

                <SideDrawerItem icon="user-friends" href="/community">Ma communauté</SideDrawerItem>
                <SideDrawerItem icon="users" dropdown index={1} items={[
                    { link: '/admin/users', text: 'Liste des utilisateurs' }, { link: '/admin/users/create', text: 'Ajouter un utilisateur' }
                ]}>Utilisateurs</SideDrawerItem>
                <SideDrawerItem icon="receipt" href="/admin/orders">Commandes</SideDrawerItem>
                <SideDrawerItem icon={['fab', 'product-hunt']} dropdown index={2} items={[
                    { link: '/admin/products', text: 'Liste des produits' }, { link: '/admin/products/create', text: 'Ajouter un produit' }
                ]}>Produits</SideDrawerItem>
                <SideDrawerItem icon="user-tag" dropdown index={3} items={[
                    { link: '/admin/roles', text: 'Liste des rôles' }, { link: '/admin/roles/create', text: 'Ajouter un rôle' }
                ]}>Rôles</SideDrawerItem>
            </>;
            break;

        case 'Commerçant':
            features = <>
                <NavDivider>Statistiques</NavDivider>

                <SideDrawerItem icon="history" href="/history">Commandes</SideDrawerItem>
                <SideDrawerItem icon="chart-line" href="/stats">Statistiques</SideDrawerItem>

                <NavDivider>Fonctionnalités</NavDivider>

                <SideDrawerItem icon="user-friends" href="/community">Ma communauté</SideDrawerItem>
                <SideDrawerItem icon={['fab', 'product-hunt']} dropdown index={4} items={[
                    { link: '/community/products', text: 'Liste des produits' }, { link: '/community/products/create', text: 'Ajouter un produit' }
                ]}>Produits</SideDrawerItem>
            </>;
            break;

        default:
            features = null;
            break;
    }

    return (
        <div className="SideDrawer nav-left-sidebar bg-dark text-light" style={{ width: 240, position: 'fixed', top: 56, zIndex: 1100, height: 'calc(100vh - 56px)' }}>
            <div className="menu-list">
                <Col xs={12}>
                    <Row className="py-2 align-items-center">
                        <Col xs={4} className="px-2">
                            <img src={photo ? "http://localhost:8080/" + photo : "https://placehold.it/100x100"} className="rounded-circle" style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center' }} alt="User profile" />
                        </Col>
                        <Col xs={8} className="p-0 h-100">
                            <Row className="align-items-center m-0 h-100">
                                <Col xs={12} className="p-0"><strong>{name}</strong></Col>
                                <Col xs={12} className="p-0 small">
                                    <FontAwesomeIcon fixedWidth icon="circle" className="text-success mr-1" />En ligne
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <nav className="navbar navbar-expand navbar-dark py-0">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav w-100 flex-column">
                            <NavDivider>Menu</NavDivider>

                            <SideDrawerItem icon="tachometer-alt" href="/dashboard">Tableau de bord</SideDrawerItem>
                            <SideDrawerItem icon="shopping-cart" href="/cart">Mon panier</SideDrawerItem>
                            <SideDrawerItem icon="receipt" href="/orders">Mes commandes</SideDrawerItem>
                            <SideDrawerItem icon="store" href="/following">Mes communautés</SideDrawerItem>

                            {features}
                            <NavDivider>Paramètres</NavDivider>

                            <SideDrawerItem icon="user-cog" href="/profile">Mon compte</SideDrawerItem>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
};

export default sideDrawer;