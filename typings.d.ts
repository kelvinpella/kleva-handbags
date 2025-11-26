export interface Handbag {
    id: string;
    name: string;
    description: string;
    price: number;
    condition: 'new' | 'second-hand';
    brand: string;
    color: string;
    material: string;
    images: string[];
    whatsapp_number: string;
    created_at: string;
    stock_status: 'in_stock' | 'out_of_stock';
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }