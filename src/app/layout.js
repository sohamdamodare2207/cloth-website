import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thread & Grain — Clothes Shopping",
  description: "Curated essentials for everyday style. Shop jackets, tops, pants, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen antialiased flex flex-col`}>
        <AuthProvider>
          <CartProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
