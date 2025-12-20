import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">
              Shiv Kripa Jeweller
            </h3>
            <p className="font-body text-background/70 mb-6">
              Crafting timeless pieces of elegance since 1985. 
              Your trusted destination for authentic gold jewellery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Collections', 'New Arrivals', 'Bridal', 'Gold Rate', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-background/70 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {['Track Order', 'Shipping Info', 'Returns', 'Size Guide', 'FAQs'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-background/70 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="font-body text-background/70">
                  123 Jewellery Lane, Main Market<br />
                  New Delhi - 110001
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="font-body text-background/70">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="font-body text-background/70">
                  info@shivkripajeweller.com
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="font-body text-background/70">
                  Mon - Sat: 10AM - 8PM<br />
                  Sunday: 11AM - 6PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-background/50">
            © 2024 Shiv Kripa Jeweller. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-background/50 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-background/50 hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
