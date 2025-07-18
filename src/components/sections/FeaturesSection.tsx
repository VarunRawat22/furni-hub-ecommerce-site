import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $50. Fast and secure shipping nationwide."
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "All products come with our quality assurance and warranty coverage."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer service team is here to help you anytime, anywhere."
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy. Return items hassle-free if you're not satisfied."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-xl bg-gradient-secondary border hover:shadow-card transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-elegant">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};