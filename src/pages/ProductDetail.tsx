import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-foreground mb-4">Product Not Found</h1>
          <Button variant="gold" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // Generate multiple images for gallery effect (using the same image with different params)
  const images = [
    product.image,
    product.image.replace('w=500', 'w=600'),
    product.image.replace('w=500', 'w=700'),
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Helmet>
        <title>{product.name} | Jewellery Store</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-background pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#collections" className="hover:text-gold transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-gold shadow-lg shadow-gold/20'
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              <span className="inline-block bg-burgundy/90 text-secondary-foreground text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-gold">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-muted-foreground">Inclusive of all taxes</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-body leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-4"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-4"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Buy Now */}
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-burgundy hover:bg-burgundy/90 text-secondary-foreground"
              >
                Buy It Now
              </Button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-xs text-muted-foreground">Certified Gold</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-xs text-muted-foreground">Easy Returns</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="text-foreground font-medium">JW-{product.id.padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-foreground font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="container mx-auto px-4 py-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-center bg-transparent border-b border-border rounded-none h-auto p-0 gap-8">
              <TabsTrigger 
                value="description" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-4 py-3 font-display text-lg data-[state=active]:shadow-none"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="price-breakup" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-4 py-3 font-display text-lg data-[state=active]:shadow-none"
              >
                Price Breakup
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-4 py-3 font-display text-lg data-[state=active]:shadow-none"
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger 
                value="return" 
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-4 py-3 font-display text-lg data-[state=active]:shadow-none"
              >
                Return
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-8">
              <div className="max-w-3xl">
                <ul className="space-y-2 text-foreground font-body">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
                    Gold
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
                    22k
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
                    Net Weight 54.806 grams
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
                    Gross Weight 60.6 grams
                  </li>
                </ul>

                <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">Stones Used</h3>
                <ul className="space-y-2 text-foreground font-body">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full"></span>
                    Mix Colour Stone : 28.97ct
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="price-breakup" className="pt-8">
              <div className="max-w-3xl">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Gold Weight (22k)</span>
                    <span className="text-foreground font-medium">54.806 grams</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Gold Rate (per gram)</span>
                    <span className="text-foreground font-medium">{formatPrice(7500)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Gold Value</span>
                    <span className="text-foreground font-medium">{formatPrice(411045)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Stone Charges</span>
                    <span className="text-foreground font-medium">{formatPrice(28970)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Making Charges</span>
                    <span className="text-foreground font-medium">{formatPrice(45000)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">GST (3%)</span>
                    <span className="text-foreground font-medium">{formatPrice(14550)}</span>
                  </div>
                  <div className="flex justify-between py-4 border-t-2 border-gold">
                    <span className="text-foreground font-display font-bold text-lg">Total</span>
                    <span className="text-gold font-display font-bold text-lg">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="pt-8">
              <div className="max-w-3xl space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Shipping Information</h3>
                <ul className="space-y-3 text-foreground font-body">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Free shipping on all orders above ₹50,000
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Delivery within 5-7 business days across India
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Secure and insured shipping with tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    International shipping available (additional charges apply)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Tamper-proof packaging for complete safety
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="return" className="pt-8">
              <div className="max-w-3xl space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Return Policy</h3>
                <ul className="space-y-3 text-foreground font-body">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    7-day easy return policy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Product must be unused and in original packaging
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Full refund will be processed within 7-10 business days
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Exchange available for different sizes or designs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
                    Contact customer support for return pickup
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;
