import React from 'react'
import { CardGrid } from '@vkontakte/vkui';
import { useSelector, useDispatch } from 'react-redux';
import DeskItem from './DeskItem';
import { fetchDesks } from '../actions';
import { getDesks } from '../selectors';

const DeskList = () => {
    const desks = useSelector(getDesks);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchDesks());
    }, [dispatch]);

    return (
        <>
            {
                !!desks.length
                && <CardGrid size='l'>
                    {desks.sort().map(({ id, name }, i) =>
                        <DeskItem key={`${name}/${i}`} id={id}>
                            {name}
                        </DeskItem>)}
                </CardGrid>
            }
        </>
    );
};

export default React.memo(DeskList);