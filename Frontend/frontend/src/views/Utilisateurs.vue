<template>
        <header class="container-fluid">

        <div class="row bg-success">

            <Navlink/>

        </div>

    </header>

    <section class="container-fluid">

        <div class="row col-12 col-md-10 mx-auto my-3 justify-content-center">

            <div v-for="user in users" :key="user.id" class="card col-12 col-md-3 text-center border border-secondary  m-3 p-0">
                <div class="card-body d-flex">
                    <div class="flex w-25">
                        <img class="w-100 photo_utilisateur" src="/logo/omer.png" alt="photo_utilisateur">
                    </div>
                    <div class="flex w-75 align-self-center fw-bolder fs-5 m-0 p-0 ">
                        <router-link :to="{ path: 'profil', query: {userId: `${user.id}`}}"><p class="m-0 font_size">{{ user.prenom }} {{ user.nom }}</p></router-link>
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
  },
  data: function (){
      return{
          users: [],

      }
  },
  beforeMount(){
      fetch('http://localhost:3000/api/users')
      .then(response => {
          response.json()
          .then(data => {
              this.users = data.response
          })
      })
  }

}

</script>

<style>

</style>