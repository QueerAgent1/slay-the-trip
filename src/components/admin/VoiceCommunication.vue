<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('calls')
const callHistory = ref([
  {
    id: 1,
    customer: 'James Wilson',
    date: '2024-05-16',
    time: '10:30 AM',
    duration: '12:45',
    agent: 'Sarah Thompson',
    status: 'completed',
    notes: 'Discussed Santorini booking details. Customer requested upgrade to premium suite.',
    recording: true
  },
  {
    id: 2,
    customer: 'Elena Rodriguez',
    date: '2024-05-15',
    time: '2:15 PM',
    duration: '8:20',
    agent: 'Michael Chen',
    status: 'completed',
    notes: 'Answered questions about Bali retreat packages. Customer interested in wellness add-ons.',
    recording: true
  },
  {
    id: 3,
    customer: 'David Morgan',
    date: '2024-05-15',
    time: '11:05 AM',
    duration: '15:30',
    agent: 'Thomas Laurent',
    status: 'completed',
    notes: 'Resolved issue with booking confirmation email. Sent new confirmation.',
    recording: true
  },
  {
    id: 4,
    customer: 'Sophia Kim',
    date: '2024-05-14',
    time: '4:45 PM',
    duration: '22:10',
    agent: 'Sarah Thompson',
    status: 'completed',
    notes: 'Detailed discussion about Maldives overwater villa options. Customer comparing resorts.',
    recording: true
  },
  {
    id: 5,
    customer: 'Alex Thompson',
    date: '2024-05-14',
    time: '9:20 AM',
    duration: '5:15',
    agent: 'AI Assistant',
    status: 'transferred',
    notes: 'Initial inquiry about honeymoon packages. Transferred to human agent for detailed planning.',
    recording: false
  }
])

const scheduledCalls = ref([
  {
    id: 1,
    customer: 'Jordan Lee',
    date: '2024-05-18',
    time: '11:00 AM',
    agent: 'Thomas Laurent',
    purpose: 'Safari Package Consultation',
    status: 'confirmed'
  },
  {
    id: 2,
    customer: 'Maria Garcia',
    date: '2024-05-19',
    time: '2:30 PM',
    agent: 'Sarah Thompson',
    purpose: 'Honeymoon Planning Session',
    status: 'confirmed'
  },
  {
    id: 3,
    customer: 'Robert Chen',
    date: '2024-05-20',
    time: '10:15 AM',
    agent: 'Michael Chen',
    purpose: 'Tokyo Trip Itinerary Review',
    status: 'pending'
  }
])

const voiceAnalytics = ref({
  callVolume: {
    total: 156,
    answered: 142,
    missed: 14,
    avgDuration: '10:25'
  },
  agentPerformance: [
    {
      name: 'Sarah Thompson',
      calls: 48,
      avgDuration: '11:30',
      satisfaction: 4.8,
      resolution: '92%'
    },
    {
      name: 'Michael Chen',
      calls: 42,
      avgDuration: '9:45',
      satisfaction: 4.7,
      resolution: '89%'
    },
    {
      name: 'Thomas Laurent',
      calls: 38,
      avgDuration: '12:15',
      satisfaction: 4.6,
      resolution: '91%'
    },
    {
      name: 'AI Assistant',
      calls: 28,
      avgDuration: '4:20',
      satisfaction: 4.2,
      resolution: '65%'
    }
  ],
  topReasons: [
    {
      reason: 'Booking Inquiries',
      percentage: 35
    },
    {
      reason: 'Itinerary Questions',
      percentage: 25
    },
    {
      reason: 'Special Requests',
      percentage: 15
    },
    {
      reason: 'Booking Modifications',
      percentage: 12
    },
    {
      reason: 'Technical Issues',
      percentage: 8
    },
    {
      reason: 'Other',
      percentage: 5
    }
  ]
})

const voiceSettings = ref({
  aiAssistant: {
    enabled: true,
    voiceType: 'female',
    accent: 'neutral',
    transferThreshold: 'medium',
    workingHours: '24/7'
  },
  callRouting: {
    defaultAgent: 'AI Assistant',
    routingLogic: 'skill-based',
    priorityCustomers: true,
    maxQueueTime: '2 minutes'
  },
  recordingSettings: {
    enabled: true,
    retention: '90 days',
    transcription: true,
    sentimentAnalysis: true
  }
})

const selectedCall = ref(null)
const searchQuery = ref('')
const dateFilter = ref('all')

const filteredCalls = computed(() => {
  return callHistory.value.filter(call => {
    const matchesSearch = call.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          call.agent.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          call.notes.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesDate = dateFilter.value === 'all' || 
                        (dateFilter.value === 'today' && call.date === '2024-05-16') ||
                        (dateFilter.value === 'yesterday' && call.date === '2024-05-15') ||
                        (dateFilter.value === 'week' && ['2024-05-14', '2024-05-15', '2024-05-16'].includes(call.date))
    
    return matchesSearch && matchesDate
  })
})

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const selectCall = (call) => {
  selectedCall.value = call
}

const getStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'status-completed'
    case 'transferred':
      return 'status-transferred'
    case 'missed':
      return 'status-missed'
    case 'confirmed':
      return 'status-confirmed'
    case 'pending':
      return 'status-pending'
    default:
      return ''
  }
}

onMounted(() => {
  // In a real application, this would fetch data from an API
})
</script>

<template>
  <div class="voice-communication">
    <div class="module-header">
      <h2>Voice Communication Center</h2>
      <div class="header-actions">
        <button class="action-button">
          <span>📞</span> Make Call
        </button>
        <button class="action-button primary">
          <span>📅</span> Schedule Call
        </button>
      </div>
    </div>
    
    <div class="voice-tabs">
      <button 
        class="tab-button" 
        :class="{ 'active': activeTab === 'calls' }"
        @click="setActiveTab('calls')"
      >
        Call History
      </button>
      <button 
        class="tab-button" 
        :class="{ 'active': activeTab === 'scheduled' }"
        @click="setActiveTab('scheduled')"
      >
        Scheduled Calls
      </button>
      <button 
        class="tab-button" 
        :class="{ 'active': activeTab === 'analytics' }"
        @click="setActiveTab('analytics')"
      >
        Voice Analytics
      </button>
      <button 
        class="tab-button" 
        :class="{ 'active': activeTab === 'settings' }"
        @click="setActiveTab('settings')"
      >
        Voice Settings
      </button>
    </div>
    
    <div class="tab-content">
      <!-- Call History Tab -->
      <div v-if="activeTab === 'calls'" class="calls-tab">
        <div class="calls-header">
          <div class="filter-controls">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search calls..."
              class="search-input"
            >
            <select v-model="dateFilter" class="filter-select">
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>
        
        <div class="calls-container">
          <div class="calls-list">
            <div 
              v-for="call in filteredCalls" 
              :key="call.id"
              class="call-item"
              :class="{ 'selected': selectedCall && selectedCall.id === call.id }"
              @click="selectCall(call)"
            >
              <div class="call-customer">{{ call.customer }}</div>
              <div class="call-meta">
                <div class="call-date">{{ call.date }} at {{ call.time }}</div>
                <div class="call-agent">Agent: {{ call.agent }}</div>
              </div>
              <div class="call-duration">{{ call.duration }}</div>
              <div class="call-status">
                <span class="status-badge" :class="getStatusClass(call.status)">
                  {{ call.status.charAt(0).toUpperCase() + call.status.slice(1) }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="call-detail" v-if="selectedCall">
            <div class="detail-header">
              <h3>Call Details</h3>
              <div class="detail-actions">
                <button class="action-button" v-if="selectedCall.recording">
                  <span>🔊</span> Play Recording
                </button>
                <button class="action-button">
                  <span>📝</span> Edit Notes
                </button>
              </div>
            </div>
            
            <div class="detail-content">
              <div class="detail-section">
                <h4>Call Information</h4>
                <div class="detail-grid">
                  <div class="detail-item">
                    <div class="detail-label">Customer:</div>
                    <div class="detail-value">{{ selectedCall.customer }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Date & Time:</div>
                    <div class="detail-value">{{ selectedCall.date }} at {{ selectedCall.time }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Duration:</div>
                    <div class="detail-value">{{ selectedCall.duration }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Agent:</div>
                    <div class="detail-value">{{ selectedCall.agent }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Status:</div>
                    <div class="detail-value">
                      <span class="status-badge" :class="getStatusClass(selectedCall.status)">
                        {{ selectedCall.status.charAt(0).toUpperCase() + selectedCall.status.slice(1) }}
                      </span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Recording:</div>
                    <div class="detail-value">{{ selectedCall.recording ? 'Available' : 'Not Available' }}</div>
                  </div>
                </div>
              </div>
              
              <div class="detail-section">
                <h4>Call Notes</h4>
                <div class="call-notes">
                  {{ selectedCall.notes }}
                </div>
              </div>
              
              <div class="detail-section">
                <h4>AI Analysis</h4>
                <div class="ai-analysis">
                  <div class="analysis-item">
                    <div class="analysis-label">Sentiment:</div>
                    <div class="analysis-value positive">Positive (0.82)</div>
                  </div>
                  <div class="analysis-item">
                    <div class="analysis-label">Key Topics:</div>
                    <div class="analysis-value">Booking, Upgrade, Premium Suite, Santorini</div>
                  </div>
                  <div class="analysis-item">
                    <div class="analysis-label">Customer Satisfaction:</div>
                    <div class="analysis-value positive">High (4.8/5)</div>
                  </div>
                  <div class="analysis-item">
                    <div class="analysis-label">Follow-up Needed:</div>
                    <div class="analysis-value">Yes - Send suite upgrade options</div>
                  </div>
                </div>
              </div>
              
              <div class="detail-section">
                <h4>Follow-up Actions</h4>
                <div class="follow-up-actions">
                  <div class="action-item">
                    <input type="checkbox" id="action1">
                    <label for="action1">Send suite upgrade options and pricing</label>
                  </div>
                  <div class="action-item">
                    <input type="checkbox" id="action2">
                    <label for="action2">Schedule follow-up call in 2 days</label>
                  </div>
                  <div class="action-item">
                    <input type="checkbox" id="action3">
                    <label for="action3">Update customer preferences in CRM</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="empty-detail" v-if="!selectedCall">
            <div class="empty-state">
              <div class="empty-icon">📞</div>
              <h3>Select a Call</h3>
              <p>Choose a call from the list to view details</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scheduled Calls Tab -->
      <div v-if="activeTab === 'scheduled'" class="scheduled-tab">
        <div class="scheduled-header">
          <h3>Upcoming Scheduled Calls</h3>
          <button class="action-button primary">
            <span>➕</span> Schedule New Call
          </button>
        </div>
        
        <div class="scheduled-list">
          <div v-for="call in scheduledCalls" :key="call.id" class="scheduled-item">
            <div class="scheduled-info">
              <div class="scheduled-customer">{{ call.customer }}</div>
              <div class="scheduled-purpose">{{ call.purpose }}</div>
              <div class="scheduled-datetime">{{ call.date }} at {{ call.time }}</div>
              <div class="scheduled-agent">Agent: {{ call.agent }}</div>
            </div>
            <div class="scheduled-status">
              <span class="status-badge" :class="getStatusClass(call.status)">
                {{ call.status.charAt(0).toUpperCase() + call.status.slice(1) }}
              </span>
            </div>
            <div class="scheduled-actions">
              <button class="action-button">
                <span>📝</span> Edit
              </button>
              <button class="action-button">
                <span>📅</span> Reschedule
              </button>
              <button class="action-button">
                <span>❌</span> Cancel
              </button>
            </div>
          </div>
        </div>
        
        <div class="calendar-view">
          <div class="calendar-header">
            <h3>Calendar View</h3>
          </div>
          <div class="calendar-placeholder">
            <p>Calendar visualization would appear here in the actual application</p>
          </div>
        </div>
      </div>
      
      <!-- Voice Analytics Tab -->
      <div v-if="activeTab === 'analytics'" class="analytics-tab">
        <div class="analytics-overview">
          <div class="overview-grid">
            <div class="overview-card">
              <div class="overview-title">Total Calls</div>
              <div class="overview-value">{{ voiceAnalytics.callVolume.total }}</div>
              <div class="overview-change positive">+12% from last month</div>
            </div>
            <div class="overview-card">
              <div class="overview-title">Answered Calls</div>
              <div class="overview-value">{{ voiceAnalytics.callVolume.answered }}</div>
              <div class="overview-change positive">+15% from last month</div>
            </div>
            <div class="overview-card">
              <div class="overview-title">Missed Calls</div>
              <div class="overview-value">{{ voiceAnalytics.callVolume.missed }}</div>
              <div class="overview-change negative">+3% from last month</div>
            </div>
            <div class="overview-card">
              <div class="overview-title">Avg. Call Duration</div>
              <div class="overview-value">{{ voiceAnalytics.callVolume.avgDuration }}</div>
              <div class="overview-change positive">+1:15 from last month</div>
            </div>
          </div>
        </div>
        
        <div class="analytics-charts">
          <div class="chart-container">
            <h3>Call Volume by Day</h3>
            <div class="chart-placeholder">
              <p>Chart visualization would appear here in the actual application</p>
            </div>
          </div>
          
          <div class="chart-container">
            <h3>Call Reasons Distribution</h3>
            <div class="chart-placeholder">
              <p>Chart visualization would appear here in the actual application</p>
              <div class="reasons-list">
                <div v-for="(reason, index) in voiceAnalytics.topReasons" :key="index" class="reason-item">
                  <div class="reason-name">{{ reason.reason }}</div>
                  <div class="reason-bar">
                    <div class="reason-fill" :style="{ width: reason.percentage + '%' }"></div>
                  </div>
                  <div class="reason-percentage">{{ reason.percentage }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="agent-performance">
          <h3>Agent Performance</h3>
          <table class="performance-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Calls Handled</th>
                <th>Avg. Duration</th>
                <th>Customer Satisfaction</th>
                <th>Resolution Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(agent, index) in voiceAnalytics.agentPerformance" :key="index">
                <td>{{ agent.name }}</td>
                <td>{{ agent.calls }}</td>
                <td>{{ agent.avgDuration }}</td>
                <td>
                  <div class="satisfaction-rating">
                    <div class="rating-stars">
                      <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= Math.floor(agent.satisfaction) }">★</span>
                    </div>
                    <div class="rating-value">{{ agent.satisfaction }}</div>
                  </div>
                </td>
                <td>{{ agent.resolution }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="ai-insights">
          <h3>AI-Generated Insights</h3>
          <div class="insights-list">
            <div class="insight-item">
              <div class="insight-icon">💡</div>
              <div class="insight-content">
                <div class="insight-title">Peak Call Times Identified</div>
                <div class="insight-description">Call volume is highest between 10 AM and 12 PM. Consider adjusting agent schedules to ensure adequate coverage during these hours.</div>
              </div>
            </div>
            <div class="insight-item">
              <div class="insight-icon">📈</div>
              <div class="insight-content">
                <div class="insight-title">AI Assistant Performance Improving</div>
                <div class="insight-description">The AI Assistant's resolution rate has improved by 15% over the last month, reducing the need for transfers to human agents.</div>
              </div>
            </div>
            <div class="insight-item">
              <div class="insight-icon">🔍</div>
              <div class="insight-content">
                <div class="insight-title">Common Customer Questions</div>
                <div class="insight-description">35% of calls involve questions about booking modifications. Consider creating a dedicated self-service tool for common modifications.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Voice Settings Tab -->
      <div v-if="activeTab === 'settings'" class="settings-tab">
        <div class="settings-section">
          <h3>AI Voice Assistant Settings</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-label">AI Assistant Enabled</div>
              <div class="setting-control">
                <label class="toggle">
                  <input type="checkbox" :checked="voiceSettings.aiAssistant.enabled">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Voice Type</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="female" :selected="voiceSettings.aiAssistant.voiceType === 'female'">Female</option>
                  <option value="male" :selected="voiceSettings.aiAssistant.voiceType === 'male'">Male</option>
                  <option value="neutral" :selected="voiceSettings.aiAssistant.voiceType === 'neutral'">Gender Neutral</option>
                </select>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Accent</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="neutral" :selected="voiceSettings.aiAssistant.accent === 'neutral'">Neutral</option>
                  <option value="american" :selected="voiceSettings.aiAssistant.accent === 'american'">American</option>
                  <option value="british" :selected="voiceSettings.aiAssistant.accent === 'british'">British</option>
                  <option value="australian" :selected="voiceSettings.aiAssistant.accent === 'australian'">Australian</option>
                </select>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Transfer Threshold</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="low" :selected="voiceSettings.aiAssistant.transferThreshold === 'low'">Low (Transfer Quickly)</option>
                  <option value="medium" :selected="voiceSettings.aiAssistant.transferThreshold === 'medium'">Medium</option>
                  <option value="high" :selected="voiceSettings.aiAssistant.transferThreshold === 'high'">High (Try to Resolve)</option>
                </select>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Working Hours</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="24/7" :selected="voiceSettings.aiAssistant.workingHours === '24/7'">24/7</option>
                  <option value="business" :selected="voiceSettings.aiAssistant.workingHours === 'business'">Business Hours Only</option>
                  <option value="custom" :selected="voiceSettings.aiAssistant.workingHours === 'custom'">Custom Hours</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>Call Routing Settings</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-label">Default Agent</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="ai" :selected="voiceSettings.callRouting.defaultAgent === 'AI Assistant'">AI Assistant</option>
                  <option value="human" :selected="voiceSettings.callRouting.defaultAgent === 'Human Agent'">Human Agent</option>
                </select>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Routing Logic</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="round-robin" :selected="voiceSettings.callRouting.routingLogic === 'round-robin'">Round Robin</option>
                  <option value="skill-based" :selected="voiceSettings.callRouting.routingLogic === 'skill-based'">Skill-Based</option>
                  <option value="availability" :selected="voiceSettings.callRouting.routingLogic === 'availability'">Availability</option>
                </select>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Priority for VIP Customers</div>
              <div class="setting-control">
                <label class="toggle">
                  <input type="checkbox" :checked="voiceSettings.callRouting.priorityCustomers">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Max Queue Time</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="1min" :selected="voiceSettings.callRouting.maxQueueTime === '1 minute'">1 Minute</option>
                  <option value="2min" :selected="voiceSettings.callRouting.maxQueueTime === '2 minutes'">2 Minutes</option>
                  <option value="5min" :selected="voiceSettings.callRouting.maxQueueTime === '5 minutes'">5 Minutes</option>
                  <option value="10min" :selected="voiceSettings.callRouting.maxQueueTime === '10 minutes'">10 Minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>Recording & Analysis Settings</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-label">Call Recording</div>
              <div class="setting-control">
                <label class="toggle">
                  <input type="checkbox" :checked="voiceSettings.recordingSettings.enabled">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Retention Period</div>
              <div class="setting-control">
                <select class="setting-select">
                  <option value="30days" :selected="voiceSettings.recordingSettings.retention === '30 days'">30 Days</option>
                  <option value="60days" :selected="voiceSettings.recordingSettings.retention === '60 days'">60 Days</option>
                  <option value="90days" :selected="voiceSettings.recordingSettings.retention === '90 days'">90 Days</option>
                  <option value="180days" :selected="voiceSettings.recordingSettings.retention === '180 days'">180 Days</option>
                  <option value="1year" :selected="voiceSettings.recordingSettings.retention === '1 year'">1 Year</option>
                </select>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Automatic Transcription</div>
              <div class="setting-control">
                <label class="toggle">
                  <input type="checkbox" :checked="voiceSettings.recordingSettings.transcription">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-label">Sentiment Analysis</div>
              <div class="setting-control">
                <label class="toggle">
                  <input type="checkbox" :checked="voiceSettings.recordingSettings.sentimentAnalysis">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-actions">
          <button class="action-button">Cancel Changes</button>
          <button class="action-button primary">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.voice-communication {
  color: #333;
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

.voice-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;
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

.tab-content {
  min-height: 500px;
}

/* Call History Tab */
.calls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 250px;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.calls-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1.5rem;
}

.calls-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-height: 600px;
  overflow-y: auto;
}

.call-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.call-item:hover {
  background-color: #f9f9f9;
}

.call-item.selected {
  background-color: #f0f0f0;
}

.call-customer {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.call-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.call-duration {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-transferred {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-missed {
  background-color: #ffebee;
  color: #c62828;
}

.status-confirmed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-pending {
  background-color: #fff8e1;
  color: #f57f17;
}

.call-detail, .empty-detail {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.detail-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.detail-actions {
  display: flex;
  gap: 0.5rem;
}

.detail-content {
  padding: 1.5rem;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: #666;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
}

.detail-label {
  font-weight: 600;
  color: #666;
}

.call-notes {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.ai-analysis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.analysis-item {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.analysis-label {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.analysis-value {
  font-size: 0.9rem;
}

.analysis-value.positive {
  color: #4CAF50;
}

.analysis-value.negative {
  color: #F44336;
}

.follow-up-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.empty-state p {
  color: #666;
  font-size: 0.9rem;
}

/* Scheduled Calls Tab */
.scheduled-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.scheduled-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.scheduled-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
}

.scheduled-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.scheduled-item:last-child {
  border-bottom: none;
}

.scheduled-info {
  flex: 1;
}

.scheduled-customer {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.scheduled-purpose {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.scheduled-datetime, .scheduled-agent {
  font-size: 0.9rem;
  color: #666;
}

.scheduled-status {
  margin: 0 1.5rem;
}

.scheduled-actions {
  display: flex;
  gap: 0.5rem;
}

.calendar-view {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.calendar-header {
  margin-bottom: 1.5rem;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.calendar-placeholder {
  background-color: #f9f9f9;
  padding: 4rem 2rem;
  border-radius: 4px;
  text-align: center;
  color: #666;
}

/* Voice Analytics Tab */
.analytics-overview {
  margin-bottom: 2rem;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.overview-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.overview-value {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.overview-change {
  font-size: 0.9rem;
}

.overview-change.positive {
  color: #4CAF50;
}

.overview-change.negative {
  color: #F44336;
}

.analytics-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.chart-container h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
}

.chart-placeholder {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
  color: #666;
}

.reasons-list {
  margin-top: 1.5rem;
}

.reason-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.reason-name {
  width: 150px;
  font-size: 0.9rem;
  text-align: left;
}

.reason-bar {
  flex: 1;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.reason-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  border-radius: 4px;
}

.reason-percentage {
  width: 40px;
  font-size: 0.9rem;
  text-align: right;
}

.agent-performance {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.agent-performance h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  background-color: #f5f7fa;
  color: #666;
  font-size: 0.9rem;
}

.performance-table td {
  padding: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
}

.satisfaction-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  display: flex;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #FFC107;
}

.ai-insights {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.ai-insights h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
}

.insights-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.insight-item {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  gap: 1rem;
}

.insight-icon {
  font-size: 2rem;
}

.insight-content {
  flex: 1;
}

.insight-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.insight-description {
  font-size: 0.9rem;
  color: #666;
}

/* Voice Settings Tab */
.settings-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.settings-section h3  {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-label {
  font-weight: 600;
}

.setting-select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 200px;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #e52e71;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@media (max-width: 1200px) {
  .calls-container {
    grid-template-columns: 1fr;
  }
  
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .analytics-charts {
    grid-template-columns: 1fr;
  }
  
  .insights-list {
    grid-template-columns: 1fr;
  }
  
  .settings-grid {
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
  
  .voice-tabs {
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .tab-button {
    padding: 1rem;
  }
  
  .calls-header, .scheduled-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-controls {
    width: 100%;
    flex-direction: column;
  }
  
  .search-input, .filter-select {
    width: 100%;
  }
  
  .detail-grid, .ai-analysis {
    grid-template-columns: 1fr;
  }
  
  .scheduled-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .scheduled-status {
    margin: 0;
  }
  
  .scheduled-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>