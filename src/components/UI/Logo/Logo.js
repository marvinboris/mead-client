import React from 'react';

import './Logo.css';

const logo = ({ big }) => (
    <div className="Logo mb-0 text-white h2" style={big ? { fontSize: '3em' } : null}>
        <span className="text-info">ME</span><span className="text-danger">AD</span>
    </div>
);

export default logo;