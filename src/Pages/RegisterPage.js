import React, { Component } from 'react';
import { MDBInput, MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { registerUser } from '../Redux/Action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            password: ""
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden })
    }

    componentDidMount() {
        if (this.props.password) {
            this.setState({ password: this.props.password })
        }
    }

    onBtnRegister = () => {
        let username = this.username.value;
        let password = this.password.value;
        let confirmPassword = this.confirmPassword.value;
        let dataRegister = {
            username, password, confirmPassword
        }
        this.props.registerUser(dataRegister)
    }

    render() {
        if (this.props.username !== '') {
            return(
                <Redirect to="/">

                </Redirect>
            )
        } 
        return (
            <div style={{ marginTop: 180 }}>
                <MDBContainer>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol size="4"></MDBCol>
                                <MDBCol size="4">
                                    <form>
                                        <p className="h4 text-center py-4">REGISTER</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="Username"
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                inputRef={(username) => this.username = username}
                                            />
                                            <MDBInput
                                                label="Password"
                                                icon="lock"
                                                group
                                                type={this.state.hidden ? "password" : "text"}
                                                validate
                                                inputRef={(password) => this.password = password}
                                            />
                                            <MDBInput
                                                label="Confirm Password"
                                                icon="exclamation-triangle"
                                                group
                                                type={this.state.hidden ? "password" : "text"}
                                                validate
                                                inputRef={(confirmPassword) => this.confirmPassword = confirmPassword}
                                            />
                                            {
                                                this.state.hidden
                                                    ?
                                                    <center>
                                                        <MDBIcon size="lg" icon="eye" onClick={this.toggleShow} />
                                                    </center>
                                                    :
                                                    <center>
                                                        <MDBIcon size="lg" icon="eye-slash" onClick={this.toggleShow} />
                                                    </center>
                                            }
                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn color="elegant" size="md" onClick={this.onBtnRegister}>
                                                SUBMIT
                                            </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCol>
                                <MDBCol size="4"></MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer >
            </div >
        );
    }
}


const mapStatetoProps = ({ user }) => {
    return {
        username: user.username
    }
}

export default connect(mapStatetoProps, { registerUser })(Register);