import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, ShoppingCart, User, LogOut } from "lucide-react";
import { SignInModal } from "@/components/SignInModal";
import { CartItem } from "@/types/product";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cart: import("@/types/product").CartItem[];
}

export const Header = ({ cart }: HeaderProps) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check for saved user data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUsername(userData.username);
        setUserEmail(userData.email || "");
      } catch (error) {
        console.error("Error parsing saved user data:", error);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="text-decoration-none">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ShopHub
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 ml-10">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary">Categories</Link>
            <Link to="/deals" className="text-sm font-medium hover:text-primary">Deals</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">About</Link>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center space-x-2 flex-1 max-w-sm mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/cart")}>
            <ShoppingCart className="h-5 w-5" />
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs"
            >
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          </Button>
          {username ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 ml-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`} alt={username} />
                    <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold hidden md:inline">{username}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"/><path d="M6 9.01V9"/><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/></svg>
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  <span>Wishlist</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  localStorage.removeItem("user");
                  setUsername("");
                  setUserEmail("");
                  toast({
                    title: "Signed out successfully",
                    description: "You have been signed out of your account",
                  });
                }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" className="hidden sm:flex" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
          )}
        </div>
        {showSignIn && (
          <SignInModal 
            onClose={() => setShowSignIn(false)} 
            onSignIn={(name, email) => {
              setUsername(name);
              setUserEmail(email || "");
              // Save user data to localStorage for persistence
              localStorage.setItem("user", JSON.stringify({ username: name, email }));
              toast({
                title: "Welcome back!",
                description: `You've successfully signed in as ${name}`,
              });
            }} 
          />
        )}
      </div>
    </header>
  );
};