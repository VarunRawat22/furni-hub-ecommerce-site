import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartItem, Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { mockProducts } from "@/data/mockData";

interface WishlistProps {
  cart: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Wishlist = ({ cart, setCart }: WishlistProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUsername(userData.username);
        
        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem(`wishlist_${userData.username}`);
        if (savedWishlist) {
          const wishlistIds = JSON.parse(savedWishlist) as string[];
          // Find products that match the IDs in the wishlist
          const wishlistProducts = mockProducts.filter(product => 
            wishlistIds.includes(product.id)
          );
          setWishlistItems(wishlistProducts);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  }, []);
  
  const handleRemoveFromWishlist = (productId: string) => {
    // Remove from state
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    
    // Update localStorage
    const wishlistIds = updatedWishlist.map(item => item.id);
    localStorage.setItem(`wishlist_${username}`, JSON.stringify(wishlistIds));
    
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    });
  };
  
  const handleAddToCart = (product: Product) => {
    if (!setCart) return;
    
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already exists in cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new product to cart
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  // Function to add sample items to wishlist (for demo purposes)
  const addSampleItems = () => {
    // Get 3 random products from mockProducts
    const randomProducts = [...mockProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setWishlistItems(randomProducts);
    
    // Save to localStorage
    const wishlistIds = randomProducts.map(item => item.id);
    localStorage.setItem(`wishlist_${username}`, JSON.stringify(wishlistIds));
    
    toast({
      title: "Sample items added",
      description: "Sample items have been added to your wishlist.",
    });
  };

  if (!username) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <main className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
            <p className="text-muted-foreground mb-6">Please sign in to view your wishlist.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
            {wishlistItems.length === 0 && (
              <Button onClick={addSampleItems} variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Add Sample Items
              </Button>
            )}
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Items added to your wishlist will be saved here. Start browsing and add your favorite items!
              </p>
              <Button onClick={() => navigate("/")}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product) => (
                <WishlistItem 
                  key={product.id} 
                  product={product} 
                  onRemove={handleRemoveFromWishlist} 
                  onAddToCart={setCart ? () => handleAddToCart(product) : undefined} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface WishlistItemProps {
  product: Product;
  onRemove: (id: string) => void;
  onAddToCart?: () => void;
}

const WishlistItem = ({ product, onRemove, onAddToCart }: WishlistItemProps) => {
  const navigate = useNavigate();
  
  const calculateDiscount = () => {
    if (!product.originalPrice) return null;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return discount > 0 ? discount : null;
  };
  
  const discount = calculateDiscount();
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <div 
          className="aspect-square bg-muted cursor-pointer" 
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="h-full w-full object-cover transition-all hover:scale-105" 
          />
        </div>
        <Button 
          variant="destructive" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full" 
          onClick={() => onRemove(product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h3 
              className="font-semibold text-lg mb-1 hover:text-primary cursor-pointer" 
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.name}
            </h3>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs ml-1 text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="w-full" 
          variant="outline" 
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Details
        </Button>
        {onAddToCart && (
          <Button 
            className="w-full" 
            onClick={onAddToCart} 
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Wishlist;