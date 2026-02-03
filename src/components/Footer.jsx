import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal">
              Thread &amp; Grain
            </h3>
            <p className="mt-2 text-sm text-charcoal/70">
              Curated essentials for everyday style.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal/80">
              Shop
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/70">
              <li>
                <Link href="/products" className="hover:text-charcoal">
                  All products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-charcoal">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-charcoal">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal/80">
              Contact
            </h4>
            <p className="mt-3 text-sm text-charcoal/70">
              hello@threadandgrain.com
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-charcoal/50">
          © {new Date().getFullYear()} Thread &amp; Grain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
