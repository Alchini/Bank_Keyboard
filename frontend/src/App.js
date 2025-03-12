import React, { useState } from 'react';
import Login from './components/Login';
import VirtualKeyboard from './components/VirtualKeyboard';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div>
      {userId ? (
        <VirtualKeyboard userId={userId} />
      ) : (
        <Login onLogin={setUserId} />
      )}
    </div>
  );
}

export default App;