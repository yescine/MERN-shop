import React ,{useState}from 'react'
import {Button,Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input,NavLink} from 'reactstrap'
import {connect} from 'react-redux'
import propType from 'prop-types'

function RegisterModal(props) {
   const [modal,setModal] = useState(false)
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [msg,setMsg] = useState(null)  

   propType ={
      isAuthenticated:propType.bool,
      error:propType.object.isRequired   
   }
   const toogle = ()=>{
      setModal(!modal)
   }

   const handleToggle =()=>{
      setModal(!modal)
   }
   const handleOnSubmit =e=>{
      e.preventDefault()
      const newItem={
         id:uuid(),
         name:name.name
      }
      props.addItem(newItem)
      toogle()
   }

   const handleChangeName = (e) =>{
      setName({[e.target.name]:e.target.value})
   }

   return (
      <div>
      <NavLink onClick={toogle} href="#">
         Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="user name"
                onChange={handleChangeName}
              />

               <Label for="email">email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="user email"
                onChange={handleChangeName}
              />

               <Label for="password">password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="user password"
                onChange={handleChangeName}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      </div>
   )
}

const mapStateToProps = state =>({
   isAuthenticated:state.isAuthenticated,
   error:state.error
})

export default connect(mapStateToProps,{})(RegisterModal)
