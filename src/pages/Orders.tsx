import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartItem, Order } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface OrdersProps {
  cart: CartItem[];
}

const Orders = ({ cart }: OrdersProps) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUsername(userData.username);
        
        // Load orders from localStorage or create mock orders if none exist
        const savedOrders = localStorage.getItem("userOrders");
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        } else {
          // Create mock orders for demonstration
          const mockOrders = generateMockOrders();
          localStorage.setItem("userOrders", JSON.stringify(mockOrders));
          setOrders(mockOrders);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  }, []);
  
  const generateMockOrders = (): Order[] => {
    // Mock data for demonstration purposes
    return [
      {
        id: "order-1",
        userId: "user-1",
        items: [
          {
            product: {
              id: "product-1",
              name: "Modern Sofa",
              description: "A comfortable modern sofa for your living room",
              price: 899.99,
              image: "/assets/products/sofa-1.jpg",
              category: "Living Room",
              rating: 4.5,
              reviewCount: 12,
              inStock: true,
              brand: "ComfortPlus",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            quantity: 1
          },
          {
            product: {
              id: "product-2",
              name: "Coffee Table",
              description: "Elegant coffee table with storage",
              price: 249.99,
              image: "/assets/products/table-1.jpg",
              category: "Living Room",
              rating: 4.2,
              reviewCount: 8,
              inStock: true,
              brand: "WoodCraft",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            quantity: 1
          }
        ],
        total: 1149.98,
        status: "delivered",
        shippingAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "United States"
        },
        paymentMethod: "Credit Card",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
      },
      {
        id: "order-2",
        userId: "user-1",
        items: [
          {
            product: {
              id: "product-3",
              name: "Desk Lamp",
              description: "Adjustable desk lamp with multiple brightness levels",
              price: 59.99,
              image: "/assets/products/lamp-1.jpg",
              category: "Lighting",
              rating: 4.7,
              reviewCount: 15,
              inStock: true,
              brand: "LightMaster",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            quantity: 2
          }
        ],
        total: 119.98,
        status: "shipped",
        shippingAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "United States"
        },
        paymentMethod: "PayPal",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
      },
      {
        id: "order-3",
        userId: "user-1",
        items: [
          {
            product: {
              id: "product-4",
              name: "Bookshelf",
              description: "Modern bookshelf with 5 shelves",
              price: 179.99,
              image: "/assets/products/bookshelf-1.jpg",
              category: "Storage",
              rating: 4.3,
              reviewCount: 9,
              inStock: true,
              brand: "StoragePro",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            quantity: 1
          }
        ],
        total: 179.99,
        status: "pending",
        shippingAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "United States"
        },
        paymentMethod: "Credit Card",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      }
    ];
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  if (!username) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} />
        <main className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">My Orders</h1>
            <p className="text-muted-foreground mb-6">Please sign in to view your orders.</p>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">My Orders</h1>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
              <Button onClick={() => navigate("/")}>Start Shopping</Button>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    formatDate={formatDate} 
                    getStatusColor={getStatusColor} 
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-6">
                {orders
                  .filter(order => order.status === "pending" || order.status === "confirmed")
                  .map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      formatDate={formatDate} 
                      getStatusColor={getStatusColor} 
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="shipped" className="space-y-6">
                {orders
                  .filter(order => order.status === "shipped")
                  .map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      formatDate={formatDate} 
                      getStatusColor={getStatusColor} 
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="delivered" className="space-y-6">
                {orders
                  .filter(order => order.status === "delivered")
                  .map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      formatDate={formatDate} 
                      getStatusColor={getStatusColor} 
                    />
                  ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  formatDate: (date: string) => string;
  getStatusColor: (status: Order['status']) => string;
}

const OrderCard = ({ order, formatDate, getStatusColor }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-lg">Order #{order.id.slice(-5)}</CardTitle>
            <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(order.status)} capitalize`}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Items</p>
            <p>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total</p>
            <p className="font-semibold">${order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Payment</p>
            <p>{order.paymentMethod}</p>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-3">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image || "/placeholder.svg"} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{item.product.name}</h5>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.product.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium mt-6 mb-3">Shipping Address</h4>
            <div className="text-sm">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full text-center" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Orders;