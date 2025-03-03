<script setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'

const props = defineProps({
  systemStatus: {
    type: Object,
    required: true
  }
})

const stats = ref({
  users: {
    total: 2145,
    active: 876,
    new: 124,
    growth: 12.5
  },
  content: {
    blogs: 342,
    forums: 1876,
    products: 156,
    pending: 18
  },
  interactions: {
    bookings: 876,
    inquiries: 234,
    reviews: 1245,
    support: 87
  },
  revenue: {
    monthly: '$124,500',
    growth: 8.7,
    forecast: '$135,000',
    average: '$2,450'
  }
})

const recentActivities = ref([
  {
    id: 1,
    type: 'booking',
    user: 'James Wilson',
    action: 'Booked Santorini Luxury Package',
    time: '10 minutes ago',
    amount: '$5,800'
  },
  {
    id: 2,
    type: 'content',
    user: 'Admin System',
    action: 'Generated new blog post: "Top 10 LGBTQ+ Friendly Destinations"',
    time: '45 minutes ago',
    amount: null
  },
  {
    id: 3,
    type: 'support',
    user: 'Elena Rodriguez',
    action: 'Submitted support ticket: Booking modification request',
    time: '1 hour ago',
    amount: null
  },
  {
    id: 4,
    type: 'ai',
    user: 'AI Assistant',
    action: 'Processed 24 customer inquiries via chat',
    time: '2 hours ago',
    amount: null
  },
  {
    id: 5,
    type: 'booking',
    user: 'Michael Chang',
    action: 'Booked Tokyo Culinary Experience',
    time: '3 hours ago',
    amount: '$3,200'
  }
])

const currentDate = ref(format(new Date(), 'EEEE, MMMM d, yyyy'))
const chartData = ref(null)

const getStatusColor = (status) => {
  switch (status) {
    case 'operational':
      return '#4CAF50'
    case 'degraded':
      return '#FF9800'
    case 'outage':
      return '#F44336'
    default:
      return '#9E9E9E'
  }
}

const getActivityIcon = (type) => {
  switch (type) {
    case 'booking':
      return '🛫'
    case 'content':
      return '📝'
    case 'support':
      return '🎧'
    case 'ai':
      return '🤖'
    default:
      return '📊'
  }
}

onMounted(() => {
  // In a real application, this would fetch data from an API
  // For now, we're using static data
})
</script>

<template>
  <div class="dashboard-overview">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard Overview</h1>
        <p class="current-date">{{ currentDate }}</p>
      </div>
      <div class="dashboard-actions">
        <button class="action-button">
          <span>📊</span> Generate Report
        </button>
        <button class="action-button primary">
          <span>🔄</span> Refresh Data
        </button>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <h3>User Statistics</h3>
          <span class="stat-icon">👥</span>
        </div>
        <div class="stat-content">
          <div class="stat-item">
            <span class="stat-label">Total Users</span>
            <span class="stat-value">{{ stats.users.total }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Users</span>
            <span class="stat-value">{{ stats.users.active }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">New Users (30d)</span>
            <span class="stat-value">{{ stats.users.new }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Growth Rate</span>
            <span class="stat-value">+{{ stats.users.growth }}%</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>Content Metrics</h3>
          <span class="stat-icon">📝</span>
        </div>
        <div class="stat-content">
          <div class="stat-item">
            <span class="stat-label">Blog Posts</span>
            <span class="stat-value">{{ stats.content.blogs }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Forum Topics</span>
            <span class="stat-value">{{ stats.content.forums }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Products</span>
            <span class="stat-value">{{ stats.content.products }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Pending Approval</span>
            <span class="stat-value">{{ stats.content.pending }}</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>Customer Interactions</h3>
          <span class="stat-icon">🤝</span>
        </div>
        <div class="stat-content">
          <div class="stat-item">
            <span class="stat-label">Bookings</span>
            <span class="stat-value">{{ stats.interactions.bookings }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Inquiries</span>
            <span class="stat-value">{{ stats.interactions.inquiries }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Reviews</span>
            <span class="stat-value">{{ stats.interactions.reviews }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Support Tickets</span>
            <span class="stat-value">{{ stats.interactions.support }}</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-header">
          <h3>Revenue Overview</h3>
          <span class="stat-icon">💰</span>
        </div>
        <div class="stat-content">
          <div class="stat-item">
            <span class="stat-label">Monthly Revenue</span>
            <span class="stat-value">{{ stats.revenue.monthly }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Growth Rate</span>
            <span class="stat-value">+{{ stats.revenue.growth }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Next Month Forecast</span>
            <span class="stat-value">{{ stats.revenue.forecast }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Avg. Booking Value</span>
            <span class="stat-value">{{ stats.revenue.average }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-row">
      <div class="system-status">
        <h3>System Status</h3>
        <div class="status-section">
          <h4>AI Models</h4>
          <div class="status-items">
            <div 
              v-for="(status, model) in systemStatus.aiModels" 
              :key="model"
              class="status-item"
            >
              <div class="status-name">{{ model.charAt(0).toUpperCase() + model.slice(1) }}</div>
              <div class="status-indicator">
                <span 
                  class="status-dot"
                  :style="{ backgroundColor: getStatusColor(status) }"
                ></span>
                <span class="status-text">{{ status.charAt(0).toUpperCase() + status.slice(1) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="status-section">
          <h4>Databases</h4>
          <div class="status-items">
            <div 
              v-for="(status, db) in systemStatus.databases" 
              :key="db"
              class="status-item"
            >
              <div class="status-name">{{ db.charAt(0).toUpperCase() + db.slice(1) }}</div>
              <div class="status-indicator">
                <span 
                  class="status-dot"
                  :style="{ backgroundColor: getStatusColor(status) }"
                ></span>
                <span class="status-text">{{ status.charAt(0).toUpperCase() + status.slice(1) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="status-section">
          <h4>Services</h4>
          <div class="status-items">
            <div 
              v-for="(status, service) in systemStatus.services" 
              :key="service"
              class="status-item"
            >
              <div class="status-name">{{ service.charAt(0).toUpperCase() + service.slice(1) }}</div>
              <div class="status-indicator">
                <span 
                  class="status-dot"
                  :style="{ backgroundColor: getStatusColor(status) }"
                ></span>
                <span class="status-text">{{ status.charAt(0).toUpperCase() + status.slice(1) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id"
            class="activity-item"
          >
            <div class="activity-icon">
              {{ getActivityIcon(activity.type) }}
            </div>
            <div class="activity-content">
              <div class="activity-header">
                <span class="activity-user">{{ activity.user }}</span>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
              <div class="activity-action">{{ activity.action }}</div>
              <div v-if="activity.amount" class="activity-amount">{{ activity.amount }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview {
  color: #333;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.current-date {
  color: #666;
  margin-top: 0.5rem;
}

.dashboard-actions {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.stat-header h3 {
  margin: 0;
  font-size: 1rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  padding: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.stat-value {
  font-weight: 600;
}

.dashboard-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.system-status, .recent-activity {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.system-status h3, .recent-activity h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.status-section {
  margin-bottom: 1.5rem;
}

.status-section:last-child {
  margin-bottom: 0;
}

.status-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #666;
}

.status-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-name {
  font-weight: 500;
}

.status-indicator {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-text {
  font-size: 0.9rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.activity-icon {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.activity-content {
  flex: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.activity-user {
  font-weight: 600;
}

.activity-time {
  font-size: 0.8rem;
  color: #888;
}

.activity-action {
  margin-bottom: 0.25rem;
}

.activity-amount {
  font-weight: 600;
  color: #4CAF50;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .dashboard-row {
    grid-template-columns: 1fr;
  }
  
  .system-status {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .dashboard-actions {
    margin-top: 1rem;
    width: 100%;
  }
  
  .action-button {
    flex: 1;
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .status-items {
    grid-template-columns: 1fr;
  }
}
</style>