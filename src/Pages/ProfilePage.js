import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBCol, MDBRow } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';
import { getProfileById, editProfile } from '../Redux/Action';
import { connect } from 'react-redux';
import { API_URL_1 } from '../Helpers/API_URL';
import AkunImage from '../Images/AKUNIMAGE.png';


class Profile extends Component {

    state = {
        modal4: true,

        name: '',
        division: '',
        motto: '',

        imageprofile: undefined,
        previewImage: undefined,
        changeImage: false
    }

    componentDidMount() {
        this.props.getProfileById();
    }

    changeImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                imageprofile: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                changeImage: true
            })
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    editProfile = () => {
        this.props.dataProfile.map((item) => {
            let { imageprofile } = this.state;
            let userId = this.props.iduser;
            let name = !this.state.name ? item.name : this.state.name;
            let division = !this.state.division ? item.division : this.state.division;
            let motto = !this.state.motto ? item.motto : this.state.motto;
            let dataProfile = {
                name, division, motto
            }
            if (name && division && motto) {
                if (imageprofile) {
                    this.props.editProfile(dataProfile, imageprofile, userId)
                    this.setState({ modal4: false })
                } else {
                    alert('Upload lagi gambarnya!')
                }
            } else {
                alert('Isi dengan benar!')
            }
        })
    }

    renderProfile = () => {
        return this.props.dataProfile.map((item, index) => {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-2" style={{ fontWeight: 'bold' }}>Nama</div>
                        <div className="col-1">:</div>
                        <div className="col-9"><input type="text" className="form-control form-control-sm" defaultValue={item.name} onChange={(e) => this.setState({ name: e.target.value })} /></div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-2" style={{ fontWeight: 'bold' }}>Divisi</div>
                        <div className="col-1">:</div>
                        <div className="col-9"><input type="text" className="form-control form-control-sm" defaultValue={item.division} onChange={(e) => this.setState({ division: e.target.value })} /></div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-2" style={{ fontWeight: 'bold' }}>Motto</div>
                        <div className="col-1">:</div>
                        <div className="col-9"><textarea rows="4" className="form-control form-control-sm" defaultValue={item.motto} onChange={(e) => this.setState({ motto: e.target.value })} /></div>
                    </div>
                </div>
            )
        })
    }

    renderImageProfile = () => {
        return this.props.dataProfile.map((item, index) => {
            return (
                this.state.previewImage
                    ?
                    <center>
                        <img src={this.state.previewImage} alt="Akun-Image" className="Akun-PrevImg" defaultValue={API_URL_1 + item.imageprofile} />
                    </center>
                    :
                    <center>
                        {
                            item.imageprofile === null
                                ?
                                <img src={AkunImage} alt="Akun-Image" className="Akun-Img" defaultValue={API_URL_1 + item.imageprofile} />
                                :
                                <img src={API_URL_1 + item.imageprofile} alt="Akun-Image" className="Akun-Img" defaultValue={API_URL_1 + item.imageprofile} />
                        }
                    </center>
            )
        })
    }

    render() {
        if (!this.state.modal4) {
            return (
                <Redirect to="/home"></Redirect>
            )
        }
        return (
            <MDBContainer>
                <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                    <Link to="home">
                        <MDBModalHeader toggle={this.toggle(4)}></MDBModalHeader>
                    </Link>
                    <MDBModalBody>
                        <div>
                            {this.renderImageProfile()}
                            <MDBRow>
                                <MDBCol size="4"></MDBCol>
                                <MDBCol size="4"><input type="file" style={{ fontSize: 10 }} onChange={this.changeImage} /></MDBCol>
                                <MDBCol size="4"></MDBCol>
                            </MDBRow>
                        </div>
                        <div style={{ margin: 40 }}>
                            {this.renderProfile()}
                        </div>
                        <center>
                            <MDBBtn color="elegant" size="sm" onClick={this.editProfile}>SIMPAN</MDBBtn>
                        </center>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}


const mapStatetoProps = ({ user, profile }) => {
    return {
        iduser: user.iduser,
        dataProfile: profile.dataProfile,
    }
}

export default connect(mapStatetoProps, { getProfileById, editProfile })(Profile);