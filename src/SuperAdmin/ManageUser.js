import React, { Component } from 'react';
import { getAllUsers, editUsers, deleteAccount } from '../Redux/Action';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';


class ManageUser extends Component {

    state = {
        changeStatus: ''
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    editStatus = (iduser) => {
        this.props.dataManageUser.map((item, index) => {
            let status = !this.state.changeStatus ? item.status : this.state.changeStatus;
            let dataUser = {
                status
            }
            this.props.editUsers(dataUser, iduser)
        })
    }

    deleteAccount = (iduser) => {
        this.props.deleteAccount(iduser)
    }

    renderGetAllUsers = () => {
        return this.props.dataManageUser.map((item, index) => {
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>
                        <select defaultValue={item.status} onChange={(e) => this.setState({ changeStatus: e.target.value })}>
                            <option>Verifikasi</option>
                            <option>Belum Verifikasi</option>
                        </select>
                    </td>
                    <td>
                        <MDBIcon icon="check" style={{ cursor: 'pointer' }} onClick={() => this.editStatus(item.iduser)} />
                    </td>
                    <td>
                        <MDBIcon icon="trash" style={{ cursor: 'pointer' }} onClick={() => this.deleteAccount(item.iduser)} />
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ marginTop: 100 }} className="container">
                <table class="table table-sm">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">No. </th>
                            <th scope="col">Nama User</th>
                            <th scope="col">Status</th>
                            <th scope="col">Aksi</th>
                            <th scope="col">Akun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderGetAllUsers()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStatetoProps = ({ manageuser }) => {
    return {
        dataManageUser: manageuser.dataManageUser
    }
}

export default connect(mapStatetoProps, { getAllUsers, editUsers, deleteAccount })(ManageUser);