"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


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
  price?: number;
  condition: string;
  brand: string;
  material: string;
  images: string[];
  whatsapp_number?: string;
  stock_status: string;
  dimensions?: string;
  number_of_colors_available?: number;
  buying_price?: number;
  selling_price?: number;
  items_sold?: number;
}): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const supabase = await createClient();

    // Prepare data for insertion - remove 'price' and 'whatsapp_number' fields
    const { price, whatsapp_number, ...restData } = productData;

    const { data, error: insertError } = await supabase
      .from("handbags")
      .insert([restData])
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
 * Fetch products with optional filtering by condition, pagination, and search
 */
export async function fetchProducts(
  filter?: "all" | "new" | "second-hand",
  page: number = 1,
  itemsPerPage: number = 12,
  searchQuery?: string
): Promise<{ success: boolean; data?: any[]; count?: number; error?: string }> {
  try {
    const supabase = await createClient();
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("handbags")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (filter && filter !== "all") {
      query = query.eq("condition", filter);
    }

    // Add search filtering
    if (searchQuery && searchQuery.trim()) {
      query = query.or(
        `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`
      );
    }

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [], count: count || 0 };
  } catch (error: any) {
    console.error("Fetch products error:", error);
    return { success: false, error: error.message || "Failed to fetch products" };
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(
  id: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("handbags")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Fetch product error:", error);
    return { success: false, error: error.message || "Failed to fetch product" };
  }
}

/**
 * Update a product by ID
 */
export async function updateProduct(
  id: string,
  productData: {
    name: string;
    description: string;
    condition: string;
    brand: string;
    material: string;
    images: string[];
    stock_status: string;
    dimensions?: string;
    number_of_colors_available?: number;
    buying_price?: number;
    selling_price?: number;
    items_sold?: number;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error: updateError } = await supabase
      .from("handbags")
      .update(productData)
      .eq("id", id);

    if (updateError) {
      console.error("Error updating product:", updateError);
      return { success: false, error: updateError.message };
    }

    // Revalidate the products page to show updated list
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error: any) {
    console.error("Update product error:", error);
    return { success: false, error: error.message || "Failed to update product" };
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

    // First, fetch the product to get its images
    const { data: product, error: fetchError } = await supabase
      .from("handbags")
      .select("images")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching product:", fetchError);
      return { success: false, error: fetchError.message };
    }

    // Delete the product from the database
    const { error: deleteError } = await supabase
      .from("handbags")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting product:", deleteError);
      return { success: false, error: deleteError.message };
    }

    // Delete associated images from storage
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      const imagePaths = await Promise.all(
        product.images.map((imageUrl: string) => getPathFromUrl(imageUrl))
      );

      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(imagePaths);

      if (storageError) {
        console.error("Error deleting images from storage:", storageError);
        // Don't fail the whole operation if image deletion fails
        // The product is already deleted from the database
      }
    }

    // Revalidate the products page to show updated list
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { success: false, error: error.message || "Failed to delete product" };
  }
}

/**
 * Fetch dashboard statistics
 */
export async function getDashboardStats() {
  try {
    const supabase = await createClient();

    // Get total products count
    const { count: totalProducts, error: totalError } = await supabase
      .from("handbags")
      .select("*", { count: "exact", head: true });

    if (totalError) {
      console.error("Error fetching total products:", totalError);
      throw totalError;
    }

    // Get new products count
    const { count: newProducts, error: newError } = await supabase
      .from("handbags")
      .select("*", { count: "exact", head: true })
      .eq("condition", "new");

    if (newError) {
      console.error("Error fetching new products:", newError);
      throw newError;
    }

    // Get second-hand products count
    const { count: secondHandProducts, error: secondHandError } = await supabase
      .from("handbags")
      .select("*", { count: "exact", head: true })
      .eq("condition", "second-hand");

    if (secondHandError) {
      console.error("Error fetching second-hand products:", secondHandError);
      throw secondHandError;
    }

    return {
      totalProducts: totalProducts || 0,
      newProducts: newProducts || 0,
      secondHandProducts: secondHandProducts || 0,
    };
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    throw new Error(error.message || "Failed to fetch dashboard stats");
  }
}
