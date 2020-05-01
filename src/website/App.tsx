import React from 'react';
import Menu from './items/Menu';
import Editor from './items/Editor';
import Preview from './items/Preview';
import Root, { GlobalContext } from './items/Root';
import SplitPane from 'react-split-pane';

export default function App() {
    const [width, setWidth] = React.useState('100%' as number | string);
    const [height, setHeight] = React.useState('100%' as number | string);

    React.useEffect(() => {
        window.addEventListener('resize', (_: UIEvent) => {
            setHeight(window.screen.height - 40);
        });
    }, []);

    return (
        <React.Fragment>
            <Root>
                <Menu />
                <div id='ol-ide-main'>
                    <SplitPane split='vertical' size={window.screen.width * 0.5} onChange={setWidth}>
                        <Editor width={width} height={height}/>
                        <Preview />
                    </SplitPane>
                </div>
            </Root>
        </React.Fragment>
    );
}