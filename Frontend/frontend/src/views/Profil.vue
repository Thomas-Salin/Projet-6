<template>

       <header class="container-fluid">

            <Navlink/>

    </header>

    <section class="container-fluid">

        <div class="row">

            <div class=" card col-12 col-md-6 border border-dark mx-auto my-3 justify-content-center">
                <div class="align-self-center text-center my-3">
                    <img class="w-50 border border-dark" src="/logo/2nix140800145.jpg" alt="photo_profil">
                </div>
                <div class="align-self-center">
                    <button class="params_button" type="submit">Modifier la photo de profil</button>
                </div>
                <div class="card-body text-center">
                    <p class="fw-bold">Prénom : Omer</p>
                    <p class="fw-bold">Nom: Simpson</p>
                    <p class="fw-bold">Email : ohpunaise@gmail.com</p>
                    <p class="fw-bold">Inscrit depuis le 20/07/2021</p>
                </div>
                <div class="text-center mb-3">
                    <button class="params_button" type="submit">Supprimer le compte</button>
                </div>
            </div>
        </div>

    </section>

    <section class="container-fluid">

        <div class="row">
            <div class="text-center">
                <h1>Derniers commentaires posté</h1>
            </div>
        </div>

        <div class="row my-3">

            <div class="card col12 col-md-6 mx-auto border border-dark">
                <div class="card-body">
                    <div class="d-flex text-align p-0 border border-dark rounded my-3">
                        <div class="flex box_flex_photo m-1">
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
                    <div class="text-center">
                        <button class="params_button" type="submit"><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

    <section class="container-fluid">

        <div class="row">
            <div class="text-center">
                <h1>Derniers posts</h1>
            </div>
        </div>

        <div class="row my-3">

            <div class="card col-12 col-md-6 mx-auto border border-secondary">
                <a class= "border border-dark mt-5 text-center -5 w-75 mx-auto" href="gifcomment.html"><img class="w-100" src="/logo/Zelda-Top10-35ans.jpg" alt="photo_gif"></a>
                <div class="card-body m-0">
                   <p class="text-center fs-4 fw-bold">Les 35 ans de Zelda</p>
                    <div class="d-flex text-align p-0 border border-dark rounded">
                        <div class="flex box_flex_photo m-1  w-0">
                            <img class="photo_utilisateur w-100 p-0 m-0 border border-dark rounded" src="/logo/omer.png" alt="photo_profil">
                        </div>
                        <div class="w-100 align-self-center">
                            <p class="m-0 font_size">Omer Simpson</p>
                            <p class="m-0 font_size">Le 19/07/2021 à 17:05</p>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <button class="params_button" type="submit"><i class="far fa-trash-alt"></i></button>
                    </div>
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