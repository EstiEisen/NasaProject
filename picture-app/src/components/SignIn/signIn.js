import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Store/actions'
import { SignUpLink } from '../SignUp/signUp';
import { Redirect } from 'react-router'
import logo from './1200px-NASA_logo.svg.png'

import * as ROUTES from '../../constants/routes';

function mapStateToProps(state) {
    return {
      user: state.userReducer.user
    };
  }
  const mapDispatchToProps = (dispatch) => ({
    setUserEmail: (userEmail) => dispatch(actions.setUserEmail(userEmail)),
    setUserPassword: (userPassword) => dispatch(actions.setUserPassword(userPassword)),
    setUserName: (name) => dispatch(actions.setUserName(name)),
    setUserUid: (uid) => dispatch(actions.setUserUid(uid)),
    setJwt: (jwt) => dispatch(actions.setJwt(jwt)),

  })

  export default connect(mapStateToProps, mapDispatchToProps)(class SignInPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        good:true
      }
    }
  
    onSubmit = event => {
      const { mail,password,name } = this.props.user;
      const { setUserUid,setUserName,setUserPassword,setUserEmail,setJwt } = this.props;

debugger
      fetch('http://localhost:4000/login/'+ mail +'/'+ password)
    .then(response => response.json())
    .then(d =>{
      // JSON.parse(d)
      setUserUid(d.user._id)
      setUserName(d.user.name)
      setUserPassword(d.user.password)
      setUserEmail(d.user.mail)
      console.log("!!!!!!!!!!! 1  "+d.jwt)
      setJwt(d.jwt)
    
  
      this.setState({redirect:true})
  })
    .catch((error) => {
      console.error('Error:', error);
    alert("משתמש לא קיים")
    });
    event.preventDefault();
    }
   
  
    render() {
      const { mail, password } = this.props.user;
      const { setUserEmail, setUserPassword } = this.props;
      const isInvalid = (password === '' || mail === '');
      const { redirect } = this.state;
      if (redirect) {
        console.log("redirect")
        return <Redirect to='/todayPicture' />;
      }
      return (
       
        <div className="outer">
       
          <div className="inner"> 
             <img className="imglogo" src={logo} ></img>
            <form onSubmit={this.onSubmit}>

              <h3>Sign In</h3>
            
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" onLoad={(e)=>setUserEmail(e.target.value)} onChange={(e) => setUserEmail(e.target.value)} />
              </div>
  
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onLoad={(e)=>setUserPassword(e.target.value)} onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              <button disabled={isInvalid} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
              <SignUpLink />
            </form>
          </div>
        </div>
  
      );
   
    }
  })
  

