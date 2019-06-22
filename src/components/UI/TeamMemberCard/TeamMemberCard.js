import React from 'react';
import { Col } from 'reactstrap';

import './TeamMemberCard.css';

const teamMemberCard = ({ name, title, children, src, lg }) => (
    <Col lg={lg} className="TeamMemberCard">
        <div className="img-wrapper mx-auto rounded-circle overflow-hidden mb-2">
            <img src={!src ? 'https://placehold.it/100x100' : src} alt="Team member" />
        </div>
        <h5 className="text-info">{name}</h5>
        <h6 className="text-danger mb-4">{title}</h6>
        <p className="text-black-50">{children}</p>
    </Col>
);

export default teamMemberCard;