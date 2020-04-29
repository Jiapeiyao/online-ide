import React from 'react';
import Menu from './items/Menu';
import Editor from './items/Editor';
import Preview from './items/Preview';
import Root, { GlobalContext } from './items/Root';
import SplitPane from 'react-split-pane';

export default function App() {

    const [width, setWidth] = React.useState('100%' as number | string);

    return (
        <React.Fragment>
            <Root>
                <Menu />
                <div id='ol-ide-main'>
                    <SplitPane split='vertical' defaultSize={'50%'} onChange={setWidth}>
                        <Editor width={width} />
                        <Preview />
                    </SplitPane>
                </div>
            </Root>
        </React.Fragment>
    );
}