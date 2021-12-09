import React from 'react';
import { PanelHeader, Div, PanelHeaderBack } from '@vkontakte/vkui';
import { useRoute } from 'react-router5';
import { useSelector, useDispatch } from 'react-redux';
import Column from '../components/Column';
import AddingDataForm from '../../../components/common/AddingDataForm/AddingDataForm';
import { setColumns, fetchColumns, createColumn } from '../actions';
import { getColumns } from '../selectors';
import { getDesks } from '../../../features/desks/selectors';
import { goBack } from '../../../app/actions';

import '../components/Columns.css';

const Columns = () => {
    const desks = useSelector(getDesks);
    const columns = useSelector(getColumns);
    const dispatch = useDispatch();
    const { route: { params: { deskId } } } = useRoute();
    const desk = React.useMemo(() => desks?.find(({ id }) => id === deskId) || {}, [desks, deskId]);

    React.useEffect(() => {
        dispatch(fetchColumns(deskId));
    }, [dispatch]);

    React.useEffect(() => {
        return () => dispatch(setColumns([]));
    }, []);

    return (
        <>
            <PanelHeader
                left={<PanelHeaderBack onClick={goBack} />}
            >
                Доска "{desk?.name}"
            </PanelHeader>
            <Div>
                <AddingDataForm
                    addItem={createColumn}
                    propName='deskId'
                    placeholder='Введите название колонки'
                    actionTitle='Создать колонку'
                    parentId={desk.id}
                />
            </Div>
            <div className='Columns__list' >
                {columns.map(({ id, name }) =>
                    <Column
                        key={id}
                        name={name}
                        id={id}
                    />)}
            </div>
        </>
    );
};

export default React.memo(Columns);