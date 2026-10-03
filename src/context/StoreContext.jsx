import React, { createContext, useState, useContext, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }); 

  const [storeDetails, setStoreDetails] = useState(() => {
    const saved = localStorage.getItem('storeDetails');
    return saved ? JSON.parse(saved) : {
      address: 'Kohinoor City',
      hours: '10 AM - 10 PM',
      phone: '+92 300 1234567'
    };
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    if (saved) return JSON.parse(saved);
    return [
      { id: 101, name: 'iPhone 15 Pro', price: 'Rs. 350,000', sale: false, category: 'Mobiles', bestSeller: false, image: '' },
      { id: 102, name: 'Samsung Galaxy S24 Ultra', price: 'Rs. 400,000', sale: true, category: 'Mobiles', bestSeller: false, image: '' },
      { id: 103, name: 'Google Pixel 8 Pro', price: 'Rs. 280,000', sale: false, category: 'Mobiles', bestSeller: false, image: '' },
      { id: 104, name: 'OnePlus 12', price: 'Rs. 250,000', sale: false, category: 'Mobiles', bestSeller: false, image: '' },
      { id: 105, name: 'iPhone 13', price: 'Rs. 180,000', sale: true, category: 'Mobiles', bestSeller: false, image: '' },
      { id: 106, name: 'Xiaomi 14', price: 'Rs. 220,000', sale: false, category: 'Mobiles', bestSeller: false, image: '' },
      
      { id: 201, name: 'Wireless earbuds Pro', price: 'Rs. 15,000', sale: true, category: 'Audio', bestSeller: true, image: '' },
      { id: 202, name: 'Over-ear Noise Cancelling Headphones', price: 'Rs. 45,000', sale: false, category: 'Audio', bestSeller: false, image: '' },
      { id: 203, name: 'Portable Bluetooth Speaker', price: 'Rs. 12,000', sale: false, category: 'Audio', bestSeller: false, image: '' },
      { id: 204, name: 'Sport Wireless Earbuds', price: 'Rs. 8,000', sale: true, category: 'Audio', bestSeller: false, image: '' },
      
      { id: 301, name: 'USB-C to USB-C cable', price: 'Rs. 2,000', sale: false, category: 'Accessories', bestSeller: true, image: '' },
      { id: 302, name: '30W Fast Charger', price: 'Rs. 4,500', sale: true, category: 'Accessories', bestSeller: false, image: '' },
      { id: 303, name: 'MagSafe Clear Case', price: 'Rs. 3,000', sale: false, category: 'Accessories', bestSeller: false, image: '' },
      { id: 304, name: 'Tempered Glass Screen Protector', price: 'Rs. 1,500', sale: false, category: 'Accessories', bestSeller: false, image: '' },
      { id: 305, name: 'Power bank', price: 'Rs. 8,500', sale: false, category: 'Accessories', bestSeller: true, image: '' },
      
      { id: 401, name: 'Smart LED Bulb', price: 'Rs. 3,500', sale: false, category: 'Smart Home', bestSeller: false, image: '' },
      { id: 402, name: 'Smart Wi-Fi Plug', price: 'Rs. 4,000', sale: true, category: 'Smart Home', bestSeller: false, image: '' },
      { id: 403, name: 'Indoor Security Camera', price: 'Rs. 12,500', sale: false, category: 'Smart Home', bestSeller: false, image: '' },
      { id: 404, name: 'Voice Assistant Speaker', price: 'Rs. 18,000', sale: true, category: 'Smart Home', bestSeller: false, image: '' },
      
      { id: 501, name: 'Smartwatch', price: 'Rs. 25,000', sale: false, category: 'Wearables', bestSeller: true, image: '' },
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => { localStorage.setItem('user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('storeDetails', JSON.stringify(storeDetails)); }, [storeDetails]);
  useEffect(() => { localStorage.setItem('products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const updateProduct = (id, updatedData) => setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  const updateStoreDetails = (details) => setStoreDetails({ ...storeDetails, ...details });

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };
  const clearCart = () => setCart([]);

  const login = (email, password) => {
    if (email === 'admin' && password === 'admin123') {
      setUser({ role: 'admin', name: 'Admin' });
      return 'admin';
    } else {
      setUser({ role: 'customer', name: email.split('@')[0] || 'Customer' });
      return 'customer';
    }
  };

  const register = (name, email, password) => {
    setUser({ role: 'customer', name: name || email.split('@')[0] });
    return 'customer';
  };

  const loginWithGoogle = () => {
    setUser({ role: 'customer', name: 'Google User' });
    return 'customer';
  };

  const logout = () => setUser(null);

  const placeOrder = (user, cartItems, totalAmount) => {
    const productNames = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
    const newOrder = {
      id: Date.now(),
      userName: user.name,
      productName: productNames,
      price: `Rs. ${totalAmount.toLocaleString()}`,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
  };

  return (
    <StoreContext.Provider value={{ 
      user, login, register, loginWithGoogle, logout, 
      storeDetails, updateStoreDetails, 
      products, addProduct, updateProduct, 
      orders, placeOrder,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      isCartOpen, setIsCartOpen
    }}>
      {children}
    </StoreContext.Provider>
  );
};
