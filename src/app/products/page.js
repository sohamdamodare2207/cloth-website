import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Shop — Thread & Grain",
  description: "Browse all clothing: jackets, tops, pants, skirts, knitwear.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">
          Shop
        </h1>
        <p className="mt-2 text-charcoal/70">
          {products.length} products in {categories.length} categories
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
