import { Product, Category } from "@/types/product";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Modern Minimalist Sofa",
    description: "Elegant 3-seater sofa with premium fabric upholstery and solid wood frame. Perfect for modern living rooms.",
    price: 899,
    originalPrice: 1199,
    image: product1,
    category: "Living Room",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    features: ["3-seater", "Premium fabric", "Solid wood frame", "Easy assembly"],
    brand: "ModernHome",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Contemporary Dining Set",
    description: "Stylish dining table with 4 matching chairs. Crafted from sustainable oak with modern metal accents.",
    price: 1299,
    originalPrice: 1599,
    image: product2,
    category: "Dining Room",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    features: ["Seats 4", "Oak wood", "Metal accents", "Sustainable materials"],
    brand: "EcoDesign",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12"
  },
  {
    id: "3",
    name: "Scandinavian Bedroom Set",
    description: "Complete bedroom furniture set including platform bed, 2 nightstands, and dresser. Natural wood finish.",
    price: 1899,
    originalPrice: 2299,
    image: product3,
    category: "Bedroom",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    features: ["Queen size bed", "2 nightstands", "Dresser included", "Natural wood"],
    brand: "Nordic Living",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Professional office chair with lumbar support, adjustable height, and breathable mesh back.",
    price: 449,
    originalPrice: 599,
    image: product4,
    category: "Office",
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    features: ["Lumbar support", "Adjustable height", "Mesh back", "360° swivel"],
    brand: "WorkPro",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08"
  },
  {
    id: "5",
    name: "Glass Coffee Table",
    description: "Modern glass-top coffee table with sleek metal base. Perfect centerpiece for any living room.",
    price: 349,
    image: product1,
    category: "Living Room",
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    features: ["Tempered glass", "Metal base", "Easy to clean", "Modern design"],
    brand: "GlassWorks",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  },
  {
    id: "6",
    name: "Bookshelf Cabinet",
    description: "Multi-tier wooden bookshelf with adjustable shelves. Ideal for books, decor, and storage.",
    price: 299,
    originalPrice: 399,
    image: product2,
    category: "Storage",
    rating: 4.5,
    reviewCount: 91,
    inStock: false,
    features: ["5 shelves", "Adjustable", "Solid wood", "Wall anchor included"],
    brand: "ShelfMaster",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03"
  }
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Living Room",
    description: "Comfortable and stylish furniture for your living space",
    image: product1,
    productCount: 45
  },
  {
    id: "2",
    name: "Bedroom",
    description: "Create your perfect sanctuary with our bedroom collection",
    image: product3,
    productCount: 32
  },
  {
    id: "3",
    name: "Dining Room",
    description: "Gather around beautiful dining furniture",
    image: product2,
    productCount: 28
  },
  {
    id: "4",
    name: "Office",
    description: "Professional furniture for productive workspaces",
    image: product4,
    productCount: 19
  },
  {
    id: "5",
    name: "Storage",
    description: "Organize your space with smart storage solutions",
    image: product1,
    productCount: 23
  }
];