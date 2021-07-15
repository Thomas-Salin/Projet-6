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
       return connection.promise().query(`INSERT INTO Utilisateur (prenom, nom, email, mot_de_passe) VALUES (?, ?, ?, ?)`, [this.prenom, this.nom, this.email, this.password])
    }    
    findOne(email){
        return connection.promise().query(`SELECT id, email, mot_de_passe FROM Utilisateur WHERE email = ?`, [email])
    }
    count(email){
        return connection.promise().query(`SELECT COUNT(*) AS count FROM Utilisateur WHERE email = ?`, [email])
    }
}

module.exports = User;