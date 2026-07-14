import { Product } from '../../products/models/product.model';

export function filterProducts( products: Product[], query: string, category: string | null,): Product[] {

  const normalizedQuery = query.trim().toLowerCase();

  return products.filter(product => {

    const matchesCategory =
      !category || product.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      product.name,
      product.description ?? '',
      product.category,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);

  });

}