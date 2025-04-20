import React from 'react';

const EnvDebug = () => {
  return (
    <div className="p-4 bg-card rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
      <div className="space-y-1 text-sm">
        <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
        <p><strong>REACT_APP_API_URL:</strong> {process.env.REACT_APP_API_URL}</p>
        <p><strong>REACT_APP_REGION:</strong> {process.env.REACT_APP_REGION}</p>
        <p><strong>Using Mock API:</strong> {process.env.NODE_ENV === 'development' ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default EnvDebug; 