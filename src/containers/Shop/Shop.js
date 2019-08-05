import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Card, Badge, Spinner, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import ImageCard from '../../components/UI/ImageCard/ImageCard';
import ArticleCard from '../../components/UI/ArticleCard/ArticleCard';
import Error from '../../components/Error/Error';
import Title from '../../components/UI/Titles/Title/Title';
import SeparatorLine from '../../components/UI/SeparatorLine/SeparatorLine';
import PresentationalContainer from '../../components/UI/PresentationalContainer/PresentationalContainer';
import * as actions from '../../store/actions';

import Women from '../../assets/images/women.jpg';
import Children from '../../assets/images/children.jpg';
import Men from '../../assets/images/men.jpg';

class Shop extends Component {
    state = {
        latestDropdownOpen: false,
        referenceDropdownOpen: false
    }

    componentDidMount() {
        if (this.props.auth.authPage) this.props.onAuthPageOff();
        if (this.props.auth.userPage) this.props.onUserPageOff();
        this.props.onGetProducts();
    }

    componentWillMount() {
        this.props.onShopReset();
    }

    componentWillUnmount() {
        this.props.onShopReset();
    }

    latestToggle = () => {
        this.setState(prevState => ({
            latestDropdownOpen: !prevState.latestDropdownOpen
        }));
    }

    referenceToggle = () => {
        this.setState(prevState => ({
            referenceDropdownOpen: !prevState.referenceDropdownOpen
        }));
    }

    render() {
        const { shop: { loading, products, error } } = this.props;
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
            if (products) {
                const articles = products.map(({ imageUrl, title, description, price, _id }) => <ArticleCard key={_id} md={6} lg={4} src={"http://localhost:8080/" + imageUrl} link={"/shop/" + _id} title={title} subtitle={description} price={price} />);

                content = (
                    <Row>
                        <Col lg={3} className="pt-3">
                            <Card className="p-3">
                                <h6 className="text-dark text-uppercase">Catégories</h6>
                                <ul className="list-unstyled">
                                    <li><NavLink className="text-decoration-none" to="/"><span className="text-info">Enfants</span><Badge className="float-right" color="danger">2404</Badge></NavLink></li>
                                    <li><NavLink className="text-decoration-none" to="/"><span className="text-info">Femmes</span><Badge className="float-right" color="danger">2000</Badge></NavLink></li>
                                    <li><NavLink className="text-decoration-none" to="/"><span className="text-info">Hommes</span><Badge className="float-right" color="danger">2121</Badge></NavLink></li>
                                </ul>
                            </Card>
                            <Card className="p-3 mt-3">
                                <h6 className="text-dark text-uppercase">Filtrer par prix</h6>
                                <div className="pb-3">
                                    <Input type="range" />
                                </div>

                                <h6 className="text-dark text-uppercase">Taille</h6>
                                <ul className="list-unstyled pl-4">
                                    <li><Input type="checkbox" className="mr-2" />S <Badge color="secondary">2404</Badge></li>
                                    <li><Input type="checkbox" className="mr-2" />M <Badge color="secondary">2000</Badge></li>
                                    <li><Input type="checkbox" className="mr-2" />L <Badge color="secondary">3004</Badge></li>
                                </ul>

                                <h6 className="text-dark text-uppercase">Couleurs</h6>
                                <ul className="list-unstyled">
                                    <li><FontAwesomeIcon icon="circle" fixedWidth className="mr-2 text-danger" />Rouge</li>
                                    <li><FontAwesomeIcon icon="circle" fixedWidth className="mr-2 text-success" />Vert</li>
                                    <li><FontAwesomeIcon icon="circle" fixedWidth className="mr-2 text-primary" />Bleu</li>
                                    <li><FontAwesomeIcon icon="circle" fixedWidth className="mr-2 text-warning" />Jaune</li>
                                </ul>
                            </Card>
                        </Col>
                        <Col lg={9} className="pt-3">

                            <Dropdown isOpen={this.state.referenceDropdownOpen} className="ml-2 float-right" toggle={this.referenceToggle}>
                                <DropdownToggle caret>
                                    Référence
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Importance</DropdownItem>
                                    <DropdownItem>Nom, A à Z</DropdownItem>
                                    <DropdownItem>Nom, Z à A</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Prix, bas à élevé</DropdownItem>
                                    <DropdownItem>Prix, élevé à bas</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown isOpen={this.state.latestDropdownOpen} className="float-right" toggle={this.latestToggle}>
                                <DropdownToggle caret>
                                    Derniers
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Hommes</DropdownItem>
                                    <DropdownItem>Femmes</DropdownItem>
                                    <DropdownItem>Enfants</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <h4 className="text-dark">Boutique</h4>
                            <Row className="mt-5">
                                {articles}
                            </Row>
                        </Col>
                    </Row>
                );
            }
        }

        return (
            <div>
                <Col xs={12} className="Shop p-0">
                    <Breadcrumb main="Achats" />
                    <PresentationalContainer>
                        {errors}
                        {content}
                    </PresentationalContainer>
                    <SeparatorLine />
                    <PresentationalContainer>
                        <Title className="text-center">Catégories</Title>
                        <Row className="mt-5">
                            <ImageCard md={6} lg={4} src={Women} height={400}>Femmes</ImageCard>
                            <ImageCard md={6} lg={4} src={Children} height={400}>Enfants</ImageCard>
                            <ImageCard md={6} lg={4} src={Men} height={400}>Hommes</ImageCard>
                        </Row>
                    </PresentationalContainer>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOff: () => dispatch(actions.userPageOff()),
    onGetProducts: () => dispatch(actions.getProducts()),
    onShopReset: () => dispatch(actions.shopReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);