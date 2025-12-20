import React from 'react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-woman-jewellery.jpg';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-burgundy/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-in backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="font-elegant text-sm text-foreground/80 tracking-wide">
              Timeless Elegance Since 1985
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Adorn Yourself in</span>
            <br />
            <span className="text-gradient-gold">Divine Beauty</span>
          </h1>

          {/* Subtitle */}
          <p className="font-elegant text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover our exquisite collection of handcrafted gold jewellery, 
            where tradition meets contemporary elegance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="gold" size="xl">
              Explore Collection
            </Button>
            <Button variant="goldOutline" size="xl">
              Book Appointment
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center backdrop-blur-sm bg-background/30 rounded-lg p-3">
              <p className="font-display text-3xl font-bold text-gold">38+</p>
              <p className="font-body text-sm text-foreground/80">Years Legacy</p>
            </div>
            <div className="w-px h-12 bg-gold/30" />
            <div className="text-center backdrop-blur-sm bg-background/30 rounded-lg p-3">
              <p className="font-display text-3xl font-bold text-gold">10K+</p>
              <p className="font-body text-sm text-foreground/80">Happy Customers</p>
            </div>
            <div className="w-px h-12 bg-gold/30" />
            <div className="text-center backdrop-blur-sm bg-background/30 rounded-lg p-3">
              <p className="font-display text-3xl font-bold text-gold">100%</p>
              <p className="font-body text-sm text-foreground/80">Certified Gold</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
