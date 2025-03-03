<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Packages' },
  { id: 'fashion-weeks', name: 'Fashion Weeks' },
  { id: 'designer-experiences', name: 'Designer Experiences' },
  { id: 'shopping', name: 'Luxury Shopping' },
  { id: 'photoshoots', name: 'Destination Photoshoots' }
]

const fashionPackages = [
  {
    id: 1,
    title: "Paris Fashion Week VIP Access",
    description: "Exclusive front-row seats at the world's most prestigious fashion shows, private after-parties, and meet-and-greets with top designers.",
    price: "From $12,500",
    image: "/api/placeholder/400/250",
    category: "fashion-weeks",
    featured: true,
    highlights: [
      "Front row seats at 5 major shows",
      "VIP after-party access",
      "Private styling session",
      "5-star accommodation at Le Meurice",
      "Chauffeured transportation"
    ],
    dates: "September 26 - October 4, 2025"
  },
  {
    id: 2,
    title: "Milan Designer Atelier Tour",
    description: "Go behind the scenes with private tours of iconic Italian fashion houses and exclusive fittings with master tailors and designers.",
    price: "From $8,900",
    image: "/api/placeholder/400/250",
    category: "designer-experiences",
    featured: true,
    highlights: [
      "Private tours of 4 major fashion houses",
      "Custom fitting session with master tailor",
      "Exclusive workshop experience",
      "Luxury accommodation at Bulgari Hotel Milano",
      "Fine dining at fashion industry hotspots"
    ],
    dates: "Available year-round"
  },
  {
    id: 3,
    title: "New York Met Gala Experience",
    description: "The ultimate fashion event package including Met Gala tickets, custom designer outfit consultation, and red carpet preparation.",
    price: "From $35,000",
    image: "/api/placeholder/400/250",
    category: "fashion-weeks",
    featured: true,
    highlights: [
      "Met Gala admission ticket",
      "Custom outfit design consultation",
      "Professional styling and makeup",
      "5-star accommodation at The Mark Hotel",
      "Exclusive pre and post-gala events"
    ],
    dates: "May 1-3, 2025"
  },
  {
    id: 4,
    title: "Tokyo Fashion District Private Tour",
    description: "Explore the cutting-edge fashion scenes of Harajuku, Shibuya, and Ginza with a fashion industry insider as your personal guide.",
    price: "From $6,500",
    image: "/api/placeholder/400/250",
    category: "shopping",
    featured: false,
    highlights: [
      "Private guide with fashion industry expertise",
      "VIP shopping experiences at exclusive boutiques",
      "Custom Japanese designer introductions",
      "Luxury accommodation at Aman Tokyo",
      "Personalized shopping assistance and styling"
    ],
    dates: "Available year-round"
  },
  {
    id: 5,
    title: "London Savile Row Bespoke Experience",
    description: "Commission your own bespoke suit or outfit from the world's most prestigious tailors with private fittings and consultations.",
    price: "From $9,800",
    image: "/api/placeholder/400/250",
    category: "designer-experiences",
    featured: false,
    highlights: [
      "Bespoke garment creation from Savile Row tailor",
      "Multiple private fittings",
      "Fabric selection from premium mills",
      "Luxury accommodation at The Connaught",
      "Private tour of British fashion archives"
    ],
    dates: "Available year-round"
  },
  {
    id: 6,
    title: "Moroccan Desert Fashion Photoshoot",
    description: "Experience a professional fashion photoshoot in the stunning landscapes of Morocco with top photographers and stylists.",
    price: "From $7,500",
    image: "/api/placeholder/400/250",
    category: "photoshoots",
    featured: false,
    highlights: [
      "Professional fashion photographer",
      "Expert styling team",
      "Designer wardrobe selection",
      "Luxury desert camp accommodation",
      "Digital and printed photo portfolio"
    ],
    dates: "October-April"
  },
  {
    id: 7,
    title: "Copenhagen Sustainable Fashion Tour",
    description: "Discover the world's leading sustainable fashion brands with exclusive access to designers pioneering eco-friendly luxury.",
    price: "From $5,900",
    image: "/api/placeholder/400/250",
    category: "designer-experiences",
    featured: false,
    highlights: [
      "Meetings with sustainable fashion pioneers",
      "Exclusive workshop experiences",
      "Behind-the-scenes at eco-friendly production",
      "Luxury accommodation at Hotel Sanders",
      "Sustainable fashion shopping with expert guide"
    ],
    dates: "May-September"
  },
  {
    id: 8,
    title: "Santorini Luxury Fashion Retreat",
    description: "Combine breathtaking Aegean backdrops with a curated fashion experience including private photoshoots and styling sessions.",
    price: "From $8,200",
    image: "/api/placeholder/400/250",
    category: "photoshoots",
    featured: true,
    highlights: [
      "Professional photoshoot at iconic locations",
      "Personal styling consultation",
      "Designer resort wear selection",
      "Luxury villa accommodation with private pool",
      "Yacht excursion with onboard photoshoot"
    ],
    dates: "June-September"
  }
]

const featuredPackage = {
  title: "Fashion Capitals World Tour",
  description: "The ultimate fashion lover's journey through Paris, Milan, New York, and London with insider access to ateliers, showrooms, and exclusive events.",
  additionalInfo: "This 18-day luxury experience includes private jet transportation between fashion capitals, 5-star accommodations, and personalized shopping assistance with a fashion industry veteran.",
  price: "From $75,000 per person",
  image: "/api/placeholder/600/600",
  dates: "Available for Spring/Summer or Fall/Winter seasons"
}

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filteredPackages = computed(() => {
  if (activeCategory.value === 'all') {
    return fashionPackages
  }
  return fashionPackages.filter(pkg => pkg.category === activeCategory.value)
})

const featuredPackages = computed(() => {
  return fashionPackages.filter(pkg => pkg.featured)
})
</script>

<template>
  <section class="fashion-packages">
    <div class="container">
      <div class="section-header">
        <h2>Fashion Industry Luxury Experiences</h2>
        <p>Exclusive access to the world's most prestigious fashion events, designers, and destinations</p>
      </div>
      
      <!-- Featured Package -->
      <div class="featured-package">
        <img :src="featuredPackage.image" alt="Featured Fashion Package">
        <div class="featured-content">
          <h3>SIGNATURE EXPERIENCE</h3>
          <h2>{{ featuredPackage.title }}</h2>
          <p>{{ featuredPackage.description }}</p>
          <p>{{ featuredPackage.additionalInfo }}</p>
          <div class="featured-footer">
            <div class="featured-details">
              <div class="price">{{ featuredPackage.price }}</div>
              <div class="dates">{{ featuredPackage.dates }}</div>
            </div>
            <a href="#" class="btn">Request Details</a>
          </div>
        </div>
      </div>
      
      <!-- Package Categories -->
      <div class="package-categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="package-category"
          :class="{ 'active': activeCategory === category.id }"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </div>
      </div>
      
      <!-- Featured Packages Carousel -->
      <div class="featured-packages">
        <h3>Featured Fashion Experiences</h3>
        <div class="featured-packages-carousel">
          <div 
            v-for="pkg in featuredPackages" 
            :key="pkg.id"
            class="featured-package-card"
          >
            <div class="package-image">
              <img :src="pkg.image" :alt="pkg.title">
            </div>
            <div class="package-content">
              <h4>{{ pkg.title }}</h4>
              <p>{{ pkg.description }}</p>
              <div class="package-highlights">
                <h5>Experience Highlights:</h5>
                <ul>
                  <li v-for="(highlight, index) in pkg.highlights.slice(0, 3)" :key="index">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
              <div class="package-footer">
                <div class="package-price">{{ pkg.price }}</div>
                <a href="#" class="btn">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- All Packages Grid -->
      <div class="packages-grid">
        <div 
          v-for="pkg in filteredPackages" 
          :key="pkg.id"
          class="package-card"
        >
          <div class="package-image">
            <img :src="pkg.image" :alt="pkg.title">
            <div class="package-dates">{{ pkg.dates }}</div>
          </div>
          <div class="package-content">
            <h4>{{ pkg.title }}</h4>
            <p>{{ pkg.description }}</p>
            <div class="package-footer">
              <div class="package-price">{{ pkg.price }}</div>
              <a href="#" class="btn">View Details</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fashion Concierge CTA -->
      <div class="fashion-concierge">
        <div class="concierge-content">
          <h3>Fashion Industry Concierge</h3>
          <p>Looking for a custom fashion experience? Our fashion industry specialists can create bespoke packages with exclusive access to designers, events, and venues.</p>
          <a href="#" class="btn">Contact Our Fashion Concierge</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fashion-packages {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* Featured Package */
.featured-package {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.featured-package img {
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

/* Package Categories */
.package-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.package-category {
  padding: 0.75rem 1.5rem;
  background-color: white;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.package-category.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  box-shadow: 0 5px 15px rgba(229, 46, 113, 0.3);
}

/* Featured Packages Carousel */
.featured-packages {
  margin-bottom: 4rem;
}

.featured-packages h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.featured-packages-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #e52e71 #f5f5f5;
}

.featured-packages-carousel::-webkit-scrollbar {
  height: 8px;
}

.featured-packages-carousel::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.featured-packages-carousel::-webkit-scrollbar-thumb {
  background: #e52e71;
  border-radius: 4px;
}

.featured-package-card {
  min-width: 600px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-package-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.featured-package-card .package-image {
  width: 250px;
  flex-shrink: 0;
}

.featured-package-card .package-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-package-card .package-content {
  padding: 2rem;
  flex: 1;
}

.package-highlights {
  margin: 1.5rem 0;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.package-highlights h5 {
  margin-bottom: 1rem;
  color: #333;
}

.package-highlights ul {
  padding-left: 1.5rem;
}

.package-highlights li {
  margin-bottom: 0.5rem;
  color: #555;
}

.package-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.package-price {
  font-weight: 700;
  color: #e52e71;
  font-size: 1.2rem;
}

/* Packages Grid */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.package-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.package-image {
  position: relative;
}

.package-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.package-dates {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
}

.package-content {
  padding: 1.5rem;
}

.package-content h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.package-content p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Fashion Concierge */
.fashion-concierge {
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
  .featured-package {
    grid-template-columns: 1fr;
  }
  
  .featured-package img {
    height: 400px;
  }
  
  .featured-package-card {
    min-width: 100%;
    flex-direction: column;
  }
  
  .featured-package-card .package-image {
    width: 100%;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .packages-grid {
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
  
  .package-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .package-footer .btn {
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
  
  .fashion-concierge {
    padding: 2rem;
  }
}
</style>