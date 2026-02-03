"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Your cart is empty
        </h1>
        <p className="mt-2 text-charcoal/70">
          Add something from the shop to get started.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-white hover:bg-charcoal/90"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold text-charcoal">
        Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>
      <div className="mt-10 space-y-6 border-t border-stone-200 pt-10">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center"
          >
            <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-stone-100 sm:h-28 sm:w-28">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized={item.image.startsWith("http")}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-charcoal/40">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-serif font-semibold text-charcoal">
                {item.name}
              </h2>
              <p className="text-sm text-charcoal/70">Size: {item.size}</p>
              <p className="mt-1 font-medium text-charcoal">
                {formatPrice(item.price)} × {item.quantity} = {formatPrice(item.price * item.quantity)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded border border-stone-300">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity - 1)
                  }
                  className="px-3 py-1.5 text-charcoal/80 hover:bg-stone-100"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity + 1)
                  }
                  className="px-3 py-1.5 text-charcoal/80 hover:bg-stone-100"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-sm text-charcoal/60 hover:text-terracotta"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-end gap-4 sm:flex-row sm:justify-between">
        <Link
          href="/products"
          className="text-sm font-medium text-terracotta hover:underline"
        >
          Continue shopping
        </Link>
        <p className="text-lg font-semibold text-charcoal">
          Total: {formatPrice(totalPrice)}
        </p>
      </div>
    </div>
  );
}
