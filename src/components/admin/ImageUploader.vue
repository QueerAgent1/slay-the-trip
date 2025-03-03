<script setup>
import { ref, computed } from 'vue'
import { uploadImage, getImage } from '../../services/imageService'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  maxSize: {
    type: Number,
    default: 5 // 5MB
  }
})

const emit = defineEmits(['upload-success', 'upload-error'])

const files = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)
const error = ref(null)
const success = ref(null)
const recentUploads = ref([])

// Computed properties for validation
const isValidFileType = computed(() => {
  if (files.value.length === 0) return true
  
  for (const file of files.value) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return false
    }
  }
  
  return true
})

const isValidFileSize = computed(() => {
  if (files.value.length === 0) return true
  
  for (const file of files.value) {
    // Convert MB to bytes
    const maxBytes = props.maxSize * 1024 * 1024
    if (file.size > maxBytes) {
      return false
    }
  }
  
  return true
})

// Handle file selection
const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files)
  
  if (!props.multiple && selectedFiles.length > 0) {
    files.value = [selectedFiles[0]]
  } else {
    files.value = selectedFiles
  }
  
  error.value = null
  success.value = null
}

// Handle file upload
const handleUpload = async () => {
  if (files.value.length === 0) {
    error.value = 'Please select a file to upload'
    return
  }
  
  if (!isValidFileType.value) {
    error.value = 'Invalid file type. Please upload JPG, PNG, WebP, or GIF images only.'
    return
  }
  
  if (!isValidFileSize.value) {
    error.value = `File size exceeds the maximum limit of ${props.maxSize}MB.`
    return
  }
  
  uploading.value = true
  error.value = null
  success.value = null
  uploadProgress.value = 0
  
  try {
    // For multiple files
    if (props.multiple) {
      const results = []
      const totalFiles = files.value.length
      
      for (let i = 0; i < totalFiles; i++) {
        const file = files.value[i]
        const result = await uploadImage(file, props.category)
        
        if (result.error) {
          throw new Error(`Failed to upload ${file.name}: ${result.error.message}`)
        }
        
        results.push(result.path)
        uploadProgress.value = ((i + 1) / totalFiles) * 100
      }
      
      recentUploads.value = [...results, ...recentUploads.value].slice(0, 5)
      success.value = `Successfully uploaded ${totalFiles} files`
      emit('upload-success', results)
    } 
    // For single file
    else {
      const file = files.value[0]
      const result = await uploadImage(file, props.category)
      
      if (result.error) {
        throw new Error(`Failed to upload ${file.name}: ${result.error.message}`)
      }
      
      recentUploads.value = [result.path, ...recentUploads.value].slice(0, 5)
      success.value = 'File uploaded successfully'
      emit('upload-success', result.path)
    }
    
    // Reset file input
    files.value = []
    document.getElementById('file-upload').value = ''
  } catch (err) {
    error.value = err.message || 'An error occurred during upload'
    emit('upload-error', error.value)
  } finally {
    uploading.value = false
    uploadProgress.value = 100
    
    // Reset progress after a delay
    setTimeout(() => {
      uploadProgress.value = 0
    }, 2000)
  }
}

// Load recent uploads from the category
const loadRecentUploads = async () => {
  try {
    // Get 5 random images from the category to show as examples
    const images = []
    for (let i = 0; i < 5; i++) {
      const image = await getImage(props.category, i)
      if (image) {
        images.push(image)
      }
    }
    
    if (images.length > 0) {
      recentUploads.value = images
    }
  } catch (err) {
    console.error('Error loading recent uploads:', err)
  }
}

// Load recent uploads on component mount
loadRecentUploads()
</script>

<template>
  <div class="image-uploader">
    <h3>Upload Images - {{ category }}</h3>
    
    <div class="upload-container">
      <div class="file-input-container">
        <input 
          type="file" 
          id="file-upload" 
          @change="handleFileSelect" 
          :multiple="multiple"
          accept="image/jpeg,image/png,image/webp,image/gif"
        >
        <label for="file-upload" class="file-input-label">
          <span class="icon">📁</span>
          <span v-if="!files.length">Choose {{ multiple ? 'Files' : 'a File' }}</span>
          <span v-else>{{ files.length }} {{ files.length === 1 ? 'file' : 'files' }} selected</span>
        </label>
      </div>
      
      <button 
        @click="handleUpload" 
        class="upload-button"
        :disabled="uploading || files.length === 0"
      >
        <span v-if="!uploading">Upload</span>
        <span v-else>Uploading...</span>
      </button>
    </div>
    
    <!-- File list -->
    <div v-if="files.length > 0" class="file-list">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <span class="file-name">{{ file.name }}</span>
        <span class="file-size">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</span>
      </div>
    </div>
    
    <!-- Progress bar -->
    <div v-if="uploadProgress > 0" class="progress-container">
      <div class="progress-bar" :style="{ width: `${uploadProgress}%` }"></div>
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <!-- Success message -->
    <div v-if="success" class="success-message">
      {{ success }}
    </div>
    
    <!-- Recent uploads -->
    <div v-if="recentUploads.length > 0" class="recent-uploads">
      <h4>Recent Uploads</h4>
      <div class="uploads-grid">
        <div v-for="(upload, index) in recentUploads" :key="index" class="upload-preview">
          <img :src="upload" :alt="`Upload ${index + 1}`">
        </div>
      </div>
    </div>
    
    <!-- Help text -->
    <div class="help-text">
      <p>Accepted file types: JPG, PNG, WebP, GIF</p>
      <p>Maximum file size: {{ maxSize }}MB</p>
      <p v-if="multiple">You can upload multiple files at once</p>
    </div>
  </div>
</template>

<style scoped>
.image-uploader {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: #333;
  text-transform: capitalize;
}

.upload-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.file-input-container {
  flex: 1;
  position: relative;
}

.file-input-container input[type="file"] {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.file-input-label {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f5f7fa;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.file-input-label:hover {
  background-color: #e0e0e0;
}

.file-input-label .icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.upload-button {
  padding: 0.75rem 1.5rem;
  background-color: #e52e71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-button:hover:not(:disabled) {
  background-color: #d41b5f;
}

.upload-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.file-list {
  margin-bottom: 1rem;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
}

.file-item:last-child {
  border-bottom: none;
}

.file-name {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.file-size {
  font-size: 0.8rem;
  color: #666;
}

.progress-container {
  height: 6px;
  background-color: #f5f5f5;
  border-radius: 3px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  transition: width 0.3s ease;
}

.error-message {
  color: #f44336;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #ffebee;
  border-radius: 4px;
}

.success-message {
  color: #4caf50;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #e8f5e9;
  border-radius: 4px;
}

.recent-uploads {
  margin-top: 1.5rem;
}

.recent-uploads h4 {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.uploads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
}

.upload-preview {
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.help-text {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: #666;
}

.help-text p {
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .upload-container {
    flex-direction: column;
  }
  
  .upload-button {
    width: 100%;
  }
}
</style>