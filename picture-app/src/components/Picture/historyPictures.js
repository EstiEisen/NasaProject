
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../Store/actions'
// import PictureCard from './pictureCard'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Modal from 'react-bootstrap/Modal'
import swal from 'sweetalert';


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        picture: state.pictureReducer.picture,
        pictureHistory: state.pictureReducer.pictureHistory
    };
}
const mapDispatchToProps = (dispatch) => ({
    setPictureHistory: (picture) => dispatch(actions.setPictureHistory(picture)),

})

export default connect(mapStateToProps, mapDispatchToProps)(class HistoryPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showModal: false,
            title: '',
            file: {}



        }
        this.upload = this.upload.bind(this);
        this.deleteMe = this.deleteMe.bind(this);
        this.setShowModal = this.setShowModal.bind(this);
        this.setNoShow = this.setNoShow.bind(this);

    }
    componentDidMount() {

        const { uid } = this.props.user;
        const { setPictureHistory } = this.props;
        debugger
        fetch('http://localhost:4000/getPictureHistory/' + uid)
            .then(response => response.json())
            .then((data) => {
                setPictureHistory(data)
                this.setState({ list: data })

            });

    }


    setShowModal(e) {
        this.setState({ showModal: true })

    }
    setNoShow(e) {
        this.setState({ showModal: false })

    }
    upload() {
        const { uid, jwt } = this.props.user;

        const { title, file } = this.state

        let formData = new FormData();
        // console.log("@@@@@@@@@@@@@@@@@@" + e)
        formData.append("picture", file);
        formData.append("title", title);
        formData.append("uid", uid)

        console.log(formData)
        console.log("!!!!!!!!!!    " + jwt)
        fetch("http://localhost:4000/addPicture", {
            method: 'POST', // or 'PUT'
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': jwt
            },
            body: formData,
        })
            .then(response => {
                response.json().then(d => {


                    this.setState({ list: this.state.list.concat([d]) })
                    this.setState({ title: "" })
                    this.setState({ file: null })
                    this.setState({ showModal: false })
                    swal("sucsses!", "saved!!", "success");

                })
            }).catch(err => {
                alert("not succssses to upload")
            })

    }


    deleteMe(e){
        const { uid, jwt } = this.props.user;
        const pid=e
        fetch("http://localhost:4000/deleteFromHistory/"+uid+'/'+pid, {
            method: 'DELETE', // or 'PUT'

            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': jwt
            },
        })
          .then(d => {
            swal("delete!", "!!", "success");
                this.setState({list: this.state.list.filter(l => l._id!== pid )})
             

            //    }) 
         })
               .catch(err => {
                alert("not succssses to delete")
            })



  
}




    render() {
        const { pictureHistory } = this.props;

        const { name } = this.props.user;

        return (
            <>

                <h4 className="title">hi {name} your history picture:</h4>

                <br></br>

                {this.state.list == '' ? <div> <Spinner animation="border" size="md" />loading the pictures</div> : <Button onClick={this.setShowModal} ><AddPhotoAlternateIcon></AddPhotoAlternateIcon>add picture</Button>}
                <div>

                    {this.state.list.map((picture, i) => (


                        <Card key={i} border="secondary" style={{ width: '18rem' }}>
                            <DeleteForeverIcon onClick={(e)=>this.deleteMe(picture._id)}></DeleteForeverIcon>
                            <Card.Header>{picture.title}
                            </Card.Header>
                            <Card.Body>

                                <Card.Img src={picture.url} />
{/* 
                                {mediaType === "video" ? <iframe
                                    src={url}>
                                </iframe> : <img src={url} onClick={this.setShowModal} className="img1" /> */}

                            </Card.Body>
                        </Card>


                    ))}</div>
                <Modal
                    show={this.state.showModal}
                    onHide={this.setNoShow}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            the title:
    <input type="text" onChange={(e) => this.setState({ title: e.target.value })}></input>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] })}></input>
                        {/* <input type="file" onChange={(e) => this.upload(e.target.files[0])}></input> */}
                    </Modal.Body>
                    <Button onClick={this.upload}>add</Button>
                </Modal>


                <br />
            </>
        );
    }
})


