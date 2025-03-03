<script setup>
const testimonials = [
  {
    id: 1,
    text: "QueerLuxe Travel didn't just plan our honeymoon, they crafted a MOMENT, honey! From the second we arrived, we weren't just welcomed—we were CELEBRATED like the royalty we are!",
    author: "James & David",
    trip: "Bali Retreat, 2024",
    image: "/api/placeholder/50/50"
  },
  {
    id: 2,
    text: "As a non-binary traveler, finding spaces where I can truly serve authenticity has been a struggle. QueerLuxe created an experience where I could live my TRUTH without compromise. The category is: LUXURY REALNESS!",
    author: "Alex T.",
    trip: "Tokyo Luxury Tour, 2023",
    image: "/api/placeholder/50/50"
  },
  {
    id: 3,
    text: "The attention to detail was EVERYTHING! Every establishment knew we were celebrating our anniversary and turned it OUT. This wasn't just travel—it was a full-on PRODUCTION, darling!",
    author: "Maria & Elena",
    trip: "Amalfi Coast Experience, 2024",
    image: "/api/placeholder/50/50"
  }
]

const partners = [
  { id: 1, image: "/api/placeholder/150/80", alt: "Luxury Hotel Partner" },
  { id: 2, image: "/api/placeholder/150/80", alt: "Luxury Hotel Partner" },
  { id: 3, image: "/api/placeholder/150/80", alt: "Luxury Hotel Partner" },
  { id: 4, image: "/api/placeholder/150/80", alt: "Luxury Hotel Partner" },
  { id: 5, image: "/api/placeholder/150/80", alt: "Luxury Hotel Partner" }
]

const badges = [
  { id: 1, image: "/api/placeholder/80/80", text: "Safety Commitment" },
  { id: 2, image: "/api/placeholder/80/80", text: "LGBTQ+ Travel Certified" },
  { id: 3, image: "/api/placeholder/80/80", text: "Luxury Travel Specialist" }
]
</script>

<template>
  <section class="trust-indicators">
    <div class="container">
      <h2>Trusted by the <span class="highlight">ICONS</span> of Luxury Travel</h2>
      
      <div class="partners">
        <img 
          v-for="partner in partners" 
          :key="partner.id" 
          :src="partner.image" 
          :alt="partner.alt" 
          class="partner"
        >
      </div>
      
      <div class="testimonials">
        <h3>The <span class="highlight">TEA</span> from Our Travelers</h3>
        <div class="testimonial-container">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id" 
            class="testimonial"
          >
            <p>"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <img :src="testimonial.image" alt="Testimonial Author">
              <div>
                <strong>{{ testimonial.author }}</strong>
                <p>{{ testimonial.trip }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="badges">
        <div 
          v-for="badge in badges" 
          :key="badge.id" 
          class="badge"
        >
          <img :src="badge.image" :alt="badge.text">
          <span>{{ badge.text }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Trust Indicators */
.trust-indicators {
  background-color: #f9f9f9;
  text-align: center;
  padding: 4rem 0;
}

.trust-indicators h2 {
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.highlight {
  color: #e52e71;
  font-style: italic;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
}

.partners {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.partner {
  width: 150px;
  height: 80px;
  margin: 1rem;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.partner:hover {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.05);
}

.badges {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  transition: transform 0.3s ease;
}

.badge:hover {
  transform: translateY(-5px);
}

.badge img {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
}

.badge span {
  font-size: 0.9rem;
  text-align: center;
  font-weight: 600;
}

/* Testimonials */
.testimonials {
  margin: 3rem 0;
}

.testimonials h3 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.testimonial-container {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: none;
}

.testimonial-container::-webkit-scrollbar {
  display: none;
}

.testimonial {
  min-width: 350px;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid #e52e71;
}

.testimonial:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(229, 46, 113, 0.2);
}

.testimonial p {
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
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
  border: 2px solid #e52e71;
}

@media (max-width: 576px) {
  .partners {
    justify-content: center;
  }
  
  .trust-indicators h2 {
    font-size: 2rem;
  }
  
  .testimonials h3 {
    font-size: 1.5rem;
  }
}
</style>