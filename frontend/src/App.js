import React, { useState } from 'react';
import Login from './components/Login';
import VirtualKeyboard from './components/VirtualKeyboard';

function App() {
  const [userId, setUserId] = useState(null); // Armazena o ID do usuário após o login

  return (
    <div>
      {userId ? (
        // Se o usuário estiver logado, exibe o teclado virtual
        <VirtualKeyboard userId={userId} />
      ) : (
        // Se não, exibe a tela de login/cadastro
        <Login onLogin={setUserId} />
      )}
    </div>
  );
}

export default App;