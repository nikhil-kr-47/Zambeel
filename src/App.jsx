import React, { useState } from 'react';
import AlertBanner from './components/AlertBanner';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GetStartedPage from './pages/GetStartedPage';
import OrdersPage from './pages/OrdersPage';
import InvoicesPage from './pages/InvoicesPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import { USERS } from './data/mockData';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('get-started');
  const [currentUser, setCurrentUser] = useState(USERS[0]);

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FD] overflow-hidden font-sans select-none">
      {/* 1. TOP FIXED BAR: Yellow Ticker Alert Banner (Full solid yellow across entire height) */}
      <div className="flex-shrink-0 z-40 bg-[#FFFF00]">
        <AlertBanner />
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* 2. Left Sidebar (Fixed / independent scroll, sticky WhatsApp) */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage={activePage}
          setActivePage={setActivePage}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* 3. Main Content Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navbar with Centered Zambeel Logo (PERMANENTLY FIXED AT TOP) */}
          <div className="flex-shrink-0 z-30 bg-white">
            <Navbar
              currentUser={currentUser}
              onSelectUser={(user) => setCurrentUser(user)}
              setActivePage={setActivePage}
            />
          </div>

          {/* Page Body: Scrolls independently while AlertBanner & Navbar stay permanently fixed */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {activePage === 'get-started' && (
              <GetStartedPage onNavigateToOrders={() => setActivePage('orders')} />
            )}

            {activePage === 'orders' && (
              <OrdersPage currentUser={currentUser} />
            )}

            {activePage === 'my-invoices' && (
              <InvoicesPage currentUser={currentUser} />
            )}

            {activePage === 'settings' && (
              <SettingsPage currentUser={currentUser} />
            )}

            {(activePage === 'dashboard' || activePage === 'orders-analytics' || activePage === 'gold-subscription' || activePage === 'bank-accounts') && (
              <DashboardPage 
                onNavigateToOrders={() => setActivePage('orders')}
                onNavigateToInvoices={() => setActivePage('my-invoices')}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
