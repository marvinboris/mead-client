import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Col, Spinner, Media } from 'reactstrap';

import * as actions from '../../../store/actions';
import Breadcrumb from '../../../components/Admin/UI/Breadcrumb/Breadcrumb';
import PresentationalContainer from '../../../components/UI/PresentationalContainer/PresentationalContainer';
import SpecialTitle from '../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../components/Error/Error';

class Communities extends Component {
    componentDidMount() {
        const { onAuthPageOff, onUserPageOn, onGetMyCommunities, auth: { authPage, userPage } } = this.props;
        if (authPage) onAuthPageOff();
        if (!userPage) onUserPageOn();
        onGetMyCommunities();
    }

    render() {
        const { shop: { communities, loading, error } } = this.props;
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
            if (communities) {
                const communityItems = communities.map(({ owner, name, imageUrl }, index) => {
                    return (index > 0 ? <Col className="pb-3 pt-2 mb-3 shadow-sm bg-white" key={owner._id}>
                        <Media>
                            <Media left>
                                <Media object src={imageUrl ? "http://localhost:8080/" + imageUrl : "holder.js/64x64"} style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center' }} className="rounded-circle mr-2" alt={name} />
                            </Media>
                            <Media body>
                                <Media heading>
                                    <NavLink to={"/communities/" + owner._id} className="text-reset">{name}</NavLink>
                                </Media>
                                Propriétaire : <strong>{owner.name}</strong>
                            </Media>
                        </Media>
                    </Col> : null);
                });

                content = (communityItems.length > 0 ? communityItems : <h3 className="text-center">Aucune communauté suivie pour le moment.</h3>);
            }
        }

        return (
            <div>
                <Col xs={12} className="p-0">
                    <Breadcrumb main="Mes communautés" icon="store" />
                    <PresentationalContainer user bg="light">
                        <SpecialTitle user icon="store">Mes communautés</SpecialTitle>
                        <Subtitle>Ici, vous pouvez consulter la liste des communautés que vous suivez.</Subtitle>
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
    onGetInvoice: orderId => dispatch(actions.getInvoice(orderId)),
    onGetMyCommunities: () => dispatch(actions.getMyCommunities()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Communities));