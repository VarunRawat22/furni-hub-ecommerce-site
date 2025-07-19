import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockCategories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from "@/types/product";

interface CategoriesProps {
  cart: CartItem[];
}

const Categories = ({ cart }: CategoriesProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">All Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCategories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl bg-card border shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Category Info Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">
                      {category.productCount} products
                    </span>
                    <Link to={`/categories/${category.id}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                      >
                        Browse
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;