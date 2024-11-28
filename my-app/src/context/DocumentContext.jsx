import React, { createContext, useContext, useReducer, useMemo } from 'react';

const DocumentContext = createContext();

const initialState = {
  content: '',
  history: [''],
  currentIndex: 0,
  typingUser: null,
  collaborators: [
    { id: 1, name: 'John Doe', active: true },
    { id: 2, name: 'Jane Smith', active: true },
    { id: 3, name: 'Mike Johnson', active: false }
  ],
  formatting: {
    bold: false,
    italic: false,
    underline: false,
    list: false
  },
  savedContent: null,
  lastSaved: null
};

function documentReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_CONTENT': {
      const newHistory = state.history.slice(0, state.currentIndex + 1);
      newHistory.push(action.payload);
      return {
        ...state,
        content: action.payload,
        history: newHistory,
        currentIndex: newHistory.length - 1
      };
    }
    case 'UNDO':
      if (state.currentIndex > 0) {
        return {
          ...state,
          content: state.history[state.currentIndex - 1],
          currentIndex: state.currentIndex - 1
        };
      }
      return state;

    case 'REDO':
      if (state.currentIndex < state.history.length - 1) {
        return {
          ...state,
          content: state.history[state.currentIndex + 1],
          currentIndex: state.currentIndex + 1
        };
      }
      return state;

    case 'SET_TYPING_USER':
      return {
        ...state,
        typingUser: action.payload
      };

    case 'TOGGLE_FORMAT':
      return {
        ...state,
        formatting: {
          ...state.formatting,
          [action.payload]: !state.formatting[action.payload]
        }
      };

    case 'SAVE_DOCUMENT':
      return {
        ...state,
        savedContent: state.content,
        lastSaved: new Date().toISOString()
      };

    default:
      return state;
  }
}

export function DocumentProvider({ children }) {
  const [state, dispatch] = useReducer(documentReducer, initialState);

  const value = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}