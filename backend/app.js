const express = require('express');
const mysql = require('mysql2');

const app = express();


app.get('/api/gifs', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'groupomania',
        password: 'groupomania',
        database: 'reseau_groupomania'
      });
      
      connection.promise().query(`SELECT gif_url, description, DATE_FORMAT(date_heure_publi, '%e/%c/%Y à %kh%i'), Utilisateur.prenom AS prenom, Utilisateur.nom AS nom FROM Gif INNER JOIN Utilisateur ON Gif.utilisateur_id = Utilisateur.id`) 
        .then ( ([rows, fields]) => {    
          let response = Object.values(rows);
          return res.status(200).json({response});
        })
        .catch(() => res.status(500).json({error: 'Connexion au serveur impossible'}))
        .then (() => connection.end());
});

app.get('/api/gifs/:id', (req, res, next) => {

  let id = req.params.id;

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'groupomania',
    password: 'groupomania',
    database: 'reseau_groupomania'
  });

  connection.promise().query(`SELECT commentaire, utilisateur.prenom AS prenom_commentaire, utilisateur.nom AS nom_commentaire, DATE_FORMAT(date_heure_publication, '%e/%c/%Y à %kh%i') AS date_commentaire, gif, gif_auteurprenom, gif_auteurnom, gif_date FROM commentaire INNER JOIN (SELECT gif.id AS gif_id, gif.gif_url AS gif, utilisateur.prenom AS gif_auteurprenom, utilisateur.nom AS gif_auteurnom, DATE_FORMAT(date_heure_publi, '%e/%c/%Y à %kh%i') AS gif_date FROM Gif INNER JOIN Utilisateur ON gif.utilisateur_id = Utilisateur.id) AS req ON commentaire.gif_id = req.gif_id INNER JOIN Utilisateur ON commentaire.utilisateur_id = Utilisateur.id WHERE req.gif_id = ? `, [id] )
    .then ( ([rows,fields]) => {
      let response = Object.values(rows);
      return res.status(200).json({response});
    })
    .catch ( () => res.status(500).json({error :'Connexion au serveur impossible'}))
    .then ( () => connection.end());

});

module.exports = app;