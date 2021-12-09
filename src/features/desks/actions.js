import * as actionType from './types';
import { api } from "../../api/api";

export const addDesk = desk => ({ type: actionType.ADD_DESK, payload: desk });
export const removeDesk = id => ({ type: actionType.REMOVE_DESK, payload: id });
export const setDesk = desks => ({ type: actionType.SET_DESK, payload: desks });
export const replaceDesk = (id, name) => ({ type: actionType.EDIT_DESK, payload: { id, name } });

export const fetchDesks = () => async dispatch => {
    try {
        dispatch({ type: 'fetchDesksStart' })
        const desks = await api.getData('desks');
        dispatch({ type: 'fetchDesksSuccess' })
        dispatch(setDesk(desks));
    } catch (error) {
        dispatch({ type: 'fetchDesksFail' })
    };
};

export const deleteDesk = id => async dispatch => {
    try {
        dispatch({ type: 'deleteDeskStart' });
        await api.deleteData('desks', id);
        dispatch({ type: 'deleteDeskSuccess' });
        dispatch(removeDesk(id));
    } catch (error) {
        dispatch({ type: 'deleteDeskFail' });
    };
};

export const createDesk = desk => async dispatch => {
    try {
        dispatch({ type: 'createDeskStart' });
        const newDesk = await api.addData('desks', desk);
        dispatch({ type: 'createDeskSuccess' });
        dispatch(addDesk(newDesk));
    } catch (error) {
        dispatch({ type: 'createDeskFail' });
    };
};

export const editDesk = (deskId, value) => async dispatch => {
    try {
        dispatch({ type: 'editDeskStart' });
        await api.editData('desks', deskId, 'name', value);
        dispatch({ type: 'editDeskSuccess' });
        dispatch(replaceDesk(deskId, value));
    } catch (error) {
        console.log(error);
        dispatch({ type: 'editDeskFail' });
    };
};