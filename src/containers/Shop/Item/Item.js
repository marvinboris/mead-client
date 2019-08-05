import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Spinner, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../components/UI/Breadcrumb/Breadcrumb';
import Title from '../../../components/UI/Titles/Title/Title';
import PresentationalContainer from '../../../components/UI/PresentationalContainer/PresentationalContainer';
import Error from '../../../components/Error/Error';
import * as actions from '../../../store/actions';

class Item extends Component {
    state = {
        quantity: 1
    }

    componentDidMount() {
        if (this.props.auth.authPage) this.props.onAuthPageOff();
        if (this.props.auth.userPage) this.props.onUserPageOff();
        this.props.onGetProduct(this.props.match.params.productId);
    }

    buttonClickedHandler = () => {
        this.props.onAddCartItem(this.props.match.params.productId);
    }

    render() {
        const { shop: { loading, product, error } } = this.props;
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
            if (product) {
                content = (
                    <>
                        <Breadcrumb items={[{ to: "/shop", content: "Achats" }]} main={product.title} />
                        <PresentationalContainer>
                            <Row>
                                <Col lg={6}>
                                    <img src={"http://localhost:8080/" + product.imageUrl} alt={product.title} className="img-fluid" />
                                </Col>
                                <Col lg={6} className="text-black-50">
                                    <Title className="text-dark">{product.title}</Title>
                                    <span className="text-muted">Publié par <NavLink to={"/communities/" + product.userId._id} className="text-info">{product.userId.name}</NavLink></span>
                                    <div className="py-3 text-dark">{product.description}</div>
                                    <h4 className="text-info">{product.price} FCFA</h4>
                                    <Button onClick={this.buttonClickedHandler} className="mt-4" color="danger">Ajouter au panier <FontAwesomeIcon icon="cart-plus" /></Button>
                                </Col>
                            </Row>
                        </PresentationalContainer>
                    </>
                );
            }
        }

        return (
            <Col xs={12} className="Item p-0">
                {errors}
                {content}
            </Col>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOff: () => dispatch(actions.userPageOff()),
    onShopReset: () => dispatch(actions.shopReset()),
    onGetProduct: productId => dispatch(actions.getProduct(productId)),
    onAddCartItem: productId => dispatch(actions.addCartItem(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);