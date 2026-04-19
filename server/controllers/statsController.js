const { readDB, writeDB, generateId } = require('../utils/fileHandler');

// Récupérer toutes les statistiques
const getAll = (req, res) => {
  try {
    const db = readDB();
    res.json(db.stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enregistrer une visite
const registerVisit = (req, res) => {
  try {
    const db = readDB();
    const { page, referer } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    db.stats.total_visits++;
    
    if (!db.stats.daily_stats[today]) {
      db.stats.daily_stats[today] = { visits: 0, inscriptions: 0, newsletter: 0 };
    }
    db.stats.daily_stats[today].visits++;
    
    // Enregistrer la visite
    db.visits.push({
      id: generateId(),
      page: page || 'home',
      ip: req.ip || req.connection?.remoteAddress || 'unknown',
      user_agent: req.headers['user-agent'] || 'unknown',
      referer: referer || req.headers.referer || null,
      timestamp: new Date().toISOString()
    });
    
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur visite:', error);
    res.status(500).json({ error: error.message });
  }
};

// Enregistrer téléchargement catalogue
const registerCatalogueDownload = (req, res) => {
  try {
    const db = readDB();
    db.stats.catalogue_downloads = (db.stats.catalogue_downloads || 0) + 1;
    
    // Ajouter un log
    db.logs.push({
      id: generateId(),
      level: 'info',
      action: 'download',
      details: { file: 'catalogue.pdf' },
      timestamp: new Date().toISOString()
    });
    
    writeDB(db);
    res.json({ success: true, count: db.stats.catalogue_downloads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, registerVisit, registerCatalogueDownload };