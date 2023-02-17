import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {   
     path:"/",
    name:"Home",
    component:HomeView
  },
  {   
   path:"/weather/:state/:city",
   name:"city",
   component:CityView
 }

  ]
})

export default router
