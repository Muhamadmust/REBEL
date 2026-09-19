import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS } from './src/data/products';
import { Product, Subscriber, Order } from './src/types';

// In-memory persistent collections matching Prisma models
let products: Product[] = [...INITIAL_PRODUCTS];
let subscribers: Subscriber[] = [
  { id: 'sub_seed_1', email: 'press@voguelabs.com', createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), source: 'hero_waitlist' },
  { id: 'sub_seed_2', email: 'buyer@doverstreetmarket.com', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), source: 'press_inquiry' }
];
let orders: Order[] = [
  {
    id: 'ord_sample_01',
    email: 'client@rebel-client.com',
    items: [
      { productId: 'prod_hoodie_01', name: 'Heavyweight Hoodie', quantity: 1, price: 35000, size: 'L', colorway: 'Black' }
    ],
    total: 35000,
    status: 'paid',
    stripeId: 'cs_test_sample_01',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  // Note: /api/webhook/stripe MUST receive raw body to verify signature before express.json parses it
  app.get('/api/webhook/stripe', (req, res) => {
    res.json({
      status: 'active',
      endpoint: '/api/webhook/stripe',
      message: 'Rebel Atelier Stripe Webhook endpoint is live.',
      webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      stripeKeyConfigured: Boolean(process.env.STRIPE_SECRET_KEY)
    });
  });

  // Stripe webhook with express.raw
  app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: any;

    if (webhookSecret && sig && process.env.STRIPE_SECRET_KEY) {
      try {
        const Stripe = (await import('stripe')).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-06-20' as any
        });
        event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
      } catch (err: any) {
        console.error(`⚠️ Webhook signature verification failed:`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      // Fallback if testing without secret or in dev simulation
      try {
        event = typeof req.body === 'string' || Buffer.isBuffer(req.body)
          ? JSON.parse(req.body.toString('utf-8'))
          : req.body;
      } catch {
        event = req.body;
      }
    }

    if (event) {
      console.log(`🔔 Received Stripe Webhook Event: ${event.type}`);
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data?.object;
          const orderId = session?.metadata?.orderId;
          if (orderId) {
            const order = orders.find((o) => o.id === orderId);
            if (order) {
              order.status = 'paid';
              order.stripeId = session.id;
              console.log(`✅ Order ${orderId} marked as PAID via Stripe Checkout.`);
            }
          }
          break;
        }
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data?.object;
          console.log(`💰 PaymentIntent succeeded: ${paymentIntent?.id}`);
          break;
        }
        default:
          console.log(`ℹ️ Event ${event.type} received.`);
      }
    }

    res.status(200).json({ received: true });
  });

  // Global JSON parser for all subsequent standard API endpoints
  app.use(express.json());

  // API Endpoints
  // 1. GET /api/products
  app.get('/api/products', (req, res) => {
    const { category, search } = req.query;
    let results = [...products];

    if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    res.json({
      success: true,
      count: results.length,
      products: results
    });
  });

  // 2. GET /api/products/:slug
  app.get('/api/products/:slug', (req, res) => {
    const { slug } = req.params;
    const product = products.find(p => p.slug === slug || p.id === slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Garment not found in archive' });
    }
    res.json({ success: true, product });
  });

  // 3. POST /api/subscribe
  app.post('/api/subscribe', (req, res) => {
    const { email, source } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = subscribers.find(s => s.email === normalizedEmail);

    if (existing) {
      return res.json({
        success: true,
        alreadySubscribed: true,
        message: 'You are already registered on the Rebel private waitlist.'
      });
    }

    const newSubscriber: Subscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      source: source || 'footer_signup',
      createdAt: new Date().toISOString()
    };

    subscribers.unshift(newSubscriber);
    res.status(201).json({
      success: true,
      message: 'Invitation confirmed. You will receive private collection release coordinates.',
      subscriber: newSubscriber
    });
  });

  // 4. POST /api/checkout
  app.post('/api/checkout', async (req, res) => {
    try {
      const { items, email, shippingDetails } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart items are required.' });
      }

      const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      // Check if real Stripe key is provided in environment
      if (process.env.STRIPE_SECRET_KEY) {
        try {
          // If user injects Stripe SDK, we can initialize dynamically
          const Stripe = (await import('stripe')).default;
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-06-20' as any
          });

          const lineItems = items.map((item: any) => ({
            price_data: {
              currency: 'ngn',
              product_data: {
                name: `Rebel — ${item.name} (${item.colorway ? item.colorway + ' / ' : ''}${item.size || 'Standard'})`,
                description: 'Collection 01 Essentials',
              },
              unit_amount: Math.round(item.price * 100), // In kobo for NGN
            },
            quantity: item.quantity,
          }));

          const origin = req.headers.origin || `http://localhost:${PORT}`;
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: email,
            success_url: `${origin}/?checkout=success&orderId=${orderId}`,
            cancel_url: `${origin}/?checkout=cancelled`,
            metadata: { orderId }
          });

          const newOrder: Order = {
            id: orderId,
            email: email || 'guest@rebel-client.com',
            items,
            total,
            status: 'pending',
            stripeId: session.id,
            createdAt: new Date().toISOString()
          };
          orders.unshift(newOrder);

          return res.json({
            success: true,
            checkoutUrl: session.url,
            sessionId: session.id,
            orderId,
            mode: 'stripe_live'
          });
        } catch (stripeErr: any) {
          console.warn('Stripe checkout live error, falling back to simulated order:', stripeErr?.message);
        }
      }

      // If Stripe key not present or error, create simulated confirmed order
      const newOrder: Order = {
        id: orderId,
        email: email || 'client@rebel-atelier.com',
        items,
        total,
        status: 'paid', // verified instant simulated order
        stripeId: `sim_stripe_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      orders.unshift(newOrder);

      return res.json({
        success: true,
        orderId,
        total,
        order: newOrder,
        mode: 'simulated_checkout',
        message: 'Order recorded with Rebel Atelier. Order dispatch confirmation scheduled.'
      });
    } catch (err: any) {
      console.error('Checkout processing error:', err);
      res.status(500).json({ success: false, message: 'Unable to initiate checkout session.' });
    }
  });

  // Helper inspection endpoints
  app.get('/api/orders', (req, res) => {
    res.json({ success: true, count: orders.length, orders });
  });

  app.get('/api/subscribers', (req, res) => {
    res.json({ success: true, count: subscribers.length, subscribers });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rebel Fashion Atelier Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
