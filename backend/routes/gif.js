const express = require('express');
const mysql = require('mysql2');

const router = express.Router();


router.get('/', (req, res, next) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
        
        connection.promise().query(`SELECT gif.id, gif_url, titre, DATE_FORMAT(date_heure_publi, '%e/%c/%Y à %kh%i') AS date, Utilisateur.prenom AS prenom, Utilisateur.nom AS nom FROM Gif INNER JOIN Utilisateur ON Gif.utilisateur_id = Utilisateur.id ORDER BY date DESC`) 
          .then ( ([rows, fields]) => {    
            let response = Object.values(rows);
            return res.status(200).json({response});
          })
          .catch(() => res.status(500).json({error: 'Connexion au serveur impossible'}))
          .then (() => connection.end());
  });
  
router.get('/:id/commentaire', (req, res, next) => {
  
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
  
    let id = req.params.id;
  
    connection.promise().query(`SELECT commentaire, utilisateur.prenom AS prenom_commentaire, utilisateur.nom AS nom_commentaire, DATE_FORMAT(date_heure_publication, '%e/%c/%Y à %kh%i') AS date_commentaire FROM commentaire INNER JOIN Utilisateur ON commentaire.utilisateur_id = Utilisateur.id WHERE gif_id = ? `, [id] )
      .then ( ([rows,fields]) => {
        let response = Object.values(rows);
        return res.status(200).json({response});
      })
      .catch ( () => res.status(500).json({error :'Connexion au serveur impossible'}))
      .then ( () => connection.end());
  
  });

    

  
router.post('/', (req, res, next) => {
  
  
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
  
    const schemaObject = require('schema-object');
  
    const gifSchema = new schemaObject ({
      gifUrl: { type: String, required: true },
      utilisateurId: { type: Number, required: true },
      description: { type: String }  
  });
  
  const gifObject = JSON.parse(req.body);
  console.log(gifObject);
    const gif = new gifSchema({
      gifUrl: 'http://localhost///1234545',
      utilisateurId: 2,
      description: 'unbelieve'
    });
  
    
    connection.promise().query(`INSERT INTO Gif (gif_url, utilisateur_id, description, date_heure_publi) VALUES (?, ?, ?, NOW())`, [gif.gifUrl, gif.utilisateurId, gif.description])
    .then ( ([rows,fields]) => {
      res.status(201).json({message: 'Gif publié'})
    })
    .catch ( () => res.status(400).json({error :"erreur"}))
    .then ( () => connection.end());
  });


router.post('/:id/commentaire', (req, res, next) => {
  
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'groupomania',
    password: 'groupomania',
    database: 'reseau_groupomania'
  });

  const schemaObject = require('schema-object');

  const commentaireSchema = new schemaObject ({

    commentaire: { type: String, required: true },
    utilisateurId: { type: Number, required: true },
    gifId: { type: Number, required: true },
    
  });

  const gifObject = JSON.parse(req.body);
  console.log(gifObject);
    const commentaire = new commentaireSchema({
      commentaire: 'Genial',
      utilisateurId: 2,
      gifId: 2
    });
  

  connection.promise().query()
    .then ( ([rows,fields]) => {
    res.status(201).json({message: 'Commentaire publié'})
  })
    .catch ( () => res.status(400).json({error :"erreur"}))
    .then ( () => connection.end());
  });

module.exports = router;