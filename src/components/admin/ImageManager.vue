<script setup>
import { ref, onMounted } from 'vue'
import { getImage, uploadImage } from '../../services/imageService'
import ImageUploader from './ImageUploader.vue'
import supabase from '../../services/supabaseClient'

const categories = [
  { id: 'hero', name: 'Hero Images' },
  { id: 'hotels', name: 'Hotels' },
  { id: 'experiences', name: 'Experiences' },
  { id: 'destinations', name: 'Destinations' },
  { id: 'people', name: 'People' },
  { id: 'products', name: 'Products' },
  { id: 'featured', name: 'Featured' },
  { id: 'magazine', name: 'Magazine' },
  { id: 'podcast', name: 'Podcast' }
]

const activeCategory = ref('hero')
const images = ref([])
const loading = ref(false)
const error = ref(null)
const selectedImages = ref([])
const isSelecting = ref(false)

// Set active category
const setCategory = async (categoryId) => {
  activeCategory.value = categoryId
  await loadImages()
}

// Load images for the active category
const loadImages = async () => {
  loading.value = true
  error.value = null
  images.value = []
  
  try {
    // Get images from Supabase storage
    const { data, error: listError } = await supabase.storage
      .from('travel-images')
      .list(activeCategory.value)
    
    if (listError) {
      throw new Error(listError.message)
    }
    
    if (data && data.length > 0) {
      // Get public URLs for each image
      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const { data: urlData } = supabase.storage
            .from('travel-images')
            .getPublicUrl(`${activeCategory.value}/${file.name}`)
          
          return {
            name: file.name,
            path: `${activeCategory.value}/${file.name}`,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            created: file.created_at || new Date().toISOString()
          }
        })
      )
      
      images.value = imageUrls
    }
  } catch (err) {
    console.error('Error loading images:', err)
    error.value = 'Failed to load images. Please try again.'
    
    // Load fallback images if Supabase fails
    try {
      const fallbackImages = []
      for (let i = 0; i < 10; i++) {
        const imageUrl = await getImage(activeCategory.value, i)
        if (imageUrl) {
          fallbackImages.push({
            name: `fallback-${i}.jpg`,
            path: null,
            url: imageUrl,
            size: 0,
            created: new Date().toISOString(),
            isFallback: true
          })
        }
      }
      
      if (fallbackImages.length > 0) {
        images.value = fallbackImages
        error.value = 'Using fallback images. Supabase storage connection failed.'
      }
    } catch (fallbackErr) {
      console.error('Error loading fallback images:', fallbackErr)
    }
  } finally {
    loading.value = false
  }
}

// Handle successful upload
const handleUploadSuccess = async () => {
  await loadImages()
}

// Handle upload error
const handleUploadError = (errorMessage) => {
  error.value = errorMessage
}

// Toggle image selection mode
const toggleSelectionMode = () => {
  isSelecting.value = !isSelecting.value
  selectedImages.value = []
}

// Toggle image selection
const toggleImageSelection = (image) => {
  if (!isSelecting.value) return
  
  const index = selectedImages.value.findIndex(img => img.path === image.path)
  if (index === -1) {
    selectedImages.value.push(image)
  } else {
    selectedImages.value.splice(index, 1)
  }
}

// Check if an image is selected
const isImageSelected = (image) => {
  return selectedImages.value.some(img => img.path === image.path)
}

// Delete selected images
const deleteSelectedImages = async () => {
  if (selectedImages.value.length === 0) return
  
  const confirmation = confirm(`Are you sure you want to delete ${selectedImages.value.length} images?`)
  if (!confirmation) return
  
  loading.value = true
  error.value = null
  
  try {
    // Filter out fallback images
    const supabaseImages = selectedImages.value.filter(img => !img.isFallback)
    
    if (supabaseImages.length > 0) {
      const paths = supabaseImages.map(img => img.path)
      
      const { error: deleteError } = await supabase.storage
        .from('travel-images')
        .remove(paths)
      
      if (deleteError) {
        throw new Error(deleteError.message)
      }
    }
    
    // Reload images
    await loadImages()
    
    // Reset selection
    selectedImages.value = []
    isSelecting.value = false
  } catch (err) {
    console.error('Error deleting images:', err)
    error.value = 'Failed to delete images. Please try again.'
  } finally {
    loading.value = false
  }
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format date
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  } catch (err) {
    return dateString
  }
}

// Load images on component mount
onMounted(() => {
  loadImages()
})
</script>

<template>
  <div class="image-manager">
    <div class="manager-header">
      <h2>Image Manager</h2>
      <div class="header-actions">
        <button 
          v-if="isSelecting" 
          @click="deleteSelectedImages" 
          class="action-button delete"
          :disabled="selectedImages.length === 0"
        >
          Delete Selected ({{ selectedImages.length }})
        </button>
        <button 
          @click="toggleSelectionMode" 
          class="action-button"
        >
          {{ isSelecting ? 'Cancel Selection' : 'Select Images' }}
        </button>
        <button 
          @click="loadImages" 
          class="action-button refresh"
          :disabled="loading"
        >
          Refresh
        </button>
      </div>
    </div>
    
    <div class="category-tabs">
      <button 
        v-for="category in categories" 
        :key="category.id"
        class="category-tab"
        :class="{ 'active': activeCategory === category.id }"
        @click="setCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>
    
    <div class="manager-content">
      <div class="uploader-section">
        <ImageUploader 
          :category="activeCategory" 
          :multiple="true"
          @upload-success="handleUploadSuccess"
          @upload-error="handleUploadError"
        />
      </div>
      
      <div class="gallery-section">
        <div v-if="loading" class="loading-indicator">
          Loading images...
        </div>
        
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-else-if="images.length === 0" class="empty-state">
          No images found in this category. Upload some images to get started.
        </div>
        
        <div v-else class="image-gallery">
          <div 
            v-for="image in images" 
            :key="image.path || image.url"
            class="image-item"
            :class="{ 'selected': isImageSelected(image) }"
            @click="toggleImageSelection(image)"
          >
            <div class="image-preview">
              <img :src="image.url" :alt="image.name">
              <div v-if="isSelecting" class="selection-overlay">
                <div class="selection-checkbox" :class="{ 'checked': isImageSelected(image) }">
                  <span v-if="isImageSelected(image)">✓</span>
                </div>
              </div>
              <div v-if="image.isFallback" class="fallback-badge">Fallback</div>
            </div>
            <div class="image-details">
              <div class="image-name" :title="image.name">{{ image.name }}</div>
              <div class="image-meta">
                <span v-if="image.size">{{ formatFileSize(image.size) }}</span>
                <span v-if="image.created">{{ formatDate(image.created) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-manager {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.manager-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.action-button.delete {
  background-color: #ffebee;
  color: #f44336;
  border-color: #ffcdd2;
}

.action-button.delete:hover:not(:disabled) {
  background-color: #ffcdd2;
}

.action-button.refresh {
  background-color: #e8f5e9;
  color: #4caf50;
  border-color: #c8e6c9;
}

.action-button.refresh:hover:not(:disabled) {
  background-color: #c8e6c9;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.category-tab {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  background-color: #e0e0e0;
}

.category-tab.active {
  background-color: #e52e71;
  color: white;
  border-color: #e52e71;
}

.manager-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;
}

.loading-indicator, .error-message, .empty-state {
  padding: 2rem;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.error-message {
  color: #f44336;
  background-color: #ffebee;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.image-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.image-item.selected {
  border: 2px solid #e52e71;
}

.image-preview {
  height: 150px;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.selection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.selection-checkbox {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.selection-checkbox.checked {
  background-color: #e52e71;
  border-color: #e52e71;
}

.fallback-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.image-details {
  padding: 0.75rem;
}

.image-name {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.image-meta {
  display: flex;
  justify-content: space-between;
}
</style>