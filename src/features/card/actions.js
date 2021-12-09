import * as actionTypes from './types';
import { api } from '../../api/api';

export const setCard = card => ({ type: actionTypes.SET_CARD, payload: card });
export const replaceCard = text => ({ type: actionTypes.EDIT_CARD, payload: { text } });
export const removeCard = () => ({ type: actionTypes.REMOVE_CARD });

export const fetchCard = cardId => async dispatch => {
    try {
        dispatch({ type: actionTypes.FETCH_CARD_START });
        const card = await api.getDocData('cards', cardId);
        dispatch({ type: actionTypes.FETCH_CARD_SUCCESS });
        dispatch(setCard(card));
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_CARD_FAIL });
    };
};

export const editCard = (cardId, data) => async dispatch => {
    try {
        dispatch({ type: 'editCardStart' });
        await api.editData('cards', cardId, 'text', data);
        dispatch({ type: 'editCardSuccess' });
        dispatch(replaceCard(data));
    } catch (error) {
        console.log(error);
        dispatch({ type: 'editCardFail' });
    };
};

export const deleteCard = id => async dispatch => {
    try {
        dispatch({ type: 'deleteCardStart' });
        await api.deleteData('cards', id);
        dispatch({ type: 'deleteCardSuccess' });
        dispatch(removeCard());
    } catch (error) {
        console.log(error);
        dispatch({ type: 'deleteCardFail' });
    };
};