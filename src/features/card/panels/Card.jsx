import React from 'react';
import { useRoute } from 'react-router5';
import { useSelector, useDispatch } from 'react-redux';
import { PanelHeader, PanelSpinner, PanelHeaderBack } from '@vkontakte/vkui';
import { getName } from '../selectors';
import { fetchCard, removeCard } from '../actions';
import { goBack } from '../../../app/actions';

import CardContent from '../components/CardContent/CardContent';

const Card = () => {
    const [isLoading, setLoader] = React.useState(true);
    const { route: { params: { cardId } } } = useRoute();
    const name = useSelector(getName);

    const dispatch = useDispatch();

    React.useEffect(async () => {
        if (cardId) {
            try {
                setLoader(true);
                await dispatch(fetchCard(cardId));
            } finally {
                setLoader(false);
            }
        };
    }, []);

    React.useEffect(() => {
        return () => dispatch(removeCard());
    }, []);

    return (
        <>
            <PanelHeader
                left={<PanelHeaderBack onClick={goBack} />}
            >
                Карточка "{name ? name : ''}"
            </PanelHeader>
            {isLoading ? <PanelSpinner /> : <CardContent />}
        </>
    );
};

export default React.memo(Card);