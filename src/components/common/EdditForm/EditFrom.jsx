import React from 'react';
import { Button, Card, FormStatus, FormItem } from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';
import { useCreateForm } from '../../common/hooks';

import './EditForm.css';

const EditFrom = ({ addItem, parentId, initialValue, placeholder, changeMode, propName = '', isLocalState = false }) => {

    const {
        name,
        error,
        errData,
        onChangeInput,
        reset,
        handleEditSubmit
    } = useCreateForm(addItem, parentId, propName, isLocalState, initialValue);

    const cancel = () => {
        reset();
        changeMode();
    };

    return (

        <Card size='l' mode='outline'>
            <form onSubmit={handleEditSubmit}>
                {error
                    && <FormItem>
                        <FormStatus header={errData.header} mode="error">
                            {errData.message}
                        </FormStatus>
                    </FormItem>
                }
                <div className='EditForm__inputWrapper'>
                    <input
                        className='EditForm__input'
                        placeholder={placeholder}
                        onChange={onChangeInput}
                        autoFocus
                        value={name}
                    />
                </div>
                <div className='EditForm__buttons'>
                    <Button mode='commerce' stretched={true}>Изменить</Button>
                    <Button mode="tertiary" onClick={cancel}>
                        <Icon24Dismiss />
                    </Button>
                </div>
            </form>
        </Card>
    )
};

export default React.memo(EditFrom);