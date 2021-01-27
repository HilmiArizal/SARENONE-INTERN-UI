import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProduct } from '../../Redux/Action';
import { MDBContainer, MDBIcon } from 'mdbreact';
import './StockPage.css';


class StockPage extends Component {

    state = {
        category: '',
        search: ''
    }

    componentDidMount() {
        this.props.getAllProduct();
    }

    renderProduct = () => {
        let filteredByProduct = this.props.dataProduct.filter((item) => {
            return (
                item.productname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            )
        })
        return filteredByProduct.map((item, index) => {
            if (this.state.category === item.category) {
                if (item.category === 'SarenOne') {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productname}</td>
                            <td>{item.totalstock} pack</td>
                            <td>{item.category}</td>
                        </tr>
                    )
                } else if (item.category === 'Beuleum') {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productname}</td>
                            <td>{item.totalstock} pack</td>
                            <td>{item.category}</td>
                        </tr>
                    )
                } else if (item.category === 'Nuggetku Rempong') {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productname}</td>
                            <td>{item.totalstock} pack</td>
                            <td>{item.category}</td>
                        </tr>
                    )
                }
            } else if (this.state.category === 'Semua Produk') {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productname}</td>
                        <td>{item.totalstock} pack</td>
                        <td>{item.category}</td>
                    </tr>
                )
            } else if (!this.state.category) {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productname}</td>
                        <td>{item.totalstock} pack</td>
                        <td>{item.category}</td>
                    </tr>
                )
            }
        })
    }

    renderCategory = () => {
        return (
            <select className="form-control form-control-sm" onChange={(e) => this.setState({ category: e.target.value })}>
                <option disabled selected hidden>Pilih Kategori</option>
                <option>Semua Produk</option>
                <option>SarenOne</option>
                <option>Beuleum</option>
                <option>Nuggetku Rempong</option>
            </select>
        )
    }

    renderSearch = () => {
        return (
            <div>
                <input type="text" className="form-control form-control-sm" placeholder="Cari Produk ..." onChange={(e) => this.setState({ search: e.target.value })} />
                <MDBContainer>
                    <MDBIcon icon="search" className="icon-input" />
                </MDBContainer>
            </div>
        )
    }

    render() {
        return (
            <MDBContainer style={{ marginTop: 100 }}>
                <div className="row">
                    <div className="col-5">{this.renderSearch()}</div>
                    <div className="col-2"></div>
                    <div className="col-5">{this.renderCategory()}</div>
                </div>
                <hr />
                <div >
                    <table class="table table-sm table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '5%' }}>No</th>
                                <th scope="col" style={{ width: '40%' }}>Nama Produk</th>
                                <th scope="col" style={{ width: '15%' }}>Stock Tersedia</th>
                                <th scope="col" style={{ width: '40%' }}>Kategori Produk</th>
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

export default connect(mapStatetoProps, { getAllProduct })(StockPage);