<script setup>
import { ref } from 'vue'

const activeTab = ref('overview')
const isLoading = ref(false)

const aiModels = [
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    status: 'operational',
    version: '3 Opus',
    usageCount: 1245,
    lastUsed: '10 minutes ago',
    capabilities: ['Content Generation', 'Summarization', 'Translation', 'Q&A']
  },
  {
    id: 'llama',
    name: 'Llama',
    provider: 'Meta',
    status: 'operational',
    version: '3 70B',
    usageCount: 876,
    lastUsed: '1 hour ago',
    capabilities: ['Content Generation', 'Summarization', 'Translation']
  },
  {
    id: 'mistral',
    name: 'Mistral',
    provider: 'Mistral AI',
    status: 'degraded',
    version: 'Large',
    usageCount: 542,
    lastUsed: '3 hours ago',
    capabilities: ['Content Generation', 'Summarization']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    status: 'operational',
    version: 'Pro',
    usageCount: 987,
    lastUsed: '30 minutes ago',
    capabilities: ['Content Generation', 'Summarization', 'Translation', 'Q&A', 'Image Analysis']
  }
]

const aiStats = {
  totalRequests: 12450,
  averageResponseTime: '1.2s',
  successRate: '99.2%',
  costThisMonth: '$1,245.50',
  topUseCase: 'Content Generation',
  averageTokens: 1250
}

const templates = [
  {
    id: 1,
    name: 'Destination Description',
    model: 'Claude',
    category: 'Content',
    lastUsed: '2 hours ago',
    usageCount: 156
  },
  {
    id: 2,
    name: 'Hotel Review',
    model: 'Llama',
    category: 'Content',
    lastUsed: '1 day ago',
    usageCount: 98
  },
  {
    id: 3,
    name: 'Email Response',
    model: 'Mistral',
    category: 'Customer Service',
    lastUsed: '5 hours ago',
    usageCount: 245
  },
  {
    id: 4,
    name: 'Social Media Post',
    model: 'Gemini',
    category: 'Marketing',
    lastUsed: '3 hours ago',
    usageCount: 187
  },
  {
    id: 5,
    name: 'Travel Itinerary',
    model: 'Claude',
    category: 'Planning',
    lastUsed: '12 hours ago',
    usageCount: 76
  }
]

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const getStatusClass = (status) => {
  switch (status) {
    case 'operational':
      return 'status-operational'
    case 'degraded':
      return 'status-degraded'
    case 'outage':
      return 'status-outage'
    default:
      return ''
  }
}
</script>

<template>
  <div class="ai-integration">
    <div class="module-header">
      <h1>AI Integration Hub</h1>
      <div class="header-actions">
        <button class="action-button">
          <span>📊</span> Generate Report
        </button>
        <button class="action-button primary">
          <span>🔄</span> Refresh Status
        </button>
      </div>
    </div>
    
    <div class="ai-tabs">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'overview' }"
        @click="setActiveTab('overview')"
      >
        Overview
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'models' }"
        @click="setActiveTab('models')"
      >
        AI Models
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'templates' }"
        @click="setActiveTab('templates')"
      >
        Prompt Templates
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'analytics' }"
        @click="setActiveTab('analytics')"
      >
        Analytics
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'settings' }"
        @click="setActiveTab('settings')"
      >
        Settings
      </button>
    </div>
    
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading AI system data...</p>
    </div>
    
    <!-- Overview Tab -->
    <div v-if="activeTab === 'overview' && !isLoading" class="tab-content">
      <div class="overview-grid">
        <div class="overview-card">
          <h3>AI Models Status</h3>
          <div class="status-list">
            <div 
              v-for="model in aiModels" 
              :key="model.id"
              class="status-item"
            >
              <div class="status-name">{{ model.name }}</div>
              <div class="status-indicator">
                <span 
                  class="status-dot"
                  :class="getStatusClass(model.status)"
                ></span>
                <span class="status-text">{{ model.status.charAt(0).toUpperCase() + model.status.slice(1) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="overview-card">
          <h3>Usage Statistics</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">Total Requests</div>
              <div class="stat-value">{{ aiStats.totalRequests }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Avg. Response Time</div>
              <div class="stat-value">{{ aiStats.averageResponseTime }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Success Rate</div>
              <div class="stat-value">{{ aiStats.successRate }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Cost This Month</div>
              <div class="stat-value">{{ aiStats.costThisMonth }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Top Use Case</div>
              <div class="stat-value">{{ aiStats.topUseCase }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Avg. Tokens</div>
              <div class="stat-value">{{ aiStats.averageTokens }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="insights-grid">
        <div class="insight-card">
          <h3>Recent AI Insights</h3>
          <div class="insights-content">
            <p>Based on recent usage patterns, we recommend:</p>
            <ul>
              <li>Increasing token limits for destination descriptions to improve quality</li>
              <li>Switching email response templates to Claude for better tone and accuracy</li>
              <li>Implementing a caching system for common AI-generated content to reduce costs</li>
            </ul>
          </div>
        </div>
        
        <div class="insight-card">
          <h3>Top Performing Templates</h3>
          <div class="template-list">
            <div 
              v-for="(template, index) in templates.slice(0, 3)" 
              :key="template.id"
              class="template-item"
            >
              <div class="template-rank">{{ index + 1 }}</div>
              <div class="template-info">
                <div class="template-name">{{ template.name }}</div>
                <div class="template-meta">
                  <span>{{ template.model }}</span>
                  <span>{{ template.usageCount }} uses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- AI Models Tab -->
    <div v-if="activeTab === 'models' && !isLoading" class="tab-content">
      <div class="filters">
        <div class="search-filter">
          <input type="text" placeholder="Search AI models...">
        </div>
        <div class="filter-actions">
          <button class="action-button">
            <span>➕</span> Add New Model
          </button>
        </div>
      </div>
      
      <div class="models-grid">
        <div 
          v-for="model in aiModels" 
          :key="model.id"
          class="model-card"
        >
          <div class="model-header">
            <h3>{{ model.name }}</h3>
            <div class="model-status" :class="getStatusClass(model.status)">
              {{ model.status.charAt(0).toUpperCase() + model.status.slice(1) }}
            </div>
          </div>
          
          <div class="model-details">
            <div class="detail-item">
              <span class="detail-label">Provider:</span>
              <span class="detail-value">{{ model.provider }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Version:</span>
              <span class="detail-value">{{ model.version }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Usage:</span>
              <span class="detail-value">{{ model.usageCount }} requests</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Last Used:</span>
              <span class="detail-value">{{ model.lastUsed }}</span>
            </div>
          </div>
          
          <div class="model-capabilities">
            <h4>Capabilities</h4>
            <div class="capabilities-list">
              <span 
                v-for="(capability, index) in model.capabilities" 
                :key="index"
                class="capability-tag"
              >
                {{ capability }}
              </span>
            </div>
          </div>
          
          <div class="model-actions">
            <button class="action-button">Configure</button>
            <button class="action-button">Test</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Templates Tab -->
    <div v-if="activeTab === 'templates' && !isLoading" class="tab-content">
      <div class="filters">
        <div class="search-filter">
          <input type="text" placeholder="Search templates...">
        </div>
        <div class="filter-actions">
          <button class="action-button">
            <span>➕</span> Create Template
          </button>
        </div>
      </div>
      
      <div class="templates-container">
        <div class="templates-list">
          <table>
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Category</th>
                <th>Model</th>
                <th>Usage</th>
                <th>Last Used</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="template in templates" 
                :key="template.id"
                class="template-row"
              >
                <td>{{ template.name }}</td>
                <td>{{ template.category }}</td>
                <td>{{ template.model }}</td>
                <td>{{ template.usageCount }}</td>
                <td>{{ template.lastUsed }}</td>
                <td>
                  <button class="icon-button">✏️</button>
                  <button class="icon-button">🔄</button>
                  <button class="icon-button">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="template-detail">
          <div class="detail-header">
            <h3>Template Details</h3>
            <div class="detail-actions">
              <button class="action-button">
                <span>✏️</span> Edit
              </button>
              <button class="action-button">
                <span>🔄</span> Run
              </button>
            </div>
          </div>
          
          <div class="detail-grid">
            <div class="detail-section">
              <h4>Basic Information</h4>
              <div class="form-group">
                <label>Template Name</label>
                <input type="text" value="Destination Description" disabled>
              </div>
              <div class="form-group">
                <label>Category</label>
                <input type="text" value="Content" disabled>
              </div>
              <div class="form-group">
                <label>AI Model</label>
                <input type="text" value="Claude" disabled>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Prompt Template</h4>
              <div class="form-group">
                <label>Prompt</label>
                <textarea disabled rows="8">Create a detailed and engaging description for the following travel destination: {{destination_name}}. Include information about:

1. What makes this destination unique and special
2. Key attractions and experiences
3. Best time to visit
4. LGBTQ+ friendliness and considerations
5. Luxury accommodation options

Tone: Sophisticated, inspiring, and inclusive. Word count: Approximately 300-400 words.</textarea>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Variables</h4>
              <div class="variables-list">
                <div class="variable-item">
                  <span class="variable-name">destination_name</span>
                  <span class="variable-type">String</span>
                  <span class="variable-required">Required</span>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Usage History</h4>
              <div class="usage-chart">
                <div class="chart-placeholder">
                  Usage chart would be displayed here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Analytics Tab -->
    <div v-if="activeTab === 'analytics' && !isLoading" class="tab-content">
      <div class="analytics-filters">
        <div class="date-range">
          <label>Date Range:</label>
          <select>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom Range</option>
          </select>
        </div>
        
        <div class="model-filter">
          <label>AI Model:</label>
          <select>
            <option>All Models</option>
            <option>Claude</option>
            <option>Llama</option>
            <option>Mistral</option>
            <option>Gemini</option>
          </select>
        </div>
        
        <div class="export-action">
          <button class="action-button">
            <span>📊</span> Export Data
          </button>
        </div>
      </div>
      
      <div class="analytics-charts">
        <div class="chart-card">
          <h3>Usage by Model</h3>
          <div class="chart-placeholder">
            Pie chart would be displayed here
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Requests Over Time</h3>
          <div class="chart-placeholder">
            Line chart would be displayed here
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Response Time</h3>
          <div class="chart-placeholder">
            Bar chart would be displayed here
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Cost Analysis</h3>
          <div class="chart-placeholder">
            Area chart would be displayed here
          </div>
        </div>
      </div>
      
      <div class="analytics-insights">
        <h3>AI Usage Insights</h3>
        <div class="insights-content">
          <p>Based on your usage patterns over the selected period:</p>
          <ul>
            <li>Claude is your most cost-effective model for content generation tasks</li>
            <li>Response times have improved by 15% since implementing the new caching system</li>
            <li>Usage peaks on Mondays and Tuesdays, suggesting potential for batch processing</li>
            <li>The "Destination Description" template has the highest ROI based on usage and customer engagement</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Settings Tab -->
    <div v-if="activeTab === 'settings' && !isLoading" class="tab-content">
      <div class="settings-section">
        <h3>API Configuration</h3>
        <div class="config-form">
          <div class="form-group">
            <label>Claude API Key</label>
            <input type="password" value="••••••••••••••••••••••••••••••" disabled>
            <button class="small-button">Update</button>
          </div>
          
          <div class="form-group">
            <label>Llama API Key</label>
            <input type="password" value="••••••••••••••••••••••••••••••" disabled>
            <button class="small-button">Update</button>
          </div>
          
          <div class="form-group">
            <label>Mistral API Key</label>
            <input type="password" value="••••••••••••••••••••••••••••••" disabled>
            <button class="small-button">Update</button>
          </div>
          
          <div class="form-group">
            <label>Gemini API Key</label>
            <input type="password" value="••••••••••••••••••••••••••••••" disabled>
            <button class="small-button">Update</button>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>Default Settings</h3>
        <div class="config-form">
          <div class="form-group">
            <label>Default AI Model</label>
            <select>
              <option>Claude</option>
              <option>Llama</option>
              <option>Mistral</option>
              <option>Gemini</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Default Temperature</label>
            <input type="range" min="0" max="1" step="0.1" value="0.7">
            <span>0.7</span>
          </div>
          
          <div class="form-group">
            <label>Max Tokens</label>
            <input type="number" value="2000">
          </div>
          
          <div class="form-group">
            <label>Response Format</label>
            <select>
              <option>JSON</option>
              <option>Markdown</option>
              <option>Plain Text</option>
              <option>HTML</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>System Preferences</h3>
        <div class="config-form">
          <div class="form-group toggle-group">
            <label>Enable Content Caching</label>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="form-group toggle-group">
            <label>Auto-Retry Failed Requests</label>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="form-group toggle-group">
            <label>Content Moderation</label>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="form-group toggle-group">
            <label>Usage Analytics</label>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="settings-actions">
        <button class="action-button">Reset to Defaults</button>
        <button class="action-button primary">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-integration {
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

.ai-tabs {
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #e52e71;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Overview Tab */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.overview-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.overview-card h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.status-operational {
  background-color: #4CAF50;
}

.status-degraded {
  background-color: #FF9800;
}

.status-outage {
  background-color: #F44336;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.insight-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.insight-card h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.insights-content ul {
  padding-left: 1.5rem;
}

.insights-content li {
  margin-bottom: 0.5rem;
}

.template-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.template-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
}

.template-rank {
  width: 30px;
  height: 30px;
  background-color: #e52e71;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 1rem;
}

.template-info {
  flex: 1;
}

.template-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.template-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

/* Models Tab */
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

.models-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.model-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.model-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.model-status {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.model-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.detail-label {
  color: #666;
}

.detail-value {
  font-weight: 600;
}

.model-capabilities {
  margin-bottom: 1.5rem;
}

.model-capabilities h4 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.capabilities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.capability-tag {
  background-color: #f5f7fa;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.model-actions {
  display: flex;
  gap: 0.5rem;
}

.model-actions .action-button {
  flex: 1;
  justify-content: center;
}

/* Templates Tab */
.templates-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.templates-list {
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

.template-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.template-row:hover {
  background-color: #f9f9f9;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
}

.template-detail {
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
}

.detail-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
}

.form-group textarea {
  resize: vertical;
}

.variables-list {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
}

.variable-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.variable-item:last-child {
  border-bottom: none;
}

.variable-name {
  font-weight: 600;
}

.variable-type {
  color: #666;
}

.variable-required {
  color: #e52e71;
  font-size: 0.8rem;
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

/* Analytics Tab */
.analytics-filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.date-range,
.model-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-range label,
.model-filter label {
  font-weight: 500;
}

.date-range select,
.model-filter select {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
}

.export-action {
  margin-left: auto;
}

.analytics-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.chart-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.analytics-insights {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.analytics-insights h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

/* Settings Tab */
.settings-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.settings-section h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.config-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.small-button {
  background-color: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.toggle-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
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
  height: 22px;
  width: 22px;
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
  .models-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .analytics-charts {
    grid-template-columns: 1fr;
  }
  
  .insights-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .config-form {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .templates-container {
    grid-template-columns: 1fr;
  }
  
  .template-detail {
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
  
  .ai-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-filter {
    max-width: 100%;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
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