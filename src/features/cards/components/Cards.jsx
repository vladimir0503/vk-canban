import React from 'react';
import { CardGrid } from '@vkontakte/vkui';
import ColumnCard from '../../../features/columns/components/ColumnCard';
import AddingDataForm from '../../../components/common/AddingDataForm/AddingDataForm';
import { api } from '../../../api/api';

import './Cards.css';

const Cards = ({ columnId }) => {
    const [cards, setCards] = React.useState([]);

    const createCard = React.useCallback(card => setCards([...cards, card]), [cards]);

    const deleteCard = React.useCallback(id => {
        const filterCards = cards.filter(card => card.id !== id);
        setCards(filterCards);
    }, [cards]);

    React.useEffect(async () => {
        const cards = await api.getDataOnParameters('cards', 'columnId', columnId);
        setCards(cards);
    }, []);

    return (
        <>
            <CardGrid size='l'>
                {cards.map(({ name, id }) =>
                    <ColumnCard
                        key={id}
                        id={id}
                        removeCard={deleteCard}
                    >
                        {name}
                    </ColumnCard>)}
            </CardGrid>
            <div className='Cards__createButton'>
                <AddingDataForm
                    addItem={createCard}
                    propName='columnId'
                    collName='cards'
                    parentId={columnId}
                    placeholder='Введите название карточки'
                    actionTitle='Создать карточку'
                    isLocalState={true}
                />
            </div>
        </>
    );
};

export default React.memo(Cards);