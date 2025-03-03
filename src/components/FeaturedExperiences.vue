<script setup>
import { ref, onMounted } from 'vue'
import { getImage } from '../services/imageService'

const experiences = [
  {
    id: 1,
    title: "Private Santorini Sunset Yacht",
    description: "Sail the azure Aegean waters with your beloved as the sun paints the iconic white buildings in hues of gold.",
    price: "From $1,200",
    image: ""
  },
  {
    id: 2,
    title: "Kyoto Luxury Ryokan Retreat",
    description: "Experience traditional Japanese hospitality in an LGBTQ+ affirming luxury ryokan with private onsen.",
    price: "From $950",
    image: ""
  },
  {
    id: 3,
    title: "Maasai Mara Pride Safari",
    description: "Witness the majesty of Africa's wildlife from LGBTQ+ owned luxury eco-lodges committed to conservation.",
    price: "From $3,400",
    image: ""
  },
  {
    id: 4,
    title: "Belmond Pride Train Journey",
    description: "Experience the glamour of the golden age of travel on this exclusive Pride-themed luxury train journey through Europe's most scenic routes.",
    price: "From $5,800",
    image: ""
  },
  {
    id: 5,
    title: "Four Seasons Yacht Club Cruise",
    description: "Set sail on an intimate luxury yacht experience with personalized service and exclusive access to hidden Mediterranean coves and beaches.",
    price: "From $7,500",
    image: ""
  },
  {
    id: 6,
    title: "Four Seasons Private Jet World Tour",
    description: "Circle the globe in ultimate luxury aboard a custom-designed Four Seasons private jet with curated LGBTQ+ friendly experiences at each destination.",
    price: "From $125,000",
    image: ""
  },
  {
    id: 7,
    title: "Paris Fashion Week Experience",
    description: "Exclusive access to runway shows, designer meet-and-greets, and VIP after-parties during the world's premier fashion event.",
    price: "From $9,800",
    image: ""
  },
  {
    id: 8,
    title: "Tuscan Culinary Immersion",
    description: "Learn authentic Italian cooking techniques from master chefs in a private Tuscan villa with wine tastings and market tours.",
    price: "From $5,800",
    image: ""
  },
  {
    id: 9,
    title: "Game of Thrones Croatia Tour",
    description: "Walk the streets of King's Landing in Dubrovnik and explore other iconic filming locations from the hit HBO series.",
    price: "From $6,800",
    image: ""
  }
]

const featuredExperience = {
  title: "Maldives Overwater Villa Escape",
  description: "Indulge in absolute luxury in your private overwater villa, where crystal-clear waters teem with vibrant marine life just steps from your deck. Our exclusive partnership with this progressive luxury resort ensures a warm welcome for all couples and travelers.",
  additionalInfo: "Your experience includes a private sunset dolphin cruise, couples' spa treatments, and a romantic dinner under the stars on your own private sandbank.",
  image: ""
}

const imagesLoaded = ref(false)

const loadImages = async () => {
  try {
    // Load experience images
    for (let i = 0; i < experiences.length; i++) {
      experiences[i].image = await getImage('experiences', i)
    }
    
    // Load featured experience image
    featuredExperience.image = await getImage('featured', 0)
    
    imagesLoaded.value = true
  } catch (error) {
    console.error('Error loading experience images:', error)
  }
}

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="featured-experiences">
    <div class="container">
      <div class="section-header">
        <h2>Our Most Coveted Experiences</h2>
        <p>Handcrafted journeys that celebrate your authentic self</p>
      </div>
      
      <div class="experiences-grid">
        <div 
          v-for="experience in experiences" 
          :key="experience.id" 
          class="experience-card"
        >
          <img :src="experience.image" alt="Experience">
          <div class="experience-content">
            <h3>{{ experience.title }}</h3>
            <p>{{ experience.description }}</p>
            <div class="experience-footer">
              <span class="price">{{ experience.price }}</span>
              <a href="#" class="btn">View Details</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="featured-experience">
        <img :src="featuredExperience.image" alt="This Month's Featured Experience">
        <div class="featured-content">
          <h3>THIS MONTH'S FEATURED EXPERIENCE</h3>
          <h2>{{ featuredExperience.title }}</h2>
          <p>{{ featuredExperience.description }}</p>
          <p>{{ featuredExperience.additionalInfo }}</p>
          <a href="#" class="btn">Explore This Experience</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Featured Experiences */
.featured-experiences {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.experiences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.experience-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.experience-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.experience-content {
  padding: 1.5rem;
}

.experience-content h3 {
  margin-bottom: 0.5rem;
}

.experience-content p {
  margin-bottom: 1rem;
  color: #666;
}

.experience-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 600;
  color: #e52e71;
}

/* Featured Experience */
.featured-experience {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.featured-experience img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.featured-content h3 {
  color: #e52e71;
  margin-bottom: 0.5rem;
}

.featured-content h2 {
  margin-bottom: 1rem;
}

.featured-content p {
  margin-bottom: 2rem;
}

@media (max-width: 992px) {
  .featured-experience {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .experiences-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .experiences-grid {
    grid-template-columns: 1fr;
  }
  
  .experience-card img {
    height: 200px;
  }
}
</style>