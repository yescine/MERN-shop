import React, { useState,useEffect } from 'react'
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {v4 as uuid} from 'uuid'
import { connect } from "react-redux";
import {getItems} from '../actions/itemActions'
import PropTypes from 'prop-types'

function ShopingList(props) {
   const [item,setItem] = useState([])
   useEffect(()=>{
      props.getItems()
      const {items} = props.item
      setItem(items)
   },[])

   return (
      <div>
         <Container>
            <Button 
               color="dark" 
               style={{margin:'2rem'}}
               onClick={()=>{
                  const name = prompt('enter item ')
                  if(name){
                     setItem([...item,{id:uuid(),name:name}])
                  }
               }}
               >add Item</Button>
            <ListGroup>
               <TransitionGroup className="shopping-list">
                  {item.map(({id,name})=>(
                     <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                           <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={()=>{
                                 setItem(item.filter(item=>item.id!==id))
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
   item: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
   item:state.item
})
export default connect(mapStateToProps,{getItems})(ShopingList);
