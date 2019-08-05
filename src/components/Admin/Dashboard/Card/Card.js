import React from 'react';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const card = ({ title, value, link, icon, color }) => {
    return (
        <Col xs={12} md={12} lg={6} xl={3} className="pb-3">
            <Col xs={12} className={"h-100 rounded overflow-hidden position-relative bg-" + color}>
                <Row>
                    <Col xs={12} className="py-3 position-relative">
                        <span style={{ zIndex: 0, top: 16, right: 16 }} className="position-absolute">
                            <FontAwesomeIcon icon={icon} style={{ zIndex: 0 }} className="text-black-50"  size="4x" />
                        </span>
                        <h1 style={{ zIndex: 10 }} className="text-light">{value}</h1>
                        <p style={{ zIndex: 10 }} className="text-light">{title}</p>
                    </Col>
                    <Col xs={12} className="text-center position-absolute" style={{ bottom: 0 }}>
                        <Row className="justify-content-center text-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))' }}>
                            <NavLink to={link} className="text-light small py-1">Plus de détails <FontAwesomeIcon icon="info-circle" /></NavLink>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Col>
    );
};

export default card;