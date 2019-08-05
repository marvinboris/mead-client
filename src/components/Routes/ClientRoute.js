import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const clientRoute = ({ userRole, path, component }) => {
    if (['Classique', 'Commerçant', 'Administrateur'].includes(userRole)) return <Route path={path} component={component} />;
    else return <Redirect to="/" />;
};

export default clientRoute;