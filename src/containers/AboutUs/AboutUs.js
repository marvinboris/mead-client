import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';

import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import Title from '../../components/UI/Title/Title';
import MediaBlock from '../../components/UI/MediaBlock/MediaBlock';
import SeparatorLine from '../../components/UI/SeparatorLine/SeparatorLine';
import PresentationalContainer from '../../components/UI/PresentationalContainer/PresentationalContainer';
import TeamMemberCard from '../../components/UI/TeamMemberCard/TeamMemberCard';

import Blog1 from '../../assets/images/blog_1.jpg';

class AboutUs extends Component {
    render() {
        return (
            <Col xs={12} className="AboutUs p-0">
                <Breadcrumb main="À propos" />
                <PresentationalContainer>
                    <Row>
                        <Col lg={6} className="img-responsive">
                            <img src={Blog1} alt="Sub-banner" className="img-fluid" />
                        </Col>
                        <Col lg={6} className="text-black-50">
                            <Title className="text-dark">Comment <span className="text-info">nous</span> avons <span className="text-danger">commencé</span></Title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius repellat, dicta at laboriosam, nemo exercitationem itaque eveniet architecto cumque, deleniti commodi molestias repellendus quos sequi hic fugiat asperiores illum. Atque, in, fuga excepturi corrupti error corporis aliquam unde nostrum quas.
                            </p>
                            <p>
                                Accusantium dolor ratione maiores est deleniti nihil? Dignissimos est, sunt nulla illum autem in, quibusdam cumque recusandae, laudantium minima repellendus.
                            </p>
                        </Col>
                    </Row>
                </PresentationalContainer>
                <SeparatorLine />
                <PresentationalContainer innerClassName="text-center" bg="light">
                    <Title>L'équipe</Title>
                    <Row>
                        <TeamMemberCard lg={4} name="Ulrich Emabou" title="PCA">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.
                        </TeamMemberCard>
                        <TeamMemberCard lg={4} name="Eric Junior Njanda" title="Directeur Marketing">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.
                        </TeamMemberCard>
                        <TeamMemberCard lg={4} name="Boris Marvin Ndouma" title="Spectateur">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta.
                        </TeamMemberCard>
                    </Row>
                </PresentationalContainer>
                <SeparatorLine />
                <PresentationalContainer>
                    <Row>
                        <MediaBlock lg={4} icon="tshirt" heading="Vêtements africains">
                            Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.
                        </MediaBlock>
                        <MediaBlock lg={4} icon="store-alt" heading="Boutique en ligne">
                            Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.
                        </MediaBlock>
                        <MediaBlock lg={4} icon="handshake" heading="Partenaire sûr">
                            Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.
                        </MediaBlock>
                    </Row>
                </PresentationalContainer>
            </Col>
        );
    }
}

export default connect(null, null)(AboutUs);