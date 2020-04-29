import React from 'react';
import MonacoEditor, { ChangeHandler, EditorDidMount } from 'react-monaco-editor';
import { GlobalContext } from '../Root'; 

interface EditorProps {
    width: number | string;
}

export default function Editor({ width }: EditorProps) {

    const [context, dispatch] = React.useContext(GlobalContext);
    const onChange: ChangeHandler = (newValue, event) => {
        dispatch({
            type: 'value',
            value: newValue,
        });
    }

    const editorDidMount: EditorDidMount = (editor, monaco) => {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.React,
        });

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
            noSuggestionDiagnostics: true,
        });
    }

    return  (
        <MonacoEditor
            width={width}
            height='100%'
            value={context.value}
            language='typescript'
            theme='vs-dark'
            editorDidMount={editorDidMount}
            onChange={onChange}
        />
    );
}