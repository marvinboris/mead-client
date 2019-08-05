import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import * as actions from '../../../store/actions';
import Breadcrumb from '../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../components/UI/Titles/Subtitle/Subtitle';
import EditProfile from './EditProfile/EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';

class Profile extends Component {
    state = {
        activeTab: 1
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn } = this.props;
        onAuthPageOff();
        onUserPageOn();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (
            <div>
                <Col xs={12} className="p-0">
                    <Breadcrumb main="Mon profil" icon="user" />
                    <PresentationalContainer user bg="light">
                        <SpecialTitle icon="user">Mon profil</SpecialTitle>
                        <Subtitle>Ici, vous pouvez trouver les paramètres de votre compte dans l'application. Le mot de passe est impératif pour effectuer toute modification.</Subtitle>
                        <Col xs={12} className="bg-white border rounded-sm p-0">
                            <Row>
                                <Col xs={3} className="border-right pr-0">
                                    <Nav tabs pills vertical className="border-bottom-0">
                                        <NavItem>
                                            <NavLink className={this.state.activeTab === 1 ? "border-left border-info border-top-0 border-right-0 border-bottom-0 text-info bg-white rounded-0" : "border-0"} style={this.state.activeTab === 1 ? { borderLeftWidth: '4px !important' } : { cursor: 'pointer' }} onClick={() => this.toggle(1)}>
                                                Modifier le profil
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={this.state.activeTab === 2 ? "border-left border-info border-top-0 border-right-0 border-bottom-0 text-info bg-white rounded-0" : "border-0"} style={this.state.activeTab === 2 ? { borderLeftWidth: '4px !important' } : { cursor: 'pointer' }} onClick={() => this.toggle(2)}>
                                                Changer de mot de passe
                                        </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>

                                <Col xs={9} className="p-5 pl-0">
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId={1}>
                                            <EditProfile />
                                        </TabPane>
                                        <TabPane tabId={2} className="">
                                            <ChangePassword />
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </Col>
                    </PresentationalContainer>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOn: () => dispatch(actions.userPageOn()),
    onGetProfile: () => dispatch(actions.getProfile()),
    onUpdateProfile: data => dispatch(actions.postProfile(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));