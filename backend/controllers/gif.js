const Gif = require('../models/gif');


exports.createGif =  (req, res, next) => {
  
    const gif = new Gif(req.body);
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
      .catch(() => res.status(500).json({error: 'Connexion au serveur impossible'}))
};

exports.getOneGif = (req, res, next) => {

  let gif = new Gif();

  gif.findOne(req.params.id)
    .then ( ([rows, fields]) => {
      let response = Object.values(rows);
      res.status(200).json({response})
    })
    .catch( (rows) => res.status(400).json({rows}))
};


exports.deleteGif = (req, res, next) => {

    let gif = new Gif();
    gif.deleteOne(req.params.id)
      .then( ([rows,field]) =>{
        res.status(200).json({message: "Gif supprimé"})
      })
      .catch( (rows) => {res.status(400).json({erreur: rows})})
  
};



