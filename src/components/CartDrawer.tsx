import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-background border-l border-gold/20">
        <SheetHeader className="border-b border-gold/20 pb-4">
          <SheetTitle className="font-display text-2xl text-foreground flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-gold" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <ShoppingBag className="h-16 w-16 text-gold/30 mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="font-body text-muted-foreground mb-6">
                Add some beautiful jewellery to your cart
              </p>
              <Button variant="gold" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:border-gold/30 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-semibold text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground mb-2">
                        {item.category}
                      </p>
                      <p className="font-display text-gold font-bold">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2 bg-muted rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-body text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gold/20 pt-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="font-body text-muted-foreground">Subtotal</span>
                  <span className="font-display text-lg text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pb-4 border-b border-gold/20">
                  <span className="font-display text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="font-display text-2xl font-bold text-gold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button variant="gold" className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      variant="elegant"
                      className="flex-1"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={clearCart}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
