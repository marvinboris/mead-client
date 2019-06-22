import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faPhone, faHome, faAddressCard, faRss, faBlog, faIdCardAlt, faShoppingCart, faTshirt, faStoreAlt, faHandshake, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
// import * as actions from './store/actions';

library.add(faInstagram, faLinkedin, faTwitter, faYoutube, faEnvelope, faPhone, faHome, faAddressCard, faRss, faBlog, faIdCardAlt, faShoppingCart, faTshirt, faStoreAlt, faHandshake, faMapMarkerAlt, faPaperPlane);

const asyncHome = asyncComponent(() => import('./containers/Home/Home'));
const asyncAboutUs = asyncComponent(() => import('./containers/AboutUs/AboutUs'));
const asyncShop = asyncComponent(() => import('./containers/Shop/Shop'));
const asyncContact = asyncComponent(() => import('./containers/Contact/Contact'));
const asyncNews = asyncComponent(() => import('./containers/News/News'));

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/news" component={asyncNews} />
        <Route path="/contact" component={asyncContact} />
        <Route path="/shop" component={asyncShop} />
        <Route path="/about-us" component={asyncAboutUs} />
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
