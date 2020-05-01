import React from 'react';

interface ContextState {
    tsx: string;
    hash: string;
}

type Action = Partial<ContextState> & {
    type: string;
};

type Dispatch = React.Dispatch<Action>;

const contextReducer: React.Reducer<ContextState, Action> = (preState: ContextState, action: Action) => {
    switch (action.type) {
        case 'tsx': {
            return { ...preState, tsx: action.tsx || '' };
        }
        default: {
            return preState;
        }
    }
}

const defaultState: ContextState = {
    tsx: [
        "import React from 'react';",
        "import { Button } from 'antd';",
        "",
        "export default function App() {",
        "    return <Button>Hello World</Button>;",
        "}"
    ].join('\n'),
    hash: '',
}

const defaultContext: [ContextState, Dispatch] = [defaultState, (_: Action) => {}];

const GlobalContext = React.createContext(defaultContext);

export default function Root({ children }: { children: React.ReactNode }) {
    const [context, dispatch] = React.useReducer(contextReducer, defaultState);

    return (
        <GlobalContext.Provider value={[context, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}

export {
    GlobalContext
};