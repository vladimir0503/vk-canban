import * as actionType from "./types";

const initialState = {
    activePanel: null,
    popout: null
};

const app = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_ACTIVE_PANEL:
            return {
                ...state,
                activePanel: payload
            }

        case actionType.SET_POPOUT:
            return {
                ...state,
                popout: payload
            }

        default:
            return state
    };
};

export default app;