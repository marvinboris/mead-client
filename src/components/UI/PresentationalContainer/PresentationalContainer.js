import React from 'react';
import { Col } from 'reactstrap';

const presentationalContainer = ({ bg, children, text, innerClassName, user }) => (
    <Col xs={12} className={(!user ? "py-5 " : "py-3 ") + (!bg ? "bg-white " : ("bg-" + bg + " ")) + (text ? "text-dark" : "text-" + text)}>
        <div className={(user ? 'container-fluid' : 'container') + " " + innerClassName}>{children}</div>
    </Col>
);

export default presentationalContainer;