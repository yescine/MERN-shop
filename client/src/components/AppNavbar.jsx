import React, {useState} from 'react'

import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   NavbarText,
   Container
 } from 'reactstrap';

import RegisterModal from './RegisterModal'

function AppNavbar() {
   const [isOpen,setIsOpen] = useState(false)

   const toogle=()=>{
      setIsOpen(!isOpen)
   }

   return (
      <div>
         <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
               <NavbarBrand href="/">shooping list</NavbarBrand>
               <NavbarToggler onClick={toogle}/>
               <Collapse isOpen={isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                     <NavItem>
                        <RegisterModal/>
                        <NavLink href="https://github.com">
                           Github
                        </NavLink>
                     </NavItem>
                  </Nav>
               </Collapse>
            </Container>
         </Navbar>      
      </div>
   )
}

export default AppNavbar
