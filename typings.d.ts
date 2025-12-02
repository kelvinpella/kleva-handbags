export interface Handbag {
    id: string;
    name: string;
    description: string;
    condition: 'new' | 'second-hand';
    brand: string;
    material: string;
    images: string[];
    created_at: string;
    stock_status: 'in_stock' | 'out_of_stock';
    buying_price: number;
    selling_price: number;
    dimensions?: string;
    number_of_colors_available?: number;
    items_sold?: number;
    store?: string;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }