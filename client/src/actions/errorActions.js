import {GET_ERROR,CLEAR_ERROR} from './types'

// Return ERRORS 
export const returnErrors = (msg,status,id=null)=>{
   return{
      type: GET_ERROR,
      payload: {msg,status,id}
   }
}

// CLEAR ERRORS
export const clearErrors = ()=>{
   return{
      type: CLEAR_ERROR
   }
}