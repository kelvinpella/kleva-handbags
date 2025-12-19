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
 * Upload an image to Supabase Storage organized by condition and product ID
 * @param file - The file to upload
 * @param condition - The product condition (e.g., 'new', 'second-hand')
 * @param productId - The product UUID
 * @param path - Optional filename within the product folder
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  condition: string,
  productId: string,
  path?: string
): Promise<string | null> {
  try {
    const supabase = await createClient();
    const fileExt = file.name.split(".").pop();
    const fileName =
      path ||
      `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    // Organize by condition/productId/filename
    const filePath = `${condition}/${productId}/${fileName}`;

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
  condition: string,
  productId: string
): Promise<string[]> {
  const uploadPromises = files.map((file) =>
    uploadImage(file, condition, productId)
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
 * Delete all images for a product from storage
 * @param condition - The product condition (e.g., 'new', 'second-hand')
 * @param productId - The product UUID
 */
export async function deleteProductImages(
  condition: string,
  productId: string
): Promise<boolean> {
  try {
    const supabase = await createClient();

    // List all files in the product's folder
    const folderPath = `${condition}/${productId}`;
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath);

    if (listError) {
      console.error("Error listing product images:", listError);
      return false;
    }

    if (!files || files.length === 0) {
      // No images to delete
      return true;
    }

    // Delete all files in the folder
    const filePaths = files.map((file) => `${folderPath}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filePaths);

    if (deleteError) {
      console.error("Error deleting product images:", deleteError);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete product images error:", error);
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
  id?: string;
  name: string;
  price?: number;
  condition: string;
  brand: string;
  material: string;
  images: string[];
  whatsapp_number?: string;
  stock_status: string;
  dimensions?: string;
  buying_price?: number;
  selling_price?: number;
  store?: string;
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
    condition: string;
    brand: string;
    material: string;
    images: string[];
    stock_status: string;
    dimensions?: string;
    buying_price?: number;
    selling_price?: number;
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

    // First, fetch the product to get its condition
    const { data: product, error: fetchError } = await supabase
      .from("handbags")
      .select("condition")
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

    // Delete associated images from storage using the product ID and condition
    if (product?.condition) {
      const deletedImages = await deleteProductImages(product.condition, id);
      if (!deletedImages) {
        console.warn(`Warning: Failed to delete images for product ${id}`);
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

/**
 * Record a sale transaction
 */
export async function recordSale(saleData: {
  product_id?: string;
  product_name: string;
  product_condition: "new" | "second-hand";
  quantity: number;
  buying_price: number;
  selling_price: number;
  sale_date?: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const supabase = await createClient();

    const { data, error: insertError } = await supabase
      .from("sales")
      .insert([saleData])
      .select();

    if (insertError) {
      console.error("Error recording sale:", insertError);
      return { success: false, error: insertError.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: "Failed to record sale" };
    }

    // Revalidate the admin dashboard to show updated profit stats
    revalidatePath("/admin");

    return { success: true, id: data[0].id };
  } catch (error: any) {
    console.error("Record sale error:", error);
    return { success: false, error: error.message || "Failed to record sale" };
  }
}

/**
 * Fetch all sales with optional filtering
 */
export async function fetchSales(
  filter?: "all" | "new" | "second-hand",
  page: number = 1,
  itemsPerPage: number = 20
): Promise<{ success: boolean; data?: any[]; count?: number; error?: string }> {
  try {
    const supabase = await createClient();
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("sales")
      .select("*", { count: "exact" })
      .order("sale_date", { ascending: false });

    if (filter && filter !== "all") {
      query = query.eq("product_condition", filter);
    }

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching sales:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [], count: count || 0 };
  } catch (error: any) {
    console.error("Fetch sales error:", error);
    return { success: false, error: error.message || "Failed to fetch sales" };
  }
}

/**
 * Delete a sale record
 */
export async function deleteSale(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error: deleteError } = await supabase
      .from("sales")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting sale:", deleteError);
      return { success: false, error: deleteError.message };
    }

    // Revalidate the admin dashboard to show updated profit stats
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Delete sale error:", error);
    return { success: false, error: error.message || "Failed to delete sale" };
  }
}

/**
 * Increment sale - Record a sale and update items_sold
 */
export async function incrementSale(data: {
  productId: string;
  productName: string;
  productCondition: "new" | "second-hand";
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Validate quantity
    if (data.quantity <= 0) {
      return { success: false, error: "Quantity must be greater than 0" };
    }

    // 1. Get current product data
    const { data: product, error: fetchError } = await supabase
      .from("handbags")
      .select("items_sold")
      .eq("id", data.productId)
      .single();

    if (fetchError) {
      console.error("Error fetching product:", fetchError);
      return { success: false, error: "Failed to fetch product" };
    }

    const currentItemsSold = product?.items_sold || 0;

    // 2. Record the sale in the sales table
    const saleResult = await recordSale({
      product_id: data.productId,
      product_name: data.productName,
      product_condition: data.productCondition,
      quantity: data.quantity,
      buying_price: data.buyingPrice,
      selling_price: data.sellingPrice,
      notes: `Sale recorded via products page (${data.quantity} item${data.quantity > 1 ? 's' : ''})`,
    });

    if (!saleResult.success) {
      return { success: false, error: saleResult.error };
    }

    // 3. Update items_sold
    const { error: updateError } = await supabase
      .from("handbags")
      .update({
        items_sold: currentItemsSold + data.quantity
      })
      .eq("id", data.productId);

    if (updateError) {
      console.error("Error updating product:", updateError);
      return { success: false, error: "Failed to update product" };
    }

    // Revalidate the products page and dashboard
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Increment sale error:", error);
    return { success: false, error: error.message || "Failed to record sale" };
  }
}

/**
 * Decrement sale - Record returns and update items_sold
 */
export async function decrementSale(data: {
  productId: string;
  productName: string;
  productCondition: "new" | "second-hand";
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Validate quantity
    if (data.quantity <= 0) {
      return { success: false, error: "Quantity must be greater than 0" };
    }

    // 1. Get current product data
    const { data: product, error: fetchError } = await supabase
      .from("handbags")
      .select("items_sold")
      .eq("id", data.productId)
      .single();

    if (fetchError) {
      console.error("Error fetching product:", fetchError);
      return { success: false, error: "Failed to fetch product" };
    }

    const currentItemsSold = product?.items_sold || 0;

    if (currentItemsSold < data.quantity) {
      return { success: false, error: `Cannot return ${data.quantity} items. Only ${currentItemsSold} items sold.` };
    }

    // 2. Record the return as a negative sale in the sales table
    const returnResult = await recordSale({
      product_id: data.productId,
      product_name: data.productName,
      product_condition: data.productCondition,
      quantity: -data.quantity, // Negative quantity represents a return
      buying_price: data.buyingPrice,
      selling_price: data.sellingPrice,
      notes: `Return recorded via products page (${data.quantity} item${data.quantity > 1 ? 's' : ''} returned)`,
    });

    if (!returnResult.success) {
      return { success: false, error: returnResult.error };
    }

    // 3. Decrement items_sold
    const { error: updateError } = await supabase
      .from("handbags")
      .update({
        items_sold: Math.max(0, currentItemsSold - data.quantity)
      })
      .eq("id", data.productId);

    if (updateError) {
      console.error("Error updating product:", updateError);
      return { success: false, error: "Failed to update product" };
    }

    // Revalidate the products page and dashboard
    revalidatePath("/admin/products");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Decrement sale error:", error);
    return { success: false, error: error.message || "Failed to record return" };
  }
}
