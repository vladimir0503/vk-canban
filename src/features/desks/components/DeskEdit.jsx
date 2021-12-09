import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Card, FormStatus, FormItem } from '@vkontakte/vkui';
import { errors } from '../../../components/constants';
import { Icon24Dismiss } from '@vkontakte/icons';

import './DeskItem.css';
import { editDesk } from '../actions';

const DeskEdit = ({ deskId, deskName, placeholder, actionTitle, changeMode }) => {
    const [value, setInput] = React.useState(deskName);
    const [error, setError] = React.useState(false);
    const [errData, setErrData] = React.useState(errors.emptyField);

    const dispatch = useDispatch();

    const onChangeInput = React.useCallback(e => setInput(e.target.value), [value]);

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault();
        try {
            if (!value.trim().length) {
                setError(true);
                setErrData(errors.emptyField);
                return;
            };
            await dispatch(editDesk(deskId, value));
            reset();
        } catch (error) {
            console.log(error);
            setError(true);
            setErrData(errors.networkError);
        }
    }, [dispatch, errors, deskId, value]);

    const reset = React.useCallback(() => {
        setInput('');
        setError(false);
        setErrData(errors.emptyField);
        changeMode();
    }, [errors]);

    return (

        <Card size='l' mode='outline'>
            <form onSubmit={handleSubmit}>
                {error
                    && <FormItem>
                        <FormStatus header={errData.header} mode="error">
                            {errData.message}
                        </FormStatus>
                    </FormItem>
                }
                <div className='AddingDataForm__inputWrapper'>
                    <input
                        className='AddingDataForm__input'
                        placeholder={placeholder}
                        onChange={onChangeInput}
                        autoFocus
                        value={value}
                    />
                </div>
                <div className='AddingDataForm__buttons'>
                    <Button mode='commerce' stretched={true}>{actionTitle}</Button>
                    <Button mode="tertiary" onClick={reset}>
                        <Icon24Dismiss />
                    </Button>
                </div>
            </form>
        </Card>
    )
};

DeskEdit.propTypes = {
    placeholder: PropTypes.string.isRequired,
    actionTitle: PropTypes.string.isRequired
};

export default React.memo(DeskEdit);
