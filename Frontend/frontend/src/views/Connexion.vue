<template>

    <div class= "p-0 col-10 col-md-4 mx-auto text-center ">

        <img class=" w-50 bg-light p-0" src="/logo/icon-above-font.svg" alt="logo Groupomania">

        <div class="form-group pb-2">
            <label for="email">Email</label><br>
            <input type="email" id="email" name="email" required v-model="email">
        </div>

        <div class="form-group pb-2">
            <label for="mot_de_passe">Mot de passe</label><br>
            <input type="password" id="mot_de_passe" name="mot_de_passe" required v-model="password">
        </div>

        <div class="form-group p-4">
            <bouton @click="loginuser()" intitule="Se connecter"/>
        </div>

    </div>

</template>

<script>
import bouton from "@/components/Button.vue"

export default {
    name: 'Connexion',
    components:{
        bouton
    },
    data:function(){
        return {
            email: "",
            password: "",
        }
    },
    methods:{
        loginuser(){
            let email = this.email;
            let password = this.password;

            if(email === "" || password === ""){
                alert("Veuillez remplir les champs du formulaire de connexion");
            }else{

                let utilisateur = {
                    email: email,
                    password: password
                };

            fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(utilisateur),
                })
                .then(response => {
                    if (response.ok === true){
                        response.json()
                        .then(data => {
                            sessionStorage.setItem('admin', `${data.admin}`);
                            sessionStorage.setItem('userId', `${data.userId}`);
                            sessionStorage.setItem('token', `${data.token}`);
                            window.location.href = "http://localhost:8080/#/accueil";
                    })
                    }else{
                        response.json()
                        .then(erreur => {
                            alert(Object.values(erreur));
                        })
                    } 
                  
                })
            }
        }
    }
}

</script>

<style>

</style>