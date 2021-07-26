<template>
        <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>

    <section class="container-fluid my-3">

        <div class="row">
            
            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <router-link :to="{ path: 'post', query: {gifId: `${gif.id}`}}" class="border border-dark mt-5 text-center  w-75 mx-auto"><img class="w-100" src="/logo/Zelda-Top10-35ans.jpg" alt="photo_gif"></router-link>
                <div class="card-body m-0">
                    <p class="text-center fs-4 fw-bold">{{ gif.titre }}</p>
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex m-1 h-50 w-50">
                            <img class="photo_utilisateur w-50 p-0 my-auto border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <router-link :to="{ path: 'profil', query: {userId: `${gif.utilisateurId}`}}"><p class="m-0 fs-6 fst-italic">{{ gif.prenom }} {{ gif.nom }}</p></router-link>
                            <p class="m-0 fs-6">Le {{ gif.date }}</p>                                
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <section class="container-fluid">

        <div class="row">
            <div class="text-center">
                <p class="fs-4">Commentaires</p>
            </div>
        </div>

        <div class="row my-3">
            <div class="card col-12 col-md-6 mx-auto border border-dark">
                <div class="card-body ">
                    <label for="commentaire">Votre commentaire : </label><br>
                    <textarea class="w-100" name="commentaire" id="commentaire" cols="60" rows="4" v-model="newComment.texte">Ecrivez votre commentaire</textarea><br>
                    <button @click="createNewComment()" class="my-3 params_button" type="submit">Publier</button>
                </div>
            </div>
        </div>

        <div v-for="commentaire in comments" :key="commentaire.id" class="row my-3">
            <div class="card col12 col-md-6 mx-auto border border-dark">
                <div class="card-body px-1 py-0">
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex h-50 w-50 m-1">
                            <img class="photo_utilisateur w-50 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <p class="m-0 fs-6 fst-italic">{{ commentaire.prenom_commentaire }} {{ commentaire.nom_commentaire }}</p>
                            <p class="m-0 fs-6">{{ commentaire.date_commentaire }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="fw-bold fs-6">"{{ commentaire.commentaire }}"</p>
                    </div>
                    <div class="text-center">
                        <bouton @click="deleteComment(`${commentaire.id}`)" intitule="Supprimer"/>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>

<script>
import Navlink from '@/components/Navlink.vue'
import bouton from '@/components/Button.vue'

export default {
    name: 'Nav',
    components: {
        Navlink,
        bouton
    },
    data: function(){
        return{
            gif: {
                id: 0,
                gif_url: "",
                titre: "",
                date: "",
                prenom: "",
                nom: "",
                utilisateurId: 0,
            },
            comments: [],
            newComment: {
                    texte: "",
                    utilisateurId: parseInt(sessionStorage.userId),
                    gif: 0
            }

        }
    },
    beforeMount(){
        let url = window.location.href;
        let recupId = url.split('=');
        let gifId = recupId[1];

        fetch(`http://localhost:3000/api/gifs/${gifId}`)
        .then(response =>{
            response.json()
            .then (data => {
                this.gif.id = data.response[0].id;
                this.gif.gif_url = data.response[0].gif_url;
                this.gif.titre = data.response[0].titre;
                this.gif.date = data.response[0].date;
                this.gif.prenom = data.response[0].prenom;
                this.gif.nom = data.response[0].nom;
                this.gif.utilisateurId = data.response[0].utilisateurId;
                this.gif.photo_profil = data.response[0].photo_profil;
            })
        })

        fetch(`http://localhost:3000/api/commentaires/gif/${gifId}`)
        .then(response => {
            response.json()
            .then (data => {
                this.comments = data.response;
            })
        })

    },
    methods: {
        createNewComment(){

            let newCommentaire = {
                texte: this.newComment.texte,
                utilisateurId: this.newComment.utilisateurId,
                gifId: this.gif.id
            };

            fetch('http://localhost:3000/api/commentaires', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newCommentaire)
                })
            .then(response => {
                if(response.ok === true){
                    location.reload();
                }else{
                    response.json()
                    .then (erreur => {
                        alert(Object.values(erreur));
                    })
                }
            })
            .catch (erreur => {
                console.log(erreur);
            })
        },
        deleteComment(commentId){
            fetch(`http://localhost:3000/api/commentaires/${commentId}`, {
               method: 'DELETE',
            })
            .then(response => response.json())
                .then (() => location.reload()) 
        },  
    }
}

</script>

<style>

.font_size{
    font-size: 11px;
}

</style>