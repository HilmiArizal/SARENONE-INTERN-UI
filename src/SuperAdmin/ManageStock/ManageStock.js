import { MDBBtn, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProduct, addProduct, editProduct, deleteProduct } from '../../Redux/Action';
import './ManageStock.css';


class ManageStock extends Component {

    state = {
        idstock: 0,
        productname: '',
        totalstock: 0,
        category: '',

        errorInput: '',
        editInput: null,
        modal: false,
        modal2: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    toggle2 = () => {
        this.setState({ modal2: !this.state.modal2 })
    }

    onBtnPraDelete = (idstock, productname) => {
        this.setState({ idstock: idstock, productname: productname })
        this.toggle2();
    }

    componentDidMount() {
        this.props.getAllProduct()
    }

    onBtnAddProduct = () => {
        let productname = this.state.productname;
        let totalstock = this.state.totalstock;
        let category = this.state.category;
        let dataProduct = { productname, totalstock: parseInt(totalstock), category };
        if (productname && totalstock && category) {
            this.props.addProduct(dataProduct)
            this.setState({ modal: false })
        } else {
            this.setState({ errorInput: 'Isi produk dengan benar!' })
        }
    }

    onBtnEditProduct = (idstock) => {
        let productname = this.state.productname;
        let totalstock = this.state.totalstock;
        let category = this.state.category;
        let dataProduct = { productname, totalstock: parseInt(totalstock), category };
        this.props.editProduct(idstock, dataProduct);
        this.setState({ editInput: null, idstock: 0, productname: '', totalstock: 0, category: '' })
    }

    onBtnDeleteProduct = () => {
        let idstock = this.state.idstock;
        this.props.deleteProduct(idstock)
        this.setState({ modal2: false, idstock: 0 })
    }

    renderCategory = () => {
        return (
            <select className="form-control form-control-sm" onChange={(e) => this.setState({ category: e.target.value })}>
                <option disabled selected hidden>{!this.state.category ? 'Pilih Kategori' : this.state.category}</option>
                <option>SarenOne</option>
                <option>Beuleum</option>
                <option>Nuggetku Rempong</option>
            </select>
        )
    }

    renderProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            if (this.state.editInput === index) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><input type="text" className="form-control form-control-sm" defaultValue={item.productname} onChange={(e) => this.setState({ productname: e.target.value })} /></td>
                        <td><input type="text" className="form-control form-control-sm" defaultValue={item.totalstock} onChange={(e) => this.setState({ totalstock: e.target.value })} /></td>
                        <td>{this.renderCategory()}</td>
                        <td>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div className="btn-stock-cancel" onClick={() => this.setState({ editInput: null })}>Batal</div>
                                <div className="btn-stock-confirm" onClick={() => this.onBtnEditProduct(item.idstock)}>Konfirmasi</div>
                            </div>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td>{item.totalstock} pack</td>
                    <td>{item.category}</td>
                    <td>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className="btn-stock-edit" onClick={() => this.setState({ editInput: index, productname: item.productname, totalstock: item.totalstock, category: item.category })}>Ubah</div>
                            <div className="btn-stock-delete" onClick={() => this.onBtnPraDelete(item.idstock, item.productname)}>Hapus</div>
                            <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} centered>
                                <MDBModalHeader toggle={this.toggle2}>Anda yakin menghapus {this.state.productname} ?</MDBModalHeader>
                                <MDBModalBody>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div className="btn-stock-cancel" style={{ paddingTop: '2%', paddingBottom: '2%' }} onClick={() => this.setState({ modal2: false, productname: '' })}>Batal</div>
                                        <div className="btn-stock-confirm" style={{ paddingTop: '2%', paddingBottom: '2%' }} onClick={this.onBtnDeleteProduct}>Konfirmasi</div>
                                    </div>
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    renderInputAddProduct = () => {
        return (
            <div>
                <div className="btn-add-stock" onClick={this.toggle}><MDBIcon icon="plus" /></div>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} side position="top-left">
                    <MDBModalHeader toggle={this.toggle}>Tambah Produk</MDBModalHeader>
                    <MDBModalBody>
                        <div className="error-input">{this.state.errorInput}</div>
                        <form className="form-add-stock">
                            <div>
                                <label>Nama Produk</label>
                                <div><input type="text" className="form-control form-control-sm" placeholder="ex: Chicken Cocktail" onChange={(e) => this.setState({ productname: e.target.value })} /></div>
                            </div>
                            <div>
                                <label>Kategori Produk</label>
                                <div>{this.renderCategory()}</div>
                            </div>
                            <div>
                                <label>Stock Tersedia</label>
                                <div><input type="number" className="form-control form-control-sm" placeholder="ex: 41" onChange={(e) => this.setState({ totalstock: e.target.value })} /></div>
                            </div>
                            <hr />
                            <center>
                                <MDBBtn size="sm" color="elegant" onClick={this.onBtnAddProduct}>Tambah</MDBBtn>
                            </center>
                        </form>
                    </MDBModalBody>
                </MDBModal>
            </div>
        )
    }

    render() {
        return (
            <MDBContainer style={{ marginTop: 100 }}>
                <div>{this.renderInputAddProduct()}</div>
                <div >
                    <table class="table table-sm table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '5%' }}>No</th>
                                <th scope="col" style={{ width: '30%' }}>Nama Produk</th>
                                <th scope="col" style={{ width: '15%' }}>Stock Tersedia</th>
                                <th scope="col" style={{ width: '30%' }}>Kategori Produk</th>
                                <th scope="col" style={{ width: '20%' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProduct()}
                        </tbody>
                    </table>
                </div>
            </MDBContainer>
        );
    }
}

const mapStatetoProps = ({ product }) => {
    return {
        dataProduct: product.dataProduct
    }
}

export default connect(mapStatetoProps, { getAllProduct, addProduct, editProduct, deleteProduct })(ManageStock);