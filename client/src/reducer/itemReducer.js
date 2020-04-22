import {v4 as uuid} from 'uuid'
import { GET_ITEM,ADD_ITEM,DELETE_ITEM, ITEM_LOADING} from "../actions/types";
const initialstate ={
 items:[{_id:uuid(),name:'test1'}],
}

export default function(state=initialstate,actions) {
   switch(actions.type){
      case GET_ITEM:
         return{
            ...state,
            items:actions.payload,//[...state.items,actions.payload],
            loading:false 
         }
      case DELETE_ITEM:
         return{
            ...state,
            items:state.items.filter(item=>item._id !== actions.payload)
         }
      case ADD_ITEM:
         return{
            ...state,
            items:[...state.items,actions.payload]
         }
      case ITEM_LOADING:
         return{
            ...state,
            loading:true
         }
      default:
         return state;
   }
}