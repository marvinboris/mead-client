import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Admin from './Admin';
import Classic from './Classic';
import Seller from './Seller';

class Dashboard extends Component {
    render() {
        switch (this.props.auth.profile.role) {
            case 'Administrateur': return <Admin />;
            case 'Commerçant': return <Seller />;
            default: return <Classic />;
        }
    }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps)(Dashboard));