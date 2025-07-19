import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartItem } from "@/types/product";

interface AboutProps {
  cart: CartItem[];
}

const About = ({ cart }: AboutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">About Us</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to ShopHub, your premier destination for high-quality furniture and home decor that transforms living spaces into beautiful, functional environments.  
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p>
              Founded in 2020, ShopHub began with a simple mission: to provide affordable, stylish furniture without compromising on quality. What started as a small online store has grown into a beloved brand trusted by thousands of customers nationwide.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
            <p>
              We believe that everyone deserves to live in a space that reflects their personality and meets their needs. Our carefully curated collections are designed to inspire and delight, making home improvement accessible to all.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Quality Commitment</h2>
            <p>
              Every piece in our catalog undergoes rigorous quality testing to ensure durability and satisfaction. We partner with ethical manufacturers who share our commitment to sustainable practices and exceptional craftsmanship.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Customer Experience</h2>
            <p>
              At ShopHub, we prioritize your satisfaction above all else. Our dedicated customer service team is always ready to assist with any questions or concerns, and our hassle-free return policy ensures your peace of mind with every purchase.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;