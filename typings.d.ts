export interface Handbag {
    id: string;
    name: string;
    condition: 'new' | 'second-hand';
    brand: string;
    material: string;
    images: string[];
    created_at: string;
    stock_status: 'in_stock' | 'out_of_stock';
    buying_price: number;
    selling_price: number;
    dimensions?: string;
    store?: string;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }