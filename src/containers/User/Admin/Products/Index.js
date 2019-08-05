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
        const { onAuthPageOff, onUserPageOn, onGetProducts, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetProducts();
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
        const { admin: { error, productLoading, products }, onDestroyProduct } = this.props;
        let content = null;
        let errors = null;

        if (productLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (products) {
                const productsData = products.map(product => updateObject(product, {
                    user: product.userId.name,
                    title: <NavLink to={"/admin/products/" + product._id}>{product.title}</NavLink>,
                    description: product.description.substr(0, 100),
                    createdAt: moment(product.createdAt).fromNow(),
                    updatedAt: moment(product.updatedAt).fromNow(),
                    delete: <div className="text-center"><Button onClick={() => onDestroyProduct(product._id)} color="danger"><FontAwesomeIcon className="text-white" icon="times" /></Button></div>
                }));
                content = (
                    <Row>
                        <Table array={productsData} select selectHandler={this.allSelectedHandler} className="bg-white border rounded shadow" title="Liste des produits" bordered xl={12} fields={[
                            { name: 'Titre', key: 'title' }, { name: 'Description', key: 'description' }, { name: 'Ajouté par', key: 'user' }, { name: 'Créé', key: 'createdAt' }, { name: 'Modifié', key: 'updatedAt' }, { name: 'Supprimer', key: 'delete' }
                        ]}>
                            <div className="text-right py-2">
                                <ButtonGroup>
                                    <NavLink className="btn btn-info btn-sm" to="/admin/products/create"><FontAwesomeIcon icon="plus" fixedWidth className="mr-1" />Ajouter</NavLink>
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
                <Breadcrumb main="Produits" icon={["fab", "product-hunt"]} />
                <PresentationalContainer user bg="light">
                    <SpecialTitle user icon={["fab", "product-hunt"]}>Produits</SpecialTitle>
                    <Subtitle>Ici, vous pouvez trouver la liste de tous les produits de l'application.</Subtitle>
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
    onDestroyProduct: productId => dispatch(actions.adminDestroyProduct(productId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));