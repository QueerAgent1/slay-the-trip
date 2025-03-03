<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const navigateTo = (path) => {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <a href="#" class="logo" @click.prevent="navigateTo('/')">Queer<span>Luxe</span> <span class="tagline">Darling</span></a>
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav-links" :class="{ 'active': mobileMenuOpen }">
          <li><a href="#" @click.prevent="navigateTo('/')">Slay at Home</a></li>
          <li><a href="#" @click.prevent="navigateTo('/guides')">Fierce Guides</a></li>
          <li><a href="#" @click.prevent="navigateTo('/fashion')">Serve Looks</a></li>
          <li><a href="#" @click.prevent="navigateTo('/culinary')">Taste, Honey</a></li>
          <li><a href="#" @click.prevent="navigateTo('/set-jetting')">Set the Scene</a></li>
          <li><a href="#" @click.prevent="navigateTo('/gear')">The Essentials</a></li>
          <li><a href="#" @click.prevent="navigateTo('/forums')">The House</a></li>
          <li><a href="#" @click.prevent="navigateTo('/booking')">Book It!</a></li>
          <li><a href="#" class="btn">My Sanctuary</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Header */
header {
  padding: 1.5rem 0;
  position: absolute;
  width: 100%;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: baseline;
}

.logo span {
  color: #e52e71;
}

.logo .tagline {
  font-size: 1rem;
  margin-left: 0.5rem;
  font-style: italic;
  color: #ff8a00;
  font-weight: 400;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  position: relative;
}

.nav-links a:hover {
  color: #e52e71;
  transform: translateY(-2px);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.mobile-menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  .nav-links li {
    margin: 1rem 0;
    margin-left: 0;
  }
}
</style>