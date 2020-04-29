import React from 'react';
import { GlobalContext } from '../Root';

export default function Menu() {
    const [context, dispatch] = React.useContext(GlobalContext);

    const run = async () => {
        await fetch('/content', {
            body: JSON.stringify(context.value), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        }).then(response => console.log(response));
    };

    return <div id='ol-ide-menu'>
        <MenuButton text={'Run'} onClick={run} />
    </div>
}

interface MenuButtonProps {
    text: string;
    onClick: () => void;
}

function MenuButton({ text, onClick }: MenuButtonProps) {
    return <button className='ol-ide-menu-button' onClick={onClick}>{text}</button>
}