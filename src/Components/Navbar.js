import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser, getProfileById } from '../Redux/Action';
import './Navbar.css';
import { MDBIcon } from 'mdbreact';
import { API_URL_1 } from '../Helpers/API_URL';
import AkunImage from '../Images/AKUNIMAGE.png';
import { Link } from 'react-router-dom';


class Navbar extends Component {

    state = {}

    componentDidMount() {
        this.props.getProfileById();
    }

    onBtnLogout = () => {
        this.props.logoutUser();
    }

    renderImageProfile = () => {
        return this.props.dataProfile.map((item, index) => {
            return (
                <center>
                    {
                        item.imageprofile === null
                            ?
                            <img src={AkunImage} alt="Akun-Image" className="Akun-Img-Nav" />
                            :
                            <img src={API_URL_1 + item.imageprofile} alt="Akun-Image" className="Akun-Img-Nav" />
                    }
                </center>
            )
        })
    }

    render() {
        return (
            <nav class="navbar fixed-top navbar-expand-lg navbar-light" id="bg-navbar">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <Link to="home">
                    <div className="navbar-brand" id="brand">BRADERKU</div>
                </Link>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        {
                            this.props.role === 'admin'
                                ?
                                this.props.status === 'Belum Verifikasi'
                                    ?
                                    ''
                                    :
                                    this.props.username === ''
                                        ?
                                        ''
                                        :
                                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                            <li className="item">
                                                <Link to="managestock" class="nav-link" id="font-item">Kelola Stock</Link>
                                            </li>
                                            <li className="item">
                                                <Link to="manageuser" class="nav-link" id="font-item">Kelola User</Link>
                                            </li>
                                        </ul>
                                :
                                this.props.status === 'Belum Verifikasi'
                                    ?
                                    ''
                                    :
                                    this.props.username === ''
                                        ?
                                        ''
                                        :
                                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                            <li className="item">
                                                <Link to="stock" class="nav-link" id="font-item">Stock</Link>
                                            </li>
                                        </ul>
                        }
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            {
                                this.props.username === ''
                                    ?
                                    <li className="item">
                                        <a href="masuk" class="nav-link" id="font-item"><MDBIcon icon="sign-in-alt" style={{ marginRight: 10 }} />Masuk</a>
                                    </li>
                                    :
                                    <div style={{ color: 'white', cursor: 'pointer' }}>
                                        <div class="dropdown">
                                            <div id="dropdown-username" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                                Brader, {this.props.username}
                                            </div>
                                            <div class="dropdown-menu dropdown-menu-lg-right">
                                                <form class="px-4 py-3">
                                                    <div style={{ marginBottom: 30 }}>
                                                        {this.renderImageProfile()}
                                                    </div>
                                                    <a class="dropdown-item" href="profile" ><MDBIcon icon="user" style={{ marginRight: 10 }} />Profile</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="/" onClick={this.onBtnLogout}><MDBIcon icon="sign-out-alt" style={{ marginRight: 10 }} />Keluar</a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </ul>
                    </form>
                </div>
            </nav>
        );
    }
}

const mapStatetoProps = ({ user, profile }) => {
    return {
        iduser: user.iduser,
        username: user.username,
        status: user.status,
        role: user.role,
        dataProfile: profile.dataProfile
    }
}

export default connect(mapStatetoProps, { logoutUser, getProfileById })(Navbar);