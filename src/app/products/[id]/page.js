import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import AddToCartButton from "./AddToCartButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product — Thread & Grain" };
  return {
    title: `${product.name} — Thread & Grain`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-8 text-sm text-charcoal/70">
        <Link href="/products" className="hover:text-charcoal">
          ← Back to shop
        </Link>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <span className="text-sm font-medium uppercase tracking-wider text-charcoal/60">
            {product.category}
          </span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-charcoal">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-medium text-charcoal">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-charcoal/80">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
