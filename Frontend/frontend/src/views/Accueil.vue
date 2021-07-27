<template>

    <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>
   
    <section class="container-fluid my-3">

        <div class="row">

            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <div class="card-body text-center p-3">
                    <div class="border border-dark w-75 text-center mx-auto my-2">
                       <img id="newgif" class="w-100" :src="gifUrl"> 
                    </div>
                    <label for="titre_post">Titre</label><br>
                    <input class="my-3" type="text" id="titre_post" name="titre_post"><br>
                    <div class="d-flex justify-content-around">
                        <div class="flex align-self-center">
                            <bouton @click="createNewGif" intitule="Publier"/>
                        </div>
                        <div class="flex align-self-center">
                            <input type="file" id="bouton" @change="getNewGif" accept="image/png, image/jpeg, image/jpg, image/gif"><label for="bouton" id="fileupload">Choisir un gif</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <section v-for="post in posts" :key="post.id" class="container-fluid my-3">

        <div class="row">
            
            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <router-link :to="{ path: 'post', query: {gifId: `${post.id}`}}" class="border border-dark mt-5 text-center  w-75 mx-auto"><img class="w-100" src="/logo/Zelda-Top10-35ans.jpg" alt="photo_gif"></router-link>
                <div class="card-body m-0">
                   <p class="text-center fs-4 fw-bold">{{ post.titre }}</p>
                   <div class="d-flex text-align p-0 border border-dark rounded">
                        <div class="flex m-1">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class=" flex w-100 align-self-center">
                            <router-link :to="{ path: 'profil', query: {userId: `${post.utilisateurId}`}}"><p class="m-0 fst-italic">{{ post.prenom }} {{ post.nom }}</p></router-link>
                            <p class="m-0">le {{ post.date }}</p>
                        </div>
                   </div>
                    <div class="d-flex justify-content-around">
                        <div>
                            <bouton @click="commentGif(`${post.id}`)" intitule="Commenter"/>
                        </div>
                        <div class="align-self-center" v-show="post.utilisateurId === visitor.id || visitor.admin === true">
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
            gifUrl: "/logo/cloud-computing-1990405_640.png",
            visitor: {
                id: parseInt(sessionStorage.getItem('userId')),
                admin: false,
            }
            
        }
    },
    beforeMount(){

        fetch('http://localhost:3000/api/gifs')
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
            fetch(`http://localhost:3000/api/gifs/${gifId}`, {
               method: 'DELETE',
            })
            .then(response => response.json())
                .then (() => location.reload()) 
        },
        getNewGif(event){            
            const gif = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(gif);
            reader.onload = event => {
                this.gifUrl = event.target.result;
            }
        }         
    }  
}


</script>

<style>

.box_flex_photo{
width: 20%;
}

.photo_utilisateur{
    object-fit: cover;
    height: 60px;
    
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
}



</style>