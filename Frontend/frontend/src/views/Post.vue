<template>
        <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>

    <section class="container-fluid my-3">

        <div class="row">
            
            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <a class= "border border-dark mt-5 text-center -5 w-75 mx-auto" href="post.html"><img class="w-100" src="/logo/Zelda-Top10-35ans.jpg" alt="photo_gif"></a>
                <div class="card-body m-0">
                    <p class="text-center fs-4 fw-bold">Les 35 ans de Zelda</p>
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex m-1  w-0">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <p class="m-0 font_size">Omer Simpson</p>
                            <p class="m-0 font_size">Le 19/07/2021 à 17:05</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <section class="container-fluid">

        <div class="row">
            <div class="text-center">
                <h1>Commentaires</h1>
            </div>
        </div>

        <div class="row my-3">
            <div class="card col12 col-md-6 mx-auto">
                <div class="card-body">
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex m-1  w-0">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <p class="m-0 font_size">Omer Simpson</p>
                            <p class="m-0 font_size">Le 19/07/2021 à 17:05</p>
                        </div>
                    </div>
                    <div>
                        <p>Superbe anniversaire !!!!!</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row my-3">
            <div class="card col-12 col-md-6 mx-auto">
                <div class="card-body">
                    <label for="commentaire">Commentaire : </label><br>
                    <textarea class="w-100" name="commentaire" id="commentaire" cols="60" rows="4">Ecrivez votre commentaire</textarea><br>
                    <button class=" my-3 params_button" type="submit">Publier</button>
                </div>
            </div>
        </div>

    </section>

</template>

<script>
import Navlink from '@/components/Navlink.vue'

export default {
  name: 'Nav',
  components: {
    Navlink
  }
}

</script>

<style>

</style>