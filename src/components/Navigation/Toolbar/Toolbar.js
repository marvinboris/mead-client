import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ({ isAuth, drawerToggleClicked }) => (
    <>
        <div className="container-fluid bg-dark text-light d-none d-md-block" style={{ fontSize: ".8rem" }}>
            <div className="container d-flex justify-content-between">
                <div className="text-left d-flex justify-content-start align-items-center">
                    <div className="d-flex align-items-center px-2 py-1"><FontAwesomeIcon icon="phone" className="mr-1" />(+237) 656-395-217</div>
                    <div className="d-flex align-items-center px-2 py-1"><a href="mailto:contact@mead.com" className="text-light"><FontAwesomeIcon icon="envelope" className="mr-1" />contact@mead.com</a></div>
                    <div className="d-flex align-items-center px-2 py-1"><a className="text-light" href="/"><FontAwesomeIcon icon={["fab" , "youtube"]} /></a></div>
                    <div className="d-flex align-items-center px-2 py-1"><a className="text-light" href="/"><FontAwesomeIcon icon={["fab" , "linkedin"]} /></a></div>
                    <div className="d-flex align-items-center px-2 py-1"><a className="text-light" href="/"><FontAwesomeIcon icon={["fab" , "twitter"]} /></a></div>
                    <div className="d-flex align-items-center px-2 py-1"><a className="text-light" href="/"><FontAwesomeIcon icon={["fab" , "instagram"]} /></a></div>
                </div>
            </div>
        </div>
        <NavigationItems isAuth={isAuth} />
    </>
);

export default toolbar;