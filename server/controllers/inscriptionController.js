const { readDB, writeDB, generateId } = require('../utils/fileHandler');

// Récupérer toutes les inscriptions
const getAll = (req, res) => {
  try {
    const db = readDB();
    res.json(db.inscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une inscription par ID
const getOne = (req, res) => {
  try {
    const db = readDB();
    const inscription = db.inscriptions.find(i => i.id === req.params.id);
    if (!inscription) {
      return res.status(404).json({ error: 'Inscription non trouvée' });
    }
    res.json(inscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle inscription
const create = async (req, res) => {
  try {
    const db = readDB();
    
    // Validation
    if (!req.body.whatsapp || !req.body.motivation) {
      return res.status(400).json({ 
        success: false, 
        error: 'WhatsApp et motivation sont requis' 
      });
    }
    
    const newInscription = {
      id: generateId(),
      ...req.body,
      date_inscription: new Date().toISOString(),
      status: 'pending'
    };
    
    db.inscriptions.push(newInscription);
    db.stats.total_inscriptions++;
    
    // Mise à jour des stats quotidiennes
    const today = new Date().toISOString().split('T')[0];
    if (!db.stats.daily_stats[today]) {
      db.stats.daily_stats[today] = { visits: 0, inscriptions: 0, newsletter: 0 };
    }
    db.stats.daily_stats[today].inscriptions++;
    
    // Ajouter un log
    db.logs.push({
      id: generateId(),
      level: 'info',
      action: 'inscription',
      details: { whatsapp: req.body.whatsapp, id: newInscription.id },
      timestamp: new Date().toISOString()
    });
    
    writeDB(db);
    
    console.log(`✅ Nouvelle inscription : ${req.body.whatsapp}`);
    
    res.status(201).json({ 
      success: true, 
      message: 'Inscription enregistrée avec succès',
      data: newInscription 
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mettre à jour une inscription
const update = (req, res) => {
  try {
    const db = readDB();
    const index = db.inscriptions.findIndex(i => i.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Inscription non trouvée' });
    }
    
    db.inscriptions[index] = { ...db.inscriptions[index], ...req.body };
    writeDB(db);
    
    res.json({ success: true, data: db.inscriptions[index] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une inscription
const remove = (req, res) => {
  try {
    const db = readDB();
    const filtered = db.inscriptions.filter(i => i.id !== req.params.id);
    
    if (filtered.length === db.inscriptions.length) {
      return res.status(404).json({ error: 'Inscription non trouvée' });
    }
    
    db.inscriptions = filtered;
    writeDB(db);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };