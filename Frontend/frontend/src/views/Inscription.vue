<template>

    <div class= "p-0 col-12 col-md-4 mx-auto my-0 text-center">

        <img class="w-50 bg-light p-0 my-0" src="/logo/icon-above-font.svg" alt="logo Groupomania">

        <div class ="form-group">
            <label for="prenom">Prénom</label><br>
            <input type="text" id="prenom" name="prenom" required v-model="prenom">
        </div>

        <div class="form-group">
            <label for="nom">Nom</label><br>
            <input type="text" id="nom" name="nom" required v-model="nom">
        </div>

        <div class="form-group ">
            <label for="email">Email</label><br>
            <input type="email" id="email" name="email" required v-model="email">
        </div>

        <div class="form-group pb-2">
            <label for="mot_de_passe">Mot de passe</label><br>
            <input type="text" id="password" name="password" required v-model="password">
        </div>

        <div class=" form-group">
            <bouton @click="createnewuser()" intitule="S'inscrire"/>
        </div>

        <p>Vous avez déjà un compte ? <router-link class="nav-link" to="/connexion">Connectez-vous</router-link></p>


    </div>

</template>

<script>
import bouton from '@/components/Button.vue'

export default {
    name: "inscription",
    components:{
        bouton
    },
    data: function(){
        return{
            prenom: "",
            nom: "",
            email: "",
            password: ""
        }
    },
    methods: {
        createnewuser(){

                let prenom = this.prenom;
                let nom = this.nom;
                let email = this.email;
                let password = this.password;

                if(prenom === "" || nom === ""  || email === "" || password === ""){
                    alert("Veuillez remplir tous les champs du formulaire");
                }else{

                let newUtilisateur = {
                    prenom: prenom,
                    nom: nom,
                    email: email,
                    password: password
                };

                fetch('http://localhost:3000/api/users/signup', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newUtilisateur)
                    })
                    .then ((response) =>{
                        if(response.ok === true){
                            window.location.href = "http://localhost:8080/#/connexion" ;
                        }else{
                            response.json()
                            .then(erreur =>{
                                alert(Object.values(erreur));
                            })                      
                        }
                })
                .catch(erreur => {
                        console.log(erreur);
                })
            }   
        }
    }
}
</script>


<style>

</style>