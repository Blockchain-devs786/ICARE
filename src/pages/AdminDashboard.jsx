import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function AdminDashboard() {
  const { user, products, addProduct, updateProduct, storeDetails, updateStoreDetails, logout, orders } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'store', 'orders'
  const fileInputRef = useRef(null);

  // Product form state
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Mobiles');
  const [sale, setSale] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Store details form state
  const [address, setAddress] = useState(storeDetails.address);
  const [hours, setHours] = useState(storeDetails.hours);
  const [phone, setPhone] = useState(storeDetails.phone);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setSale(product.sale);
    setBestSeller(product.bestSeller || false);
    setImagePreview(product.image || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setImagePreview('');
    setSale(false);
    setBestSeller(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, { name, price, category, sale, bestSeller, image: imagePreview });
      alert('Product updated successfully!');
    } else {
      addProduct({ name, price, category, sale, bestSeller, image: imagePreview });
      alert('Product published successfully!');
    }
    handleCancelEdit();
  };

  const handleUpdateStore = (e) => {
    e.preventDefault();
    updateStoreDetails({ address, hours, phone });
    alert('Store details updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#111827', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #374151' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dashboard</h2>
        </div>
        <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          <button onClick={() => setActiveTab('orders')} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', backgroundColor: activeTab === 'orders' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'orders' ? 'white' : '#9ca3af', fontWeight: '500', transition: 'all 0.2s', border: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                Customer Orders
              </div>
              {orders.length > 0 && <span style={{ backgroundColor: 'var(--orange)', color: 'white', padding: '2px 8px', borderRadius: '99px', fontSize: '0.75rem' }}>{orders.length}</span>}
            </div>
          </button>

          <button onClick={() => setActiveTab('products')} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', backgroundColor: activeTab === 'products' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'products' ? 'white' : '#9ca3af', fontWeight: '500', transition: 'all 0.2s', border: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Products Management
            </div>
          </button>
          <button onClick={() => setActiveTab('store')} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', backgroundColor: activeTab === 'store' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'store' ? 'white' : '#9ca3af', fontWeight: '500', transition: 'all 0.2s', border: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Store Settings
            </div>
          </button>
        </nav>
        <div style={{ padding: '24px 12px' }}>
          <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: '8px', color: '#f87171', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px', transition: 'background 0.2s', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.1)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
              {activeTab === 'products' && 'Products Management'}
              {activeTab === 'store' && 'Store Settings'}
              {activeTab === 'orders' && 'Customer Orders'}
            </h1>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>Welcome back, Admin. Here is what's happening with your store today.</p>
          </div>
        </header>

        {activeTab === 'orders' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>Recent Orders</h2>
            {orders.length === 0 ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#6b7280' }}>No orders have been placed yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Order ID</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Customer</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Product</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Total Amount</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Date</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice().reverse().map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#111827' }}>#{order.id.toString().slice(-6)}</td>
                        <td style={{ padding: '16px', color: '#4b5563' }}>{order.userName}</td>
                        <td style={{ padding: '16px', color: '#4b5563' }}>{order.productName}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#111827' }}>{order.price}</td>
                        <td style={{ padding: '16px', color: '#6b7280', fontSize: '0.875rem' }}>{order.date}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '9999px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: '600' }}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
            
            {/* Products Table */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>All Products ({products.length})</h2>
              <div style={{ overflowX: 'auto', maxHeight: '600px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Product</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Price</th>
                      <th style={{ padding: '12px 16px', color: '#6b7280', fontWeight: '600', fontSize: '0.875rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice().reverse().map(product => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f3f4f6', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {product.image ? (
                              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            )}
                          </div>
                          <span style={{ fontWeight: '500', color: '#111827' }}>{product.name}</span>
                        </td>
                        <td style={{ padding: '16px', color: '#111827', fontWeight: '500' }}>{product.price}</td>
                        <td style={{ padding: '16px' }}>
                           <button onClick={() => handleEditClick(product)} style={{ border: 'none', background: 'none', color: '#3b82f6', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add/Edit Product Form */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} style={{ fontSize: '0.875rem', color: '#6b7280', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cancel</button>
                )}
              </div>
              
              <form onSubmit={handleSubmitProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Image Upload Zone */}
                <div>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Product Image</label>
                  <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '24px', textAlign: 'center', backgroundColor: '#f9fafb', position: 'relative', overflow: 'hidden', height: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#d1d5db'}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ marginBottom: '12px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Click to upload from device</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Product Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--orange)'} onBlur={e => e.target.style.borderColor = '#d1d5db'} placeholder="e.g. iPhone 15 Pro" />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Price</label>
                  <input type="text" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--orange)'} onBlur={e => e.target.style.borderColor = '#d1d5db'} placeholder="e.g. Rs. 350,000" />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}>
                    <option>Mobiles</option>
                    <option>Audio</option>
                    <option>Accessories</option>
                    <option>Smart Home</option>
                    <option>Wearables</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    <input type="checkbox" checked={sale} onChange={e => setSale(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                    On Sale
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    <input type="checkbox" checked={bestSeller} onChange={e => setBestSeller(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                    Best Seller
                  </label>
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--black)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--orange)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--black)'}>
                  {editingId ? 'Update Product' : 'Publish Product'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'store' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>Update Store Details</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '0.875rem' }}>These details appear in the "Visit the shop" section and Footer across the website.</p>
            
            <form onSubmit={handleUpdateStore} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Store Address (Directions)</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} rows="3" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--orange)'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Opening Hours</label>
                <input type="text" value={hours} onChange={e => setHours(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--orange)'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px', color: '#374151' }}>Phone Number (WhatsApp)</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'var(--orange)'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              </div>
              
              <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--black)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '8px', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--orange)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--black)'}>
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
