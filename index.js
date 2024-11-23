require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adocoesRoutes = require('./src/routes/adocoesRoutes');
const userRoutes = require('./src/routes/userRoutes')
const animalRoutes = require('./src/routes/animalRoutes')
const consultaRoutes = require('./src/routes/consultaRoutes')
const veterinarioRoutes = require('./src/routes/veterinarioRoutes')
const tipoRoutes = require('./src/routes/tipoRoutes')
const adotanteRoutes = require('./src/routes/adotanteRoutes')

const app = express();
const PORT = 8080

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/adocoes', adocoesRoutes);
app.use('/animal', animalRoutes);
app.use('/consulta', consultaRoutes);
app.use('/veterinario', veterinarioRoutes);
app.use('/tipo', tipoRoutes);
app.use('/adotante', adotanteRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
