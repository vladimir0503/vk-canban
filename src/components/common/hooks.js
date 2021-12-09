import React from 'react';
import { modes, errors } from '../constants';
import { useDispatch } from 'react-redux';
import { api } from '../../api/api';

export const useCreateForm = (addItem, parentId, propName, isLocalState, initialValue) => {
    const [mode, setMode] = React.useState(modes.button);
    const [name, setName] = React.useState(initialValue || '');
    const [error, setError] = React.useState(false);
    const [errData, setErrData] = React.useState(errors.emptyField);

    const onChangeInput = e => setName(e.target.value);
    const onChangeMode = mode => setMode(mode);

    const dispatch = useDispatch();

    const reset = () => {
        setName('');
        setMode(modes.button);
        setError(false);
        setErrData(errors.emptyField);
    };

    const handleSubmit = React.useCallback(async e => {
        if (e) {
            e.preventDefault();
        }

        if (!name.trim().length) {
            setError(true);
            setErrData(errors.emptyField);
            return;
        };

        try {
            const item = { [propName]: parentId, name };
            if (isLocalState) {
                const newItem = await api.addData('cards', item);
                addItem(newItem);
            } else {
                dispatch(addItem(item));
            };
            reset();
        } catch (error) {
            console.error(error);
            setErrData(errors.networkError);
            setError(true);
        };
    }, [dispatch, name, errors]);

    const handleEditSubmit = React.useCallback(async e => {
        e.preventDefault();
        try {
            if (!name.trim().length) {
                setError(true);
                setErrData(errors.emptyField);
                return;
            };
            await dispatch(addItem(parentId, name));
            reset();
        } catch (error) {
            console.log(error);
            setError(true);
            setErrData(errors.networkError);
        }
    }, [dispatch, name, errors]);

    return {
        mode,
        name,
        error,
        errData,
        onChangeMode,
        onChangeInput,
        reset,
        handleSubmit,
        handleEditSubmit
    };
};