import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    userLoading: false,
    users: [],
    user: null,
    orderLoading: false,
    orders: [],
    order: null,
    productLoading: false,
    products: [],
    product: null,
    roleLoading: false,
    roles: [],
    role: null
};

// Users cases
const adminReset = (state, action) => initialState;
const adminErrerReset = (state, action) => updateObject(state, { error: null });

const adminGetUsersStart = (state, action) => updateObject(state, { userLoading: true });
const adminGetUsersSuccess = (state, action) => updateObject(state, { userLoading: false, users: action.payload.users });
const adminGetUsersFail = (state, action) => updateObject(state, { userLoading: false, error: action.payload });

const adminStoreUserStart = (state, action) => updateObject(state, { userLoading: true });
const adminStoreUserSuccess = (state, action) => updateObject(state, { userLoading: false, user: action.payload.users });
const adminStoreUserFail = (state, action) => updateObject(state, { userLoading: false, error: action.payload });

const adminCreateUserStart = (state, action) => updateObject(state, { roleLoading: true });
const adminCreateUserSuccess = (state, action) => updateObject(state, { roleLoading: false, roles: action.payload.roles });
const adminCreateUserFail = (state, action) => updateObject(state, { roleLoading: false, error: action.payload });

const adminEditUserStart = (state, action) => updateObject(state, { userLoading: true });
const adminEditUserSuccess = (state, action) => updateObject(state, { userLoading: false, user: action.payload.user });
const adminEditUserFail = (state, action) => updateObject(state, { userLoading: false, error: action.payload });

const adminUpdateUserStart = (state, action) => updateObject(state, { userLoading: true });
const adminUpdateUserSuccess = (state, action) => updateObject(state, { userLoading: false, users: action.payload.users });
const adminUpdateUserFail = (state, action) => updateObject(state, { userLoading: false, error: action.payload });

const adminDestroyUserStart = (state, action) => updateObject(state, { userLoading: true });
const adminDestroyUserSuccess = (state, action) => updateObject(state, { userLoading: false, users: action.payload.users });
const adminDestroyUserFail = (state, action) => updateObject(state, { userLoading: false, error: action.payload });



// Orders cases
const adminGetOrdersStart = (state, action) => updateObject(state, { orderLoading: true });
const adminGetOrdersSuccess = (state, action) => updateObject(state, { orderLoading: false, orders: action.payload.orders });
const adminGetOrdersFail = (state, action) => updateObject(state, { orderLoading: false, error: action.payload });

const adminDestroyOrderStart = (state, action) => updateObject(state, { orderLoading: true });
const adminDestroyOrderSuccess = (state, action) => updateObject(state, { orderLoading: false, orders: action.payload.orders });
const adminDestroyOrderFail = (state, action) => updateObject(state, { orderLoading: false, error: action.payload });



// Products cases
const adminGetProductsStart = (state, action) => updateObject(state, { productLoading: true });
const adminGetProductsSuccess = (state, action) => updateObject(state, { productLoading: false, products: action.payload.products });
const adminGetProductsFail = (state, action) => updateObject(state, { productLoading: false, error: action.payload });

const adminStoreProductStart = (state, action) => updateObject(state, { productLoading: true });
const adminStoreProductSuccess = (state, action) => updateObject(state, { productLoading: false, products: action.payload.products });
const adminStoreProductFail = (state, action) => updateObject(state, { productLoading: false, error: action.payload });

const adminEditProductStart = (state, action) => updateObject(state, { productLoading: true });
const adminEditProductSuccess = (state, action) => updateObject(state, { productLoading: false, product: action.payload.product });
const adminEditProductFail = (state, action) => updateObject(state, { productLoading: false, error: action.payload });

const adminUpdateProductStart = (state, action) => updateObject(state, { productLoading: true });
const adminUpdateProductSuccess = (state, action) => updateObject(state, { productLoading: false, products: action.payload.products });
const adminUpdateProductFail = (state, action) => updateObject(state, { productLoading: false, error: action.payload });

const adminDestroyProductStart = (state, action) => updateObject(state, { productLoading: true });
const adminDestroyProductSuccess = (state, action) => updateObject(state, { productLoading: false, products: action.payload.products });
const adminDestroyProductFail = (state, action) => updateObject(state, { productLoading: false, error: action.payload });



// Roles cases
const adminGetRolesStart = (state, action) => updateObject(state, { roleLoading: true });
const adminGetRolesSuccess = (state, action) => updateObject(state, { roleLoading: false, roles: action.payload.roles });
const adminGetRolesFail = (state, action) => updateObject(state, { roleLoading: false, error: action.payload });

const adminStoreRoleStart = (state, action) => updateObject(state, { roleLoading: true });
const adminStoreRoleSuccess = (state, action) => updateObject(state, { roleLoading: false, roles: action.payload.roles });
const adminStoreRoleFail = (state, action) => updateObject(state, { roleLoading: false, error: action.payload });

const adminEditRoleStart = (state, action) => updateObject(state, { roleLoading: true });
const adminEditRoleSuccess = (state, action) => updateObject(state, { roleLoading: false, role: action.payload.role });
const adminEditRoleFail = (state, action) => updateObject(state, { roleLoading: false, error: action.payload });

const adminUpdateRoleStart = (state, action) => updateObject(state, { roleLoading: true });
const adminUpdateRoleSuccess = (state, action) => updateObject(state, { roleLoading: false, roles: action.payload.roles });
const adminUpdateRoleFail = (state, action) => updateObject(state, { roleLoading: false, error: action.payload });

const adminDestroyRoleStart = (state, action) => updateObject(state, { roleLoading: true });
const adminDestroyRoleSuccess = (state, action) => updateObject(state, { roleLoading: false, roles: action.payload.roles });
const adminDestroyRoleFail = (state, action) => updateObject(state, { roleLoading: false, error: action.payload });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_RESET: return adminReset(state, action);
        case actionTypes.ADMIN_ERROR_RESET: return adminErrerReset(state, action);

        // Users cases
        case actionTypes.ADMIN_GET_USERS_START: return adminGetUsersStart(state, action);
        case actionTypes.ADMIN_GET_USERS_SUCCESS: return adminGetUsersSuccess(state, action);
        case actionTypes.ADMIN_GET_USERS_FAIL: return adminGetUsersFail(state, action);

        case actionTypes.ADMIN_STORE_USER_START: return adminStoreUserStart(state, action);
        case actionTypes.ADMIN_STORE_USER_SUCCESS: return adminStoreUserSuccess(state, action);
        case actionTypes.ADMIN_STORE_USER_FAIL: return adminStoreUserFail(state, action);

        case actionTypes.ADMIN_CREATE_USER_START: return adminCreateUserStart(state, action);
        case actionTypes.ADMIN_CREATE_USER_SUCCESS: return adminCreateUserSuccess(state, action);
        case actionTypes.ADMIN_CREATE_USER_FAIL: return adminCreateUserFail(state, action);

        case actionTypes.ADMIN_EDIT_USER_START: return adminEditUserStart(state, action);
        case actionTypes.ADMIN_EDIT_USER_SUCCESS: return adminEditUserSuccess(state, action);
        case actionTypes.ADMIN_EDIT_USER_FAIL: return adminEditUserFail(state, action);

        case actionTypes.ADMIN_UPDATE_USER_START: return adminUpdateUserStart(state, action);
        case actionTypes.ADMIN_UPDATE_USER_SUCCESS: return adminUpdateUserSuccess(state, action);
        case actionTypes.ADMIN_UPDATE_USER_FAIL: return adminUpdateUserFail(state, action);

        case actionTypes.ADMIN_DESTROY_USER_START: return adminDestroyUserStart(state, action);
        case actionTypes.ADMIN_DESTROY_USER_SUCCESS: return adminDestroyUserSuccess(state, action);
        case actionTypes.ADMIN_DESTROY_USER_FAIL: return adminDestroyUserFail(state, action);

        // Orders cases
        case actionTypes.ADMIN_GET_ORDERS_START: return adminGetOrdersStart(state, action);
        case actionTypes.ADMIN_GET_ORDERS_SUCCESS: return adminGetOrdersSuccess(state, action);
        case actionTypes.ADMIN_GET_ORDERS_FAIL: return adminGetOrdersFail(state, action);

        case actionTypes.ADMIN_DESTROY_ORDER_START: return adminDestroyOrderStart(state, action);
        case actionTypes.ADMIN_DESTROY_ORDER_SUCCESS: return adminDestroyOrderSuccess(state, action);
        case actionTypes.ADMIN_DESTROY_ORDER_FAIL: return adminDestroyOrderFail(state, action);

        // Products cases
        case actionTypes.ADMIN_GET_PRODUCTS_START: return adminGetProductsStart(state, action);
        case actionTypes.ADMIN_GET_PRODUCTS_SUCCESS: return adminGetProductsSuccess(state, action);
        case actionTypes.ADMIN_GET_PRODUCTS_FAIL: return adminGetProductsFail(state, action);

        case actionTypes.ADMIN_STORE_PRODUCT_START: return adminStoreProductStart(state, action);
        case actionTypes.ADMIN_STORE_PRODUCT_SUCCESS: return adminStoreProductSuccess(state, action);
        case actionTypes.ADMIN_STORE_PRODUCT_FAIL: return adminStoreProductFail(state, action);

        case actionTypes.ADMIN_EDIT_PRODUCT_START: return adminEditProductStart(state, action);
        case actionTypes.ADMIN_EDIT_PRODUCT_SUCCESS: return adminEditProductSuccess(state, action);
        case actionTypes.ADMIN_EDIT_PRODUCT_FAIL: return adminEditProductFail(state, action);

        case actionTypes.ADMIN_UPDATE_PRODUCT_START: return adminUpdateProductStart(state, action);
        case actionTypes.ADMIN_UPDATE_PRODUCT_SUCCESS: return adminUpdateProductSuccess(state, action);
        case actionTypes.ADMIN_UPDATE_PRODUCT_FAIL: return adminUpdateProductFail(state, action);

        case actionTypes.ADMIN_DESTROY_PRODUCT_START: return adminDestroyProductStart(state, action);
        case actionTypes.ADMIN_DESTROY_PRODUCT_SUCCESS: return adminDestroyProductSuccess(state, action);
        case actionTypes.ADMIN_DESTROY_PRODUCT_FAIL: return adminDestroyProductFail(state, action);

        // Roles cases
        case actionTypes.ADMIN_GET_ROLES_START: return adminGetRolesStart(state, action);
        case actionTypes.ADMIN_GET_ROLES_SUCCESS: return adminGetRolesSuccess(state, action);
        case actionTypes.ADMIN_GET_ROLES_FAIL: return adminGetRolesFail(state, action);

        case actionTypes.ADMIN_STORE_ROLE_START: return adminStoreRoleStart(state, action);
        case actionTypes.ADMIN_STORE_ROLE_SUCCESS: return adminStoreRoleSuccess(state, action);
        case actionTypes.ADMIN_STORE_ROLE_FAIL: return adminStoreRoleFail(state, action);

        case actionTypes.ADMIN_EDIT_ROLE_START: return adminEditRoleStart(state, action);
        case actionTypes.ADMIN_EDIT_ROLE_SUCCESS: return adminEditRoleSuccess(state, action);
        case actionTypes.ADMIN_EDIT_ROLE_FAIL: return adminEditRoleFail(state, action);

        case actionTypes.ADMIN_UPDATE_ROLE_START: return adminUpdateRoleStart(state, action);
        case actionTypes.ADMIN_UPDATE_ROLE_SUCCESS: return adminUpdateRoleSuccess(state, action);
        case actionTypes.ADMIN_UPDATE_ROLE_FAIL: return adminUpdateRoleFail(state, action);

        case actionTypes.ADMIN_DESTROY_ROLE_START: return adminDestroyRoleStart(state, action);
        case actionTypes.ADMIN_DESTROY_ROLE_SUCCESS: return adminDestroyRoleSuccess(state, action);
        case actionTypes.ADMIN_DESTROY_ROLE_FAIL: return adminDestroyRoleFail(state, action);

        default: return state;
    }
};

export default reducer;