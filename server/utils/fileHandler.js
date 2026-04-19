const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/database.json');

// Lire la base de données
function readDB() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Erreur lecture DB:', error.message);
    // Retourner une structure par défaut si le fichier n'existe pas
    return {
      inscriptions: [],
      newsletter: [],
      visits: [],
      logs: [],
      stats: {
        total_visits: 0,
        total_inscriptions: 0,
        total_newsletter: 0,
        catalogue_downloads: 0,
        daily_stats: {}
      },
      settings: {
        site_name: "Zouwor",
        contact_phones: ["+225 07 11 04 13 86", "+225 07 89 07 85 57"],
        contact_email: "equipezouwor@gmail.com",
        whatsapp_group: "https://chat.whatsapp.com/GfNhdBTDh6A4a1sF5ufGmC",
        telegram_group: "https://t.me/+WRsFr0iIEFMyZDY0"
      }
    };
  }
}

// Écrire dans la base de données
function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('❌ Erreur écriture DB:', error.message);
    return false;
  }
}

// Générer un ID unique
function generateId() {
  return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
}

module.exports = { readDB, writeDB, generateId };