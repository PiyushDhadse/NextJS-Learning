import ProductList from './ProductList';
import ProductFilters from './ProductFilters';

async function getProducts() {
  return [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999 },
    { id: 2, name: 'T-Shirt', category: 'clothing', price: 29 },
    { id: 3, name: 'JavaScript Book', category: 'books', price: 45 },
    { id: 4, name: 'Headphones', category: 'electronics', price: 199 },
    { id: 5, name: 'Jeans', category: 'clothing', price: 79 },
    { id: 6, name: 'React Guide', category: 'books', price: 55 },
  ];
}

export default async function ProductsPage() {
  const initialProducts = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList initialProducts={initialProducts} />
      <div className="mt-8">
        <ProductFilters />
      </div>
    </div>
  );
}
