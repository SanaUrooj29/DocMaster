import React, { useState } from 'react';
import { 
  Undo2, 
  Redo2, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Share2,
  Save,
  Check,
  Copy
} from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';

const ToolbarButton = ({ icon: Icon, onClick, disabled, label, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed
      ${active ? 'bg-gray-100 text-blue-600' : ''}`}
    title={label}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-600'}`} />
  </button>
);

const ShareModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 className="text-lg font-semibold mb-4">Share Document</h3>
      <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
        <input
          type="text"
          value="https://docs.example.com/share/abc123"
          readOnly
          className="flex-1 bg-transparent border-none focus:outline-none text-sm"
        />
        <button className="p-2 hover:bg-gray-200 rounded" title="Copy link">
          <Copy className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Done
      </button>
    </div>
  </div>
);

const EditorToolbar = () => {
  const { state, dispatch } = useDocument();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleSave = () => {
    dispatch({ type: 'SAVE_DOCUMENT' });
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const toggleFormat = (format) => {
    dispatch({ type: 'TOGGLE_FORMAT', payload: format });
  };

  return (
    <div className="bg-white border-b relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ToolbarButton
              icon={Undo2}
              onClick={() => dispatch({ type: 'UNDO' })}
              disabled={state.currentIndex === 0}
              label="Undo"
            />
            <ToolbarButton
              icon={Redo2}
              onClick={() => dispatch({ type: 'REDO' })}
              disabled={state.currentIndex === state.history.length - 1}
              label="Redo"
            />
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton
              icon={Bold}
              onClick={() => toggleFormat('bold')}
              active={state.formatting.bold}
              label="Bold"
            />
            <ToolbarButton
              icon={Italic}
              onClick={() => toggleFormat('italic')}
              active={state.formatting.italic}
              label="Italic"
            />
            <ToolbarButton
              icon={Underline}
              onClick={() => toggleFormat('underline')}
              active={state.formatting.underline}
              label="Underline"
            />
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton
              icon={List}
              onClick={() => toggleFormat('list')}
              active={state.formatting.list}
              label="Bullet List"
            />
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton
              icon={Save}
              onClick={handleSave}
              label="Save"
            />
          </div>
          
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {showSaveConfirmation && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Document saved!</span>
        </div>
      )}

      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
    </div>
  );
};

export default EditorToolbar;