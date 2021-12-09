import React from 'react';
import { PanelHeader, Div } from '@vkontakte/vkui';
import DeskList from '../components/DeskList';
import { createDesk } from '../actions';
import AddingDataForm from '../../../components/common/AddingDataForm/AddingDataForm'

const Desks = () => {

    return (
        <>
            <PanelHeader>Мои доски</PanelHeader>
            <Div>
                <AddingDataForm
                    addItem={createDesk}
                    propName='-/-'
                    placeholder='Введите название доски'
                    actionTitle='Создать доску'
                    parentId={''}
                />

            </Div>
            <DeskList />
        </>
    );
};

export default React.memo(Desks);