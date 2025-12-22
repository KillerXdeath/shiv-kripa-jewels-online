import { Product } from '@/context/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Gold Necklace',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    category: 'Necklaces',
    material: 'Gold',
    description: 'Exquisite 22K gold necklace with intricate temple design',
  },
  {
    id: '2',
    name: 'Diamond Studded Bangles',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    category: 'Bangles',
    material: 'Diamond',
    description: 'Set of 4 elegant gold bangles with diamond accents',
  },
  {
    id: '3',
    name: 'Pearl Drop Earrings',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    category: 'Earrings',
    material: 'Stones',
    description: 'Classic gold earrings with natural South Sea pearls',
  },
  {
    id: '4',
    name: 'Kundan Bridal Set',
    price: 275000,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop',
    category: 'Bridal',
    material: 'Stones',
    description: 'Complete bridal set with kundan work and precious stones',
  },
  {
    id: '5',
    name: 'Antique Gold Ring',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
    category: 'Rings',
    material: 'Gold',
    description: 'Vintage design ring in 22K gold with ruby center stone',
  },
  {
    id: '6',
    name: 'Temple Gold Pendant',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
    category: 'Pendants',
    material: 'Gold',
    description: 'Traditional temple jewellery pendant with Lakshmi design',
  },
  {
    id: '7',
    name: 'Polki Maang Tikka',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop',
    category: 'Bridal',
    material: 'Diamond',
    description: 'Stunning polki maang tikka for the perfect bridal look',
  },
  {
    id: '8',
    name: 'Gold Chain Bracelet',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop',
    category: 'Bracelets',
    material: 'Gold',
    description: 'Delicate gold chain bracelet with charm details',
  },
];

export const categories = ['All', 'Necklaces', 'Bangles', 'Earrings', 'Rings', 'Pendants', 'Bracelets', 'Bridal'];

export const materials = ['All', 'Gold', 'Diamond', 'Stones'];
