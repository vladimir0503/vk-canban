import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, FormStatus, FormItem } from '@vkontakte/vkui';
import { Icon24Add } from '@vkontakte/icons';
import { Icon24Dismiss } from '@vkontakte/icons';
import { modes } from '../../constants';
import { useCreateForm } from '../../common/hooks';

import './AddingDataForm.css';

const CreateForm = ({ addItem, placeholder, actionTitle, parentId, propName, btnMode = 'outline', isLocalState = false }) => {

    const {
        mode,
        onChangeMode,
        name,
        onChangeInput,
        error,
        errData,
        reset,
        handleSubmit
    } = useCreateForm(addItem, parentId, propName, isLocalState);

    const handleChangeMode = React.useCallback(() => onChangeMode(modes.form), [modes.form]);

    return (
        <>
            {mode === 'button'
                ? <Button
                    onClick={handleChangeMode}
                    stretched
                    before={<Icon24Add />}
                    size='m'
                    mode={btnMode}
                >
                    {actionTitle}
                </Button>
                : <Card size='l' mode='outline'>
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
                                value={name}
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
            }
        </>
    )
};

CreateForm.propTypes = {
    placeholder: PropTypes.string.isRequired,
    actionTitle: PropTypes.string.isRequired
};

export default React.memo(CreateForm);
