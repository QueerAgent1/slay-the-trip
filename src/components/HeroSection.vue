<script setup>
import { ref, onMounted, reactive } from 'vue'

const slides = [
  { id: 1, image: '/api/placeholder/1600/900' },
  { id: 2, image: '/api/placeholder/1600/900' },
  { id: 3, image: '/api/placeholder/1600/900' }
]

const currentSlide = ref(0)
const isLoaded = ref(false)
const mousePosition = reactive({ x: 0, y: 0 })
const particlesActive = ref(true)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const handleMouseMove = (event) => {
  mousePosition.x = event.clientX / window.innerWidth
  mousePosition.y = event.clientY / window.innerHeight
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  
  // Start slideshow after a short delay
  setTimeout(() => {
    isLoaded.value = true
  }, 500)
  
  // Set up slideshow interval
  setInterval(nextSlide, 5000)
  
  // Clean up event listener
  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <section class="hero" :class="{ 'loaded': isLoaded }">
    <!-- Parallax Background -->
    <div class="parallax-bg" :style="{
      transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
    }"></div>
    
    <!-- Slideshow -->
    <div class="slideshow">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id" 
        class="slide" 
        :class="{ 'active': index === currentSlide }"
        :style="{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`}"
      ></div>
    </div>
    
    <!-- Animated Gradient Overlay -->
    <div class="gradient-overlay"></div>
    
    <!-- Particles Effect -->
    <div v-if="particlesActive" class="particles">
      <div v-for="n in 50" :key="n" class="particle"></div>
    </div>
    
    <!-- Content -->
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Luxury Travel Where You <span class="highlight">SLAY</span>, Not Just Stay</h1>
        <p>Serving Opulent LGBTQ+ Travel Realness Since 2018, Darling!</p>
        <a href="#" class="btn glow-effect">Strut Into Your Fantasy Getaway</a>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow-scroll">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.hero {
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.hero.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* Parallax Background */
.parallax-bg {
  position: absolute;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  background: url('/api/placeholder/1800/1000') center center;
  background-size: cover;
  z-index: -2;
  filter: blur(8px) brightness(0.7);
  transition: transform 0.1s ease-out;
}

/* Slideshow */
.slideshow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 1.5s ease-in-out, transform 2s ease-in-out;
}

.slide.active {
  opacity: 1;
  transform: scale(1);
}

/* Gradient Overlay */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(229, 46, 113, 0.3), rgba(255, 138, 0, 0.3));
  z-index: -1;
  animation: gradientShift 15s infinite alternate;
}

@keyframes gradientShift {
  0% {
    opacity: 0.4;
    background-position: 0% 50%;
  }
  50% {
    opacity: 0.6;
    background-position: 100% 50%;
  }
  100% {
    opacity: 0.4;
    background-position: 0% 50%;
  }
}

/* Particles Effect */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  display: block;
  background-color: rgba(255, 255, 255, 0.8);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  animation: particles 20s linear infinite;
}

.particle:nth-child(even) {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  width: 4px;
  height: 4px;
}

.particle:nth-child(3n) {
  animation-delay: 0s;
  animation-duration: 25s;
  left: 10%;
}

.particle:nth-child(3n+1) {
  animation-delay: 4s;
  animation-duration: 18s;
  left: 20%;
}

.particle:nth-child(3n+2) {
  animation-delay: 6s;
  animation-duration: 22s;
  left: 30%;
}

.particle:nth-child(5n) {
  animation-delay: 8s;
  animation-duration: 15s;
  left: 40%;
}

.particle:nth-child(5n+1) {
  animation-delay: 0s;
  animation-duration: 20s;
  left: 50%;
}

.particle:nth-child(5n+2) {
  animation-delay: 5s;
  animation-duration: 25s;
  left: 60%;
}

.particle:nth-child(7n) {
  animation-delay: 10s;
  animation-duration: 30s;
  left: 70%;
}

.particle:nth-child(7n+1) {
  animation-delay: 2s;
  animation-duration: 18s;
  left: 80%;
}

.particle:nth-child(7n+2) {
  animation-delay: 8s;
  animation-duration: 22s;
  left: 90%;
}

@keyframes particles {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  animation: fadeInUp 1.2s ease-out;
}

.hero-title .highlight {
  color: #ff8a00;
  position: relative;
  display: inline-block;
  animation: colorPulse 3s infinite alternate;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-title .highlight::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.5s ease-out 0.5s;
  animation: underlineExpand 1s ease-out 0.8s forwards;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 1.2s ease-out 0.3s forwards;
  font-style: italic;
}

.hero .btn {
  opacity: 0;
  animation: fadeInUp 1.2s ease-out 0.6s forwards;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Glow Effect for Button */
.glow-effect {
  position: relative;
  overflow: hidden;
}

.glow-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glow-effect:hover::before {
  opacity: 1;
  animation: glowRotate 1.5s infinite linear;
}

@keyframes glowRotate {
  0% {
    transform: rotate(45deg) translateX(-30%);
  }
  100% {
    transform: rotate(45deg) translateX(30%);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: fadeIn 1s ease-out 2s forwards;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 2s infinite;
}

.arrow-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.arrow-scroll span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
  margin: -5px;
  animation: scrollArrow 2s infinite;
}

.arrow-scroll span:nth-child(2) {
  animation-delay: 0.2s;
}

.arrow-scroll span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes underlineExpand {
  from {
    transform: scaleX(0);
    transform-origin: bottom right;
  }
  to {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}

@keyframes colorPulse {
  0% {
    color: #ff8a00;
  }
  50% {
    color: #e52e71;
  }
  100% {
    color: #ff8a00;
  }
}

@keyframes scrollWheel {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}

@keyframes scrollArrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .particles {
    display: none;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .scroll-indicator {
    display: none;
  }
}
</style>