
interface BeerItem {
    name: string;
    quantity: number;
    price_per_unit: number;
  }

  interface StockBeer {
    name: string;
    quantity: number;
    price: number;
    image: any;
  }
  
interface Order {
    subtotal: number;
    taxes: number;
    items: BeerItem[];
  }
  