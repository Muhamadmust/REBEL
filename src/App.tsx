import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WaitlistModal } from './components/WaitlistModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { LookbookPage } from './pages/LookbookPage';
import { ContactPage } from './pages/ContactPage';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, PageRoute, Order } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentPage, setCurrentPage] = useState<PageRoute>({ name: 'home' });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rebel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistProduct, setWaitlistProduct] = useState<Product | null>(null);
  const [orderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Visual mode: Photography vs Palette mode
  const [useColorBlockImages, setUseColorBlockImages] = useState(false);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('rebel_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Unable to persist cart:', e);
    }
  }, [cart]);

  // Fetch products from Express API to keep in sync with backend
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.warn('Using client products fallback:', err);
      });
  }, []);

  // Hash route parsing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '/' || hash === 'home') {
        setCurrentPage({ name: 'home' });
      } else if (hash === 'shop') {
        setCurrentPage({ name: 'shop' });
      } else if (hash.startsWith('shop/category/')) {
        const cat = decodeURIComponent(hash.replace('shop/category/', ''));
        setCurrentPage({ name: 'shop', category: cat });
      } else if (hash.startsWith('shop/') || hash.startsWith('product/')) {
        const slug = hash.replace('shop/', '').replace('product/', '');
        setCurrentPage({ name: 'product', slug });
      } else if (hash === 'cart') {
        setCurrentPage({ name: 'cart' });
      } else if (hash === 'lookbook') {
        setCurrentPage({ name: 'lookbook' });
      } else if (hash === 'about') {
        setCurrentPage({ name: 'about' });
      } else if (hash === 'contact') {
        setCurrentPage({ name: 'contact' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Check if returned from stripe checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'success') {
      const orderId = urlParams.get('orderId') || `ord_${Date.now()}`;
      setConfirmedOrder({
        id: orderId,
        email: 'client@rebelclothing.com',
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.selectedSize,
          colorway: item.selectedColorway
        })),
        total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        status: 'paid',
        createdAt: new Date().toISOString()
      });
      setOrderSuccessModalOpen(true);
      setCart([]);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handler
  const navigateTo = (route: PageRoute) => {
    setCurrentPage(route);
    if (route.name === 'home') {
      window.location.hash = '';
    } else if (route.name === 'shop') {
      window.location.hash = route.category ? `shop/category/${encodeURIComponent(route.category)}` : 'shop';
    } else if (route.name === 'product') {
      window.location.hash = `shop/${route.slug}`;
    } else {
      window.location.hash = route.name;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, colorway: string = 'Black', quantity: number = 1) => {
    const selectedColorway = colorway || product.colorways[0] || 'Black';
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColorway === selectedColorway
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size && i.selectedColorway === selectedColorway
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColorway }];
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, colorway: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.product.id === productId && i.selectedSize === size && i.selectedColorway === colorway) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string, colorway: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedSize === size && i.selectedColorway === colorway))
    );
  };

  // Waitlist / Notify Me
  const handleOpenNotifyMe = (product: Product) => {
    setWaitlistProduct(product);
    setWaitlistModalOpen(true);
  };

  // Newsletter / Waitlist Subscribe API caller
  const handleSubscribe = async (email: string, source: string) => {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    return await res.json();
  };

  // Checkout Handler: calls /api/checkout
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    try {
      const itemsPayload = cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        size: i.selectedSize,
        colorway: i.selectedColorway,
      }));

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsPayload,
          email: 'client@rebelclothing.com',
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.checkoutUrl) {
          // Stripe live checkout redirect
          window.location.href = data.checkoutUrl;
          return;
        }

        // Fallback confirmed order modal
        setConfirmedOrder(data.order || {
          id: data.orderId,
          email: 'client@rebelclothing.com',
          items: itemsPayload,
          total: data.total,
          status: 'paid',
          createdAt: new Date().toISOString()
        });
        setCart([]);
        setCartDrawerOpen(false);
        setOrderSuccessModalOpen(true);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Select a product to view detail
  const handleSelectProduct = (product: Product) => {
    navigateTo({ name: 'product', slug: product.slug });
  };

  const currentProduct =
    currentPage.name === 'product'
      ? products.find((p) => p.slug === currentPage.slug || p.id === currentPage.slug) || products[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#141810] text-[#F2F0E2]">
      {/* Header & Navigation — Zone: Void #141810 */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
        useColorBlockImages={useColorBlockImages}
        onToggleImageMode={() => setUseColorBlockImages(!useColorBlockImages)}
      />

      {/* Main Content Area — Zoned per page */}
      <main className="flex-1">
        {currentPage.name === 'home' && (
          <HomePage
            products={products}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(product) => handleAddToCart(product, product.details?.sizes?.[0] || 'M', product.colorways[0] || 'Black')}
            onNotifyMe={handleOpenNotifyMe}
            onSubscribe={handleSubscribe}
            useColorBlockImages={useColorBlockImages}
          />
        )}

        {currentPage.name === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={currentPage.category}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(product) => handleAddToCart(product, product.details?.sizes?.[0] || 'M', product.colorways[0] || 'Black')}
            onNotifyMe={handleOpenNotifyMe}
            onNavigate={navigateTo}
            useColorBlockImages={useColorBlockImages}
            onToggleImageMode={() => setUseColorBlockImages(!useColorBlockImages)}
          />
        )}

        {currentPage.name === 'product' && currentProduct && (
          <ProductDetailPage
            product={currentProduct}
            allProducts={products}
            onBackToShop={() => navigateTo({ name: 'shop' })}
            onAddToCart={handleAddToCart}
            onNotifyMe={handleOpenNotifyMe}
            onSelectProduct={handleSelectProduct}
            useColorBlockImages={useColorBlockImages}
          />
        )}

        {currentPage.name === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onNavigate={navigateTo}
            isCheckingOut={isCheckingOut}
          />
        )}

        {currentPage.name === 'lookbook' && (
          <LookbookPage onNavigate={navigateTo} />
        )}

        {currentPage.name === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage.name === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onNavigate={navigateTo}
        isCheckingOut={isCheckingOut}
      />

      {/* Pre-launch / Coming Soon Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        product={waitlistProduct}
        onSubscribe={handleSubscribe}
      />

      {/* Order Confirmation Receipt Modal */}
      <OrderSuccessModal
        isOpen={orderSuccessModalOpen}
        onClose={() => setOrderSuccessModalOpen(false)}
        order={confirmedOrder}
      />

      {/* Footer — Zone: Void #141810 */}
      <Footer onNavigate={navigateTo} onSubscribe={handleSubscribe} />
    </div>
  );
}
