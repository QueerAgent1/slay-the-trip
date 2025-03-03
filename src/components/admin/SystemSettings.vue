<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('general')
const generalSettings = ref({
  siteName: 'QueerLuxe Travel',
  siteDescription: 'Luxury travel experiences for the LGBTQ+ community',
  contactEmail: 'info@queerluxetravel.com',
  supportPhone: '+1 (555) 123-4567',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
  language: 'en-US'
})

const userSettings = ref({
  registrationEnabled: true,
  requireEmailVerification: true,
  allowSocialLogin: true,
  passwordMinLength: 8,
  passwordRequireSpecial: true,
  sessionTimeout: 60,
  maxLoginAttempts: 5,
  lockoutDuration: 30
})

const notificationSettings = ref({
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  marketingEmails: true,
  adminAlerts: true,
  bookingConfirmations: true,
  paymentReceipts: true,
  travelReminders: true
})

const integrationSettings = ref([
  {
    id: 1,
    name: 'Payment Gateway',
    provider: 'Stripe',
    status: 'active',
    lastSync: '2024-05-16 09:30 AM'
  },
  {
    id: 2,
    name: 'Email Marketing',
    provider: 'Mailchimp',
    status: 'active',
    lastSync: '2024-05-15 02:15 PM'
  },
  {
    id: 3,
    name: 'CRM',
    provider: 'Salesforce',
    status: 'active',
    lastSync: '2024-05-16 08:45 AM'
  },
  {
    id: 4,
    name: 'Analytics',
    provider: 'Google Analytics',
    status: 'active',
    lastSync: '2024-05-16 12:00 AM'
  },
  {
    id: 5,
    name: 'Social Media',
    provider: 'Buffer',
    status: 'inactive',
    lastSync: 'N/A'
  }
])

const backupSettings = ref({
  automaticBackups: true,
  backupFrequency: 'daily',
  backupRetention: 30,
  lastBackup: '2024-05-16 02:00 AM',
  backupLocation: 'Cloud Storage',
  encryptBackups: true
})

const systemLogs = ref([
  {
    id: 1,
    timestamp: '2024-05-16 10:30:45',
    level: 'info',
    user: 'admin@queerluxetravel.com',
    action: 'User login',
    details: 'Admin user logged in successfully'
  },
  {
    id: 2,
    timestamp: '2024-05-16 09:15:22',
    level: 'warning',
    user: 'system',
    action: 'API rate limit',
    details: 'Approaching API rate limit for Stripe integration'
  },
  {
    id: 3,
    timestamp: '2024-05-16 08:45:10',
    level: 'error',
    user: 'system',
    action: 'Database connection',
    details: 'Temporary database connection error - automatically resolved'
  },
  {
    id: 4,
    timestamp: '2024-05-16 08:00:00',
    level: 'info',
    user: 'system',
    action: 'Backup completed',
    details: 'Daily system backup completed successfully'
  },
  {
    id: 5,
    timestamp: '2024-05-15 23:45:30',
    level: 'info',
    user: 'sarah.thompson@queerluxetravel.com',
    action: 'Content update',
    details: 'Updated homepage featured destinations'
  }
])

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-active'
    case 'inactive':
      return 'status-inactive'
    default:
      return ''
  }
}

const getLogLevelClass = (level) => {
  switch (level) {
    case 'info':
      return 'log-info'
    case 'warning':
      return 'log-warning'
    case 'error':
      return 'log-error'
    default:
      return ''
  }
}

const saveSettings = () => {
  // In a real application, this would save settings to a database
  alert('Settings saved successfully!')
}

onMounted(() => {
  // In a real application, this would fetch settings from an API
})
</script>

<template>
  <div class="system-settings">
    <div class="module-header">
      <h2>System Settings</h2>
      <div class="header-actions">
        <button class="action-button">
          <span>🔄</span> Reset to Defaults
        </button>
        <button @click="saveSettings" class="action-button primary">
          <span>💾</span> Save Settings
        </button>
      </div>
    </div>
    
    <div class="settings-container">
      <div class="settings-sidebar">
        <div 
          class="sidebar-item" 
          :class="{ 'active': activeTab === 'general' }"
          @click="setActiveTab('general')"
        >
          <span class="sidebar-icon">⚙️</span>
          <span class="sidebar-text">General Settings</span>
        </div>
        <div 
          class="sidebar-item" 
          :class="{ 'active': activeTab === 'users' }"
          @click="setActiveTab('users')"
        >
          <span class="sidebar-icon">👥</span>
          <span class="sidebar-text">User Settings</span>
        </div>
        <div 
          class="sidebar-item" 
          :class="{ 'active': activeTab === 'notifications' }"
          @click="setActiveTab('notifications')"
        >
          <span class="sidebar-icon">🔔</span>
          <span class="sidebar-text">Notification Settings</span>
        </div>
        <div 
          class="sidebar-item" 
          :class="{ 'active': activeTab === 'integrations' }"
          @click="setActiveTab('integrations')"
        >
          <span class="sidebar-icon">🔌</span>
          <span class="sidebar-text">Integrations</span>
        </div>
        <div 
          class="sidebar-item" 
          :class="{ 'active': activeTab === 'backup' }"
          @click="setActiveTab('backup')"
        >
          <span class="sidebar-icon">💾</span>
          <span class="sidebar-text">Backup & Recovery</span>
        </div>
        <div 
          class="sidebar-item" 
          :class="{ 'active': activeTab === 'logs' }"
          @click="setActiveTab('logs')"
        >
          <span class="sidebar-icon">📋</span>
          <span class="sidebar-text">System Logs</span>
        </div>
      </div>
      
      <div class="settings-content">
        <!-- General Settings Tab -->
        <div v-if="activeTab === 'general'" class="settings-tab">
          <h3>General Settings</h3>
          <div class="settings-form">
            <div class="form-group">
              <label for="site-name">Site Name</label>
              <input type="text" id="site-name" v-model="generalSettings.siteName">
            </div>
            <div class="form-group">
              <label for="site-description">Site Description</label>
              <textarea id="site-description" v-model="generalSettings.siteDescription" rows="3"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-email">Contact Email</label>
                <input type="email" id="contact-email" v-model="generalSettings.contactEmail">
              </div>
              <div class="form-group">
                <label for="support-phone">Support Phone</label>
                <input type="tel" id="support-phone" v-model="generalSettings.supportPhone">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="timezone">Timezone</label>
                <select id="timezone" v-model="generalSettings.timezone">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="date-format">Date Format</label>
                <select id="date-format" v-model="generalSettings.dateFormat">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="currency">Currency</label>
                <select id="currency" v-model="generalSettings.currency">
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="language">Language</label>
                <select id="language" v-model="generalSettings.language">
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Settings Tab -->
        <div v-if="activeTab === 'users'" class="settings-tab">
          <h3>User Settings</h3>
          <div class="settings-form">
            <div class="form-group toggle-group">
              <label for="registration-enabled">User Registration Enabled</label>
              <label class="toggle">
                <input type="checkbox" id="registration-enabled" v-model="userSettings.registrationEnabled">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="form-group toggle-group">
              <label for="email-verification">Require Email Verification</label>
              <label class="toggle">
                <input type="checkbox" id="email-verification" v-model="userSettings.requireEmailVerification">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="form-group toggle-group">
              <label for="social-login">Allow Social Login</label>
              <label class="toggle">
                <input type="checkbox" id="social-login" v-model="userSettings.allowSocialLogin">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="password-length">Minimum Password Length</label>
                <input type="number" id="password-length" v-model="userSettings.passwordMinLength" min="6" max="20">
              </div>
              <div class="form-group toggle-group">
                <label for="password-special">Require Special Characters</label>
                <label class="toggle">
                  <input type="checkbox" id="password-special" v-model="userSettings.passwordRequireSpecial">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="session-timeout">Session Timeout (minutes)</label>
                <input type="number" id="session-timeout" v-model="userSettings.sessionTimeout" min="15" max="240">
              </div>
              <div class="form-group">
                <label for="login-attempts">Max Login Attempts</label>
                <input type="number" id="login-attempts" v-model="userSettings.maxLoginAttempts" min="3" max="10">
              </div>
            </div>
            <div class="form-group">
              <label for="lockout-duration">Account Lockout Duration (minutes)</label>
              <input type="number" id="lockout-duration" v-model="userSettings.lockoutDuration" min="5" max="60">
            </div>
          </div>
        </div>
        
        <!-- Notification Settings Tab -->
        <div v-if="activeTab === 'notifications'" class="settings-tab">
          <h3>Notification Settings</h3>
          <div class="settings-form">
            <div class="notification-channels">
              <h4>Notification Channels</h4>
              <div class="form-group toggle-group">
                <label for="email-notifications">Email Notifications</label>
                <label class="toggle">
                  <input type="checkbox" id="email-notifications" v-model="notificationSettings.emailNotifications">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="form-group toggle-group">
                <label for="sms-notifications">SMS Notifications</label>
                <label class="toggle">
                  <input type="checkbox" id="sms-notifications" v-model="notificationSettings.smsNotifications">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="form-group toggle-group">
                <label for="push-notifications">Push Notifications</label>
                <label class="toggle">
                  <input type="checkbox" id="push-notifications" v-model="notificationSettings.pushNotifications">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div class="notification-types">
              <h4>Notification Types</h4>
              <div class="form-group toggle-group">
                <label for="marketing-emails">Marketing Emails</label>
                <label class="toggle">
                  <input type="checkbox" id="marketing-emails" v-model="notificationSettings.marketingEmails">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="form-group toggle-group">
                <label for="admin-alerts">Admin Alerts</label>
                <label class="toggle">
                  <input type="checkbox" id="admin-alerts" v-model="notificationSettings.adminAlerts">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="form-group toggle-group">
                <label for="booking-confirmations">Booking Confirmations</label>
                <label class="toggle">
                  <input type="checkbox" id="booking-confirmations" v-model="notificationSettings.bookingConfirmations">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="form-group toggle-group">
                <label for="payment-receipts">Payment Receipts</label>
                <label class="toggle">
                  <input type="checkbox" id="payment-receipts" v-model="notificationSettings.paymentReceipts">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="form-group toggle-group">
                <label for="travel-reminders">Travel Reminders</label>
                <label class="toggle">
                  <input type="checkbox" id="travel-reminders" v-model="notificationSettings.travelReminders">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div class="notification-templates">
              <h4>Email Templates</h4>
              <div class="template-list">
                <div class="template-item">
                  <div class="template-name">Welcome Email</div>
                  <button class="template-action">Edit Template</button>
                </div>
                <div class="template-item">
                  <div class="template-name">Booking Confirmation</div>
                  <button class="template-action">Edit Template</button>
                </div>
                <div class="template-item">
                  <div class="template-name">Payment Receipt</div>
                  <button class="template-action">Edit Template</button>
                </div>
                <div class="template-item">
                  <div class="template-name">Travel Reminder</div>
                  <button class="template-action">Edit Template</button>
                </div>
                <div class="template-item">
                  <div class="template-name">Password Reset</div>
                  <button class="template-action">Edit Template</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Integrations Tab -->
        <div v-if="activeTab === 'integrations'" class="settings-tab">
          <h3>Integrations</h3>
          <div class="integrations-list">
            <div v-for="integration in integrationSettings" :key="integration.id" class="integration-item">
              <div class="integration-info">
                <div class="integration-name">{{ integration.name }}</div>
                <div class="integration-provider">Provider: {{ integration.provider }}</div>
                <div class="integration-sync">Last Sync: {{ integration.lastSync }}</div>
              </div>
              <div class="integration-status">
                <span class="status-badge" :class="getStatusClass(integration.status)">
                  {{ integration.status.charAt(0).toUpperCase() + integration.status.slice(1) }}
                </span>
              </div>
              <div class="integration-actions">
                <button class="action-button">Configure</button>
                <button class="action-button" v-if="integration.status === 'active'">Sync Now</button>
                <button class="action-button" v-if="integration.status === 'inactive'">Activate</button>
                <button class="action-button" v-if="integration.status === 'active'">Deactivate</button>
              </div>
            </div>
          </div>
          
          <div class="add-integration">
            <button class="action-button primary">
              <span>➕</span> Add New Integration
            </button>
          </div>
          
          <div class="api-settings">
            <h4>API Settings</h4>
            <div class="api-keys">
              <div class="api-key-item">
                <div class="api-key-info">
                  <div class="api-key-name">Public API Key</div>
                  <div class="api-key-value">pk_live_*****************</div>
                </div>
                <div class="api-key-actions">
                  <button class="action-button">Show</button>
                  <button class="action-button">Copy</button>
                </div>
              </div>
              <div class="api-key-item">
                <div class="api-key-info">
                  <div class="api-key-name">Secret API Key</div>
                  <div class="api-key-value">sk_live_*****************</div>
                </div>
                <div class="api-key-actions">
                  <button class="action-button">Show</button>
                  <button class="action-button">Copy</button>
                </div>
              </div>
            </div>
            <div class="api-controls">
              <button class="action-button">Regenerate Keys</button>
              <button class="action-button">API Documentation</button>
            </div>
          </div>
        </div>
        
        <!-- Backup & Recovery Tab -->
        <div v-if="activeTab === 'backup'" class="settings-tab">
          <h3>Backup & Recovery</h3>
          <div class="settings-form">
            <div class="form-group toggle-group">
              <label for="automatic-backups">Automatic Backups</label>
              <label class="toggle">
                <input type="checkbox" id="automatic-backups" v-model="backupSettings.automaticBackups">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="backup-frequency">Backup Frequency</label>
                <select id="backup-frequency" v-model="backupSettings.backupFrequency">
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div class="form-group">
                <label for="backup-retention">Backup Retention (days)</label>
                <input type="number" id="backup-retention" v-model="backupSettings.backupRetention" min="1" max="365">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="backup-location">Backup Location</label>
                <select id="backup-location" v-model="backupSettings.backupLocation">
                  <option value="Local Storage">Local Storage</option>
                  <option value="Cloud Storage">Cloud Storage</option>
                  <option value="Both">Both (Local & Cloud)</option>
                </select>
              </div>
              <div class="form-group toggle-group">
                <label for="encrypt-backups">Encrypt Backups</label>
                <label class="toggle">
                  <input type="checkbox" id="encrypt-backups" v-model="backupSettings.encryptBackups">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div class="backup-info">
              <div class="info-item">
                <div class="info-label">Last Backup:</div>
                <div class="info-value">{{ backupSettings.lastBackup }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Next Scheduled Backup:</div>
                <div class="info-value">2024-05-17 02:00 AM</div>
              </div>
              <div class="info-item">
                <div class="info-label">Available Backup Points:</div>
                <div class="info-value">28</div>
              </div>
            </div>
            
            <div class="backup-actions">
              <button class="action-button">
                <span>💾</span> Create Manual Backup
              </button>
              <button class="action-button">
                <span>📋</span> View Backup History
              </button>
              <button class="action-button">
                <span>🔄</span> Restore from Backup
              </button>
            </div>
          </div>
        </div>
        
        <!-- System Logs Tab -->
        <div v-if="activeTab === 'logs'" class="settings-tab">
          <h3>System Logs</h3>
          <div class="logs-filter">
            <div class="filter-controls">
              <input type="text" placeholder="Search logs..." class="search-input">
              <select class="filter-select">
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              <select class="filter-select">
                <option value="all">All Users</option>
                <option value="admin">Admin Users</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
          
          <div class="logs-table">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Level</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in systemLogs" :key="log.id">
                  <td>{{ log.timestamp }}</td>
                  <td>
                    <span class="log-level" :class="getLogLevelClass(log.level)">
                      {{ log.level.toUpperCase() }}
                    </span>
                  </td>
                  <td>{{ log.user }}</td>
                  <td>{{ log.action }}</td>
                  <td>{{ log.details }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="logs-pagination">
            <button class="pagination-btn">Previous</button>
            <div class="pagination-info">Page 1 of 24</div>
            <button class="pagination-btn">Next</button>
          </div>
          
          <div class="logs-actions">
            <button class="action-button">
              <span>📥</span> Export Logs
            </button>
            <button class="action-button">
              <span>🗑️</span> Clear Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-settings {
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

.settings-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.settings-sidebar {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.sidebar-item:hover {
  background-color: #f5f7fa;
}

.sidebar-item.active {
  background-color: #f0f0f0;
  border-left-color: #e52e71;
}

.sidebar-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.settings-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.settings-tab h3 {
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.settings-form {
  max-width: 800px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

textarea {
  resize: vertical;
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

/* Notification Settings */
.notification-channels,
.notification-types,
.notification-templates {
  margin-bottom: 2rem;
}

.notification-channels h4,
.notification-types h4,
.notification-templates h4 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #666;
}

.template-list {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
}

.template-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.template-item:last-child {
  border-bottom: none;
}

.template-action {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.template-action:hover {
  background-color: #e0e0e0;
}

/* Integrations */
.integrations-list {
  margin-bottom: 2rem;
}

.integration-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.integration-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.integration-provider,
.integration-sync {
  font-size: 0.9rem;
  color: #666;
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

.status-inactive {
  background-color: #f5f5f5;
  color: #757575;
}

.integration-actions {
  display: flex;
  gap: 0.5rem;
}

.add-integration {
  margin-bottom: 2rem;
  text-align: center;
}

.api-settings {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.api-settings h4 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #666;
}

.api-keys {
  margin-bottom: 1.5rem;
}

.api-key-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.api-key-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.api-key-value {
  font-family: monospace;
  color: #666;
}

.api-key-actions {
  display: flex;
  gap: 0.5rem;
}

.api-controls {
  display: flex;
  gap: 1rem;
}

/* Backup & Recovery */
.backup-info {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  margin-bottom: 0.75rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: 600;
  width: 200px;
}

.backup-actions {
  display: flex;
  gap: 1rem;
}

/* System Logs */
.logs-filter {
  margin-bottom: 1.5rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.logs-table {
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  background-color: #f5f7fa;
  color: #666;
  font-size: 0.9rem;
}

td {
  padding: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
}

.log-level {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.log-info {
  background-color: #e3f2fd;
  color: #1565c0;
}

.log-warning {
  background-color: #fff8e1;
  color: #f57f17;
}

.log-error {
  background-color: #ffebee;
  color: #c62828;
}

.logs-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover {
  background-color: #e0e0e0;
}

.logs-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 992px) {
  .settings-container {
    grid-template-columns: 1fr;
  }
  
  .settings-sidebar {
    display: flex;
    flex-wrap: wrap;
  }
  
  .sidebar-item {
    flex: 1;
    min-width: 150px;
    justify-content: center;
    padding: 1rem;
  }
  
  .sidebar-icon {
    margin-right: 0.5rem;
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
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .integration-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .integration-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .api-key-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .api-key-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .backup-actions {
    flex-direction: column;
  }
  
  .filter-controls {
    flex-direction: column;
  }
  
  .logs-actions {
    flex-direction: column;
  }
}
</style>