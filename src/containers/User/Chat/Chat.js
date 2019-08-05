import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner, TabContent, TabPane } from 'reactstrap';
import openSocket from 'socket.io-client';
import JSEMOJI from 'emoji-js';

import * as actions from '../../../store/actions';
import AdminToolbar from '../../../components/Admin/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../../components/Chat/Navigation/SideDrawer/SideDrawer';
import Community from '../../../components/Chat/Community/Community';
import Error from '../../../components/Error/Error';
import Logo from '../../../components/UI/Logo/Logo';

// new instance
const jsemoji = new JSEMOJI();
jsemoji.img_set = 'emojione';
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

jsemoji.supports_css = false;
jsemoji.allow_native = true;
jsemoji.replace_mode = 'unified';

class Chat extends Component {
    state = {
        activeTab: null,
        search: "",
        content: "",
        communities: null,
        emojiPickerShown: false
    }

    componentDidMount() {
        const { onAuthPageOn, onUserPageOff, onGetCommunities } = this.props;
        onAuthPageOn();
        onUserPageOff();
        onGetCommunities();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shop.communities !== null) {
            this.setState({
                communities: [...nextProps.shop.communities]
            }, () => {
                const socket = openSocket('http://localhost:8080');
                socket.on('message', data => {
                    if (data.action === 'new') {
                        const index = this.state.communities.findIndex(community => community.owner._id.toString() === data.message.communityId.toString());
                        let newCommunities = [...this.state.communities];
                        const newMessageIndex = newCommunities[index].messages.findIndex(message => message._id.toString() === data.message._id.toString());
                        if (newMessageIndex < 0) newCommunities[index].messages.push(data.message);
                        newCommunities.sort((a, b) => {
                            const aLastMessage = a.messages[a.messages.length - 1];
                            const bLastMessage = b.messages[b.messages.length - 1];

                            return new Date(bLastMessage.createdAt).getTime() - new Date(aLastMessage.createdAt).getTime();
                        });
                        this.setState({
                            communities: newCommunities
                        });
                    }
                });
            });
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    inputChangedHandler = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    submitHandler = () => {
        const { content, activeTab } = this.state;
        const { token } = this.props.auth;

        this.setState({ content: '' });

        fetch('http://localhost:8080/auth/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ content, communityId: activeTab })
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Erreur lors de l\'envoi du message.');
                }
                return res.json();
            })
            .then(resData => { })
            .catch(err => {
                console.log(err);
            });
    }

    onEmojiClick = (code, obj) => {
        const emoji = jsemoji.replace_colons(`:${obj.name}:`);
        this.setState(prevState => ({
            content: prevState.content + emoji,
            emojiPickerShown: false
        }), () => document.getElementById('textarea-' + this.state.activeTab).focus());
    }

    onEmojiToggle = () => {
        this.setState(prevState => ({
            emojiPickerShown: !prevState.emojiPickerShown
        }), () => document.getElementById('textarea-' + this.state.activeTab).focus());
    }

    logoutHandler = () => {
        const { onAuthLogout } = this.props;
        onAuthLogout();
        // history.replace(auth.authRedirectPath);
    }

    render() {
        const { activeTab, communities, search, emojiPickerShown } = this.state;
        const { auth: { profile, authError, authLoading }, shop: { cart, shopError, shopLoading } } = this.props;
        const { logoutHandler, toggle, inputChangedHandler, submitHandler } = this;
        const { name, role, photo, notifications } = profile ? profile : { name: null, role: null, photo: null, notifications: null };

        let content = null;
        let errors = null;

        if (shopLoading || authLoading) content = <div className="text-center">
            <Spinner type="grow" color="danger" style={{ width: '5rem', height: '5rem' }} className="mx-auto" size="xl" />
        </div>;
        else {
            errors = <>
                <Error err={authError} />
                <Error err={shopError} />
            </>;

            if (communities) {
                const filteredCommunities = communities.filter(community => community.name.toLowerCase().includes(search.toLowerCase()));
                const tabs = communities.map(community => <TabPane key={'tab-' + community.owner._id} tabId={community.owner._id}>
                    <Community id={community.owner._id} profile={profile} onEmojiToggle={this.onEmojiToggle} onEmojiClick={this.onEmojiClick} emojiPickerShown={emojiPickerShown} onClick={submitHandler} value={this.state.content} onChange={event => inputChangedHandler(event)} community={community} />
                </TabPane>);
                content = <>
                    <SideDrawer onChange={event => inputChangedHandler(event)} activeTab={activeTab} search={search} communities={filteredCommunities} name={name} photo={photo} toggle={toggle} />
                    <main className="bg-light position-relative" style={{ paddingLeft: '30%', height: 'calc(100vh - 57px)' }}>
                        <div className="container-fluid bg-light p-0 position-relative h-100">
                            {activeTab !== null ?
                                <TabContent activeTab={activeTab}>
                                    {tabs}
                                </TabContent> :
                                <div className="bg-light h-100 d-flex justify-content-center align-items-center">
                                    <div className="text-center w-75">
                                        <Logo big />
                                        <h4 className="font-weight-light">
                                            Bienvenue dans l'espace discussion de MEAD
                                        </h4>
                                        <hr />
                                        <p className="text-muted">Pour commencer, veuillez rechercher la communauté de votre choix en utilisant la barre de recherche.</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </main>
                </>;
            }
        }

        return (
            <>
                <AdminToolbar notifications={notifications} name={name} logoWidth={'30%'} role={role} cartItemsNumber={cart.length} logoutHandler={logoutHandler} />
                {errors}
                {content}
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onAuthPageOn: () => dispatch(actions.authPageOn()),
    onUserPageOff: () => dispatch(actions.userPageOff()),
    onAuthLogout: () => dispatch(actions.authLogout()),
    onGetCommunities: () => dispatch(actions.getMyCommunities()),
    onSendMessage: data => dispatch(actions.sendMessage(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));