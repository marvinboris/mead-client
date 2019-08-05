import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sideDrawerItem = ({ children, dropdown, icon, href, items, index }) => {
    let content;

    if (!dropdown) content = <NavLink exact className="nav-link row pl-3 border-info" activeStyle={{ borderLeft: '3px solid' }} to={href}><FontAwesomeIcon fixedWidth icon={icon} /> {children}</NavLink>;
    else {
        const itemEls = items.map(({ link, text }) => (
            <li className="nav-item" key={text}>
                <NavLink exact className="nav-link" to={link}><FontAwesomeIcon fixedWidth icon="circle-notch" /> {text}</NavLink>
            </li>
        ));

        content = (
            <>
                <button className="nav-link row pl-3 btn btn-link" type="button" data-toggle="collapse" aria-expanded="false" data-target={"#submenu-" + index} aria-controls={"submenu-" + index}><FontAwesomeIcon fixedWidth icon={icon} /> {children}</button>
                <div id={"submenu-" + index} className="collapse submenu row pl-3" style={{ fontSize: '.9em', backgroundImage: 'linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .1))' }}>
                    <ul className="nav flex-column">
                        {itemEls}
                    </ul>
                </div>
            </>
        );
    }

    return (
        <li className="nav-item">{content}</li>
    );
};

export default sideDrawerItem;