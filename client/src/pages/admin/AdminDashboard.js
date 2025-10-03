import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  contactService, 
  companyService, 
  festivalService, 
  branchService, 
  voucherService,
  handleFirebaseError 
} from '../../services/firebaseService';
import { branchEvents } from '../../services/branchEvents';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import LazyImage from '../../components/LazyImage';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUser, setAdminUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [contactRequests, setContactRequests] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [festivalImages, setFestivalImages] = useState([]);
  const [branches, setBranches] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [viewingVoucher, setViewingVoucher] = useState(null);
  const [editingFestival, setEditingFestival] = useState(null);
  const [voucherFilter, setVoucherFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock data - Replace with real API calls
  const [dashboardData] = useState({
    totalUsers: 1250,
    totalCompanies: 6,
    activeVouchers: 450,
    totalRevenue: '₹2,45,000',
    pendingApprovals: 23,
    newRegistrations: 45
  });

  const handleLogout = useCallback(() => {
    localStorage.removeItem('wyenfos_admin_token');
    localStorage.removeItem('wyenfos_admin_user');
    navigate('/admin/hvcxyctdsyt/jhguyiu/login');
  }, [navigate]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('wyenfos_admin_token');
    const user = localStorage.getItem('wyenfos_admin_user');
    
    if (!token || !user) {
      navigate('/admin/hvcxyctdsyt/jhguyiu/login');
      return;
    }

    try {
      setAdminUser(JSON.parse(user));
      loadAllData();
    } catch (err) {
      console.error('Error parsing user data:', err);
      handleLogout();
    }
  }, [navigate, handleLogout]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try to load all data from Firebase
      try {
        const [requests, companiesData, festivalData, branchesData, vouchersData] = await Promise.all([
          contactService.getContactMessages(),
          companyService.getCompanies(),
          festivalService.getFestivalImages(),
          branchService.getBranches(),
          voucherService.getVouchers()
        ]);
        
        setContactRequests(requests);
        setCompanies(companiesData);
        setFestivalImages(festivalData);
        setBranches(branchesData);
        setVouchers(vouchersData);
        
        // Debug logging
        console.log('Loaded companies:', companiesData);
        console.log('Loaded vouchers:', vouchersData);
        
        // Save branches to localStorage for Footer component
        localStorage.setItem('wyenfos_branches', JSON.stringify(branchesData));
        
        // Emit event to notify other components
        branchEvents.emit();
        
      } catch (firebaseError) {
        console.error('Firebase loading error:', firebaseError);
        
        // Fallback to demo data if Firebase fails
        console.log('🔄 Loading demo data due to Firebase connection issues...');
        
        const demoCompanies = [
          {
            id: 'demo-1',
            name: 'Wyenfos Infotech',
            category: 'technology',
            description: 'Leading technology solutions providing software development, web applications, and digital transformation services.',
            website: 'https://wyenfos.com',
            status: 'active',
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'demo-2',
            name: 'Ayur4Life Herbals',
            category: 'healthcare',
            description: 'Ayurvedic and herbal products manufacturer focused on natural wellness solutions.',
            website: 'https://ayur4life.com',
            status: 'active',
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'demo-3',
            name: 'Wyenfos Pure Drops',
            category: 'healthcare',
            description: 'Pure and natural water solutions provider offering premium quality drinking water.',
            website: 'https://wyenfospuredrops.com',
            status: 'active',
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'demo-4',
            name: 'Cash Vapase',
            category: 'finance',
            description: 'Revolutionary financial services platform providing seamless digital payment services.',
            website: 'https://cashvapase.com',
            status: 'active',
            createdAt: { toDate: () => new Date() }
          }
        ];

        const demoVouchers = [
          {
            id: 'voucher-1',
            name: 'Grocery Voucher',
            category: 'grocery',
            price: 500,
            discount: 10,
            stock: 100,
            description: 'Get 10% off on grocery purchases. Valid at all major supermarkets.',
            status: 'active',
            soldCount: 25,
            expiryDate: { toDate: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 30 days from now
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'voucher-2',
            name: 'Fuel Voucher',
            category: 'fuel',
            price: 1000,
            discount: 5,
            stock: 50,
            description: 'Save 5% on fuel purchases at participating petrol stations.',
            status: 'active',
            soldCount: 15,
            expiryDate: { toDate: () => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) }, // 60 days from now
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'voucher-3',
            name: 'Health Voucher',
            category: 'health',
            price: 750,
            discount: 15,
            stock: 8, // Low stock
            description: 'Get 15% discount on health and wellness products.',
            status: 'active',
            soldCount: 42,
            expiryDate: { toDate: () => new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) }, // 45 days from now
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'voucher-4',
            name: 'Education Voucher',
            category: 'education',
            price: 2000,
            discount: 20,
            stock: null, // Unlimited
            description: 'Special discount on educational courses and training programs.',
            status: 'inactive',
            soldCount: 8,
            expiryDate: { toDate: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }, // 90 days from now
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'voucher-5',
            name: 'Shopping Voucher',
            category: 'shopping',
            price: 1500,
            discount: 12,
            stock: 25,
            description: 'Enjoy 12% off on fashion and lifestyle products.',
            status: 'active',
            soldCount: 67,
            expiryDate: { toDate: () => new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }, // Expired 5 days ago
            createdAt: { toDate: () => new Date() }
          }
        ];
        
        setCompanies(demoCompanies);
        setVouchers(demoVouchers);
        setContactRequests([]);
        setFestivalImages([]);
        setBranches([]);
        
        console.log('✅ Demo data loaded successfully');
        setError('Running in demo mode - Firebase connection unavailable');
      }
      
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="overview-content">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{dashboardData.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-info">
            <h3>{dashboardData.totalCompanies}</h3>
            <p>Companies</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎫</div>
          <div className="stat-info">
            <h3>{dashboardData.activeVouchers}</h3>
            <p>Active Vouchers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{dashboardData.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">🆕</span>
              <div className="activity-details">
                <p>New user registration: john.doe@email.com</p>
                <small>2 minutes ago</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-details">
                <p>Voucher approved: Grocery Voucher #GV-2024-001</p>
                <small>15 minutes ago</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💳</span>
              <div className="activity-details">
                <p>Payment processed: ₹5,000 reimbursement</p>
                <small>1 hour ago</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📊</span>
              <div className="activity-details">
                <p>Monthly report generated</p>
                <small>3 hours ago</small>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn" onClick={() => setActiveTab('users')}>
              👥 Manage Users
            </button>
            <button className="action-btn" onClick={() => setActiveTab('vouchers')}>
              🎫 Review Vouchers
            </button>
            <button className="action-btn" onClick={() => setActiveTab('companies')}>
              🏢 Company Settings
            </button>
            <button className="action-btn" onClick={() => setActiveTab('reports')}>
              📊 Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-content">
      <div className="content-header">
        <h2>User Management</h2>
        <button className="primary-btn">+ Add New User</button>
      </div>
  
    </div>
  );

  const renderVouchers = () => (
    <div className="voucher-management-content">
      <div className="content-header">
        <h2>Voucher Management</h2>
        <div className="header-actions">
          <select 
            className="filter-select"
            value={voucherFilter}
            onChange={(e) => setVoucherFilter(e.target.value)}
          >
            <option value="all">All Vouchers ({vouchers.length})</option>
            <option value="active">Active ({vouchers.filter(v => v.status === 'active').length})</option>
            <option value="inactive">Inactive ({vouchers.filter(v => v.status === 'inactive').length})</option>
            <option value="expired">Expired ({vouchers.filter(v => v.expiryDate && new Date(v.expiryDate.toDate()) < new Date()).length})</option>
            <option value="low-stock">Low Stock ({vouchers.filter(v => v.stock && v.stock <= 10).length})</option>
            <optgroup label="By Category">
              <option value="grocery">Grocery ({vouchers.filter(v => v.category === 'grocery').length})</option>
              <option value="fuel">Fuel ({vouchers.filter(v => v.category === 'fuel').length})</option>
              <option value="health">Health ({vouchers.filter(v => v.category === 'health').length})</option>
              <option value="education">Education ({vouchers.filter(v => v.category === 'education').length})</option>
              <option value="shopping">Shopping ({vouchers.filter(v => v.category === 'shopping').length})</option>
              <option value="travel">Travel ({vouchers.filter(v => v.category === 'travel').length})</option>
              <option value="restaurant">Restaurant ({vouchers.filter(v => v.category === 'restaurant').length})</option>
              <option value="other">Other ({vouchers.filter(v => v.category === 'other').length})</option>
            </optgroup>
          </select>
        </div>
      </div>
      <p className="section-description">Create, manage and monitor all vouchers for the Cash Vapase system</p>
      
      <div className="management-sections">
        {/* Add New Voucher Form */}
        <div className="add-voucher-section">
          <h3>Add New Voucher</h3>
          <form onSubmit={handleVoucherSubmit} className="voucher-form">
            <div className="form-row">
              <div className="form-group">
                <label>Voucher Name</label>
                <input type="text" name="voucherName" placeholder="e.g., Grocery Voucher, Fuel Voucher" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="voucherCategory" required>
                  <option value="">Select Category</option>
                  <option value="grocery">Grocery</option>
                  <option value="fuel">Fuel</option>
                  <option value="health">Health</option>
                  <option value="education">Education</option>
                  <option value="shopping">Shopping</option>
                  <option value="travel">Travel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="other">Other</option>
          </select>
        </div>
      </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Face Value (₹)</label>
                <input type="number" name="voucherPrice" placeholder="e.g., 500, 1000" min="1" required />
              </div>
              <div className="form-group">
                <label>Discount (%)</label>
                <input type="number" name="voucherDiscount" placeholder="e.g., 10, 15" min="0" max="100" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Stock Quantity</label>
                <input type="number" name="voucherStock" placeholder="e.g., 100, unlimited" min="0" />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="date" name="voucherExpiry" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>Voucher Image</label>
              <input type="file" name="voucherImage" accept="image/*" />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea name="voucherDescription" rows="4" placeholder="Describe the voucher benefits and usage terms" required></textarea>
            </div>
            
            <button type="submit" className="primary-btn">Add Voucher</button>
          </form>
        </div>

        {/* Vouchers List */}
        <div className="vouchers-list-section">
          <h3>
            {voucherFilter === 'all' ? 'All Vouchers' : 
             voucherFilter === 'active' ? 'Active Vouchers' :
             voucherFilter === 'inactive' ? 'Inactive Vouchers' :
             voucherFilter === 'expired' ? 'Expired Vouchers' :
             voucherFilter === 'low-stock' ? 'Low Stock Vouchers' :
             `${voucherFilter.charAt(0).toUpperCase() + voucherFilter.slice(1)} Vouchers`
            } ({getFilteredVouchers().length})
          </h3>
          {getFilteredVouchers().length === 0 ? (
            <div className="no-data">
              <p>
                {voucherFilter === 'all' 
                  ? 'No vouchers added yet. Create your first voucher using the form above.'
                  : `No vouchers found for the selected filter: ${voucherFilter}`
                }
              </p>
            </div>
          ) : (
      <div className="vouchers-grid">
              {getFilteredVouchers().map((voucher) => (
                <div key={voucher.id} className="voucher-management-card">
          <div className="voucher-header">
                    {voucher.image && (
                      <img src={voucher.image} alt={voucher.name} className="voucher-image-small" />
                    )}
                    <div className="voucher-info">
                      <h4>{voucher.name}</h4>
                      <span className={`voucher-status ${getVoucherStatusDisplay(voucher).className}`}>
                        {getVoucherStatusDisplay(voucher).text}
                      </span>
                    </div>
                  </div>
                  
                  <div className="voucher-details">
                    <p><strong>Category:</strong> <span className="voucher-category">{voucher.category}</span></p>
                    <p><strong>Face Value:</strong> ₹{voucher.price}</p>
                    {voucher.discount && <p><strong>Discount:</strong> {voucher.discount}%</p>}
                    <p><strong>Stock:</strong> {voucher.stock || 'Unlimited'}</p>
                    <p><strong>Sold:</strong> {voucher.soldCount || 0}</p>
                    {voucher.expiryDate && (
                      <p><strong>Expires:</strong> {new Date(voucher.expiryDate.toDate()).toLocaleDateString()}</p>
                    )}
                  </div>
                  
          <div className="voucher-actions">
                    <button 
                      className="action-btn secondary"
                      onClick={() => viewVoucher(voucher)}
                    >
                      View
                    </button>
                    <button 
                      className="action-btn primary"
                      onClick={() => editVoucher(voucher)}
                    >
                      Edit
                    </button>
                    <button 
                      className={`action-btn ${voucher.status === 'active' ? 'warning' : 'success'}`}
                      onClick={() => toggleVoucherStatus(voucher.id, voucher.status === 'active' ? 'inactive' : 'active')}
                    >
                      {voucher.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      className="action-btn danger"
                      onClick={() => deleteVoucher(voucher.id)}
                    >
                      Delete
                    </button>
          </div>
        </div>
              ))}
          </div>
          )}
          </div>

        {/* Edit Voucher Form */}
        {editingVoucher && (
          <div className="edit-voucher-section">
            <h3>Edit Voucher: {editingVoucher.name}</h3>
            <form onSubmit={handleVoucherEditSubmit} className="voucher-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Voucher Name</label>
                  <input 
                    type="text" 
                    name="voucherName" 
                    defaultValue={editingVoucher.name}
                    required 
                  />
        </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="voucherCategory" defaultValue={editingVoucher.category} required>
                    <option value="">Select Category</option>
                    <option value="grocery">Grocery</option>
                    <option value="fuel">Fuel</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="shopping">Shopping</option>
                    <option value="travel">Travel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="other">Other</option>
                  </select>
      </div>
    </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Face Value (₹)</label>
                  <input 
                    type="number" 
                    name="voucherPrice" 
                    defaultValue={editingVoucher.price}
                    min="1" 
                    required 
                  />
      </div>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input 
                    type="number" 
                    name="voucherDiscount" 
                    defaultValue={editingVoucher.discount}
                    min="0" 
                    max="100" 
                  />
            </div>
          </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    name="voucherStock" 
                    defaultValue={editingVoucher.stock}
                    min="0" 
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="date" 
                    name="voucherExpiry" 
                    defaultValue={editingVoucher.expiryDate ? new Date(editingVoucher.expiryDate.toDate()).toISOString().split('T')[0] : ''}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Voucher Image (optional - leave empty to keep current)</label>
                <input type="file" name="voucherImage" accept="image/*" />
                  {editingVoucher.image && (
                    <div className="current-image">
                      <p>Current image:</p>
                      <img src={editingVoucher.image} alt="Current voucher" />
                    </div>
                  )}
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="voucherDescription" 
                  rows="4" 
                  defaultValue={editingVoucher.description}
                  required
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update Voucher</button>
                <button type="button" className="cancel-btn" onClick={cancelVoucherEdit}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* View Voucher Modal */}
        {viewingVoucher && (
          <div className="voucher-view-modal">
            <div className="modal-overlay" onClick={closeVoucherView}></div>
            <div className="modal-content">
              <div className="modal-header">
                <h3>{viewingVoucher.name}</h3>
                <button className="close-btn" onClick={closeVoucherView}>×</button>
              </div>
              <div className="modal-body">
                <div className="voucher-details">
                  {viewingVoucher.image && (
                    <div className="voucher-image-large">
                      <img src={viewingVoucher.image} alt={viewingVoucher.name} />
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Category:</strong> 
                    <span className="voucher-category-badge">{viewingVoucher.category}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Face Value:</strong> 
                    <span className="price-badge">₹{viewingVoucher.price}</span>
                  </div>
                  {viewingVoucher.discount > 0 && (
                    <div className="detail-row">
                      <strong>Discount:</strong> 
                      <span className="discount-badge">{viewingVoucher.discount}%</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Stock:</strong> 
                    <span>{viewingVoucher.stock || 'Unlimited'}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Sold Count:</strong> 
                    <span>{viewingVoucher.soldCount || 0}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Status:</strong> 
                    <span className={`status-badge ${viewingVoucher.status}`}>{viewingVoucher.status}</span>
                  </div>
                  {viewingVoucher.expiryDate && (
                    <div className="detail-row">
                      <strong>Expires:</strong> 
                      <span>{new Date(viewingVoucher.expiryDate.toDate()).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Description:</strong>
                    <p>{viewingVoucher.description}</p>
                  </div>
                  {viewingVoucher.createdAt && (
                    <div className="detail-row">
                      <strong>Created:</strong> 
                      <span>{new Date(viewingVoucher.createdAt.toDate()).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="action-btn primary" onClick={() => editVoucher(viewingVoucher)}>
                  Edit Voucher
                </button>
                <button className="action-btn secondary" onClick={closeVoucherView}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );


  const renderReports = () => (
    <div className="reports-content">
      <div className="content-header">
        <h2>Reports & Analytics</h2>
      </div>
      <div className="reports-grid">
        <div className="report-card">
          <h4>📊 User Analytics</h4>
          <p>Detailed user behavior and engagement metrics</p>
          <button className="action-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <h4>💰 Financial Report</h4>
          <p>Revenue, expenses, and financial summaries</p>
          <button className="action-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <h4>🎫 Voucher Analytics</h4>
          <p>Voucher usage patterns and statistics</p>
          <button className="action-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );

  const markContactAsRead = async (id) => {
    try {
      await contactService.updateContactStatus(id, 'read');
      const updatedRequests = contactRequests.map(request => 
        request.id === id ? { ...request, status: 'read' } : request
      );
      setContactRequests(updatedRequests);
    } catch (error) {
      console.error('Error updating contact status:', error);
      setError(handleFirebaseError(error));
    }
  };

  const deleteContactRequest = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact request?')) {
      try {
        await contactService.deleteContactMessage(id);
        const updatedRequests = contactRequests.filter(request => request.id !== id);
        setContactRequests(updatedRequests);
      } catch (error) {
        console.error('Error deleting contact request:', error);
        setError(handleFirebaseError(error));
      }
    }
  };

  const renderContactRequests = () => (
    <div className="contact-requests-content">
      <div className="content-header">
        <h2>Contact Requests</h2>
        <div className="header-stats">
          <span className="stat-badge unread">
            {contactRequests.filter(req => req.status === 'unread').length} Unread
          </span>
          <span className="stat-badge total">
            {contactRequests.length} Total
          </span>
        </div>
      </div>
      
      {contactRequests.length === 0 ? (
        <div className="no-data">
          <p>No contact requests yet.</p>
        </div>
      ) : (
        <div className="contact-requests-list">
          {contactRequests.map((request) => (
            <div key={request.id} className={`contact-request-card ${request.status}`}>
              <div className="request-header">
                <div className="request-info">
                  <h4 className="request-name">{request.name}</h4>
                  <span className="request-email">{request.email}</span>
                  <span className="request-date">
                    {new Date(request.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="request-status">
                  <span className={`status-badge ${request.status}`}>
                    {request.status === 'unread' ? '🔴 Unread' : '✅ Read'}
                  </span>
                </div>
              </div>
              
              <div className="request-subject">
                <h5>Subject: {request.subject}</h5>
              </div>
              
              <div className="request-message">
                <p>{request.message}</p>
              </div>
              
              <div className="request-actions">
                {request.status === 'unread' && (
                  <button 
                    className="action-btn success"
                    onClick={() => markContactAsRead(request.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button 
                  className="action-btn primary"
                  onClick={() => window.location.href = `mailto:${request.email}?subject=Re: ${request.subject}`}
                >
                  Reply via Email
                </button>
                <button 
                  className="action-btn danger"
                  onClick={() => deleteContactRequest(request.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const logoFile = formData.get('companyLogo');
    
    try {
      let logoUrl = '';
      
      if (logoFile) {
        // Upload logo to Firebase Storage
        const timestamp = Date.now();
        const fileName = `company_${timestamp}_${logoFile.name}`;
        const storageRef = ref(storage, `company-logos/${fileName}`);
        const snapshot = await uploadBytes(storageRef, logoFile);
        logoUrl = await getDownloadURL(snapshot.ref);
      }
      
      const newCompany = {
        name: formData.get('companyName'),
        description: formData.get('companyDescription'),
        category: formData.get('companyCategory'),
        website: formData.get('companyWebsite'),
        logo: logoUrl
      };
      
      const result = await companyService.addCompany(newCompany);
      
      if (result.success) {
        // Reload companies data
        await loadAllData();
        e.target.reset();
        alert('Company added successfully!');
      }
    } catch (error) {
      console.error('Error adding company:', error);
      setError(handleFirebaseError(error));
    }
  };

  const deleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        // Try Firebase first, fallback to demo mode
        try {
          await companyService.deleteCompany(id);
        } catch (firebaseError) {
          console.log('Demo mode: Simulating company deletion');
        }
        
        const updatedCompanies = companies.filter(company => company.id !== id);
        setCompanies(updatedCompanies);
        alert('Company deleted successfully!');
      } catch (error) {
        console.error('Error deleting company:', error);
        setError(handleFirebaseError(error));
      }
    }
  };

  // Company Edit/View Functions
  const editCompany = (company) => {
    setEditingCompany(company);
    setViewingCompany(null);
  };

  const viewCompany = (company) => {
    setViewingCompany(company);
    setEditingCompany(null);
  };

  const handleCompanyEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const updatedCompany = {
        ...editingCompany,
        name: formData.get('companyName'),
        category: formData.get('companyCategory'),
        website: formData.get('companyWebsite'),
        description: formData.get('companyDescription')
      };

      // Handle logo upload if new file is selected
      const logoFile = formData.get('companyLogo');
      if (logoFile && logoFile.size > 0) {
        const logoRef = ref(storage, `company-logos/${Date.now()}_${logoFile.name}`);
        await uploadBytes(logoRef, logoFile);
        updatedCompany.logo = await getDownloadURL(logoRef);
      }

      await companyService.updateCompany(editingCompany.id, updatedCompany);
      
      // Update local state
      const updatedCompanies = companies.map(company =>
        company.id === editingCompany.id ? { ...updatedCompany, id: editingCompany.id } : company
      );
      setCompanies(updatedCompanies);
      
      setEditingCompany(null);
      alert('Company updated successfully!');
    } catch (error) {
      console.error('Error updating company:', error);
      setError(handleFirebaseError(error));
    }
  };

  const cancelCompanyEdit = () => {
    setEditingCompany(null);
  };

  const closeCompanyView = () => {
    setViewingCompany(null);
  };

  // Voucher Management Functions
  const handleVoucherSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const newVoucher = {
        name: formData.get('voucherName'),
        category: formData.get('voucherCategory'),
        price: parseFloat(formData.get('voucherPrice')),
        discount: formData.get('voucherDiscount') ? parseFloat(formData.get('voucherDiscount')) : 0,
        stock: formData.get('voucherStock') ? parseInt(formData.get('voucherStock')) : null,
        expiryDate: new Date(formData.get('voucherExpiry')),
        description: formData.get('voucherDescription')
      };

      // Handle image upload if provided
      const imageFile = formData.get('voucherImage');
      if (imageFile && imageFile.size > 0) {
        const imageRef = ref(storage, `voucher-images/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        newVoucher.image = await getDownloadURL(imageRef);
      }
      
      const result = await voucherService.addVoucher(newVoucher);
      
      if (result.success) {
        // Reload vouchers data
        await loadAllData();
        e.target.reset();
        alert('Voucher added successfully!');
      }
    } catch (error) {
      console.error('Error adding voucher:', error);
      setError(handleFirebaseError(error));
    }
  };

  const deleteVoucher = async (id) => {
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      try {
        // Try Firebase first, fallback to demo mode
        try {
          await voucherService.deleteVoucher(id);
        } catch (firebaseError) {
          console.log('Demo mode: Simulating voucher deletion');
        }
        
        const updatedVouchers = vouchers.filter(voucher => voucher.id !== id);
        setVouchers(updatedVouchers);
        alert('Voucher deleted successfully!');
      } catch (error) {
        console.error('Error deleting voucher:', error);
        setError(handleFirebaseError(error));
      }
    }
  };

  const toggleVoucherStatus = async (id, newStatus) => {
    try {
      // Try Firebase first, fallback to demo mode
      try {
        await voucherService.updateVoucherStatus(id, newStatus);
      } catch (firebaseError) {
        console.log('Demo mode: Simulating voucher status update');
      }
      
      const updatedVouchers = vouchers.map(voucher =>
        voucher.id === id ? { ...voucher, status: newStatus } : voucher
      );
      setVouchers(updatedVouchers);
      alert(`Voucher ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error updating voucher status:', error);
      setError(handleFirebaseError(error));
    }
  };

  const editVoucher = (voucher) => {
    setEditingVoucher(voucher);
    setViewingVoucher(null);
  };

  const viewVoucher = (voucher) => {
    setViewingVoucher(voucher);
    setEditingVoucher(null);
  };

  const handleVoucherEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const updatedVoucher = {
        ...editingVoucher,
        name: formData.get('voucherName'),
        category: formData.get('voucherCategory'),
        price: parseFloat(formData.get('voucherPrice')),
        discount: formData.get('voucherDiscount') ? parseFloat(formData.get('voucherDiscount')) : 0,
        stock: formData.get('voucherStock') ? parseInt(formData.get('voucherStock')) : null,
        expiryDate: new Date(formData.get('voucherExpiry')),
        description: formData.get('voucherDescription')
      };

      // Handle image upload if new file is selected
      const imageFile = formData.get('voucherImage');
      if (imageFile && imageFile.size > 0) {
        const imageRef = ref(storage, `voucher-images/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        updatedVoucher.image = await getDownloadURL(imageRef);
      }

      await voucherService.updateVoucher(editingVoucher.id, updatedVoucher);
      
      // Update local state
      const updatedVouchers = vouchers.map(voucher =>
        voucher.id === editingVoucher.id ? { ...updatedVoucher, id: editingVoucher.id } : voucher
      );
      setVouchers(updatedVouchers);
      
      setEditingVoucher(null);
      alert('Voucher updated successfully!');
    } catch (error) {
      console.error('Error updating voucher:', error);
      setError(handleFirebaseError(error));
    }
  };

  const cancelVoucherEdit = () => {
    setEditingVoucher(null);
  };

  const closeVoucherView = () => {
    setViewingVoucher(null);
  };

  // Filter vouchers based on selected filter
  const getFilteredVouchers = () => {
    if (voucherFilter === 'all') {
      return vouchers;
    }
    return vouchers.filter(voucher => {
      switch (voucherFilter) {
        case 'active':
          return voucher.status === 'active';
        case 'inactive':
          return voucher.status === 'inactive';
        case 'expired':
          return voucher.expiryDate && new Date(voucher.expiryDate.toDate()) < new Date();
        case 'low-stock':
          return voucher.stock && voucher.stock <= 10;
        case 'grocery':
        case 'fuel':
        case 'health':
        case 'education':
        case 'shopping':
        case 'travel':
        case 'restaurant':
        case 'other':
          return voucher.category === voucherFilter;
        default:
          return true;
      }
    });
  };

  // Get voucher status with additional indicators
  const getVoucherStatusDisplay = (voucher) => {
    const isExpired = voucher.expiryDate && new Date(voucher.expiryDate.toDate()) < new Date();
    const isLowStock = voucher.stock && voucher.stock <= 10;
    
    if (isExpired) {
      return { status: 'expired', text: 'Expired', className: 'expired' };
    }
    if (isLowStock) {
      return { status: 'low-stock', text: `${voucher.status} (Low Stock)`, className: `${voucher.status} low-stock` };
    }
    return { status: voucher.status, text: voucher.status, className: voucher.status };
  };

  // Branch Management Functions
  const handleBranchSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const newBranch = {
        name: formData.get('branchName'),
        address: formData.get('branchAddress'),
        phone: formData.get('branchPhone'),
        email: formData.get('branchEmail'),
        mapEmbed: formData.get('branchMapEmbed'),
        mapLink: formData.get('branchMapLink'),
        pinName: formData.get('branchPinName'),
        isMain: formData.get('isMain') === 'on'
      };
      
      const result = await branchService.addBranch(newBranch);
      
      if (result.success) {
        // Reload branches data
        await loadAllData();
        e.target.reset();
        alert('Branch added successfully!');
      }
    } catch (error) {
      console.error('Error adding branch:', error);
      setError(handleFirebaseError(error));
    }
  };

  const deleteBranch = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await branchService.deleteBranch(id);
        const updatedBranches = branches.filter(branch => branch.id !== id);
        setBranches(updatedBranches);
        
        // Update localStorage
        localStorage.setItem('wyenfos_branches', JSON.stringify(updatedBranches));
        
        // Emit event to notify other components
        branchEvents.emit();
      } catch (error) {
        console.error('Error deleting branch:', error);
        setError(handleFirebaseError(error));
      }
    }
  };

  const toggleMainBranch = async (id) => {
    try {
      await branchService.setMainBranch(id);
      const updatedBranches = branches.map(branch => ({
        ...branch,
        isMain: branch.id === id
      }));
      setBranches(updatedBranches);
      
      // Update localStorage
      localStorage.setItem('wyenfos_branches', JSON.stringify(updatedBranches));
      
      // Emit event to notify other components
      branchEvents.emit();
    } catch (error) {
      console.error('Error setting main branch:', error);
      setError(handleFirebaseError(error));
    }
  };

  const editBranch = (branch) => {
    setEditingBranch(branch);
  };

  const handleBranchEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedBranchData = {
      name: formData.get('branchName'),
      address: formData.get('branchAddress'),
      phone: formData.get('branchPhone'),
      email: formData.get('branchEmail'),
      mapEmbed: formData.get('branchMapEmbed'),
      mapLink: formData.get('branchMapLink'),
      pinName: formData.get('branchPinName'),
      isMain: formData.get('isMain') === 'on'
    };
    
    try {
      // Update branch in Firestore
      await branchService.updateBranch(editingBranch.id, updatedBranchData);
      
      // Update local state
      const updatedBranch = {
        ...editingBranch,
        ...updatedBranchData,
        updatedAt: new Date().toISOString()
      };
      
      const updatedBranches = branches.map(branch => 
        branch.id === editingBranch.id ? updatedBranch : branch
      );
      setBranches(updatedBranches);
      localStorage.setItem('wyenfos_branches', JSON.stringify(updatedBranches));
      
      // Emit event to notify other components
      branchEvents.emit();
      
      setEditingBranch(null);
      setSuccess('Branch updated successfully in Firestore!');
      setError('');
    } catch (error) {
      console.error('Error updating branch:', error);
      setError(handleFirebaseError(error));
    }
  };

  const cancelEdit = () => {
    setEditingBranch(null);
  };

  const handleFestivalImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get('festivalImage');
    
    if (imageFile) {
      try {
        const festivalData = {
          festivalName: formData.get('festivalName'),
          description: formData.get('festivalDescription'),
          particleEffect: formData.get('particleEffect'),
          descriptionColor: formData.get('descriptionColor') || '#ffffff',
          descriptionFontSize: formData.get('descriptionFontSize') || '48',
          descriptionFontFamily: formData.get('descriptionFontFamily') || 'Arial, sans-serif',
          isActive: false
        };

        // Festival data with styling options ready to save
        
        const result = await festivalService.uploadFestivalImage(imageFile, festivalData);
        
        if (result.success) {
          // Reload festival images data
          await loadAllData();
          e.target.reset();
          alert('Festival image added successfully!');
        }
      } catch (error) {
        console.error('Error uploading festival image:', error);
        setError(handleFirebaseError(error));
      }
    } else {
      alert('Please select an image file.');
    }
  };

  const toggleFestivalImageStatus = async (id) => {
    try {
      const currentImage = festivalImages.find(img => img.id === id);
      if (currentImage) {
        await festivalService.updateFestivalImageStatus(id, !currentImage.isActive);
        const updatedImages = festivalImages.map(img => 
          img.id === id ? { ...img, isActive: !img.isActive } : img
        );
        setFestivalImages(updatedImages);
      }
    } catch (error) {
      console.error('Error updating festival image status:', error);
      setError(handleFirebaseError(error));
    }
  };

  const deleteFestivalImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this festival image?')) {
      try {
        const currentImage = festivalImages.find(img => img.id === id);
        if (currentImage) {
          await festivalService.deleteFestivalImage(id, currentImage.fileName);
          const updatedImages = festivalImages.filter(img => img.id !== id);
          setFestivalImages(updatedImages);
        }
      } catch (error) {
        console.error('Error deleting festival image:', error);
        setError(handleFirebaseError(error));
      }
    }
  };

  const getParticleEffectDisplay = (effect) => {
    const effectMap = {
      'flower-petals': '🌸 Flower Petals',
      'falling-stars': '⭐ Falling Stars',
      'moon-lights': '🌙 Moon & Lights',
      'firecrackers': '💥 Firecrackers',
      'color-powder': '🎨 Color Powder',
      'lamp-vilakku': '🪔 Lamp Vilakku',
      'golden-sparkles': '✨ Golden Sparkles',
      'hearts': '💖 Floating Hearts',
      'snowflakes': '❄️ Snowflakes',
      'confetti': '🎊 Confetti',
      'none': '🚫 No Effect'
    };
    return effectMap[effect] || '⭐ Default Stars';
  };

  const editFestivalImage = (festival) => {
    setEditingFestival(festival);
  };

  const cancelFestivalEdit = () => {
    setEditingFestival(null);
  };

  const handleFestivalEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const updatedFestival = {
        ...editingFestival,
        festivalName: formData.get('festivalName'),
        description: formData.get('festivalDescription'),
        particleEffect: formData.get('particleEffect'),
        descriptionColor: formData.get('descriptionColor') || editingFestival.descriptionColor || '#ffffff',
        descriptionFontSize: formData.get('descriptionFontSize') || editingFestival.descriptionFontSize || '48',
        descriptionFontFamily: formData.get('descriptionFontFamily') || editingFestival.descriptionFontFamily || 'Arial, sans-serif'
      };

      // Updated festival data with styling options

      // Handle image upload if new file is selected
      const imageFile = formData.get('festivalImage');
      if (imageFile && imageFile.size > 0) {
        // Upload new image and get URL
        const result = await festivalService.uploadFestivalImage(imageFile, {
          festivalName: updatedFestival.festivalName,
          description: updatedFestival.description,
          particleEffect: updatedFestival.particleEffect,
          isActive: editingFestival.isActive
        });
        
        if (result.success) {
          // Delete old image and update with new one
          await festivalService.deleteFestivalImage(editingFestival.id, editingFestival.fileName);
          
          // Reload data to get the new festival image
          await loadAllData();
          setEditingFestival(null);
          alert('Festival image updated successfully!');
          return;
        }
      } else {
        // Update only the metadata without changing the image
        await festivalService.updateFestivalImageMetadata(editingFestival.id, {
          festivalName: updatedFestival.festivalName,
          description: updatedFestival.description,
          particleEffect: updatedFestival.particleEffect
        });
      }
      
      // Update local state
      const updatedFestivals = festivalImages.map(festival =>
        festival.id === editingFestival.id ? { ...updatedFestival, id: editingFestival.id } : festival
      );
      setFestivalImages(updatedFestivals);
      
      setEditingFestival(null);
      alert('Festival image updated successfully!');
    } catch (error) {
      console.error('Error updating festival image:', error);
      setError(handleFirebaseError(error));
    }
  };

  const renderCompanyManagement = () => (
    <div className="company-management-content">
      <div className="content-header">
        <h2>Company Management</h2>
        <p className="section-description">Manage all your companies - view details, edit information, and maintain company records</p>
      </div>
      
      <div className="management-sections">
        {/* Add New Company Form */}
        <div className="add-company-section">
          <h3>Add New Company</h3>
          <form onSubmit={handleCompanySubmit} className="company-form">
            <div className="form-row">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="companyName" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="companyCategory" required>
                  <option value="">Select Category</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Website URL</label>
                <input type="url" name="companyWebsite" />
              </div>
              <div className="form-group">
                <label>Company Logo</label>
                <input type="file" name="companyLogo" accept="image/*" />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="companyDescription" rows="4" required></textarea>
            </div>
            <button type="submit" className="primary-btn">Add Company</button>
          </form>
        </div>

        {/* Companies List */}
        <div className="companies-list-section">
          <h3>Existing Companies ({companies.length})</h3>
          {companies.length === 0 ? (
            <div className="no-data">
              <p>No companies added yet.</p>
            </div>
          ) : (
            <div className="companies-grid">
              {companies.map((company) => (
                <div key={company.id} className="company-management-card">
                  <div className="company-header">
                    {company.logo && (
                      <img src={company.logo} alt={company.name} className="company-logo-small" />
                    )}
                    <div className="company-info">
                      <h4>{company.name}</h4>
                      <span className="company-category">{company.category}</span>
                    </div>
                  </div>
                  <p className="company-desc">{company.description}</p>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="company-website">
                      Visit Website
                    </a>
                  )}
                  <div className="company-actions">
                    <button 
                      className="action-btn secondary"
                      onClick={() => viewCompany(company)}
                    >
                      View
                    </button>
                    <button 
                      className="action-btn primary"
                      onClick={() => editCompany(company)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn danger"
                      onClick={() => deleteCompany(company.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Company Form */}
        {editingCompany && (
          <div className="edit-company-section">
            <h3>Edit Company: {editingCompany.name}</h3>
            <form onSubmit={handleCompanyEditSubmit} className="company-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    defaultValue={editingCompany.name}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="companyCategory" defaultValue={editingCompany.category} required>
                    <option value="">Select Category</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Website URL</label>
                  <input 
                    type="url" 
                    name="companyWebsite" 
                    defaultValue={editingCompany.website}
                  />
                </div>
                <div className="form-group">
                  <label>Company Logo (optional - leave empty to keep current)</label>
                  <input type="file" name="companyLogo" accept="image/*" />
                  {editingCompany.logo && (
                    <div className="current-logo">
                      <p>Current logo:</p>
                      <img src={editingCompany.logo} alt="Current logo" style={{width: '100px', height: '60px', objectFit: 'contain'}} />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="companyDescription" 
                  rows="4" 
                  defaultValue={editingCompany.description}
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update Company</button>
                <button type="button" className="cancel-btn" onClick={cancelCompanyEdit}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* View Company Modal */}
        {viewingCompany && (
          <div className="company-view-modal">
            <div className="modal-overlay" onClick={closeCompanyView}></div>
            <div className="modal-content">
              <div className="modal-header">
                <h3>{viewingCompany.name}</h3>
                <button className="close-btn" onClick={closeCompanyView}>×</button>
              </div>
              <div className="modal-body">
                <div className="company-details">
                  {viewingCompany.logo && (
                    <div className="company-logo-large">
                      <img src={viewingCompany.logo} alt={viewingCompany.name} />
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Category:</strong> 
                    <span className="company-category-badge">{viewingCompany.category}</span>
                  </div>
                  {viewingCompany.website && (
                    <div className="detail-row">
                      <strong>Website:</strong> 
                      <a href={viewingCompany.website} target="_blank" rel="noopener noreferrer">
                        {viewingCompany.website}
                      </a>
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Description:</strong>
                    <p>{viewingCompany.description}</p>
                  </div>
                  {viewingCompany.createdAt && (
                    <div className="detail-row">
                      <strong>Created:</strong> 
                      <span>{new Date(viewingCompany.createdAt.toDate()).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="action-btn primary" onClick={() => editCompany(viewingCompany)}>
                  Edit Company
                </button>
                <button className="action-btn secondary" onClick={closeCompanyView}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFestivalManagement = () => (
    <div className="festival-management-content">
      <div className="content-header">
        <h2>Festival Background Management</h2>
        <p className="section-description">Manage festival background images for the main content page</p>
      </div>
      
      <div className="management-sections">
        {/* Add New Festival Image Form */}
        <div className="add-festival-section">
          <h3>Add New Festival Image</h3>
          <form onSubmit={handleFestivalImageSubmit} className="festival-form">
            <div className="form-row">
              <div className="form-group">
                <label>Festival Name</label>
                <input type="text" name="festivalName" placeholder="e.g., Onam, Vishu, Christmas" required />
              </div>
              <div className="form-group">
                <label>Festival Image</label>
                <input type="file" name="festivalImage" accept="image/*" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Particle Effect</label>
                <select name="particleEffect" required>
                  <option value="">Select Effect</option>
                  <option value="flower-petals">🌸 Flower Petals (Onam Style)</option>
                  <option value="falling-stars">⭐ Falling Stars (Christmas Style)</option>
                  <option value="moon-lights">🌙 Moon & Lights (Eid/Ramadan Style)</option>
                  <option value="firecrackers">💥 Firecrackers (Diwali/Vishu Style)</option>
                  <option value="color-powder">🎨 Color Powder (Holi Style)</option>
                  <option value="lamp-vilakku">🪔 Lamp Vilakku (Navarathri Style)</option>
                  <option value="golden-sparkles">✨ Golden Sparkles</option>
                  <option value="hearts">💖 Floating Hearts</option>
                  <option value="snowflakes">❄️ Snowflakes</option>
                  <option value="confetti">🎊 Confetti</option>
                  <option value="none">No Effect</option>
                </select>
              </div>
              <div className="form-group">
                <label>Font Size (px)</label>
                <select name="descriptionFontSize">
                  <option value="14">14px - Small</option>
                  <option value="16">16px - Medium</option>
                  <option value="18">18px - Small Default</option>
                  <option value="20">20px - Large</option>
                  <option value="22">22px - Extra Large</option>
                  <option value="24">24px - Huge</option>
                  <option value="32">32px - Very Large</option>
                  <option value="40">40px - Super Large</option>
                  <option value="48" selected>48px - Massive (Recommended)</option>
                  <option value="56">56px - Giant</option>
                  <option value="64">64px - Enormous</option>
                  <option value="72">72px - Colossal</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Description</label>
                <textarea name="festivalDescription" rows="3" placeholder="Brief description of the festival (appears as animated text)"></textarea>
              </div>
              <div className="form-group">
                <label>Font Family</label>
                <select name="descriptionFontFamily">
                  <option value="Arial, sans-serif" selected>Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                  <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                  <option value="Impact, sans-serif">Impact</option>
                  <option value="'Lucida Console', monospace">Lucida Console</option>
                  <option value="'Palatino Linotype', serif">Palatino</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Description Color</label>
                <input type="color" name="descriptionColor" defaultValue="#ffffff" title="Choose text color" />
              </div>
            </div>
            <button type="submit" className="primary-btn">Add Festival Image</button>
          </form>
        </div>

        {/* Festival Images List */}
        <div className="festival-images-section">
          <h3>Festival Images ({festivalImages.length})</h3>
          {festivalImages.length === 0 ? (
            <div className="no-data">
              <p>No festival images added yet.</p>
            </div>
          ) : (
            <div className="festival-images-grid">
              {festivalImages.map((festival) => (
                <div key={festival.id} className={`festival-card ${festival.isActive ? 'active' : ''}`}>
                  <div className="festival-image-container">
                    <LazyImage 
                      src={festival.imageUrl} 
                      alt={festival.festivalName} 
                      className="festival-image"
                      placeholder={
                        <div className="festival-loading-placeholder">
                          <div className="loading-spinner">
                            <div className="spinner"></div>
                            <span>Loading...</span>
                          </div>
                        </div>
                      }
                    />
                    {festival.isActive && <div className="active-badge">Currently Active</div>}
                  </div>
                  <div className="festival-info">
                    <h4>{festival.festivalName}</h4>
                    <div className="festival-effect">
                      <strong>Effect:</strong> {getParticleEffectDisplay(festival.particleEffect)}
                    </div>
                    <p>{festival.description}</p>
                    <div className="festival-actions">
                      <button 
                        className="action-btn primary"
                        onClick={() => editFestivalImage(festival)}
                      >
                        Edit
                      </button>
                      <button 
                        className={`action-btn ${festival.isActive ? 'danger' : 'success'}`}
                        onClick={() => toggleFestivalImageStatus(festival.id)}
                      >
                        {festival.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="action-btn danger"
                        onClick={() => deleteFestivalImage(festival.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Festival Image Form */}
        {editingFestival && (
          <div className="edit-festival-section">
            <h3>Edit Festival Image: {editingFestival.festivalName}</h3>
            <form onSubmit={handleFestivalEditSubmit} className="festival-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Festival Name</label>
                  <input 
                    type="text" 
                    name="festivalName" 
                    defaultValue={editingFestival.festivalName}
                    placeholder="e.g., Onam, Vishu, Christmas" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Festival Image (optional - leave empty to keep current)</label>
                  <input type="file" name="festivalImage" accept="image/*" />
                  {editingFestival.imageUrl && (
                    <div className="current-image">
                      <p>Current image:</p>
                      <img src={editingFestival.imageUrl} alt="Current festival" />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Particle Effect</label>
                  <select name="particleEffect" defaultValue={editingFestival.particleEffect} required>
                    <option value="">Select Effect</option>
                    <option value="flower-petals">🌸 Flower Petals (Onam Style)</option>
                    <option value="falling-stars">⭐ Falling Stars (Christmas Style)</option>
                    <option value="moon-lights">🌙 Moon & Lights (Eid/Ramadan Style)</option>
                    <option value="firecrackers">💥 Firecrackers (Diwali/Vishu Style)</option>
                    <option value="color-powder">🎨 Color Powder (Holi Style)</option>
                    <option value="lamp-vilakku">🪔 Lamp Vilakku (Navarathri Style)</option>
                    <option value="golden-sparkles">✨ Golden Sparkles</option>
                    <option value="hearts">💖 Floating Hearts</option>
                    <option value="snowflakes">❄️ Snowflakes</option>
                    <option value="confetti">🎊 Confetti</option>
                    <option value="none">No Effect</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Font Size (px)</label>
                  <select name="descriptionFontSize" defaultValue={editingFestival.descriptionFontSize || '48'}>
                    <option value="14">14px - Small</option>
                    <option value="16">16px - Medium</option>
                    <option value="18">18px - Default</option>
                    <option value="20">20px - Large</option>
                    <option value="22">22px - Extra Large</option>
                    <option value="24">24px - Huge</option>
                    <option value="32">32px - Very Large</option>
                    <option value="40">40px - Super Large</option>
                    <option value="48">48px - Massive</option>
                    <option value="56">56px - Giant</option>
                    <option value="64">64px - Enormous</option>
                    <option value="72">72px - Colossal</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="festivalDescription" 
                    rows="3" 
                    defaultValue={editingFestival.description}
                    placeholder="Brief description of the festival (appears as animated text)"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Font Family</label>
                  <select name="descriptionFontFamily" defaultValue={editingFestival.descriptionFontFamily || 'Arial, sans-serif'}>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                    <option value="Impact, sans-serif">Impact</option>
                    <option value="'Lucida Console', monospace">Lucida Console</option>
                    <option value="'Palatino Linotype', serif">Palatino</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Description Color</label>
                  <input 
                    type="color" 
                    name="descriptionColor" 
                    defaultValue={editingFestival.descriptionColor || '#ffffff'} 
                    title="Choose text color" 
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update Festival Image</button>
                <button type="button" className="cancel-btn" onClick={cancelFestivalEdit}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  const renderBranchManagement = () => (
    <div className="branch-management-content">
      <div className="content-header">
        <h2>Branch Management</h2>
        <p className="section-description">Manage Wyenfos branch locations and contact information</p>
      </div>
      
      <div className="management-sections">
        {/* Add New Branch Form */}
        <div className="add-branch-section">
          <h3>Add New Branch</h3>
          <form onSubmit={handleBranchSubmit} className="branch-form">
            <div className="form-row">
              <div className="form-group">
                <label>Branch Name</label>
                <input type="text" name="branchName" placeholder="e.g., Main Branch, Kochi Branch" required />
              </div>
              <div className="form-group">
                <label>Pin Name (for map)</label>
                <input type="text" name="branchPinName" placeholder="e.g., CJ Tower, Lulu Mall" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>Full Address</label>
              <textarea name="branchAddress" placeholder="Complete address with city, state, pincode" required rows="3"></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="branchPhone" placeholder="e.g., 91+ 70124 78846" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="branchEmail" placeholder="e.g., branch@wyenfos.com" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>Google Maps Embed URL</label>
              <input type="url" name="branchMapEmbed" placeholder="https://www.google.com/maps/embed?pb=..." required />
              <small>Get this from Google Maps → Share → Embed a map</small>
            </div>
            
            <div className="form-group">
              <label>Google Maps Link</label>
              <input type="url" name="branchMapLink" placeholder="https://maps.google.com/?q=..." required />
              <small>Get this from Google Maps → Share → Copy link</small>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="isMain" />
                Set as Main Branch (Head Office)
              </label>
            </div>
            
            <button type="submit" className="submit-btn">Add Branch</button>
          </form>
        </div>

        {/* Edit Branch Form */}
        {editingBranch && (
          <div className="edit-branch-section">
            <h3>Edit Branch: {editingBranch.name}</h3>
            <form onSubmit={handleBranchEditSubmit} className="branch-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Branch Name</label>
                  <input 
                    type="text" 
                    name="branchName" 
                    defaultValue={editingBranch.name}
                    placeholder="e.g., Main Branch, Kochi Branch" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Pin Name (for map)</label>
                  <input 
                    type="text" 
                    name="branchPinName" 
                    defaultValue={editingBranch.pinName}
                    placeholder="e.g., CJ Tower, Lulu Mall" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Full Address</label>
                <textarea 
                  name="branchAddress" 
                  defaultValue={editingBranch.address}
                  placeholder="Complete address with city, state, pincode" 
                  required 
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="branchPhone" 
                    defaultValue={editingBranch.phone}
                    placeholder="e.g., 91+ 70124 78846" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="branchEmail" 
                    defaultValue={editingBranch.email}
                    placeholder="e.g., branch@wyenfos.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Google Maps Embed URL</label>
                <input 
                  type="url" 
                  name="branchMapEmbed" 
                  defaultValue={editingBranch.mapEmbed}
                  placeholder="https://www.google.com/maps/embed?pb=..." 
                  required 
                />
                <small>Get this from Google Maps → Share → Embed a map</small>
              </div>
              
              <div className="form-group">
                <label>Google Maps Link</label>
                <input 
                  type="url" 
                  name="branchMapLink" 
                  defaultValue={editingBranch.mapLink}
                  placeholder="https://maps.google.com/?q=..." 
                  required 
                />
                <small>Get this from Google Maps → Share → Copy link</small>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="isMain" 
                    defaultChecked={editingBranch.isMain}
                  />
                  Set as Main Branch (Head Office)
                </label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update Branch</button>
                <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Branches List */}
        <div className="branches-list-section">
          <h3>Existing Branches ({branches.length})</h3>
          {branches.length === 0 ? (
            <div className="no-data">
              <p>No branches added yet. Add your first branch using the form above.</p>
            </div>
          ) : (
            <div className="branches-grid">
              {branches.map(branch => (
                <div key={branch.id} className={`branch-card ${branch.isMain ? 'main-branch' : ''}`}>
                  <div className="branch-header">
                    <h4>{branch.name}</h4>
                    {branch.isMain && <span className="main-badge">Main Branch</span>}
                  </div>
                  
                  <div className="branch-details">
                    <p><strong>Address:</strong> {branch.address}</p>
                    <p><strong>Phone:</strong> {branch.phone}</p>
                    <p><strong>Email:</strong> {branch.email}</p>
                    <p><strong>Pin Name:</strong> {branch.pinName}</p>
                  </div>
                  
                  <div className="branch-actions">
                    <button 
                      className="action-btn secondary"
                      onClick={() => editBranch(branch)}
                    >
                      Edit
                    </button>
                    {!branch.isMain && (
                      <button 
                        className="action-btn primary"
                        onClick={() => toggleMainBranch(branch.id)}
                      >
                        Set as Main
                      </button>
                    )}
                    <button 
                      className="action-btn danger"
                      onClick={() => deleteBranch(branch.id)}
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="branch-meta">
                    <small>Added: {new Date(branch.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'vouchers': return renderVouchers();
      case 'companies': return renderCompanyManagement();
      case 'reports': return renderReports();
      case 'contacts': return renderContactRequests();
      case 'festival-management': return renderFestivalManagement();
      case 'branch-management': return renderBranchManagement();
      default: return renderOverview();
    }
  };

  if (!adminUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`admin-dashboard ${mobileSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Error Display */}
      {error && (
        <div className="error-banner" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          zIndex: 1000,
          fontSize: '14px'
        }}>
          {error}
          <button 
            onClick={() => setError('')}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: '1px solid white',
              color: 'white',
              padding: '2px 8px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Success Display */}
      {success && (
        <div className="success-banner" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          zIndex: 1000,
          fontSize: '14px'
        }}>
          {success}
          <button 
            onClick={() => setSuccess('')}
            style={{
              marginLeft: '10px',
              background: 'none',
              border: '1px solid white',
              color: 'white',
              padding: '2px 8px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          color: 'white',
          fontSize: '18px'
        }}>
          Loading data from Firebase...
        </div>
      )}
      
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeMobileSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <img 
              src="/assets/wyenfos.jpeg" 
              alt="Wyenfos" 
              className="sidebar-logo"
              onError={(e) => {
                console.log('Admin sidebar logo failed to load:', e.target.src);
                e.target.style.backgroundColor = 'red';
                e.target.style.display = 'block';
              }}
              onLoad={(e) => {
                console.log('Admin sidebar logo loaded successfully:', e.target.src);
              }}
            />
            {!sidebarCollapsed && <span className="logo-text">Admin</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => {
              // On mobile, close the sidebar when arrow is clicked
              if (window.innerWidth <= 768) {
                closeMobileSidebar();
              } else {
                // On desktop, toggle collapse/expand
                setSidebarCollapsed(!sidebarCollapsed);
              }
            }}
          >
            <span className="desktop-arrow">{sidebarCollapsed ? '→' : '←'}</span>
            <span className="mobile-close">×</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('overview');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">📊</span>
            {!sidebarCollapsed && <span className="nav-text">Dashboard</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('users');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">👥</span>
            {!sidebarCollapsed && <span className="nav-text">Users</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'vouchers' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('vouchers');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">🎫</span>
            {!sidebarCollapsed && <span className="nav-text">Vouchers</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('companies');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">🏢</span>
            {!sidebarCollapsed && <span className="nav-text">Manage Companies</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('reports');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">📈</span>
            {!sidebarCollapsed && <span className="nav-text">Reports</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('contacts');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">📧</span>
            {!sidebarCollapsed && <span className="nav-text">Contact Requests</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'festival-management' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('festival-management');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">🎉</span>
            {!sidebarCollapsed && <span className="nav-text">Festival Images</span>}
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'branch-management' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('branch-management');
              closeMobileSidebar();
            }}
          >
            <span className="nav-icon">🏢</span>
            {!sidebarCollapsed && <span className="nav-text">Branch Management</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => {
            handleLogout();
            closeMobileSidebar();
          }}>
            <span className="nav-icon">🚪</span>
            {!sidebarCollapsed && <span className="nav-text">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {adminUser.name}!</p>
          </div>
          <div className="header-right">
            <button 
              className="mobile-only-toggle"
              onClick={toggleMobileSidebar}
              aria-label="Toggle mobile sidebar"
            >
              ☰
            </button>
            </div>
        </header>

        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
