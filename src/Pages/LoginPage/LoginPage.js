import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import { loginUser, getProfileById } from '../../Redux/Action';
import { MDBBtn, MDBIcon, MDBContainer } from 'mdbreact';
import './LoginPage.css';


class Login extends Component {

    state = {
        username: '',
        password: '',
        warningPassword: '',
        hiddenPassword: false,
        showWarning: false
    }

    componentDidMount(){
        this.props.getProfileById();
    }

    handleUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onChangeHiddenPassword = () => {
        this.setState({ hiddenPassword: !this.state.hiddenPassword })
    }

    onShowWarning = () => {
        this.setState({ showWarning: true })
    }

    onBtnKeyPress = (e) => {
        if(e.keyCode === 13){
            this.onBtnLogin();
        }
    }

    onBtnLogin = () => {
        let username = this.state.username;
        let password = this.state.password;
        let dataLogin = {
            username, password
        }
        this.props.loginUser(dataLogin)
        $('#form-login')[0].reset()
    }

    render() {
        if (this.props.username) {
            return (
                <Redirect to="/home"></Redirect>
            )
        }
        return (
            <div className="body-login">
                <div className="section-login">
                    <div className="card-login">
                        <form id="form-login">
                            <div className="title-login">HOLA, BRADER!</div>
                            <hr/>
                            <div className="grey-text">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    onChange={this.handleUsername}
                                    onKeyDown={this.onBtnKeyPress}
                                />
                                <br />
                                <input
                                    type={this.state.hiddenPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.handlePassword}
                                    onFocus={this.onShowWarning}
                                    onKeyDown={this.onBtnKeyPress}
                                />
                                {
                                    this.state.hiddenPassword
                                    ?
                                    <MDBContainer>
                                            <MDBIcon icon="eye-slash" onClick={this.onChangeHiddenPassword} className="icon-hiddenPassword" />
                                        </MDBContainer>
                                        :
                                        <MDBContainer>
                                            <MDBIcon icon="eye" onClick={this.onChangeHiddenPassword} className="icon-hiddenPassword" />
                                        </MDBContainer>
                                }
                                <div className="warning-password-login">{this.state.showWarning ? '*Rahasiakan password anda' : ''}</div>
                            </div>
                            <br />
                            <div>
                                <MDBBtn id="btn-login" color="primary" size="md" onClick={this.onBtnLogin}>
                                    SUBMIT
                                </MDBBtn>
                            </div>
                            <br/>
                            <div>
                                <div className="forgot-pass-login">Lupa password ? <br/> <a href="/">Disini</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}


const mapStatetoProps = ({ user }) => {
    return {
        username: user.dataUser.username,
        status: user.status
    }
}

export default connect(mapStatetoProps, { loginUser, getProfileById })(Login);