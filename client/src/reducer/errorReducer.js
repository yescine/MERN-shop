import {GET_ERROR,CLEAR_ERROR} from '../actions/types';

const initialState={
   msg:{},
   id:null,
   status:null
}

 export default function(state=initialState,actions){
    switch (actions.types){
      case GET_ERROR:
         return{
            msg: actions.payload.msg,
            status:actions.payload.status,
            id: actions.payload.id
         }
      case CLEAR_ERROR:
         return{
            msg:{},
            id:null,
            status:null
         }
      default:
         return state
    }
 }