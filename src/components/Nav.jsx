"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Nav() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-cream/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-charcoal"
        >
          Thread &amp; Grain
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-charcoal/80">
          <li>
            <Link href="/" className="hover:text-charcoal">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-charcoal">
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 hover:text-charcoal"
            >
              Cart
              {totalItems > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          {user ? (
            <li className="flex items-center gap-3">
              <span className="text-charcoal/70">{user.email}</span>
              <button
                type="button"
                onClick={() => signOut()}
                className="hover:text-charcoal"
              >
                Sign out
              </button>
            </li>
          ) : (
            <li>
              <Link href="/sign-in" className="hover:text-charcoal">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
