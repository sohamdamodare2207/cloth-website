"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

export default function ProductCard({ product }) {
  const imageSrc = product.image || `https://images.unsplash.com/photo-1558769132-cb1aea304c0e?w=400&h=500&fit=crop`;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-0.5 text-xs font-medium text-charcoal">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-terracotta">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-charcoal/80">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
