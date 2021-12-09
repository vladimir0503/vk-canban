import React from "react";
import ReactDOM from "react-dom";
import * as router from './router';
import { getStore } from "./app/store";
import VKBridge from "@vkontakte/vk-bridge";

import AppContainer from './app/components/AppContainer';

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
    });
}

VKBridge.send('VKWebAppInit');

const store = getStore();
const route = router.initialize();

ReactDOM.render(
    <AppContainer router={route} store={store} />,
    document.getElementById("root")
);