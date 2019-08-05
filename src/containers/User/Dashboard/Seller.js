import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Col, Row, Spinner, Media, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        const { onAuthPageOff, onUserPageOn, onGetMyOrders, onGetMyCommunities, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetMyOrders();
        onGetMyCommunities();
    }

    componentWillUnmount() {
        this.props.onShopReset();
    }

    render() {
        const { shop: { error: shopError, orderLoading: shopLoading, orders, communities }, auth: { profile } } = this.props;
        let content = null;
        let errors = null;

        if (shopLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={shopError} />
            </>;
            if (orders && communities) {
                let totalAmount = 0;
                orders.forEach(order => {
                    order.products.forEach(product => {
                        totalAmount += product.product.price * product.quantity;
                    });
                });

                const data = [
                    {
                        title: 'Mes commandes',
                        value: orders.length,
                        icon: 'receipt',
                        link: '/orders',
                        color: 'primary'
                    },
                    {
                        title: 'Mes communautés',
                        value: communities.length,
                        icon: 'store',
                        link: '/following',
                        color: 'success'
                    },
                    {
                        title: 'Montant de mes achats',
                        value: totalAmount + ' FCFA',
                        icon: 'shopping-cart',
                        link: '/orders',
                        color: 'warning'
                    },
                    {
                        title: 'Mes notifications',
                        value: profile.notifications.length,
                        icon: 'bell',
                        link: '/notifications',
                        color: 'danger'
                    }
                ];

                const cards = data.map(({ title, value, icon, link, color }, index) => <Card color={color} key={index} title={title} value={value} icon={icon} link={link} />);

                const ordersData = orders.map(order => updateObject(order, {
                    products: order.products.map(product => <div key={product.product._id + order._id}>
                        {product.product.title} <Badge color="danger" style={{ position: 'relative' }}>{product.quantity}</Badge>
                    </div>),
                    totalAmount: order.products.reduce((a, b) => a + b.product.price * b.quantity, 0) + ' FCFA'
                }));
                const communitiesData = communities.map((community, index) => (
                    index < 4 ? (<Media key={community.owner._id} className={(index !== 0 ? "border-top " : "") + "py-2"}>
                        <Media left className="mr-2">
                            <Media object src={community.imageUrl ? "http://localhost:8080/" + community.imageUrl : "https://placehold.it/64x64"} style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center' }} className="rounded shadow-sm" alt={community.name} />
                        </Media>
                        <Media body className="overflow-hidden text-truncate">
                            <Media heading className="lead">
                                <NavLink to={"/communities/" + community.owner._id}>{community.name}</NavLink>
                            </Media>
                            {community.description}
                        </Media>
                    </Media>) : null
                ));
                const notificationsData = profile.notifications.map(notification => {
                    let message;
                    switch (notification.type) {
                        case 'Product':
                            message = <NavLink to={"/communities/" + notification.userId._id} className="text-reset text-truncate small"><FontAwesomeIcon className="text-success mr-1" size="lg" fixedWidth icon="shopping-cart" />Nouveau produit dans la boutique {notification.userId.community.name}</NavLink>;
                            break;

                        default:
                            break;
                    }

                    return updateObject(notification, {
                        message
                    });
                })

                content = (
                    <>
                        <Row>
                            {cards}
                            <Table array={ordersData} title="Commandes" icon="receipt" bordered limit={5} lg={7} className="bg-white shadow-sm rounded border-primary" style={{ borderTop: '4px solid' }} fields={[
                                { name: 'Produits', key: 'products' }, { name: 'Total', key: 'totalAmount' }
                            ]} />
                            <Table array={notificationsData} title="Notifications" icon="bell" bordered limit={5} lg={5} className="bg-white shadow-sm rounded border-danger" style={{ borderTop: '4px solid' }} fields={[
                                { name: 'Message', key: 'message' }
                            ]} />
                            <Col lg={6}>
                                <div className="bg-white rounded border-success shadow-sm" style={{ borderTop: '4px solid' }}>
                                    <h5 className="border-bottom pb-2 pt-3 px-3"><FontAwesomeIcon size="lg" className="mr-2" fixedWidth icon="store" />Communautés récemment intégrées</h5>
                                    <Col xs={12}>
                                        {communitiesData}
                                    </Col>
                                    <div className="text-center py-1 border-top">
                                        <NavLink to="/following">Mes communautés</NavLink>
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
                    <Subtitle>Ici, vous pouvez trouver le résumé de vos principales informations dans l'application.</Subtitle>
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
    onShopReset: () => dispatch(actions.shopReset()),
    onGetMyCommunities: () => dispatch(actions.getMyCommunities()),
    onGetMyOrders: () => dispatch(actions.getOrders()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));