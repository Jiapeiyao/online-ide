import React from 'react';

interface ContextState {
    value: string;
}

type Action = Partial<ContextState> & {
    type: string;
};

type Dispatch = React.Dispatch<Action>;

const contextReducer: React.Reducer<ContextState, Action> = (preState: ContextState, action: Action) => {
    switch (action.type) {
        case 'value': {
            return { ...preState, value: action.value || '' };
        }
        default: {
            return preState;
        }
    }
}

const defaultState: ContextState = {
    value: '',
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