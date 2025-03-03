<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Experiences' },
  { id: 'cooking-classes', name: 'Cooking Classes' },
  { id: 'food-tours', name: 'Food Tours' },
  { id: 'wine-experiences', name: 'Wine Experiences' },
  { id: 'michelin-dining', name: 'Michelin Dining' }
]

const culinaryExperiences = [
  {
    id: 1,
    title: "Tuscan Villa Cooking Retreat",
    description: "Immerse yourself in the art of Italian cuisine with a week-long cooking retreat at a private Tuscan villa, complete with market visits and wine tastings.",
    price: "From $5,800",
    image: "/api/placeholder/400/250",
    category: "cooking-classes",
    featured: true,
    highlights: [
      "Daily cooking classes with a renowned chef",
      "Private market tours in Florence and Siena",
      "Wine tastings at prestigious vineyards",
      "Luxury villa accommodation with pool",
      "Truffle hunting expedition"
    ],
    dates: "April-October"
  },
  {
    id: 2,
    title: "Tokyo Michelin Star Journey",
    description: "Experience the pinnacle of Japanese cuisine with exclusive reservations at Tokyo's most coveted Michelin-starred restaurants and private chef interactions.",
    price: "From $7,900",
    image: "/api/placeholder/400/250",
    category: "michelin-dining",
    featured: true,
    highlights: [
      "Reservations at 5 Michelin-starred restaurants",
      "Private meetings with master chefs",
      "Tsukiji fish market private tour",
      "Sake tasting with master sommelier",
      "Luxury accommodation at Aman Tokyo"
    ],
    dates: "Year-round"
  },
  {
    id: 3,
    title: "Bordeaux Wine Château Experience",
    description: "Discover the world's most prestigious wine region with private tastings at exclusive châteaux, helicopter vineyard tours, and blending sessions with master vintners.",
    price: "From $9,200",
    image: "/api/placeholder/400/250",
    category: "wine-experiences",
    featured: true,
    highlights: [
      "Private access to 8 premier Grand Cru estates",
      "Helicopter tour of Bordeaux vineyards",
      "Create your own custom wine blend",
      "Luxury château accommodation",
      "Michelin-starred dining experiences"
    ],
    dates: "May-September"
  },
  {
    id: 4,
    title: "Barcelona Tapas Masterclass",
    description: "Learn the art of Spanish tapas from a celebrated chef while exploring Barcelona's vibrant food markets and historic culinary districts.",
    price: "From $3,800",
    image: "/api/placeholder/400/250",
    category: "cooking-classes",
    featured: false,
    highlights: [
      "Hands-on tapas cooking classes",
      "La Boqueria market tour with chef",
      "Cava and wine pairings",
      "Luxury boutique hotel in Gothic Quarter",
      "Private tapas crawl through local neighborhoods"
    ],
    dates: "March-November"
  },
  {
    id: 5,
    title: "Napa Valley Wine & Culinary Immersion",
    description: "Experience California's premier wine region with private tastings, cooking classes featuring farm-to-table ingredients, and hot air balloon rides over the vineyards.",
    price: "From $6,500",
    image: "/api/placeholder/400/250",
    category: "wine-experiences",
    featured: false,
    highlights: [
      "VIP tastings at exclusive wineries",
      "Farm-to-table cooking workshops",
      "Hot air balloon sunrise experience",
      "Luxury spa resort accommodation",
      "Dinner at The French Laundry"
    ],
    dates: "April-October"
  },
  {
    id: 6,
    title: "Bangkok Street Food Safari",
    description: "Discover the vibrant flavors of Thai cuisine with a private chef guide taking you through Bangkok's best street food districts and exclusive cooking workshops.",
    price: "From $4,200",
    image: "/api/placeholder/400/250",
    category: "food-tours",
    featured: false,
    highlights: [
      "Private street food tours with celebrity chef",
      "Thai cooking masterclasses",
      "Floating market excursion",
      "Luxury riverside hotel accommodation",
      "Exclusive dinner at Gaggan Anand"
    ],
    dates: "November-March"
  },
  {
    id: 7,
    title: "Paris Patisserie Masterclass",
    description: "Perfect the art of French pastry with expert-led workshops in Paris, visiting the city's finest patisseries and learning from master pastry chefs.",
    price: "From $4,900",
    image: "/api/placeholder/400/250",
    category: "cooking-classes",
    featured: true,
    highlights: [
      "Daily pastry workshops with expert pâtissiers",
      "Behind-the-scenes at top Parisian bakeries",
      "Chocolate tasting and tempering class",
      "Luxury accommodation near Place Vendôme",
      "VIP dinner at Alain Ducasse au Plaza Athénée"
    ],
    dates: "Year-round"
  },
  {
    id: 8,
    title: "Basque Country Culinary Expedition",
    description: "Explore the gastronomic wonders of Spain's Basque Country, from pintxos bars in San Sebastian to Michelin-starred restaurants and traditional cider houses.",
    price: "From $5,600",
    image: "/api/placeholder/400/250",
    category: "food-tours",
    featured: true,
    highlights: [
      "Guided pintxos tours with local experts",
      "Reservations at 3 Michelin-starred restaurants",
      "Traditional Basque cooking workshop",
      "Luxury boutique hotel in San Sebastian",
      "Private tour of Rioja wine region"
    ],
    dates: "April-October"
  }
]

const featuredExperience = {
  title: "World Culinary Grand Tour",
  description: "The ultimate global gastronomic journey for discerning food lovers, featuring the finest dining experiences across three continents.",
  additionalInfo: "This 24-day luxury culinary odyssey takes you from Tokyo to Paris, San Sebastian, and Tuscany with private jet transportation, Michelin-starred dining experiences, and exclusive cooking sessions with world-renowned chefs.",
  price: "From $95,000 per person",
  image: "/api/placeholder/600/600",
  dates: "Limited departures in May and September"
}

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filteredExperiences = computed(() => {
  if (activeCategory.value === 'all') {
    return culinaryExperiences
  }
  return culinaryExperiences.filter(exp => exp.category === activeCategory.value)
})

const featuredExperiences = computed(() => {
  return culinaryExperiences.filter(exp => exp.featured)
})
</script>

<template>
  <section class="culinary-experiences">
    <div class="container">
      <div class="section-header">
        <h2>Culinary Journeys & Gourmet Experiences</h2>
        <p>Extraordinary gastronomic adventures celebrating global cuisine and LGBTQ+ inclusive food cultures</p>
      </div>
      
      <!-- Featured Experience -->
      <div class="featured-experience">
        <img :src="featuredExperience.image" alt="Featured Culinary Experience">
        <div class="featured-content">
          <h3>SIGNATURE CULINARY JOURNEY</h3>
          <h2>{{ featuredExperience.title }}</h2>
          <p>{{ featuredExperience.description }}</p>
          <p>{{ featuredExperience.additionalInfo }}</p>
          <div class="featured-footer">
            <div class="featured-details">
              <div class="price">{{ featuredExperience.price }}</div>
              <div class="dates">{{ featuredExperience.dates }}</div>
            </div>
            <a href="#" class="btn">Request Details</a>
          </div>
        </div>
      </div>
      
      <!-- Experience Categories -->
      <div class="experience-categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="experience-category"
          :class="{ 'active': activeCategory === category.id }"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </div>
      </div>
      
      <!-- Featured Experiences Carousel -->
      <div class="featured-experiences">
        <h3>Featured Culinary Experiences</h3>
        <div class="featured-experiences-carousel">
          <div 
            v-for="exp in featuredExperiences" 
            :key="exp.id"
            class="featured-experience-card"
          >
            <div class="experience-image">
              <img :src="exp.image" :alt="exp.title">
            </div>
            <div class="experience-content">
              <h4>{{ exp.title }}</h4>
              <p>{{ exp.description }}</p>
              <div class="experience-highlights">
                <h5>Experience Highlights:</h5>
                <ul>
                  <li v-for="(highlight, index) in exp.highlights.slice(0, 3)" :key="index">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
              <div class="experience-footer">
                <div class="experience-price">{{ exp.price }}</div>
                <a href="#" class="btn">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- All Experiences Grid -->
      <div class="experiences-grid">
        <div 
          v-for="exp in filteredExperiences" 
          :key="exp.id"
          class="experience-card"
        >
          <div class="experience-image">
            <img :src="exp.image" :alt="exp.title">
            <div class="experience-dates">{{ exp.dates }}</div>
          </div>
          <div class="experience-content">
            <h4>{{ exp.title }}</h4>
            <p>{{ exp.description }}</p>
            <div class="experience-footer">
              <div class="experience-price">{{ exp.price }}</div>
              <a href="#" class="btn">View Details</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Culinary Concierge CTA -->
      <div class="culinary-concierge">
        <div class="concierge-content">
          <h3>Private Culinary Concierge</h3>
          <p>Looking for a custom gastronomic adventure? Our culinary specialists can create bespoke experiences with exclusive access to chefs, restaurants, and food producers around the world.</p>
          <a href="#" class="btn">Contact Our Culinary Concierge</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.culinary-experiences {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* Featured Experience */
.featured-experience {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.featured-experience img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-content {
  padding: 3rem;
}

.featured-content h3 {
  color: #e52e71;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  letter-spacing: 2px;
}

.featured-content h2 {
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

.featured-content p {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.8;
}

.featured-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.featured-details {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e52e71;
  margin-bottom: 0.5rem;
}

.dates {
  font-size: 0.9rem;
  color: #666;
}

/* Experience Categories */
.experience-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.experience-category {
  padding: 0.75rem 1.5rem;
  background-color: white;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.experience-category.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  box-shadow: 0 5px 15px rgba(229, 46, 113, 0.3);
}

/* Featured Experiences Carousel */
.featured-experiences {
  margin-bottom: 4rem;
}

.featured-experiences h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.featured-experiences-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #e52e71 #f5f5f5;
}

.featured-experiences-carousel::-webkit-scrollbar {
  height: 8px;
}

.featured-experiences-carousel::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.featured-experiences-carousel::-webkit-scrollbar-thumb {
  background: #e52e71;
  border-radius: 4px;
}

.featured-experience-card {
  min-width: 600px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-experience-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.featured-experience-card .experience-image {
  width: 250px;
  flex-shrink: 0;
}

.featured-experience-card .experience-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-experience-card .experience-content {
  padding: 2rem;
  flex: 1;
}

.experience-highlights {
  margin: 1.5rem 0;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.experience-highlights h5 {
  margin-bottom: 1rem;
  color: #333;
}

.experience-highlights ul {
  padding-left: 1.5rem;
}

.experience-highlights li {
  margin-bottom: 0.5rem;
  color: #555;
}

.experience-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.experience-price {
  font-weight: 700;
  color: #e52e71;
  font-size: 1.2rem;
}

/* Experiences Grid */
.experiences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.experience-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.experience-image {
  position: relative;
}

.experience-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.experience-dates {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
}

.experience-content {
  padding: 1.5rem;
}

.experience-content h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.experience-content p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Culinary Concierge */
.culinary-concierge {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.concierge-content h3 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.concierge-content p {
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

@media (max-width: 992px) {
  .featured-experience {
    grid-template-columns: 1fr;
  }
  
  .featured-experience img {
    height: 400px;
  }
  
  .featured-experience-card {
    min-width: 100%;
    flex-direction: column;
  }
  
  .featured-experience-card .experience-image {
    width: 100%;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .experiences-grid {
    grid-template-columns: 1fr;
  }
  
  .featured-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .featured-footer .btn {
    width: 100%;
    text-align: center;
  }
  
  .experience-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .experience-footer .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .featured-content {
    padding: 2rem;
  }
  
  .featured-content h2 {
    font-size: 2rem;
  }
  
  .culinary-concierge {
    padding: 2rem;
  }
}
</style>