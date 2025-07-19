import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ShopHub
              </h3>
            </Link>
            <p className="text-background/80">
              Transform your living space with our curated collection of premium furniture and home decor.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-background/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/categories" className="text-background/80 hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/catalog" className="text-background/80 hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link to="/catalog" className="text-background/80 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/deals" className="text-background/80 hover:text-primary transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-background/80 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="text-background/80 hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/contact" className="text-background/80 hover:text-primary transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="text-background/80 hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="text-background/80 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-background/80">
              Subscribe to get special offers and updates
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button variant="default" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-background/20">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-background/80">support@shophub.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-background/80">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-background/80">123 Design Street, NY 10001</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/20">
          <p className="text-background/60 text-sm">
            © 2024 ShopHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="text-background/60 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-background/60 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            <Link to="/about" className="text-background/60 hover:text-primary text-sm transition-colors">
                Cookie Policy
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};