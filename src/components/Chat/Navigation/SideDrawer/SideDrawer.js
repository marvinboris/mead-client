import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import moment from 'moment';

const sideDrawer = ({ photo, name, communities, toggle, activeTab, onChange, search }) => {
    const navs = communities.map(community => {
        const lastMessageIndex = community.messages.length - 1;

        return <NavItem style={{ cursor: 'pointer' }} className="border-bottom w-100 text-truncate" key={community.owner._id}>
            <NavLink className={"py-2 px-3 mw-100 " + (activeTab === community.owner._id ? "bg-light" : "")} onClick={() => toggle(community.owner._id)}>
                <div className="d-flex mw-100 justify-content-start align-items-center">
                    <div className="mr-2 h-100 align-middle flex-shrink-0">
                        <img className="rounded-circle" style={{ height: 50, width: 50 }} src={"http://localhost:8080/" + community.imageUrl} alt={community.name} />
                    </div>
                    <div className="flex-grow-1 text-truncate">
                        <span className="small float-right">{community.messages[lastMessageIndex] ? moment(community.messages[lastMessageIndex].createdAt).format('LT') : null}</span>
                        <h5 className="m-0">{community.name}</h5>
                        <span className="text-muted">{community.messages[lastMessageIndex] ? community.messages[lastMessageIndex].content : 'Démarrer la discussion'}</span>
                    </div>
                </div>
            </NavLink>
        </NavItem>
    });

    return (
        <aside style={{ width: '30%', height: 'calc(100vh - 56px)', top: 56, zIndex: 990, fontSize: '.9em' }} className="border-right position-fixed">
            {/* <div className="px-3 py-2" style={{ backgroundColor: '#eee' }}>
                <img src={"http://localhost:8080/" + photo} className="rounded-circle" style={{ height: 40, width: 40, objectFit: 'cover', objectPosition: 'center' }} alt={name} />
            </div> */}
            <div className="bg-light border-bottom p-2">
                <input type="search" name="search" onChange={onChange} value={search} className="form-control" placeholder="Rechercher une communauté" />
            </div>
            <div className="bg-white px-0" style={{ height: 'calc(100vh - 110px)', overflowY: 'auto' }}>
                <Nav>{navs}</Nav>
            </div>
        </aside>
    );
};

export default sideDrawer;