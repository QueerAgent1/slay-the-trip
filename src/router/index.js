import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookingSystem from '../components/BookingSystem.vue'
import Forums from '../components/Forums.vue'
import TravelGuides from '../components/TravelGuides.vue'
import FashionPackages from '../components/FashionPackages.vue'
import CulinaryExperiences from '../components/CulinaryExperiences.vue'
import SetJettingExperiences from '../components/SetJettingExperiences.vue'
import TravelGear from '../components/TravelGear.vue'
import Magazine from '../components/Magazine.vue'
import Podcast from '../components/Podcast.vue'
import ForaPerks from '../components/ForaPerks.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingSystem
  },
  {
    path: '/forums',
    name: 'Forums',
    component: Forums
  },
  {
    path: '/guides',
    name: 'Guides',
    component: TravelGuides
  },
  {
    path: '/fashion',
    name: 'Fashion',
    component: FashionPackages
  },
  {
    path: '/culinary',
    name: 'Culinary',
    component: CulinaryExperiences
  },
  {
    path: '/set-jetting',
    name: 'SetJetting',
    component: SetJettingExperiences
  },
  {
    path: '/gear',
    name: 'TravelGear',
    component: TravelGear
  },
  {
    path: '/magazine',
    name: 'Magazine',
    component: Magazine
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: Podcast
  },
  {
    path: '/vip-perks',
    name: 'ForaPerks',
    component: ForaPerks
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 }
  }
})

export default router