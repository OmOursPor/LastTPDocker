var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Adresse de l'hôte MySQL
  port: 3306, // Numéro de port MySQL
  user: 'admin', // Nom d'utilisateur MySQL
  password: 'pwd', // Mot de passe MySQL
  database: 'db' // Nom de la base de données MySQL
});

// const connection = mysql.createConnection({
//   host: 'mysql', // Utiliser le nom du service MySQL
//   user: 'admin',
//   password: 'pwd',
//   database: 'db'
// });


connection.connect((err) => {
  if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
  }
  console.log('Connecté à la base de données MySQL');
});

router.post('/addresses', (req, res) => {
  const { numero_rue, nom_rue, ville, code_postal } = req.body;

  // Requête SQL pour ajouter une adresse dans la base de données
  const sql = 'INSERT INTO Adresse (numero_rue, nom_rue, ville, code_postal) VALUES (?, ?, ?, ?)';
  connection.query(sql, [numero_rue, nom_rue, ville, code_postal], (err, result) => {
      if (err) {
          console.error('Erreur lors de l\'ajout de l\'adresse dans la base de données :', err);
          res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'adresse', err });
          return;
      }
      console.log('Adresse ajoutée avec succès');
      res.status(201).json({ message: 'Adresse ajoutée avec succès' });
  });
});

// Méthode pour récupérer toutes les adresses
router.get('/addresses', (req, res) => {
  // Requête SQL pour récupérer toutes les adresses depuis la base de données
  const sql = 'SELECT * FROM Adresse';
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération des adresses depuis la base de données :', err);
          res.status(500).json({ message: 'Erreur lors de la récupération des adresses' });
          return;
      }
      console.log('Adresses récupérées avec succès');
      res.status(200).json(results);
  });
});

module.exports = router;
