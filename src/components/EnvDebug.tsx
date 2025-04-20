import React from 'react';

const EnvDebug = () => {
  return (
    <div className="p-4 bg-card rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
      <div className="space-y-1 text-sm">
        <p><strong>NODE_ENV:</strong> {import.meta.env.MODE}</p>
        <p><strong>API_URL:</strong> {import.meta.env.VITE_API_URL}</p>
        <p><strong>REGION:</strong> {import.meta.env.VITE_REGION}</p>
        <p><strong>Using Mock API:</strong> {import.meta.env.MODE === 'development' ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default EnvDebug; 