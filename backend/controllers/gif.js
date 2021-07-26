const Gif = require('../models/gif');
const fs = require('fs');


exports.createGif =  (req, res, next) => {

    const gifObject = JSON.parse(req.body.gif)
    const gif = new Gif({
      gifUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`,
      utilisateurId: gifObject.utilisateurId,
      titre: gifObject.titre
    });
    gif.add()
        .then ( ([rows,fields]) => {
            res.status(201).json({message: 'Gif publié'})
        })
        .catch ( () => res.status(400).json({error :"Tous les champs requis ne sont pas remplis"}))
};


exports.getAllGif = (req, res, next) => {
    
    let gif = new Gif();
    gif.findAll()
      .then ( ([rows, fields]) => {    
          let response = Object.values(rows);
          return res.status(200).json({response});
      })
      .catch(() => res.status(500).json({erreur: 'Connexion au serveur impossible'}))
};

exports.getOneGif = (req, res, next) => {

  let gif = new Gif();

  gif.findOne(req.params.id)
    .then ( ([rows, fields]) => {
      let response = Object.values(rows);
      res.status(200).json({response})
    })
    .catch( rows => res.status(400).json({rows}))
};

exports.getGifUser = (req, res, next) => {

  let gif = new Gif();

  gif.count(req.params.id)
    .then(([rows, fields]) => {
      let countGif = Object.values(rows)[0].count;

        if(countGif === 0){
          return res.status(200).json({message: "Aucun gif publié"})
        }
        gif.find(req.params.id)
        .then ( ([rows, fields]) => {
          let response = Object.values(rows);
          res.status(200).json({response})
        })
        .catch((rows) => res.status(400).json({rows}))
    })
    .catch (() => res.status(400).json({erreur: "Connexion au serveur impossible"}))

};


exports.deleteGif = (req, res, next) => {

    let gif = new Gif();

          gif.deleteOne(req.params.id)
            .then( ([rows,field]) =>{
              res.status(200).json({message: "Gif supprimé"})
            })
            .catch( () => {res.status(500).json({erreur: "Connexion au serveur impossible"})})
      .catch( () => res.status(500).json({erreur:"Connexion au serveur impossible"}));
};



