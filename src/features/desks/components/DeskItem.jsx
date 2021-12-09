import React from 'react';
import { useRouter } from 'react-router5';
import { Card, Div, Button, ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { pages } from '../../../router';
import { useDispatch } from 'react-redux';
import { deleteDesk, editDesk } from '../actions';
import { setPopout } from '../../../app/actions';
import { Icon16MoreHorizontal } from '@vkontakte/icons';
import EditFrom from '../../../components/common/EdditForm/EditFrom';

import './DeskItem.css';

const DeskItem = ({ id, children }) => {
    const [changeMode, setMode] = React.useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const baseTopTargetRef = React.useRef();

    const showColumns = React.useCallback(() => router.navigate(pages.COLUMNS, { deskId: id }), [router, id]);

    const deleteItem = React.useCallback(e => {
        e.stopPropagation();
        dispatch(deleteDesk(id));
    }, [dispatch, id]);

    const handleChangeMode = React.useCallback(() => setMode(!changeMode), [changeMode]);

    const showDeskOptions = React.useCallback(e => {
        e.stopPropagation();
        dispatch(setPopout(
            <ActionSheet
                onClose={() => dispatch(setPopout(null))}
                iosCloseItem={<ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
                toggleRef={baseTopTargetRef}
                popupDirection="top"
            >
                <ActionSheetItem
                    onClick={handleChangeMode}
                    autoclose
                >
                    Редактировать
                </ActionSheetItem>
                <ActionSheetItem
                    onClick={deleteItem}
                    mode='destructive'
                    autoclose
                >
                    Удалить доску
                </ActionSheetItem>
            </ActionSheet>
        ))
    }, [dispatch, deleteItem]);

    return (
        <>
            {
                changeMode
                    ? <EditFrom
                        placeholder='Введите название доски'
                        parentId={id}
                        initialValue={children}
                        changeMode={handleChangeMode}
                        addItem={editDesk}
                    />
                    : <Card onClick={showColumns}>
                        <Div className='DeskItem__content'>
                            {children}
                            <Button
                                style={{ border: 'none' }}
                                onClick={showDeskOptions}
                                mode='outline'
                                getRootRef={baseTopTargetRef}
                            >
                                <Icon16MoreHorizontal />
                            </Button>
                        </Div>
                    </Card>
            }
        </>
    );
};

export default React.memo(DeskItem);