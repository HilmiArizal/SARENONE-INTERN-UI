import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Unverified from '../Images/Unverified.png';


class Verified extends Component {

    state = {}

    render() {
        if(this.props.status === 'Verifikasi'){
            return(
                <Redirect to="/home"></Redirect>
            )
        }
        return (
            <div>
                <center>
                    <div style={{ marginTop: 100, fontSize: 30 }}>MOHON TUNGGU AKUN ANDA SEDANG DI VERIFIKASI OLEH RIZAL</div>
                    <img src={Unverified} alt="img-Unverified" style={{ width: '60%', marginTop: 30 }} />
                </center>
            </div>
        );
    }
}


const mapStatetoProps = ({ user }) => {
    return {
        status: user.status
    }
}

export default connect(mapStatetoProps)(Verified);