"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (!size) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-10 space-y-6">
      {product.sizes?.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-charcoal/80">
            Size
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
                  size === s
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-stone-300 bg-white text-charcoal hover:border-charcoal"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-charcoal/80">Quantity</label>
        <input
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || 1)}
          className="w-20 rounded border border-stone-300 px-3 py-2 text-center"
        />
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={added}
        className="w-full rounded-full bg-terracotta px-6 py-4 text-base font-medium text-white transition-colors hover:bg-terracotta/90 disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
    </div>
  );
}
