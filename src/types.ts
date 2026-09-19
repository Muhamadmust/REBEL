export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Vests' | 'T-Shirts' | 'Sweaters' | 'Trousers' | 'Sweatpants' | 'Headwear' | 'Hoodies' | string;
  colorways: string[]; // e.g. ['Black', 'White']
  price: number; // in Naira, e.g. 18000
  description: string;
  available: boolean; // false = "Coming Soon"
  images: string[];
  details?: {
    material: string;
    fit: string;
    care: string;
    sizes: string[];
    origin?: string;
  };
  editorialColor?: string;
  createdAt?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  source?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColorway: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  colorway?: string;
}

export interface Order {
  id: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'fulfilled';
  stripeId?: string;
  createdAt: string;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'shop'; category?: string }
  | { name: 'product'; slug: string }
  | { name: 'lookbook' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'cart' };
