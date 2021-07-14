const mysql = require('mysql2');
const { Gif } = require('../models/gif');




exports.createGif =  (req, res, next) => {
  
    let gif = new Gif(req.body);
    gif.add()
        .then ( ([rows,fields]) => {
            res.status(201).json({message: 'Gif publié'})
        })
        .catch ( () => res.status(400).json({error :"erreur"}))
        .then ( () => connection.end());
};


exports.createCommentaire =  (req, res, next) => {
  
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
  
    const schemaObject = require('schema-object');
  
    const commentaireSchema = new schemaObject ({
  
      texte: { type: String, required: true },
      utilisateurId: { type: Number, required: true },
      gifId: { type: Number, required: true },
      
    });
  
    const commentaireObject = JSON.parse(JSON.stringify(req.body));
  
    const commentaire = new commentaireSchema({
      texte: commentaireObject.texte,
      utilisateurId: commentaireObject.utilisateurId,
      gifId: commentaireObject.gifId
      });
  
    connection.promise().query(`INSERT INTO Commentaire (commentaire, utilisateur_id, gif_id, date_heure_publication) VALUES (?, ?, ?, NOW())`, [commentaire.texte, commentaire.utilisateurId, commentaire.gifId])
      .then ( ([rows,fields]) => {
      res.status(201).json({message: 'Commentaire publié'})
    })
      .catch ( () => res.status(400).json({error :"erreur"}))
      .then ( () => connection.end());
};

exports.getAllGif = (req, res, next) => {

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
};

exports.getGifCommentaire = (req, res, next) => {
  
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
  
    let id = req.params.id;
  
    connection.promise().query(`SELECT commentaire.id, commentaire, utilisateur.prenom AS prenom_commentaire, utilisateur.nom AS nom_commentaire, DATE_FORMAT(date_heure_publication, '%e/%c/%Y à %kh%i') AS date_commentaire FROM commentaire INNER JOIN Utilisateur ON commentaire.utilisateur_id = Utilisateur.id WHERE gif_id = ? ORDER BY date_commentaire DESC `, [id] )
      .then ( ([rows,fields]) => {
        let response = Object.values(rows);
        return res.status(200).json({response});
      })
      .catch ( () => res.status(500).json({error :'Connexion au serveur impossible'}))
      .then ( () => connection.end());
};

exports.deleteGif = (req, res, next) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
  
    let gifObject2 = JSON.parse(JSON.stringify(req.body));
    let gifId = gifObject2.gifid;
    
    connection.promise().query(`DELETE FROM Gif WHERE id = ?`, [gifId])
      .then( ([rows,field]) =>{
        res.status(200).json({message: "Gif supprimé"})
      })
      .catch( () => {res.status(400).json({erreur: "erreur de suppression"})})
      .then( () => connection.end())
  
};

exports.deleteGifCommentaire = (req, res, next) => {

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'groupomania',
      password: 'groupomania',
      database: 'reseau_groupomania'
    });
  
    let commentObject = JSON.parse(JSON.stringify(req.body));
    let idCommentaire = commentObject.id;
  
    connection.promise().query(`DELETE FROM Commentaire WHERE id = ?`, [idCommentaire])
      .then( ([rows, fields]) => {
        res.status(200).json({message: "Commentaire supprimé"})
      })
      .catch( () => {res.status(400).json({erreur: "erreur de suppression"})})
      .then ( () => connection.end())
};

