import axiox from 'axios'
import { GET_ITEM,ADD_ITEM,DELETE_ITEM,ITEM_LOADING} from "./types";
 
export const getItems=()=> dispatch=>{
   dispatch(setItemLoading);
   axiox
      .get('/api/items')
      .then(res => 
         dispatch({
            type:GET_ITEM,
            payload:res.data})
         )
}
export const deleteItem= id =>dispatch=>{
   axiox
      .delete(`/api/items/${id}`)
      .then(res => 
         dispatch({
            type:DELETE_ITEM,
            payload:id})
         )
}

export const addItem=(item)=>dispatch=>{
   axiox
      .post('/api/items',item)
      .then(res => 
         dispatch({
            type:ADD_ITEM,
            payload:res.data})
         )
}

export const setItemLoading=()=>{
   return{
      type:ITEM_LOADING
   }
}