<template>

    <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>

    <section class="container-fluid">

        <div class="row">

            <div class=" card col-12 col-md-6 border border-dark mx-auto my-3 justify-content-center">
                <div class="align-self-center text-center my-3">
                    <img class="w-50 border border-dark" :src="user.photoProfil" alt="photo_profil">
                </div>
                <div class="align-self-center" v-show="user.id === visitor.id">
                    <input type="file" id="bouton" @change="getNewPhoto" accept="image/png, image/jpeg, image/jpg, image/gif"><label for="bouton" id="fileupload">Modifier la photo de profil</label>
                </div>
                <div class="card-body text-center my-1 py-0">
                    <p class="fw-bold m-1">Prénom : {{ user.prenom }}</p>
                    <p class="fw-bold m-1">Nom: {{ user.nom }}</p>
                    <p class="fw-bold m-1">Email : {{ user.email }}</p>
                    <p class="fw-bold m-1">Incrit le {{ user.dateInscription }}</p>
                </div>
                <div class="text-center my-1 p" v-show="user.id === visitor.id || visitor.admin === 1">
                    <bouton @click="deleteUser(`${user.id}`)" intitule="Supprimer le compte"/>
                </div>
            </div>
        </div>

    </section>

    <section class="container-fluid">

        <div class="row">
            <div class="text-center">
                <p class="fs-4">Derniers commentaires posté</p>
            </div>
        </div>

        <div v-for="comment in comments" :key="comment.id" class="row my-3">

            <div class="card col12 col-md-6 mx-auto border border-dark p-0">
                <div class="card-body px-1 py-0">
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex m-1">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <p class="m-0"> Le {{ comment.date }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="fw-bold">"{{ comment.commentaire }}"</p>
                    </div>
                    <div class="text-center" v-show="user.id === visitor.id || visitor.admin === 1">
                        <bouton @click="deleteComment(`${comment.id}`)" intitule="Supprimer"/>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

    <section class="container-fluid">

        <div class="row">
            <div class="text-center">
                <p class="fs-4">Derniers posts</p>
            </div>
        </div>

        <div v-for="gif in gifs" :key="gif.id"  class="row my-3">

            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <router-link :to="{ path: 'post', query: {gifId: `${gif.id}`}}" class="border border-dark mt-5 text-center  w-75 mx-auto"><img class="w-100" src="/logo/Zelda-Top10-35ans.jpg" alt="photo_gif"></router-link>
                <div class="card-body m-0">
                   <p class="text-center fs-4 fw-bold">{{ gif.titre }}</p>
                    <div class="d-flex text-align p-0 border border-dark rounded">
                        <div class="flex m-1">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <p class="m-0 fst-italic">{{ user.prenom }} {{ user.nom }}</p>
                            <p class="m-0">{{ gif.date }}</p>
                        </div>
                    </div>

                    <div class="text-center mt-3" v-show="user.id === visitor.id || visitor.admin === 1">
                        <bouton @click="deleteGif(`${gif.id}`)" intitule="Supprimer"/>
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
        user: {
            id: 0,
            prenom: "",
            nom: "",
            email: "",
            dateInscription: "",
            photoProfil: "/logo/2nix140800145.jpg"
        },

        visitor:{
            id: parseInt(sessionStorage.getItem('userId')),
            admin: parseInt(sessionStorage.getItem('admin')),
        },

        comments: [],

        gifs: [],
    }
},
    beforeMount(){
      let url = window.location.href;
      let recupUserId = url.split("=");
      let userId = recupUserId[1];
      const token = sessionStorage.getItem('token');

      fetch(`http://localhost:3000/api/users/${userId}`)
      .then (response => {
        response.json()
        .then(data => {
            this.user.id = data.response[0].id;
            this.user.prenom = data.response[0].prenom;
            this.user.nom = data.response[0].nom;
            this.user.email = data.response[0].email;
            this.user.dateInscription = data.response[0].date_inscription;
            this.user.photo = data.response[0].photo_profil;  
          })
      })

    fetch(`http://localhost:3000/api/commentaires/user/${userId}`,{
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }),
    })
    .then (response => {
        response.json()
        .then(data => {
            this.comments = data.response;
        })
    })

    fetch(`http://localhost:3000/api/gifs/user/${userId}`, {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }),
    })
    .then( response => {
        response.json()
        .then(data => {
            this.gifs = data.response;
        })
    })
  },
  methods: {
        deleteGif(gifId){
            fetch(`http://localhost:3000/api/gifs/${gifId}`, {
               method: 'DELETE',
            })
            .then(response => response.json())
                .then (() => location.reload()) 
        }, 

        deleteComment(commentId){
            fetch(`http://localhost:3000/api/commentaires/${commentId}`, {
               method: 'DELETE',
            })
            .then(response => response.json())
                .then (() => location.reload()) 
        },

        deleteUser(userId){
            fetch(`http://localhost:3000/api/users/${userId}`, {
               method: 'DELETE',
            })
            .then(response => response.json())
            .then(() => {
                window.location.href = "http://localhost:8080/#/inscription";
            })
        },

        getNewPhoto(event){            
            const gif = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(gif);
            reader.onload = event => {
                this.user.photoProfil = event.target.result;
            }
        } 
    }
}

</script>

<style>
.font-size{
    font-size: 11px
}

#fileupload{
    border-radius: 15px;
    border: 2px solid black;
    background-color: #fd2d01;
    padding: 10px;
    font-weight: bolder;
    font-size: 14px;
    color: white;
    cursor: pointer;
}

#bouton{
    display: none;
}

.photo_utilisateur{
    object-fit: cover;
    height: 60px;
    
}



</style>