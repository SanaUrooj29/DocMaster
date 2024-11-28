import React from 'react';
import { DocumentProvider } from './context/DocumentContext';
import EditorToolbar from './components/Toolbar/EditorToolbar';
import TextEditor from './components/Editor/TextEditor';
import CollaboratorList from './components/Sidebar/CollaboratorList';

function App() {
  return (
    <DocumentProvider>
      <div className="min-h-screen flex flex-col">
        <EditorToolbar />
        <div className="flex flex-1 overflow-hidden">
          <TextEditor />
          <CollaboratorList />
        </div>
      </div>
    </DocumentProvider>
  );
}

export default App;