<script setup>
import { ref } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    required: true
  },
  unreadCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['mark-all-read', 'mark-read'])

const isNotificationsOpen = ref(false)
const searchQuery = ref('')

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
}

const markAllAsRead = () => {
  emit('mark-all-read')
}

const markAsRead = (id) => {
  emit('mark-read', id)
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    default:
      return '📢'
  }
}
</script>

<template>
  <header class="admin-header">
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search across admin system..."
      >
      <button class="search-button">🔍</button>
    </div>
    
    <div class="header-actions">
      <div class="notification-center">
        <button 
          class="notification-button" 
          @click="toggleNotifications"
          :class="{ 'has-unread': unreadCount > 0 }"
        >
          🔔
          <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
        </button>
        
        <div v-if="isNotificationsOpen" class="notification-dropdown">
          <div class="notification-header">
            <h3>Notifications</h3>
            <button 
              v-if="unreadCount > 0" 
              class="mark-all-read" 
              @click="markAllAsRead"
            >
              Mark all as read
            </button>
          </div>
          
          <div class="notification-list">
            <div 
              v-for="notification in notifications" 
              :key="notification.id"
              class="notification-item"
              :class="{ 'unread': !notification.read }"
              @click="markAsRead(notification.id)"
            >
              <div class="notification-icon">
                {{ getNotificationIcon(notification.type) }}
              </div>
              <div class="notification-content">
                <div class="notification-message">{{ notification.message }}</div>
                <div class="notification-time">{{ notification.time }}</div>
              </div>
            </div>
            
            <div v-if="notifications.length === 0" class="no-notifications">
              No notifications to display
            </div>
          </div>
        </div>
      </div>
      
      <div class="help-center">
        <button class="help-button">❓</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  max-width: 500px;
}

.search-bar input {
  border: none;
  background: none;
  flex: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
  outline: none;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.header-actions {
  display: flex;
  align-items: center;
}

.notification-center {
  position: relative;
  margin-right: 1rem;
}

.notification-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
}

.notification-button.has-unread {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #e52e71;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.notification-header h3 {
  margin: 0;
  font-size: 1rem;
}

.mark-all-read {
  background: none;
  border: none;
  color: #e52e71;
  font-size: 0.8rem;
  cursor: pointer;
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: rgba(229, 46, 113, 0.05);
}

.notification-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.notification-content {
  flex: 1;
}

.notification-message {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.notification-time {
  font-size: 0.8rem;
  color: #888;
}

.no-notifications {
  padding: 2rem;
  text-align: center;
  color: #888;
  font-size: 0.9rem;
}

.help-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .admin-header {
    padding: 0.75rem 1rem;
  }
  
  .search-bar {
    max-width: 200px;
  }
  
  .notification-dropdown {
    width: 300px;
    right: -100px;
  }
}

@media (max-width: 576px) {
  .search-bar {
    display: none;
  }
}
</style>