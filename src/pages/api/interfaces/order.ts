
interface BeerItem {
    name: string;
    quantity: number;
    price_per_unit: number;
  }
  
interface Order {
    subtotal: number;
    taxes: number;
    items: BeerItem[];  // Array de cervezas
  }
  