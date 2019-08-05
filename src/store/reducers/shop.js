import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: [],
    product: null,
    cart: [],
    community: null,
    communities: null,
    checkout: null,
    orders: [],
    orderPosted: false,
    invoiceLoaded: false,
    hasNextPage: false,
    hasPreviousPage: false,
    lastPage: 1,
    loading: false,
    error: null,
};

const shopReset = (state, action) => initialState;
const shopErrorReset = (state, action) => updateObject(state, { error: null });

const getProductsStart = (state, action) => updateObject(state, { loading: true });
const getProductsSuccess = (state, action) => updateObject(state, {
    loading: false,
    products: action.payload.products,
    hasNextPage: action.payload.hasNextPage,
    hasPreviousPage: action.payload.hasPreviousPage,
    lastPage: action.payload.lastPage,
});
const getProductsFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getProductStart = (state, action) => updateObject(state, { loading: true });
const getProductSuccess = (state, action) => updateObject(state, {
    loading: false,
    product: action.payload.product
});
const getProductFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getCartStart = (state, action) => updateObject(state, { loading: true });
const getCartSuccess = (state, action) => updateObject(state, {
    loading: false,
    cart: action.payload.cart
});
const getCartFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const addCartItemStart = (state, action) => updateObject(state, { loading: true });
const addCartItemSuccess = (state, action) => updateObject(state, {
    loading: false,
    cart: action.payload.cart
});
const addCartItemFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const subtractCartItemStart = (state, action) => updateObject(state, { loading: true });
const subtractCartItemSuccess = (state, action) => updateObject(state, {
    loading: false,
    cart: action.payload.cart
});
const subtractCartItemFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const deleteCartItemStart = (state, action) => updateObject(state, { loading: true });
const deleteCartItemSuccess = (state, action) => updateObject(state, {
    loading: false,
    cart: action.payload.cart
});
const deleteCartItemFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const clearCartStart = (state, action) => updateObject(state, { loading: true });
const clearCartSuccess = (state, action) => updateObject(state, {
    loading: false,
    cart: action.payload.cart
});
const clearCartFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getMyCommunityStart = (state, action) => updateObject(state, { loading: true });
const getMyCommunitySuccess = (state, action) => updateObject(state, { loading: false, community: action.payload.community });
const getMyCommunityFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getMyCommunitiesStart = (state, action) => updateObject(state, { loading: true });
const getMyCommunitiesSuccess = (state, action) => updateObject(state, { loading: false, communities: action.payload.communities });
const getMyCommunitiesFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const postMyCommunityStart = (state, action) => updateObject(state, { loading: true });
const postMyCommunitySuccess = (state, action) => updateObject(state, { loading: false, community: action.payload.community });
const postMyCommunityFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getCommunityStart = (state, action) => updateObject(state, { loading: true });
const getCommunitySuccess = (state, action) => updateObject(state, { loading: false, community: action.payload.community });
const getCommunityFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getCommunitiesStart = (state, action) => updateObject(state, { loading: true });
const getCommunitiesSuccess = (state, action) => updateObject(state, { loading: false, communities: action.payload.communities });
const getCommunitiesFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getCheckoutStart = (state, action) => updateObject(state, { loading: true });
const getCheckoutSuccess = (state, action) => updateObject(state, {
    loading: false,
    checkout: action.payload
});
const getCheckoutFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const getOrdersStart = (state, action) => updateObject(state, { loading: true });
const getOrdersSuccess = (state, action) => updateObject(state, {
    loading: false,
    orders: action.payload.orders
});
const getOrdersFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const postOrderStart = (state, action) => updateObject(state, { loading: true, orderPosted: false });
const postOrderSuccess = (state, action) => updateObject(state, {
    loading: false,
    cart: [],
    orderPosted: true
});
const postOrderFail = (state, action) => updateObject(state, { loading: false, error: action.payload, orderPosted: false });

const getInvoiceStart = (state, action) => updateObject(state, { loading: true, invoiceLoaded: false });
const getInvoiceSuccess = (state, action) => updateObject(state, {
    loading: false,
    invoiceLoaded: true
});
const getInvoiceFail = (state, action) => updateObject(state, { loading: false, error: action.payload, invoiceLoaded: false });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOP_RESET: return shopReset(state, action);
        case actionTypes.SHOP_ERROR_RESET: return shopErrorReset(state, action);

        case actionTypes.GET_PRODUCTS_START: return getProductsStart(state, action);
        case actionTypes.GET_PRODUCTS_SUCCESS: return getProductsSuccess(state, action);
        case actionTypes.GET_PRODUCTS_FAIL: return getProductsFail(state, action);

        case actionTypes.GET_PRODUCT_START: return getProductStart(state, action);
        case actionTypes.GET_PRODUCT_SUCCESS: return getProductSuccess(state, action);
        case actionTypes.GET_PRODUCT_FAIL: return getProductFail(state, action);

        case actionTypes.GET_CART_START: return getCartStart(state, action);
        case actionTypes.GET_CART_SUCCESS: return getCartSuccess(state, action);
        case actionTypes.GET_CART_FAIL: return getCartFail(state, action);

        case actionTypes.ADD_CART_ITEM_START: return addCartItemStart(state, action);
        case actionTypes.ADD_CART_ITEM_SUCCESS: return addCartItemSuccess(state, action);
        case actionTypes.ADD_CART_ITEM_FAIL: return addCartItemFail(state, action);

        case actionTypes.SUBTRACT_CART_ITEM_START: return subtractCartItemStart(state, action);
        case actionTypes.SUBTRACT_CART_ITEM_SUCCESS: return subtractCartItemSuccess(state, action);
        case actionTypes.SUBTRACT_CART_ITEM_FAIL: return subtractCartItemFail(state, action);

        case actionTypes.DELETE_CART_ITEM_START: return deleteCartItemStart(state, action);
        case actionTypes.DELETE_CART_ITEM_SUCCESS: return deleteCartItemSuccess(state, action);
        case actionTypes.DELETE_CART_ITEM_FAIL: return deleteCartItemFail(state, action);
        
        case actionTypes.CLEAR_CART_START: return clearCartStart(state, action);
        case actionTypes.CLEAR_CART_SUCCESS: return clearCartSuccess(state, action);
        case actionTypes.CLEAR_CART_FAIL: return clearCartFail(state, action);

        case actionTypes.GET_MY_COMMUNITY_START: return getMyCommunityStart(state, action);
        case actionTypes.GET_MY_COMMUNITY_SUCCESS: return getMyCommunitySuccess(state, action);
        case actionTypes.GET_MY_COMMUNITY_FAIL: return getMyCommunityFail(state, action);
        
        case actionTypes.GET_MY_COMMUNITIES_START: return getMyCommunitiesStart(state, action);
        case actionTypes.GET_MY_COMMUNITIES_SUCCESS: return getMyCommunitiesSuccess(state, action);
        case actionTypes.GET_MY_COMMUNITIES_FAIL: return getMyCommunitiesFail(state, action);
        
        case actionTypes.POST_MY_COMMUNITY_START: return postMyCommunityStart(state, action);
        case actionTypes.POST_MY_COMMUNITY_SUCCESS: return postMyCommunitySuccess(state, action);
        case actionTypes.POST_MY_COMMUNITY_FAIL: return postMyCommunityFail(state, action);

        case actionTypes.GET_COMMUNITY_START: return getCommunityStart(state, action);
        case actionTypes.GET_COMMUNITY_SUCCESS: return getCommunitySuccess(state, action);
        case actionTypes.GET_COMMUNITY_FAIL: return getCommunityFail(state, action);
        
        case actionTypes.GET_COMMUNITIES_START: return getCommunitiesStart(state, action);
        case actionTypes.GET_COMMUNITIES_SUCCESS: return getCommunitiesSuccess(state, action);
        case actionTypes.GET_COMMUNITIES_FAIL: return getCommunitiesFail(state, action);

        case actionTypes.GET_CHECKOUT_START: return getCheckoutStart(state, action);
        case actionTypes.GET_CHECKOUT_SUCCESS: return getCheckoutSuccess(state, action);
        case actionTypes.GET_CHECKOUT_FAIL: return getCheckoutFail(state, action);

        case actionTypes.GET_ORDERS_START: return getOrdersStart(state, action);
        case actionTypes.GET_ORDERS_SUCCESS: return getOrdersSuccess(state, action);
        case actionTypes.GET_ORDERS_FAIL: return getOrdersFail(state, action);

        case actionTypes.POST_ORDER_START: return postOrderStart(state, action);
        case actionTypes.POST_ORDER_SUCCESS: return postOrderSuccess(state, action);
        case actionTypes.POST_ORDER_FAIL: return postOrderFail(state, action);

        case actionTypes.GET_INVOICE_START: return getInvoiceStart(state, action);
        case actionTypes.GET_INVOICE_SUCCESS: return getInvoiceSuccess(state, action);
        case actionTypes.GET_INVOICE_FAIL: return getInvoiceFail(state, action);

        default: return state;
    }
};

export default reducer;