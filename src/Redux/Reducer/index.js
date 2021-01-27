import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import profileReducer from './ProfileReducer';
import manageuserReducer from './ManageUserReducer';
import productReducer from './ProductReducer';

export default combineReducers({
    user: userReducer,
    profile: profileReducer,
    manageuser: manageuserReducer,
    product: productReducer
})