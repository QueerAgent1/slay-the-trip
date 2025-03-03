<script setup>
import { ref, onMounted } from 'vue'

// Sample forum data
const forumCategories = [
  {
    id: 1,
    name: 'Destination Discussions',
    description: 'Share experiences and ask questions about specific destinations',
    topics: 156,
    posts: 2347
  },
  {
    id: 2,
    name: 'LGBTQ+ Travel Safety',
    description: 'Discuss safety tips and share experiences about traveling as an LGBTQ+ person',
    topics: 89,
    posts: 1245
  },
  {
    id: 3,
    name: 'Luxury Travel Tips',
    description: 'Share tips and advice for getting the most out of luxury travel experiences',
    topics: 112,
    posts: 1876
  },
  {
    id: 4,
    name: 'Travel Companions',
    description: 'Find travel buddies and companions for your next adventure',
    topics: 67,
    posts: 890
  },
  {
    id: 5,
    name: 'Pride Events & Festivals',
    description: 'Discuss upcoming Pride events and festivals around the world',
    topics: 78,
    posts: 1120
  }
]

const recentTopics = [
  {
    id: 1,
    title: 'Best time to visit Santorini for a romantic getaway?',
    author: 'TravelLover22',
    category: 'Destination Discussions',
    replies: 24,
    views: 342,
    lastActivity: '2 hours ago'
  },
  {
    id: 2,
    title: 'Luxury hotels in Tokyo that are LGBTQ+ friendly',
    author: 'GlobalExplorer',
    category: 'LGBTQ+ Travel Safety',
    replies: 18,
    views: 276,
    lastActivity: '5 hours ago'
  },
  {
    id: 3,
    title: 'Anyone attending Madrid Pride this year?',
    author: 'PrideTraveler',
    category: 'Pride Events & Festivals',
    replies: 32,
    views: 415,
    lastActivity: '1 day ago'
  },
  {
    id: 4,
    title: 'Tips for getting upgrades on luxury cruises',
    author: 'SeaLover',
    category: 'Luxury Travel Tips',
    replies: 15,
    views: 198,
    lastActivity: '2 days ago'
  },
  {
    id: 5,
    title: 'Looking for travel companion for South Africa safari',
    author: 'AdventureSoul',
    category: 'Travel Companions',
    replies: 8,
    views: 156,
    lastActivity: '3 days ago'
  }
]

const activeUsers = ref(124)
const selectedCategory = ref(null)
const showLoginModal = ref(false)
const isLoggedIn = ref(false)
const newTopicModal = ref(false)

const newTopic = ref({
  title: '',
  category: '',
  content: ''
})

const loginForm = ref({
  username: '',
  password: ''
})

const selectCategory = (category) => {
  selectedCategory.value = category
}

const backToCategories = () => {
  selectedCategory.value = null
}

const toggleLoginModal = () => {
  showLoginModal.value = !showLoginModal.value
}

const login = () => {
  // In a real app, this would authenticate with a server
  isLoggedIn.value = true
  showLoginModal.value = false
}

const logout = () => {
  isLoggedIn.value = false
}

const toggleNewTopicModal = () => {
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }
  newTopicModal.value = !newTopicModal.value
}

const submitNewTopic = () => {
  // In a real app, this would send the new topic to a server
  alert('Your topic has been posted!')
  newTopic.value = {
    title: '',
    category: '',
    content: ''
  }
  newTopicModal.value = false
}

// Simulate random number of active users
onMounted(() => {
  setInterval(() => {
    const change = Math.floor(Math.random() * 10) - 5
    activeUsers.value = Math.max(100, activeUsers.value + change)
  }, 30000)
})
</script>

<template>
  <section class="forums">
    <div class="container">
      <div class="section-header">
        <h2>QueerLuxe Travel Community</h2>
        <p>Connect with fellow travelers, share experiences, and get advice for your next luxury adventure</p>
      </div>
      
      <div class="forum-stats">
        <div class="stat">
          <span class="stat-number">{{ activeUsers }}</span>
          <span class="stat-label">Users Online</span>
        </div>
        <div class="stat">
          <span class="stat-number">502</span>
          <span class="stat-label">Topics</span>
        </div>
        <div class="stat">
          <span class="stat-number">7,478</span>
          <span class="stat-label">Posts</span>
        </div>
        <div class="stat">
          <span class="stat-number">2,145</span>
          <span class="stat-label">Members</span>
        </div>
      </div>
      
      <div class="forum-actions">
        <div class="search-box">
          <input type="text" placeholder="Search forums...">
          <button class="search-btn">Search</button>
        </div>
        
        <div class="user-actions">
          <button v-if="!isLoggedIn" @click="toggleLoginModal" class="btn btn-secondary">Log In</button>
          <button v-if="!isLoggedIn" class="btn">Sign Up</button>
          <div v-if="isLoggedIn" class="user-menu">
            <span class="username">Welcome, User</span>
            <button @click="logout" class="btn btn-secondary">Log Out</button>
          </div>
        </div>
      </div>
      
      <div class="forum-content">
        <!-- Category List View -->
        <div v-if="!selectedCategory" class="forum-categories">
          <div class="forum-header">
            <h3>Forum Categories</h3>
            <button @click="toggleNewTopicModal" class="btn">New Topic</button>
          </div>
          
          <div class="category-list">
            <div 
              v-for="category in forumCategories" 
              :key="category.id"
              class="category-card"
              @click="selectCategory(category)"
            >
              <div class="category-info">
                <h4>{{ category.name }}</h4>
                <p>{{ category.description }}</p>
              </div>
              <div class="category-stats">
                <div class="stat">
                  <span class="stat-number">{{ category.topics }}</span>
                  <span class="stat-label">Topics</span>
                </div>
                <div class="stat">
                  <span class="stat-number">{{ category.posts }}</span>
                  <span class="stat-label">Posts</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="recent-topics">
            <h3>Recent Discussions</h3>
            <div class="topic-list">
              <div 
                v-for="topic in recentTopics" 
                :key="topic.id"
                class="topic-item"
              >
                <div class="topic-main">
                  <h4>{{ topic.title }}</h4>
                  <div class="topic-meta">
                    <span class="topic-author">By {{ topic.author }}</span>
                    <span class="topic-category">in {{ topic.category }}</span>
                  </div>
                </div>
                <div class="topic-stats">
                  <div class="stat">
                    <span class="stat-number">{{ topic.replies }}</span>
                    <span class="stat-label">Replies</span>
                  </div>
                  <div class="stat">
                    <span class="stat-number">{{ topic.views }}</span>
                    <span class="stat-label">Views</span>
                  </div>
                  <div class="last-activity">
                    <span>{{ topic.lastActivity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Category Detail View -->
        <div v-if="selectedCategory" class="category-detail">
          <div class="category-header">
            <button @click="backToCategories" class="btn btn-secondary">Back to Categories</button>
            <h3>{{ selectedCategory.name }}</h3>
            <button @click="toggleNewTopicModal" class="btn">New Topic</button>
          </div>
          
          <p class="category-description">{{ selectedCategory.description }}</p>
          
          <div class="topic-filters">
            <div class="filter-options">
              <select>
                <option>All Topics</option>
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Unanswered</option>
              </select>
            </div>
          </div>
          
          <div class="topic-list detailed">
            <div class="topic-header">
              <div class="topic-title-header">Topic</div>
              <div class="topic-stats-header">
                <div>Replies</div>
                <div>Views</div>
                <div>Last Activity</div>
              </div>
            </div>
            
            <div 
              v-for="topic in recentTopics.slice(0, 3)" 
              :key="topic.id"
              class="topic-item"
            >
              <div class="topic-main">
                <h4>{{ topic.title }}</h4>
                <div class="topic-meta">
                  <span class="topic-author">By {{ topic.author }}</span>
                  <span class="topic-date">Started on May 15, 2024</span>
                </div>
              </div>
              <div class="topic-stats">
                <div class="stat">
                  <span class="stat-number">{{ topic.replies }}</span>
                </div>
                <div class="stat">
                  <span class="stat-number">{{ topic.views }}</span>
                </div>
                <div class="last-activity">
                  <span>{{ topic.lastActivity }}</span>
                  <span class="last-poster">by {{ topic.author }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="pagination">
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <span>...</span>
            <button class="pagination-btn">10</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Log In</h3>
          <button @click="toggleLoginModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="loginForm.username" placeholder="Enter your username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="loginForm.password" placeholder="Enter your password">
          </div>
          <div class="form-actions">
            <button @click="login" class="btn">Log In</button>
          </div>
          <div class="form-footer">
            <p>Don't have an account? <a href="#">Sign Up</a></p>
            <p><a href="#">Forgot Password?</a></p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- New Topic Modal -->
    <div v-if="newTopicModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Create New Topic</h3>
          <button @click="toggleNewTopicModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="topic-title">Title</label>
            <input type="text" id="topic-title" v-model="newTopic.title" placeholder="Enter topic title">
          </div>
          <div class="form-group">
            <label for="topic-category">Category</label>
            <select id="topic-category" v-model="newTopic.category">
              <option value="" disabled selected>Select a category</option>
              <option 
                v-for="category in forumCategories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="topic-content">Content</label>
            <textarea id="topic-content" v-model="newTopic.content" rows="6" placeholder="Write your post here..."></textarea>
          </div>
          <div class="form-actions">
            <button @click="toggleNewTopicModal" class="btn btn-secondary">Cancel</button>
            <button @click="submitNewTopic" class="btn">Post Topic</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.forums {
  padding: 5rem 0;
  background-color: #fff;
}

.forum-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.forum-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.search-box {
  display: flex;
  flex: 1;
  max-width: 500px;
}

.search-box input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-family: 'Poppins', sans-serif;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.user-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-weight: 600;
}

.forum-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.category-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background-color: #eee;
}

.category-card {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.category-card:hover {
  background-color: #f9f9f9;
}

.category-info h4 {
  margin-bottom: 0.5rem;
  color: #e52e71;
}

.category-info p {
  color: #666;
  font-size: 0.9rem;
}

.category-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.recent-topics {
  padding: 1.5rem;
}

.recent-topics h3 {
  margin-bottom: 1.5rem;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background-color: #eee;
}

.topic-item {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: white;
  transition: background-color 0.2s ease;
}

.topic-item:hover {
  background-color: #f9f9f9;
}

.topic-main h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.topic-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.topic-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.last-activity {
  font-size: 0.85rem;
  color: #666;
}

/* Category Detail View */
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.category-description {
  padding: 1rem 1.5rem;
  color: #666;
  border-bottom: 1px solid #eee;
}

.topic-filters {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #eee;
}

.filter-options select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
}

.topic-list.detailed .topic-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #f5f5f5;
  font-weight: 600;
}

.topic-title-header {
  flex: 1;
}

.topic-stats-header {
  display: flex;
  gap: 2rem;
  width: 300px;
}

.topic-list.detailed .topic-item {
  border-bottom: 1px solid #eee;
}

.topic-list.detailed .topic-main {
  flex: 1;
}

.topic-list.detailed .topic-stats {
  width: 300px;
}

.last-poster {
  display: block;
  font-size: 0.8rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover {
  background-color: #f5f5f5;
}

.pagination-btn.active {
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  color: white;
  border: none;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
}

.form-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.form-footer a {
  color: #e52e71;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 992px) {
  .forum-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .stat {
    width: 45%;
  }
  
  .topic-stats {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .forum-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .category-card {
    flex-direction: column;
    gap: 1rem;
  }
  
  .category-stats {
    justify-content: flex-start;
  }
  
  .topic-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .topic-stats {
    justify-content: flex-start;
  }
  
  .topic-list.detailed .topic-header {
    display: none;
  }
  
  .topic-list.detailed .topic-stats {
    width: 100%;
  }
  
  .category-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .category-header button {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .forum-stats {
    flex-direction: column;
  }
  
  .stat {
    width: 100%;
  }
}
</style>