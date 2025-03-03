<script setup>
import { ref, onMounted } from 'vue'
import { getImage } from '../services/imageService'

const perks = ref([
  {
    id: 1,
    title: "Room Upgrades",
    description: "Complimentary room upgrades at check-in, subject to availability, at over 2,000 luxury properties worldwide.",
    icon: "🏆",
    image: ""
  },
  {
    id: 2,
    title: "Daily Breakfast",
    description: "Enjoy complimentary breakfast for two daily at renowned hotel restaurants featuring local and international cuisine.",
    icon: "🍳",
    image: ""
  },
  {
    id: 3,
    title: "Resort Credits",
    description: "Receive up to $100 per day in resort credits to use towards spa treatments, dining, and other amenities.",
    icon: "💰",
    image: ""
  },
  {
    id: 4,
    title: "Early Check-in & Late Check-out",
    description: "Flexible arrival and departure times, subject to availability, to maximize your vacation time.",
    icon: "⏰",
    image: ""
  },
  {
    id: 5,
    title: "VIP Welcome Amenities",
    description: "Special welcome gifts, champagne, and personalized notes from management upon arrival.",
    icon: "🎁",
    image: ""
  },
  {
    id: 6,
    title: "Priority Reservations",
    description: "Preferred access to exclusive restaurants, spa appointments, and resort activities.",
    icon: "🔑",
    image: ""
  }
])

const vipExperiences = ref([
  {
    id: 1,
    title: "Private Museum Access",
    description: "Exclusive after-hours access to world-renowned museums and galleries without the crowds.",
    image: ""
  },
  {
    id: 2,
    title: "Celebrity Chef Experiences",
    description: "Private cooking classes and kitchen-table dining experiences with Michelin-starred chefs.",
    image: ""
  },
  {
    id: 3,
    title: "Yacht Charters",
    description: "Private luxury yacht experiences with personalized itineraries and full crew service.",
    image: ""
  }
])

const testimonials = ref([
  {
    id: 1,
    quote: "The VIP treatment we received through QueerLuxe's elite hotel partnerships made our honeymoon truly unforgettable. From the moment we arrived, we were treated like royalty.",
    author: "Michael & James",
    trip: "Four Seasons Bora Bora",
    image: ""
  },
  {
    id: 2,
    quote: "Having access to the Virtuoso amenities and Fora perks saved us over $1,200 on our vacation while giving us experiences we couldn't have arranged on our own.",
    author: "Sophia & Elena",
    trip: "Aman Tokyo",
    image: ""
  }
])

const imagesLoaded = ref(false)

const loadImages = async () => {
  try {
    // Load perk images
    for (let i = 0; i < perks.value.length; i++) {
      perks.value[i].image = await getImage('hotels', i % 6)
    }
    
    // Load VIP experience images
    for (let i = 0; i < vipExperiences.value.length; i++) {
      vipExperiences.value[i].image = await getImage('experiences', i + 3)
    }
    
    // Load testimonial images
    for (let i = 0; i < testimonials.value.length; i++) {
      testimonials.value[i].image = await getImage('people', i + 3)
    }
    
    imagesLoaded.value = true
  } catch (error) {
    console.error('Error loading images:', error)
  }
}

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="fora-perks">
    <div class="container">
      <div class="section-header">
        <h2>Exclusive Fora Perks & VIP Treatment</h2>
        <p>Experience the difference our elite supplier relationships make with exclusive amenities and access</p>
      </div>
      
      <div class="intro-content">
        <div class="intro-text">
          <h3>The QueerLuxe Advantage</h3>
          <p>As a proud Fora Travel agency with elite status across major luxury hotel brands, we provide our clients with VIP treatment, exclusive amenities, and unique experiences not available to the general public.</p>
          <p>Our established relationships with decision-makers at the world's finest properties ensure personalized attention and special care for every QueerLuxe traveler.</p>
          <div class="partner-logos">
            <div class="partner-logo">Virtuoso</div>
            <div class="partner-logo">Four Seasons Preferred</div>
            <div class="partner-logo">Belmond Bellini</div>
            <div class="partner-logo">Rosewood Elite</div>
          </div>
        </div>
        <div class="intro-image">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&h=400" alt="Luxury Hotel Experience">
          <div class="image-caption">Our clients enjoy VIP status at over 2,000 luxury properties worldwide</div>
        </div>
      </div>
      
      <div class="perks-grid">
        <div 
          v-for="perk in perks" 
          :key="perk.id"
          class="perk-card"
        >
          <div class="perk-icon">{{ perk.icon }}</div>
          <h4>{{ perk.title }}</h4>
          <p>{{ perk.description }}</p>
        </div>
      </div>
      
      <div class="value-proposition">
        <div class="value-content">
          <h3>The Value of Our Connections</h3>
          <p>Our clients receive an average of $550 in added value per stay through our exclusive Fora perks and elite hotel partnerships.</p>
          <ul class="value-list">
            <li>Complimentary room upgrades (avg. value: $150/night)</li>
            <li>Daily breakfast for two (avg. value: $80/day)</li>
            <li>Resort/spa credits (avg. value: $100/stay)</li>
            <li>Early check-in/late check-out (avg. value: $150)</li>
            <li>VIP welcome amenities (avg. value: $75)</li>
          </ul>
          <p class="value-note">Beyond monetary value, our connections provide peace of mind knowing you'll be recognized and prioritized as a VIP guest.</p>
        </div>
        <div class="value-chart">
          <div class="chart-title">Average Value Added Per Stay</div>
          <div class="chart-bar">
            <div class="bar-segment" style="width: 30%; background-color: #e52e71;">
              <span>Room Upgrades</span>
            </div>
            <div class="bar-segment" style="width: 20%; background-color: #ff8a00;">
              <span>Breakfast</span>
            </div>
            <div class="bar-segment" style="width: 20%; background-color: #6a11cb;">
              <span>Credits</span>
            </div>
            <div class="bar-segment" style="width: 15%; background-color: #2575fc;">
              <span>Check-in/out</span>
            </div>
            <div class="bar-segment" style="width: 15%; background-color: #4CAF50;">
              <span>Amenities</span>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #e52e71;"></div>
              <span>Room Upgrades: $150</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #ff8a00;"></div>
              <span>Breakfast: $80</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #6a11cb;"></div>
              <span>Resort Credits: $100</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #2575fc;"></div>
              <span>Flexible Check-in/out: $150</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #4CAF50;"></div>
              <span>Welcome Amenities: $75</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="vip-experiences">
        <h3>Exclusive Access & Unique Experiences</h3>
        <p class="section-intro">Our elite industry relationships unlock extraordinary experiences not available to the general public.</p>
        
        <div class="experiences-grid">
          <div 
            v-for="experience in vipExperiences" 
            :key="experience.id"
            class="experience-card"
          >
            <div class="experience-image">
              <img :src="experience.image" :alt="experience.title">
            </div>
            <div class="experience-content">
              <h4>{{ experience.title }}</h4>
              <p>{{ experience.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="client-testimonials">
        <h3>What Our Clients Say</h3>
        <div class="testimonials-container">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="testimonial-card"
          >
            <div class="quote-mark">"</div>
            <p class="testimonial-quote">{{ testimonial.quote }}</p>
            <div class="testimonial-author">
              <img :src="testimonial.image" :alt="testimonial.author">
              <div>
                <strong>{{ testimonial.author }}</strong>
                <p>{{ testimonial.trip }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cta-container">
        <div class="cta-content">
          <h3>Experience the VIP Difference</h3>
          <p>Let us elevate your next luxury journey with our exclusive perks and VIP connections.</p>
          <a href="#" class="btn">Plan Your VIP Experience</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fora-perks {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* Intro Section */
.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
}

.intro-text h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.intro-text p {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.8;
}

.partner-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.partner-logo {
  background-color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #666;
}

.intro-image {
  position: relative;
}

.intro-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 2rem 1rem 1rem;
  font-size: 0.9rem;
  border-radius: 0 0 8px 8px;
}

/* Perks Grid */
.perks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.perk-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.perk-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.perk-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.perk-card h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #333;
}

.perk-card p {
  color: #666;
  line-height: 1.6;
}

/* Value Proposition */
.value-proposition {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background-color: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  align-items: center;
}

.value-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.value-content p {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.8;
}

.value-list {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.value-list li {
  margin-bottom: 0.75rem;
  color: #555;
}

.value-note {
  font-style: italic;
  color: #666;
}

.value-chart {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
}

.chart-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #333;
}

.chart-bar {
  height: 50px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.bar-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.bar-segment:hover {
  transform: scaleY(1.1);
}

.chart-legend {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.legend-color {
  width: 15px;
  height: 15px;
  border-radius: 3px;
  margin-right: 0.5rem;
}

/* VIP Experiences */
.vip-experiences {
  margin-bottom: 4rem;
  text-align: center;
}

.vip-experiences h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.section-intro {
  max-width: 700px;
  margin: 0 auto 2rem;
  color: #555;
}

.experiences-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.experience-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.experience-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.experience-content {
  padding: 1.5rem;
}

.experience-content h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #333;
}

.experience-content p {
  color: #666;
  line-height: 1.6;
}

/* Client Testimonials */
.client-testimonials {
  margin-bottom: 4rem;
  text-align: center;
}

.client-testimonials h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.testimonial-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: left;
  position: relative;
}

.quote-mark {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 4rem;
  color: rgba(229, 46, 113, 0.1);
  font-family: 'Georgia', serif;
  line-height: 1;
}

.testimonial-quote {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.8;
  position: relative;
  z-index: 1;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
}

.testimonial-author strong {
  display: block;
  margin-bottom: 0.25rem;
}

.testimonial-author p {
  font-size: 0.9rem;
  color: #666;
}

/* CTA Section */
.cta-container {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.cta-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.cta-content .btn {
  background-color: white;
  color: #e52e71;
}

.cta-content .btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 992px) {
  .intro-content,
  .value-proposition {
    grid-template-columns: 1fr;
  }
  
  .experiences-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .perks-grid {
    grid-template-columns: 1fr;
  }
  
  .experiences-grid,
  .testimonials-container {
    grid-template-columns: 1fr;
  }
  
  .chart-legend {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .partner-logos {
    justify-content: center;
  }
  
  .partner-logo {
    width: 100%;
    text-align: center;
  }
  
  .value-proposition {
    padding: 1.5rem;
  }
  
  .cta-container {
    padding: 2rem 1.5rem;
  }
}
</style>