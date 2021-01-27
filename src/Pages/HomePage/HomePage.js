import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { getAllProfile } from '../../Redux/Action';
import { API_URL_1 } from '../../Helpers/API_URL';
import AkunImage from '../../Images/AKUNIMAGE.png';
import './HomePage.css'
import { connect } from 'react-redux';


class Home extends Component {

    state = {
        dataProfile: []
    }

    componentDidMount() {
        this.props.getAllProfile()
    }

    renderProfile = () => {
        return this.props.dataAllProfile.map((item, index) => {
            return (
                <MDBCol style={{ maxWidth: "15rem" }}>
                    <MDBCard style={{ minHeight: "50vh", marginTop: '10%' }}>
                        {
                            item.imageprofile === null
                                ?
                                <center>
                                    <img src={AkunImage} alt="Akun-Image" style={{ width: "80%" }} />
                                </center>
                                :
                                <center>
                                    <img src={API_URL_1 + item.imageprofile} alt="Akun-Image" style={{ width: "80%" }} />
                                </center>
                        }
                        <MDBCardBody>
                            <center>
                                {
                                    item.name && item.division && item.motto
                                        ?
                                        <div>
                                            <div style={{ fontSize: '80%' }}><b>{item.name.toUpperCase()}</b></div>
                                            <MDBCardText>({item.division.toUpperCase()})</MDBCardText>
                                            <MDBCardText style={{ fontSize: '70%' }}>{item.motto}</MDBCardText>
                                        </div>
                                        :
                                        <div>
                                            <div style={{ fontSize: '80%' }}><b>-</b></div>
                                            <MDBCardText>-</MDBCardText>
                                            <MDBCardText>-</MDBCardText>
                                        </div>
                                }
                            </center>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <MDBContainer>
                <div className="title-profile">Member CV. Heaven Sentosa </div>
                <div className="d-flex justify-content-center">
                    <MDBRow>
                        {this.renderProfile()}
                    </MDBRow>
                </div>
            </MDBContainer>
        );
    }
}

const mapStatetoProps = ({ profile }) => {
    return {
        dataAllProfile: profile.dataAllProfile
    }
}

export default connect(mapStatetoProps, { getAllProfile })(Home);