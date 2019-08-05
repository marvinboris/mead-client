import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faPhone,
  faHome,
  faAddressCard,
  faRss,
  faBlog,
  faIdCardAlt,
  faShoppingCart,
  faTshirt,
  faStoreAlt,
  faHandshake,
  faMapMarkerAlt,
  faPaperPlane,
  faLock,
  faSignInAlt,
  faUserPlus,
  faSignature,
  faKey,
  faUserCircle,
  faPowerOff,
  faTachometerAlt,
  faBell,
  faTimes,
  faReceipt,
  faNewspaper,
  faChartLine,
  faUser,
  faUsers,
  faHistory,
  faCircle,
  faUserEdit,
  faCog,
  faUserTag,
  faInfoCircle,
  faCircleNotch,
  faUserCog,
  faHeading,
  faParagraph,
  faTag,
  faImage,
  faCartPlus,
  faFolderPlus,
  faPlus,
  faMinus,
  faEdit,
  faStore,
  faBuilding,
  faTruckLoading,
  faPalette,
  faExpand,
  faUserFriends,
  faComments,
  faSmileWink,
} from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faLinkedin,
  faTwitter,
  faInstagram,
  faProductHunt
} from '@fortawesome/free-brands-svg-icons';

import './App.css';
import Home from './containers/Home/Home';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import AdminRoute from './components/Routes/AdminRoute';
import SellerRoute from './components/Routes/SellerRoute';
import ClientRoute from './components/Routes/ClientRoute';
import * as actions from './store/actions';

library.add(
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
  faEnvelope,
  faPhone,
  faHome,
  faAddressCard,
  faRss,
  faBlog,
  faIdCardAlt,
  faShoppingCart,
  faTshirt,
  faStoreAlt,
  faHandshake,
  faMapMarkerAlt,
  faPaperPlane,
  faLock,
  faSignInAlt,
  faUserPlus,
  faSignature,
  faKey,
  faUserCircle,
  faPowerOff,
  faTachometerAlt,
  faBell,
  faTimes,
  faReceipt,
  faNewspaper,
  faChartLine,
  faProductHunt,
  faUser,
  faUsers,
  faHistory,
  faCircle,
  faUserEdit,
  faCog,
  faUserTag,
  faInfoCircle,
  faCircleNotch,
  faUserCog,
  faHeading,
  faParagraph,
  faTag,
  faImage,
  faCartPlus,
  faFolderPlus,
  faPlus,
  faMinus,
  faEdit,
  faStore,
  faBuilding,
  faTruckLoading,
  faPalette,
  faExpand,
  faUserFriends,
  faComments,
  faSmileWink
);

// Client routes
const asyncProfile = asyncComponent(() => import('./containers/User/Profile/Profile'));
const asyncOrders = asyncComponent(() => import('./containers/User/Orders/Orders'));
const asyncCart = asyncComponent(() => import('./containers/User/Cart/Cart'));
const asyncChat = asyncComponent(() => import('./containers/User/Chat/Chat'));
const asyncMyCommunities = asyncComponent(() => import('./containers/User/Communities/Communities'));
const asyncDashboard = asyncComponent(() => import('./containers/User/Dashboard/Dashboard'));

// Seller routes
const asyncSellerCommunity = asyncComponent(() => import('./containers/User/Seller/Community/Community'));
const asyncSellerCommunityProducts = asyncComponent(() => import('./containers/User/Seller/Products/Index'));
const asyncSellerCreateCommunityProduct = asyncComponent(() => import('./containers/User/Seller/Products/Create'));
const asyncSellerEditCommunityProduct = asyncComponent(() => import('./containers/User/Seller/Products/Edit'));

// Admin routes
const asyncAdminEditRole = asyncComponent(() => import('./containers/User/Admin/Roles/Update'));
const asyncAdminEditProduct = asyncComponent(() => import('./containers/User/Admin/Products/Update'));
const asyncAdminEditUser = asyncComponent(() => import('./containers/User/Admin/Users/Edit'));
const asyncAdminCreateRole = asyncComponent(() => import('./containers/User/Admin/Roles/Create'));
const asyncAdminCreateProduct = asyncComponent(() => import('./containers/User/Admin/Products/Create'));
const asyncAdminCreateUser = asyncComponent(() => import('./containers/User/Admin/Users/Create'));
const asyncAdminRoles = asyncComponent(() => import('./containers/User/Admin/Roles/Index'));
const asyncAdminProducts = asyncComponent(() => import('./containers/User/Admin/Products/Index'));
const asyncAdminOrders = asyncComponent(() => import('./containers/User/Admin/Orders/Index'));
const asyncAdminUsers = asyncComponent(() => import('./containers/User/Admin/Users/Index'));

// Common routes
const asyncCommunity = asyncComponent(() => import('./containers/Community/Community'));
const asyncCommunities = asyncComponent(() => import('./containers/Community/Index'));
const asyncAboutUs = asyncComponent(() => import('./containers/AboutUs/AboutUs'));
const asyncShopItem = asyncComponent(() => import('./containers/Shop/Item/Item'));
const asyncShop = asyncComponent(() => import('./containers/Shop/Shop'));
const asyncContact = asyncComponent(() => import('./containers/Contact/Contact'));
const asyncNews = asyncComponent(() => import('./containers/News/News'));
const asyncLogin = asyncComponent(() => import('./containers/Auth/Login/Login'));
const asyncSignup = asyncComponent(() => import('./containers/Auth/Signup/Signup'));

class App extends Component {
  componentDidMount() {
    const { onTryAuthSignup } = this.props;
    onTryAuthSignup();
    // onCsrfToken();
  }

  render() {
    const { auth: { profile, token } } = this.props;
    const role = profile ? profile.role : null;

    let routes = (
      <Switch>
        <Route path="/signup" component={asyncSignup} />
        <Route path="/login" component={asyncLogin} />
        <Route path="/news" component={asyncNews} />
        <Route path="/contact" component={asyncContact} />
        <Route path="/shop" component={asyncShop} />
        <Route path="/about-us" component={asyncAboutUs} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (token !== null && profile) {
      routes = (
        <Switch>
          <AdminRoute userRole={role} path="/admin/roles/create" component={asyncAdminCreateRole} />
          <AdminRoute userRole={role} path="/admin/products/create" component={asyncAdminCreateProduct} />
          <AdminRoute userRole={role} path="/admin/users/create" component={asyncAdminCreateUser} />
          <AdminRoute userRole={role} path="/admin/roles/:roleId" component={asyncAdminEditRole} />
          <AdminRoute userRole={role} path="/admin/products/:productId" component={asyncAdminEditProduct} />
          <AdminRoute userRole={role} path="/admin/users/:userId" component={asyncAdminEditUser} />
          <AdminRoute userRole={role} path="/admin/roles" component={asyncAdminRoles} />
          <AdminRoute userRole={role} path="/admin/products" component={asyncAdminProducts} />
          <AdminRoute userRole={role} path="/admin/orders" component={asyncAdminOrders} />
          <AdminRoute userRole={role} path="/admin/users" component={asyncAdminUsers} />

          <SellerRoute userRole={role} path="/community/products/create" component={asyncSellerCreateCommunityProduct} />
          <SellerRoute userRole={role} path="/community/products/:productId" component={asyncSellerEditCommunityProduct} />
          <SellerRoute userRole={role} path="/community/products" component={asyncSellerCommunityProducts} />
          <SellerRoute userRole={role} path="/community" component={asyncSellerCommunity} />

          <ClientRoute userRole={role} path="/profile" component={asyncProfile} />
          <ClientRoute userRole={role} path="/orders" component={asyncOrders} />
          <ClientRoute userRole={role} path="/cart" component={asyncCart} />
          <ClientRoute userRole={role} path="/chat" component={asyncChat} />
          <ClientRoute userRole={role} path="/following" component={asyncMyCommunities} />
          <ClientRoute userRole={role} path="/dashboard" component={asyncDashboard} />

          <Route path="/news" component={asyncNews} />
          <Route path="/contact" component={asyncContact} />
          <Route path="/communities/:userId" component={asyncCommunity} />
          <Route path="/communities" component={asyncCommunities} />
          <Route path="/shop/:productId" component={asyncShopItem} />
          <Route path="/shop" component={asyncShop} />
          <Route path="/about-us" component={asyncAboutUs} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onTryAuthSignup: () => dispatch(actions.authCheckState()),
  onCsrfToken: () => dispatch(actions.csrfToken()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
