const Commentaire = require('../models/commentaire');

exports.createComment =  (req, res, next) => {

    const commentaire = new Commentaire(req.body)
  
    commentaire.add()
        .then ( ([rows,fields]) => {
        res.status(201).json({message: 'Commentaire publié'})
      })
        .catch ( (rows) => res.status(400).json({rows}))
};

exports.getGifComment = (req, res, next) => {
    
    const commentaire = new Commentaire()

    commentaire.findAll(req.params.id)
      .then ( ([rows,fields]) => {
        let response = Object.values(rows);
        return res.status(200).json({response});
      })
      .catch ( () => res.status(500).json({error :'Connexion au serveur impossible'}))
};

exports.deleteGifComment = (req, res, next) => {

    const commentaire = new Commentaire()

    commentaire.deleteOne(req.params.id)
      .then( ([rows, fields]) => {
        res.status(200).json({message: "Commentaire supprimé"})
      })
      .catch( () => {res.status(400).json({erreur: "erreur de suppression"})})
};
