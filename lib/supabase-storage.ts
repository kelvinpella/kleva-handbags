import { supabase } from './supabase';

const BUCKET_NAME = 'handbag-images';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param path - Optional path within the bucket (e.g., 'new/product1.jpg')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, path?: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = path || `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

/**
 * Upload multiple images
 */
export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file));
  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
}

/**
 * Delete an image from storage
 */
export async function deleteImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

/**
 * Get the path from a full URL
 */
export function getPathFromUrl(url: string): string {
  const parts = url.split(`${BUCKET_NAME}/`);
  return parts[parts.length - 1];
}

/**
 * Get public URL from path
 */
export function getPublicUrl(path: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  
  return publicUrl;
}