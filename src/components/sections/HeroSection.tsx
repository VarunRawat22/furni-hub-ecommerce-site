import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-secondary">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 fill-current" />
                <span>New Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Living Space
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Discover premium furniture and home decor that brings comfort, style, and personality to every room. Quality craftsmanship meets modern design.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/categories">
                <Button variant="hero" size="xl" className="group">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" size="xl">
                  View Catalog
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20"></div>
            <img
              src={heroBanner}
              alt="Beautiful modern living room"
              className="w-full h-auto rounded-3xl shadow-elegant object-cover"
            />
            
            {/* Floating Badge */}
            <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-card">
              <div className="text-sm font-medium">Free Shipping</div>
              <div className="text-2xl font-bold text-primary">$50+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10 -translate-y-32 translate-x-32"></div>
    </section>
  );
};