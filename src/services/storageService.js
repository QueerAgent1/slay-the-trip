import supabase from './supabaseClient'

/**
 * Upload an image to Supabase storage
 * @param {File} file - The file to upload
 * @param {string} category - The category folder to upload to (e.g., 'hotels', 'experiences')
 * @param {string} fileName - Optional custom file name, defaults to original file name
 * @returns {Promise<{path: string, error: any}>} - The upload result with path or error
 */
export const uploadImage = async (file, category, fileName = null) => {
  try {
    // Create a unique file name if not provided
    const finalFileName = fileName || `${Date.now()}-${file.name}`
    
    // Define the file path within the bucket
    const filePath = `${category}/${finalFileName}`
    
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from('travel-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Error uploading image:', error)
      return { path: null, error }
    }
    
    return { path: data.path, error: null }
  } catch (error) {
    console.error('Error in uploadImage:', error)
    return { path: null, error }
  }
}

/**
 * Get a public URL for an image stored in Supabase
 * @param {string} path - The path of the image in storage
 * @returns {string} - The public URL
 */
export const getPublicUrl = (path) => {
  if (!path) return null
  
  const { data } = supabase.storage
    .from('travel-images')
    .getPublicUrl(path)
  
  return data?.publicUrl
}

/**
 * List all images in a category
 * @param {string} category - The category folder to list (e.g., 'hotels', 'experiences')
 * @returns {Promise<{paths: string[], error: any}>} - The list of image paths or error
 */
export const listImages = async (category) => {
  try {
    const { data, error } = await supabase.storage
      .from('travel-images')
      .list(category)
    
    if (error) {
      console.error('Error listing images:', error)
      return { paths: [], error }
    }
    
    return { 
      paths: data.map(file => `${category}/${file.name}`), 
      error: null 
    }
  } catch (error) {
    console.error('Error in listImages:', error)
    return { paths: [], error }
  }
}

/**
 * Delete an image from storage
 * @param {string} path - The path of the image to delete
 * @returns {Promise<{success: boolean, error: any}>} - The result of the deletion
 */
export const deleteImage = async (path) => {
  try {
    const { error } = await supabase.storage
      .from('travel-images')
      .remove([path])
    
    if (error) {
      console.error('Error deleting image:', error)
      return { success: false, error }
    }
    
    return { success: true, error: null }
  } catch (error) {
    console.error('Error in deleteImage:', error)
    return { success: false, error }
  }
}

export default {
  uploadImage,
  getPublicUrl,
  listImages,
  deleteImage
}