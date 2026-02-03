import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="border-b border-stone-200 bg-gradient-to-b from-stone-100/50 to-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
            Curated essentials for everyday style
          </h1>
          <p className="mt-4 max-w-xl text-lg text-charcoal/75">
            Thoughtfully designed pieces in natural fabrics. From blazers to knitwear, built to last.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal/90"
          >
            Shop all
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold text-charcoal">
          Featured
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="text-sm font-medium text-terracotta hover:underline"
          >
            View all products →
          </Link>
        </div>
      </section>
    </div>
  );
}
