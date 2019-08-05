import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const breadcrumb = ({ items, main, icon }) => {
    let itemsComponent = null;

    if (items) itemsComponent = items.map((item, i) => (
        <BreadcrumbItem key={i}><NavLink className="text-info" to={item.to}>{item.content}</NavLink></BreadcrumbItem>
    ));

    return (
        <Breadcrumb listClassName="bg-transparent rounded-0 small justify-content-end" style={{ top: 0, right: 0, position: 'absolute', zIndex: 1000 }}>
            <BreadcrumbItem><NavLink className="text-info" to="/"><FontAwesomeIcon icon={icon} className="mr-1" /> Accueil</NavLink></BreadcrumbItem>
            {itemsComponent}
            <BreadcrumbItem className="text-danger" active>{main}</BreadcrumbItem>
        </Breadcrumb>
    );
};

export default breadcrumb;