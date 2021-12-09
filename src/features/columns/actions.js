import * as actionType from "./types";
import { api } from '../../api/api';
import { fetchDesks } from '../desks/actions';

export const addColumn = column => ({ type: actionType.ADD_COLUMN, payload: column });
export const removeColumn = id => ({ type: actionType.REMOVE_COLUMN, payload: id });
export const setColumns = columns => ({ type: actionType.SET_COLUMNS, payload: columns });
export const replaceColumn = (id, name) => ({ type: actionType.EDIT_COLUMN, payload: { id, name } });

export const fetchColumns = deskId => async (dispatch, getState) => {
    const desks = getState().desks.desks;
    const desk = desks?.find(({ id }) => id === deskId) || {};

    // Возможно зацикливание при несуществующем deskId
    if (!desk.id) {
        await dispatch(fetchDesks());
        dispatch(fetchColumns(deskId));
    };

    try {
        dispatch({ type: 'fetchColumnsStart' });
        const columns = await api.getDataOnParameters('columns', 'deskId', desk.id);
        dispatch({ type: 'fetchColumnsSuccess' });
        dispatch(setColumns(columns));
    } catch (error) {
        dispatch({ type: 'fetchColumnsFail' });
    };
};

export const createColumn = column => async dispatch => {
    try {
        dispatch({ type: 'createColumnStart' });
        const newColumn = await api.addData('columns', column);
        dispatch({ type: 'createColumnSuccess' });
        dispatch(addColumn(newColumn));
    } catch (error) {
        dispatch({ type: 'createColumnFail' });
    };
};

export const deleteColumn = id => async dispatch => {
    try {
        dispatch({ type: 'deleteColumnStart' });
        await api.deleteData('columns', id);
        dispatch({ type: 'deleteColumnSuccess' });
        dispatch(removeColumn(id));
    } catch (error) {
        dispatch({ type: 'deleteColumnFail' });
    };
};

export const editColumn = (columnId, value) => async dispatch => {
    try {
        dispatch({ type: 'editColumnStart' });
        await api.editData('columns', columnId, 'name', value);
        dispatch({ type: 'editColumnSuccess' });
        dispatch(replaceColumn(columnId, value));
    } catch (error) {
        console.log(error);
        dispatch({ type: 'editColumnFail' });
    };
};