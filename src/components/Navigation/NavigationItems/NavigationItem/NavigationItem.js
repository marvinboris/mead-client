import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigationItem = ({ icon, children, href, className }) => (
    <NavItem>
        <NavLink className={className} href={href}>{icon ? <FontAwesomeIcon icon={icon} className={"mr-1"} /> : null}{children}</NavLink>
    </NavItem>
);

export default navigationItem;