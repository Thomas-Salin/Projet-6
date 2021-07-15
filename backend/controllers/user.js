const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup =  (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then (hash => {
            const user = new User({
                prenom: req.body.prenom,
                nom: req.body.nom,
                email: req.body.email,
                password: hash
            })
            user.add()
            .then (([rows, fields]) => {
                res.status(201).json({message : "Utilisateur crée"})
            })
            .catch((rows) => {
                let rowserr = Object.values(rows)[2];
                    if(rowserr === 1062){
                res.status(400).json({erreur: "email dèjà existant"})
                }else {
                    res.status(400).json({erreur: "Tous les champs requis ne sont pas remplis correctement"})
                }                
            });
        })
        .catch(error => res.status(500).json({error}));  
};

exports.login = (req, res, next) => {
    const user = new User()

    user.count(req.body.email)
        .then( ([rows, fields]) => {
            let countEmail = Object.values(rows)[0].count;

            if(countEmail == 0){
                res.status(400).json({erreur: "Utilisateur inconnu"});
            }if (countEmail === 1){
                user.findOne(req.body.email)
                    .then(([rows, fields]) => {
                        let password = Object.values(rows)[0].mot_de_passe
                        bcrypt.compare(req.body.password, password)
                            .then(valid => {
                                
                                if(!valid){
                                    return res.status(401).json({erreur :" Mot de passe erroré"})
                                }
                                res.status(200).json({
                                    userId: Object.values(rows)[0].id,
                                    token: jwt.sign(
                                        { userId: req.body.id }, 
                                        'PLATES_CONTINUE_PRIME_LOCKER_MUSIC_COMPANY',
                                        { expiresIn: '24h' }       
                                    )
                                })
                            })
                            .catch( () => res.status(500).json({erreur: "Probleme de serveur"}))
                    })
                    .catch( () => res.status(500).json({erreur: "connexion impossible à la base de donnée"}))    
            }
        })            
    .catch(() => res.status(400).json({erreur: 're'}))
};
