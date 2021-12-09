import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'react-router5';
import { pages } from '../../../router';
import { Card, Div } from '@vkontakte/vkui';

import '../../../features/cards/components/Cards.css';

const ColumnCard = ({ children, id }) => {
    const router = useRouter();

    const goToCardPage = React.useCallback(() => router.navigate(pages.CARD, { cardId: id }), [router, id]);

    return (
        <Card onClick={goToCardPage} mode='shadow'>
            <Div className='ColumnCard__wrapper'>
                {children}
            </Div>
        </Card>
    );
};

ColumnCard.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired
};

export default React.memo(ColumnCard);