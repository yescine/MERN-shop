import axiox from 'axios'

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
} from './types'
import {returnErrors} from './errorActions'
// check token and load user

export const loadUser = ()=> (dispatch, getState) =>{
   //User Loading 
   dispatch({type:USER_LOADING})

   axiox.get('/api/auth/users',tokenConfig(getState))
      .then(res=>dispatch({
         type:USER_LOADED,
         payload: res.data
      }))
      .catch(err=> 
         {
            dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({type: AUT_ERROR})
         }
      )
}

export const tokenConfig = getState =>{
   // get token from local storage
   const token = getState().auth.token

   // headers 
   const config ={
      headers:{
         "Content-type":"application/json"
      }
   }
   // if token add header
   if(token) config.headers['x-auth-token'] = token;

   return config;
}