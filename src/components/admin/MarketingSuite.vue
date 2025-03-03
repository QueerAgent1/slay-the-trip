<script setup>
import { ref, computed, onMounted } from 'vue'

const activeTab = ref('campaigns')

const campaigns = ref([
  {
    id: 1,
    name: 'Summer Pride Destinations',
    type: 'email',
    status: 'active',
    audience: 'LGBTQ+ Travelers',
    startDate: 'May 15, 2024',
    endDate: 'June 15, 2024',
    sent: 5240,
    opened: 3980,
    clicked: 1876,
    conversion: 342
  },
  {
    id: 2,
    name: 'Luxury Honeymoon Packages',
    type: 'email',
    status: 'scheduled',
    audience: 'Newlyweds',
    startDate: 'June 1, 2024',
    endDate: 'July 1, 2024',
    sent: 0,
    opened: 0,
    clicked: 0,
    conversion: 0
  },
  {
    id: 3,
    name: 'Exclusive Maldives Promotion',
    type: 'social',
    status: 'active',
    audience: 'Luxury Travelers',
    startDate: 'May 10, 2024',
    endDate: 'June 10, 2024',
    sent: 0,
    opened: 0,
    clicked: 0,
    conversion: 0
  },
  {
    id: 4,
    name: 'Fall Culinary Experiences',
    type: 'email',
    status: 'draft',
    audience: 'Foodies',
    startDate: 'September 1, 2024',
    endDate: 'October 1, 2024',
    sent: 0,
    opened: 0,
    clicked: 0,
    conversion: 0
  },
  {
    id: 5,
    name: 'Winter Wellness Retreats',
    type: 'sms',
    status: 'draft',
    audience: 'Wellness Enthusiasts',
    startDate: 'November 15, 2024',
    endDate: 'December 15, 2024',
    sent: 0,
    opened: 0,
    clicked: 0,
    conversion: 0
  },
  {
    id: 6,
    name: 'Spring 2025 Early Booking',
    type: 'email',
    status: 'draft',
    audience: 'All Subscribers',
    startDate: 'January 10, 2025',
    endDate: 'February 10, 2025',
    sent: 0,
    opened: 0,
    clicked: 0,
    conversion: 0
  },
  {
    id: 7,
    name: 'Last Year Pride Campaign',
    type: 'email',
    status: 'completed',
    audience: 'LGBTQ+ Travelers',
    startDate: 'May 15, 2023',
    endDate: 'June 15, 2023',
    sent: 4870,
    opened: 3560,
    clicked: 1650,
    conversion: 298
  }
])

const audiences = ref([
  {
    id: 1,
    name: 'LGBTQ+ Travelers',
    size: 5420,
    description: 'Travelers who identify as LGBTQ+ and are interested in luxury travel experiences',
    tags: ['LGBTQ+', 'Luxury', 'Travel'],
    lastUpdated: 'May 15, 2024'
  },
  {
    id: 2,
    name: 'Newlyweds',
    size: 1870,
    description: 'Recently married couples looking for honeymoon and romantic getaway experiences',
    tags: ['Honeymoon', 'Couples', 'Romance'],
    lastUpdated: 'May 12, 2024'
  },
  {
    id: 3,
    name: 'Foodies',
    size: 3250,
    description: 'Travelers interested in culinary experiences, food tours, and cooking classes',
    tags: ['Culinary', 'Experiences', 'Gourmet'],
    lastUpdated: 'May 10, 2024'
  },
  {
    id: 4,
    name: 'Wellness Enthusiasts',
    size: 2780,
    description: 'Travelers seeking wellness retreats, spa experiences, and mindfulness activities',
    tags: ['Wellness', 'Spa', 'Mindfulness'],
    lastUpdated: 'May 8, 2024'
  },
  {
    id: 5,
    name: 'Luxury Travelers',
    size: 6540,
    description: 'High-income travelers seeking premium experiences and accommodations',
    tags: ['Luxury', 'Premium', 'Exclusive'],
    lastUpdated: 'May 5, 2024'
  }
])

const templates = ref([
  {
    id: 1,
    name: 'Pride Month Special',
    type: 'email',
    lastUsed: 'May 15, 2024',
    performance: 'High'
  },
  {
    id: 2,
    name: 'Luxury Destination Spotlight',
    type: 'email',
    lastUsed: 'May 10, 2024',
    performance: 'Medium'
  },
  {
    id: 3,
    name: 'Last Minute Deal',
    type: 'sms',
    lastUsed: 'May 5, 2024',
    performance: 'High'
  },
  {
    id: 4,
    name: 'Seasonal Promotion',
    type: 'email',
    lastUsed: 'April 28, 2024',
    performance: 'Medium'
  },
  {
    id: 5,
    name: 'New Experience Announcement',
    type: 'social',
    lastUsed: 'April 20, 2024',
    performance: 'High'
  }
])

const selectedCampaign = ref(null)
const searchQuery = ref('')
const statusFilter = ref('all')
const typeFilter = ref('all')

const filteredCampaigns = computed(() => {
  return campaigns.value.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || campaign.status === statusFilter.value
    const matchesType = typeFilter.value === 'all' || campaign.type === typeFilter.value
    
    return matchesSearch && matchesStatus && matchesType
  })
})

const setActiveTab = (tab) => {
  activeTab.value = tab
  selectedCampaign.value = null
}

const selectCampaign = (campaign) => {
  selectedCampaign.value = campaign
}

const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-active'
    case 'scheduled':
      return 'status-scheduled'
    case 'draft':
      return 'status-draft'
    case 'completed':
      return 'status-completed'
    default:
      return ''
  }
}

const getPerformanceClass = (performance) => {
  switch (performance) {
    case 'High':
      return 'performance-high'
    case 'Medium':
      return 'performance-medium'
    case 'Low':
      return 'performance-low'
    default:
      return ''
  }
}
</script>

<template>
  <div class="marketing-suite">
    <div class="module-header">
      <h1>Marketing Suite</h1>
      <div class="header-actions">
        <button class="action-button">
          <span>📊</span> Analytics
        </button>
        <button class="action-button primary">
          <span>➕</span> Create Campaign
        </button>
      </div>
    </div>
    
    <div class="marketing-tabs">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'campaigns' }"
        @click="setActiveTab('campaigns')"
      >
        Campaigns
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'audiences' }"
        @click="setActiveTab('audiences')"
      >
        Audiences
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'templates' }"
        @click="setActiveTab('templates')"
      >
        Templates
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'automation' }"
        @click="setActiveTab('automation')"
      >
        Automation
      </button>
    </div>
    
    <!-- Campaigns Tab -->
    <div v-if="activeTab === 'campaigns'" class="tab-content">
      <div class="filters">
        <div class="search-filter">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search campaigns..."
          >
        </div>
        
        <div class="filter-options">
          <select v-model="statusFilter" class="filter-select">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
          
          <select v-model="typeFilter" class="filter-select">
            <option value="all">All Types</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="social">Social</option>
          </select>
          
          <button class="action-button">
            <span>🔄</span> Refresh
          </button>
        </div>
      </div>
      
      <div class="campaigns-container">
        <div class="campaigns-list">
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Audience</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="campaign in filteredCampaigns" 
                :key="campaign.id"
                @click="selectCampaign(campaign)"
                :class="{ 'selected': selectedCampaign && selectedCampaign.id === campaign.id }"
              >
                <td>{{ campaign.name }}</td>
                <td>{{ campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1) }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(campaign.status)">
                    {{ campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1) }}
                  </span>
                </td>
                <td>{{ campaign.audience }}</td>
                <td>{{ campaign.startDate }}</td>
                <td>{{ campaign.endDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="campaign-detail" v-if="selectedCampaign">
          <div class="detail-header">
            <h2>{{ selectedCampaign.name }}</h2>
            <div class="detail-actions">
              <button class="action-button" v-if="selectedCampaign.status === 'draft'">
                <span>▶️</span> Schedule
              </button>
              <button class="action-button" v-if="selectedCampaign.status === 'scheduled'">
                <span>▶️</span> Activate Now
              </button>
              <button class="action-button" v-if="selectedCampaign.status === 'active'">
                <span>⏸️</span> Pause
              </button>
              <button class="action-button">
                <span>✏️</span> Edit
              </button>
              <button class="action-button">
                <span>🔄</span> Duplicate
              </button>
            </div>
          </div>
          
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Type:</span>
              <span class="meta-value">{{ selectedCampaign.type.charAt(0).toUpperCase() + selectedCampaign.type.slice(1) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Status:</span>
              <span class="meta-value status-badge" :class="getStatusClass(selectedCampaign.status)">
                {{ selectedCampaign.status.charAt(0).toUpperCase() + selectedCampaign.status.slice(1) }}
              </span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Audience:</span>
              <span class="meta-value">{{ selectedCampaign.audience }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Duration:</span>
              <span class="meta-value">{{ selectedCampaign.startDate }} to {{ selectedCampaign.endDate }}</span>
            </div>
          </div>
          
          <div class="campaign-metrics" v-if="selectedCampaign.status === 'active' || selectedCampaign.status === 'completed'">
            <h3>Campaign Metrics</h3>
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-title">Sent</div>
                <div class="metric-value">{{ selectedCampaign.sent }}</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Opened</div>
                <div class="metric-value">{{ selectedCampaign.opened }}</div>
                <div class="metric-rate">{{ Math.round((selectedCampaign.opened / selectedCampaign.sent) * 100) }}%</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Clicked</div>
                <div class="metric-value">{{ selectedCampaign.clicked }}</div>
                <div class="metric-rate">{{ Math.round((selectedCampaign.clicked / selectedCampaign.opened) * 100) }}%</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Conversions</div>
                <div class="metric-value">{{ selectedCampaign.conversion }}</div>
                <div class="metric-rate">{{ Math.round((selectedCampaign.conversion / selectedCampaign.clicked) * 100) }}%</div>
              </div>
            </div>
            
            <div class="chart-placeholder">
              Campaign performance chart would be displayed here
            </div>
          </div>
          
          <div class="campaign-content">
            <h3>Campaign Content</h3>
            <div class="content-preview">
              <div class="preview-placeholder">
                <p>Campaign content preview would be displayed here in the actual system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Audiences Tab -->
    <div v-if="activeTab === 'audiences'" class="tab-content">
      <div class="filters">
        <div class="search-filter">
          <input type="text" placeholder="Search audiences...">
        </div>
        
        <div class="filter-actions">
          <button class="action-button">
            <span>➕</span> Create Audience
          </button>
          <button class="action-button">
            <span>📤</span> Import
          </button>
        </div>
      </div>
      
      <div class="audiences-grid">
        <div 
          v-for="audience in audiences" 
          :key="audience.id"
          class="audience-card"
        >
          <div class="audience-header">
            <h3>{{ audience.name }}</h3>
            <div class="audience-size">{{ audience.size }} contacts</div>
          </div>
          
          <div class="audience-description">
            {{ audience.description }}
          </div>
          
          <div class="audience-tags">
            <span 
              v-for="(tag, index) in audience.tags" 
              :key="index"
              class="audience-tag"
            >
              {{ tag }}
            </span>
          </div>
          
          <div class="audience-footer">
            <div class="last-updated">
              Updated: {{ audience.lastUpdated }}
            </div>
            <div class="audience-actions">
              <button class="icon-button">✏️</button>
              <button class="icon-button">📊</button>
              <button class="icon-button">🔄</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Templates Tab -->
    <div v-if="activeTab === 'templates'" class="tab-content">
      <div class="filters">
        <div class="search-filter">
          <input type="text" placeholder="Search templates...">
        </div>
        
        <div class="filter-actions">
          <button class="action-button">
            <span>➕</span> Create Template
          </button>
          <button class="action-button">
            <span>📤</span> Import
          </button>
        </div>
      </div>
      
      <div class="templates-grid">
        <div 
          v-for="template in templates" 
          :key="template.id"
          class="template-card"
        >
          <div class="template-header">
            <h3>{{ template.name }}</h3>
            <div class="template-type">{{ template.type.charAt(0).toUpperCase() + template.type.slice(1) }}</div>
          </div>
          
          <div class="template-preview">
            <div class="preview-placeholder">
              Template preview would be displayed here
            </div>
          </div>
          
          <div class="template-footer">
            <div class="template-meta">
              <div class="last-used">
                Last used: {{ template.lastUsed }}
              </div>
              <div class="performance" :class="getPerformanceClass(template.performance)">
                {{ template.performance }} performance
              </div>
            </div>
            <div class="template-actions">
              <button class="action-button">Use</button>
              <button class="icon-button">✏️</button>
              <button class="icon-button">🔄</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Automation Tab -->
    <div v-if="activeTab === 'automation'" class="tab-content">
      <div class="automation-header">
        <h3>Marketing Automation Workflows</h3>
        <button class="action-button primary">
          <span>➕</span> Create Workflow
        </button>
      </div>
      
      <div class="automation-grid">
        <div class="automation-card">
          <div class="automation-header">
            <h3>Welcome Series</h3>
            <div class="automation-status active">Active</div>
          </div>
          <div class="automation-description">
            Automated email series for new subscribers, introducing them to our luxury travel experiences
          </div>
          <div class="automation-metrics">
            <div class="metric">
              <span class="metric-label">Contacts:</span>
              <span class="metric-value">1,245</span>
            </div>
            <div class="metric">
              <span class="metric-label">Emails:</span>
              <span class="metric-value">4</span>
            </div>
            <div class="metric">
              <span class="metric-label">Conversion:</span>
              <span class="metric-value">12%</span>
            </div>
          </div>
          <div class="automation-actions">
            <button class="action-button">Edit</button>
            <button class="action-button">Duplicate</button>
          </div>
        </div>
        
        <div class="automation-card">
          <div class="automation-header">
            <h3>Abandoned Booking Recovery</h3>
            <div class="automation-status active">Active</div>
          </div>
          <div class="automation-description">
            Follows up with users who started but didn't complete a booking, with personalized incentives
          </div>
          <div class="automation-metrics">
            <div class="metric">
              <span class="metric-label">Contacts:</span>
              <span class="metric-value">876</span>
            </div>
            <div class="metric">
              <span class="metric-label">Emails:</span>
              <span class="metric-value">3</span>
            </div>
            <div class="metric">
              <span class="metric-label">Conversion:</span>
              <span class="metric-value">18%</span>
            </div>
          </div>
          <div class="automation-actions">
            <button class="action-button">Edit</button>
            <button class="action-button">Duplicate</button>
          </div>
        </div>
        
        <div class="automation-card">
          <div class="automation-header">
            <h3>Post-Trip Feedback</h3>
            <div class="automation-status active">Active</div>
          </div>
          <div class="automation-description">
            Collects feedback after a customer's trip and encourages reviews and social sharing
          </div>
          <div class="automation-metrics">
            <div class="metric">
              <span class="metric-label">Contacts:</span>
              <span class="metric-value">542</span>
            </div>
            <div class="metric">
              <span class="metric-label">Emails:</span>
              <span class="metric-value">2</span>
            </div>
            <div class="metric">
              <span class="metric-label">Reviews:</span>
              <span class="metric-value">245</span>
            </div>
          </div>
          <div class="automation-actions">
            <button class="action-button">Edit</button>
            <button class="action-button">Duplicate</button>
          </div>
        </div>
        
        <div class="automation-card">
          <div class="automation-header">
            <h3>Anniversary Special</h3>
            <div class="automation-status draft">Draft</div>
          </div>
          <div class="automation-description">
            Sends special offers to couples on their anniversary, with personalized luxury travel packages
          </div>
          <div class="automation-metrics">
            <div class="metric">
              <span class="metric-label">Contacts:</span>
              <span class="metric-value">0</span>
            </div>
            <div class="metric">
              <span class="metric-label">Emails:</span>
              <span class="metric-value">1</span>
            </div>
            <div class="metric">
              <span class="metric-label">Conversion:</span>
              <span class="metric-value">-</span>
            </div>
          </div>
          <div class="automation-actions">
            <button class="action-button">Edit</button>
            <button class="action-button">Activate</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marketing-suite {
  padding: 1.5rem;
  color: #333;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.module-header h1 {
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

.marketing-tabs {
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

.filter-options {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Campaigns Tab */
.campaigns-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.campaigns-list {
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

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-scheduled {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-draft {
  background-color: #f5f5f5;
  color: #757575;
}

.status-completed {
  background-color: #f3e5f5;
  color: #6a1b9a;
}

.campaign-detail {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.detail-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.detail-actions {
  display: flex;
  gap: 0.5rem;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-label {
  font-weight: 600;
  color: #666;
}

.campaign-metrics {
  margin-bottom: 1.5rem;
}

.campaign-metrics h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.metric-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.metric-rate {
  font-size: 0.9rem;
  color: #4CAF50;
}

.chart-placeholder {
  background-color: #f9f9f9;
  height: 200px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.campaign-content {
  margin-top: 1.5rem;
}

.campaign-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.content-preview {
  background-color: #f9f9f9;
  border-radius: 4px;
  overflow: hidden;
}

.preview-placeholder {
  padding: 2rem;
  text-align: center;
  color: #666;
}

/* Audiences Tab */
.audiences-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.audience-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.audience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.audience-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.audience-size {
  background-color: #f5f7fa;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.audience-description {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.audience-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.audience-tag {
  background-color: #f5f7fa;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.audience-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.last-updated {
  font-size: 0.8rem;
  color: #666;
}

.audience-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}

/* Templates Tab */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.template-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.template-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.template-type {
  background-color: #f5f7fa;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.template-preview {
  height: 200px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.template-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-meta {
  font-size: 0.9rem;
}

.last-used {
  color: #666;
  margin-bottom: 0.5rem;
}

.performance {
  font-weight: 600;
}

.performance-high {
  color: #4CAF50;
}

.performance-medium {
  color: #FF9800;
}

.performance-low {
  color: #F44336;
}

.template-actions {
  display: flex;
  gap: 0.5rem;
}

/* Automation Tab */
.automation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.automation-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.automation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.automation-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.automation-card .automation-header {
  margin-bottom: 1rem;
}

.automation-card .automation-header h3 {
  font-size: 1.2rem;
}

.automation-status {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.automation-status.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.automation-status.draft {
  background-color: #f5f5f5;
  color: #757575;
}

.automation-description {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.automation-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-weight: 600;
}

.automation-actions {
  display: flex;
  gap: 0.5rem;
}

.automation-actions .action-button {
  flex: 1;
  justify-content: center;
}

@media (max-width: 1200px) {
  .campaigns-container {
    grid-template-columns: 1fr;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .audiences-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .automation-grid {
    grid-template-columns: 1fr;
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
  
  .marketing-tabs {
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
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .audiences-grid {
    grid-template-columns: 1fr;
  }
}
</style>