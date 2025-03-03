<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  activeModule: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['set-module'])

const isMobileMenuOpen = ref(false)

const modules = [
  {
    id: 'overview',
    name: 'Dashboard Overview',
    icon: '📊',
    roles: ['admin', 'manager', 'editor', 'viewer']
  },
  {
    id: 'content',
    name: 'Content Management',
    icon: '📝',
    roles: ['admin', 'manager', 'editor']
  },
  {
    id: 'images',
    name: 'Image Manager',
    icon: '🖼️',
    roles: ['admin', 'manager', 'editor']
  },
  {
    id: 'ai',
    name: 'AI Integration',
    icon: '🤖',
    roles: ['admin', 'manager']
  },
  {
    id: 'voice',
    name: 'Voice & Communication',
    icon: '🔊',
    roles: ['admin', 'manager', 'editor']
  },
  {
    id: 'crm',
    name: 'Customer Relationship',
    icon: '👥',
    roles: ['admin', 'manager', 'editor', 'viewer']
  },
  {
    id: 'marketing',
    name: 'Marketing Suite',
    icon: '📈',
    roles: ['admin', 'manager', 'editor']
  },
  {
    id: 'settings',
    name: 'System Settings',
    icon: '⚙️',
    roles: ['admin']
  }
]

const filteredModules = computed(() => {
  return modules.filter(module => module.roles.includes(props.userRole))
})

const setModule = (moduleId) => {
  emit('set-module', moduleId)
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="admin-sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-text">QueerLuxe</span>
        <span class="logo-admin">Admin</span>
      </div>
      <button class="mobile-toggle" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    
    <div class="sidebar-content">
      <div class="user-info">
        <div class="user-avatar">A</div>
        <div class="user-details">
          <div class="user-name">Admin User</div>
          <div class="user-role">{{ userRole.charAt(0).toUpperCase() + userRole.slice(1) }}</div>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <ul>
          <li 
            v-for="module in filteredModules" 
            :key="module.id"
            :class="{ active: activeModule === module.id }"
            @click="setModule(module.id)"
          >
            <span class="module-icon">{{ module.icon }}</span>
            <span class="module-name">{{ module.name }}</span>
          </li>
        </ul>
      </nav>
    </div>
    
    <div class="sidebar-footer">
      <div class="system-version">v1.0.0</div>
      <button class="logout-button">
        <span class="logout-icon">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.admin-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #2c3e50, #1a252f);
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: all 0.3s ease;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-admin {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-toggle span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.user-info {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 1rem;
}

.user-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 0.8rem;
  opacity: 0.7;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-nav li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-nav li.active {
  background: linear-gradient(90deg, rgba(229, 46, 113, 0.2), transparent);
  border-left: 4px solid #e52e71;
}

.module-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.system-version {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 1rem;
  text-align: center;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 1000;
    transform: translateY(-100%);
    opacity: 0;
  }
  
  .admin-sidebar.mobile-open {
    transform: translateY(0);
    opacity: 1;
    height: 100vh;
  }
  
  .sidebar-header {
    padding: 1rem;
  }
  
  .mobile-toggle {
    display: flex;
  }
  
  .sidebar-content {
    display: none;
  }
  
  .sidebar-footer {
    display: none;
  }
  
  .admin-sidebar.mobile-open .sidebar-content,
  .admin-sidebar.mobile-open .sidebar-footer {
    display: block;
  }
}
</style>