import React from 'react';
import { View, Panel } from '@vkontakte/vkui';
import { useRoute } from 'react-router5';
import { useSelector, useDispatch } from 'react-redux';
import { pages } from '../../router';
import { changeRoute } from '../actions';
import { getActivePanel, getPopout } from '../selectors';

import Desks from '../../features/desks/panels/Desks';
import Columns from '../../features/columns/panels/Columns';
import Card from '../../features/card/panels/Card';

import '@vkontakte/vkui/dist/vkui.css';
import '../../features/columns/components/Columns.css';

const App = () => {
	const activePanel = useSelector(getActivePanel);
	const popout = useSelector(getPopout);
	const dispatch = useDispatch();
	const { router, route } = useRoute();

	React.useEffect(() => {
		router.subscribe((...args) => dispatch(changeRoute(...args)));

		dispatch(changeRoute({ route }));
	}, [dispatch]);

	if (!activePanel) {
		return null
	};

	return (
		<View
			popout={popout}
			activePanel={activePanel}
		>
			<Panel id={pages.DESKS}>
				<Desks />
			</Panel>
			<Panel id={pages.COLUMNS} className='Columns'>
				<Columns />
			</Panel>
			<Panel id={pages.CARD}>
				<Card />
			</Panel>
		</View>
	);
};

export default React.memo(App);
