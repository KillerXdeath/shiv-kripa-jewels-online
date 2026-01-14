import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  address: z.string().trim().min(10, 'Please enter a complete address').max(500, 'Address must be less than 500 characters'),
  city: z.string().trim().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
  pincode: z.string().trim().min(6, 'Pincode must be 6 digits').max(6, 'Pincode must be 6 digits'),
  message: z.string().trim().max(1000, 'Message must be less than 1000 characters').optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      message: '',
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = (data: ContactFormData) => {
    // Create order summary for WhatsApp message
    const orderSummary = items
      .map((item) => `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = `New Order Request:\n\n*Customer Details:*\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nAddress: ${data.address}, ${data.city} - ${data.pincode}\n\n*Order Details:*\n${orderSummary}\n\n*Total: ${formatPrice(totalPrice)}*\n\n${data.message ? `Additional Notes: ${data.message}` : ''}`;

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Order Submitted!',
      description: 'We will contact you shortly to confirm your order.',
    });

    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout | Jewellery Store</title>
        </Helmet>
        <Header />
        <CartDrawer />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-gold/30 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items to proceed with checkout</p>
            <Button variant="gold" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Jewellery Store</title>
        <meta name="description" content="Complete your order with our secure checkout process." />
      </Helmet>

      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Contact Information
              </h1>
              <p className="text-muted-foreground mb-8">
                Fill in your details and we'll get in touch to confirm your order
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 9999999999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your complete address"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pincode" maxLength={6} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special instructions or requests..."
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Submit Order via WhatsApp
                  </Button>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm font-medium text-foreground truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-display text-gold font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-display font-semibold text-foreground">Total</span>
                    <span className="font-display text-xl font-bold text-gold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
