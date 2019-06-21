import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({
            showSideDrawer: !prevState.showSideDrawer
        }));
    }

    render() {
        const { showSideDrawer } = this.state;
        const { children, isAuth } = this.props;
        const { sideDrawerClosedHandler, sideDrawerToggleHandler } = this;

        return (
            <>
                <Toolbar isAuth={isAuth} drawerToggleClicked={sideDrawerToggleHandler} />
                <main className="Content container-fluid">
                    <Row>
                        <Col xs={12} className="p-0">{children}</Col>
                    </Row>
                </main>
                <Footer />
            </>
        );
    }
}

export default connect(null, null)(Layout);