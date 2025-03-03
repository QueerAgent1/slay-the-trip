/*
  # Create storage bucket for travel images

  1. New Storage Bucket
    - `travel-images` - For storing all travel-related images
  
  2. Security
    - Enable RLS on the bucket
    - Add policy for public read access
    - Add policy for authenticated users to upload
*/

-- Create a new storage bucket for travel images
INSERT INTO storage.buckets (id, name, public)
VALUES ('travel-images', 'Travel Images', true);

-- Enable Row Level Security
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public access to view images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'travel-images');

-- Create a policy that allows authenticated users to upload images
CREATE POLICY "Authenticated Users Can Upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'travel-images');

-- Create a policy that allows authenticated users to update their own images
CREATE POLICY "Authenticated Users Can Update Own Images" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'travel-images' AND owner = auth.uid());

-- Create a policy that allows authenticated users to delete their own images
CREATE POLICY "Authenticated Users Can Delete Own Images" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'travel-images' AND owner = auth.uid());