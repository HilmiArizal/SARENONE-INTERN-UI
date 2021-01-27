import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { keepLoginUser } from './Redux/Action';
import Navbar from './Components/Navbar';
import Login from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import Verified from './Pages/VerifiedPade';
import Profile from './Pages/ProfilePage';
import Stock from './Pages/StockPage/StockPage';
import ManageUser from './SuperAdmin/ManageUser';
import ManageStock from './SuperAdmin/ManageStock/ManageStock';
import './App.css';
import RegisterPage from './Pages/RegisterPage/RegisterPage';



class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.keepLoginUser();
    }
  }

  render() {
    if (this.props.status === 'Belum Verifikasi') {
      return (
        <div className="App">
          <Route path="/unverifikasi" component={Verified} />
          <Route path="/home" component={Verified} />
        </div>
      )
    }
    if (this.props.role === 'admin') {
      return (
        <div className="App">
          <Navbar />
          <Route path="/home" component={HomePage} exact />
          <Route path="/stock" component={Stock} />
          <Route path="/profile" component={Profile} />
          <Route path="/manageuser" component={ManageUser} />
          <Route path="/managestock" component={ManageStock} />
        </div>
      );
    } else if (this.props.role === 'user') {
      return (
        <div className="App">
          <Navbar />
          <Route path="/home" component={HomePage} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/stock" component={Stock} />
          <Route path="/unverifikasi" component={Verified} />
        </div>
      )
    } else if (!this.props.role) {
      return (
        <div className="App">
          <Route path="/" component={Login} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
        </div>
      )
    }
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    status: user.status,
    role: user.role
  }
}

export default connect(mapStatetoProps, { keepLoginUser })(App);

