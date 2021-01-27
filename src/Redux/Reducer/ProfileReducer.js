const INITIAL_STATE = {
    dataProfile: [],
    dataAllProfile: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_PROFILE_SUCCESS':
            return {
                ...state, dataProfile: action.payload
            }
        case 'DATA_ALLPROFILE_SUCCESS':
            return {
                ...state, dataAllProfile: action.payload
            }
        case 'DATA_PROFILE_FAIL':
            // console.log('masuk')
            return INITIAL_STATE
        default:
            return state
    }
}