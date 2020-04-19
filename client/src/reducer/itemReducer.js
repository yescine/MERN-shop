import {v4 as uuid} from 'uuid'
import { GET_ITEM,ADD_ITEM,DELETE_ITEM } from "../actions/types";
const initialstate ={
 items:[
   {id:uuid(),name:'egg'},
   {id:uuid(),name:'splash'},
   {id:uuid(),name:'water'}
]
}

export default function(state=initialstate,actions) {
   switch(actions.type){
      case GET_ITEM:
         return{
            ...state
         }
      default:
         return state;
   }
}