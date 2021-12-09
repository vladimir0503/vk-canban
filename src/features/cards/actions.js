import * as actionType from "./types";
import { api } from '../../api/api';

export const addCard = card => ({ type: actionType.ADD_CARD, payload: card });
export const removeCard = id => ({ type: actionType.REMOVE_CARD, payload: id });
export const setCards = cards => ({ type: actionType.SET_CARDS, payload: cards });

export const fetchCards = columnId => async dispatch => {
    try {
        dispatch({ type: actionType.FETCH_CARDS_START });
        const cards = await api.getDataOnParameters('cards', 'columnId', columnId);
        dispatch({ type: actionType.FETCH_CARDS_SUCCESS });
        dispatch(setCards(cards));
    } catch (error) {
        dispatch({ type: actionType.FETCH_CARDS_FAIL });
    };
};

export const createCard = card => async dispatch => {
    try {
        dispatch({ type: actionType.CREATE_CARDS_START });
        const newCard = await api.addData('cards', card);
        dispatch({ type: actionType.CREATE_CARDS_SUCCESS });
        dispatch(addCard(newCard));
    } catch (error) {
        dispatch({ type: CREATE_CARDS_FAIL });
    };
};

export const deleteCard = id => async dispatch => {
    try {
        dispatch({ type: 'deleteCardStart' });
        await api.deleteData('cards', id);
        dispatch({ type: 'deleteCardSuccess' });
        dispatch(removeCard(id));
    } catch (error) {
        dispatch({ type: 'deleteCardFail' });
    };
};