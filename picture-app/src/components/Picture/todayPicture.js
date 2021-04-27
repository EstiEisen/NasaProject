
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Store/actions'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import Button from 'react-bootstrap/Button'
import HistoryPictures from './historyPictures'
import { Link, Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Redirect, withRouter } from 'react-router'
import logo from './s75-31690.jpeg'

import Spinner from 'react-bootstrap/Spinner'
// picture-app\src\components\Picture\s75-31690.jpeg


// import InputGroup from 'react-bootstrap/InputGroup'
// import MyVerticallyCenteredModal from '../Picture/modalPicture'
function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    picture: state.pictureReducer.picture
  };
}
const mapDispatchToProps = (dispatch) => ({
  setPicture: (picture) => dispatch(actions.setPicture(picture)),
  setPictureHistory: (picture) => dispatch(actions.setPictureHistory(picture)),


})


export default connect(mapStateToProps, mapDispatchToProps)(class TodayPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isOk: false,
      isLoading: false

    }
    this.setShowModal = this.setShowModal.bind(this);
    this.setNoShow = this.setNoShow.bind(this);
  }
  componentDidMount() {
    debugger
    const { uid } = this.props.user;
    const { setPicture, setPictureHistory } = this.props;

    fetch('http://localhost:4000/getPicture/' + uid)
      .then(response => response.json())
      .then((data) => {
        setPicture(data)
        this.setState({ isLoading: true })
      });

  }
  setShowModal(e) {
    this.setState({ showModal: true })

  }
  setNoShow(e) {
    this.setState({ showModal: false })

  }
  ok = () => {
    this.setState({ isOk: true })

  }

  render() {
    const { name, } = this.props.user;
    const { url, date, explanation, title, mediaType } = this.props.picture;
    const { isOk } = this.state
    if (isOk)
      return <Redirect to='/historyPicture' />

    return (
      <div>
        
        <div className="outer">
          <h1>wellcom {name}</h1>
          
          <img className="imglogo" src={logo} ></img>

          <div className="outer">
          

            <div className="inner">
  <h2 className="title2">{title}</h2>
              <br></br>
              <br></br><br></br>
              {this.state.isLoading == false ? <div>   <Spinner animation="border" size="md" />loading </div> : ""
              }
              <div className="card">
                {mediaType === "video" ? <iframe
                  src={url} >
                </iframe> : <img src={url} onClick={this.setShowModal} className="img1" />
                }

              </div>
            </div></div>
          <br></br>


          <Modal
            show={this.state.showModal}
            onHide={this.setNoShow}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                <h4 className="modal-title">the explanation</h4>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="modal-body">{explanation}</p>
            </Modal.Body>
          </Modal>


        </div><Button onClick={this.ok} size="lg">to your pictures</Button>
      </div>

    );
  }
}
)

