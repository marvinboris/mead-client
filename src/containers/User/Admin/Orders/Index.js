import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Col, Spinner, Row, Button } from 'reactstrap';
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
        const { onAuthPageOff, onUserPageOn, onGetOrders, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetOrders();
    }

    componentWillUnmount() {
        this.props.onAdminReset();
    }

    itemsDeletedHandler = () => {
        const { onDestroyProduct } = this.props;
        $('input').each(function () {
            const $this = this;
            if ($this.checked) {
                onDestroyProduct($($this).val());
            }
        });
    }

    allSelectedHandler = () => {
        $('input:not(.select_all)').each(function () {
            this.checked = document.querySelector('.select_all').checked;
        });
    }

    render() {
        const { admin: { error, orderLoading, orders }, onDestroyOrder } = this.props;
        let content = null;
        let errors = null;

        if (orderLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (orders) {
                const ordersData = orders.map(order => updateObject(order, {
                    id: <NavLink to={"/admin/orders/" + order._id}>{order._id}</NavLink>,
                    email: order.user.email,
                    createdAt: moment(order.createdAt).fromNow(),
                    updatedAt: moment(order.updatedAt).fromNow(),
                    delete: <div className="text-center"><Button onClick={() => onDestroyOrder(order._id)} color="danger"><FontAwesomeIcon className="text-white" icon="times" /></Button></div>
                }));
                content = (
                    <Row>
                        <Table array={ordersData} select selectHandler={this.allSelectedHandler} className="bg-white border rounded shadow" title="Liste des commandes" bordered xl={12} fields={[
                            { name: 'N°', key: 'id' }, { name: 'Adresse mail', key: 'email' }, { name: 'Créée', key: 'createdAt' }, { name: 'Modifiée', key: 'updatedAt' }, { name: 'Supprimer', key: 'delete' }
                        ]}>
                            <div className="text-right py-2">
                                <Button onClick={this.itemsDeletedHandler} size="sm" color="danger"><FontAwesomeIcon icon="minus" fixedWidth className="mr-1" />Supprimer</Button>
                            </div>
                        </Table>
                    </Row>
                );
            }
        }

        return (
            <Col xs={12} className="p-0">
                <Breadcrumb main="Commandes" icon="receipt" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="receipt">Commandes</SpecialTitle>
                    <Subtitle>Ici, vous pouvez trouver la liste de toutes les commandes passées dans l'application.</Subtitle>
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
    onGetOrders: () => dispatch(actions.adminGetOrders()),
    onDestroyOrder: orderId => dispatch(actions.adminDestroyOrder(orderId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));