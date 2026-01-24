import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './App.css';

const MySwal = withReactContent(Swal);

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isCheckout, setIsCheckout] = useState(false);

  // --- DATA ---
  // src/data/data.js

const products = [
  {
    id: 1,
    name: "Matte Lipstick - Ruby Red",
    category: "lips",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    image:
      "https://i.pinimg.com/736x/8f/e8/5b/8fe85b522ebafc68d6ecbc775c57a252.jpg",
    description: "Long-lasting matte lipstick with rich pigmentation",
  },
  {
    id: 2,
    name: "Glow Foundation",
    category: "face",
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.6,
    image:
      "https://i.pinimg.com/736x/90/88/24/9088244daba432aa69567d5d5c66f202.jpg",
    description: "Lightweight foundation with natural finish",
  },
  {
    id: 3,
    name: "Eyeshadow Palette - Sunset",
    category: "eyes",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.9,
    image:
      "https://i.pinimg.com/1200x/14/dd/5d/14dd5d9350fa4e1d8c10c199978a1527.jpg",
    description: "18 vibrant shades for day and night looks",
  },
  {
    id: 4,
    name: "Waterproof Mascara",
    category: "eyes",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.5,
    image:
      "https://i.pinimg.com/1200x/57/69/cb/5769cb52b96f673a6647c577a4cc9f5d.jpg",
    description: "Lengthening and volumizing mascara",
  },
  {
    id: 5,
    name: "Blush Duo - Peach",
    category: "face",
    price: 27.99,
    originalPrice: 32.99,
    rating: 4.7,
    image:
      "https://i.pinimg.com/736x/19/e1/3b/19e13beec5db5a3c721a6a80efa903e5.jpg",
    description: "Dual-toned blush for natural flush",
  },
  {
    id: 6,
    name: "Makeup Brush Set",
    category: "tools",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.8,
    image:
      "https://i.pinimg.com/1200x/95/8c/67/958c673a376d954388e4451eb0740d8a.jpg",
    description: "Professional 12-piece brush set",
  },
  {
    id: 7,
    name: "Lip Gloss - Clear Shine",
    category: "lips",
    price: 16.99,
    originalPrice: 19.99,
    rating: 4.4,
    image:
      "https://i.pinimg.com/1200x/69/4b/d6/694bd63bc1a5ac97e29c2980841cc84f.jpg",
    description: "Non-sticky glossy finish",
  },
  {
    id: 8,
    name: "Setting Powder",
    category: "face",
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.6,
    image:
      "https://i.pinimg.com/736x/35/34/5f/35345fca3ed3c2cc15df0c5314b62c2d.jpg",
    description: "Translucent powder for all-day wear",
  },
 
  {
    id: 9,
    name: "Liquid Lipstick - Coral",
    category: "lips",
    price: 22.99,
    originalPrice: 28.99,
    rating: 4.7,
    image: "https://i.pinimg.com/736x/f3/49/98/f349980a553bbf55a4a56c5b530a7012.jpg",
    description: "Long-lasting liquid lipstick with smooth finish",
  },
  {
    id: 10,
    name: "Lip Tint - Rose",
    category: "lips",
    price: 18.99,
    originalPrice: 23.99,
    rating: 4.5,
    image: "https://i.pinimg.com/736x/90/dc/0c/90dc0c5a3ee1c561fd00c5bd49461881.jpg",
    description: "Natural tint for soft and long-lasting color",
  },
  {
    id: 11,
    name: "Eyeliner Pencil - Black",
    category: "eyes",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.6,
    image: "https://i.pinimg.com/736x/77/82/18/778218a92843ab9ee0761eda6134a96e.jpg",
    description: "Smooth and precise black eyeliner for all-day wear",
  },
  // {
  //   id: 12,
  //   name: "Waterproof Mascara",
  //   category: "eyes",
  //   price: 19.99,
  //   originalPrice: 24.99,
  //   rating: 4.8,
  //   image: "https://i.pinimg.com/736x/d4/df/a6/d4dfa60234e54a60d21e16a38a5dc90e.jpg",
  //   description: "Lengthening and volumizing mascara for bold lashes",
  // },
  // {
  //   id: 13,
  //   name: "Glow Foundation",
  //   category: "face",
  //   price: 34.99,
  //   originalPrice: 39.99,
  //   rating: 4.6,
  //   image: "https://i.pinimg.com/736x/90/88/24/glow-foundation.jpg",
  //   description: "Lightweight foundation with natural finish",
  // },
  {
    id: 14,
    name: "Blush Duo - Peach",
    category: "face",
    price: 27.99,
    originalPrice: 32.99,
    rating: 4.7,
    image: "https://i.pinimg.com/736x/df/c3/3d/dfc33dcc65698d7d822db6861eb4ade6.jpg",
    description: "Dual-toned blush for a natural flush",
  }
];

 const makeupServices = [
  {
    id: 101,
    title: "Bridal Package (3 days)",
    description: "Mehndi, Barat, Valima",
    price: 250.0,
    image:
      "https://i.pinimg.com/736x/d3/8c/04/d38c045e549f120ab10254fee920d238.jpg",
    duration: "3 Days",
  },
  {
    id: 102,
    title: "Airbrush Makeup",
    description: "Flawless, long-lasting makeup for any event",
    price: 350.0,
    image:
      "https://i.pinimg.com/736x/4d/b6/17/4db617862600832aeb07f59809951599.jpg",
    duration: "1 Day",
  },
  {
    id: 103,
    title: "Glam Makeup",
    description: "Bold and dramatic look for special occasions",
    price: 250.0,
    image:
      "https://i.pinimg.com/736x/16/27/ff/1627ffef2b023995dc604e83a86b7d33.jpg",
    duration: "1 Day",
  },
  {
    id: 104,
    title: "Party Makeup",
    description: "Glamorous look for parties",
    price: 180.0,
    image: "https://i.pinimg.com/736x/f1/ff/3f/f1ff3f0a130931f6a106b740f46800cb.jpg",
    duration: "1 Day",
  },
  {
    id: 105,
    title: "Photoshoot Makeup",
    description: "Perfect look for photoshoots",
    price: 220.0,
    image: "https://i.pinimg.com/736x/08/2d/cc/082dcccbd8a9dfdcf57865f639db27d4.jpg",
    duration: "1 Day",
  },
  {
    id: 106,
    title: "Corporate Makeup",
    description: "Professional makeup for events",
    price: 150.0,
    image: "https://i.pinimg.com/736x/f2/63/37/f26337907cce687a3fbfed7f13651975.jpg",
    duration: "1 Day",
  },
  {
    id: 107,
    title: "Everyday Glam",
    description: "Simple everyday makeup",
    price: 100.0,
    image: "https://i.pinimg.com/736x/33/a4/b1/33a4b12ab656ffa99ca0d73741dac4a8.jpg",
    duration: "1 Day",
  },
  {
    id: 108,
    title: "Evening Glam",
    description: "Elegant evening makeup",
    price: 200.0,
    image: "https://i.pinimg.com/736x/35/33/50/353350b592948b4a4f0c401854276a74.jpg",
    duration: "1 Day",
  },
  {
    id: 109,
    title: 'Festival Glam',
    description: 'Bright and bold look for festivals',
    price: 180.00,
    image: 'https://i.pinimg.com/736x/71/03/7a/71037a2c3bf19e1a4bd967ccef4e0e2c.jpg',
    duration: '1 Day'
  },
  {
    id: 110,
    title: 'Minimal Makeup',
    description: 'Natural look with light coverage',
    price: 120.00,
    image: 'https://i.pinimg.com/736x/72/ef/a2/72efa2a8825d6426223b918cbe2348fc.jpg',
    duration: '1 Day'
  }
];

 const hairServices = [
  {
    id: 201,
    title: "Hairstyling",
    description: "Any look (Extra charge for flowers)",
    price: 150.0,
    image:
      "https://i.pinimg.com/1200x/2c/d8/f4/2cd8f4f036d989a85cb739f033a3f2bd.jpg",
    duration: "1 Style",
  },
  {
    id: 202,
    title: "Hair Cutting",
    description: "Layer, Bob, Step cuts",
    price: 300.0,
    image:
      "https://i.pinimg.com/736x/48/84/4f/48844ffb1169ab67c01e4baf8e8886d0.jpg",
    duration: "1 Hour",
  },
  {
    id: 203,
    title: "Hair Treatment",
    description: "Deep conditioning and repair treatments",
    price: 120.0,
    image:
      "https://i.pinimg.com/736x/f1/f0/f8/f1f0f865a56728766d8ed6f9408da16a.jpg",
    duration: "1 Hour",
  },
  {
    id: 204,
    title: "Keratin Treatment",
    description: "Smooth & frizz-free hair",
    price: 400.0,
    image: "https://i.pinimg.com/736x/4e/f4/a8/4ef4a87c4da99edefc6c7b97d173a5cc.jpg",
    duration: "2 Hours",
  },
  {
    id: 205,
    title: "Hair Coloring",
    description: "Vibrant color options",
    price: 350.0,
    image: "https://i.pinimg.com/736x/d6/bd/2c/d6bd2c0dab7d81cf0a7d80e3847c4f6b.jpg",
    duration: "2 Hours",
  },
  {
    id: 206,
    title: "Hair Extensions",
    description: "Clip-in extensions",
    price: 200.0,
    image: "https://i.pinimg.com/736x/4c/1b/dd/4c1bdd280fb9b068c1629e0d80193f8d.jpg",
    duration: "2 Hours",
  },
  {
    id: 207,
    title: "Updo Styling",
    description: "Elegant updos",
    price: 250.0,
    image: "https://i.pinimg.com/736x/65/04/d6/6504d68c92fbf27a5ad2ba1b88af1c8b.jpg",
    duration: "1 Hour",
  },
  {
    id: 208,
    title: "Blow Dry",
    description: "Quick styling",
    price: 100.0,
    image: "https://i.pinimg.com/736x/c2/29/46/c229464938e8bc7bdaeeb8d159097fb9.jpg",
    duration: "30 Minutes",
  },
  {
    id: 209,
    title: 'Scalp Massage',
    description: 'Relaxing scalp massage for healthy hair',
    price: 80.00,
    image: 'https://i.pinimg.com/736x/99/27/ff/9927ff0f5c18c4ad9d10c3b78cc77142.jpg',
    duration: '30 Minutes'
  },
  {
    id: 210,
    title: 'Perm Styling',
    description: 'Curly or wavy hair styling',
    price: 250.00,
    image: 'https://i.pinimg.com/736x/64/0b/4f/640b4f8fddbbe20c5a045c58b62376d5.jpg',
    duration: '2 Hours'
  }
];

 const skincareServices = [
  {
    id: 301,
    title: "Gold Facial",
    description: "Luxury facial with gold particles for radiant skin",
    price: 180.0,
    image:
      "https://i.pinimg.com/1200x/8f/06/72/8f0672c6e2670f86146e485ea6d7a14f.jpg",
    duration: "90 Minutes",
  },
  {
    id: 302,
    title: "Hydra Facial",
    description: "Deep hydration and skin rejuvenation",
    price: 150.0,
    image:
      "https://i.pinimg.com/736x/12/68/42/1268425984b2c8579e8157dbde3c89dd.jpg",
    duration: "60 Minutes",
  },
  {
    id: 303,
    title: "Acne Treatment",
    description: "Professional acne clearing and prevention",
    price: 120.0,
    image:
      "https://i.pinimg.com/736x/34/04/e7/3404e78fb490d5aeb579fb4697afbee6.jpg",
    duration: "60 Minutes",
  },
  {
    id: 304,
    title: "Anti-Aging Facial",
    description: "Reduces wrinkles and fine lines",
    price: 200.0,
    image: "https://i.pinimg.com/1200x/d0/3a/66/d03a66efd46fe1c085e0327a4f029324.jpg",
    duration: "60 Minutes",
  },
  {
    id: 305,
    title: "Vitamin C Facial",
    description: "Brightens skin and reduces pigmentation",
    price: 160.0,
    image: "https://i.pinimg.com/736x/f4/e6/0d/f4e60d2eef4fd10245ed1290a6cf6802.jpg",
    duration: "60 Minutes",
  },
  {
    id: 306,
    title: "Deep Cleansing Facial",
    description: "Removes dirt and impurities",
    price: 140.0,
    image: "https://i.pinimg.com/736x/da/1e/3e/da1e3e2e39d08b2b71752dd07b71e6ee.jpg",
    duration: "45 Minutes",
  },
  {
    id: 307,
    title: "Collagen Facial",
    description: "Boosts skin elasticity",
    price: 180.0,
    image: "https://i.pinimg.com/736x/f6/18/6a/f6186ad6f41ee6d95d1b91f56dbbe2df.jpg",
    duration: "60 Minutes",
  },
  {
    id: 308,
    title: "Hydrating Facial",
    description: "Intense hydration for glowing skin",
    price: 150.0,
    image: "https://i.pinimg.com/736x/8c/d2/2d/8cd22d920b7e97782bb7588308cad370.jpg",
    duration: "60 Minutes",
  },
  {
    id: 309,
    title: 'Brightening Facial',
    description: 'Enhances skin radiance and glow',
    price: 170.00,
    image: 'https://i.pinimg.com/736x/40/dd/d7/40ddd7e25d4c36456fc36642bd2687cb.jpg',
    duration: '60 Minutes'
  },
  {
    id: 310,
    title: 'Soothing Facial',
    description: 'Calms sensitive skin and reduces redness',
    price: 150.00,
    image: 'https://i.pinimg.com/736x/3e/06/89/3e06893b2f97374611ce8fca49e1bd59.jpg',
    duration: '60 Minutes'
  }
];


  // --- HELPER FUNCTIONS ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const allItems = [
    ...products.map(p => ({ ...p, type: 'product', title: p.name, sectionId: 'products' })),
    ...makeupServices.map(s => ({ ...s, type: 'service', title: s.title, sectionId: 'makeup' })),
    ...hairServices.map(s => ({ ...s, type: 'service', title: s.title, sectionId: 'hair' })),
    ...skincareServices.map(s => ({ ...s, type: 'service', title: s.title, sectionId: 'skincare' })),
  ];

  const globalResults = allItems.filter(item => {
    const q = searchQuery.toLowerCase();
    if (!q) return false;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      item.price.toString().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery ? (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true;
    return matchesCategory && matchesSearch;
  });

  const filteredMakeupServices = makeupServices.filter(service => {
    if (!searchQuery) return true;
    return (
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredHairServices = hairServices.filter(service => {
    if (!searchQuery) return true;
    return (
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredSkincareServices = skincareServices.filter(service => {
    if (!searchQuery) return true;
    return (
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // --- CALCULATIONS ---
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartDiscount = cart.reduce((total, item) => {
    if (item.originalPrice) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0);
  const tax = cartTotal * 0.10;
  const grandTotal = cartTotal + tax;

  // --- EFFECTS ---
  useEffect(() => {
    if (searchQuery && globalResults.length > 0) {
      const firstResult = globalResults[0];
      const section = document.getElementById(firstResult.sectionId || firstResult.type);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchQuery, globalResults]);

  // --- SWEETALERT HELPERS ---
  const showSuccessAlert = (title, message) => {
    MySwal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#e91e63',
      confirmButtonText: 'OK',
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const showErrorAlert = (title, message) => {
    MySwal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#e91e63',
      confirmButtonText: 'OK',
    });
  };

  const showConfirmDialog = (title, text, confirmButtonText = 'Yes') => {
    return MySwal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#666',
      confirmButtonText,
      cancelButtonText: 'Cancel'
    });
  };

  // --- ACTION HANDLERS ---
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.type === 'product');
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.type === 'product'
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, {
          ...product,
          type: 'product',
          quantity: 1,
          addedAt: new Date().toISOString()
        }];
      }
    });
    setCartCount(prev => prev + 1);
    showSuccessAlert('Added to Cart!', `${product.name} has been added to your shopping cart.`);
  };

  const addServiceToCart = (service, serviceType) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === service.id && item.type === 'service');
      if (existingItem) {
        return prevCart.map(item =>
          item.id === service.id && item.type === 'service'
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, {
          ...service,
          type: 'service',
          name: service.title,
          category: serviceType,
          quantity: 1,
          addedAt: new Date().toISOString()
        }];
      }
    });
    setCartCount(prev => prev + 1);
    showSuccessAlert('Service Booked!', `${service.title} has been added to your cart.`);
  };

  const updateQuantity = (itemId, type, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, type);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.type === type
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId, type) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === itemId && item.type === type);
      if (itemToRemove) {
        setCartCount(prev => prev - itemToRemove.quantity);
      }
      return prevCart.filter(item => !(item.id === itemId && item.type === type));
    });
  };

  const clearCart = () => {
    showConfirmDialog('Clear Cart', 'Are you sure you want to remove all items from your cart?', 'Yes, Clear All')
      .then((result) => {
        if (result.isConfirmed) {
          setCart([]);
          setCartCount(0);
          setShowCart(false);
          showSuccessAlert('Cart Cleared!', 'All items have been removed from your cart.');
        }
      });
  };

  const generateInvoice = () => {
    if (cart.length === 0) {
      showErrorAlert('Empty Cart', 'Your cart is empty! Please add items before checking out.');
      return;
    }
    const invoiceNumber = 'INV-' + Date.now();
    const invoiceDate = new Date().toLocaleDateString();
    const invoiceTime = new Date().toLocaleTimeString();

    const invoice = {
      invoiceNumber,
      date: invoiceDate,
      time: invoiceTime,
      items: cart,
      subtotal: cartTotal,
      discount: cartDiscount,
      tax: tax,
      total: grandTotal,
      customer: customerInfo,
      paymentMethod: 'Credit Card',
      status: 'Paid'
    };
    setInvoiceData(invoice);
    setShowInvoice(true);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showErrorAlert('Empty Cart', 'Your cart is empty! Please add items before checking out.');
      return;
    }
    setIsCheckout(true);
  };

  const handlePayment = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      showErrorAlert('Missing Information', 'Please fill in all required customer information (Name, Email, and Phone).');
      return;
    }
    MySwal.fire({
      title: 'Processing Payment...',
      html: 'Please wait while we process your payment.',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 1500,
      didOpen: () => {
        MySwal.showLoading();
      }
    }).then(() => {
      generateInvoice();
      setIsCheckout(false);
      setShowCart(false);
      showSuccessAlert('Payment Successful!', 'Your order has been confirmed and the invoice has been generated.');
    });
  };

  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - MAHCare</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .invoice-header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f5f5f5; }
            .total-section { text-align: right; margin-top: 30px; }
            .total-row { margin: 5px 0; }
            .thank-you { text-align: center; margin-top: 50px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1>MAHCare Invoice</h1>
            <p>Invoice #: ${invoiceData.invoiceNumber}</p>
            <p>Date: ${invoiceData.date} | Time: ${invoiceData.time}</p>
          </div>
          
          <div class="invoice-details">
            <h3>Customer Information</h3>
            <p>Name: ${invoiceData.customer.name}</p>
            <p>Email: ${invoiceData.customer.email}</p>
            <p>Phone: ${invoiceData.customer.phone}</p>
            <p>Address: ${invoiceData.customer.address}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr>
                  <td>${item.name || item.title}</td>
                  <td>${item.type}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.price)}</td>
                  <td>${formatCurrency(item.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-row">Subtotal: ${formatCurrency(invoiceData.subtotal)}</div>
            ${invoiceData.discount > 0 ? `<div class="total-row">Discount: -${formatCurrency(invoiceData.discount)}</div>` : ''}
            <div class="total-row">Tax (10%): ${formatCurrency(invoiceData.tax)}</div>
            <div class="total-row"><strong>Grand Total: ${formatCurrency(invoiceData.total)}</strong></div>
          </div>
          
          <div class="payment-info">
            <p>Payment Method: ${invoiceData.paymentMethod}</p>
            <p>Status: <strong>${invoiceData.status}</strong></p>
          </div>
          
          <div class="thank-you">
            <p>Thank you for your purchase!</p>
            <p>MAHCare - Your Premium Beauty Destination</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const showQuickView = (product) => {
    MySwal.fire({
      title: product.name,
      html: `
        <div style="text-align: left;">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 15px;">
          <p><strong>Category:</strong> ${product.category.toUpperCase()}</p>
          <p><strong>Price:</strong> ${formatCurrency(product.price)} ${product.originalPrice ? `<span style="text-decoration: line-through; color: #999; margin-left: 10px;">${formatCurrency(product.originalPrice)}</span>` : ''}</p>
          <p><strong>Rating:</strong> ${'★'.repeat(Math.floor(product.rating))} (${product.rating})</p>
          <p><strong>Description:</strong> ${product.description}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add to Cart',
      cancelButtonText: 'Close',
      confirmButtonColor: '#e91e63',
      cancelButtonColor: '#666',
      showCloseButton: true,
      width: 600
    }).then((result) => {
      if (result.isConfirmed) {
        addToCart(product);
      }
    });
  };

  const showAppointmentAlert = () => {
    MySwal.fire({
      title: 'Book Appointment',
      html: `
        <div style="text-align: left;">
          <p>Call us to book your appointment:</p>
          <p style="font-size: 1.5rem; font-weight: bold; color: #e91e63;">+92 300 1234567</p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Close',
      confirmButtonColor: '#e91e63',
      width: 500
    });
  };

  const bookService = (service, serviceType) => {
    addServiceToCart(service, serviceType);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowAllResults(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  }, []);

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setSearchFocused(false), 200);
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h1>MAHCare</h1>
          </div>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
            <button className="nav-link" onClick={() => scrollToSection('makeup')}>Makeup</button>
            <button className="nav-link" onClick={() => scrollToSection('hair')}>Hair</button>
            <button className="nav-link" onClick={() => scrollToSection('skincare')}>Skincare & Facial</button>
            <button className="nav-link" onClick={() => scrollToSection('products')}>Products</button>
            <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>

          <div className="nav-right">
            <div className="search-container">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search products & services..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory('all');
                  }}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="search-input"
                  aria-label="Search products and services"
                />
                {searchQuery && (
                  <button
                    className="clear-search-btn"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
                <button type="button" className="search-btn" aria-label="Search">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>

              {searchQuery && globalResults.length > 0 && searchFocused && (
                <div className="search-results-dropdown">
                  <div className="search-results-header">
                    <span>Found {globalResults.length} results</span>
                    {globalResults.length > 5 && (
                      <button
                        className="show-all-results-btn"
                        onClick={() => setShowAllResults(!showAllResults)}
                      >
                        {showAllResults ? 'Show Less' : 'Show All'}
                      </button>
                    )}
                  </div>
                  <div className="search-results-list">
                    {(showAllResults ? globalResults : globalResults.slice(0, 5)).map((item) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        className="search-result-item"
                        onClick={() => scrollToSection(item.sectionId)}
                      >
                        <div className="result-type-badge">{item.type}</div>
                        <div className="result-content">
                          <h4>{item.title}</h4>
                          <p className="result-description">{item.description}</p>
                          <div className="result-price">{formatCurrency(item.price)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="cart-icon">
              <button onClick={() => setShowCart(true)} aria-label="View cart">
               💭 <span className="cart-count">{cartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* CART MODAL */}
      {showCart && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <div className="cart-modal-header">
              <h2>Shopping Cart ({cartCount} items)</h2>
              <button className="close-cart-btn" onClick={() => setShowCart(false)}>×</button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <button className="continue-shopping-btn" onClick={() => setShowCart(false)}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={`${item.type}-${item.id}`} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name || item.title} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name || item.title}</h4>
                        <p className="cart-item-type">{item.type} {item.category && `- ${item.category}`}</p>
                        <div className="cart-item-price">
                          {formatCurrency(item.price)} {item.originalPrice && (
                            <span className="original-price">{formatCurrency(item.originalPrice)}</span>
                          )}
                        </div>
                      </div>
                      <div className="cart-item-quantity">
                        <button onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}>+</button>
                      </div>
                      <div className="cart-item-total">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id, item.type)}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="summary-row discount">
                        <span>Discount:</span>
                        <span>-{formatCurrency(cartDiscount)}</span>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>Tax (10%):</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>

                  <div className="cart-actions">
                    <button className="clear-cart-btn" onClick={clearCart}>
                      Clear Cart
                    </button>
                    <button className="checkout-btn" onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckout && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button className="close-checkout-btn" onClick={() => setIsCheckout(false)}>×</button>
            </div>

            <div className="checkout-content">
              <div className="checkout-section">
                <h3>Customer Information</h3>
                <div className="checkout-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Enter your address"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-section">
                <h3>Order Summary</h3>
                <div className="order-summary">
                  {cart.map(item => (
                    <div key={`${item.type}-${item.id}`} className="order-item">
                      <span>{item.name || item.title} × {item.quantity}</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="order-total">
                    <span>Total:</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="checkout-section">
                <h3>Payment Method</h3>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-method">
                    <input type="radio" name="payment" />
                    <span>PayPal</span>
                  </label>
                  <label className="payment-method">
                    <input type="radio" name="payment" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <div className="checkout-actions">
                <button className="back-to-cart-btn" onClick={() => setIsCheckout(false)}>
                  Back to Cart
                </button>
                <button className="pay-now-btn" onClick={handlePayment}>
                  Pay Now {formatCurrency(grandTotal)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INVOICE MODAL */}
      {showInvoice && invoiceData && (
        <div className="invoice-modal-overlay">
          <div className="invoice-modal">
            <div className="invoice-header">
              <h2>Payment Successful! 🎉</h2>
              <p>Your order has been confirmed</p>
              <button className="close-invoice-btn" onClick={() => setShowInvoice(false)}>×</button>
            </div>

            <div className="invoice-content">
              <div className="invoice-details">
                <div className="detail-row">
                  <span>Invoice Number:</span>
                  <strong>{invoiceData.invoiceNumber}</strong>
                </div>
                <div className="detail-row">
                  <span>Date:</span>
                  <span>{invoiceData.date}</span>
                </div>
                <div className="detail-row">
                  <span>Time:</span>
                  <span>{invoiceData.time}</span>
                </div>
                <div className="detail-row">
                  <span>Customer:</span>
                  <span>{invoiceData.customer.name}</span>
                </div>
              </div>

              <div className="invoice-items">
                <h3>Items Purchased</h3>
                {invoiceData.items.map(item => (
                  <div key={`${item.type}-${item.id}`} className="invoice-item">
                    <span>{item.name || item.title} × {item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="invoice-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(invoiceData.subtotal)}</span>
                </div>
                {invoiceData.discount > 0 && (
                  <div className="total-row discount">
                    <span>Discount:</span>
                    <span>-{formatCurrency(invoiceData.discount)}</span>
                  </div>
                )}
                <div className="total-row">
                  <span>Tax:</span>
                  <span>{formatCurrency(invoiceData.tax)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total Amount:</span>
                  <strong>{formatCurrency(invoiceData.total)}</strong>
                </div>
              </div>

              <div className="invoice-actions">
                <button className="print-invoice-btn" onClick={printInvoice}>
                   Print Invoice
                </button>
                <button className="close-invoice-btn" onClick={() => setShowInvoice(false)}>
                  Continue 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero-with-bg" id="home">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content-bg">
          <div className="welcome-text">
            <h2>Elevate Your Glow</h2> 
            <h1>Redefine Your Beauty</h1>
          </div>
          <button className="hero-cta-button" onClick={showAppointmentAlert}>
            Book Your Appointment
          </button>
        </div>
      </section>

      {/* SEARCH BANNER */}
      {searchQuery && (
        <div className="global-search-banner">
          <div className="search-summary">
            <span>Search Results for: <strong>"{searchQuery}"</strong></span>
            <span className="result-count">
              Found {globalResults.length} items across all categories
            </span>
          </div>
          <button onClick={clearSearch} className="clear-search-banner-btn">
            Clear Search
          </button>
        </div>
      )}

      {/* MAKEUP SECTION */}
      <section className="specialty-section makeup-section" id="makeup">
        <div className="section-header">
          <h2>Makeup Services</h2>
          <p>Experience professional makeup services designed to highlight your unique features.</p>
          {searchQuery && filteredMakeupServices.length === 0 && (
            <div className="no-results-message">
              No makeup services found matching "{searchQuery}"
            </div>
          )}
        </div>
        <div className="specialty-grid">
          {filteredMakeupServices.map(service => (
            <div key={service.id} className="specialty-card">
              <div className="specialty-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="specialty-overlay">
                  <span className="specialty-duration">{service.duration}</span>
                </div>
              </div>
              <div className="specialty-info">
                <h3>{service.title}</h3>
                <p className="specialty-description">{service.description}</p>
                <div className="specialty-price">
                  <span className="price">{formatCurrency(service.price)}</span>
                </div>
                <button
                  className="specialty-btn"
                  onClick={() => bookService(service, 'makeup')}
                >
                  Book Makeup
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredMakeupServices.length === 0 && !searchQuery && (
          <div className="no-services-message">
            No makeup services available.
          </div>
        )}
      </section>

      {/* HAIR SECTION */}
      <section className="specialty-section hair-section" id="hair">
        <div className="section-header">
          <h2>Hair Services</h2>
          <p>Expert hair styling, cutting, and treatment services</p>
          {searchQuery && filteredHairServices.length === 0 && (
            <div className="no-results-message">
              No hair services found matching "{searchQuery}"
            </div>
          )}
        </div>
        <div className="specialty-grid">
          {filteredHairServices.map(service => (
            <div key={service.id} className="specialty-card">
              <div className="specialty-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="specialty-overlay">
                  <span className="specialty-duration">{service.duration}</span>
                </div>
              </div>
              <div className="specialty-info">
                <h3>{service.title}</h3>
                <p className="specialty-description">{service.description}</p>
                <div className="specialty-price">
                  <span className="price">{formatCurrency(service.price)}</span>
                </div>
                <button
                  className="specialty-btn"
                  onClick={() => bookService(service, 'hair')}
                >
                  Book Hair Service
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredHairServices.length === 0 && !searchQuery && (
          <div className="no-services-message">
            No hair services available.
          </div>
        )}
      </section>

      {/* SKINCARE SECTION */}
      <section className="specialty-section skincare-section" id="skincare">
        <div className="section-header">
          <h2>Skincare & Facial Services</h2>
          <p>Revitalize your skin with our premium facial treatments</p>
          {searchQuery && filteredSkincareServices.length === 0 && (
            <div className="no-results-message">
              No skincare services found matching "{searchQuery}"
            </div>
          )}
        </div>
        <div className="specialty-grid">
          {filteredSkincareServices.map(service => (
            <div key={service.id} className="specialty-card">
              <div className="specialty-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="specialty-overlay">
                  <span className="specialty-duration">{service.duration}</span>
                </div>
              </div>
              <div className="specialty-info">
                <h3>{service.title}</h3>
                <p className="specialty-description">{service.description}</p>
                <div className="specialty-price">
                  <span className="price">{formatCurrency(service.price)}</span>
                </div>
                <button
                  className="specialty-btn"
                  onClick={() => bookService(service, 'skincare')}
                >
                  Book Facial
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredSkincareServices.length === 0 && !searchQuery && (
          <div className="no-services-message">
            No skincare services available.
          </div>
        )}
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2>Shop Our Products</h2>
          <p>Premium beauty products for your home care routine</p>
        </div>

        <div className="search-filter-section">
          <div className="categories">
            <div className="category-filters">
              {['all', 'face', 'eyes', 'lips', 'tools'].map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.originalPrice && (
                      <span className="discount-badge">
                        Sale
                      </span>
                    )}
                    <div className="product-overlay">
                      <button
                        className="quick-view-btn"
                        onClick={() => showQuickView(product)}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category.toUpperCase()}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                      {'★'.repeat(Math.floor(product.rating))}
                      <span className="rating-number">{product.rating}</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="original-price">{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}> Add to Cart </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e91e63" strokeWidth="1">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3>No products found</h3>
            <p>Try a different search term or category</p>
            <button onClick={clearSearch} className="cta-button">Clear Search</button>
          </div>
        )}
      </section>

      {/* CONTACT SECTION */}
           
      <section className="contact-section" id="contact">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          
          {/* LEFT SIDE: MAP & INFO */}
          <div className="lg:w-2/3 md:w-1/2 map-wrapper rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            {/* Map with Dark Theme Filter */}
            <iframe 
              width="100%" 
              height="100%" 
              className="absolute inset-0 grayscale-map" 
              frameBorder="0" 
              title="map" 
              marginHeight="0" 
              marginWidth="0" 
              scrolling="no" 
              src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Karachi,%20Pakistan&t=&z=14&iwloc=B&output=embed"
              style={{ border: 0 }}
            ></iframe>
            
            {/* Info Card Overlay */}
            <div className="info-card flex flex-wrap py-6 rounded shadow-lg">
              <div className="lg:w-1/2 px-6">
                <h2 className="label-text">ADDRESS</h2>
                <p className="mt-1">Gulshan-e-Iqbal, Block 13-D, Karachi, Pakistan</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="label-text">EMAIL</h2>
                <a href="mailto:mahcare@gmail.com" className="text-link">mahcare@gmail.com</a>
                <h2 className="label-text mt-4">PHONE</h2>
                <p className="leading-relaxed">+92 315 1108178</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div className="lg:w-1/3 md:w-1/2 bg-dark-card flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="heading-text mb-1 font-medium title-font">Get in Touch</h2>
            <p className="sub-text mb-5">Have questions? Send us a message and we'll get back to you shortly.</p>
            
            <div className="relative mb-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-input" 
                placeholder="Your Name"
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-input" 
                placeholder="Your Email"
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-input h-32 resize-none" 
                placeholder="Write your message here..."
              ></textarea>
            </div>
            
            <button className="submit-btn">Send Message</button>
            
            <p className="footer-note mt-3">We respect your privacy. Your information is safe with us.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MAHCare</h3>
            <p>Your premium destination for beauty and wellness</p>
            <div className="appointment-cta">
              <button className="footer-cta-button" onClick={showAppointmentAlert}>
                Call to Book
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <button onClick={() => scrollToSection('makeup')}>Makeup</button>
            <button onClick={() => scrollToSection('hair')}>Hair Styling</button>
            <button onClick={() => scrollToSection('skincare')}>Skincare & Facial</button>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Instagram">❤️</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐣</a>
              <a href="#" className="social-icon" aria-label="YouTube">📺</a>
            </div>
            <div className="business-hours">
              <h5>Business Hours</h5>
              <p>Mon-Fri: 10:00 AM - 12:00 PM</p>
              <p>Sat-Sun: 10:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MAHCare | Beauty Salon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
