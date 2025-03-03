<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const activeTab = ref('blog')

const blogPosts = ref([
  {
    id: 1,
    title: 'Top 10 LGBTQ+ Friendly Luxury Destinations for 2024',
    author: 'Alex Johnson',
    date: 'May 15, 2024',
    status: 'published',
    views: 1245,
    comments: 32,
    excerpt: 'Discover the most welcoming and luxurious destinations for LGBTQ+ travelers this year, from progressive cities to inclusive island retreats.'
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Pride Celebrations Around the World',
    author: 'Maria Rodriguez',
    date: 'May 10, 2024',
    status: 'published',
    views: 987,
    comments: 24,
    excerpt: 'From Sydney to São Paulo, explore the most vibrant and inclusive Pride celebrations that offer luxury experiences for LGBTQ+ travelers.'
  },
  {
    id: 3,
    title: 'Luxury Honeymoon Ideas for Same-Sex Couples',
    author: 'James Wilson',
    date: 'May 5, 2024',
    status: 'draft',
    views: 0,
    comments: 0,
    excerpt: 'Curated honeymoon experiences designed specifically for same-sex couples seeking privacy, luxury, and affirming environments.'
  },
  {
    id: 4,
    title: 'Navigating LGBTQ+ Laws: A Luxury Traveler\'s Guide',
    author: 'Dr. Sarah Ahmed',
    date: 'April 28, 2024',
    status: 'review',
    views: 0,
    comments: 0,
    excerpt: 'Essential information for LGBTQ+ luxury travelers about navigating different legal landscapes while maintaining comfort and safety.'
  },
  {
    id: 5,
    title: 'The Rise of Queer Luxury Travel Experiences',
    author: 'Thomas Lee',
    date: 'April 20, 2024',
    status: 'published',
    views: 756,
    comments: 18,
    excerpt: 'How the luxury travel industry is evolving to create authentic, tailored experiences for the LGBTQ+ community.'
  }
])

const forumTopics = ref([
  {
    id: 1,
    title: 'Best luxury hotels in Barcelona for gay couples?',
    author: 'TravelLover22',
    date: 'May 16, 2024',
    status: 'active',
    views: 342,
    replies: 15,
    flagged: false
  },
  {
    id: 2,
    title: 'Maldives honeymoon experiences for lesbian couples',
    author: 'OceanDreamer',
    date: 'May 14, 2024',
    status: 'active',
    views: 287,
    replies: 12,
    flagged: false
  },
  {
    id: 3,
    title: 'Safety concerns for trans travelers in luxury resorts',
    author: 'GlobalExplorer',
    date: 'May 12, 2024',
    status: 'locked',
    views: 456,
    replies: 24,
    flagged: true
  },
  {
    id: 4,
    title: 'Pride month special packages - worth it?',
    author: 'RainbowTraveler',
    date: 'May 10, 2024',
    status: 'active',
    views: 198,
    replies: 8,
    flagged: false
  },
  {
    id: 5,
    title: 'Solo gay traveler looking for luxury cruise recommendations',
    author: 'SeaLover',
    date: 'May 8, 2024',
    status: 'active',
    views: 245,
    replies: 10,
    flagged: false
  }
])

const products = ref([
  {
    id: 1,
    name: 'Pride Edition Luxury Carry-On',
    category: 'Luggage',
    price: '$595',
    inventory: 45,
    status: 'active'
  },
  {
    id: 2,
    name: 'QueerLuxe Travel Organizer Set',
    category: 'Accessories',
    price: '$175',
    inventory: 78,
    status: 'active'
  },
  {
    id: 3,
    name: 'Destination Pride Capsule Wardrobe',
    category: 'Clothing',
    price: '$850',
    inventory: 12,
    status: 'low-stock'
  },
  {
    id: 4,
    name: 'Global Travel Tech Kit',
    category: 'Tech',
    price: '$395',
    inventory: 23,
    status: 'active'
  },
  {
    id: 5,
    name: 'Luxury Pride Swimwear Collection',
    category: 'Clothing',
    price: '$125',
    inventory: 0,
    status: 'out-of-stock'
  }
])

const aiGeneratedContent = ref([
  {
    id: 1,
    title: 'The Future of Sustainable Luxury Travel',
    type: 'blog',
    model: 'Claude',
    date: '2024-05-16',
    status: 'review',
    confidence: 92
  },
  {
    id: 2,
    title: 'Top 5 Hidden Gems for LGBTQ+ Travelers in Europe',
    type: 'blog',
    model: 'Gemini',
    date: '2024-05-15',
    status: 'approved',
    confidence: 88
  },
  {
    id: 3,
    title: 'Product Description: Convertible Travel Backpack',
    type: 'product',
    model: 'Mistral',
    date: '2024-05-14',
    status: 'approved',
    confidence: 95
  },
  {
    id: 4,
    title: 'Email Campaign: Summer Pride Destinations',
    type: 'marketing',
    model: 'Claude',
    date: '2024-05-13',
    status: 'review',
    confidence: 90
  },
  {
    id: 5,
    title: 'FAQ Responses for Customer Support',
    type: 'support',
    model: 'Llama',
    date: '2024-05-12',
    status: 'approved',
    confidence: 94
  }
])

const selectedPost = ref(null)
const isEditing = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')

const filteredBlogPosts = computed(() => {
  return blogPosts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || post.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const filteredForumTopics = computed(() => {
  return forumTopics.value.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          topic.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || 
                          (statusFilter.value === 'flagged' && topic.flagged) ||
                          topic.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || product.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const filteredAIContent = computed(() => {
  return aiGeneratedContent.value.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          content.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || content.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const setActiveTab = (tab) => {
  activeTab.value = tab
  selectedPost.value = null
  isEditing.value = false
  statusFilter.value = 'all'
}

const selectPost = (post) => {
  selectedPost.value = post
  isEditing.value = false
}

const editPost = () => {
  isEditing.value = true
}

const savePost = () => {
  // In a real application, this would save to a database
  isEditing.value = false
}

const createNewContent = () => {
  // In a real application, this would create a new content item
  alert('This would open a content creation interface')
}

const generateWithAI = () => {
  // In a real application, this would trigger AI content generation
  alert('This would open the AI content generation interface')
}

const renderMarkdown = (text) => {
  return DOMPurify.sanitize(marked(text))
}

const getStatusClass = (status) => {
  switch (status) {
    case 'published':
    case 'active':
      return 'status-published'
    case 'draft':
      return 'status-draft'
    case 'review':
      return 'status-review'
    case 'locked':
      return 'status-locked'
    case 'low-stock':
      return 'status-warning'
    case 'out-of-stock':
      return 'status-error'
    default:
      return ''
  }
}
</script>

<template>
  <div class="content-management">
    <div class="content-header">
      <h1>Content Management Hub</h1>
      <div class="content-actions">
        <button class="action-button" @click="createNewContent">
          <span>➕</span> Create New
        </button>
        <button class="action-button primary" @click="generateWithAI">
          <span>🤖</span> Generate with AI
        </button>
      </div>
    </div>
    
    <div class="content-tabs">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'blog' }"
        @click="setActiveTab('blog')"
      >
        Blog Management
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'forum' }"
        @click="setActiveTab('forum')"
      >
        Forum Moderation
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'products' }"
        @click="setActiveTab('products')"
      >
        Product Inventory
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'ai' }"
        @click="setActiveTab('ai')"
      >
        AI-Generated Content
      </button>
    </div>
    
    <div class="content-filters">
      <div class="search-filter">
        <input 
          type="text" 
          v-model="searchQuery" 
          :placeholder="`Search ${activeTab}...`"
        >
      </div>
      
      <div class="status-filter">
        <label for="status-select">Status:</label>
        <select id="status-select" v-model="statusFilter">
          <option value="all">All</option>
          
          <template v-if="activeTab === 'blog'">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
          </template>
          
          <template v-if="activeTab === 'forum'">
            <option value="active">Active</option>
            <option value="locked">Locked</option>
            <option value="flagged">Flagged</option>
          </template>
          
          <template v-if="activeTab === 'products'">
            <option value="active">Active</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </template>
          
          <template v-if="activeTab === 'ai'">
            <option value="approved">Approved</option>
            <option value="review">Under Review</option>
          </template>
        </select>
      </div>
    </div>
    
    <div class="content-container">
      <!-- Blog Management -->
      <div v-if="activeTab === 'blog'" class="content-section">
        <div class="content-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="post in filteredBlogPosts" 
                :key="post.id"
                @click="selectPost(post)"
                :class="{ 'selected': selectedPost && selectedPost.id === post.id }"
              >
                <td>{{ post.title }}</td>
                <td>{{ post.author }}</td>
                <td>{{ post.date }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(post.status)">
                    {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
                  </span>
                </td>
                <td>{{ post.views }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="content-detail" v-if="selectedPost">
          <div class="detail-header">
            <h2>{{ selectedPost.title }}</h2>
            <div class="detail-actions">
              <button v-if="!isEditing" class="action-button" @click="editPost">
                <span>✏️</span> Edit
              </button>
              <button v-if="isEditing" class="action-button primary" @click="savePost">
                <span>💾</span> Save
              </button>
            </div>
          </div>
          
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Author:</span>
              <span class="meta-value">{{ selectedPost.author }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date:</span>
              <span class="meta-value">{{ selectedPost.date }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Status:</span>
              <span class="meta-value status-badge" :class="getStatusClass(selectedPost.status)">
                {{ selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1) }}
              </span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Views:</span>
              <span class="meta-value">{{ selectedPost.views }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Comments:</span>
              <span class="meta-value">{{ selectedPost.comments }}</span>
            </div>
          </div>
          
          <div class="detail-content">
            <h3>Excerpt</h3>
            <p>{{ selectedPost.excerpt }}</p>
            
            <div class="content-preview">
              <h3>Content Preview</h3>
              <div class="preview-placeholder">
                <p>Full content would be displayed here in the actual system.</p>
              </div>
            </div>
            
            <div class="seo-analysis">
              <h3>SEO Analysis</h3>
              <div class="seo-metrics">
                <div class="seo-metric">
                  <div class="metric-label">Readability</div>
                  <div class="metric-value">Good</div>
                  <div class="metric-bar">
                    <div class="metric-fill" style="width: 75%;"></div>
                  </div>
                </div>
                <div class="seo-metric">
                  <div class="metric-label">Keyword Usage</div>
                  <div class="metric-value">Excellent</div>
                  <div class="metric-bar">
                    <div class="metric-fill" style="width: 90%;"></div>
                  </div>
                </div>
                <div class="seo-metric">
                  <div class="metric-label">Meta Description</div>
                  <div class="metric-value">Needs Improvement</div>
                  <div class="metric-bar">
                    <div class="metric-fill" style="width: 45%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Forum Moderation -->
      <div v-if="activeTab === 'forum'" class="content-section">
        <div class="content-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Replies</th>
                <th>Flagged</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="topic in filteredForumTopics" 
                :key="topic.id"
                @click="selectPost(topic)"
                :class="{ 'selected': selectedPost && selectedPost.id === topic.id }"
              >
                <td>{{ topic.title }}</td>
                <td>{{ topic.category }}</td>
                <td>{{ topic.author }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(topic.status)">
                    {{ topic.status.charAt(0).toUpperCase() + topic.status.slice(1) }}
                  </span>
                </td>
                <td>{{ topic.replies }}</td>
                <td>
                  <span v-if="topic.flagged" class="flag-indicator">🚩</span>
                  <span v-else>-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="content-detail" v-if="selectedPost">
          <div class="detail-header">
            <h2>{{ selectedPost.title }}</h2>
            <div class="detail-actions">
              <button class="action-button warning" v-if="!selectedPost.flagged">
                <span>🚩</span> Flag
              </button>
              <button class="action-button" v-if="selectedPost.status !== 'locked'">
                <span>🔒</span> Lock
              </button>
              <button class="action-button error">
                <span>🗑️</span> Delete
              </button>
            </div>
          </div>
          
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Author:</span>
              <span class="meta-value">{{ selectedPost.author }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date:</span>
              <span class="meta-value">{{ selectedPost.date }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Category:</span>
              <span class="meta-value">{{ selectedPost.category }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Status:</span>
              <span class="meta-value status-badge" :class="getStatusClass(selectedPost.status)">
                {{ selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1) }}
              </span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Views:</span>
              <span class="meta-value">{{ selectedPost.views }}</span>
            </div>
          </div>
          
          <div class="detail-content">
            <div class="moderation-tools">
              <h3>Moderation Tools</h3>
              <div class="moderation-actions">
                <button class="mod-action">
                  <span>🔍</span> Content Analysis
                </button>
                <button class="mod-action">
                  <span>📝</span> Edit Content
                </button>
                <button class="mod-action">
                  <span>📧</span> Message User
                </button>
                <button class="mod-action">
                  <span>⚠️</span> Issue Warning
                </button>
              </div>
            </div>
            
            <div class="ai-moderation">
              <h3>AI Moderation Analysis</h3>
              <div class="ai-analysis">
                <div class="analysis-item">
                  <div class="analysis-label">Toxicity Score:</div>
                  <div class="analysis-value">Low (0.12)</div>
                </div>
                <div class="analysis-item">
                  <div class="analysis-label">Spam Probability:</div>
                  <div class="analysis-value">Very Low (0.03)</div>
                </div>
                <div class="analysis-item">
                  <div class="analysis-label">Content Policy:</div>
                  <div class="analysis-value">Compliant</div>
                </div>
                <div class="analysis-item">
                  <div class="analysis-label">Recommendation:</div>
                  <div class="analysis-value">No action needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Inventory -->
      <div v-if="activeTab === 'products'" class="content-section">
        <div class="content-list">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="product in filteredProducts" 
                :key="product.id"
                @click="selectPost(product)"
                :class="{ 'selected': selectedPost && selectedPost.id === product.id }"
              >
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.inventory }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(product.status)">
                    {{ product.status.replace('-', ' ').charAt(0).toUpperCase() + product.status.replace('-', ' ').slice(1) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="content-detail" v-if="selectedPost">
          <div class="detail-header">
            <h2>{{ selectedPost.name }}</h2>
            <div class="detail-actions">
              <button class="action-button">
                <span>✏️</span> Edit
              </button>
              <button class="action-button">
                <span>📦</span> Update Inventory
              </button>
            </div>
          </div>
          
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Category:</span>
              <span class="meta-value">{{ selectedPost.category }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Price:</span>
              <span class="meta-value">{{ selectedPost.price }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Inventory:</span>
              <span class="meta-value">{{ selectedPost.inventory }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Status:</span>
              <span class="meta-value status-badge" :class="getStatusClass(selectedPost.status)">
                {{ selectedPost.status.replace('-', ' ').charAt(0).toUpperCase() + selectedPost.status.replace('-', ' ').slice(1) }}
              </span>
            </div>
          </div>
          
          <div class="detail-content">
            <div class="inventory-analytics">
              <h3>Inventory Analytics</h3>
              <div class="analytics-grid">
                <div class="analytics-card">
                  <div class="analytics-title">Sales Velocity</div>
                  <div class="analytics-value">4.2 units/day</div>
                  <div class="analytics-trend positive">↑ 12%</div>
                </div>
                <div class="analytics-card">
                  <div class="analytics-title">Restock Alert</div>
                  <div class="analytics-value">{{ selectedPost.inventory <= 15 ? 'Recommended' : 'Not Needed' }}</div>
                  <div class="analytics-trend" :class="selectedPost.inventory <= 15 ? 'negative' : 'neutral'">
                    {{ selectedPost.inventory <= 15 ? '⚠️ Low Stock' : '✓ Adequate' }}
                  </div>
                </div>
                <div class="analytics-card">
                  <div class="analytics-title">Profit Margin</div>
                  <div class="analytics-value">42%</div>
                  <div class="analytics-trend positive">↑ 3%</div>
                </div>
                <div class="analytics-card">
                  <div class="analytics-title">Customer Rating</div>
                  <div class="analytics-value">4.8/5</div>
                  <div class="analytics-trend positive">↑ 0.2</div>
                </div>
              </div>
            </div>
            
            <div class="ai-prediction">
              <h3>AI Inventory Predictions</h3>
              <div class="prediction-content">
                <p>Based on current sales trends and seasonal patterns, we predict this product will sell out in <strong>18 days</strong> without restocking.</p>
                <p>Recommended restock quantity: <strong>75 units</strong></p>
                <p>Optimal restock date: <strong>June 5, 2024</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AI-Generated Content -->
      <div v-if="activeTab === 'ai'" class="content-section">
        <div class="content-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>AI Model</th>
                <th>Date</th>
                <th>Status</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="content in filteredAIContent" 
                :key="content.id"
                @click="selectPost(content)"
                :class="{ 'selected': selectedPost && selectedPost.id === content.id }"
              >
                <td>{{ content.title }}</td>
                <td>{{ content.type.charAt(0).toUpperCase() + content.type.slice(1) }}</td>
                <td>{{ content.model }}</td>
                <td>{{ content.date }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(content.status === 'approved' ? 'published' : 'review')">
                    {{ content.status.charAt(0).toUpperCase() + content.status.slice(1) }}
                  </span>
                </td>
                <td>{{ content.confidence }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="content-detail" v-if="selectedPost">
          <div class="detail-header">
            <h2>{{ selectedPost.title }}</h2>
            <div class="detail-actions">
              <button class="action-button" v-if="selectedPost.status === 'review'">
                <span>✅</span> Approve
              </button>
              <button class="action-button" v-if="selectedPost.status === 'review'">
                <span>❌</span> Reject
              </button>
              <button class="action-button">
                <span>✏️</span> Edit
              </button>
              <button class="action-button">
                <span>🔄</span> Regenerate
              </button>
            </div>
          </div>
          
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Type:</span>
              <span class="meta-value">{{ selectedPost.type.charAt(0).toUpperCase() + selectedPost.type.slice(1) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">AI Model:</span>
              <span class="meta-value">{{ selectedPost.model }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date:</span>
              <span class="meta-value">{{ selectedPost.date }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Status:</span>
              <span class="meta-value status-badge" :class="getStatusClass(selectedPost.status === 'approved' ? 'published' : 'review')">
                {{ selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1) }}
              </span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Confidence:</span>
              <span class="meta-value">{{ selectedPost.confidence }}%</span>
            </div>
          </div>
          
          <div class="detail-content">
            <div class="ai-content-preview">
              <h3>Content Preview</h3>
              <div class="preview-placeholder">
                <p>AI-generated content would be displayed here in the actual system.</p>
              </div>
            </div>
            
            <div class="ai-analysis">
              <h3>AI Content Analysis</h3>
              <div class="analysis-grid">
                <div class="analysis-card">
                  <div class="analysis-title">Originality</div>
                  <div class="analysis-value">92%</div>
                  <div class="analysis-bar">
                    <div class="analysis-fill" style="width: 92%;"></div>
                  </div>
                </div>
                <div class="analysis-card">
                  <div class="analysis-title">Factual Accuracy</div>
                  <div class="analysis-value">95%</div>
                  <div class="analysis-bar">
                    <div class="analysis-fill" style="width: 95%;"></div>
                  </div>
                </div>
                <div class="analysis-card">
                  <div class="analysis-title">Brand Alignment</div>
                  <div class="analysis-value">88%</div>
                  <div class="analysis-bar">
                    <div class="analysis-fill" style="width: 88%;"></div>
                  </div>
                </div>
                <div class="analysis-card">
                  <div class="analysis-title">Engagement Potential</div>
                  <div class="analysis-value">90%</div>
                  <div class="analysis-bar">
                    <div class="analysis-fill" style="width: 90%;"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="ai-parameters">
              <h3>Generation Parameters</h3>
              <div class="parameters-list">
                <div class="parameter-item">
                  <div class="parameter-name">Model:</div>
                  <div class="parameter-value">{{ selectedPost.model }}</div>
                </div>
                <div class="parameter-item">
                  <div class="parameter-name">Temperature:</div>
                  <div class="parameter-value">0.7</div>
                </div>
                <div class="parameter-item">
                  <div class="parameter-name">Max Tokens:</div>
                  <div class="parameter-value">1500</div>
                </div>
                <div class="parameter-item">
                  <div class="parameter-name">Prompt Template:</div>
                  <div class="parameter-value">LGBTQ+ Travel Content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-management {
  color: #333;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.content-actions {
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

.action-button.warning {
  background-color: #ff9800;
  color: white;
  border-color: #ff9800;
}

.action-button.warning:hover {
  background-color: #e68900;
}

.action-button.error {
  background-color: #f44336;
  color: white;
  border-color: #f44336;
}

.action-button.error:hover {
  background-color: #d32f2f;
}

.content-tabs {
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

.content-filters {
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

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.content-list {
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

.status-published {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-draft {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-review {
  background-color: #fff8e1;
  color: #f57f17;
}

.status-locked {
  background-color: #ffebee;
  color: #c62828;
}

.status-warning {
  background-color: #fff8e1;
  color: #f57f17;
}

.status-error {
  background-color: #ffebee;
  color: #c62828;
}

.flag-indicator {
  font-size: 1.2rem;
}

.content-detail {
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

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.content-preview, .preview-placeholder {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
}

.preview-placeholder p {
  color: #888;
  text-align: center;
  margin: 2rem 0;
}

.seo-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.seo-metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-weight: 500;
}

.metric-bar {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  border-radius: 4px;
}

.moderation-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.mod-action {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mod-action span {
  margin-right: 0.5rem;
}

.mod-action:hover {
  background-color: #e0e0e0;
}

.ai-analysis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.analysis-label {
  font-weight: 500;
}

.inventory-analytics, .ai-prediction {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.analytics-card {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.analytics-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.analytics-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.analytics-trend {
  font-size: 0.9rem;
}

.analytics-trend.positive {
  color: #4caf50;
}

.analytics-trend.negative {
  color: #f44336;
}

.analytics-trend.neutral {
  color: #9e9e9e;
}

.prediction-content {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.analysis-card {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.analysis-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.analysis-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.analysis-bar {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.analysis-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  border-radius: 4px;
}

.parameters-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.parameter-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.parameter-name {
  font-weight: 500;
}

@media (max-width: 1200px) {
  .content-section {
    grid-template-columns: 1fr;
  }
  
  .analytics-grid, .analysis-grid, .parameters-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .content-actions {
    margin-top: 1rem;
    width: 100%;
  }
  
  .action-button {
    flex: 1;
    justify-content: center;
  }
  
  .content-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
  }
  
  .content-filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-filter {
    max-width: 100%;
  }
  
  .detail-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .detail-actions {
    width: 100%;
  }
  
  .ai-analysis {
    grid-template-columns: 1fr;
  }
}
</style>