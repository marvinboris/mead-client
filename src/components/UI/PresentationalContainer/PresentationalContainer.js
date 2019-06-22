import React from 'react';
import { Col, Container } from 'reactstrap';

const presentationalContainer = ({ bg, children, text, innerClassName }) => (
    <Col xs={12} className={"py-5 " + (!bg ? "bg-white " : ("bg-" + bg + " ")) + (text ? "text-dark" : "text-" + text)}>
        <Container className={innerClassName}>{children}</Container>
    </Col>
);

export default presentationalContainer;