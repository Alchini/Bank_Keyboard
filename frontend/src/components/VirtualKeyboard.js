import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';

function VirtualKeyboard({ userId }) {
  const [buttons, setButtons] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [clickedButtonId, setClickedButtonId] = useState(null);

  // Solicita os botões ao backend ao carregar o componente
  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-session`);
      console.log('Resposta do backend:', response.data); // Log da resposta
      setButtons(response.data.buttons);
    } catch (error) {
      console.error('Erro ao buscar botões:', error); // Log de erro
    }
  };

  const handleClick = (buttonId) => {
    const button = buttons.find(b => b.id === buttonId); // Encontra o botão clicado
    setSelectedButtons([...selectedButtons, button]); // Adiciona o botão à lista de selecionados
    setClickedButtonId(buttonId); // Define o botão clicado

    console.log('Button clicked:', buttonId);
    console.log('Selected buttons:', selectedButtons);

    // Remove o destaque do botão após 200ms
    setTimeout(() => {
      setClickedButtonId(null);
    }, 200);
  };

  const submitSequence = async () => {
    const buttonPairs = selectedButtons.map(button => [button.num1, button.num2]); // Extrai os pares de números
    console.log('Submitting button pairs:', buttonPairs);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/validate-sequence`, {
        buttonPairs, // Envia os pares de números
        userId, // Passa o ID do usuário para validação
      });
      console.log('Response from backend:', response.data);
      alert(response.data.message); // Exibe mensagem de sucesso

      // Limpa os botões selecionados após o envio bem-sucedido
      setSelectedButtons([]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Senha incorreta: solicita uma nova combinação de botões
        alert('Senha incorreta! Gerando nova combinação...');
        try {
          await fetchButtons(); // Gera uma nova combinação de botões
          setSelectedButtons([]); // Limpa os botões selecionados
        } catch (err) {
          console.error('Erro ao gerar nova combinação:', err);
          alert('Erro ao gerar nova combinação. Tente novamente.');
        }
      } else {
        console.error('Erro ao validar a sequência:', error);
        alert('Erro ao validar a sequência. Tente novamente.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Selecione sua senha</h2>
      <div className="keyboard">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            style={{
              backgroundColor: clickedButtonId === button.id ? 'lightblue' : 'white',
            }}
          >
            {button.num1} ou {button.num2}
          </button>
        ))}
      </div>
      <div className="selected-buttons">
        {selectedButtons.map((button, index) => (
          <span key={index} className="selected-button">
            {button.num1} ou {button.num2}{index < selectedButtons.length - 1 ? '' : ''}
          </span>
        ))}
      </div>
      <button className="submit-button" onClick={submitSequence}>Enviar</button>
    </div>
  );
}

export default VirtualKeyboard;