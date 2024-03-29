import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Owl from 'react-owl';

import './Home.css';
import SeparatorLine from '../../components/UI/SeparatorLine/SeparatorLine';
import MediaBlock from '../../components/UI/MediaBlock/MediaBlock';
import ImageCard from '../../components/UI/ImageCard/ImageCard';
import ArticleCard from '../../components/UI/ArticleCard/ArticleCard';
import Title from '../../components/UI/Titles/Title/Title';
import PresentationalContainer from '../../components/UI/PresentationalContainer/PresentationalContainer';
import * as actions from '../../store/actions';

import TextileModeImage from '../../assets/images/RICHE-BAZIN-Africain-v-tements-Hommes-Africains-Dashiki-Riche-Pour-Hommes-Maxi-V-tements-D-t1.jpg';
import Women from '../../assets/images/women.jpg';
import Children from '../../assets/images/children.jpg';
import Men from '../../assets/images/men.jpg';
import Cloth1 from '../../assets/images/cloth_1.jpg';
import Shoe1 from '../../assets/images/shoe_1.jpg';
import Cloth2 from '../../assets/images/cloth_2.jpg';

class Home extends Component {
    componentDidMount() {
        if (this.props.auth.authPage) this.props.onAuthPageOff();
        if (this.props.auth.userPage) this.props.onUserPageOff();
    }

    render() {
        return (
            <Col xs={12} className="Home p-0">
                <div className="bg-info-danger carousel-home text-white">
                    <Container className="h-100">
                        <Row className="justify-content-center align-items-center h-100">
                            <Col xs={4} className="text-right">
                                <img src={TextileModeImage} className="bg-white img-thumbnail w-100" alt="Le textile et la mode africaine" />
                            </Col>
                            <Col xs={8} className="text-left">
                                <h1 className="display-4">Le textile et la mode africaine</h1>
                                <p>
                                    Cognitis enim pilatorum caesorumque funeribus nemo deinde ad has stationes appulit navem, sed ut Scironis praerupta letalia declinantes litoribus Cypriis contigui navigabant, quae Isauriae scopulis sunt controversa.
                                </p>
                                <NavLink to="/shop">
                                    <Button color="light" className="text-uppercase btn-lg">Aller à la boutique<FontAwesomeIcon icon="shopping-cart" className="ml-1" /></Button>
                                </NavLink>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <PresentationalContainer>
                    <Row>
                        <MediaBlock lg={4} icon="tshirt" heading="Vêtements africains">Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.</MediaBlock>
                        <MediaBlock lg={4} icon="store-alt" heading="Boutique en ligne">Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.</MediaBlock>
                        <MediaBlock lg={4} icon="handshake" heading="Partenaire sûr">Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.</MediaBlock>
                    </Row>
                </PresentationalContainer>
                <SeparatorLine />
                <PresentationalContainer bg="light">
                    <Row className="justify-content-center">
                        <ImageCard md={6} lg={4} src={Women} height={400}>Femmes</ImageCard>
                        <ImageCard md={6} lg={4} src={Children} height={400}>Enfants</ImageCard>
                        <ImageCard md={6} lg={4} src={Men} height={400}>Hommes</ImageCard>
                    </Row>
                </PresentationalContainer>
                <SeparatorLine />
                <PresentationalContainer>
                    <Title className="mb-3">Quelques uns de <span className="text-info">nos</span> <span className="text-danger">produits</span></Title>
                    <Owl direction="right">
                        <Row className="justify-content-center">
                            <ArticleCard md={6} lg={4} src={Cloth1} link="/" title="Débardeur" subtitle="Trouver le t-shirt parfait" price={5000} />
                            <ArticleCard md={6} lg={4} src={Shoe1} link="/" title="Corater" subtitle="Trouver des produits parfaits" price={5000} />
                            <ArticleCard md={6} lg={4} src={Cloth2} link="/" title="Chemise polo" subtitle="Trouver des produits parfaits" price={5000} />
                        </Row>
                    </Owl>
                </PresentationalContainer>
                <SeparatorLine />
            </Col>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOff: () => dispatch(actions.authPageOff()),
    onUserPageOff: () => dispatch(actions.userPageOff()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);