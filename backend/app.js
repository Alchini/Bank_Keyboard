const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  next();
});

app.use('/api', userRoutes);
app.use('/api', sessionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});