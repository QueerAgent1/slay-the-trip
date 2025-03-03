<script setup>
import { ref, computed, onMounted } from 'vue'
import { getImage } from '../services/imageService'

const episodes = ref([
  {
    id: 1,
    title: "Redefining Luxury Travel for the LGBTQ+ Community",
    description: "In our debut episode, we explore how luxury travel is evolving to create more authentic and inclusive experiences for LGBTQ+ travelers worldwide.",
    image: "",
    duration: "48:22",
    date: "May 15, 2024",
    featured: true,
    guests: ["Maria Johnson, CEO of QueerLuxe Travel", "David Chen, Luxury Travel Analyst"],
    topics: ["Luxury Travel Trends", "LGBTQ+ Inclusivity", "Future of Travel"]
  },
  {
    id: 2,
    title: "The Art of Queer Hospitality with Iconic Hotelier Aman Resorts",
    description: "We sit down with the leadership team at Aman Resorts to discuss their approach to creating safe, luxurious spaces for LGBTQ+ travelers.",
    image: "",
    duration: "52:17",
    date: "May 1, 2024",
    featured: true,
    guests: ["Sarah Williams, Global Director at Aman Resorts", "Thomas Lee, Hospitality Consultant"],
    topics: ["Luxury Hospitality", "Staff Training", "Guest Experience"]
  },
  {
    id: 3,
    title: "Destination Deep Dive: Japan's Evolving LGBTQ+ Travel Scene",
    description: "From Tokyo's vibrant Shinjuku Ni-chome district to traditional ryokans embracing diversity, we explore Japan's complex relationship with LGBTQ+ tourism.",
    image: "",
    duration: "55:43",
    date: "April 15, 2024",
    featured: true,
    guests: ["Yuki Tanaka, Tokyo-based Travel Writer", "Alex Morgan, Cultural Anthropologist"],
    topics: ["Japan", "Cultural Context", "Traditional vs. Modern"]
  },
  {
    id: 4,
    title: "The Business of Pride: Marketing to LGBTQ+ Luxury Travelers",
    description: "We examine the fine line between authentic representation and rainbow washing in luxury travel marketing.",
    image: "",
    duration: "46:19",
    date: "April 1, 2024",
    featured: false,
    guests: ["Jordan Rivera, Marketing Director", "Sam Taylor, LGBTQ+ Travel Influencer"],
    topics: ["Marketing", "Authenticity", "Brand Partnerships"]
  },
  {
    id: 5,
    title: "Adventure Travel Through a Queer Lens",
    description: "From Antarctica expeditions to Amazon rainforest treks, we discuss how adventure travel companies are creating inclusive experiences for LGBTQ+ thrill-seekers.",
    image: "",
    duration: "50:28",
    date: "March 15, 2024",
    featured: false,
    guests: ["Elena Rodriguez, Adventure Guide", "Michael Kim, Travel Photographer"],
    topics: ["Adventure Travel", "Remote Destinations", "Group Dynamics"]
  },
  {
    id: 6,
    title: "Culinary Journeys: LGBTQ+ Chefs Changing Luxury Dining",
    description: "We speak with renowned queer chefs about food as cultural expression and how culinary experiences are central to luxury travel.",
    image: "",
    duration: "53:51",
    date: "March 1, 2024",
    featured: false,
    guests: ["Chef James Beard, Restaurant Owner", "Lisa Chen, Food Critic"],
    topics: ["Culinary Tourism", "Food Culture", "Fine Dining"]
  }
])

const latestEpisode = ref({
  title: "Navigating the World as a Transgender Traveler",
  description: "Award-winning travel writer and transgender advocate Jamie Windust shares insights on navigating luxury travel spaces as a trans person, from documentation challenges to finding affirming experiences.",
  fullDescription: "In this powerful conversation, Jamie Windust takes us through their experiences in luxury travel spaces around the world, discussing both challenges and triumphs. We explore practical advice for transgender travelers, how luxury brands can better serve the trans community, and Jamie's favorite destinations that offer both opulence and authentic inclusion.",
  image: "",
  duration: "58:42",
  date: "May 22, 2024",
  guests: ["Jamie Windust, Travel Writer and Advocate", "Dr. Rebecca Torres, Tourism Researcher"],
  topics: ["Transgender Travel", "Documentation", "Inclusive Luxury", "Global Perspectives"]
})

const platforms = [
  { name: "Spotify", url: "#", icon: "🎧" },
  { name: "Apple Podcasts", url: "#", icon: "🎧" },
  { name: "Google Podcasts", url: "#", icon: "🎧" },
  { name: "Amazon Music", url: "#", icon: "🎧" },
  { name: "YouTube", url: "#", icon: "🎧" }
]

const imagesLoaded = ref(false)

const loadImages = async () => {
  try {
    // Load episode images
    for (let i = 0; i < episodes.value.length; i++) {
      episodes.value[i].image = await getImage('podcast', i)
    }
    
    // Load latest episode image
    latestEpisode.value.image = await getImage('featured', 2)
    
    imagesLoaded.value = true
  } catch (error) {
    console.error('Error loading podcast images:', error)
  }
}

const featuredEpisodes = computed(() => {
  return episodes.value.filter(episode => episode.featured)
})

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="podcast">
    <div class="container">
      <div class="section-header">
        <h2>The QueerLuxe Travel Podcast</h2>
        <p>Conversations with industry leaders, travelers, and experts exploring the intersection of luxury travel and LGBTQ+ experiences</p>
      </div>
      
      <div class="podcast-platforms">
        <p>Listen on:</p>
        <div class="platform-links">
          <a 
            v-for="platform in platforms" 
            :key="platform.name"
            :href="platform.url"
            class="platform-link"
          >
            <span class="platform-icon">{{ platform.icon }}</span>
            <span>{{ platform.name }}</span>
          </a>
        </div>
      </div>
      
      <!-- Latest Episode -->
      <div class="latest-episode">
        <img :src="latestEpisode.image" alt="Latest Episode">
        <div class="episode-content">
          <div class="episode-badge">LATEST EPISODE</div>
          <h2>{{ latestEpisode.title }}</h2>
          <p>{{ latestEpisode.description }}</p>
          <p>{{ latestEpisode.fullDescription }}</p>
          
          <div class="episode-details">
            <div class="detail-item">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">{{ latestEpisode.duration }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Released:</span>
              <span class="detail-value">{{ latestEpisode.date }}</span>
            </div>
          </div>
          
          <div class="episode-guests">
            <h4>Featuring:</h4>
            <ul>
              <li v-for="(guest, index) in latestEpisode.guests" :key="index">{{ guest }}</li>
            </ul>
          </div>
          
          <div class="episode-topics">
            <h4>Topics:</h4>
            <div class="topic-tags">
              <span 
                v-for="(topic, index) in latestEpisode.topics" 
                :key="index"
                class="topic-tag"
              >
                {{ topic }}
              </span>
            </div>
          </div>
          
          <div class="episode-actions">
            <a href="#" class="btn">
              <span>▶️</span> Play Episode
            </a>
            <a href="#" class="btn btn-secondary">
              <span>📝</span> View Transcript
            </a>
          </div>
        </div>
      </div>
      
      <!-- Featured Episodes -->
      <div class="featured-episodes">
        <h3>Featured Episodes</h3>
        <div class="episodes-carousel">
          <div 
            v-for="episode in featuredEpisodes" 
            :key="episode.id"
            class="episode-card featured"
          >
            <div class="episode-image">
              <img :src="episode.image" :alt="episode.title">
              <div class="episode-duration">{{ episode.duration }}</div>
            </div>
            <div class="episode-content">
              <h4>{{ episode.title }}</h4>
              <p>{{ episode.description }}</p>
              <div class="episode-meta">
                <span class="episode-date">{{ episode.date }}</span>
              </div>
              <div class="episode-guests-preview">
                <span>With: {{ episode.guests.join(', ') }}</span>
              </div>
              <div class="episode-actions">
                <a href="#" class="play-button">
                  <span>▶️</span> Play
                </a>
                <a href="#" class="more-link">More Info</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- All Episodes -->
      <div class="all-episodes">
        <h3>All Episodes</h3>
        <div class="episodes-list">
          <div 
            v-for="episode in episodes" 
            :key="episode.id"
            class="episode-list-item"
          >
            <div class="episode-number">{{ episode.id.toString().padStart(2, '0') }}</div>
            <div class="episode-image">
              <img :src="episode.image" :alt="episode.title">
            </div>
            <div class="episode-info">
              <h4>{{ episode.title }}</h4>
              <p>{{ episode.description }}</p>
              <div class="episode-meta">
                <span class="episode-date">{{ episode.date }}</span>
                <span class="episode-duration">{{ episode.duration }}</span>
              </div>
            </div>
            <div class="episode-actions">
              <a href="#" class="play-button">
                <span>▶️</span>
              </a>
            </div>
          </div>
        </div>
        
        <div class="load-more">
          <button class="btn btn-secondary">Load More Episodes</button>
        </div>
      </div>
      
      <!-- Podcast Newsletter -->
      <div class="podcast-newsletter">
        <div class="newsletter-content">
          <h3>Never Miss an Episode</h3>
          <p>Subscribe to our podcast newsletter to get new episodes delivered to your inbox, plus exclusive bonus content and early access to special episodes.</p>
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
.podcast {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.podcast-platforms {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.podcast-platforms p {
  font-weight: 600;
  margin: 0;
}

.platform-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.platform-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border-radius: 30px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.platform-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.platform-icon {
  font-size: 1.2rem;
}

/* Latest Episode */
.latest-episode {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.latest-episode img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.episode-content {
  padding: 3rem;
}

.episode-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.episode-content h2 {
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

.episode-content p {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.8;
}

.episode-details {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.detail-label {
  font-weight: 600;
  color: #666;
}

.episode-guests, .episode-topics {
  margin-bottom: 1.5rem;
}

.episode-guests h4, .episode-topics h4 {
  margin-bottom: 0.5rem;
  color: #666;
}

.episode-guests ul {
  padding-left: 1.5rem;
}

.episode-guests li {
  margin-bottom: 0.5rem;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  background-color: #f5f5f5;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.episode-actions {
  display: flex;
  gap: 1rem;
}

.btn span {
  margin-right: 0.5rem;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

/* Featured Episodes */
.featured-episodes {
  margin-bottom: 4rem;
}

.featured-episodes h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.episodes-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #e52e71 #f5f5f5;
}

.episodes-carousel::-webkit-scrollbar {
  height: 8px;
}

.episodes-carousel::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.episodes-carousel::-webkit-scrollbar-thumb {
  background: #e52e71;
  border-radius: 4px;
}

.episode-card {
  min-width: 350px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.episode-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.episode-image {
  position: relative;
}

.episode-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.episode-duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.episode-card .episode-content {
  padding: 1.5rem;
}

.episode-card h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.episode-card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.episode-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.episode-guests-preview {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.episode-card .episode-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.play-button {
  display: flex;
  align-items: center;
  color: #e52e71;
  font-weight: 600;
  text-decoration: none;
}

.more-link {
  color: #666;
  text-decoration: none;
}

/* All Episodes */
.all-episodes {
  margin-bottom: 4rem;
}

.all-episodes h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.episodes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.episode-list-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.episode-list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.episode-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e52e71;
  min-width: 40px;
}

.episode-list-item .episode-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.episode-list-item .episode-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.episode-info {
  flex: 1;
}

.episode-list-item h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.episode-list-item p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-list-item .episode-meta {
  display: flex;
  gap: 1rem;
}

.episode-list-item .episode-actions {
  display: flex;
  align-items: center;
}

.episode-list-item .play-button {
  width: 40px;
  height: 40px;
  background-color: #e52e71;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.episode-list-item .play-button:hover {
  transform: scale(1.1);
  background-color: #ff8a00;
}

.load-more {
  text-align: center;
  margin-top: 2rem;
}

/* Podcast Newsletter */
.podcast-newsletter {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.newsletter-content h3 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.newsletter-content p {
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
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
  .latest-episode {
    grid-template-columns: 1fr;
  }
  
  .latest-episode img {
    height: 400px;
  }
  
  .episode-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .episode-list-item {
    flex-wrap: wrap;
  }
  
  .episode-number {
    min-width: auto;
    margin-right: 1rem;
  }
  
  .episode-list-item .episode-image {
    order: -1;
    width: 100%;
    height: 200px;
  }
  
  .episode-info {
    width: 100%;
  }
  
  .episode-list-item .episode-actions {
    margin-left: auto;
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
  .podcast-platforms {
    flex-direction: column;
  }
  
  .platform-links {
    justify-content: center;
  }
  
  .episode-content {
    padding: 1.5rem;
  }
  
  .episode-content h2 {
    font-size: 1.8rem;
  }
  
  .podcast-newsletter {
    padding: 2rem 1rem;
  }
}
</style>