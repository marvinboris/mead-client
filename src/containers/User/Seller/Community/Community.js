import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Spinner, Card, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from '../../../../components/UI/Input/Input';
import Breadcrumb from '../../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import ArticleCard from '../../../../components/UI/ArticleCard/ArticleCard';
import Error from '../../../../components/Error/Error';
import * as actions from '../../../../store/actions';
import { updateObject, checkValidity } from '../../../../shared/utility';

class Community extends Component {
    state = {
        modal: false,
        formValid: true,
        formError: false,
        formLoading: false,
        controls: {
            name: {
                elementConfig: {
                    type: 'text',
                    label: 'Nom de la communauté',
                    autoFocus: true
                },
                icon: 'heading',
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                },
                valid: true,
                touched: true,
            },
            image: {
                elementConfig: {
                    type: 'file',
                    label: 'Image de profil'
                },
                icon: 'image',
                value: '',
                validation: {},
                valid: true,
                touched: true,
            },
            description: {
                elementConfig: {
                    type: 'textarea',
                    label: 'Description'
                },
                icon: 'paragraph',
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                },
                valid: true,
                touched: true,
            }
        }
    }

    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetMyCommunity, onGetProfile } = this.props;
        onAuthPageOff();
        onUserPageOn();
        onGetProfile();
        onGetMyCommunity();
    }

    toggle = () => {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.shop.community !== this.props.shop.community) {
            nextState = { ...this.state };
            Object.keys(nextState.controls).forEach(control => {
                nextState.controls[control].value = nextProps.shop.community[control];
            });
        }
    }

    componentWillUnmount() {
        this.props.onShopReset();
    }

    inputChangedHandler = (event) => {
        const { files, name, value } = event.target;
        const { controls } = this.state;
        this.setState(updateObject(this.state, {
            controls: updateObject(controls, {
                [name]: updateObject(controls[name], {
                    value: files ? files[0] : value,
                    valid: checkValidity(value, controls[name].validation),
                    touched: true
                })
            })
        }));

        let formValid = true;
        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                const element = controls[key];
                formValid = formValid && element.valid;
            }
        }
        this.setState({ formValid });
    }

    submitHandler = event => {
        const { formValid, controls } = this.state;
        event.preventDefault();
        const data = {};

        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                const element = controls[key];
                data[key] = element.value;
            }
        }

        if (formValid) {
            this.props.onShopErrorReset();
            this.props.onPostMyCommunity(data);
            this.setState({ formError: false });
        }
        else this.setState({ formError: true });
    }

    render() {
        const { controls, formValid, formError, formLoading, modal } = this.state;
        const { shop: { community, loading: shopLoading, error: shopError }, auth: { profile, loading: authLoading, error: authError } } = this.props;
        let content = null;
        let errors = null;

        let globalError = null;
        if (!formValid && formError) globalError = "Veuillez vérifier vos informations.";

        errors = <>
            <Error err={globalError} />
            <Error err={shopError} />
            <Error err={authError} />
        </>;

        let form = null;
        if (formLoading || shopLoading || authLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            if (community) {
                const formContent = Object.keys(controls).map(control => (
                    <Input
                        key={control}
                        onChange={event => this.inputChangedHandler(event)}
                        name={control}
                        value={controls[control].value}
                        icon={controls[control].icon}
                        className={controls[control].elementConfig.className}
                        check={['radio', 'checkbox'].includes(controls[control].elementConfig.type)}
                        select={controls[control].elementConfig.type === 'select'}
                        file={controls[control].elementConfig.type === 'file'}
                        options={controls[control].elementConfig.options}
                        required={controls[control].validation.required}
                        type={controls[control].elementConfig.type}
                        invalid={!controls[control].valid}
                        touched={controls[control].touched}
                        shouldValidate={controls[control].validation ? true : false}
                        autoFocus={controls[control].elementConfig.autoFocus}>{controls[control].elementConfig.label}</Input>
                ));

                form = (
                    <>
                        {globalError ? <div className="alert alert-danger">{globalError}</div> : null}
                        {shopError ? <div className="alert alert-danger">{shopError.message}</div> : null}
                        {authError ? <div className="alert alert-danger">{authError.message}</div> : null}
                        <Form onSubmit={event => this.submitHandler(event)}>
                            {formContent}
                            <FormGroup>
                                <Button color="danger">Modifier<FontAwesomeIcon icon="edit" size="lg" className="ml-1" /></Button>
                            </FormGroup>
                        </Form>
                    </>
                );

                const products = community.products.length === 0 ? <Col>Aucun produit pour le moment</Col> : community.products.map(product => <ArticleCard price={product.price} key={product._id} link={"/community/products/" + product._id + "/edit"} src={"http://localhost:8080/" + product.imageUrl} md={4} lg={3} title={product.title} subtitle={product.description.length < 30 ? product.description : product.description.substr(0, 27) + "..."} />);

                content = (
                    <Row>
                        <Col xs={12}>
                            <Row className="justify-content-center">
                                <Col xs={12} className="pb-3 position-relative">
                                    <div><img src={community.imageUrl !== "/" ? "http://localhost:8080/" + community.imageUrl : "https://placehold.it/1500x300"} alt={community.name} className="img-fluid rounded w-100" style={{ objectPosition: 'center', objectFit: 'cover', height: 300 }} /></div>
                                    <h3 className="position-absolute text-center text-white w-100" style={{ bottom: 30, left: 0, textShadow: '1px 1px 5px black' }}>{community.name ? community.name : "Communauté de " + profile.name}</h3>
                                    <Button onClick={this.toggle} color="info" size="sm" className="position-absolute shadow-sm rounded" style={{ top: 0, right: 15, borderTopLeftRadius: 0, borderBottomRightRadius: 0 }}><FontAwesomeIcon size="lg" icon="edit" /></Button>

                                    <Modal isOpen={modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Paramètres de la communauté</ModalHeader>
                                        <ModalBody>
                                            {form}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                                <Col xs={12} className="pb-3">
                                    <Card className="p-5">
                                        <Media>
                                            <Media left className="mr-5">
                                                <Media object src={"http://localhost:8080/" + profile.photo} alt={profile.name} style={{ objectFit: "cover", objectPosition: "center", width: 100, height: 100 }} className="img-fluid rounded-circle" />
                                            </Media>
                                            <Media body>
                                                <Media heading>
                                                    {profile.name}
                                                </Media>
                                                <Col xs={12} md={10} className="p-0">
                                                    <Row className="py-3">
                                                        <Col><strong>{community.products.length}</strong> produit{community.products.length > 1 ? "s" : ""}</Col>
                                                        <Col><strong>{community.followers.length}</strong> abonné{community.followers.length > 1 ? "s" : ""}</Col>
                                                        <Col><strong>{community.following.length}</strong> abonnement{community.following.length > 1 ? "s" : ""}</Col>
                                                    </Row>
                                                </Col>
                                                <span className="text-muted">{profile.role}</span>
                                            </Media>
                                        </Media>
                                    </Card>
                                </Col>
                                <Col xs={12} className="pb-3">
                                    <Card className="p-5">
                                        <h3 className="text-left">Produits les plus récents</h3>
                                        <div className="text-right mb-3">
                                            <NavLink to="/community/products/create" className="btn btn-info btn-sm mr-2"><FontAwesomeIcon icon="plus" fixedWidth className="mr-2" />Ajouter un produit</NavLink>
                                            <NavLink to="/community/products" className="btn btn-danger btn-sm"><FontAwesomeIcon icon="circle" fixedWidth className="mr-2" />Tous les produits</NavLink>
                                        </div>
                                        <Row className="justify-content-center">
                                            {products}
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                );
            }
        }

        return (
            <div>
                <Col xs={12} className="p-0">
                    <Breadcrumb main="Ma communauté" icon="user-friends" />
                    <PresentationalContainer user bg="light">
                        <SpecialTitle user icon="user-friends">Ma communauté</SpecialTitle>
                        <Subtitle>Ici, vous pouvez consulter votre communauté.</Subtitle>
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
    onShopErrorReset: () => dispatch(actions.shopErrorReset()),
    onGetProfile: () => dispatch(actions.getProfile()),
    onGetMyCommunity: () => dispatch(actions.getMyCommunity()),
    onPostMyCommunity: data => dispatch(actions.postMyCommunity(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Community));