const Commentaire = require('../models/commentaire');

exports.createComment =  (req, res, next) => {

    const commentaire = new Commentaire(req.body)
  
    commentaire.add()
        .then ( ([rows,fields]) => {
        res.status(201).json({message: 'Commentaire publié'})
      })
        .catch ( () => res.status(400).json({erreur:"Connexion au serveur impossible"}));
};

exports.getGifComment = (req, res, next) => {
    
    const comment = new Commentaire()

    comment.countgif(req.params.id)
      .then (([rows, fields]) => {
        let countCommentGif = Object.values(rows)[0].count;

        if(countCommentGif === 0){
          res.status(200).json({message: "Aucun commentaire publié"})
        }

        comment.findAll(req.params.id)
        .then ( ([rows,fields]) => {
          let response = Object.values(rows);
          return res.status(200).json({response});
        })
        .catch ( () => res.status(500).json({erreur :'Connexion '}))

      })
    .catch(() => res.status(400).json({erreur: "Connexion au serveur impossible"}))
};


exports.getCommentUser = (req, res, next) => {

  const comment = new Commentaire();

  comment.countuser(req.params.id)
    .then(([rows, fields]) => {
      let countCommentUser = Object.values(rows)[0].count;

        if(countCommentUser === 0){
          return res.status(200).json({message: "Aucun commentaire publié"})
        }
        comment.find(req.params.id)
        .then ( ([rows, fields]) => {
          let response = Object.values(rows);
          res.status(200).json({response})
        })
        .catch(() => res.status(400).json({erreur:"Connexion au serveur impossible"}))
    })
    .catch (() => res.status(400).json({erreur:"Connexion au serveur impossible"}))

};

exports.deleteGifComment = (req, res, next) => {

    const commentaire = new Commentaire()

    commentaire.deleteOne(req.params.id)
      .then( ([rows, fields]) => {
        res.status(200).json({message: "Commentaire supprimé"})
      })
      .catch( () => {res.status(400).json({erreur: "erreur de suppression"})})
};
