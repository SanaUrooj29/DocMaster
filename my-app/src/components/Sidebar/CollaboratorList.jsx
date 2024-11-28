import React from 'react';
import { useDocument } from '../../context/DocumentContext';

const CollaboratorList = () => {
  const { state } = useDocument();

  return (
    <div className="w-64 border-l bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Collaborators</h2>
      </div>
      <div className="p-4">
        {state.collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="flex items-center space-x-3 mb-3"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {collaborator.name[0]}
                </span>
              </div>
              {collaborator.active && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{collaborator.name}</p>
              <p className="text-xs text-gray-500">
                {collaborator.active ? 'Active now' : 'Inactive'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorList;