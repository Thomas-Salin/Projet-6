<template>
        <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>

    <section class="container-fluid my-3">

        <div class="row">
            
            <div class="card col-12 col-md-6 mx-auto border-2 colorgroupomania">
                <router-link :to="{ path: 'post', query: {gifId: `${gif.id}`}}" class="border border-dark mt-5 text-center  w-75 mx-auto"><img class="w-100" :src="gif.gif_url" alt="photo_gif"></router-link>
                <div class="card-body m-0">
                    <p class="text-center fs-4 fw-bold">{{ gif.titre }}</p>
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex m-1">
                            <img class="photo_utilisateur p-0 my-auto border border-dark rounded" :src="gif.photo_profil" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <router-link class="link" :to="{ path: 'profil', query: {userId: `${gif.utilisateurId}`}}"><p class="m-0 fs-6 fst-italic">{{ gif.prenom }} {{ gif.nom }}</p></router-link>
                            <p class="m-0">Le {{ gif.date }}</p>                                
                        </div>
                    </div>
                    <div class="align-self-center" v-show="gif.utilisateurId === visitor.id || visitor.admin === 1">
                        <bouton @click="deleteGif(`${gif.id}`)" intitule="Supprimer"/>
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
            <div class="card col-12 col-md-6 mx-auto border-2 colorgroupomania">
                <div class="card-body ">
                    <label for="commentaire">Votre commentaire : </label><br>
                    <textarea class="w-100" name="commentaire" id="commentaire" cols="60" rows="4" v-model="newComment.texte">Ecrivez votre commentaire</textarea><br>
                    <bouton @click="createNewComment()"  intitule="Publier"/>
                </div>
            </div>
        </div>

        <div v-for="commentaire in comments" :key="commentaire.id" class="row my-3">
            <div class="card col12 col-md-6 mx-auto border-2 colorgroupomania">
                <div class="card-body px-1 py-0">
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex m-1">
                            <img class="photo_utilisateur p-0 m-0 border border-dark rounded" :src="commentaire.photo_profil" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <router-link class="link" :to="{ path: 'profil', query: {userId: `${commentaire.utilisateur_id}`}}"><p class="m-0 fst-italic">{{ commentaire.prenom_commentaire }} {{ commentaire.nom_commentaire }}</p></router-link>
                            <p class="m-0">{{ commentaire.date_commentaire }}</p>
                            
                            
                        </div>
                    </div>
                    <div>
                        <p class="fw-bold">"{{ commentaire.commentaire }}"</p>
                    </div>
                    <div class="text-center" v-show="commentaire.utilisateur_id === visitor.id || visitor.admin === 1">
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
            },

            visitor:{
                id: parseInt(sessionStorage.getItem("userId")),
                admin: parseInt(sessionStorage.getItem('admin')),
            }

        }
    },
    beforeMount(){
        let url = window.location.href;
        let recupId = url.split('=');
        let gifId = recupId[1];
        const token = sessionStorage.getItem('token');

        fetch(`http://localhost:3000/api/gifs/${gifId}`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }),
        })
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

        fetch(`http://localhost:3000/api/commentaires/gif/${gifId}`,{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }),
        })
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

            const token = sessionStorage.getItem('token');

            fetch('http://localhost:3000/api/commentaires', {              
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                }),
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
            const token = sessionStorage.getItem('token');
            fetch(`http://localhost:3000/api/commentaires/${commentId}`, {
               method: 'DELETE',
               headers: new Headers({
                   'Authorization': 'Bearer '+token,
               })
            })
            .then(response => response.json())
                .then (() => location.reload()) 
        },

        deleteGif(gifId){
            const token = sessionStorage.getItem('token');

            fetch(`http://localhost:3000/api/gifs/${gifId}`, {
                method: 'DELETE',
                headers: new Headers({
                   'Authorization': 'Bearer '+token,
                })

                })
            .then(response => response.json())
                .then (() => window.location.href = 'http://localhost:8080/#/accueil') 
        },  
    }
}

</script>

<style>
.photo_utilisateur{
    object-fit: contain;
    height: 60px; 
    width: 60px;  
}

.colorgroupomania{
    border-color: #fd2d01;
}


.link{
    text-decoration: none;
    color: #E42701;
}


</style>

