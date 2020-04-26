import React ,{useState,useEffect}from 'react'
import {Button,Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input,NavLink,Alert} from 'reactstrap'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {register} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'

function RegisterModal(props) {
   const [modal,setModal] = useState(false)
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [msg,setMsg] = useState(null)  
   useEffect(()=>{
      const {error,isAuthenticated} =props
      console.log(props);
      if(error.id==='REGISTER_FAIL'){
         setMsg(error.msg.msg)
      }else{
         setMsg(null)
      }
      // if autenicated close model
      if(modal){
         if(isAuthenticated){
            toogle();
         }
      }
   },props)

   const toogle = ()=>{
      props.clearErrors()
      setModal(!modal)
   }

   const handleToggle =()=>{
      setModal(!modal)
   }
   const handleOnSubmit =e=>{
      e.preventDefault()
      const newUser={
         name:name,
         email:email,
         password:password
      }
      props.register(newUser)
      // toogle()
   }

   const handleChangeName = (e) =>{
      setName(e.target.value)
   }

   const handleChangeEmail = (e) =>{
      setEmail(e.target.value)
   }
   const handleChangePassword = (e) =>{
      setPassword(e.target.value)
   }
   return (
      <div>
      <NavLink onClick={toogle} href="#">
         Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
           {msg?<Alert color="danger">{msg}</Alert>:null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="user name"
                className="mb-3"
                onChange={handleChangeName}
              />

               <Label for="email">email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="user email"
                className="mb-3"
                onChange={handleChangeEmail}
              />

               <Label for="password">password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="user password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      </div>
   )
}

RegisterModal.propTypes = {
   isAuthenticated:propTypes.bool,
   error:propTypes.object.isRequired,
   register:propTypes.func.isRequired,
   clearErrors:propTypes.func.isRequired
}
const mapStateToProps = state =>({
   isAuthenticated:state.isAuthenticated,
   error:state.error
})

export default connect(mapStateToProps,{register,clearErrors})(RegisterModal)
