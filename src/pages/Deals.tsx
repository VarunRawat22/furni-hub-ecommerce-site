import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { CartItem, Product } from "@/types/product";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DealsProps {
  cart: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Deals = ({ cart, setCart }: DealsProps) => {
  // Filter products with discounts (those that have an originalPrice higher than price)
  const discountedProducts = mockProducts.filter(product => product.originalPrice && product.originalPrice > product.price);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    if (setCart) {
      setCart(prevCart => {
        const existing = prevCart.find(item => item.product.id === product.id);
        if (existing) {
          return prevCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { product, quantity: 1 }];
        }
      });
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Deals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our limited-time offers and save big on premium furniture
          </p>
        </div>
        
        {discountedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">No deals available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Deals;