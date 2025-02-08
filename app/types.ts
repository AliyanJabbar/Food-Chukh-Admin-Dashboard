export interface Data {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    originalPrice?: number;
    rating: number;
    TotalReviews: number;
    reviews: string[];
    quantity: number;
    availiable: boolean;
    inventory: number;
    tags: string[];
    category: string;
  }