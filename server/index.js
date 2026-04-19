const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import des routes
const inscriptionsRoutes = require('./routes/inscriptions');
const newsletterRoutes = require('./routes/newsletter');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur Zouwor en ligne' });
});

// Routes API
app.use('/api/inscriptions', inscriptionsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/stats', statsRoutes);

// Route admin simple
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'zouwor2025') {
    res.json({ success: true, token: 'admin-token-' + Date.now() });
  } else {
    res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
  }
});

// Route logs (à déplacer dans un controller plus tard)
app.get('/api/logs', (req, res) => {
  try {
    const { readDB } = require('./utils/fileHandler');
    const db = readDB();
    res.json(db.logs?.slice(-100) || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pour SPA React - rediriger toutes les autres routes vers index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build React non trouvé. Exécutez "npm run build" d\'abord.');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur Zouwor démarré sur http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📁 Base de données: ${path.join(__dirname, 'data/database.json')}\n`);
});