<script setup>
import { ref, computed, onMounted } from 'vue'
import { getImage } from '../services/imageService'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Hotels' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asia' },
  { id: 'americas', name: 'Americas' },
  { id: 'gay-exclusive', name: 'Gay-Exclusive' }
]

const hotels = ref([
  {
    id: 1,
    name: "Axel Hotel Barcelona",
    location: "Barcelona, Spain",
    rating: "4.7/5",
    features: ["Gay-Owned", "Rooftop Pool", "Urban"],
    description: "Barcelona's iconic gay hotel located in the heart of the Eixample district, featuring a stunning rooftop pool, spa, and vibrant social scene.",
    price: "From $189/night",
    image: "",
    category: "europe"
  },
  {
    id: 2,
    name: "Hotel Gaythering",
    location: "Miami Beach, USA",
    rating: "4.5/5",
    features: ["Gay-Owned", "Bar", "Spa"],
    description: "Miami's premiere gay hotel offering industrial-chic rooms, an award-winning gay bar, and self-service spa in the heart of South Beach.",
    price: "From $225/night",
    image: "",
    category: "americas"
  },
  {
    id: 3,
    name: "W Maldives",
    location: "Maldives",
    rating: "4.9/5",
    features: ["LGBTQ+ Certified", "Overwater Villas", "Private Island"],
    description: "A private island paradise where all couples are welcomed with open arms. Featuring stunning overwater villas, world-class dining, and unparalleled marine experiences.",
    price: "From $950/night",
    image: "",
    category: "asia"
  },
  {
    id: 4,
    name: "The London EDITION",
    location: "London, UK",
    rating: "4.8/5",
    features: ["LGBTQ+ Ally", "Michelin Restaurant", "Central"],
    description: "An iconic London property blending historical elegance with contemporary design. A proud supporter of LGBTQ+ causes and host of Pride celebrations.",
    price: "From $475/night",
    image: "",
    category: "europe"
  },
  {
    id: 5,
    name: "Ritz Paris",
    location: "Paris, France",
    rating: "4.9/5",
    features: ["Historic", "Luxury", "LGBTQ+ Friendly"],
    description: "The epitome of Parisian luxury with a long history of welcoming diverse guests. Experience impeccable service and timeless elegance in the City of Light.",
    price: "From $1,100/night",
    image: "",
    category: "europe"
  },
  {
    id: 6,
    name: "The Siam",
    location: "Bangkok, Thailand",
    rating: "4.8/5",
    features: ["LGBTQ+ Owned", "Art Deco", "Riverside"],
    description: "A stunning luxury urban retreat on the Chao Phraya River. This art deco masterpiece offers personalized butler service and an authentic Thai experience with modern comforts.",
    price: "From $520/night",
    image: "",
    category: "asia"
  }
])

const imagesLoaded = ref(false)

const loadImages = async () => {
  try {
    // Load hotel images
    for (let i = 0; i < hotels.value.length; i++) {
      hotels.value[i].image = await getImage('hotels', i)
    }
    imagesLoaded.value = true
  } catch (error) {
    console.error('Error loading hotel images:', error)
  }
}

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filteredHotels = computed(() => {
  if (activeCategory.value === 'all') {
    return hotels.value
  }
  return hotels.value.filter(hotel => hotel.category === activeCategory.value)
})

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="featured-hotels">
    <div class="container">
      <div class="section-header">
        <h2>LGBTQ+ Affirming Luxury Hotels</h2>
        <p>Carefully selected partners where you'll be celebrated, not just tolerated</p>
      </div>
      
      <div class="hotel-categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="hotel-category"
          :class="{ 'active': activeCategory === category.id }"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </div>
      </div>
      
      <div class="hotels-grid">
        <div 
          v-for="hotel in filteredHotels" 
          :key="hotel.id"
          class="hotel-card"
        >
          <img :src="hotel.image" :alt="hotel.name">
          <div class="hotel-info">
            <h3>{{ hotel.name }}</h3>
            <div class="hotel-location">{{ hotel.location }}</div>
            <div class="hotel-rating">
              <span>★★★★★</span> {{ hotel.rating }}
            </div>
            <div class="hotel-features">
              <span 
                v-for="(feature, index) in hotel.features" 
                :key="index"
                class="hotel-feature"
              >
                {{ feature }}
              </span>
            </div>
            <p class="hotel-description">{{ hotel.description }}</p>
            <div class="hotel-footer">
              <span class="price">{{ hotel.price }}</span>
              <a href="#" class="btn">View Hotel</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Featured Hotels Section */
.featured-hotels {
  padding: 5rem 0;
  background-color: #fff;
}

.hotel-categories {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.hotel-category {
  padding: 0.5rem 1.5rem;
  background-color: #f5f5f5;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hotel-category.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
}

.hotels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.hotel-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
}

.hotel-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.hotel-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.hotel-info {
  padding: 1.5rem;
}

.hotel-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.hotel-location {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.hotel-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.hotel-feature {
  background-color: #f5f5f5;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.hotel-rating {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.hotel-rating span {
  color: #e52e71;
  margin-right: 0.3rem;
}

.hotel-price {
  font-weight: 600;
  color: #e52e71;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.hotel-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.hotel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 992px) {
  .hotels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hotels-grid {
    grid-template-columns: 1fr;
  }
  
  .hotel-categories {
    flex-wrap: wrap;
  }
}
</style>