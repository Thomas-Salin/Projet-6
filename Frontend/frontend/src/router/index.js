import { createRouter, createWebHashHistory } from 'vue-router'
import Inscription from '../views/Inscription.vue'

const routes = [
  {
    path: '/',
    name:'Inscription',
    component: Inscription,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/connexion',
    name: 'Connexion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Connexion.vue'),
  },
  {
    path:'/accueil',
    name:'Accueil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Accueil.vue')
  },
  {
    path:'/post',
    name:'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue')
  },
  {
    path:'/profil/',
    name:'Profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue')
  },
  {
    path:'/utilisateurs',
    name:'Utilisateurs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Utilisateurs.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
