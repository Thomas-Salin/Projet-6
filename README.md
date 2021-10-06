# Projet 7 : Créer un réseau social interne d'entreprise : Groupomania.

# Objectif du projet : 

    - Administrer la base de données avec MySQL
    - Créer son API avec Node.js et son framework Express
    - Créer et implémenter l'interface client avec Vue.js

# Fonctionnalités proposées V1 :

   ## Spécification de l'application web : 
        Cette application web peut etre utilisé sur mobile, tablette ainsi que sur ordinateur grâce à son modele responsive.
        Cette application a un protocole de sécurisation d'échange de données et d'authentification grâce à JSON Web Token.
        Cette application gère les différentes erreurs (ex : utilisateur inconnu ) par un message d'avertissement.
        
   ## Création d'un compte utilisateur : 

  ![Imginscription](https://user-images.githubusercontent.com/74469025/136215674-bea9c6d7-c08f-4b65-abc8-8edfcd187643.png)
  
   ## Connexion à un compte existant : 
   
   ![connexion](https://user-images.githubusercontent.com/74469025/136215993-7d6185d1-7d75-4390-829d-76ea41981358.png)
   
   ## Création et publication de post : 
       L'API prend en charge le telechargement d'image au format PNG, JPEG/JPG, et GIF grâce au middleware du package Multer : 
       
   ![post](https://user-images.githubusercontent.com/74469025/136219229-ce69d717-6431-4810-a680-b87f52b6d9b1.png)
   
   ## Fil de publication de post : 
       Par ordre chronologique de date de publication afin que l'utilisateur ait vu sur les nouveaux posts :
       
   ![fil](https://user-images.githubusercontent.com/74469025/136220371-559f7917-e161-4fb0-9a70-bb016c058120.png)
   
   ## Visualisation des utilisateurs de l'application : 
   
   ![utilisateur](https://user-images.githubusercontent.com/74469025/136220874-8652f20d-5866-43e7-890b-ac3a596637fc.png)
   
   ## Visualisation de la page de profil : 
        L'API prend en charge le telechargement de la photo de l'utilisateur au format PNG, JPEG/JPG grâce au middleware du package Multer.
        La page profil nous présente nos informations, nos 4 derniers commentaires postés ainsi que nos 2 derniers posts.
        
   ![profil](https://user-images.githubusercontent.com/74469025/136223267-00f0497d-6a10-49ca-bae8-35f5ac000d3d.png)
   
   ## Visualisation du post et des ses commentaires :
   
   ![post (2)](https://user-images.githubusercontent.com/74469025/136225761-f01c8b37-4ea4-480d-87a7-41f6ca123809.png)
   
   ## Intégration d'un compte administrateur : 
        Ce compte est mise à disposition afin de modérer le contenu de l'application web ( Supprimer un compte, des commentaires ou des posts de n'importe quel utilisateur et           donner accés au droits administrateurs ) : 
        
   ![compte admin](https://user-images.githubusercontent.com/74469025/136227044-fd286058-4c2b-4da8-a42a-8318490e05c4.png)
        
     
        
        
        
        
   
   

