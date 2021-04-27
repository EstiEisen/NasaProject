import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Store/actions'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Redirect, withRouter } from 'react-router'
import logo from './1200px-NASA_logo.svg.png'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}
const mapDispatchToProps = (dispatch) => ({
    setUserEmail: (userEmail) => dispatch(actions.setUserEmail(userEmail)),
    setUserPassword: (userPassword) => dispatch(actions.setUserPassword(userPassword)),
    setUserName: (name) => dispatch(actions.setUserName(name)),
    setUserUid: (uid) => dispatch(actions.setUserUid(uid))

})

export default connect(mapStateToProps, mapDispatchToProps)(class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordTwo: " ",
            redirect: false
        }
    }

    onSubmit = event => {
       
        const { mail, password, name, uid } = this.props.user;
        const data = { name: name, mail: mail, password: password };
        const { setUserUid } = this.props;
        
        fetch('http://localhost:4000/addUser', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
             

            },
            body: JSON.stringify(data),
        })
        .then(response => {
            response.json().then(d =>{
                setUserUid(d._id)
                this.setState({redirect:true})
            })
          })   
          event.preventDefault();
          
          
    }



    render() {
        const { mail, password } = this.props.user;
        const { passwordTwo } = this.state;

        const { setUserEmail, setUserPassword, setUserName } = this.props;
        const isInvalid =
            password !== passwordTwo ||
            password === '' ||
            mail === '';
            const { redirect } = this.state;
            if (redirect) {
              console.log("redirect")
              return <Redirect to='/todayPicture' /> 
                         
            }
        return (

            <div className="outer">
                <div className="inner">
                <img className="imglogo" src={logo} ></img>

                    <form onSubmit={this.onSubmit}>

                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setUserEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setUserPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.setState({ passwordTwo: e.target.value })} />
                        </div>
                        <button disabled={isInvalid} type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>

        );

    }
}
)
const SignUpLink = () => (
    <p className="forgot-password text-right">
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );

  export { SignUpLink };