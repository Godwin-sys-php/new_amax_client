require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const BUILD_PATH = path.join(__dirname, 'dist'); // Automatiquement ./dist

// Vérifie si le dossier dist existe
const fs = require('fs');
if (!fs.existsSync(BUILD_PATH)) {
  console.error(`❌ Le dossier ${BUILD_PATH} n'existe pas ! Exécute 'npm run build' d'abord.`);
  process.exit(1);
}

// Servir les fichiers statiques du build React
app.use(express.static(BUILD_PATH));

// Rediriger toutes les routes vers index.html (React SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur started`);
});
