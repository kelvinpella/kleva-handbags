"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function loginAction(email: string, password: string) {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return {
      success: false,
      error: authError.message || "Failed to sign in. Please try again.",
    };
  }

  if (!data.user) {
    return {
      success: false,
      error: "Login failed. Please try again.",
    };
  }

  // Redirect to admin dashboard on successful login
  redirect("/admin");
}

export async function signoutAction() {
  // This will clear the session cookies server-side when using
  // the `createServerClient` helper from `@supabase/ssr`.
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Redirect user to the login page after signing out
  redirect("/login");
}

const BUCKET_NAME = "handbag-images";

/**
 * Upload an image to Supabase Storage organized by condition
 * @param file - The file to upload
 * @param condition - The product condition (e.g., 'new', 'like-new', 'good', 'fair')
 * @param path - Optional filename within the condition folder
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  condition: string,
  path?: string
): Promise<string | null> {
  try {
    const supabase = await createClient();
    const fileExt = file.name.split(".").pop();
    const fileName =
      path ||
      `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    // Organize by condition folder
    const filePath = `${condition}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

export async function uploadMultipleImages(
  files: File[],
  condition: string
): Promise<string[]> {
  const uploadPromises = files.map((file) =>
    uploadImage(file, condition)
  );
  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
}

/**
 * Delete an image from storage
 */
export async function deleteImage(path: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}
/**
 * Get the path from a full URL
 */
export async function getPathFromUrl(url: string): Promise<string> {
  const parts = url.split(`${BUCKET_NAME}/`);
  return parts[parts.length - 1];
}

/**
 * Get public URL from path
 */
export async function getPublicUrl(path: string): Promise<string> {
  const url = new URL(
    `https://${
      process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1]
    }/storage/v1/object/public/${BUCKET_NAME}/${path}`
  );
  return url.toString();
}

/**
 * Create a new product in the database
 */
export async function createProduct(productData: {
  name: string;
  description: string;
  price: number;
  condition: string;
  brand: string;
  color: string;
  material: string;
  images: string[];
  whatsapp_number: string;
  stock_status: string;
}): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const supabase = await createClient();
    const { data, error: insertError } = await supabase
      .from("handbags")
      .insert([productData])
      .select();

    if (insertError) {
      console.error("Error inserting product:", insertError);
      return { success: false, error: insertError.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: "Failed to create product" };
    }

    return { success: true, id: data[0].id };
  } catch (error: any) {
    console.error("Create product error:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

/**
 * Fetch products with optional filtering by condition
 */
export async function fetchProducts(
  filter?: "all" | "new" | "second-hand"
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("handbags")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter && filter !== "all") {
      query = query.eq("condition", filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error: any) {
    console.error("Fetch products error:", error);
    return { success: false, error: error.message || "Failed to fetch products" };
  }
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("handbags").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { success: false, error: error.message || "Failed to delete product" };
  }
}
