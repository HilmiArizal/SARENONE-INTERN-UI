const INITIAL_STATE = {
    dataManageUser: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_MANAGEUSER_SUCCESS':
            return {
                dataManageUser: action.payload
            }
        case 'DATA_MANAGEUSER_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}