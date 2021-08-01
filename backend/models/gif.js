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

class Gif {
    constructor(gif = !null){
        this.gifUrl = gif.gifUrl;
        this.utilisateurId = gif.utilisateurId;
        this.titre = gif.titre;
    }
    add(){
        return connection.promise().query(`INSERT INTO Gif (gif_url, utilisateur_id, date_heure_publi, titre) VALUES (?, ?, NOW(), ?)`, [this.gifUrl, this.utilisateurId, this.titre])    
    }
    findAll(){
        return connection.promise().query(`SELECT gif.id, gif_url, titre, DATE_FORMAT(date_heure_publi, '%e/%c/%Y à %kh%i') AS date, Utilisateur.prenom AS prenom, Utilisateur.nom AS nom, utilisateur_id AS utilisateurId, utilisateur.photo_profil  FROM Gif INNER JOIN Utilisateur ON Gif.utilisateur_id = Utilisateur.id ORDER BY gif.id DESC`)
    }
    findOne(id){
        return connection.promise().query(`SELECT gif.id, gif_url, titre, DATE_FORMAT(date_heure_publi, '%e/%c/%Y à %kh%i') AS date, Utilisateur.prenom AS prenom, Utilisateur.nom AS nom, utilisateur_id AS utilisateurId, utilisateur.photo_profil  FROM Gif INNER JOIN Utilisateur ON Gif.utilisateur_id = Utilisateur.id WHERE gif.id = ?`, [id])
    }
    find(userId){
        return connection.promise().query(`SELECT gif.id, gif_url, titre, DATE_FORMAT(date_heure_publi, '%e/%c/%Y à %kh%i') AS date FROM Gif WHERE utilisateur_id = ?  LIMIT 2`, [userId])
    }
    count(userId){
        return connection.promise().query(`SELECT COUNT(*) AS count FROM Gif WHERE utilisateur_id = ?`, [userId])
    }
    updateOne(id){
        return connection.promise().query(`UPDATE Gif SET titre = ? WHERE id = ?`, [this.titre, id])
    }
    deleteOne(id){
        return connection.promise().query(`DELETE FROM Gif WHERE id = ?`, [id])
    }
};

module.exports = Gif;

