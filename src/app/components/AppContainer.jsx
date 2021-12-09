import React from 'react';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { RouterProvider } from 'react-router5';
import { Provider } from 'react-redux';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import App from './App';

const AppContainer = ({ router, store }) => {

    return (
        <RouterProvider router={router}>
            <Provider store={store}>
                <AdaptivityProvider>
                    <AppRoot>
                        <ErrorBoundary>
                            <App />
                        </ErrorBoundary>
                    </AppRoot>
                </AdaptivityProvider>
            </Provider>
        </RouterProvider>
    );
};

export default React.memo(AppContainer);
