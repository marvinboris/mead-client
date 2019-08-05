import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    token: null,
};

const csrfReset = (state, action) => initialState;
const csrfErrorReset = (state, action) => updateObject(state, { error: null });

const csrfTokenStart = (state, action) => updateObject(state, { loading: true });
const csrfTokenSuccess = (state, action) => updateObject(state, { loading: false, token: action.payload });
const csrfTokenFail = (state, action) => updateObject(state, { loading: false, error: action.payload });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CSRF_RESET: return csrfReset(state, action);
        case actionTypes.CSRF_ERROR_RESET: return csrfErrorReset(state, action);

        case actionTypes.CSRF_TOKEN_START: return csrfTokenStart(state, action);
        case actionTypes.CSRF_TOKEN_SUCCESS: return csrfTokenSuccess(state, action);
        case actionTypes.CSRF_TOKEN_FAIL: return csrfTokenFail(state, action);

        default: return state;
    }
};

export default reducer;