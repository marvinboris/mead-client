import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const sellerRoute = ({ userRole, path, component }) => {
    if (['Commerçant', 'Administrateur'].includes(userRole)) return <Route path={path} component={component} />;
    else return <Redirect to="/" />;
};

export default sellerRoute;