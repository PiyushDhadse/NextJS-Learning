export default function ProductList({ initialProducts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialProducts.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
