import Axios from "axios";
import Swal from "sweetalert2";
import { API_URL_1 } from "../../Helpers/API_URL";


export const getAllProfile = () => {
    return async (dispatch) => {
        const res = await Axios.get(API_URL_1 + `profile/getAllProfile`)
        dispatch({
            type: 'DATA_ALLPROFILE_SUCCESS',
            payload: res.data
        })
    }
}

export const getProfileById = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        const res = await Axios.get(API_URL_1 + `profile/getProfileId`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: 'DATA_PROFILE_SUCCESS',
            payload: res.data
        })
    }
}

export const editProfile = (dataProfile, imageprofile, userId) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();
            formData.append('imageprofile', (imageprofile))
            formData.append('dataProfile', JSON.stringify(dataProfile))
            await Axios.patch(API_URL_1 + `profile/editProfile?userId=${userId}`, formData)
            const token = localStorage.getItem('token');
            const res = await Axios.get(API_URL_1 + `profile/getProfileId`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'DATA_PROFILE_SUCCESS',
                payload: res.data
            })
            const res2 = await Axios.get(API_URL_1 + `profile/getAllProfile`)
            dispatch({
                type: 'DATA_ALLPROFILE_SUCCESS',
                payload: res2.data
            })
            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            })
        } catch (err) {
            console.log(err)
        }
    }
}