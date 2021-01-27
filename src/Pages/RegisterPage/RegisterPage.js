import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import $ from 'jquery';
import { registerUser } from '../../Redux/Action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class RegisterPage extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showWarning: false
    }

    onShowWarning = () => {
        this.setState({ showWarning: true })
    }

    onBtnKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.onBtnRegister();
        }
    }

    onBtnRegister = () => {

        let username = this.state.username;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let dataRegister = { username, password, confirmPassword }
        this.props.registerUser(dataRegister)
        $('#form-login')[0].reset();
    }

    render() {
        if(this.props.redirectLogin){
            return(
                <Redirect to="/"/>
            )
        }
        return (
            <div>
                <div className="body-login">
                    <div className="section-login">
                        <div className="card-login">
                            <form id="form-login">
                                <div className="title-login">HOLA, BRADER!</div>
                                <hr />
                                <div className="grey-text">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        onKeyDown={this.onBtnKeyPress}
                                    />
                                    <br />
                                    <input
                                        type={this.state.showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        onFocus={this.onShowWarning}
                                        onKeyDown={this.onBtnKeyPress}
                                    />
                                    <br />
                                    <input
                                        type={this.state.showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                        onKeyDown={this.onBtnKeyPress}
                                    />

                                    <div className="warning-password-login">{this.state.showWarning ? '*Rahasiakan password anda' : ''}</div>
                                    {!this.state.showWarning ? <br /> : ''}
                                    <div style={{ display: 'flex' }}>
                                        <div><input type="checkbox" onClick={() => this.setState({ showPassword: !this.state.showPassword })} /></div>
                                        <div style={{ color: 'black', fontSize: '90%', marginLeft: 5 }}>Lihat password</div>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <MDBBtn id="btn-login" color="primary" size="md" onClick={this.onBtnRegister}>
                                        SUBMIT
                                </MDBBtn>
                                </div>
                                <br />
                                <div>
                                    <div className="forgot-pass-login">Sudah punya akun ? <br /> <a href="/">Disini</a></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    console.log(user.redirectLogin)
    return {
        redirectLogin: user.redirectLogin
    }
}

export default connect(mapStatetoProps, { registerUser })(RegisterPage);