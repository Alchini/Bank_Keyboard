import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        if (password.length !== 4 || !/^\d{4}$/.test(password)) {
          alert('A senha deve ter exatamente 4 dígitos.');
          return;
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
          username,
          password,
        });
        alert('Cadastro realizado com sucesso!');
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
          username,
        });
        onLogin(response.data.userId);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao processar a requisição');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,4}$/.test(value)) {
      setPassword(value);
    }
  };

  return (
    <div className="container">
      <h1>{isRegistering ? 'Cadastro' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Senha (4 dígitos)"
            value={password}
            onChange={handlePasswordChange}
            maxLength={4}
            required
          />
        )}
        <button type="submit">{isRegistering ? 'Cadastrar' : 'Continuar'}</button>
      </form>
      <button className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
      </button>
    </div>
  );
}

export default Login;