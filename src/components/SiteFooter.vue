<script setup>
const currentYear = new Date().getFullYear()

const footerLinks = {
  destinations: [
    { name: 'Europe', url: '#' },
    { name: 'Asia', url: '#' },
    { name: 'Americas', url: '#' },
    { name: 'Africa', url: '#' },
    { name: 'Oceania', url: '#' }
  ],
  experiences: [
    { name: 'Honeymoons', url: '#' },
    { name: 'Set-Jetting', url: '#/set-jetting' },
    { name: 'Culinary', url: '#/culinary' },
    { name: 'Fashion', url: '#/fashion' },
    { name: 'Wellness', url: '#' }
  ],
  company: [
    { name: 'About The House', url: '#' },
    { name: 'Our Manifesto', url: '#' },
    { name: 'The Family', url: '#' },
    { name: 'Join Us', url: '#' },
    { name: 'Press Moments', url: '#' }
  ],
  shop: [
    { name: 'Travel Essentials', url: '#/gear' },
    { name: 'Pride Collection', url: '#/gear?category=pride' },
    { name: 'Luxury Luggage', url: '#/gear?category=luggage' },
    { name: 'Fierce Accessories', url: '#/gear?category=accessories' },
    { name: 'Gift Cards', url: '#' }
  ]
}

const socialLinks = [
  { name: 'Facebook', url: '#', icon: 'facebook' },
  { name: 'Instagram', url: '#', icon: 'instagram' },
  { name: 'Twitter', url: '#', icon: 'twitter' },
  { name: 'Pinterest', url: '#', icon: 'pinterest' }
]
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-container">
        <div class="footer-column">
          <h3>Destinations</h3>
          <ul>
            <li v-for="link in footerLinks.destinations" :key="link.name">
              <a :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Experiences</h3>
          <ul>
            <li v-for="link in footerLinks.experiences" :key="link.name">
              <a :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>The House</h3>
          <ul>
            <li v-for="link in footerLinks.company" :key="link.name">
              <a :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>The Boutique</h3>
          <ul>
            <li v-for="link in footerLinks.shop" :key="link.name">
              <a :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
          
          <div class="social-links">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" :title="social.name">
              <!-- Using placeholder for social icons -->
              <span>{{ social.icon.charAt(0).toUpperCase() }}</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} QueerLuxe Travel. All rights reserved.</p>
        <p>Serving opulence and inclusion in luxury travel since 2018. <span class="tagline">And that's the tea, darling!</span></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer */
footer {
  background-color: #222;
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #ff8a00, #e52e71, #6a11cb);
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}

.footer-column h3 {
  color: #e52e71;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 15px;
}

.footer-column ul li::before {
  content: '✨';
  position: absolute;
  left: 0;
  color: #e52e71;
  font-size: 0.7rem;
}

.footer-column ul li a {
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-column ul li a:hover {
  color: white;
  transform: translateX(5px);
  display: inline-block;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-links a {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 40px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-links a:hover {
  transform: translateY(-5px) rotate(10deg);
  box-shadow: 0 10px 15px rgba(229, 46, 113, 0.3);
}

.footer-bottom {
  margin-top: 3rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}

.tagline {
  font-style: italic;
  color: #e52e71;
  font-weight: 600;
}

@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style>