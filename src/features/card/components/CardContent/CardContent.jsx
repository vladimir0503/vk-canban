import React from 'react';
import { useDispatch } from 'react-redux';
import { FixedLayout, Button, Div, Textarea } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import { getText, getId } from '../../selectors';
import TextContent from '../TextContent/TextContent';
import { editCard, deleteCard } from '../../actions';
import { goBack } from '../../../../app/actions';

import './CardContent.css';

const CardContent = () => {
    const text = useSelector(getText);
    const id = useSelector(getId);
    const [isEditableMode, setEditableMode] = React.useState(!text);
    const [value, setValue] = React.useState(text || '');
    const dispatch = useDispatch();

    const changeMode = React.useCallback(async () => {
        if (isEditableMode && value.trim().length) {
            await dispatch(editCard(id, value));
            setEditableMode(!isEditableMode);
        } else {
            setEditableMode(!isEditableMode);
        }
    }, [dispatch, isEditableMode, value]);

    const changeValue = React.useCallback(e => setValue(e.target.value), [value]);

    const deleteItem = React.useCallback(async () => {
        await dispatch(deleteCard(id));
        goBack();
    }, [dispatch, id]);

    return (
        <>
            {isEditableMode
                ? <Div>
                    <Textarea
                        value={value}
                        onChange={changeValue}
                    />
                </Div>
                : <TextContent text={text} />}
            <FixedLayout filled vertical='bottom'>
                <Div className='CardContent__buttons'>
                    <Button onClick={changeMode} mode='commerce' size='l'>{isEditableMode ? 'Сохранить' : 'Изменить'}</Button>
                    <Button onClick={deleteItem} mode='destructive' size='l'>Удалить</Button>
                </Div>
            </FixedLayout>
        </>
    );
};

export default React.memo(CardContent);