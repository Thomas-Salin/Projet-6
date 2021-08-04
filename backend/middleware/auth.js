const jwt = require('jsonwebtoken');

module.exports  = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'PLATES_CONTINUE_PRIME_LOCKER_MUSIC_COMPANY');
        const utilisateurId = decodedToken.userId;
        console.log(req.body.utilisateurId);
        if(req.body.utilisateurId && req.body.utilisateurId != utilisateurId ) {
            throw "User ID invalide";
        }
        if(!req.body.userId){
            next();
        } 
    }catch (erreur) {
        res.status(401).json({
            erreur: "Requete non authentifiée"
        })
    }
};