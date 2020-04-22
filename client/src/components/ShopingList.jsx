import React, { useState,useEffect } from 'react'
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {v4 as uuid} from 'uuid'
import { connect, useSelector,useDispatch } from "react-redux";
import {getItems,deleteItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

function ShopingList(props) {
   useEffect(()=>{
      props.getItems()
   },[]) 
   const item = useSelector(state=>state.item)
   return (
      <div>
         <Container>
            {false?<Button 
               color="dark" 
               style={{margin:'2rem'}}
               onClick={()=>{
                  const name = prompt('enter item ')
                  if(name){
                     // setItem([...item,{id:uuid(),name:name}])
                  }
               }}
               >add Item #!reducer</Button>:null}
            <ListGroup>
               <TransitionGroup className="shopping-list">
                  {item.items.map(({_id,name})=>(
                     <CSSTransition key={name} timeout={500} classNames="fade">
                        <ListGroupItem>
                           <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={()=>{
                                 // setItem(item.filter(item=>item.id!==id))
                                 props.deleteItem(_id)
                              }}
                           >&times;</Button>
                           {name}
                        </ListGroupItem>
                     </CSSTransition>
                  ))}
               </TransitionGroup>
            </ListGroup>
         </Container>
      </div>
   )
}
ShopingList.protoTypes = {
   getItems:PropTypes.func.isRequired,
   deleteItem:PropTypes.func.isRequired,
   item: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
   item:state.item
})
export default connect(mapStateToProps,{getItems,deleteItem})(ShopingList);
