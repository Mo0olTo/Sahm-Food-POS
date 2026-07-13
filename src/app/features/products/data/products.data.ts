import { Product } from '../models/product.model';


export const PRODUCTS: Product[] = [

  {
    id: 1,
    name: 'Pepperoni Pizza',
    category: 'pizza',
    price: 220,
    description: 'Classic pepperoni pizza'
  },

  {
    id: 2,
    name: 'Chicken Pizza',
    category: 'pizza',
    price: 200
  },

  {
    id: 3,
    name: 'Chicken Burger',
    category: 'burger',
    price: 120
  },

  {
    id: 4,
    name: 'Cheese Burger',
    category: 'burger',
    price: 150
  },

  {
    id: 5,
    name: 'Cola',
    category: 'drink',
    price: 30
  },

  {
    id: 6,
    name: 'Chocolate Cake',
    category: 'dessert',
    price: 90
  }

];