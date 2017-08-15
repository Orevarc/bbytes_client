import { createReducer } from '../utils';
import { DISPLAY_NOTIFICATION } from '../constants';

const initialState = {
    notification: null,
};

export default createReducer(initialState, {
    [DISPLAY_NOTIFICATION]: (state, payload) => {
        return Object.assign({}, state, {
            notification: {
                title: payload.title,
                message: payload.message,
                type: payload.level
            }
        });
    }
});
