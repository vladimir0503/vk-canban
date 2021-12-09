import * as actionTypes from './types';

const initialState = {
    id: null,
    name: null,
    text: null
};

const card = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_CARD:
        case actionTypes.EDIT_CARD:
            return {
                ...state,
                ...payload
            }

        case actionTypes.REMOVE_CARD:
            return {
                ...initialState
            }

        default:
            return state;
    }
};

export default card;