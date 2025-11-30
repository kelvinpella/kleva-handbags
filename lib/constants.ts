/**
 * App-wide constants
 */

// Pagination
export const ITEMS_PER_PAGE = 12;

// Product conditions
export const PRODUCT_CONDITIONS = {
  NEW: 'new',
  SECOND_HAND: 'second-hand',
} as const;

export const CONDITION_LABELS = {
  new: 'New',
  'second-hand': 'Second-Hand',
} as const;

export const CONDITION_SWAHILI = {
  new: 'Pochi Mpya',
  'second-hand': 'Pochi Za Mtumba',
} as const;

// Stock status
export const STOCK_STATUS = {
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
} as const;

export const STOCK_STATUS_LABELS = {
  in_stock: 'In Stock',
  out_of_stock: 'Out of Stock',
} as const;

// Image constraints
export const IMAGE_UPLOAD_CONFIG = {
  MAX_IMAGES: 5,
  MAX_FILE_SIZE_MB: 5,
  ACCEPTED_TYPES: ['image/png', 'image/jpeg', 'image/gif'],
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  {
    name: 'New',
    href: '/new',
    swahili: 'Mpya',
  },
  {
    name: 'Second-Hand',
    href: '/second-hand',
    swahili: 'Mtumba',
  },
] as const;

// Admin navigation
export const ADMIN_NAVIGATION = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
  {
    name: 'Add Product',
    href: '/admin/products/add',
    icon: 'M12 4v16m8-8H4',
  },
] as const;

// Default WhatsApp prefix
export const DEFAULT_WHATSAPP_PREFIX = '+255';
