import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import templateReducer from './reducers/templateReducer';
import contractReducer from './reducers/contractReducer';
import templateListReducer from './reducers/templateListReducer';
import reportReducer from './reducers/reportReducer';
import reportListReducer from './reducers/reportListReducer';
import clientReducer from './reducers/clientReducer';
import contractListReducer from './reducers/contractListReducer';
import clientContractReducer from './reducers/clientContractReducer';
import CCListReducer from './reducers/CCListReducer';
import authReducer from './reducers/authReducer';

export const BASE_URL = 'https://inspectable.herokuapp.com'

const allReducers = combineReducers({
    report: reportReducer,
    template: templateReducer,
    contract: contractReducer,
    templateList: templateListReducer,
    reportList: reportListReducer,
    clients: clientReducer,
    contractList: contractListReducer,
    clientContract: clientContractReducer,
    CCList: CCListReducer,
    user: authReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        state = undefined;
    }

    return allReducers(state, action)
}

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);