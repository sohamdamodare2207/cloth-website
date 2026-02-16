// All prices are in INR (₹)
export const products = [
  {
    id: "1",
    name: "Oversized Linen Blazer",
    price: 15799,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    description: "Relaxed-fit blazer in breathable linen. Single-breasted, notch lapels, and patch pockets. Perfect for smart-casual.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oat", "Black", "Dusty Olive"],
  },
  {
    id: "2",
    name: "Ribbed Cotton Turtleneck",
    price: 5699,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    description: "Soft ribbed turtleneck in 100% cotton. Fitted through the body with a comfortable stretch.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Charcoal", "Burgundy", "Navy"],
  },
  {
    id: "3",
    name: "High-Waist Wide-Leg Trousers",
    price: 10499,
    category: "Pants",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    description: "Tailored wide-leg trousers with a high waist and clean front. Mid-weight wool blend.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "Camel", "Grey"],
  },
  {
    id: "4",
    name: "Minimalist Cotton Tee",
    price: 3499,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    description: "Essential crew neck tee in heavyweight organic cotton. Slightly oversized fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Sage", "Terracotta"],
  },
  {
    id: "5",
    name: "Wool Blend Overcoat",
    price: 24999,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
    description: "Classic single-breasted overcoat in a wool blend. Lined, notch lapels, and side pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Black", "Navy"],
  },
  {
    id: "6",
    name: "Pleated Midi Skirt",
    price: 7499,
    category: "Skirts",
    image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400&h=500&fit=crop",
    description: "Flow pleated midi skirt in a light fabric. Elasticated waist for comfort.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Beige", "Forest Green"],
  },
  {
    id: "7",
    name: "Merino Wool Sweater",
    price: 12299,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    description: "Fine-gauge merino sweater with a crew neck. Lightweight and soft for layering.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Grey", "Bottle Green", "Rust"],
  },
  {
    id: "8",
    name: "Straight-Leg Denim Jeans",
    price: 8199,
    category: "Pants",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    description: "Classic straight-leg jeans in mid-wash denim. Five-pocket style, medium rise.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Mid Blue", "Dark Indigo", "Black"],
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getProductsByCategory(category) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export const categories = [...new Set(products.map((p) => p.category))];
