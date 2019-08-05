import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const adminRoute = ({ userRole, path, component }) => {
    if (userRole === 'Administrateur') return <Route path={path} component={component} />;
    else return <Redirect to="/" />;
};

export default adminRoute;