import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Col, Row, Spinner, Media, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import Breadcrumb from '../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../components/UI/Titles/Subtitle/Subtitle';
import Card from '../../../components/Admin/Dashboard/Card/Card';
import Table from '../../../components/Admin/UI/Table/Table';
import Error from '../../../components/Error/Error';
import * as actions from '../../../store/actions';
import { updateObject } from '../../../shared/utility';

class Dashboard extends Component {
    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetOrders, onGetProducts, onGetUsers, onGetRoles, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetOrders();
        onGetProducts();
        onGetUsers();
        onGetRoles();
    }

    componentWillUnmount() {
        this.props.onAdminReset();
    }

    render() {
        const { admin: { error, userLoading, productLoading, orderLoading, roleLoading, users, products, orders, roles } } = this.props;
        let content = null;
        let errors = null;

        if (userLoading || productLoading || orderLoading || roleLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (users && products && orders && roles) {
                const data = [
                    {
                        title: 'Toutes les commandes',
                        value: orders.length,
                        icon: 'receipt',
                        link: '/admin/orders',
                        color: 'primary'
                    },
                    {
                        title: 'Tous les produits',
                        value: products.length,
                        icon: ['fab', 'product-hunt'],
                        link: '/admin/products',
                        color: 'success'
                    },
                    {
                        title: 'Tous les utilisateurs',
                        value: users ? users.length : 0,
                        icon: 'users',
                        link: '/admin/users',
                        color: 'warning'
                    },
                    {
                        title: 'Tous les rôles',
                        value: roles.length,
                        icon: 'user-tag',
                        link: '/admin/roles',
                        color: 'danger'
                    }
                ];

                const cards = data.map(({ title, value, icon, link, color }, index) => <Card color={color} key={index} title={title} value={value} icon={icon} link={link} />);

                const ordersData = orders.map(order => updateObject(order, {
                    name: order.user.userId.name,
                    email: order.user.email, 
                    products: order.products.map(product => <div key={product.product._id + order._id}>
                        {product.product.title} <Badge color="danger" style={{ position: 'relative' }}>{product.quantity}</Badge>
                    </div>),
                    totalAmount: order.products.reduce((a, b) => a + b.product.price * b.quantity, 0) + ' FCFA'
                }));
                const productsData = products.map((product, index) => (
                    index < 4 ? (<Media key={product._id} className={(index !== 0 ? "border-top " : "") + "py-2"}>
                        <Media left className="mr-2">
                            <Media object src={product.imageUrl ? "http://localhost:8080/" + product.imageUrl : "https://placehold.it/64x64"} style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center' }} className="rounded shadow-sm" alt={product.title} />
                        </Media>
                        <Media body>
                            <Badge className="text-light float-right" color={['warning', 'info', 'danger', 'success'][index]}>{product.price + " FCFA"}</Badge>
                            <Media heading className="lead">
                                <NavLink to={"/admin/products/" + product._id}>{product.title}</NavLink>
                            </Media>
                            <span className="text-truncate">{product.description}</span>
                        </Media>
                    </Media>) : null
                ));
                const usersData = users.map((user, index) => (
                    index < 8 ? (<Col xs={12} sm={6} md={4} lg={3} key={user._id} className="text-center justify-content-center">
                        <div>
                            <img src={user.photo ? "http://localhost:8080/" + user.photo : "https://placehold.it/64x64"} alt={user.name} className="img-fluid rounded-circle" style={{ height: 64, width: 64, objectPosition: 'center', objectFit: 'cover' }} />
                        </div>
                        <div className="pt-2"><strong><NavLink className="text-reset" to={"/admin/users/" + user._id}>{user.name}</NavLink></strong></div>
                        <div className="small text-muted">{moment(user.createdAt).fromNow()}</div>
                    </Col>) : null
                ));

                content = (
                    <>
                        <Row>
                            {cards}
                            <Table array={ordersData} title="Commandes" icon="receipt" bordered limit={5} lg={7} className="bg-white shadow-sm rounded border-primary" style={{ borderTop: '4px solid' }} fields={[
                                { name: 'Client', key: 'name' }, { name: 'Produits', key: 'products' }, { name: 'Montant total', key: 'totalAmount' }
                            ]} />
                            <Table array={roles} title="Rôles" icon="user-tag" bordered limit={5} lg={5} innerClassName="bg-info text-white" className="bg-info shadow-sm rounded text-white" fields={[
                                { name: 'Nom', key: 'name' }
                            ]} />
                            <Col lg={6}>
                                <div className="bg-white rounded border-success shadow-sm" style={{ borderTop: '4px solid' }}>
                                    <h5 className="border-bottom pb-2 pt-3 px-3"><FontAwesomeIcon size="lg" className="mr-2" fixedWidth icon={['fab', 'product-hunt']} />Produits récemment ajoutés</h5>
                                    <Col xs={12}>
                                        {productsData}
                                    </Col>
                                    <div className="text-center py-1 border-top">
                                        <NavLink to="/admin/products">Tous les produits</NavLink>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="bg-white rounded border-warning shadow-sm" style={{ borderTop: '4px solid' }}>
                                    <h5 className="border-bottom pb-2 pt-3 px-3"><FontAwesomeIcon size="lg" className="mr-2" fixedWidth icon="users" />Derniers membres</h5>
                                    <Col xs={12} className="py-2">
                                        <Row>
                                            {usersData}
                                        </Row>
                                    </Col>
                                    <div className="text-center py-1 border-top">
                                        <NavLink to="/admin/users">Tous les utilisateurs</NavLink>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                );
            }
        }

        return (
            <Col xs={12} className="p-0">
                <Breadcrumb main="Tableau de bord" icon="tachometer-alt" />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon="tachometer-alt">Tableau de bord</SpecialTitle>
                    <Subtitle>Ici, vous pouvez trouver le résumé des principales informations de l'application.</Subtitle>
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
    onGetProducts: () => dispatch(actions.adminGetProducts()),
    onGetOrders: () => dispatch(actions.adminGetOrders()),
    onGetUsers: () => dispatch(actions.adminGetUsers()),
    onGetRoles: () => dispatch(actions.adminGetRoles()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));