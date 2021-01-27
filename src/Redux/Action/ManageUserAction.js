import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getAllUsers = () => {
    return async (dispatch) => {
        const res = await Axios.get(API_URL_1 + `users/getAllUsers`)
        dispatch({
            type: 'DATA_MANAGEUSER_SUCCESS',
            payload: res.data
        })
    }
}

export const editUsers = (dataUser, iduser) => {
    return async (dispatch) => {
        if (window.confirm('Anda yakin mengubah status ?'))
            await Axios.patch(API_URL_1 + `users/editStatus?iduser=${iduser}`, dataUser)
        const res = await Axios.get(API_URL_1 + `users/getAllUsers`)
        dispatch({
            type: 'DATA_MANAGEUSER_SUCCESS',
            payload: res.data
        })
    }
}

export const deleteAccount = (iduser) => {
    return async (dispatch) => {
        if (window.confirm('Anda yakin menghapus akun ?'))
            await Axios.delete(API_URL_1 + `users/deleteUser?iduser=${iduser}`)
        const res = await Axios.get(API_URL_1 + `users/getAllUsers`)
        dispatch({
            type: 'DATA_MANAGEUSER_SUCCESS',
            payload: res.data
        })
    }
}