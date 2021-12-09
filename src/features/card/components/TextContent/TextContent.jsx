import React from 'react';
import { Div } from '@vkontakte/vkui';
import { marked } from 'marked';

import './TextContent.css';

const TextContent = ({ text }) => {

    const content = text?.replace(/\\n/g, '\n');

    if (!text) {
        return null;
    };

    return (
        <Div className='TextContent'>
            <span dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </Div>
    );
};

export default React.memo(TextContent);