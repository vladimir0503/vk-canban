import * as actionType from "./types";

const initialState = {
    cards: []
};

const cards = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, payload]
            }

        case actionType.SET_CARDS:
            return {
                ...state,
                cards: payload
            }

        case actionType.REMOVE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== payload)
            }

        default:
            return state
    };
};

export default cards;