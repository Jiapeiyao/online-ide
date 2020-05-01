import React from 'react';
import { GlobalContext } from '../Root';

interface WebpackResult {
    code: number;
    message?: string | string[];
    hash?: string;
    script?: string;
}

export default function Menu() {
    const [context, dispatch] = React.useContext(GlobalContext);
    const [node, setNode] = React.useState(null as unknown as HTMLElement);

    const run = async () => {
        await fetch('/run', {
            body: JSON.stringify({
                tsx: context.tsx,
            }),
            headers: { 'content-type': 'application/json' },
            method: 'POST',
        }).then(response => response.json()).then(
            ({ code, hash, message, script }: WebpackResult) => {
                if (code === 200) {
                    dispatch({
                        type: 'hash',
                        hash: hash || ''
                    });
                    const newNode = document.createElement('SCRIPT');
                    if (script) {
                        newNode.innerHTML = script || '';
                        document.body.appendChild(newNode);
                        setNode(newNode);
                    }
                } else {
                    console.log(message);
                }
            }
        );
    };

    React.useEffect(() => {
        return () => {
            if (node !== null) {
                document.body.removeChild(node);
            }
        }
    }, [node]);

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