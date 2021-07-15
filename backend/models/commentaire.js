const schemaObject = require('schema-object');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'groupomania',
    password: 'groupomania',
    database: 'reseau_groupomania'
  });
  
const gifSchema = new schemaObject ({
  gifUrl: { type: String, required: true },
  utilisateurId: { type: Number, required: true },
  titre: { type: String }  
})

class Commentaire {
    constructor(commentaire = !null){
        this.texte = commentaire.texte;
        this.utilisateurId = commentaire.utilisateurId;
        this.gifId = commentaire.gifId;
    }
    add(){
        return connection.promise().query(`INSERT INTO Commentaire (commentaire, utilisateur_id, gif_id, date_heure_publication) VALUES (?, ?, ?, NOW())`, [this.texte, this.utilisateurId, this.gifId])
    }
    findAll(gif_id){
        return connection.promise().query(`SELECT commentaire.id, commentaire, utilisateur.prenom AS prenom_commentaire, utilisateur.nom AS nom_commentaire, DATE_FORMAT(date_heure_publication, '%e/%c/%Y à %kh%i') AS date_commentaire FROM commentaire INNER JOIN Utilisateur ON commentaire.utilisateur_id = Utilisateur.id WHERE gif_id = ? ORDER BY date_commentaire DESC `, [gif_id])
    }
    update(id){
        return connection.promise().query(`UPDATE Commentaire SET texte = ? WHERE id = ?` [this.texte, id])
    }
    deleteOne(id){
        return connection.promise().query(`DELETE FROM Commentaire WHERE id = ?`, [id])
    }

};

module.exports = Commentaire;