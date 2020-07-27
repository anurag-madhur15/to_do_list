import { createStore, combineReducers } from 'redux';
import reducer from './reducers';

const rootReducer = combineReducers({
    dataReducer: reducer
})

const configStore = () => createStore(rootReducer);
export default configStore;