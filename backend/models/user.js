const { hash } = require('bcrypt');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'groupomania',
    password: 'groupomania',
    database: 'reseau_groupomania'
  });

class User {
    constructor(user =! null){
        this.prenom = user.prenom;
        this.nom = user.nom;
        this.email = user.email;
        this.password = user.password;
    }
    add(){
       return connection.promise().query(`INSERT INTO Utilisateur (prenom, nom, email, mot_de_passe, date_inscription) VALUES (?, ?, ?, ?, NOW())`, [this.prenom, this.nom, this.email, this.password])
    }    
    findOne(email){
        return connection.promise().query(`SELECT id, email, mot_de_passe, DATE_FORMAT(date_inscription, '%e/%c/%Y à %kh%i') AS date_inscription, photo_profil FROM Utilisateur WHERE email = ?`, [email])
    }
    findAll(){
        return connection.promise().query(`SELECT id, prenom, nom, email, DATE_FORMAT(date_inscription, '%e/%c/%Y à %kh%i') AS date_inscription, photo_profil FROM Utilisateur`)
    }
    find(id){
        return connection.promise().query(`SELECT id, prenom, nom, email, DATE_FORMAT(date_inscription, '%e/%c/%Y à %kh%i') AS date_inscription, photo_profil FROM Utilisateur WHERE id = ?`, [id])
    }
    updateOne(id, photo){
        return connection.promise().query(`UPDATE Utilisateur SET photo_profil = ? WHERE id = ?`, [photo, id])
    }
    deleteOne(id){
        return connection.promise().query(`DELETE FROM Utilisateur WHERE id = ?`, [id] )
    }
    count(email){
        return connection.promise().query(`SELECT COUNT(*) AS count FROM Utilisateur WHERE email = ?`, [email])
    }
}

module.exports = User;