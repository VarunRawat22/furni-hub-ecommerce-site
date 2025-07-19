import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Deals from "./pages/Deals";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import { useState } from "react";
import { CartItem } from "@/types/product";

const queryClient = new QueryClient();

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/categories" element={<Categories cart={cart} />} />
            <Route path="/categories/:id" element={<CategoryPage cart={cart} setCart={setCart} />} />
            <Route path="/about" element={<About cart={cart} />} />
            <Route path="/deals" element={<Deals cart={cart} setCart={setCart} />} />
            <Route path="/contact" element={<Contact cart={cart} />} />
            <Route path="/catalog" element={<Catalog cart={cart} setCart={setCart} />} />
            <Route path="/profile" element={<Profile cart={cart} />} />
            <Route path="/orders" element={<Orders cart={cart} />} />
            <Route path="/wishlist" element={<Wishlist cart={cart} setCart={setCart} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
