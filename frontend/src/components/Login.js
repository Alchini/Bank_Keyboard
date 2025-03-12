import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        // Cadastro de novo usuário
        await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
          username,
          password,
        });
        alert('Cadastro realizado com sucesso!');
      } else {
        // Login
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
          username,
          password,
        });
        onLogin(response.data.userId); // Passa o ID do usuário para o próximo passo
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao processar a requisição');
    }
  };

  return (
    <div>
      <h1>{isRegistering ? 'Cadastro' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha (4 dígitos)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={4}
          required
        />
        <button type="submit">{isRegistering ? 'Cadastrar' : 'Continuar'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
      </button>
    </div>
  );
}

export default Login;