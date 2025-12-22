import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories, materials } from '@/data/products';
import { Button } from './ui/button';

const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const materialMatch = selectedMaterial === 'All' || product.material === selectedMaterial;
    return categoryMatch && materialMatch;
  });

  return (
    <section id="collections" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-elegant text-gold text-lg tracking-widest uppercase">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Exquisite Jewellery
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Each piece is meticulously crafted by our master artisans, 
            blending traditional techniques with contemporary designs.
          </p>
        </div>

        {/* Material Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {materials.map((material) => (
            <Button
              key={material}
              variant={selectedMaterial === material ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setSelectedMaterial(material)}
              className="min-w-[90px]"
            >
              {material}
            </Button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'gold' : 'elegant'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-elegant text-xl text-muted-foreground">
              No products found with the selected filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
