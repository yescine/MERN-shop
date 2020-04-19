import React, { useState } from 'react'
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import {v4 as uuid} from 'uuid'

function ShopingList() {
   const [item,setItem] = useState([
      {id:uuid(),name:'egg'},
      {id:uuid(),name:'splash'},
      {id:uuid(),name:'water'}
   ])
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

export default ShopingList
