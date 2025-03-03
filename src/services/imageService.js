import supabase from './supabaseClient'
import { getPublicUrl, listImages } from './storageService'

// Fallback images from external sources (high-quality free stock photos)
const fallbackImages = {
  hero: [
    'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=1600&h=900',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&h=900',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&h=900',
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&h=900',
    'https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?q=80&w=1600&h=900'
  ],
  hotels: [
    // Axel Hotel Barcelona - urban, rooftop pool
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=400&h=250',
    // Hotel Gaythering - Miami Beach, bar - using actual hotel image
    'https://i.imgur.com/Yd9EJNP.jpg',
    // W Maldives - overwater villas
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=400&h=250',
    // The London EDITION - elegant, historic
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&h=250',
    // Ritz Paris - classic luxury
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=400&h=250',
    // The Siam - art deco, riverside
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&h=250'
  ],
  experiences: [
    'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&h=250'
  ],
  destinations: [
    // Game of Thrones - Croatia
    'https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=400&h=250',
    // Lord of the Rings - New Zealand
    'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=400&h=250',
    // Bridgerton - England
    'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=400&h=250',
    // Harry Potter - UK
    'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=400&h=250',
    // White Lotus - Sicily
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=400&h=250',
    // Game of Thrones - Northern Ireland
    'https://images.unsplash.com/photo-1534655378251-8f7e73d363d6?q=80&w=400&h=250',
    // Lord of the Rings - New Zealand vineyards
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&h=250',
    // Bridgerton - Bath
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=400&h=250'
  ],
  people: [
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=50&h=50',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=50&h=50',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=50&h=50',
    'https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=50&h=50',
    'https://images.unsplash.com/photo-1492552085122-36706c238a25?q=80&w=50&h=50'
  ],
  products: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=400&h=250'
  ],
  featured: [
    'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=600&h=600',
    'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=600&h=600',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&h=600'
  ],
  partners: [
    'https://placehold.co/150x80/f5f5f5/666666?text=Luxury+Partner',
    'https://placehold.co/150x80/f5f5f5/666666?text=Premium+Hotels',
    'https://placehold.co/150x80/f5f5f5/666666?text=Elite+Travel',
    'https://placehold.co/150x80/f5f5f5/666666?text=Global+Luxury',
    'https://placehold.co/150x80/f5f5f5/666666?text=Pride+Travel'
  ],
  badges: [
    'https://placehold.co/80x80/f5f5f5/666666?text=Safety',
    'https://placehold.co/80x80/f5f5f5/666666?text=LGBTQ%2B',
    'https://placehold.co/80x80/f5f5f5/666666?text=Luxury'
  ],
  magazine: [
    'https://images.unsplash.com/photo-1519791883288-dc8bd6d686c5?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1506836467174-27f1042aa48c?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=400&h=250'
  ],
  podcast: [
    'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1581368087049-7034ed0d1e6f?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&h=250',
    'https://images.unsplash.com/photo-1599666433232-2b222eb02b8c?q=80&w=400&h=250'
  ]
}

// Cache for Supabase images to avoid repeated fetching
const imageCache = {
  // Structure: { category: { paths: [], lastFetched: timestamp } }
}

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000

/**
 * Get an image URL, first trying Supabase storage then falling back to external sources
 * @param {string} category - The image category (hero, hotels, experiences, etc.)
 * @param {number} index - Optional index to get a specific image, otherwise random
 * @param {string} size - Optional size specification (e.g., '400/250')
 * @returns {string} - The image URL
 */
export const getImage = async (category, index = null, size = null) => {
  try {
    // First try to get images from Supabase storage
    const supabaseImages = await getSupabaseImages(category)
    
    if (supabaseImages && supabaseImages.length > 0) {
      // Use Supabase images if available
      const imageIndex = index !== null ? index % supabaseImages.length : Math.floor(Math.random() * supabaseImages.length)
      return supabaseImages[imageIndex]
    }
    
    // Fall back to external images if no Supabase images
    if (!fallbackImages[category]) {
      console.warn(`Image category "${category}" not found, using default`)
      category = 'hero'
    }

    const fallbackList = fallbackImages[category]
    const fallbackIndex = index !== null ? index % fallbackList.length : Math.floor(Math.random() * fallbackList.length)
    return fallbackList[fallbackIndex]
  } catch (error) {
    console.error('Error fetching image:', error)
    // Return a placeholder in case of error
    return size 
      ? `https://placehold.co/${size}/e0e0e0/666666?text=QueerLuxe+Travel` 
      : 'https://placehold.co/400x250/e0e0e0/666666?text=QueerLuxe+Travel'
  }
}

/**
 * Get images from Supabase storage for a specific category
 * @param {string} category - The category to fetch images for
 * @returns {Promise<string[]>} - Array of image URLs
 */
const getSupabaseImages = async (category) => {
  try {
    // Check if we have a valid cache for this category
    const now = Date.now()
    const cache = imageCache[category]
    
    if (cache && cache.paths.length > 0 && (now - cache.lastFetched) < CACHE_EXPIRATION) {
      return cache.paths
    }
    
    // Fetch images from Supabase
    const { paths, error } = await listImages(category)
    
    if (error || !paths || paths.length === 0) {
      return null
    }
    
    // Convert paths to public URLs
    const urls = paths.map(path => getPublicUrl(path))
    
    // Update cache
    imageCache[category] = {
      paths: urls,
      lastFetched: now
    }
    
    return urls
  } catch (error) {
    console.error('Error getting Supabase images:', error)
    return null
  }
}

/**
 * Upload an image to Supabase storage
 * @param {File} file - The file to upload
 * @param {string} category - The category to upload to
 * @param {string} fileName - Optional custom file name
 * @returns {Promise<{path: string, error: any}>} - The upload result
 */
export const uploadImage = async (file, category, fileName = null) => {
  try {
    // Import dynamically to avoid circular dependencies
    const { uploadImage: upload } = await import('./storageService')
    const result = await upload(file, category, fileName)
    
    // Clear cache for this category if upload was successful
    if (result.path && !result.error) {
      delete imageCache[category]
    }
    
    return result
  } catch (error) {
    console.error('Error in uploadImage:', error)
    return { path: null, error }
  }
}

export default {
  getImage,
  uploadImage,
  getPublicUrl,
  fallbackImages
}