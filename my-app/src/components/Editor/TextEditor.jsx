import React, { useCallback, useRef, useEffect } from 'react';
import { useDocument } from '../../context/DocumentContext';

const TextEditor = () => {
  const { state, dispatch } = useDocument();
  const editorRef = useRef(null);

  const handleChange = useCallback((e) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: e.target.value });
    dispatch({ type: 'SET_TYPING_USER', payload: 'John Doe' });
    
    setTimeout(() => {
      dispatch({ type: 'SET_TYPING_USER', payload: null });
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const { bold, italic, underline } = state.formatting;
      editor.style.fontWeight = bold ? 'bold' : 'normal';
      editor.style.fontStyle = italic ? 'italic' : 'normal';
      editor.style.textDecoration = underline ? 'underline' : 'none';
    }
  }, [state.formatting]);

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <textarea
          ref={editorRef}
          value={state.content}
          onChange={handleChange}
          className="w-full min-h-[calc(100vh-12rem)] p-8 text-gray-800 resize-none focus:outline-none"
          placeholder="Start typing your document..."
        />
      </div>
      {state.typingUser && (
        <div className="max-w-4xl mx-auto mt-2">
          <p className="text-sm text-gray-500 animate-pulse">
            {state.typingUser} is typing...
          </p>
        </div>
      )}
      {state.lastSaved && (
        <div className="max-w-4xl mx-auto mt-2">
          <p className="text-sm text-gray-500">
            Last saved: {new Date(state.lastSaved).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextEditor;