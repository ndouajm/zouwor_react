const { readDB, writeDB, generateId } = require('../utils/fileHandler');

// Récupérer tous les abonnés
const getAll = (req, res) => {
  try {
    const db = readDB();
    res.json(db.newsletter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un abonné
const create = (req, res) => {
  try {
    const db = readDB();
    const { prenom, email, whatsapp } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email requis' });
    }
    
    // Vérifier si l'email existe déjà
    const existing = db.newsletter.find(item => item.email === email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà inscrit' });
    }
    
    const newSubscriber = {
      id: generateId(),
      prenom: prenom || '',
      email,
      whatsapp: whatsapp || null,
      date_inscription: new Date().toISOString(),
      status: 'active'
    };
    
    db.newsletter.push(newSubscriber);
    db.stats.total_newsletter++;
    
    const today = new Date().toISOString().split('T')[0];
    if (!db.stats.daily_stats[today]) {
      db.stats.daily_stats[today] = { visits: 0, inscriptions: 0, newsletter: 0 };
    }
    db.stats.daily_stats[today].newsletter++;
    
    // Ajouter un log
    db.logs.push({
      id: generateId(),
      level: 'info',
      action: 'newsletter',
      details: { email, id: newSubscriber.id },
      timestamp: new Date().toISOString()
    });
    
    writeDB(db);
    
    res.status(201).json({ success: true, message: 'Inscription newsletter réussie' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un abonné
const remove = (req, res) => {
  try {
    const db = readDB();
    const filtered = db.newsletter.filter(n => n.id !== req.params.id);
    
    if (filtered.length === db.newsletter.length) {
      return res.status(404).json({ error: 'Abonné non trouvé' });
    }
    
    db.newsletter = filtered;
    writeDB(db);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, remove };