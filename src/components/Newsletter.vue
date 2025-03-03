<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

const subscribe = () => {
  if (email.value && validateEmail(email.value)) {
    subscribed.value = true
    email.value = ''
  }
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
</script>

<template>
  <section class="newsletter">
    <div class="container">
      <h2>Join Our <span class="highlight">FABULOUS</span> House of LGBTQ+ Luxury Travelers</h2>
      <p>Subscribe to receive exclusive tea, travel inspiration that will leave you GAGGING, and insider tips for your next opulent adventure!</p>
      
      <div v-if="!subscribed" class="newsletter-form">
        <input 
          type="email" 
          v-model="email" 
          placeholder="Enter your email, darling" 
          required
        >
        <button @click="subscribe">YAAAS, SUBSCRIBE!</button>
      </div>
      
      <div v-else class="success-message">
        <h3>WERK! Thanks for subscribing!</h3>
        <p>We're absolutely LIVING to share our exclusive travel experiences with you. Get ready to SLAY your next vacation!</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Newsletter */
.newsletter {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  text-align: center;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.newsletter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/api/placeholder/1600/900') center center;
  background-size: cover;
  opacity: 0.1;
  z-index: 0;
}

.newsletter .container {
  position: relative;
  z-index: 1;
}

.newsletter h2 {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.highlight {
  color: #ff8a00;
  font-style: italic;
  position: relative;
  display: inline-block;
}

.newsletter p {
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
}

.newsletter-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  position: relative;
}

.newsletter-form input {
  flex-grow: 1;
  padding: 1.2rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
}

.newsletter-form button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(229, 46, 113, 0.3);
}

.success-message {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite alternate;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
}

.success-message h3 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #ff8a00;
}

@media (max-width: 768px) {
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
  
  .newsletter h2 {
    font-size: 2rem;
  }
}
</style>