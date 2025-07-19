import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { Product, CartItem } from "@/types/product";

interface IndexProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Index = ({ cart, setCart }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main>
        <HeroSection />
        <CategoryGrid />
        <ProductGrid setCart={setCart} cart={cart} />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
