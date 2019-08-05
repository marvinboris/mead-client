import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Spinner, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../../store/actions';
import Breadcrumb from '../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../components/Error/Error';

class Orders extends Component {
    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetOrders, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetOrders();
    }

    render() {
        const { shop: { orders, loading, error } } = this.props;
        let content = null;
        let errors = null;

        if (loading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (orders) {
                const orderItems = orders.map(({ products, _id }, item) => {
                    const productItems = products.map(({ product, quantity }, productIndex) => <li key={productIndex}><FontAwesomeIcon icon="circle" fixedWidth className="mr-2 text-info" />{product.title} <Badge color="danger" style={{ position: 'relative' }}>{quantity}</Badge></li>);
                    return (
                        <Col className="pb-3 pt-2 mb-3 shadow-sm bg-white" key={_id}>
                            {/* <h5 className="pb-2 border-bottom">Commande #{_id} - <a href={"http://localhost:8080/shop/orders/" + _id} rel="noopener noreferrer" target="_blank">Facture</a></h5> */}
                            <h5 className="border-bottom py-2">
                                {/* <Button color="link" className="mr-2 px-0" onClick={() => onGetInvoice(_id)}>
                                    <FontAwesomeIcon icon="receipt" />
                                </Button> */}
                                Commande #{_id}
                            </h5>
                            <ul className="list-unstyled mb-0">{productItems}</ul>
                        </Col>
                    );
                });

                content = (orderItems.length > 0 ? orderItems : <h3 className="text-center">Aucune commande passée pour le moment.</h3>);
            }
        }

        return (
            <div>
                <Col xs={12} className="p-0">
                    <Breadcrumb main="Commandes" icon="receipt" />
                    <PresentationalContainer user bg="light">
                        <SpecialTitle user icon="receipt">Commandes</SpecialTitle>
                        <Subtitle>Ici, vous pouvez consulter la liste des commandes que vous avez déjà effectuées.</Subtitle>
                        {errors}
                        {content}
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
    onGetInvoice: orderId => dispatch(actions.getInvoice(orderId)),
    onGetOrders: () => dispatch(actions.getOrders()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));