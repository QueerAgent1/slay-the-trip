<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Gear' },
  { id: 'luggage', name: 'Luggage' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'tech', name: 'Tech Essentials' },
  { id: 'pride', name: 'Pride Collection' }
]

const travelGear = [
  {
    id: 1,
    title: "Pride Edition Luxury Carry-On",
    description: "Our signature aluminum carry-on with rainbow accents, featuring silent wheels, TSA-approved locks, and a built-in power bank.",
    price: "$595",
    image: "/api/placeholder/400/250",
    category: "luggage",
    featured: true,
    highlights: [
      "Aircraft-grade aluminum construction",
      "Rainbow wheel accents and handle details",
      "Built-in 10,000 mAh power bank",
      "TSA-approved combination locks",
      "Lifetime warranty with portion of proceeds supporting LGBTQ+ travel initiatives"
    ],
    colors: ["Silver/Rainbow", "Black/Rainbow", "Gold/Rainbow"]
  },
  {
    id: 2,
    title: "QueerLuxe Travel Organizer Set",
    description: "Premium vegan leather travel organizers for passports, documents, and accessories, featuring subtle pride flag color accents.",
    price: "$175",
    image: "/api/placeholder/400/250",
    category: "accessories",
    featured: true,
    highlights: [
      "Vegan leather construction",
      "RFID-blocking technology",
      "Multiple passport slots and document pockets",
      "Subtle pride flag stitching detail",
      "Monogramming available"
    ],
    colors: ["Black", "Navy", "Burgundy"]
  },
  {
    id: 3,
    title: "Destination Pride Capsule Wardrobe",
    description: "A curated collection of versatile, wrinkle-resistant luxury pieces designed for multiple styling options while traveling.",
    price: "From $850",
    image: "/api/placeholder/400/250",
    category: "clothing",
    featured: true,
    highlights: [
      "5-10 mix-and-match pieces (depending on package)",
      "Wrinkle-resistant, breathable fabrics",
      "Designed for diverse body types",
      "Subtle pride details that can be shown or concealed",
      "Personal styling consultation included"
    ],
    colors: ["Neutral Collection", "Bold Collection", "Monochrome Collection"]
  },
  {
    id: 4,
    title: "Global Travel Tech Kit",
    description: "Everything you need to stay connected worldwide, including universal adapters, portable chargers, and noise-canceling headphones.",
    price: "$395",
    image: "/api/placeholder/400/250",
    category: "tech",
    featured: false,
    highlights: [
      "Universal power adapter with USB-C PD charging",
      "20,000 mAh power bank with multiple ports",
      "Premium noise-canceling headphones",
      "Compact travel router for secure connections",
      "Cable organizer with all essential cables"
    ],
    colors: ["Black", "White"]
  },
  {
    id: 5,
    title: "Luxury Pride Swimwear Collection",
    description: "Designer swimwear featuring subtle or bold pride elements, perfect for beach destinations and resort pools.",
    price: "From $125",
    image: "/api/placeholder/400/250",
    category: "pride",
    featured: true,
    highlights: [
      "Premium quick-dry fabrics with UPF 50+ protection",
      "Available in various styles for all body types",
      "Subtle or statement pride designs",
      "Matching cover-ups and accessories available",
      "Portion of proceeds supports LGBTQ+ beach clean-up initiatives"
    ],
    colors: ["Rainbow Gradient", "Subtle Pride", "Statement Pride"]
  },
  {
    id: 6,
    title: "Leather Weekend Duffle",
    description: "Handcrafted full-grain leather duffle bag, perfect for short getaways with a discreet pride flag tag option.",
    price: "$495",
    image: "/api/placeholder/400/250",
    category: "luggage",
    featured: false,
    highlights: [
      "Full-grain leather construction",
      "Durable brass hardware",
      "Removable, adjustable shoulder strap",
      "Optional pride flag luggage tag",
      "Monogramming available"
    ],
    colors: ["Cognac", "Black", "Navy"]
  },
  {
    id: 7,
    title: "Destination Safety Kit",
    description: "Essential safety items for LGBTQ+ travelers, including door alarm, GPS tracker, and emergency contact system.",
    price: "$225",
    image: "/api/placeholder/400/250",
    category: "accessories",
    featured: false,
    highlights: [
      "Portable door/window alarm",
      "GPS tracker with SOS button",
      "RFID-blocking wallet",
      "Digital safety guide for global destinations",
      "24/7 emergency assistance hotline (1-year subscription)"
    ],
    colors: ["Black"]
  },
  {
    id: 8,
    title: "Luxury Travel Skincare Set",
    description: "Travel-sized premium skincare products designed to combat the effects of long flights and climate changes.",
    price: "$195",
    image: "/api/placeholder/400/250",
    category: "accessories",
    featured: false,
    highlights: [
      "Hydrating face mask for long flights",
      "Climate-adaptive moisturizer",
      "Refreshing facial mist",
      "SPF 50 lightweight sunscreen",
      "Overnight recovery serum"
    ],
    colors: ["Standard Set"]
  },
  {
    id: 9,
    title: "Convertible Travel Backpack",
    description: "Premium backpack that converts to a tote or messenger bag, featuring dedicated laptop compartment and hidden security pockets.",
    price: "$275",
    image: "/api/placeholder/400/250",
    category: "luggage",
    featured: true,
    highlights: [
      "Water-resistant premium materials",
      "Converts between backpack, tote, and messenger styles",
      "Dedicated padded laptop compartment",
      "Hidden security pockets for valuables",
      "Trolley sleeve for easy attachment to rolling luggage"
    ],
    colors: ["Black", "Navy", "Olive"]
  },
  {
    id: 10,
    title: "Pride Flag Luggage Tags",
    description: "Luxury leather luggage tags featuring subtle or bold pride flag designs to identify your bags with pride.",
    price: "$45",
    image: "/api/placeholder/400/250",
    category: "pride",
    featured: false,
    highlights: [
      "Full-grain leather construction",
      "Privacy flap for contact information",
      "Available in various pride flag designs",
      "Durable metal hardware",
      "Personalization available"
    ],
    colors: ["Rainbow Pride", "Trans Pride", "Bisexual Pride", "Lesbian Pride", "Non-Binary Pride"]
  }
]

const featuredProduct = {
  title: "The Ultimate QueerLuxe Travel Collection",
  description: "Our signature luxury travel set featuring everything you need for stylish, comfortable, and confident global adventures.",
  additionalInfo: "This comprehensive collection includes our aluminum carry-on, leather weekender, tech kit, travel organizers, and premium accessories—all featuring subtle or statement pride elements of your choice.",
  price: "$1,995",
  image: "/api/placeholder/600/600",
  savings: "Save $435 compared to individual purchases"
}

const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return travelGear
  }
  return travelGear.filter(product => product.category === activeCategory.value)
})

const featuredProducts = computed(() => {
  return travelGear.filter(product => product.featured)
})
</script>

<template>
  <section class="travel-gear">
    <div class="container">
      <div class="section-header">
        <h2>Luxury Travel Gear for the Queer Traveler</h2>
        <p>Premium essentials and statement pieces designed for style, comfort, and confidence wherever your journey takes you</p>
      </div>
      
      <!-- Featured Product -->
      <div class="featured-product">
        <img :src="featuredProduct.image" alt="Featured Travel Gear">
        <div class="featured-content">
          <h3>SIGNATURE COLLECTION</h3>
          <h2>{{ featuredProduct.title }}</h2>
          <p>{{ featuredProduct.description }}</p>
          <p>{{ featuredProduct.additionalInfo }}</p>
          <div class="featured-footer">
            <div class="featured-details">
              <div class="price">{{ featuredProduct.price }}</div>
              <div class="savings">{{ featuredProduct.savings }}</div>
            </div>
            <a href="#" class="btn">Shop Collection</a>
          </div>
        </div>
      </div>
      
      <!-- Product Categories -->
      <div class="product-categories">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="product-category"
          :class="{ 'active': activeCategory === category.id }"
          @click="setActiveCategory(category.id)"
        >
          {{ category.name }}
        </div>
      </div>
      
      <!-- Featured Products Carousel -->
      <div class="featured-products">
        <h3>Featured Travel Essentials</h3>
        <div class="featured-products-carousel">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="featured-product-card"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.title">
            </div>
            <div class="product-content">
              <h4>{{ product.title }}</h4>
              <p>{{ product.description }}</p>
              <div class="product-highlights">
                <h5>Product Highlights:</h5>
                <ul>
                  <li v-for="(highlight, index) in product.highlights.slice(0, 3)" :key="index">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
              <div class="product-footer">
                <div class="product-price">{{ product.price }}</div>
                <a href="#" class="btn">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- All Products Grid -->
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.title">
            <div class="product-colors">
              {{ product.colors.join(", ") }}
            </div>
          </div>
          <div class="product-content">
            <h4>{{ product.title }}</h4>
            <p>{{ product.description }}</p>
            <div class="product-footer">
              <div class="product-price">{{ product.price }}</div>
              <a href="#" class="btn">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Custom Gear CTA -->
      <div class="custom-gear">
        <div class="custom-content">
          <h3>Custom Travel Gear</h3>
          <p>Looking for personalized travel essentials? Our design team can create custom luggage, accessories, and travel kits featuring your preferred pride elements, colors, and monograms.</p>
          <a href="#" class="btn">Inquire About Custom Gear</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.travel-gear {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* Featured Product */
.featured-product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.featured-product img {
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

.savings {
  font-size: 0.9rem;
  color: #4CAF50;
  font-weight: 600;
}

/* Product Categories */
.product-categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.product-category {
  padding: 0.75rem 1.5rem;
  background-color: white;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-category.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  box-shadow: 0 5px 15px rgba(229, 46, 113, 0.3);
}

/* Featured Products Carousel */
.featured-products {
  margin-bottom: 4rem;
}

.featured-products h3 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.featured-products-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scrollbar-width: thin;
  scrollbar-color: #e52e71 #f5f5f5;
}

.featured-products-carousel::-webkit-scrollbar {
  height: 8px;
}

.featured-products-carousel::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.featured-products-carousel::-webkit-scrollbar-thumb {
  background: #e52e71;
  border-radius: 4px;
}

.featured-product-card {
  min-width: 600px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.featured-product-card .product-image {
  width: 250px;
  flex-shrink: 0;
}

.featured-product-card .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-product-card .product-content {
  padding: 2rem;
  flex: 1;
}

.product-highlights {
  margin: 1.5rem 0;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.product-highlights h5 {
  margin-bottom: 1rem;
  color: #333;
}

.product-highlights ul {
  padding-left: 1.5rem;
}

.product-highlights li {
  margin-bottom: 0.5rem;
  color: #555;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.product-price {
  font-weight: 700;
  color: #e52e71;
  font-size: 1.2rem;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.product-image {
  position: relative;
}

.product-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.product-colors {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
}

.product-content {
  padding: 1.5rem;
}

.product-content h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.product-content p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Custom Gear CTA */
.custom-gear {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.custom-content h3 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.custom-content p {
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

@media (max-width: 992px) {
  .featured-product {
    grid-template-columns: 1fr;
  }
  
  .featured-product img {
    height: 400px;
  }
  
  .featured-product-card {
    min-width: 100%;
    flex-direction: column;
  }
  
  .featured-product-card .product-image {
    width: 100%;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .products-grid {
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
  
  .product-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .product-footer .btn {
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
  
  .custom-gear {
    padding: 2rem;
  }
}
</style>