<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('customers')

const customers = ref([
  {
    id: 1,
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    totalBookings: 5,
    totalSpent: '$24,850',
    lastActivity: '2 days ago',
    tags: ['VIP', 'Honeymoon', 'Europe']
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    email: 'elena.rodriguez@example.com',
    phone: '+1 (555) 987-6543',
    status: 'active',
    totalBookings: 3,
    totalSpent: '$18,200',
    lastActivity: '5 days ago',
    tags: ['Luxury', 'Asia', 'Culinary']
  },
  {
    id: 3,
    name: 'Michael Chang',
    email: 'michael.chang@example.com',
    phone: '+1 (555) 456-7890',
    status: 'inactive',
    totalBookings: 1,
    totalSpent: '$5,800',
    lastActivity: '3 months ago',
    tags: ['Adventure', 'Solo Traveler']
  },
  {
    id: 4,
    name: 'Sophia Kim',
    email: 'sophia.kim@example.com',
    phone: '+1 (555) 789-0123',
    status: 'active',
    totalBookings: 7,
    totalSpent: '$42,600',
    lastActivity: '1 week ago',
    tags: ['VIP', 'Frequent Traveler', 'Wellness']
  },
  {
    id: 5,
    name: 'David Morgan',
    email: 'david.morgan@example.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    totalBookings: 2,
    totalSpent: '$12,400',
    lastActivity: '2 weeks ago',
    tags: ['Honeymoon', 'Caribbean']
  }
])

const bookings = ref([
  {
    id: 1,
    customer: 'James Wilson',
    destination: 'Santorini, Greece',
    dates: 'June 10-17, 2024',
    amount: '$8,500',
    status: 'confirmed',
    type: 'Honeymoon Package'
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    destination: 'Tokyo, Japan',
    dates: 'July 5-15, 2024',
    amount: '$12,200',
    status: 'pending',
    type: 'Luxury Cultural Experience'
  },
  {
    id: 3,
    name: 'Sophia Kim',
    destination: 'Maldives',
    dates: 'August 20-30, 2024',
    amount: '$15,800',
    status: 'confirmed',
    type: 'Overwater Villa Retreat'
  },
  {
    id: 4,
    name: 'David Morgan',
    destination: 'St. Lucia',
    dates: 'September 8-15, 2024',
    amount: '$7,200',
    status: 'pending',
    type: 'Honeymoon Package'
  },
  {
    id: 5,
    name: 'Michael Chang',
    destination: 'Peru',
    dates: 'October 12-22, 2024',
    amount: '$5,800',
    status: 'cancelled',
    type: 'Adventure Tour'
  }
])

const inquiries = ref([
  {
    id: 1,
    customer: 'Alex Thompson',
    subject: 'Honeymoon Planning Assistance',
    date: 'May 16, 2024',
    status: 'new',
    priority: 'high',
    channel: 'email'
  },
  {
    id: 2,
    customer: 'Jordan Lee',
    subject: 'Luxury Safari Options',
    date: 'May 15, 2024',
    status: 'in-progress',
    priority: 'medium',
    channel: 'website'
  },
  {
    id: 3,
    customer: 'Taylor Smith',
    subject: 'Booking Modification Request',
    date: 'May 14, 2024',
    status: 'in-progress',
    priority: 'high',
    channel: 'phone'
  },
  {
    id: 4,
    customer: 'Morgan Rivera',
    subject: 'Pride Month Special Packages',
    date: 'May 13, 2024',
    status: 'resolved',
    priority: 'medium',
    channel: 'chat'
  },
  {
    id: 5,
    customer: 'Casey Johnson',
    subject: 'Group Booking Inquiry',
    date: 'May 12, 2024',
    status: 'new',
    priority: 'low',
    channel: 'email'
  }
])

const selectedCustomer = ref(null)
const searchQuery = ref('')
const statusFilter = ref('all')

const setActiveTab = (tab) => {
  activeTab.value = tab
  selectedCustomer.value = null
}

const selectCustomer = (customer) => {
  selectedCustomer.value = customer
}

const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-active'
    case 'inactive':
      return 'status-inactive'
    case 'confirmed':
      return 'status-confirmed'
    case 'pending':
      return 'status-pending'
    case 'cancelled':
      return 'status-cancelled'
    case 'new':
      return 'status-new'
    case 'in-progress':
      return 'status-in-progress'
    case 'resolved':
      return 'status-resolved'
    default:
      return ''
  }
}

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'high':
      return 'priority-high'
    case 'medium':
      return 'priority-medium'
    case 'low':
      return 'priority-low'
    default:
      return ''
  }
}

const getChannelIcon = (channel) => {
  switch (channel) {
    case 'email':
      return '📧'
    case 'phone':
      return '📞'
    case 'chat':
      return '💬'
    case 'website':
      return '🌐'
    default:
      return '📝'
  }
}

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || customer.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

onMounted(() => {
  // In a real application, this would fetch data from an API
})
</script>

<template>
  <div class="customer-relationship">
    <div class="module-header">
      <h2>Customer Relationship Management</h2>
      <div class="header-actions">
        <button class="action-button">
          <span>➕</span> Add Customer
        </button>
        <button class="action-button primary">
          <span>📊</span> Generate Report
        </button>
      </div>
    </div>
    
    <div class="crm-tabs">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'customers' }"
        @click="setActiveTab('customers')"
      >
        Customers
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'bookings' }"
        @click="setActiveTab('bookings')"
      >
        Bookings
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'inquiries' }"
        @click="setActiveTab('inquiries')"
      >
        Inquiries
      </button>
    </div>
    
    <!-- Customers Tab -->
    <div v-if="activeTab === 'customers'" class="tab-content">
      <div class="filters">
        <div class="search-filter">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search customers..."
          >
        </div>
        
        <div class="status-filter">
          <label for="status-select">Status:</label>
          <select id="status-select" v-model="statusFilter">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <div class="content-grid">
        <div class="customer-list">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="customer in filteredCustomers" 
                :key="customer.id"
                @click="selectCustomer(customer)"
                :class="{ 'selected': selectedCustomer && selectedCustomer.id === customer.id }"
              >
                <td>
                  <div class="customer-name">{{ customer.name }}</div>
                  <div class="customer-email">{{ customer.email }}</div>
                </td>
                <td>
                  <span class="status-badge" :class="getStatusClass(customer.status)">
                    {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                  </span>
                </td>
                <td>{{ customer.totalBookings }}</td>
                <td>{{ customer.totalSpent }}</td>
                <td>{{ customer.lastActivity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="customer-detail" v-if="selectedCustomer">
          <div class="detail-header">
            <h3>{{ selectedCustomer.name }}</h3>
            <div class="detail-actions">
              <button class="action-button">
                <span>✏️</span> Edit
              </button>
              <button class="action-button">
                <span>📧</span> Email
              </button>
              <button class="action-button">
                <span>📞</span> Call
              </button>
            </div>
          </div>
          
          <div class="detail-content">
            <div class="detail-section">
              <h4>Contact Information</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <div class="detail-label">Email:</div>
                  <div class="detail-value">{{ selectedCustomer.email }}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Phone:</div>
                  <div class="detail-value">{{ selectedCustomer.phone }}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Status:</div>
                  <div class="detail-value">
                    <span class="status-badge" :class="getStatusClass(selectedCustomer.status)">
                      {{ selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Customer Profile</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <div class="detail-label">Total Bookings:</div>
                  <div class="detail-value">{{ selectedCustomer.totalBookings }}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Total Spent:</div>
                  <div class="detail-value">{{ selectedCustomer.totalSpent }}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Last Activity:</div>
                  <div class="detail-value">{{ selectedCustomer.lastActivity }}</div>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Tags</h4>
              <div class="tags-container">
                <span 
                  v-for="(tag, index) in selectedCustomer.tags" 
                  :key="index"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Recent Activity</h4>
              <div class="activity-timeline">
                <div class="timeline-item">
                  <div class="timeline-icon">📧</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Email Sent: Booking Confirmation</div>
                    <div class="timeline-date">May 15, 2024</div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">💰</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Payment Received: $8,500</div>
                    <div class="timeline-date">May 12, 2024</div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">📞</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Phone Call: Booking Inquiry</div>
                    <div class="timeline-date">May 10, 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bookings Tab -->
    <div v-if="activeTab === 'bookings'" class="tab-content">
      <div class="bookings-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Destination</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>#{{ booking.id }}</td>
              <td>{{ booking.customer || booking.name }}</td>
              <td>{{ booking.destination }}</td>
              <td>{{ booking.dates }}</td>
              <td>{{ booking.amount }}</td>
              <td>
                <span class="status-badge" :class="getStatusClass(booking.status)">
                  {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                </span>
              </td>
              <td>{{ booking.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Inquiries Tab -->
    <div v-if="activeTab === 'inquiries'" class="tab-content">
      <div class="inquiries-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Channel</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inquiry in inquiries" :key="inquiry.id">
              <td>#{{ inquiry.id }}</td>
              <td>{{ inquiry.customer }}</td>
              <td>{{ inquiry.subject }}</td>
              <td>{{ inquiry.date }}</td>
              <td>
                <span class="status-badge" :class="getStatusClass(inquiry.status)">
                  {{ inquiry.status.replace('-', ' ').charAt(0).toUpperCase() + inquiry.status.replace('-', ' ').slice(1) }}
                </span>
              </td>
              <td>
                <span class="priority-badge" :class="getPriorityClass(inquiry.priority)">
                  {{ inquiry.priority.charAt(0).toUpperCase() + inquiry.priority.slice(1) }}
                </span>
              </td>
              <td>
                <span class="channel-icon">{{ getChannelIcon(inquiry.channel) }}</span>
                {{ inquiry.channel.charAt(0).toUpperCase() + inquiry.channel.slice(1) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-relationship {
  padding: 1.5rem;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.module-header h2 {
  margin: 0;
  font-size: 1.8rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button span {
  margin-right: 0.5rem;
}

.action-button:hover {
  background-color: #e0e0e0;
}

.action-button.primary {
  background-color: #e52e71;
  color: white;
  border-color: #e52e71;
}

.action-button.primary:hover {
  background-color: #d41b5f;
}

.crm-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
}

.tab-button {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background-color: #f5f7fa;
}

.tab-button.active {
  border-bottom-color: #e52e71;
  font-weight: 600;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.search-filter {
  flex: 1;
  max-width: 400px;
}

.search-filter input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-filter select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.customer-list, .bookings-list, .inquiries-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f5f7fa;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  color: #666;
}

td {
  padding: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
}

tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

tr:hover {
  background-color: #f9f9f9;
}

tr.selected {
  background-color: rgba(229, 46, 113, 0.05);
}

.customer-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.customer-email {
  font-size: 0.8rem;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-active, .status-confirmed, .status-resolved {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-inactive, .status-cancelled {
  background-color: #ffebee;
  color: #c62828;
}

.status-pending, .status-in-progress {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-new {
  background-color: #fff8e1;
  color: #f57f17;
}

.priority-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.priority-high {
  background-color: #ffebee;
  color: #c62828;
}

.priority-medium {
  background-color: #fff8e1;
  color: #f57f17;
}

.priority-low {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.channel-icon {
  margin-right: 0.5rem;
}

.customer-detail {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.detail-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.detail-actions {
  display: flex;
  gap: 0.5rem;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #666;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.9rem;
  color: #666;
}

.detail-value {
  font-weight: 600;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #f5f7fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
}

.timeline-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f7fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.timeline-date {
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 1200px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .customer-detail {
    margin-top: 1.5rem;
  }
}

@media (max-width: 768px) {
  .module-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .action-button {
    flex: 1;
    justify-content: center;
  }
  
  .crm-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
  }
  
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-filter {
    max-width: 100%;
  }
  
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .detail-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>