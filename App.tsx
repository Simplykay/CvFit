import React, { useState } from 'react';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import { UserView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<UserView>(UserView.LANDING);

  return (
    <div className="antialiased font-sans text-gray-900 selection:bg-action selection:text-white">
      {currentView === UserView.LANDING ? (
        <Landing onStart={() => setCurrentView(UserView.DASHBOARD)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;