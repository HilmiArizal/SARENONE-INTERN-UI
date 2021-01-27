import Axios from "axios";
import { API_URL_1 } from "../../Helpers/API_URL";
import Swal from 'sweetalert2';


export const registerUser = (dataRegister) => {
    return async (dispatch) => {
        try {
            await Axios.post(API_URL_1 + `users/registerUser`, dataRegister)
            dispatch({ type: 'REDIRECT_LOGIN', payload: true })

            setTimeout(() => {
                dispatch({ type: 'REDIRECT_LOGIN', payload: false })
            }, 1000);

        } catch (err) {
            alert(err.response.data)
        }
    }
}

export const loginUser = (dataLogin) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(API_URL_1 + `users/loginUser`, dataLogin)
            if (res.data.length !== 0) {
                localStorage.setItem('token', res.data.token)
            }
            dispatch({ type: 'DATA_LOGIN_SUCCESS', payload: res.data })
            dispatch({ type: 'USERS_SUCCESS', payload: res.data })

            Swal.fire({
                title: `Selamat datang, ${res.data.username} !`,
                showConfirmButton: false,
                timer: 1000
            })
        } catch (err) {
            localStorage.removeItem('token')
            alert(err.response.data)
        }
    }
}

export const keepLoginUser = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await Axios.post(API_URL_1 + `users/keepLoginUser`, {}, headers)
            dispatch({
                type: 'USERS_SUCCESS',
                payload: res.data
            })
        }
    }
}

export const logoutUser = () => {
    return async () => {
        localStorage.removeItem('token')
        Swal.fire({
            title: 'Terima kasih',
            timer: 1000,
            showConfirmButton: false
        })
    }
}