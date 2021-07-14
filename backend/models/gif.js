const schemaObject = require('schema-object');
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
});

export class Gif {
    constructor(gif = null){
        this.gifUrl = "";
        this.utilisateurId = null;
        this.titre = "";

        if(gif!=null){
            this.gifUrl = gif.gifUrl;
            this.utilisateurId = gif.utilisateurId;
            this.titre = gif.titre
        }
    }
    add(){
        return connection.promise().query(`INSERT INTO Gif (gif_url, utilisateur_id, date_heure_publi, titre) VALUES (?, ?, NOW(), ?)`, [this.gifUrl, this.utilisateurId, this.titre])    
    }
    update(id){
    
    }
};
