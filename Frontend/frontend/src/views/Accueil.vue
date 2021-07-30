<template>

    <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>
   
    <section class="container-fluid my-3">

        <div class="row">

            <div class=" shadow-lg my-5 card col-12 col-md-6 border-2 mx-auto colorgroupomania">
                <div class="card-body text-center p-3">
                    <div class="border border-dark w-75 text-center mx-auto my-2">
                       <img id="newgif" class="w-100 photo_gif" :src="gifFile"> 
                    </div>
                    <label for="titre_post">Titre</label><br>
                    <input class="my-3" type="text" id="titre_post" name="titre_post" v-model="newGif.titre"><br>
                    <div class="d-flex justify-content-around">
                        <div class="flex align-self-center">
                            <bouton @click="uploadNewGif()" intitule="Publier"/>
                        </div>
                        <div class="flex align-self-center">
                            <input type="file" ref="file" id="bouton" @change="getNewGif" accept="image/png, image/jpeg, image/jpg, image/gif"><label for="bouton" id="fileupload" >Choisir un gif</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <section v-for="post in posts" :key="post.id" class="container-fluid my-3">

        <div class="row">
            
            <div class="shadow-lg my-5 card col-12 col-md-6 mx-auto border-2 colorgroupomania">
                <router-link :to="{ path: 'post', query: {gifId: `${post.id}`}}" class="border border-dark mt-5 text-center  w-75 mx-auto"><img class="w-100 photo_gif" :src="post.gif_url" alt="photo_gif"></router-link>
                <div class="card-body m-0">
                   <p class="text-center fs-4 fw-bold">{{ post.titre }}</p>
                   <div class="d-flex text-align p-0 border border-dark rounded">
                        <div class="flex m-1">
                            <img class="photo_utilisateur  p-0 m-0 border border-dark rounded" :src="post.photo_profil" alt="photo_profil">
                        </div>
                        <div class=" flex w-100 align-self-center">
                            <router-link class="link" :to="{ path: 'profil', query: {userId: `${post.utilisateurId}`}}"><p class=" colorgroupomanialink m-0 fst-italic">{{ post.prenom }} {{ post.nom }}</p></router-link>
                            <p class="m-0">le {{ post.date }}</p>
                        </div>
                   </div>
                    <div class="d-flex justify-content-around">
                        <div>
                            <bouton @click="commentGif(`${post.id}`)" intitule="Commenter"/>
                        </div>
                        <div class="align-self-center" v-show="post.utilisateurId === visitor.id || visitor.admin === 1">
                            <bouton @click="deleteGif(`${post.id}`)" intitule="Supprimer"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

</template>

<script>
import Navlink from '@/components/Navlink.vue'
import bouton from '@/components/Button.vue'
import router from '@/router/index.js'

export default {
    name: 'Accueil',
    components: {
        Navlink,
        bouton
    },
    data: function(){
        return{
            posts: [],
            gifFile: "/logo/cloud-computing-1990405_640.png",
            visitor: {
                id: parseInt(sessionStorage.getItem('userId')),
                admin: parseInt(sessionStorage.getItem('admin')),
            },
            newGif: {
                utilisateurId: parseInt(sessionStorage.getItem('userId')),
                titre: "",
                gifFile: null
            }
            
        }
    },
    beforeMount(){
        const token = sessionStorage.getItem('token');

        fetch('http://localhost:3000/api/gifs',{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }),
        })
        .then(response =>{
            response.json()
            .then (data => {
                this.posts = data.response;
            })
        })
    },
    methods:{
        commentGif(gifId){
           router.push({ path: 'post', query: { gifId: gifId }}); 
        },
        
        deleteGif(gifId){
            const token = sessionStorage.getItem('token');

            fetch(`http://localhost:3000/api/gifs/${gifId}`, {
               method: 'DELETE',
                headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }),
            })
            .then(response => response.json())
                .then (() => location.reload()) 
        },

        getNewGif(event){            
            const gif = event.target.files[0];
            this.newGif.gifFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(gif);
            reader.onload = event => {
                this.gifFile = event.target.result;
            }       
        },

        uploadNewGif(){

            const newGif = new FormData()
            newGif.append('utilisateurId', this.newGif.utilisateurId)
            newGif.append('titre', this.newGif.titre)
            newGif.append('myGif', this.newGif.gifFile)
            
            
            fetch('http://localhost:3000/api/gifs', {
                method: "POST",
                body: newGif
            })
            .then(response => {
                response.json()
                .then( () => location.reload())
    
            })
        }        
    }  
}


</script>

<style>


.photo_utilisateur{
    object-fit: contain;
    height: 60px; 
    width: 60px 
}

photo_gif{
    object-fit: contain;
    height: 300px;
}

#bouton{
    display: none;
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
    transition: 300ms ease-in-out;
    
}

#fileupload:hover{
    transition: 300ms ease-in-out;
    transform: scale(1.1);
}

.colorgroupomania{
  border-color: #fd2d01;

}

.link{
    text-decoration: none;
    color: #fd2d01;
}

.effet:hover{
    transform: scale(1.1);
    transition: 300ms ease-in-out;
}



</style>