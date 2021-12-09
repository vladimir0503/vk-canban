import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'react-router5';
import { pages } from '../../../router';
import { Card, Div } from '@vkontakte/vkui';
import { Icon16Cancel } from '@vkontakte/icons';
import { api } from '../../../api/api';

import '../../../features/cards/components/Cards.css';

const ColumnCard = ({ children, id, removeCard }) => {
    const router = useRouter();

    const deleteCard = async e => {
        e.stopPropagation();
        await api.deleteData('cards', id);
        removeCard(id);
    };

    const goToCardPage = React.useCallback(() => router.navigate(pages.CARD, { cardId: id }), [router, id]);

    return (
        <Card onClick={goToCardPage} mode='shadow'>
            <Div className='ColumnCard__wrapper'>
                {children}
                <Icon16Cancel onClick={deleteCard} />
            </Div>
        </Card>
    );
};

ColumnCard.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired
};

export default React.memo(ColumnCard);