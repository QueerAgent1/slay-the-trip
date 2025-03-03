<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import TrustIndicators from './components/TrustIndicators.vue'
import FeaturedExperiences from './components/FeaturedExperiences.vue'
import FeaturedHotels from './components/FeaturedHotels.vue'
import Newsletter from './components/Newsletter.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="app-container">
    <SiteHeader />
    <main>
      <HeroSection />
      <TrustIndicators />
      <FeaturedExperiences />
      <FeaturedHotels />
      <Newsletter />
    </main>
    <SiteFooter />
  </div>
</template>

<style>
/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');

/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: #333;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Typography */
h1, h2, h3, h4 {
  font-family: 'Playfair Display', serif;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

/* Layout */
.container {
  width: 85%;
  max-width: 1400px;
  margin: 0 auto;
}

section {
  padding: 5rem 0;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(229, 46, 113, 0.2);
}

/* Responsive */
@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .featured-experience {
    grid-template-columns: 1fr;
  }
  
  .hotels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .experiences-grid {
    grid-template-columns: 1fr;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .newsletter-form button {
    border-radius: 4px;
  }
  
  nav {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .nav-links {
    margin-top: 1rem;
    flex-direction: column;
  }
  
  .nav-links li {
    margin: 0.5rem 0;
    margin-left: 0;
  }
  
  .hotels-grid {
    grid-template-columns: 1fr;
  }
  
  .hotel-categories {
    flex-wrap: wrap;
  }
}

@media (max-width: 576px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
  
  .partners {
    justify-content: center;
  }
  
  .partner-logos {
    gap: 1rem;
  }
  
  .partner-logo {
    width: 140px;
    height: 80px;
  }
}
</style>