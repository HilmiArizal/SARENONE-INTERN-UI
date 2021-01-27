const INITITAL_STATE = {
    dataProduct: []
}

export default (state = INITITAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_PRODUCT_SUCCESS':
            return { ...state, dataProduct: action.payload }
        case 'DATA_PRODUCT_FAIL':
            return INITITAL_STATE
        default:
            return state
    }
}