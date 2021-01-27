import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"
import Swal from 'sweetalert2';


export const getAllProduct = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `product/getAllProduct`)
            dispatch({ type: 'DATA_PRODUCT_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const addProduct = (dataProduct) => {
    return async (dispatch) => {
        try {
            await Axios.post(API_URL_1 + `product/addProduct`, dataProduct)
            const res = await Axios.get(API_URL_1 + `product/getAllProduct`)
            dispatch({ type: 'DATA_PRODUCT_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const editProduct = (idstock, dataProduct) => {
    return async (dispatch) => {
        try {
            await Axios.patch(API_URL_1 + `product/editProduct?idstock=${idstock}`, dataProduct)
            const res = await Axios.get(API_URL_1 + `product/getAllProduct`)
            dispatch({ type: 'DATA_PRODUCT_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteProduct = (idstock) => {
    return async (dispatch) => {
        try {
            await Axios.delete(API_URL_1 + `product/deleteProduct?idstock=${idstock}`)
            const res = await Axios.get(API_URL_1 + `product/getAllProduct`)
            dispatch({ type: 'DATA_PRODUCT_SUCCESS', payload: res.data })
            Swal.fire({
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            })
        } catch (err) {
            console.log(err)
        }
    }
}