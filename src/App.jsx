import './App.css';
import Login from './pages/Auth/login';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterAdmin from './pages/Auth/RegisterAdmin';
import ClerkDashboard from './pages/clerk/ClerkDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import InviteAdmin from './pages/merchant/components/InviteAdmin';
import Stores from './pages/merchant/components/Stores';
import AddProducts from './pages/clerk/components/AddProducts';
import AddClerk from './pages/admin/components/AddClerk';
import AddPayments from './pages/admin/components/AddPayments';
import ClerkManagement from './pages/admin/ClerkManagement';
import AdminManagement from './pages/merchant/components/AdminManagement';
import ViewPerformance from './pages/merchant/components/ViewPerformance';
import MerchantSideBar from './pages/merchant/MerchantSideBar';
import ViewPerformanceProduct from './pages/merchant/components/ViewPerformanceProducts';


export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/clerk/dashboard" element={<ClerkDashboard />} />
        <Route path="/merchant/register" element={<InviteAdmin />} />
        <Route path="/merchant/store/:id/register-admin" element={<RegisterAdmin />} />
        <Route path="/merchant/stores" element={<Stores />} />
        <Route path="/admin/add-clerk" element={<AddClerk />} />
        <Route path="/admin/add-payments" element={<AddPayments />} />
        <Route path="/admin/clerk-management" element={<ClerkManagement />} /> 
        <Route path="/clerk/register-product" element={<AddProducts />} />
        <Route path="/merchant/admin-management" element={<AdminManagement />} />
        <Route path="/merchant/view-performance" element={<ViewPerformance />} />
        <Route path="/merchant/view-performance-product"  element={<ViewPerformanceProduct/>}/>
        <Route path="/clerk/dashboard" element={<ClerkDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


