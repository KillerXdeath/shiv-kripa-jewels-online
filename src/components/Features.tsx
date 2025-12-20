import React from 'react';
import { Shield, Truck, Award, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'BIS Hallmarked',
    description: 'Every piece is certified with BIS hallmark for purity assurance',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Complimentary insured delivery on orders above ₹50,000',
  },
  {
    icon: Award,
    title: 'Lifetime Exchange',
    description: 'Exchange your old gold at current market rates',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy on all purchases',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-burgundy">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4 group-hover:bg-gold/30 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-secondary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-secondary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
