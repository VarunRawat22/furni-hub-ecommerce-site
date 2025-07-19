import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { CartItem, Product } from "@/types/product";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronDown } from "lucide-react";

interface CatalogProps {
  cart: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Catalog = ({ cart, setCart }: CatalogProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));

  // Filter products based on search, category, and price
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Catalog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of premium furniture for every room
          </p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-md"
            />
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="md:ml-auto flex items-center gap-2"
            >
              Filters <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showFilters && (
            <div className="bg-card p-4 rounded-lg shadow-sm mt-2 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center gap-2 cursor-pointer ${selectedCategory === null ? 'text-primary' : ''}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    {selectedCategory === null && <Check className="h-4 w-4" />}
                    <span>All Categories</span>
                  </div>
                  {categories.map(category => (
                    <div 
                      key={category} 
                      className={`flex items-center gap-2 cursor-pointer ${selectedCategory === category ? 'text-primary' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {selectedCategory === category && <Check className="h-4 w-4" />}
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider 
                  defaultValue={[0, 2000]} 
                  max={2000} 
                  step={50} 
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
                setPriceRange([0, 2000]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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

export default Catalog;