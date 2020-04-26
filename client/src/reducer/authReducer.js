import {
   USER_LOADED,
   USER_LOADING,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT_FAIL,
   LOGOUT_SUCCESS,
   AUT_ERROR,
   REGISTER_FAIL,
   REGISTER_SUCCESS
} from '../actions/types'

const initialSate = {
   token: localStorage.getItem('token'),
   isAuthenticated:null,
   isLoading:null,
   user:null
}

export default function (state=initialSate,action){
   switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false
        };
      case AUT_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
}