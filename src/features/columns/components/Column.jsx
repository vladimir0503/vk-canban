import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Div, Card, Header, Button, ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { Icon16MoreHorizontal } from '@vkontakte/icons';
import { deleteColumn, editColumn } from '../actions';
import { setPopout } from '../../../app/actions';
import EditForm from '../../../components/common/EdditForm/EditFrom';

import Cards from '../../../features/cards/components/Cards';

import './Column.css';

const Column = ({ name, id }) => {
    const [changeMode, setMode] = React.useState(false);
    const dispatch = useDispatch();
    const baseTopTargetRef = React.useRef();

    const removeColumn = React.useCallback(() => dispatch(deleteColumn(id)), [dispatch, id]);

    const handleChangeMode = React.useCallback(() => setMode(!changeMode), [changeMode]);

    const editItem = React.useCallback(() => {
        const newName = prompt('Ведите название колонки', name);
        if (typeof newName !== 'string' || !newName.trim().length) {
            return;
        };
        dispatch(editColumn(id, newName));
    }, [dispatch, id, name]);

    const showColumnOptions = React.useCallback(() => dispatch(setPopout(
        <ActionSheet
            onClose={() => dispatch(setPopout(null))}
            iosCloseItem={<ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            toggleRef={baseTopTargetRef}
            popupDirection="top"
        >
            <ActionSheetItem
                onClick={editItem}
                autoclose
            >
                Редактировать
            </ActionSheetItem>
            <ActionSheetItem
                onClick={removeColumn}
                mode='destructive'
                autoclose
            >
                Удалить колонку
            </ActionSheetItem>
        </ActionSheet>
    )), [dispatch, removeColumn]);

    return (
        <>
            <Div className='Column'>
                {
                    changeMode
                        ? <EditForm
                            placeholder='Введите название колонки'
                            parentId={id}
                            initialValue={name}
                            changeMode={handleChangeMode}
                            addItem={() => null}
                        />
                        : <div className='Column__header'>
                            <Header className='Column__title'>{name}</Header>
                            <Button
                                style={{ border: 'none' }}
                                onClick={showColumnOptions}
                                mode='overlay_outline'
                                getRootRef={baseTopTargetRef}
                            >
                                <Icon16MoreHorizontal />
                            </Button>
                        </div>
                }
                <Card className='Column__wrapper'>
                    <Cards columnId={id} />
                </Card>
            </Div>
        </>
    );
};

Column.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default React.memo(Column);
