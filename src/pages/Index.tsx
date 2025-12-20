import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Shiv Kripa Jeweller | Exquisite Gold Jewellery Collection</title>
        <meta 
          name="description" 
          content="Discover handcrafted gold jewellery at Shiv Kripa Jeweller. Shop our exquisite collection of necklaces, bangles, earrings, rings and bridal sets. BIS Hallmarked, Lifetime Exchange." 
        />
        <meta name="keywords" content="gold jewellery, indian jewellery, bridal jewellery, necklaces, bangles, earrings, rings, hallmarked gold" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ProductGrid />
          <Features />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  );
};

export default Index;
