<script setup>
import { ref, computed, onMounted } from 'vue'
import { getImage } from '../services/imageService'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Articles' },
  { id: 'destinations', name: 'Destinations' },
  { id: 'culture', name: 'Culture & History' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'interviews', name: 'Interviews' }
]

const articles = ref([
  {
    id: 1,
    title: "The Hidden LGBTQ+ History of Ancient Greece",
    excerpt: "Discover the often overlooked queer narratives in ancient Greek culture and how they've shaped modern LGBTQ+ identity and travel experiences.",
    image: "",
    category: "culture",
    featured: true,
    author: "Dr. Elena Papadopoulos",
    date: "May 15, 2024",
    readTime: "12 min read",
    tags: ["History", "Culture", "Greece"]
  },
  {
    id: 2,
    title: "Luxury Eco-Retreats: Sustainable Travel Without Compromise",
    excerpt: "How the world's most exclusive eco-resorts are redefining luxury through sustainability while creating safe spaces for LGBTQ+ travelers.",
    image: "",
    category: "lifestyle",
    featured: true,
    author: "James Wilson",
    date: "May 12, 2024",
    readTime: "9 min read",
    tags: ["Sustainability", "Luxury", "Eco-Travel"]
  },
  {
    id: 3,
    title: "In Conversation with Bobbi Salvör Menuez: Travel as Transformation",
    excerpt: "The acclaimed non-binary actor and artist discusses how travel has shaped their identity and creative process.",
    image: "",
    category: "interviews",
    featured: true,
    author: "Alex Chen",
    date: "May 8, 2024",
    readTime: "15 min read",
    tags: ["Interview", "Art", "Identity"]
  },
  {
    id: 4,
    title: "Beyond the Rainbow: LGBTQ+ Neighborhoods Transforming Global Cities",
    excerpt: "From Mexico City's Zona Rosa to Taipei's Red House District, how queer neighborhoods are evolving and what travelers should know.",
    image: "",
    category: "destinations",
    featured: false,
    author: "Sofia Rodriguez",
    date: "May 5, 2024",
    readTime: "11 min read",
    tags: ["Urban", "Community", "Global"]
  },
  {
    id: 5,
    title: "The New Generation of Queer Chefs Revolutionizing Global Cuisine",
    excerpt: "Meet the LGBTQ+ culinary talents creating innovative dining experiences that celebrate identity, heritage, and community.",
    image: "",
    category: "lifestyle",
    featured: false,
    author: "Thomas Laurent",
    date: "April 28, 2024",
    readTime: "10 min read",
    tags: ["Food", "Culinary", "Profiles"]
  },
  {
    id: 6,
    title: "Rediscovering Bali: Beyond the Tourist Trail",
    excerpt: "A journey through Bali's lesser-known regions reveals spiritual sanctuaries and LGBTQ+ friendly communities off the beaten path.",
    image: "",
    category: "destinations",
    featured: false,
    author: "Maya Wijaya",
    date: "April 22, 2024",
    readTime: "14 min read",
    tags: ["Indonesia", "Spirituality", "Adventure"]
  },
  {
    id: 7,
    title: "The Art of Slow Travel: Embracing Mindfulness on the Road",
    excerpt: "How the slow travel movement is helping LGBTQ+ travelers forge deeper connections with destinations and themselves.",
    image: "",
    category: "lifestyle",
    featured: false,
    author: "David Morgan",
    date: "April 18, 2024",
    readTime: "8 min read",
    tags: ["Mindfulness", "Wellness", "Slow Travel"]
  },
  {
    id: 8,
    title: "Queer Tango: Following the Dance from Buenos Aires to Berlin",
    excerpt: "Tracing the evolution of queer tango across continents and how it's creating inclusive spaces for travelers and locals alike.",
    image: "",
    category: "culture",
    featured: false,
    author: "Martina Vega",
    date: "April 15, 2024",
    readTime: "13 min read",
    tags: ["Dance", "Argentina", "Germany"]
  }
])

const featuredArticle = ref({
  title: "The Future of LGBTQ+ Luxury Travel",
  excerpt: "As the landscape of global travel evolves, we explore how luxury experiences are becoming more inclusive, authentic, and transformative for queer travelers.",
  fullText: "This comprehensive exploration examines how luxury travel brands are moving beyond rainbow washing to create genuinely inclusive experiences, featuring interviews with industry leaders, emerging destinations, and the technological innovations shaping the future of LGBTQ+ travel.",
  image: "",
  author: "Jonathan Pierce",
  date: "May 20, 2024",
  readTime: "18 min read"
})

const imagesLoaded = ref(false)

const loadImages = async () => {
  try {
    // Load article images
    for (let i = 0; i < articles.value.length; i++) {
      articles.value[i].image = await getImage('magazine', i % 5)
    }
    
    // Load featured article image
    featuredArticle.value.image = await getImage('featured', 1)
    
    imagesLoaded.value = true
  } catch (error) {
    console.error('Error loading magazine images:', error)
  }
}

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filteredArticles = computed(() => {
  if (activeCategory.value === 'all') {
    return articles.value
  }
  return articles.value.filter(article => article.category === activeCategory.value)
})

const featuredArticles = computed(() => {
  return articles.value.filter(article => article.featured)
})

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="magazine">
    <div class="container">
      <div class="section-header">
        <h2>QueerLuxe Magazine</h2>
        <p>Thought-provoking stories, interviews, and insights from the world of LGBTQ+ luxury travel</p>
      </div>
      
      <!-- Featured Article -->
      <div class="featured-article">
        <img :src="featuredArticle.image" alt="Featured Article">
        <div class="featured-content">
          <h3>EDITOR'S PICK</h3>
          <h2>{{ featuredArticle.title }}</h2>
          <p>{{ featuredArticle.excerpt }}</p>
          <p>{{ featuredArticle.fullText }}</p>
          <div class="article-meta">
            <span class="author">By {{ featuredArticle.author }}</span>
            <span class="date">{{ featuredArticle.date }}</span>
            <span class="read-time">{{ featuredArticle.readTime }}</span>
          </div>
          <a href="#" class="btn">Read Full Article</a>
        </div>
      </div>
      
      <!-- Article Categories -->
      <div class="article-categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="article-category"
          :class="{ 'active': activeCategory === category.id }"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </div>
      </div>
      
      <!-- Featured Articles Carousel -->
      <div class="featured-articles">
        <h3>Featured Articles</h3>
        <div class="featured-articles-carousel">
          <div 
            v-for="article in featuredArticles" 
            :key="article.id"
            class="featured-article-card"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title">
            </div>
            <div class="article-content">
              <h4>{{ article.title }}</h4>
              <p>{{ article.excerpt }}</p>
              <div class="article-meta">
                <span class="author">By {{ article.author }}</span>
                <span class="date">{{ article.date }}</span>
                <span class="read-time">{{ article.readTime }}</span>
              </div>
              <div class="article-tags">
                <span 
                  v-for="(tag, index) in article.tags" 
                  :key="index"
                  class="article-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <a href="#" class="btn">Read Article</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- All Articles Grid -->
      <div class="articles-grid">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="article-card"
        >
          <div class="article-image">
            <img :src="article.image" :alt="article.title">
            <div class="article-category-badge">{{ categories.find(cat => cat.id === article.category)?.name }}</div>
          </div>
          <div class="article-content">
            <h4>{{ article.title }}</h4>
            <p>{{ article.excerpt }}</p>
            <div class="article-meta">
              <span class="author">By {{ article.author }}</span>
              <span class="date">{{ article.date }}</span>
            </div>
            <a href="#" class="read-more">Read Article →</a>
          </div>
        </div>
      </div>
      
      <!-- Magazine Subscription CTA -->
      <div class="magazine-subscription">
        <div class="subscription-content">
          <h3>Subscribe to QueerLuxe Magazine</h3>
          <p>Get our quarterly print edition delivered to your door, featuring exclusive content, stunning photography, and in-depth features not available online.</p>
          <div class="subscription-options">
            <div class="subscription-option">
              <h4>Digital</h4>
              <p class="price">$29/year</p>
              <ul>
                <li>Quarterly digital issues</li>
                <li>Exclusive online content</li>
                <li>Archive access</li>
              </ul>
              <a href="#" class="btn">Subscribe Digital</a>
            </div>
            <div class="subscription-option featured">
              <div class="best-value">Best Value</div>
              <h4>Print + Digital</h4>
              <p class="price">$49/year</p>
              <ul>
                <li>Quarterly print magazine</li>
                <li>Digital edition access</li>
                <li>Exclusive online content</li>
                <li>Complete archive access</li>
                <li>Special subscriber events</li>
              </ul>
              <a href="#" class="btn">Subscribe Print + Digital</a>
            </div>
            <div class="subscription-option">
              <h4>Print</h4>
              <p class="price">$39/year</p>
              <ul>
                <li>Quarterly print magazine</li>
                <li>Delivered worldwide</li>
                <li>Collector's editions</li>
              </ul>
              <a href="#" class="btn">Subscribe Print</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.magazine {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* Featured Article */
.featured-article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.featured-article img {
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

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.author {
  font-weight: 600;
}

/* Article Categories */
.article-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.article-category {
  padding: 0.75rem 1.5rem;
  background-color: white;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.article-category.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  box-shadow: 0 5px 15px rgba(229, 46, 113, 0.3);
}

/* Featured Articles Carousel */
.featured-articles {
  margin-bottom: 4rem;
}

.featured-articles h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.featured-articles-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #e52e71 #f5f5f5;
}

.featured-articles-carousel::-webkit-scrollbar {
  height: 8px;
}

.featured-articles-carousel::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.featured-articles-carousel::-webkit-scrollbar-thumb {
  background: #e52e71;
  border-radius: 4px;
}

.featured-article-card {
  min-width: 600px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.featured-article-card .article-image {
  width: 250px;
  flex-shrink: 0;
}

.featured-article-card .article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-article-card .article-content {
  padding: 2rem;
  flex: 1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 1.5rem;
}

.article-tag {
  background-color: #f5f5f5;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.article-image {
  position: relative;
}

.article-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.article-category-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.article-content {
  padding: 1.5rem;
}

.article-content h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.article-content p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
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

/* Magazine Subscription */
.magazine-subscription {
  background-color: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.subscription-content h3 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.subscription-content > p {
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.subscription-options {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.subscription-option {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.subscription-option:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.subscription-option.featured {
  background: linear-gradient(135deg, #f9f9f9, #f0f0f0);
  border: 2px solid #e52e71;
  transform: scale(1.05);
}

.subscription-option.featured:hover {
  transform: scale(1.05) translateY(-10px);
}

.best-value {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.subscription-option h4 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #e52e71;
  margin-bottom: 1.5rem;
}

.subscription-option ul {
  text-align: left;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.subscription-option li {
  margin-bottom: 0.5rem;
  color: #555;
}

@media (max-width: 992px) {
  .featured-article {
    grid-template-columns: 1fr;
  }
  
  .featured-article img {
    height: 400px;
  }
  
  .featured-article-card {
    min-width: 100%;
    flex-direction: column;
  }
  
  .featured-article-card .article-image {
    width: 100%;
    height: 250px;
  }
  
  .subscription-option.featured {
    transform: scale(1);
  }
  
  .subscription-option.featured:hover {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .featured-content {
    padding: 2rem;
  }
  
  .featured-content h2 {
    font-size: 2rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 576px) {
  .magazine-subscription {
    padding: 2rem 1rem;
  }
  
  .subscription-option {
    width: 100%;
  }
}
</style>