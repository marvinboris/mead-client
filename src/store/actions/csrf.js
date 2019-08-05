import * as actionTypes from './actionTypes';

export const csrfReset = () => ({ type: actionTypes.CSRF_RESET });
export const csrfErrorReset = () => ({ type: actionTypes.CSRF_ERROR_RESET });

export const csrfTokenStart = () => ({ type: actionTypes.CSRF_TOKEN_START });
export const csrfTokenSuccess = payload => ({ type: actionTypes.CSRF_TOKEN_SUCCESS, payload });
export const csrfTokenFail = payload => ({ type: actionTypes.CSRF_TOKEN_FAIL, payload });
export const csrfToken = () => dispatch => {
    dispatch(csrfTokenStart());
    fetch('http://localhost:8080/csrf', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Erreur !');
                throw new Error('Impossible de récupérer le jeton !');
            }
            return res.json();
        })
        .then(data => {
            dispatch(csrfTokenSuccess(data.token));
        })
        .catch(error => dispatch(csrfTokenFail(error)));
};