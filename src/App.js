import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faPhone, faHome, faAddressCard, faRss, faBlog, faIdCardAlt, faShoppingCart, faTshirt, faStoreAlt, faHandshake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import './App.css';

library.add(faInstagram, faLinkedin, faTwitter, faYoutube, faEnvelope, faPhone, faHome, faAddressCard, faRss, faBlog, faIdCardAlt, faShoppingCart, faTshirt, faStoreAlt, faHandshake, faMapMarkerAlt);

const asyncHome = asyncComponent(() => import('./containers/Home/Home'));

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={asyncHome} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(App));
