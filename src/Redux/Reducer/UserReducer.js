const INITIAL_STATE = {
    dataUser: [],
    iduser: 0,
    username: '',
    status: '',
    role: '',

    redirectLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERS_SUCCESS':
            return {
                ...state,
                iduser: action.payload.iduser,
                username: action.payload.username,
                status: action.payload.status,
                role: action.payload.role
            }
        case 'DATA_LOGIN_SUCCESS':
            return {
                ...state, dataUser: action.payload,
            }
        case 'REDIRECT_LOGIN':
            return {
                ...state, redirectLogin: action.payload
            }
        case 'DATA_USERS_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}