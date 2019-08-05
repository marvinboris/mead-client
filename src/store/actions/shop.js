import * as actionTypes from './actionTypes';

export const shopReset = () => ({ type: actionTypes.SHOP_RESET });
export const shopErrorReset = () => ({ type: actionTypes.SHOP_ERROR_RESET });

export const getProductsStart = () => ({ type: actionTypes.GET_PRODUCTS_START });
export const getProductsSuccess = payload => ({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload });
export const getProductsFail = payload => ({ type: actionTypes.GET_PRODUCTS_FAIL, payload });
export const getProducts = page => dispatch => {
    dispatch(getProductsStart());
    fetch('http://localhost:8080/shop/products?page=' + page, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération de la liste des produits.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getProductsSuccess(resData));
        })
        .catch(err => {
            dispatch(getProductsFail(err));
        });
};

export const getProductStart = () => ({ type: actionTypes.GET_PRODUCT_START });
export const getProductSuccess = payload => ({ type: actionTypes.GET_PRODUCT_SUCCESS, payload });
export const getProductFail = payload => ({ type: actionTypes.GET_PRODUCT_FAIL, payload });
export const getProduct = productId => dispatch => {
    dispatch(getProductStart());
    fetch('http://localhost:8080/shop/products/' + productId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations du produit.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getProductSuccess(resData));
        })
        .catch(err => {
            dispatch(getProductFail(err));
        });
};

export const getCartStart = () => ({ type: actionTypes.GET_CART_START });
export const getCartSuccess = payload => ({ type: actionTypes.GET_CART_SUCCESS, payload });
export const getCartFail = payload => ({ type: actionTypes.GET_CART_FAIL, payload });
export const getCart = () => dispatch => {
    dispatch(getCartStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations du panier.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getCartSuccess(resData));
        })
        .catch(err => {
            dispatch(getCartFail(err));
        });
};

export const addCartItemStart = () => ({ type: actionTypes.ADD_CART_ITEM_START });
export const addCartItemSuccess = payload => ({ type: actionTypes.ADD_CART_ITEM_SUCCESS, payload });
export const addCartItemFail = payload => ({ type: actionTypes.ADD_CART_ITEM_FAIL, payload });
export const addCartItem = productId => dispatch => {
    dispatch(addCartItemStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/cart-add-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ productId })
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations du panier.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(addCartItemSuccess(resData));
        })
        .catch(err => {
            dispatch(addCartItemFail(err));
        })
};

export const subtractCartItemStart = () => ({ type: actionTypes.SUBTRACT_CART_ITEM_START });
export const subtractCartItemSuccess = payload => ({ type: actionTypes.SUBTRACT_CART_ITEM_SUCCESS, payload });
export const subtractCartItemFail = payload => ({ type: actionTypes.SUBTRACT_CART_ITEM_FAIL, payload });
export const subtractCartItem = productId => dispatch => {
    dispatch(subtractCartItemStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/cart-subtract-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ productId })
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations du panier.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(subtractCartItemSuccess(resData));
        })
        .catch(err => {
            dispatch(subtractCartItemFail(err));
        })
};

export const deleteCartItemStart = () => ({ type: actionTypes.DELETE_CART_ITEM_START });
export const deleteCartItemSuccess = payload => ({ type: actionTypes.DELETE_CART_ITEM_SUCCESS, payload });
export const deleteCartItemFail = payload => ({ type: actionTypes.DELETE_CART_ITEM_FAIL, payload });
export const deleteCartItem = productId => dispatch => {
    dispatch(deleteCartItemStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/cart-delete-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ productId })
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations du panier.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(deleteCartItemSuccess(resData));
        })
        .catch(err => {
            dispatch(deleteCartItemFail(err));
        })
};

export const clearCartStart = () => ({ type: actionTypes.CLEAR_CART_START });
export const clearCartSuccess = payload => ({ type: actionTypes.CLEAR_CART_SUCCESS, payload });
export const clearCartFail = payload => ({ type: actionTypes.CLEAR_CART_FAIL, payload });
export const clearCart = () => dispatch => {
    dispatch(clearCartStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/cart-clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations du panier.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(clearCartSuccess(resData));
        })
        .catch(err => {
            dispatch(clearCartFail(err));
        })
};

export const getMyCommunityStart = () => ({ type: actionTypes.GET_MY_COMMUNITY_START });
export const getMyCommunitySuccess = payload => ({ type: actionTypes.GET_MY_COMMUNITY_SUCCESS, payload });
export const getMyCommunityFail = payload => ({ type: actionTypes.GET_MY_COMMUNITY_FAIL, payload });
export const getMyCommunity = () => dispatch => {
    dispatch(getMyCommunityStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/community', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Erreur lors de la récupération des informations de la communauté.')
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getMyCommunitySuccess(resData));
        })
        .catch(err => {
            dispatch(getMyCommunityFail(err));
        })
};

export const getMyCommunitiesStart = () => ({ type: actionTypes.GET_MY_COMMUNITIES_START });
export const getMyCommunitiesSuccess = payload => ({ type: actionTypes.GET_MY_COMMUNITIES_SUCCESS, payload });
export const getMyCommunitiesFail = payload => ({ type: actionTypes.GET_MY_COMMUNITIES_FAIL, payload });
export const getMyCommunities = () => dispatch => {
    dispatch(getMyCommunitiesStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/communities', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Erreur lors de la récupération des informations de la communauté.')
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getMyCommunitiesSuccess(resData));
        })
        .catch(err => {
            dispatch(getMyCommunitiesFail(err));
        })
};

export const postMyCommunityStart = () => ({ type: actionTypes.POST_MY_COMMUNITY_START });
export const postMyCommunitySuccess = payload => ({ type: actionTypes.POST_MY_COMMUNITY_SUCCESS, payload });
export const postMyCommunityFail = payload => ({ type: actionTypes.POST_MY_COMMUNITY_FAIL, payload });
export const postMyCommunity = data => dispatch => {
    dispatch(postMyCommunityStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    fetch('http://localhost:8080/shop/community', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Erreur lors de la récupération des informations de la communauté.')
            }
            return res.json();
        })
        .then(resData => {
            dispatch(postMyCommunitySuccess(resData));
        })
        .catch(err => {
            dispatch(postMyCommunityFail(err));
        })
}

export const getCommunityStart = () => ({ type: actionTypes.GET_COMMUNITY_START });
export const getCommunitySuccess = payload => ({ type: actionTypes.GET_COMMUNITY_SUCCESS, payload });
export const getCommunityFail = payload => ({ type: actionTypes.GET_COMMUNITY_FAIL, payload });
export const getCommunity = userId => dispatch => {
    dispatch(getCommunityStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/community/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Erreur lors de la récupération des informations de la communauté.')
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getCommunitySuccess(resData));
        })
        .catch(err => {
            dispatch(getCommunityFail(err));
        })
};

export const getCommunitiesStart = () => ({ type: actionTypes.GET_COMMUNITIES_START });
export const getCommunitiesSuccess = payload => ({ type: actionTypes.GET_COMMUNITIES_SUCCESS, payload });
export const getCommunitiesFail = payload => ({ type: actionTypes.GET_COMMUNITIES_FAIL, payload });
export const getCommunities = () => dispatch => {
    dispatch(getCommunitiesStart());
    fetch('http://localhost:8080/shop/communities/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Erreur lors de la récupération des informations de la communauté.')
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getCommunitiesSuccess(resData));
        })
        .catch(err => {
            dispatch(getCommunitiesFail(err));
        })
};

export const getCheckoutStart = () => ({ type: actionTypes.GET_CHECKOUT_START });
export const getCheckoutSuccess = payload => ({ type: actionTypes.GET_CHECKOUT_SUCCESS, payload });
export const getCheckoutFail = payload => ({ type: actionTypes.GET_CHECKOUT_FAIL, payload });
export const getCheckout = () => dispatch => {
    dispatch(getCheckoutStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/checkout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations de la facture.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getCheckoutSuccess(resData));
        })
        .catch(err => {
            dispatch(getCheckoutFail(err));
        })
};

export const getOrdersStart = () => ({ type: actionTypes.GET_ORDERS_START });
export const getOrdersSuccess = payload => ({ type: actionTypes.GET_ORDERS_SUCCESS, payload });
export const getOrdersFail = payload => ({ type: actionTypes.GET_ORDERS_FAIL, payload });
export const getOrders = () => dispatch => {
    dispatch(getOrdersStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération de la liste des commandes.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getOrdersSuccess(resData));
        })
        .catch(err => {
            dispatch(getOrdersFail(err));
        })
};

export const postOrderStart = () => ({ type: actionTypes.POST_ORDER_START });
export const postOrderSuccess = payload => ({ type: actionTypes.POST_ORDER_SUCCESS, payload });
export const postOrderFail = payload => ({ type: actionTypes.POST_ORDER_FAIL, payload });
export const postOrder = () => dispatch => {
    dispatch(postOrderStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de l\'envoi de la commande.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(postOrderSuccess(resData));
        })
        .catch(err => {
            dispatch(postOrderFail(err));
        })
};

export const getInvoiceStart = () => ({ type: actionTypes.GET_INVOICE_START });
export const getInvoiceSuccess = payload => ({ type: actionTypes.GET_INVOICE_SUCCESS, payload });
export const getInvoiceFail = payload => ({ type: actionTypes.GET_INVOICE_FAIL, payload });
export const getInvoice = orderId => dispatch => {
    dispatch(getInvoiceStart());
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/shop/orders/' + orderId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Erreur lors de la récupération des informations de la commande.');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(getInvoiceSuccess(resData));
        })
        .catch(err => {
            dispatch(getInvoiceFail(err));
        })
};

