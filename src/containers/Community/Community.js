import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Spinner, Modal, ModalHeader, ModalBody, Media, Card, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import SeparatorLine from '../../components/UI/SeparatorLine/SeparatorLine';
import ArticleCard from '../../components/UI/ArticleCard/ArticleCard';
import Error from '../../components/Error/Error';
import PresentationalContainer from '../../components/UI/PresentationalContainer/PresentationalContainer';
import * as actions from '../../store/actions';

class Community extends Component {
    state = {
        modal: false
    }

    componentDidMount() {
        if (this.props.auth.authPage) this.props.onAuthPageOff();
        if (this.props.auth.userPage) this.props.onUserPageOff();
        this.props.onGetCommunity(this.props.match.params.userId);
    }

    toggle = () => {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }

    componentWillUnmount() {
        this.props.onShopReset();
    }

    render() {
        const { modal } = this.state;
        const { shop: { community, loading: shopLoading, error: shopError }, auth: { profile, authLoading, authError } } = this.props;
        let content = null;
        let errors = null;

        if (shopLoading || authLoading) content = (
            <div className="text-center">
                <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
            </div>
        );
        else {
            errors = <>
                <Error err={shopError} />
                <Error err={authError} />
            </>;
            if (community && profile) {
                const products = community.products.length === 0 ? <Col>Aucun produit pour le moment</Col> : community.products.map(product => <ArticleCard price={product.price} key={product._id} link={"/shop/" + product._id} src={"http://localhost:8080/" + product.imageUrl} md={4} lg={3} title={product.title} subtitle={product.description.length < 30 ? product.description : product.description.substr(0, 27) + "..."} />);

                content = (
                    <>
                        <Breadcrumb items={[{ to: '/communities', content: 'Communautés' }]} main={community.name} icon="user-friends" />
                        <Col className="position-relative" style={{ top: -15 }}>
                            <div className="row">
                                <div className="w-100"><img src={community.imageUrl !== "/" ? "http://localhost:8080/" + community.imageUrl : "https://placehold.it/1500x300"} alt={community.name} className="img-fluid w-100" style={{ objectPosition: 'center', objectFit: 'cover', height: 300 }} /></div>
                            </div>
                            <div className="position-absolute container text-right" style={{ left: 0, bottom: 15 }}>
                                <h3 className="text-white" style={{ textShadow: '1px 1px 5px black' }}>{community.name}</h3>
                                <div className="btn-group">
                                    {community.owner._id !== profile.userId ? (profile.communities.includes(community.owner._id) ? <Button size="sm" color="danger" onClick={() => this.props.onQuitCommunity(this.props.match.params.userId)}><FontAwesomeIcon icon="user-friends" fixedWidth className="mr-1" />Quitter la communauté</Button> : <Button size="sm" color="info" onClick={() => this.props.onJoinCommunity(this.props.match.params.userId)}><FontAwesomeIcon icon="user-friends" fixedWidth className="mr-1" />Rejoindre la communauté</Button>) : null}
                                    <NavLink to={"/chat"} className="btn btn-sm btn-light"><FontAwesomeIcon icon="comments" fixedWidth className="mr-1" />Groupe de discussion</NavLink>
                                </div>
                            </div>
                        </Col>

                        <div className="position-relative" style={{ top: -15 }}>
                            <SeparatorLine />
                            <div className="py-5 bg-light">
                                <div className="container">
                                    <div className="lead">
                                        {community.description}
                                    </div>
                                </div>
                            </div>
                            <SeparatorLine />
                        </div>

                        <PresentationalContainer user innerClassName="container">
                            <Row>
                                <Col xs={12}>
                                    <Row className="justify-content-center">

                                        <Modal isOpen={modal} size="lg" toggle={this.toggle}>
                                            <ModalHeader toggle={this.toggle}>Produits de la communauté</ModalHeader>
                                            <ModalBody>
                                                <div className="container-fluid">
                                                    <Row>
                                                        {products}
                                                    </Row>
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                        <Col xs={12} className="pb-3">
                                            <div className="py-2 px-5">
                                                <Row className="justify-content-center">
                                                    <Col md={8}>
                                                        <Media>
                                                            <Media left className="mr-5">
                                                                <Media object src={"http://localhost:8080/" + community.owner.photo} alt={community.owner.name} style={{ objectFit: "cover", objectPosition: "center", width: 100, height: 100 }} className="img-fluid rounded-circle" />
                                                            </Media>
                                                            <Media body>
                                                                <Media heading>
                                                                    {community.owner.name}
                                                                </Media>
                                                                <Col xs={12} md={10} className="p-0">
                                                                    <Row className="py-3">
                                                                        <Col><strong>{community.products.length}</strong> produit{community.products.length > 1 ? "s" : ""}</Col>
                                                                        <Col><strong>{community.followers.length}</strong> abonné{community.followers.length > 1 ? "s" : ""}</Col>
                                                                        <Col><strong>{community.following.length}</strong> abonnement{community.following.length > 1 ? "s" : ""}</Col>
                                                                    </Row>
                                                                </Col>
                                                                <span className="text-muted">{community.owner.role}</span>
                                                            </Media>
                                                        </Media>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col xs={12} className="pb-3">
                                            <Card className="p-5">
                                                <h3 className="text-left">Produits les plus récents</h3>
                                                <div className="text-right mb-3">
                                                    <Button onClick={this.toggle} color="danger" size="sm"><FontAwesomeIcon icon="circle" fixedWidth className="mr-2" />Tous les produits</Button>
                                                </div>
                                                <Row className="justify-content-center">
                                                    {!products.length ? products : products.map((p, i) => i < 5 ? p : null)}
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </PresentationalContainer>
                    </>
                );
            }
        }

        return (
            <div>
                <Col xs={12} className="p-0">
                    {errors}
                    {content}
                </Col>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOff: () => dispatch(actions.userPageOff()),
    onShopReset: () => dispatch(actions.shopReset()),
    onAuthErrorReset: () => dispatch(actions.authErrorReset()),
    onGetProfile: () => dispatch(actions.getProfile()),
    onGetCommunity: userId => dispatch(actions.getCommunity(userId)),
    onJoinCommunity: userId => dispatch(actions.joinCommunity(userId)),
    onQuitCommunity: userId => dispatch(actions.quitCommunity(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);