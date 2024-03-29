import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, UncontrolledDropdown, DropdownToggle, Badge, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationItem from './NavigationItem/NavigationItem';
import MyDropdownItem from '../../../Navigation/NavigationItems/DropdownItem/DropdownItem';

const navigationItems = ({ cartItemsNumber, name, logoutHandler, role, notifications }) => {
    let additionalMenuItems;
    if (!notifications) notifications = [];
    const notificationItems = notifications.map(notification => {
        let message;
        switch (notification.type) {
            case 'Product':
                message = <NavLink to={"/communities/" + notification.userId._id} className="text-reset text-truncate small"><FontAwesomeIcon className="text-success mr-1" size="lg" fixedWidth icon="shopping-cart" />Nouveau produit dans la boutique {notification.userId.community.name}</NavLink>;
                break;

            default:
                break;
        }

        return <DropdownItem key={notification._id} className="text-dark border-top">
            {message}
        </DropdownItem>
    });

    switch (role) {
        // Admin menu items
        case 'Administrateur':
            additionalMenuItems = (
                <>
                    <DropdownItem divider />

                    <MyDropdownItem icon="users" href="/admin/users">Utilisateurs</MyDropdownItem>
                    <MyDropdownItem icon="receipt" href="/admin/orders">Commandes</MyDropdownItem>
                    <MyDropdownItem icon={["fab", "product-hunt"]} href="/admin/products">Produits</MyDropdownItem>
                    <MyDropdownItem icon="user-tag" href="/admin/roles">Rôles</MyDropdownItem>
                </>
            );
            break;

        // Seller menu items
        case 'Commerçant':
            additionalMenuItems = (
                <>
                    <DropdownItem divider />

                    <MyDropdownItem icon="history" href="/history">Commandes</MyDropdownItem>
                    <MyDropdownItem icon="chart-line" href="/stats">Statistiques</MyDropdownItem>
                </>
            );
            break;

        default:
            break;
    }

    return (
        <>
            <Collapse navbar className="px-3" style={{ height: 56 }}>
                <Nav className="mr-auto" navbar>
                    <NavigationItem icon="home" href="/">Accueil</NavigationItem>
                    <NavigationItem icon="address-card" href="/about-us">À propos</NavigationItem>
                    <NavigationItem icon="newspaper" href="/news">Actualités</NavigationItem>
                    {/* <NavigationItem icon="blog" href="/blog">Blog</NavigationItem> */}
                    <NavigationItem icon="id-card-alt" href="/contact">Contact</NavigationItem>
                    <NavigationItem icon="shopping-cart" href="/shop">Achats</NavigationItem>
                </Nav>
                <Nav className="ml-auto font-family-raleway d-flex align-items-center" navbar>
                    <div className="py-3 d-flex justify-content-end align-items-center">
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav>
                                <FontAwesomeIcon icon="bell" className="text-secondary" size="lg" />
                                <Badge color="info" className="position-relative" style={{ top: '-10px', left: '-5px' }}>{notifications.length}</Badge>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {notifications.length === 0 ? <DropdownItem disabled className="bg-dark text-white">
                                    <p>Aucune notification.</p>
                                </DropdownItem> : <>
                                        <DropdownItem disabled className="text-left pt-0 small">
                                            Vous avez {notifications.length} notifications.
                                        </DropdownItem>
                                        {notificationItems}
                                        <DropdownItem className="text-center pb-0 border-top">
                                            <NavLink className="text-reset small" to="/notifications">Toutes les notifications</NavLink>
                                        </DropdownItem>
                                    </>}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavLink to="/cart">
                            <FontAwesomeIcon className="text-secondary" icon="shopping-cart" size="lg" />
                            <Badge color="danger" className="position-relative" style={{ top: '-10px', left: '-5px' }}>{cartItemsNumber}</Badge>
                        </NavLink>
                    </div>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav><FontAwesomeIcon icon="user-circle" className="text-secondary" size="2x" /></DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem disabled className="text-capitalize bg-info font-weight-bold text-white">{name ? name.toLowerCase() : null}</DropdownItem>
                            <MyDropdownItem icon="tachometer-alt" href="/dashboard">Tableau de bord</MyDropdownItem>
                            <MyDropdownItem icon="receipt" href="/orders">Mes commandes</MyDropdownItem>
                            <MyDropdownItem icon="user" href="/profile">Mon profil</MyDropdownItem>
                            {additionalMenuItems}
                            <DropdownItem divider />
                            <MyDropdownItem href="" onClick={logoutHandler} icon="power-off">Déconnexion</MyDropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </>
    );
}

export default navigationItems;