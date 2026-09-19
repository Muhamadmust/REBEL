import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_vest_01',
    name: 'Core Ribbed Vest',
    slug: 'core-ribbed-vest',
    category: 'Vests',
    colorways: ['Black', 'White'],
    price: 18000,
    description: 'Fitted ribbed vest in heavyweight cotton. The everyday layering piece.',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#141810',
    details: {
      material: '100% Heavyweight Ribbed Cotton (280gsm)',
      fit: 'Fitted contour silhouette with reinforced bound neck and armholes.',
      care: 'Machine wash cold inside out with like colors. Hang dry.',
      sizes: ['S', 'M', 'L', 'XL']
    }
  },
  {
    id: 'prod_tee_01',
    name: 'Rebel Signature Tee',
    slug: 'rebel-signature-tee',
    category: 'T-Shirts',
    colorways: ['Black', 'White'],
    price: 15000,
    description: 'Boxy fit, heavyweight cotton, subtle chest embroidery.',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#1C2217',
    details: {
      material: '100% Combed Heavy Cotton (240gsm)',
      fit: 'Boxy drop-shoulder cut, thick 1-inch collar band.',
      care: 'Cold wash. Do not iron directly on tonal chest embroidery.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  },
  {
    id: 'prod_sweater_01',
    name: 'Oversized Crewneck Sweater',
    slug: 'oversized-crewneck-sweater',
    category: 'Sweaters',
    colorways: ['Black', 'White'],
    price: 32000,
    description: 'Dropped shoulder, brushed-back fleece, ribbed cuffs and hem.',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#141810',
    details: {
      material: '400gsm Heavyweight Brushed-Back Cotton Fleece',
      fit: 'Relaxed oversized fit with generous arm volume and heavy rib trim.',
      care: 'Machine wash delicate at 30°C. Reshape while damp.',
      sizes: ['S', 'M', 'L', 'XL']
    }
  },
  {
    id: 'prod_trouser_01',
    name: 'Straight-Leg Utility Trouser',
    slug: 'straight-leg-utility-trouser',
    category: 'Trousers',
    colorways: ['Black'],
    price: 28000,
    description: 'Structured straight leg, side cargo pocket, adjustable waist tab.',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#3B4A2F',
    details: {
      material: 'Durable Cotton Twill with reinforced knee and seam stitching',
      fit: 'Mid-rise, straight leg through the ankle with tonal cinch tabs.',
      care: 'Machine wash warm. Tumble dry low or air dry.',
      sizes: ['30', '32', '34', '36']
    }
  },
  {
    id: 'prod_sweatpants_01',
    name: 'Fleece Sweatpants',
    slug: 'fleece-sweatpants',
    category: 'Sweatpants',
    colorways: ['Black', 'White'],
    price: 25000,
    description: 'Relaxed taper, elastic waist and cuff, brushed interior.',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#141810',
    details: {
      material: '380gsm Custom Cotton-Poly Fleece with ultra-soft brushed lining',
      fit: 'Relaxed through the thigh with gentle taper into elastic cuffs.',
      care: 'Wash cold inside out. Flat dry recommended.',
      sizes: ['S', 'M', 'L', 'XL']
    }
  },
  {
    id: 'prod_cap_01',
    name: 'Structured Face Cap',
    slug: 'structured-face-cap',
    category: 'Headwear',
    colorways: ['Black', 'White'],
    price: 10000,
    description: 'Six-panel structured cap, embroidered logo, adjustable strap.',
    available: false, // Coming soon pre-launch item
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#1C2217',
    details: {
      material: 'Heavy Brushed Cotton Chino Twill',
      fit: 'Pre-curved brim, structured crown, brass buckle closure strap.',
      care: 'Spot clean with damp cloth.',
      sizes: ['Adjustable (One Size)']
    }
  },
  {
    id: 'prod_hoodie_01',
    name: 'Heavyweight Hoodie',
    slug: 'heavyweight-hoodie',
    category: 'Hoodies',
    colorways: ['Black', 'White'],
    price: 35000,
    description: 'Boxy oversized fit, kangaroo pocket, double-lined hood.',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop'
    ],
    editorialColor: '#141810',
    details: {
      material: '450gsm Super-Heavy Cotton Fleece, No Drawstrings',
      fit: 'Wide, boxy drape, seamless drop shoulder, double-lined hood structure.',
      care: 'Machine wash cold. Hang dry to maintain shape and fleece density.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  }
];
