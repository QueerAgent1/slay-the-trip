<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'
import DashboardOverview from './DashboardOverview.vue'
import ContentManagement from './ContentManagement.vue'
import AIIntegration from './AIIntegration.vue'
import VoiceCommunication from './VoiceCommunication.vue'
import CustomerRelationship from './CustomerRelationship.vue'
import MarketingSuite from './MarketingSuite.vue'
import SystemSettings from './SystemSettings.vue'
import ImageManager from './ImageManager.vue'

const activeModule = ref('overview')
const userRole = ref('admin')
const isLoading = ref(true)
const systemStatus = ref({
  aiModels: {
    claude: 'operational',
    llama: 'operational',
    mistral: 'degraded',
    gemini: 'operational'
  },
  databases: {
    primary: 'operational',
    analytics: 'operational',
    backup: 'operational'
  },
  services: {
    email: 'operational',
    voice: 'operational',
    chat: 'operational',
    forum: 'operational'
  }
})

const notifications = ref([
  {
    id: 1,
    type: 'warning',
    message: 'Mistral AI service experiencing degraded performance',
    time: '10 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'info',
    message: 'New blog content awaiting approval (3 posts)',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'success',
    message: 'Weekly analytics report generated successfully',
    time: '3 hours ago',
    read: true
  },
  {
    id: 4,
    type: 'error',
    message: 'Failed to sync customer data with CRM',
    time: '5 hours ago',
    read: true
  }
])

const unreadNotifications = computed(() => {
  return notifications.value.filter(notification => !notification.read).length
})

const setActiveModule = (module) => {
  activeModule.value = module
}

const markAllNotificationsAsRead = () => {
  notifications.value = notifications.value.map(notification => {
    return { ...notification, read: true }
  })
}

const markNotificationAsRead = (id) => {
  const index = notifications.value.findIndex(notification => notification.id === id)
  if (index !== -1) {
    notifications.value[index].read = true
  }
}

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div class="admin-dashboard">
    <AdminSidebar 
      :active-module="activeModule" 
      :user-role="userRole"
      @set-module="setActiveModule" 
    />
    
    <div class="admin-content">
      <AdminHeader 
        :notifications="notifications"
        :unread-count="unreadNotifications"
        @mark-all-read="markAllNotificationsAsRead"
        @mark-read="markNotificationAsRead"
      />
      
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading administrative system...</p>
      </div>
      
      <div v-else class="module-container">
        <DashboardOverview v-if="activeModule === 'overview'" :system-status="systemStatus" />
        <ContentManagement v-else-if="activeModule === 'content'" />
        <AIIntegration v-else-if="activeModule === 'ai'" />
        <VoiceCommunication v-else-if="activeModule === 'voice'" />
        <CustomerRelationship v-else-if="activeModule === 'crm'" />
        <MarketingSuite v-else-if="activeModule === 'marketing'" />
        <SystemSettings v-else-if="activeModule === 'settings'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  color: #333;
}

.admin-content {
  flex: 1;
  overflow-x: hidden;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px);
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

.module-container {
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .admin-dashboard {
    flex-direction: column;
  }
  
  .module-container {
    padding: 1rem;
  }
}
</style>