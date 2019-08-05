import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Col, Spinner, Row, Button, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Table from '../../../../components/Admin/UI/Table/Table';
import Error from '../../../../components/Error/Error';
import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Index extends Component {
    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetUsers, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetUsers();
    }

    componentWillUnmount() {
        this.props.onAdminReset();
    }

    itemsDeletedHandler = () => {
        const { onDestroyRole } = this.props;
        $('input').each(function () {
            const $this = this;
            if ($this.checked) {
                onDestroyRole($($this).val());
            }
        });
    }

    allSelectedHandler = () => {
        $('input:not(.select_all)').each(function () {
            this.checked = document.querySelector('.select_all').checked;
        });
    }

    render() {
        const { admin: { error, userLoading, users }, onDestroyUser } = this.props;
        let content = null;
        let errors = null;

        if (userLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (users) {
                const usersData = users.map(user => updateObject(user, {
                    name: <NavLink to={"/admin/users/" + user._id}>{user.name}</NavLink>,
                    role: user.roleId.name,
                    createdAt: moment(user.createdAt).fromNow(),
                    updatedAt: moment(user.updatedAt).fromNow(),
                    delete: <div className="text-center"><Button onClick={() => onDestroyUser(user._id)} size="sm" color="danger"><FontAwesomeIcon className="text-white" icon="times" /></Button></div>
                }));
                content = (
                    <Row>
                        <Table array={usersData} select selectHandler={this.allSelectedHandler} className="bg-white rounded shadow" title="Liste des utilisateurs" bordered xl={12} fields={[
                            { name: 'Adresse mail', key: 'email' }, { name: 'Nom', key: 'name' }, { name: 'Rôle', key: 'role' }, { name: 'Créé', key: 'createdAt' }, { name: 'Modifié', key: 'updatedAt' }, { name: 'Supprimer', key: 'delete' }
                        ]}>
                            <div className="text-right pb-2">
                                <ButtonGroup>
                                    <NavLink className="btn btn-info btn-sm" to="/admin/users/create"><FontAwesomeIcon icon="plus" fixedWidth className="mr-1" />Ajouter</NavLink>
                                    <Button onClick={this.itemsDeletedHandler} size="sm" color="danger"><FontAwesomeIcon icon="minus" fixedWidth className="mr-1" />Supprimer</Button>
                                </ButtonGroup>
                            </div>
                        </Table>
                    </Row>
                );
            }
        }

        return (
            <Col xs={12} className="p-0">
                <Breadcrumb main="Utilisateurs" icon="users" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="users">Utilisateurs</SpecialTitle>
                    <Subtitle>Ici, vous pouvez trouver la liste des utilisateurs de l'application.</Subtitle>
                    {errors}
                    {content}
                </PresentationalContainer>
            </Col>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOn: () => dispatch(actions.userPageOn()),
    onAdminReset: () => dispatch(actions.adminReset()),
    onGetUsers: () => dispatch(actions.adminGetUsers()),
    onDestroyUser: userId => dispatch(actions.adminDestroyUser(userId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));