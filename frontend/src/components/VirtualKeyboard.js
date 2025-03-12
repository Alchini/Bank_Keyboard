import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VirtualKeyboard({ userId }) {
  const [buttons, setButtons] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]); // Rastreia os botões selecionados

  // Solicita os botões ao backend ao carregar o componente
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/get-session`)
      .then(response => {
        console.log('Resposta do backend:', response.data); // Log da resposta
        setButtons(response.data.buttons);
      })
      .catch(error => {
        console.error('Erro ao buscar botões:', error); // Log de erro
      });
  }, []);

  const handleClick = (buttonId) => {
    const button = buttons.find(b => b.id === buttonId); // Encontra o botão clicado
    const isSelected = selectedButtons.some(b => b.id === buttonId);

    if (isSelected) {
      // Se o botão já foi selecionado, remove-o da lista
      setSelectedButtons(selectedButtons.filter(b => b.id !== buttonId));
    } else {
      // Se o botão não foi selecionado, adiciona-o à lista
      setSelectedButtons([...selectedButtons, button]);
    }

    console.log('Button clicked:', buttonId);
    console.log('Selected buttons:', selectedButtons);
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
      alert(response.data.message); // Exibe mensagem de sucesso ou erro
    } catch (error) {
      console.error('Erro ao validar a sequência:', error);
    }
  };

  return (
    <div>
      <h2>Teclado Virtual</h2>
      <div>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: selectedButtons.some(b => b.id === button.id) ? 'lightblue' : 'white',
            }}
          >
            {button.num1}/{button.num2}
          </button>
        ))}
      </div>
      <button onClick={submitSequence}>Enviar</button>
    </div>
  );
}

export default VirtualKeyboard;