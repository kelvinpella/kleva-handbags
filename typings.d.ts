export interface Handbag {
    id: string;
    name: string;
    description: string;
    price: number;
    condition: 'new' | 'second-hand';
    brand: string;
    material: string;
    images: string[];
    whatsapp_number: string;
    created_at: string;
    stock_status: 'in_stock' | 'out_of_stock';
    dimensions?: string;
    number_of_colors_available?: number;
    buying_price?: number;
    selling_price?: number;
    items_sold?: number;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }