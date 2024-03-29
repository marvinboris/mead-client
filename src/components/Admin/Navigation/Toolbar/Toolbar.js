import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

import NavigationItems from '../NavigationItems/NavigationItems';
import AdminLogo from '../../UI/Logo/Logo';

const toolbar = ({ name, logoutHandler, cartItemsNumber, role, logoWidth, notifications }) => (
    <>
        <nav className="navbar navbar-expand-lg sticky-top border-bottom bg-white p-0">
            <NavLink to="/" className="navbar-brand text-center d-flex justify-content-center align-items-center border-right p-0 m-0 align-middle" style={{ width: logoWidth ? logoWidth : 240, height: 56 }}><AdminLogo /></NavLink>
            <Button className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </Button>
            <NavigationItems name={name} logoutHandler={logoutHandler} notifications={notifications} cartItemsNumber={cartItemsNumber} role={role} />
        </nav>
    </>
);

export default toolbar;