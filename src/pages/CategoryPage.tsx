import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockCategories, mockProducts } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { CartItem, Product } from "@/types/product";
import { useToast } from "@/components/ui/use-toast";

interface CategoryPageProps {
  cart: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CategoryPage = ({ cart, setCart }: CategoryPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [category, setCategory] = useState(mockCategories.find(cat => cat.id === id));
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Find the category
    const foundCategory = mockCategories.find(cat => cat.id === id);
    setCategory(foundCategory);

    // Filter products by category name
    if (foundCategory) {
      const categoryProducts = mockProducts.filter(product => product.category === foundCategory.name);
      setProducts(categoryProducts);
    }
  }, [id]);

  const handleAddToCart = (product: Product) => {
    if (!setCart) return;

    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product already in cart
        toast({
          title: "Quantity increased",
          description: `${product.name} quantity updated in your cart`,
        });
        
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to cart
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <main className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main className="container mx-auto py-12 px-4">
        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-muted-foreground">{category.description}</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={setCart ? handleAddToCart : undefined} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;