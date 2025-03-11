import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL)
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Frontend do Teclado Virtual</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;