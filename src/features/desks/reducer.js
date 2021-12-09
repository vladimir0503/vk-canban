import * as actionType from "./types";

const initialState = {
    desks: []
};

const desks = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.ADD_DESK:
            return {
                ...state,
                desks: [...state.desks, payload]
            }

        case actionType.SET_DESK:
            return {
                ...state,
                desks: payload
            }

        case actionType.REMOVE_DESK:
            return {
                ...state,
                desks: state.desks.filter(desk => desk.id !== payload)
            }
        case actionType.EDIT_DESK:
            const { id, name } = payload;
            return {
                ...state,
                desks: state.desks.map(desk => desk.id === id ? { ...desk, name } : desk)
            }

        default:
            return state
    };
};

export default desks;