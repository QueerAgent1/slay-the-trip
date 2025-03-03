<script setup>
import { ref, computed, onMounted } from 'vue'
import { getImage } from '../services/imageService'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Experiences' },
  { id: 'game-of-thrones', name: 'Game of Thrones' },
  { id: 'lord-of-the-rings', name: 'Lord of the Rings' },
  { id: 'harry-potter', name: 'Harry Potter' },
  { id: 'bridgerton', name: 'Bridgerton' },
  { id: 'white-lotus', name: 'White Lotus' },
  { id: 'succession', name: 'Succession' },
  { id: 'emily-in-paris', name: 'Emily in Paris' }
]

const setJettingExperiences = ref([
  {
    id: 1,
    title: "Game of Thrones Ultimate Croatia Tour",
    description: "Walk the streets of King's Landing in Dubrovnik, explore Diocletian's Palace in Split, and visit other iconic Croatian filming locations from the hit series.",
    price: "From $6,800",
    image: "",
    category: "game-of-thrones",
    featured: true,
    highlights: [
      "Private guided tour of Dubrovnik's Old Town (King's Landing)",
      "Exclusive access to Lovrijenac Fortress (Red Keep)",
      "Visit to Diocletian's Palace in Split (Daenerys' throne room)",
      "Luxury yacht excursion to Lokrum Island (Qarth)",
      "5-star accommodations throughout Croatia"
    ],
    dates: "April-October"
  },
  {
    id: 2,
    title: "Lord of the Rings New Zealand Adventure",
    description: "Journey through Middle Earth with this comprehensive tour of New Zealand's most spectacular LOTR filming locations, from Hobbiton to Mount Doom.",
    price: "From $9,500",
    image: "",
    category: "lord-of-the-rings",
    featured: true,
    highlights: [
      "Private tour of Hobbiton Movie Set with champagne picnic",
      "Helicopter tour of Mount Ngauruhoe (Mount Doom)",
      "Guided hike through Tongariro National Park (Mordor)",
      "Exclusive behind-the-scenes at Weta Workshop",
      "Luxury lodge accommodations throughout New Zealand"
    ],
    dates: "Year-round"
  },
  {
    id: 3,
    title: "Bridgerton's Regency London Experience",
    description: "Step into the world of the ton with this luxurious tour of Bridgerton filming locations across England, featuring exclusive access to historic estates and gardens.",
    price: "From $7,200",
    image: "",
    category: "bridgerton",
    featured: true,
    highlights: [
      "Private tour of Bath's Royal Crescent and Assembly Rooms",
      "After-hours access to Ranger's House (Bridgerton family home)",
      "Exclusive visit to Castle Howard (Duke of Hastings' residence)",
      "Regency-era costume fitting and professional photoshoot",
      "Afternoon tea at The Lanesborough with Bridgerton-inspired menu"
    ],
    dates: "May-September"
  },
  {
    id: 4,
    title: "Harry Potter's Magical Britain",
    description: "Discover the real-world magic behind the Harry Potter films with VIP access to filming locations across London, Oxford, and the Scottish Highlands.",
    price: "From $6,500",
    image: "",
    category: "harry-potter",
    featured: false,
    highlights: [
      "Early access to Warner Bros. Studio Tour London",
      "Private tour of Oxford University's iconic filming locations",
      "Luxury journey aboard the Jacobite Steam Train (Hogwarts Express)",
      "Exclusive after-hours visit to Alnwick Castle (Hogwarts exterior)",
      "Bespoke wand-making workshop with master craftsman"
    ],
    dates: "Year-round"
  },
  {
    id: 5,
    title: "White Lotus Sicily Luxury Retreat",
    description: "Experience the opulence of The White Lotus Season 2 with this exclusive tour of Sicily's most glamorous locations, including a stay at the actual filming resort.",
    price: "From $12,800",
    image: "",
    category: "white-lotus",
    featured: true,
    highlights: [
      "7-night stay at San Domenico Palace (the actual White Lotus hotel)",
      "Private tour of Taormina with local expert guide",
      "Exclusive wine tasting at Etna region vineyards",
      "Luxury yacht excursion along the Sicilian coast",
      "Private dinner at Michelin-starred restaurant with wine pairings"
    ],
    dates: "April-October"
  },
  {
    id: 6,
    title: "Game of Thrones: Northern Ireland Experience",
    description: "Explore the rugged landscapes of Westeros with this immersive tour of Northern Ireland's Game of Thrones filming locations, from the Iron Islands to Winterfell.",
    price: "From $5,900",
    image: "",
    category: "game-of-thrones",
    featured: false,
    highlights: [
      "Private tour of Castle Ward (Winterfell)",
      "Archery experience in the Winterfell courtyard",
      "Visit to the Dark Hedges (Kingsroad)",
      "Ballintoy Harbour exploration (Iron Islands)",
      "Luxury castle accommodation experience"
    ],
    dates: "April-September"
  },
  {
    id: 7,
    title: "Lord of the Rings VIP Film Sites & Winelands",
    description: "Combine New Zealand's spectacular LOTR filming locations with exclusive wine experiences in this luxury tour designed for film enthusiasts and oenophiles alike.",
    price: "From $10,800",
    image: "",
    category: "lord-of-the-rings",
    featured: false,
    highlights: [
      "Private Hobbiton Movie Set tour with Green Dragon Inn feast",
      "Helicopter tour of South Island filming locations",
      "Exclusive wine tastings at Central Otago's premier vineyards",
      "Luxury 4WD tour of Glenorchy and Paradise (Lothlorien)",
      "Five-star accommodations throughout New Zealand"
    ],
    dates: "October-April"
  },
  {
    id: 8,
    title: "Bridgerton's Bath & Cotswolds Retreat",
    description: "Immerse yourself in the romantic world of Bridgerton with this luxury tour of Bath and the Cotswolds, featuring exclusive access to filming locations and Regency experiences.",
    price: "From $6,800",
    image: "",
    category: "bridgerton",
    featured: false,
    highlights: [
      "Private guided tour of Bath's Georgian architecture",
      "Exclusive access to Wilton House (Duke of Hastings' London residence)",
      "Regency-inspired picnic in Prior Park Landscape Garden",
      "Private dance lesson with Regency dance master",
      "Luxury boutique hotel accommodations"
    ],
    dates: "April-October"
  },
  {
    id: 9,
    title: "Succession NYC Power Tour",
    description: "Walk in the footsteps of the Roy family with this exclusive tour of New York City's most prestigious locations featured in HBO's hit series Succession.",
    price: "From $8,500",
    image: "",
    category: "succession",
    featured: true,
    highlights: [
      "Private helicopter tour of Manhattan skyline (Roy family style)",
      "Exclusive dining experience at actual restaurants featured in the show",
      "Behind-the-scenes tour of a major media conglomerate",
      "Luxury car service throughout your stay",
      "5-star accommodations at filming location hotels"
    ],
    dates: "Year-round"
  },
  {
    id: 10,
    title: "Emily in Paris: Ultimate French Experience",
    description: "Live your own Parisian fantasy with this luxury tour inspired by the hit Netflix series, featuring iconic filming locations and exclusive fashion experiences.",
    price: "From $7,900",
    image: "",
    category: "emily-in-paris",
    featured: true,
    highlights: [
      "Private tour of all major Emily in Paris filming locations",
      "Exclusive shopping experience with a French fashion stylist",
      "Champagne tasting at a historic Champagne house",
      "Cooking class with a renowned Parisian chef",
      "Luxury boutique hotel stay in Saint-Germain-des-Prés"
    ],
    dates: "April-October"
  },
  {
    id: 11,
    title: "White Lotus Hawaii Exclusive Experience",
    description: "Indulge in the tropical luxury of The White Lotus Season 1 with this VIP tour of Hawaii's most stunning locations, including a stay at the actual filming resort.",
    price: "From $11,500",
    image: "",
    category: "white-lotus",
    featured: false,
    highlights: [
      "7-night stay at the Four Seasons Resort Maui (the original White Lotus hotel)",
      "Private outrigger canoe experience with local guides",
      "Exclusive access to filming locations across Maui",
      "Sunset yacht cruise with premium open bar",
      "Private luau experience with traditional Hawaiian cuisine"
    ],
    dates: "Year-round"
  },
  {
    id: 12,
    title: "Succession European Getaway",
    description: "Experience the European luxury of the Roy family with this exclusive tour of Succession filming locations across Italy and Croatia.",
    price: "From $14,800",
    image: "",
    category: "succession",
    featured: false,
    highlights: [
      "Private yacht charter in the Adriatic Sea",
      "Exclusive villa stay in Tuscany (as featured in Season 3)",
      "Helicopter transfer to Lake Como",
      "Private wine tasting at historic Italian vineyards",
      "Luxury accommodations throughout Italy and Croatia"
    ],
    dates: "May-September"
  }
])

const featuredExperience = ref({
  title: "Ultimate Film & TV Locations World Tour",
  description: "The definitive global journey for film and television enthusiasts, visiting the most iconic filming locations across three continents.",
  additionalInfo: "This 21-day luxury adventure takes you from New Zealand's Middle Earth to Croatia's King's Landing, England's Bridgerton settings, and Sicily's White Lotus resort, with private transportation, expert guides, and exclusive behind-the-scenes experiences throughout.",
  price: "From $85,000 per person",
  image: "",
  dates: "Limited departures in May and September"
})

const setJettingTrends = ref([
  {
    title: "The Set-Jetting Phenomenon",
    content: "Set-jetting—traveling to destinations featured in movies and TV shows—has exploded in popularity following the pandemic. According to a recent study, 96% of travelers have considered visiting a destination after seeing it in a film or TV series."
  },
  {
    title: "Economic Impact",
    content: "The economic impact of set-jetting is substantial. After the release of 'The White Lotus' Season 2, tourism to Sicily increased by 50%, while 'Emily in Paris' boosted tourism to the French capital by 30% among American travelers."
  },
  {
    title: "Luxury Experience",
    content: "Set-jetting is particularly popular among luxury travelers who seek exclusive, behind-the-scenes experiences that go beyond typical tourist attractions, often paying premium prices for authentic connections to their favorite shows."
  }
])

const imagesLoaded = ref(false)

const loadImages = async () => {
  try {
    // Load experience images
    for (let i = 0; i < setJettingExperiences.value.length; i++) {
      setJettingExperiences.value[i].image = await getImage('destinations', i % 8)
    }
    
    // Load featured experience image
    featuredExperience.value.image = await getImage('featured', 0)
    
    imagesLoaded.value = true
  } catch (error) {
    console.error('Error loading set-jetting images:', error)
  }
}

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filteredExperiences = computed(() => {
  if (activeCategory.value === 'all') {
    return setJettingExperiences.value
  }
  return setJettingExperiences.value.filter(exp => exp.category === activeCategory.value)
})

const featuredExperiences = computed(() => {
  return setJettingExperiences.value.filter(exp => exp.featured)
})

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="set-jetting-experiences">
    <div class="container">
      <div class="section-header">
        <h2>Set-Jetting Luxury Experiences</h2>
        <p>Immerse yourself in the worlds of your favorite films and TV shows with our exclusive set-jetting adventures</p>
      </div>
      
      <!-- Set-Jetting Trends -->
      <div class="set-jetting-trends">
        <div 
          v-for="(trend, index) in setJettingTrends" 
          :key="index"
          class="trend-card"
        >
          <h3>{{ trend.title }}</h3>
          <p>{{ trend.content }}</p>
        </div>
      </div>
      
      <!-- Featured Experience -->
      <div class="featured-experience">
        <img :src="featuredExperience.image" alt="Featured Set-Jetting Experience">
        <div class="featured-content">
          <h3>SIGNATURE SET-JETTING JOURNEY</h3>
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
        <h3>Featured Set-Jetting Experiences</h3>
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
      
      <!-- Set-Jetting Concierge CTA -->
      <div class="set-jetting-concierge">
        <div class="concierge-content">
          <h3>Custom Set-Jetting Experiences</h3>
          <p>Looking for a bespoke film or TV location experience? Our set-jetting specialists can create custom itineraries featuring your favorite shows and movies, with exclusive access to filming locations and behind-the-scenes experiences.</p>
          <a href="#" class="btn">Contact Our Set-Jetting Concierge</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.set-jetting-experiences {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* Set-Jetting Trends */
.set-jetting-trends {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.trend-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.trend-card:hover {
  transform: translateY(-10px);
}

.trend-card h3 {
  margin-bottom: 1rem;
  color: #e52e71;
  font-size: 1.3rem;
}

.trend-card p {
  color: #555;
  line-height: 1.6;
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

/* Set-Jetting Concierge */
.set-jetting-concierge {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
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
  .set-jetting-trends {
    grid-template-columns: 1fr;
  }
  
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
  
  .set-jetting-concierge {
    padding: 2rem;
  }
}
</style>