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
                    <label for="titre_post">Titre</label><br>
                    <input class="my-3" type="text" id="titre_post" name="titre_post" size="50"><br>
                    <div class="d-flex justify-content-around">
                        <button class="my-3 params_button flex" type="submit">Publiez</button>
                        <div class="flex align-self-center">
                            <input type="file" id="bouton" accept="image/png, image/jpeg, image/jpg, image/gif"><label for="bouton" id="fileupload">Choisir un gif</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <section v-for="post in posts" :key="post.id" class="container-fluid my-3">

        <div class="row">
            
            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <a class= "border border-dark mt-5 text-center -5 w-75 mx-auto" href="post.html"><img class="w-100" src="/logo/Zelda-Top10-35ans.jpg" alt="photo_gif"></a>
                <div class="card-body m-0">
                   <p class="text-center fs-4 fw-bold">{{ post.titre }}</p>
                   <div class="d-flex text-align p-0 border border-dark rounded">
                        <div class="flex box_flex_photo m-1  w-0">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <router-link :to="{ path: 'profil', query: {id: `${post.utilisateurId}` }}"><p class="m-0 font_size">{{ post.prenom }} {{ post.nom }}</p></router-link>
                            <p class="m-0 font_size">le {{ post.date }}</p>
                        </div>
                   </div>
                    <div class="d-flex justify-content-around">
                        <div>
                            <bouton intitule="Commenter"/>
                        </div>
                        <div class="align-self-center">
                            <bouton intitule="Supprimer"/>
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

export default {
    name: 'Nav',
    components: {
        Navlink,
        bouton
    },
    data: function(){
        return{
            posts: [],
            url:""
            
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
    }
}


</script>

<style>

.fas{
    margin: 150px;
}

.box_flex_photo{
width: 20%;
}

.photo_utilisateur{
    object-fit: cover;
    height: 60px;
    
}

.font_size{
    font-size: 11px;
}

@media all and (min-width: 768px){
    .font_size{
        font-size: 12px;
    } 
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
    color: white;
    cursor: pointer;
}



</style>