import { CartItem } from "@/types/product";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface CartProps {
  cart: CartItem[];
}

const Cart = ({ cart }: CartProps) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">${item.product.price * item.quantity}</div>
              </div>
            ))}
            <div className="text-right text-2xl font-bold mt-8">Total: ${total}</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart; 