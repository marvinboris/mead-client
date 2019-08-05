import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';
import moment from 'moment';
import $ from 'jquery';
import TextareaAutoResize from 'react-autosize-textarea';
import EmojiPicker from 'emoji-picker-react';

import './Community.css';

import Wall from '../../../assets/images/whatsapp_wall.jpg';


class Community extends Component {
    componentDidMount() {
        const chatbox = document.getElementById('chatbox-' + this.props.id);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    componentDidUpdate(prevProps, prevState) {
        const chatbox = document.getElementById('chatbox-' + this.props.id);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    resizedHandler = event => {
        const chatbox = document.getElementById('chatbox-' + this.props.id);

        const textareaContainerHeight = $('#textarea-' + this.props.id).parent().parent().outerHeight();
        const bodyHeight = $('body').outerHeight();
        chatbox.style.height = (bodyHeight - textareaContainerHeight - 110) + "px";
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    onKeyDown = event => {
        if (+event.which === 13) {
            event.preventDefault();
            this.props.onClick();
        }
    }

    render() {
        const { community, onChange, onClick, value, profile, onEmojiToggle, emojiPickerShown } = this.props;
        let emojiPicker = null;

        if (emojiPickerShown) emojiPicker = <div className="position-absolute" style={{ zIndex: 10, bottom: 'calc(100% - 2px)', left: 10 }}>
            <EmojiPicker onEmojiClick={(code, obj) => this.props.onEmojiClick(code, obj)} />
        </div>;

        if (community) {
            const messages = community.messages.map((message, index) => {
                let additionalClassName = "justify-content-start";
                let color = "";
                let date = null;
                let user = null;

                if (message.userId._id.toString() === profile.userId.toString()) {
                    color = "bg-my-message text-dark";
                    additionalClassName = "justify-content-end";
                } else {
                    if ((community.messages[index - 1] && community.messages[index - 1].userId._id.toString() !== community.messages[index].userId._id.toString()) || !community.messages[index - 1]) {
                        user = <strong>{message.userId.name}</strong>;
                    }
                    color = "bg-white text-dark";
                }

                if (!community.messages[index - 1] || moment(community.messages[index].createdAt).format('L') !== moment(community.messages[index - 1].createdAt).format('L')) {
                    let displayDate = moment(message.createdAt).format('L');
                    const today = moment().format('L').split('/');
                    const [month, day, year] = displayDate.split('/');
                    if (month === today[0] && year === today[2] && day === today[1]) displayDate = "Today";
                    else if (month === today[0] && year === today[2] && +day === +today[1] - 1) displayDate = "Yesterday";

                    date = <div className="d-flex my-2 justify-content-center" key={message.createdAt}>
                        <div className="rounded shadow-sm px-2 py-1 bg-info">
                            <div className="text-white small">{displayDate}</div>
                        </div>
                    </div>;
                }

                return <div key={message._id} className="py-1">
                    {date}
                    <div className={"d-flex " + additionalClassName}>
                        <div className={"rounded shadow-sm px-2 py-1 " + color} style={{ maxWidth: '80%' }}>
                            {user}
                            <div>{message.content}</div>
                            <div className="text-right text-muted small">{moment(message.createdAt).format('LT')}</div>
                        </div>
                    </div>
                </div>;
            });

            let followers = community.followers.map(follower => follower.name);
            followers.sort();
            followers = followers.concat('Vous');

            return (
                <div className="h-100 Community" style={{ fontSize: '.9em' }}>
                    <div className="px-3 d-flex justify-content-start align-items-center py-1 position-absolute bg-light w-100 shadow-sm" style={{ top: 0, zIndex: 1 }}>
                        <div className="flex-shrink mr-2">
                            <img src={"http://localhost:8080/" + community.imageUrl} className="rounded-circle" style={{ height: 45, width: 45, objectFit: 'cover', objectPosition: 'center' }} alt={community.name} />
                        </div>
                        <div className="flex-fill">
                            <h5 className="m-0">{community.name}</h5>
                            <span className="text-muted text-truncate">{followers.join(', ')}</span>
                        </div>
                    </div>
                    <img src={Wall} className="h-100 w-100 position-absolute" style={{ zIndex: 0, objectFit: 'cover', objectPosition: 'center', opacity: .03 }} alt="Wall" />
                    <div id={"chatbox-" + this.props.id} className="d-flex chatbox position-absolute w-100 py-2 px-5 justify-content-start flex-column" style={{ background: 'transparent !important', zIndex: 1, height: 'calc(100vh - 163px)', overflowY: 'auto', top: 53 }}>
                        {messages}
                    </div>
                    <div className="position-absolute border-top w-100 bg-light py-2 px-3" style={{ bottom: 0, zIndex: 2 }}>
                        {emojiPicker}
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><Button onClick={onEmojiToggle} color="info"><FontAwesomeIcon icon="smile-wink" /></Button></InputGroupAddon>
                            <TextareaAutoResize id={"textarea-" + this.props.id} onResize={event => this.resizedHandler(event)} onKeyDown={event => this.onKeyDown(event)} name="content" className="form-control" value={value} placeholder="Taper un message" onChange={onChange} rows={1} />
                            <InputGroupAddon addonType="append"><Button onClick={onClick} color="danger"><FontAwesomeIcon icon="paper-plane" /></Button></InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            );
        }
    }
}

export default Community;