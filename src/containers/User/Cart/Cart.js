import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Col, Row, Table, Button, Input, InputGroup, InputGroupAddon, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../components/Error/Error';
import * as actions from '../../../store/actions';

class Cart extends Component {
    state = {
        cart: []
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetCart, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetCart();
    }

    componentWillUnmount() {
        this.props.onShopReset();
    }

    // componentWillUpdate(nextProps, nextState) {
    //     if (nextProps.shop.cart.length !== this.props.shop.cart.length) {
    //         nextState = { cart: [...nextProps.shop.cart] };
    //     }
    // }

    removeItemHandler = _id => {
        this.props.onDeleteCartItem(_id);
        // const cart = this.state.cart.filter((item, i) => item.productId._id !== _id);
        // this.setState({ cart });
    }

    minusClickedHandler = _id => {
        this.props.onSubtractCartItem(_id);
        // const cart = [...this.state.cart];
        // const index = this.state.cart.findIndex(item => item.productId._id === _id);
        // if (cart[index].quantity === 1) return;
        // cart[index].quantity--;
        // this.setState({ cart });
    }

    plusClickedHandler = _id => {
        this.props.onAddCartItem(_id);
        // const cart = [...this.state.cart];
        // const index = this.state.cart.findIndex(item => item.productId._id === _id);
        // cart[index].quantity++;
        // this.setState({ cart });
    }

    clearClickedHandler = () => {
        this.props.onClearCart();
        // this.setState({ cart: [] });
    }

    // inputChangedHandler = (event, _id) => {
    //     const value = event.target.value;
    //     const cart = [...this.props.shop.cart];
    //     const index = this.props.shop.cart.findIndex(item => item.productId._id === _id);
    //     cart[index].quantity = +value;
    //     this.setState({ cart });
    // }

    render() {
        const { shop: { loading, cart, error, orderPosted } } = this.props;
        let content = null;
        let redirect = null;
        let errors = null;

        if (orderPosted) redirect = <Redirect to="/orders" />

        if (loading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (cart) {
                const cartItems = cart.map(({ productId: { title, _id, price, imageUrl }, quantity }) => (
                    <tr key={_id}>
                        <td style={{ maxWidth: '200px' }}>
                            <img src={"http://localhost:8080/" + imageUrl} alt={title} className="img-fluid" />
                        </td>
                        <td className="align-middle"><strong className="lead">{title}</strong></td>
                        <td className="align-middle">{price} FCFA</td>
                        <td className="align-middle">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button outline color="danger" onClick={() => this.minusClickedHandler(_id)}>-</Button>
                                </InputGroupAddon>
                                <Input className="text-center" readOnly value={quantity} style={{ width: '20px' }} />
                                <InputGroupAddon addonType="append">
                                    <Button outline color="info" onClick={() => this.plusClickedHandler(_id)}>+</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                        <td className="align-middle">{price * quantity} FCFA</td>
                        <td className="align-middle">
                            <Button color="danger" onClick={() => this.removeItemHandler(_id)}><FontAwesomeIcon icon="times" /></Button>
                        </td>
                    </tr>
                ));

                const total = cart.reduce((a, b) => a + (b.quantity * b.productId.price), 0);

                content = (cart.length === 0 ? <h3 className="text-center">Aucun produit ajouté au panier.</h3> :
                    <>
                        <Row>
                            <Col xs={12} className="pb-3 text-right">
                                <Button onClick={this.clearClickedHandler} color="danger">Vider le panier <FontAwesomeIcon icon="times" /></Button>
                            </Col>
                            <Col xs={12} className="table-responsive-xl text-center">
                                <Table className="bg-white" bordered>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Produit</th>
                                            <th>Prix</th>
                                            <th>Quantité</th>
                                            <th>Total</th>
                                            <th>Supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="justify-content-end">
                            <Col md={6} lg={4}>
                                <h4 className="text-right">Prix total</h4>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Total</span>
                                    <strong>{total} FCFA</strong>
                                </div>
                                <Button onClick={this.props.onPostOrder} block color="info">Passer la commande</Button>
                            </Col>
                        </Row>
                    </>
                );
            }
        }

        return (
            <div>
                <Col xs={12} className="Cart p-0">
                    {redirect}
                    <Breadcrumb main="Panier" icon="shopping-cart" />
                    <PresentationalContainer user bg="light" className="py-0">
                        <SpecialTitle user icon="shopping-cart">Panier</SpecialTitle>
                        <Subtitle>Ici, vous pouvez consulter la liste des produits que vous avez ajoutés à votre panier d'achats.</Subtitle>
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
    onShopReset: () => dispatch(actions.shopReset()),
    onGetCart: () => dispatch(actions.getCart()),
    onAddCartItem: productId => dispatch(actions.addCartItem(productId)),
    onSubtractCartItem: productId => dispatch(actions.subtractCartItem(productId)),
    onDeleteCartItem: productId => dispatch(actions.deleteCartItem(productId)),
    onClearCart: () => dispatch(actions.clearCart()),
    onPostOrder: () => dispatch(actions.postOrder()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));