import * as actionType from "./types";

const initialState = {
    columns: []
};

const columns = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.ADD_COLUMN:
            return {
                ...state,
                columns: [...state.columns, payload]
            }

        case actionType.SET_COLUMNS:
            return {
                ...state,
                columns: payload
            }

        case actionType.REMOVE_COLUMN:
            return {
                ...state,
                columns: state.columns.filter(column => column.id !== payload)
            }

        case actionType.EDIT_COLUMN:
            const { id, name } = payload;
            return {
                ...state,
                columns: state.columns.map(column => column.id === id ? { ...column, name } : column)
            }

        default:
            return state
    };
};

export default columns;