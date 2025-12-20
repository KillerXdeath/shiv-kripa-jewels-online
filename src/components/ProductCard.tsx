import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-xl hover:shadow-gold/10">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/90 hover:bg-gold hover:text-primary-foreground backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-burgundy/90 text-secondary-foreground text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Add to cart button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Button
            variant="gold"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <p className="font-display text-xl font-bold text-gold">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
