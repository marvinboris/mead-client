import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const card = ({ src, title, subtitle, price, link, md, lg }) => (
    <Col md={md} lg={lg}>
        <Card className="text-dark">
            <CardImg top width="100%" src={src} alt="Card image cap" />
            <CardBody className="text-center">
                <CardTitle className="h4"><NavLink className="text-danger" to={link}>{title}</NavLink></CardTitle>
                <CardSubtitle className="text-muted mb-2">{subtitle}</CardSubtitle>
                <CardText className="text-info h6">{price} FCFA</CardText>
            </CardBody>
        </Card>
    </Col>
);

export default card;