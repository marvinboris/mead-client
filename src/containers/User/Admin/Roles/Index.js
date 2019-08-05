import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Col, Spinner, Row, Button, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import $ from 'jquery';

import Breadcrumb from '../../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Table from '../../../../components/Admin/UI/Table/Table';
import Error from '../../../../components/Error/Error';
import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Index extends Component {
    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetRoles, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetRoles();
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
        const { admin: { error, roleLoading, roles }, onDestroyRole } = this.props;
        let content = null;
        let errors = null;

        if (roleLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (roles) {
                const rolesData = roles.map(role => updateObject(role, {
                    name: <NavLink to={"/admin/roles/" + role._id}>{role.name}</NavLink>,
                    createdAt: moment(role.createdAt).fromNow(),
                    updatedAt: moment(role.updatedAt).fromNow(),
                    delete: <div className="text-center"><Button onClick={() => onDestroyRole(role._id)} color="danger"><FontAwesomeIcon className="text-white" icon="times" /></Button></div>
                }));
                content = (
                    <Row>
                        <Table array={rolesData} select selectHandler={this.allSelectedHandler} className="bg-white border rounded shadow" title="Liste des rôles" bordered xl={12} fields={[
                            { name: 'Intitulé', key: 'name' }, { name: 'Créé', key: 'createdAt' }, { name: 'Modifié', key: 'updatedAt' }, { name: 'Supprimer', key: 'delete' }
                        ]}>
                            <div className="text-right py-2">
                                <ButtonGroup>
                                    <NavLink className="btn btn-info" to="/admin/roles/create"><FontAwesomeIcon icon="plus" fixedWidth className="mr-1" />Ajouter</NavLink>
                                    <Button onClick={this.itemsDeletedHandler} color="danger"><FontAwesomeIcon icon="minus" fixedWidth className="mr-1" />Supprimer</Button>
                                </ButtonGroup>
                            </div>
                        </Table>
                    </Row>
                );
            }
        }

        return (
            <Col xs={12} className="p-0">
                <Breadcrumb main="Rôles" icon="user-tag" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="user-tag">Rôles</SpecialTitle>
                    <Subtitle>Ici, vous pouvez trouver la liste de tous les rôles de l'application.</Subtitle>
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
    onGetRoles: () => dispatch(actions.adminGetRoles()),
    onAdminReset: () => dispatch(actions.adminReset()),
    onDestroyRole: roleId => dispatch(actions.adminDestroyRole(roleId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));