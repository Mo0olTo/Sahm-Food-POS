export type ProductCategory =
  | 'pizza'
  | 'burger'
  | 'drink'
  | 'dessert';


export interface Product {

  id: number;

  name: string;

  category: ProductCategory;

  price: number;

  description?: string;

  image?: string;

}