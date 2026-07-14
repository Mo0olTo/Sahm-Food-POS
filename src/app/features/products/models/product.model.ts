export type ProductCategory =  'pizza'| 'burger'| 'drink'| 'sandwich'| 'salad'| 'side'| 'pasta'| 'dessert' |'main' | 'coffee';

export interface Product {

  id: number;

  name: string;

  category: ProductCategory;

  price: number;

  description?: string;

  image?: string;

}