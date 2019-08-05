import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SeparatorLine from '../UI/SeparatorLine/SeparatorLine';

import Hero1 from '../../assets/images/hero_1.jpg';

const footer = () => (
    <>
        <SeparatorLine />
        <SeparatorLine />
        <SeparatorLine />
        <SeparatorLine />
        <footer className="container-fluid bg-light border-bottom py-5">
            <Container>
                <Row>
                    <Col lg={6}>
                        <h5>Navigation</h5>
                        <Row>
                            <Col xs={4}>
                                <ul className="list-unstyled">
                                    <li><NavLink className="text-black-50" to="/">Vendre en ligne</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Fonctionnalités</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Chariot d'achats</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Magasin</NavLink></li>
                                </ul>
                            </Col>
                            <Col xs={4}>
                                <ul className="list-unstyled">
                                    <li><NavLink className="text-black-50" to="/">E-commerce</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Dropshipping</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Développement de sites web</NavLink></li>
                                </ul>
                            </Col>
                            <Col xs={4}>
                                <ul className="list-unstyled">
                                    <li><NavLink className="text-black-50" to="/">Point de ventes</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Matériel</NavLink></li>
                                    <li><NavLink className="text-black-50" to="/">Logiciel</NavLink></li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col xs={6}>
                                <h5>Promo</h5>
                                <div className="embed-responsive embed-responsive-16by9 mb-3">
                                    <img className="embed-responsive-item rounded" src={Hero1} alt="Footer shoes" />
                                </div>
                                <NavLink className="text-dark text-decoration-none" to="/"><span className="text-danger">Trouvez vos chaussures idéales</span><br />Promo du 15 au 25 Août 2019</NavLink>
                            </Col>
                            <Col xs={6}>
                                <h5>Info contact</h5>
                                <ul className="fa-ul mb-3 p-0 ml-4">
                                    <li><FontAwesomeIcon icon="map-marker-alt" className="fa-li text-danger mr-2" />Voici notre emplacement</li>
                                    <li><FontAwesomeIcon icon="phone" className="fa-li text-danger mr-2" /><a className="text-reset" href="tel://+237656395217">(+237) 656-39-52-17</a></li>
                                    <li><FontAwesomeIcon icon="envelope" className="fa-li text-danger mr-2" />ulrichnatsou@gmail.com</li>
                                </ul>

                                <h5 className="font-weight-light">Souscrire</h5>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
        <footer className="text-center bg-light text-secondary py-5">
            <Container>
                Copyright &copy; 2019. Tous droits réservés. | Designed by <a href="mailto:jaris.ultio.21@gmail.com"><span className="text-info">Brainer</span> <span className="text-danger">21</span></a>
            </Container>
        </footer>
    </>
);

export default footer;