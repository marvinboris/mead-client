import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Card, Badge } from 'reactstrap';

import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import ImageCard from '../../components/UI/ImageCard/ImageCard';
import ArticleCard from '../../components/UI/ArticleCard/ArticleCard';
import Title from '../../components/UI/Title/Title';
import SeparatorLine from '../../components/UI/SeparatorLine/SeparatorLine';
import PresentationalContainer from '../../components/UI/PresentationalContainer/PresentationalContainer';

import Women from '../../assets/images/women.jpg';
import Children from '../../assets/images/children.jpg';
import Men from '../../assets/images/men.jpg';
import Cloth1 from '../../assets/images/cloth_1.jpg';
import Shoe1 from '../../assets/images/shoe_1.jpg';
import Cloth2 from '../../assets/images/cloth_2.jpg';

class Shop extends Component {
    render() {
        return (
            <div>
                <Col xs={12} className="Shop p-0">
                    <Breadcrumb main="Achats" />
                    <PresentationalContainer>
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
                            </Col>
                            <Col lg={9} className="pt-3">
                                <h4 className="text-dark">Boutique</h4>
                                <Row className="mt-5">
                                    <ArticleCard md={6} lg={4} src={Cloth1} link="/" title="Débardeur" subtitle="Trouver le t-shirt parfait" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Shoe1} link="/" title="Corater" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth2} link="/" title="Chemise polo" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth1} link="/" title="Débardeur" subtitle="Trouver le t-shirt parfait" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Shoe1} link="/" title="Corater" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth2} link="/" title="Chemise polo" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth1} link="/" title="Débardeur" subtitle="Trouver le t-shirt parfait" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Shoe1} link="/" title="Corater" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth2} link="/" title="Chemise polo" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth1} link="/" title="Débardeur" subtitle="Trouver le t-shirt parfait" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Shoe1} link="/" title="Corater" subtitle="Trouver des produits parfaits" price={5000} />
                                    <ArticleCard md={6} lg={4} src={Cloth2} link="/" title="Chemise polo" subtitle="Trouver des produits parfaits" price={5000} />
                                </Row>
                            </Col>
                        </Row>
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

export default connect(null, null)(Shop);