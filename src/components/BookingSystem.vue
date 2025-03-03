<script setup>
import { ref, reactive } from 'vue'

const bookingStep = ref(1)
const formData = reactive({
  destination: '',
  experience: '',
  dates: {
    checkIn: '',
    checkOut: ''
  },
  travelers: {
    adults: 2,
    children: 0
  },
  accommodation: '',
  specialRequests: '',
  contactInfo: {
    name: '',
    email: '',
    phone: ''
  },
  paymentInfo: {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  }
})

const destinations = [
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asia' },
  { id: 'americas', name: 'Americas' },
  { id: 'africa', name: 'Africa' },
  { id: 'oceania', name: 'Oceania' }
]

const experiences = [
  { id: 'honeymoon', name: 'Honeymoon' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'culinary', name: 'Culinary' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'pride', name: 'Pride Events' }
]

const accommodations = [
  { id: 'hotel', name: 'Luxury Hotel' },
  { id: 'villa', name: 'Private Villa' },
  { id: 'resort', name: 'All-Inclusive Resort' },
  { id: 'boutique', name: 'Boutique Hotel' },
  { id: 'yacht', name: 'Yacht Charter' }
]

const nextStep = () => {
  if (bookingStep.value < 4) {
    bookingStep.value++
  }
}

const prevStep = () => {
  if (bookingStep.value > 1) {
    bookingStep.value--
  }
}

const submitBooking = () => {
  // In a real application, this would send the data to a server
  alert('Thank you for your booking! A travel specialist will contact you shortly to confirm your reservation.')
  bookingStep.value = 1
  // Reset form data
  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'object') {
      Object.keys(formData[key]).forEach(subKey => {
        formData[key][subKey] = ''
      })
    } else {
      formData[key] = ''
    }
  })
  formData.travelers.adults = 2
  formData.travelers.children = 0
}

const incrementTraveler = (type) => {
  formData.travelers[type]++
}

const decrementTraveler = (type) => {
  if (formData.travelers[type] > 0) {
    formData.travelers[type]--
  }
}
</script>

<template>
  <section class="booking-system">
    <div class="container">
      <div class="section-header">
        <h2>Book Your Dream Experience</h2>
        <p>Let us create a personalized luxury journey that celebrates your authentic self</p>
      </div>
      
      <div class="booking-progress">
        <div class="progress-step" :class="{ 'active': bookingStep >= 1, 'completed': bookingStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-label">Trip Details</div>
        </div>
        <div class="progress-line" :class="{ 'active': bookingStep > 1 }"></div>
        <div class="progress-step" :class="{ 'active': bookingStep >= 2, 'completed': bookingStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-label">Traveler Info</div>
        </div>
        <div class="progress-line" :class="{ 'active': bookingStep > 2 }"></div>
        <div class="progress-step" :class="{ 'active': bookingStep >= 3, 'completed': bookingStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-label">Payment</div>
        </div>
        <div class="progress-line" :class="{ 'active': bookingStep > 3 }"></div>
        <div class="progress-step" :class="{ 'active': bookingStep >= 4 }">
          <div class="step-number">4</div>
          <div class="step-label">Confirmation</div>
        </div>
      </div>
      
      <div class="booking-form-container">
        <!-- Step 1: Trip Details -->
        <div v-if="bookingStep === 1" class="booking-form">
          <h3>Trip Details</h3>
          
          <div class="form-group">
            <label for="destination">Destination</label>
            <select id="destination" v-model="formData.destination" required>
              <option value="" disabled selected>Select your destination</option>
              <option v-for="destination in destinations" :key="destination.id" :value="destination.id">
                {{ destination.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="experience">Experience Type</label>
            <select id="experience" v-model="formData.experience" required>
              <option value="" disabled selected>Select experience type</option>
              <option v-for="experience in experiences" :key="experience.id" :value="experience.id">
                {{ experience.name }}
              </option>
            </select>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="check-in">Check-in Date</label>
              <input type="date" id="check-in" v-model="formData.dates.checkIn" required>
            </div>
            
            <div class="form-group">
              <label for="check-out">Check-out Date</label>
              <input type="date" id="check-out" v-model="formData.dates.checkOut" required>
            </div>
          </div>
          
          <div class="form-group">
            <label>Number of Travelers</label>
            <div class="traveler-counter">
              <div class="counter-group">
                <span>Adults</span>
                <div class="counter-controls">
                  <button type="button" @click="decrementTraveler('adults')" class="counter-btn">-</button>
                  <span class="counter-value">{{ formData.travelers.adults }}</span>
                  <button type="button" @click="incrementTraveler('adults')" class="counter-btn">+</button>
                </div>
              </div>
              
              <div class="counter-group">
                <span>Children</span>
                <div class="counter-controls">
                  <button type="button" @click="decrementTraveler('children')" class="counter-btn">-</button>
                  <span class="counter-value">{{ formData.travelers.children }}</span>
                  <button type="button" @click="incrementTraveler('children')" class="counter-btn">+</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="accommodation">Preferred Accommodation</label>
            <select id="accommodation" v-model="formData.accommodation" required>
              <option value="" disabled selected>Select accommodation type</option>
              <option v-for="accommodation in accommodations" :key="accommodation.id" :value="accommodation.id">
                {{ accommodation.name }}
              </option>
            </select>
          </div>
          
          <div class="form-actions">
            <button @click="nextStep" class="btn" :disabled="!formData.destination || !formData.experience || !formData.dates.checkIn || !formData.dates.checkOut || !formData.accommodation">
              Continue to Traveler Info
            </button>
          </div>
        </div>
        
        <!-- Step 2: Traveler Information -->
        <div v-if="bookingStep === 2" class="booking-form">
          <h3>Traveler Information</h3>
          
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" v-model="formData.contactInfo.name" placeholder="As it appears on your ID" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="formData.contactInfo.email" placeholder="For booking confirmation" required>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" v-model="formData.contactInfo.phone" placeholder="For urgent communications" required>
          </div>
          
          <div class="form-group">
            <label for="special-requests">Special Requests</label>
            <textarea id="special-requests" v-model="formData.specialRequests" placeholder="Any special requirements or preferences?" rows="4"></textarea>
          </div>
          
          <div class="form-actions">
            <button @click="prevStep" class="btn btn-secondary">Back</button>
            <button @click="nextStep" class="btn" :disabled="!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone">
              Continue to Payment
            </button>
          </div>
        </div>
        
        <!-- Step 3: Payment Information -->
        <div v-if="bookingStep === 3" class="booking-form">
          <h3>Payment Information</h3>
          
          <div class="form-group">
            <label for="card-name">Name on Card</label>
            <input type="text" id="card-name" v-model="formData.paymentInfo.cardName" required>
          </div>
          
          <div class="form-group">
            <label for="card-number">Card Number</label>
            <input type="text" id="card-number" v-model="formData.paymentInfo.cardNumber" placeholder="XXXX XXXX XXXX XXXX" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="expiry">Expiry Date</label>
              <input type="text" id="expiry" v-model="formData.paymentInfo.expiry" placeholder="MM/YY" required>
            </div>
            
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input type="text" id="cvv" v-model="formData.paymentInfo.cvv" placeholder="XXX" required>
            </div>
          </div>
          
          <div class="payment-notice">
            <p>Your card will not be charged until your booking is confirmed by our travel specialists.</p>
          </div>
          
          <div class="form-actions">
            <button @click="prevStep" class="btn btn-secondary">Back</button>
            <button @click="nextStep" class="btn" :disabled="!formData.paymentInfo.cardName || !formData.paymentInfo.cardNumber || !formData.paymentInfo.expiry || !formData.paymentInfo.cvv">
              Review Booking
            </button>
          </div>
        </div>
        
        <!-- Step 4: Confirmation -->
        <div v-if="bookingStep === 4" class="booking-form">
          <h3>Review Your Booking</h3>
          
          <div class="booking-summary">
            <div class="summary-section">
              <h4>Trip Details</h4>
              <div class="summary-item">
                <span class="summary-label">Destination:</span>
                <span class="summary-value">{{ destinations.find(d => d.id === formData.destination)?.name }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Experience:</span>
                <span class="summary-value">{{ experiences.find(e => e.id === formData.experience)?.name }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Dates:</span>
                <span class="summary-value">{{ formData.dates.checkIn }} to {{ formData.dates.checkOut }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Travelers:</span>
                <span class="summary-value">{{ formData.travelers.adults }} Adults, {{ formData.travelers.children }} Children</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Accommodation:</span>
                <span class="summary-value">{{ accommodations.find(a => a.id === formData.accommodation)?.name }}</span>
              </div>
            </div>
            
            <div class="summary-section">
              <h4>Contact Information</h4>
              <div class="summary-item">
                <span class="summary-label">Name:</span>
                <span class="summary-value">{{ formData.contactInfo.name }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Email:</span>
                <span class="summary-value">{{ formData.contactInfo.email }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Phone:</span>
                <span class="summary-value">{{ formData.contactInfo.phone }}</span>
              </div>
            </div>
            
            <div class="summary-section" v-if="formData.specialRequests">
              <h4>Special Requests</h4>
              <p>{{ formData.specialRequests }}</p>
            </div>
          </div>
          
          <div class="terms-agreement">
            <input type="checkbox" id="terms" required>
            <label for="terms">I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></label>
          </div>
          
          <div class="form-actions">
            <button @click="prevStep" class="btn btn-secondary">Back</button>
            <button @click="submitBooking" class="btn">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.booking-system {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.booking-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
}

.progress-step.completed .step-number {
  background: #4CAF50;
  color: white;
}

.step-label {
  font-size: 0.9rem;
  color: #666;
  transition: all 0.3s ease;
}

.progress-step.active .step-label {
  color: #333;
  font-weight: 600;
}

.progress-line {
  flex-grow: 1;
  height: 3px;
  background-color: #ddd;
  position: relative;
  z-index: 0;
  transition: all 0.3s ease;
}

.progress-line.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
}

.booking-form-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.booking-form {
  padding: 2rem;
}

.booking-form h3 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #e52e71;
  box-shadow: 0 0 0 2px rgba(229, 46, 113, 0.2);
}

.traveler-counter {
  display: flex;
  gap: 2rem;
}

.counter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.counter-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.counter-btn:hover {
  background-color: #f5f5f5;
}

.counter-value {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.payment-notice {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.payment-notice p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.booking-summary {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.summary-section {
  margin-bottom: 1.5rem;
}

.summary-section h4 {
  margin-bottom: 0.75rem;
  color: #e52e71;
}

.summary-item {
  display: flex;
  margin-bottom: 0.5rem;
}

.summary-label {
  font-weight: 600;
  width: 120px;
  color: #555;
}

.terms-agreement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.terms-agreement input {
  width: auto;
}

.terms-agreement a {
  color: #e52e71;
  text-decoration: none;
}

.terms-agreement a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .booking-progress {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .progress-line {
    width: 3px;
    height: 20px;
    margin-left: 20px;
  }
  
  .progress-step {
    flex-direction: row;
    gap: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .traveler-counter {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>