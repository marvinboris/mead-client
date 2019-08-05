import * as actionTypes from './actionTypes';

const url = 'http://localhost:8080/admin';



// Users actions
export const adminReset = () => ({ type: actionTypes.ADMIN_RESET });
export const adminErrorReset = () => ({ type: actionTypes.ADMIN_ERROR_RESET });

export const adminGetUsersStart = () => ({ type: actionTypes.ADMIN_GET_USERS_START });
export const adminGetUsersSuccess = payload => ({ type: actionTypes.ADMIN_GET_USERS_SUCCESS, payload });
export const adminGetUsersFail = payload => ({ type: actionTypes.ADMIN_GET_USERS_FAIL, payload });
export const adminGetUsers = () => dispatch => {
    dispatch(adminGetUsersStart());
    const token = localStorage.getItem('token');
    fetch(url + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de récupérer la liste des utilisateurs !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminGetUsersSuccess(resData)))
        .catch(error => dispatch(adminGetUsersFail(error)));
};

export const adminStoreUserStart = () => ({ type: actionTypes.ADMIN_STORE_USER_START });
export const adminStoreUserSuccess = payload => ({ type: actionTypes.ADMIN_STORE_USER_SUCCESS, payload });
export const adminStoreUserFail = payload => ({ type: actionTypes.ADMIN_STORE_USER_FAIL, payload });
export const adminStoreUser = data => dispatch => {
    dispatch(adminStoreUserStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    fetch(url + '/users', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de créer l\'utilisateur !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminStoreUserSuccess(resData)))
        .catch(error => dispatch(adminStoreUserFail(error)));
};

export const adminCreateUserStart = () => ({ type: actionTypes.ADMIN_CREATE_USER_START });
export const adminCreateUserSuccess = payload => ({ type: actionTypes.ADMIN_CREATE_USER_SUCCESS, payload });
export const adminCreateUserFail = payload => ({ type: actionTypes.ADMIN_CREATE_USER_FAIL, payload });
export const adminCreateUser = () => dispatch => {
    dispatch(adminCreateUserStart());
    const token = localStorage.getItem('token');
    fetch(url + '/users/create', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de récupérer la liste des rôles !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminCreateUserSuccess(resData)))
        .catch(error => dispatch(adminCreateUserFail(error)));
};

export const adminEditUserStart = () => ({ type: actionTypes.ADMIN_EDIT_USER_START });
export const adminEditUserSuccess = payload => ({ type: actionTypes.ADMIN_EDIT_USER_SUCCESS, payload });
export const adminEditUserFail = payload => ({ type: actionTypes.ADMIN_EDIT_USER_FAIL, payload });
export const adminEditUser = userId => dispatch => {
    dispatch(adminEditUserStart());
    const token = localStorage.getItem('token');
    fetch(url + '/users/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de charger les informations de l\'utilisateur !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminEditUserSuccess(resData)))
        .catch(error => dispatch(adminEditUserFail(error)));
};

export const adminUpdateUserStart = () => ({ type: actionTypes.ADMIN_UPDATE_USER_START });
export const adminUpdateUserSuccess = payload => ({ type: actionTypes.ADMIN_UPDATE_USER_SUCCESS, payload });
export const adminUpdateUserFail = payload => ({ type: actionTypes.ADMIN_UPDATE_USER_FAIL, payload });
export const adminUpdateUser = (data, userId) => dispatch => {
    dispatch(adminUpdateUserStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    fetch(url + '/users/' + userId, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de modifier l\'utilisateur !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminUpdateUserSuccess(resData)))
        .catch(error => dispatch(adminUpdateUserFail(error)));
};

export const adminDestroyUserStart = () => ({ type: actionTypes.ADMIN_DESTROY_USER_START });
export const adminDestroyUserSuccess = payload => ({ type: actionTypes.ADMIN_DESTROY_USER_SUCCESS, payload });
export const adminDestroyUserFail = payload => ({ type: actionTypes.ADMIN_DESTROY_USER_FAIL, payload });
export const adminDestroyUser = userId => dispatch => {
    dispatch(adminDestroyUserStart());
    const token = localStorage.getItem('token');
    fetch(url + '/users/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de supprimer l\'utilisateur !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminDestroyUserSuccess(resData)))
        .catch(error => dispatch(adminDestroyUserFail(error)));
};



// Orders actions
export const adminGetOrdersStart = () => ({ type: actionTypes.ADMIN_GET_ORDERS_START });
export const adminGetOrdersSuccess = payload => ({ type: actionTypes.ADMIN_GET_ORDERS_SUCCESS, payload });
export const adminGetOrdersFail = payload => ({ type: actionTypes.ADMIN_GET_ORDERS_FAIL, payload });
export const adminGetOrders = () => dispatch => {
    dispatch(adminGetOrdersStart());
    const token = localStorage.getItem('token');
    fetch(url + '/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de récupérer la liste des commandes !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminGetOrdersSuccess(resData)))
        .catch(error => dispatch(adminGetOrdersFail(error)));
};

export const adminDestroyOrderStart = () => ({ type: actionTypes.ADMIN_DESTROY_ORDER_START });
export const adminDestroyOrderSuccess = payload => ({ type: actionTypes.ADMIN_DESTROY_ORDER_SUCCESS, payload });
export const adminDestroyOrderFail = payload => ({ type: actionTypes.ADMIN_DESTROY_ORDER_FAIL, payload });
export const adminDestroyOrder = orderId => dispatch => {
    dispatch(adminDestroyOrderStart());
    const token = localStorage.getItem('token');
    fetch(url + '/orders/' + orderId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de supprimer la commande !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminDestroyOrderSuccess(resData)))
        .catch(error => dispatch(adminDestroyOrderFail(error)));
};



// Products actions
export const adminGetProductsStart = () => ({ type: actionTypes.ADMIN_GET_PRODUCTS_START });
export const adminGetProductsSuccess = payload => ({ type: actionTypes.ADMIN_GET_PRODUCTS_SUCCESS, payload });
export const adminGetProductsFail = payload => ({ type: actionTypes.ADMIN_GET_PRODUCTS_FAIL, payload });
export const adminGetProducts = () => dispatch => {
    dispatch(adminGetProductsStart());
    const token = localStorage.getItem('token');
    fetch(url + '/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de récupérer la liste des produits !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminGetProductsSuccess(resData)))
        .catch(error => dispatch(adminGetProductsFail(error)));
};

export const adminStoreProductStart = () => ({ type: actionTypes.ADMIN_STORE_PRODUCT_START });
export const adminStoreProductSuccess = payload => ({ type: actionTypes.ADMIN_STORE_PRODUCT_SUCCESS, payload });
export const adminStoreProductFail = payload => ({ type: actionTypes.ADMIN_STORE_PRODUCT_FAIL, payload });
export const adminStoreProduct = data => dispatch => {
    dispatch(adminStoreProductStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    console.log({ data, formData });
    fetch(url + '/products', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de créer le produit !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminStoreProductSuccess(resData)))
        .catch(error => dispatch(adminStoreProductFail(error)));
};

export const adminEditProductStart = () => ({ type: actionTypes.ADMIN_EDIT_PRODUCT_START });
export const adminEditProductSuccess = payload => ({ type: actionTypes.ADMIN_EDIT_PRODUCT_SUCCESS, payload });
export const adminEditProductFail = payload => ({ type: actionTypes.ADMIN_EDIT_PRODUCT_FAIL, payload });
export const adminEditProduct = productId => dispatch => {
    dispatch(adminEditProductStart());
    const token = localStorage.getItem('token');
    fetch(url + '/products/' + productId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de charger les informations du produit !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminEditProductSuccess(resData)))
        .catch(error => dispatch(adminEditProductFail(error)));
};

export const adminUpdateProductStart = () => ({ type: actionTypes.ADMIN_UPDATE_PRODUCT_START });
export const adminUpdateProductSuccess = payload => ({ type: actionTypes.ADMIN_UPDATE_PRODUCT_SUCCESS, payload });
export const adminUpdateProductFail = payload => ({ type: actionTypes.ADMIN_UPDATE_PRODUCT_FAIL, payload });
export const adminUpdateProduct = (data, productId) => dispatch => {
    dispatch(adminUpdateProductStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    fetch(url + '/products/' + productId, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de modifier le produit !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminUpdateProductSuccess(resData)))
        .catch(error => dispatch(adminUpdateProductFail(error)));
};

export const adminDestroyProductStart = () => ({ type: actionTypes.ADMIN_DESTROY_PRODUCT_START });
export const adminDestroyProductSuccess = payload => ({ type: actionTypes.ADMIN_DESTROY_PRODUCT_SUCCESS, payload });
export const adminDestroyProductFail = payload => ({ type: actionTypes.ADMIN_DESTROY_PRODUCT_FAIL, payload });
export const adminDestroyProduct = productId => dispatch => {
    dispatch(adminDestroyProductStart());
    const token = localStorage.getItem('token');
    fetch(url + '/products/' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de supprimer le produit !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminDestroyProductSuccess(resData)))
        .catch(error => dispatch(adminDestroyProductFail(error)));
};



// Roles actions
export const adminGetRolesStart = () => ({ type: actionTypes.ADMIN_GET_ROLES_START });
export const adminGetRolesSuccess = payload => ({ type: actionTypes.ADMIN_GET_ROLES_SUCCESS, payload });
export const adminGetRolesFail = payload => ({ type: actionTypes.ADMIN_GET_ROLES_FAIL, payload });
export const adminGetRoles = () => dispatch => {
    dispatch(adminGetRolesStart());
    const token = localStorage.getItem('token');
    fetch(url + '/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de récupérer la liste des rôles !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminGetRolesSuccess(resData)))
        .catch(error => dispatch(adminGetRolesFail(error)));
};

export const adminStoreRoleStart = () => ({ type: actionTypes.ADMIN_STORE_ROLE_START });
export const adminStoreRoleSuccess = payload => ({ type: actionTypes.ADMIN_STORE_ROLE_SUCCESS, payload });
export const adminStoreRoleFail = payload => ({ type: actionTypes.ADMIN_STORE_ROLE_FAIL, payload });
export const adminStoreRole = data => dispatch => {
    dispatch(adminStoreRoleStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    fetch(url + '/roles', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de créer le rôle !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminStoreRoleSuccess(resData)))
        .catch(error => dispatch(adminStoreRoleFail(error)));
};

export const adminEditRoleStart = () => ({ type: actionTypes.ADMIN_EDIT_ROLE_START });
export const adminEditRoleSuccess = payload => ({ type: actionTypes.ADMIN_EDIT_ROLE_SUCCESS, payload });
export const adminEditRoleFail = payload => ({ type: actionTypes.ADMIN_EDIT_ROLE_FAIL, payload });
export const adminEditRole = roleId => dispatch => {
    dispatch(adminEditRoleStart());
    const token = localStorage.getItem('token');
    fetch(url + '/roles/' + roleId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de charger les informations du rôle !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminEditRoleSuccess(resData)))
        .catch(error => dispatch(adminEditRoleFail(error)));
};

export const adminUpdateRoleStart = () => ({ type: actionTypes.ADMIN_UPDATE_ROLE_START });
export const adminUpdateRoleSuccess = payload => ({ type: actionTypes.ADMIN_UPDATE_ROLE_SUCCESS, payload });
export const adminUpdateRoleFail = payload => ({ type: actionTypes.ADMIN_UPDATE_ROLE_FAIL, payload });
export const adminUpdateRole = (data, roleId) => dispatch => {
    dispatch(adminUpdateRoleStart());
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }
    fetch(url + '/roles/' + roleId, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: formData
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de modifier le rôle !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminUpdateRoleSuccess(resData)))
        .catch(error => dispatch(adminUpdateRoleFail(error)));
};

export const adminDestroyRoleStart = () => ({ type: actionTypes.ADMIN_DESTROY_ROLE_START });
export const adminDestroyRoleSuccess = payload => ({ type: actionTypes.ADMIN_DESTROY_ROLE_SUCCESS, payload });
export const adminDestroyRoleFail = payload => ({ type: actionTypes.ADMIN_DESTROY_ROLE_FAIL, payload });
export const adminDestroyRole = roleId => dispatch => {
    dispatch(adminDestroyRoleStart());
    const token = localStorage.getItem('token');
    fetch(url + '/roles/' + roleId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de supprimer le rôle !');
            }
            return res.json();
        })
        .then(resData => dispatch(adminDestroyRoleSuccess(resData)))
        .catch(error => dispatch(adminDestroyRoleFail(error)));
};
