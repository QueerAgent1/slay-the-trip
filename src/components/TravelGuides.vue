<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedRegion = ref('all')
const selectedType = ref('all')

const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asia' },
  { id: 'americas', name: 'Americas' },
  { id: 'africa', name: 'Africa' },
  { id: 'oceania', name: 'Oceania' }
]

const guideTypes = [
  { id: 'all', name: 'All Guides' },
  { id: 'city', name: 'City Guides' },
  { id: 'country', name: 'Country Guides' },
  { id: 'experience', name: 'Experience Guides' },
  { id: 'safety', name: 'Safety Guides' }
]

const guides = [
  {
    id: 1,
    title: 'The Ultimate LGBTQ+ Guide to Barcelona',
    description: 'Discover the vibrant gay scene, LGBTQ+ friendly neighborhoods, and must-visit attractions in this Mediterranean gem.',
    image: '/api/placeholder/400/250',
    region: 'europe',
    type: 'city',
    featured: true,
    readTime: '12 min read',
    author: 'Miguel S.',
    date: 'May 10, 2024'
  },
  {
    id: 2,
    title: 'Luxury Ryokan Experience in Japan',
    description: 'Navigate the traditional world of Japanese ryokans with our guide to LGBTQ+ friendly luxury accommodations.',
    image: '/api/placeholder/400/250',
    region: 'asia',
    type: 'experience',
    featured: false,
    readTime: '9 min read',
    author: 'Yuki T.',
    date: 'April 22, 2024'
  },
  {
    id: 3,
    title: 'LGBTQ+ Travel Safety in Southeast Asia',
    description: 'Essential safety tips and cultural insights for LGBTQ+ travelers exploring Southeast Asian destinations.',
    image: '/api/placeholder/400/250',
    region: 'asia',
    type: 'safety',
    featured: false,
    readTime: '15 min read',
    author: 'Sarah L.',
    date: 'March 18, 2024'
  },
  {
    id: 4,
    title: 'South Africa: A Luxury LGBTQ+ Safari Guide',
    description: 'From Cape Town to Kruger National Park, discover South Africa\'s most welcoming luxury safari experiences.',
    image: '/api/placeholder/400/250',
    region: 'africa',
    type: 'country',
    featured: true,
    readTime: '18 min read',
    author: 'David M.',
    date: 'May 5, 2024'
  },
  {
    id: 5,
    title: 'Greek Island Hopping for LGBTQ+ Couples',
    description: 'The ultimate guide to planning a romantic Greek island adventure with the most LGBTQ+ friendly destinations.',
    image: '/api/placeholder/400/250',
    region: 'europe',
    type: 'experience',
    featured: false,
    readTime: '14 min read',
    author: 'Elena K.',
    date: 'April 12, 2024'
  },
  {
    id: 6,
    title: 'New York City: LGBTQ+ Luxury Travel Guide',
    description: 'Explore the best of NYC from luxury hotels to exclusive experiences in the city that never sleeps.',
    image: '/api/placeholder/400/250',
    region: 'americas',
    type: 'city',
    featured: true,
    readTime: '16 min read',
    author: 'James W.',
    date: 'May 15, 2024'
  },
  {
    id: 7,
    title: 'Navigating LGBTQ+ Laws Around the World',
    description: 'A comprehensive guide to understanding LGBTQ+ legal protections and challenges in popular travel destinations.',
    image: '/api/placeholder/400/250',
    region: 'all',
    type: 'safety',
    featured: false,
    readTime: '20 min read',
    author: 'Dr. Amara J.',
    date: 'March 30, 2024'
  },
  {
    id: 8,
    title: 'Australia\'s LGBTQ+ Friendly Luxury Resorts',
    description: 'From the Great Barrier Reef to Sydney, discover Australia\'s most welcoming luxury accommodations.',
    image: '/api/placeholder/400/250',
    region: 'oceania',
    type: 'country',
    featured: false,
    readTime: '11 min read',
    author: 'Thomas B.',
    date: 'April 8, 2024'
  },
  {
    id: 9,
    title: 'Belmond Pride Train Journey Experience',
    description: 'Experience the glamour of the golden age of travel on this exclusive Pride-themed luxury train journey through Europe\'s most scenic routes.',
    image: '/api/placeholder/400/250',
    region: 'europe',
    type: 'experience',
    featured: true,
    readTime: '15 min read',
    author: 'Christopher L.',
    date: 'May 18, 2024'
  },
  {
    id: 10,
    title: 'Four Seasons Yacht Club Mediterranean Cruise',
    description: 'Set sail on an intimate luxury yacht experience with personalized service and exclusive access to hidden Mediterranean coves and beaches.',
    image: '/api/placeholder/400/250',
    region: 'europe',
    type: 'experience',
    featured: true,
    readTime: '13 min read',
    author: 'Sophia R.',
    date: 'May 20, 2024'
  },
  {
    id: 11,
    title: 'Four Seasons Private Jet World Tour Guide',
    description: 'Circle the globe in ultimate luxury aboard a custom-designed Four Seasons private jet with curated LGBTQ+ friendly experiences at each destination.',
    image: '/api/placeholder/400/250',
    region: 'all',
    type: 'experience',
    featured: true,
    readTime: '22 min read',
    author: 'Jonathan P.',
    date: 'May 22, 2024'
  }
]

const featuredGuides = computed(() => {
  return guides.filter(guide => guide.featured)
})

const filteredGuides = computed(() => {
  return guides.filter(guide => {
    const matchesRegion = selectedRegion.value === 'all' || guide.region === selectedRegion.value || guide.region === 'all'
    const matchesType = selectedType.value === 'all' || guide.type === selectedType.value
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          guide.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesRegion && matchesType && matchesSearch
  })
})

const setRegion = (regionId) => {
  selectedRegion.value = regionId
}

const setType = (typeId) => {
  selectedType.value = typeId
}
</script>

<template>
  <section class="travel-guides">
    <div class="container">
      <div class="section-header">
        <h2>LGBTQ+ Travel Guides</h2>
        <p>Expert advice and insider tips for your next luxury adventure</p>
      </div>
      
      <!-- Featured Guides Carousel -->
      <div class="featured-guides">
        <h3>Featured Guides</h3>
        <div class="featured-guides-carousel">
          <div 
            v-for="guide in featuredGuides" 
            :key="guide.id"
            class="featured-guide"
          >
            <img :src="guide.image" :alt="guide.title">
            <div class="featured-guide-content">
              <span class="guide-type">{{ guideTypes.find(type => type.id === guide.type)?.name }}</span>
              <h4>{{ guide.title }}</h4>
              <p>{{ guide.description }}</p>
              <div class="guide-meta">
                <span class="read-time">{{ guide.readTime }}</span>
                <span class="author">By {{ guide.author }}</span>
              </div>
              <a href="#" class="btn">Read Guide</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Guide Search and Filters -->
      <div class="guide-filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search guides..."
          >
        </div>
        
        <div class="filter-options">
          <div class="filter-group">
            <span class="filter-label">Region:</span>
            <div class="filter-buttons">
              <button 
                v-for="region in regions" 
                :key="region.id"
                :class="{ 'active': selectedRegion === region.id }"
                @click="setRegion(region.id)"
              >
                {{ region.name }}
              </button>
            </div>
          </div>
          
          <div class="filter-group">
            <span class="filter-label">Guide Type:</span>
            <div class="filter-buttons">
              <button 
                v-for="type in guideTypes" 
                :key="type.id"
                :class="{ 'active': selectedType === type.id }"
                @click="setType(type.id)"
              >
                {{ type.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Guide Grid -->
      <div class="guides-grid">
        <div 
          v-for="guide in filteredGuides" 
          :key="guide.id"
          class="guide-card"
        >
          <div class="guide-image">
            <img :src="guide.image" :alt="guide.title">
            <span class="guide-type">{{ guideTypes.find(type => type.id === guide.type)?.name }}</span>
          </div>
          <div class="guide-content">
            <h4>{{ guide.title }}</h4>
            <p>{{ guide.description }}</p>
            <div class="guide-meta">
              <span class="read-time">{{ guide.readTime }}</span>
              <span class="date">{{ guide.date }}</span>
            </div>
            <a href="#" class="read-more">Read Guide →</a>
          </div>
        </div>
      </div>
      
      <!-- Newsletter for Guides -->
      <div class="guides-newsletter">
        <div class="newsletter-content">
          <h3>Get Travel Guides Delivered to Your Inbox</h3>
          <p>Subscribe to receive our latest guides, exclusive travel tips, and destination insights.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email address">
            <button class="btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.travel-guides {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

/* Featured Guides */
.featured-guides {
  margin-bottom: 3rem;
}

.featured-guides h3 {
  margin-bottom: 1.5rem;
}

.featured-guides-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #e52e71 #f5f5f5;
}

.featured-guides-carousel::-webkit-scrollbar {
  height: 8px;
}

.featured-guides-carousel::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.featured-guides-carousel::-webkit-scrollbar-thumb {
  background: #e52e71;
  border-radius: 4px;
}

.featured-guide {
  min-width: 600px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.featured-guide img {
  width: 250px;
  height: 100%;
  object-fit: cover;
}

.featured-guide-content {
  padding: 2rem;
  flex: 1;
}

.guide-type {
  display: inline-block;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.featured-guide-content h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.featured-guide-content p {
  color: #666;
  margin-bottom: 1.5rem;
}

.guide-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

/* Guide Filters */
.guide-filters {
  margin-bottom: 3rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-box input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-label {
  font-weight: 600;
  min-width: 100px;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.filter-buttons button.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
}

/* Guide Grid */
.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.guide-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.guide-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.guide-image {
  position: relative;
}

.guide-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.guide-image .guide-type {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.guide-content {
  padding: 1.5rem;
}

.guide-content h4 {
  margin-bottom: 0.75rem;
}

.guide-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  color: #e52e71;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #ff8a00;
}

/* Guides Newsletter */
.guides-newsletter {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.newsletter-content h3 {
  margin-bottom: 1rem;
}

.newsletter-content p {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex-grow: 1;
  padding: 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-family: 'Poppins', sans-serif;
}

.newsletter-form button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-weight: 600;
}

@media (max-width: 992px) {
  .featured-guide {
    min-width: 100%;
    flex-direction: column;
  }
  
  .featured-guide img {
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
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
}

@media (max-width: 576px) {
  .guides-grid {
    grid-template-columns: 1fr;
  }
  
  .guides-newsletter {
    padding: 2rem 1rem;
  }
}
</style>