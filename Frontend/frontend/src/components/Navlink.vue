<template>

<nav class="navbar navbar-expand-md navbar-light bg-success">
  <div class="container-fluid">
    <router-link class="navbar-brand text-start w-75" to="/accueil"><img class="logo" src="logo/icon-left-font.png" alt="logo_groupomania"></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggler">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link text-light" to="/utilisateurs">Utilisateurs</router-link>
        </li>
        <li class="nav-item" @click="reload()">
          <router-link class="nav-link text-light" :to="{ path: 'profil', query: { userId: id }}">Profil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" to="/connexion">Deconnexion</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
export default{
  name: 'Navlink',
  data: function(){
    return{
      id: 0
    }
  },
  beforeMount(){
    this.id = sessionStorage.userId;
  },
  methods:{
    reload(){
      location.reload();
    }
  },
}
</script>

<style>

.logo{
  width: 65%;
  }
  
@media all and (min-width : 768px)  {
    .logo{
        width: 40%;
    }
        
}
</style>