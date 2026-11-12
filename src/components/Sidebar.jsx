import React, { useState } from 'react';
import { 
  Menu,
  ChevronDown, 
  Phone, 
  MessageCircle,
  X
} from 'lucide-react';
import {
  RocketIcon,
  HomeIcon,
  OrdersBoxIcon,
  AnalyticsBarsIcon,
  CrownIcon,
  InvoiceTicketIcon,
  BankBuildingIcon,
  SettingsGearIcon
} from './ZambeelIcons';

export default function Sidebar({ isOpen, onClose, activePage, setActivePage, isCollapsed, onToggleCollapse }) {
  const [roleMode, setRoleMode] = useState('merchant');
  const [goldSubExpanded, setGoldSubExpanded] = useState(false);
  const [getStartedExpanded, setGetStartedExpanded] = useState(false);

  const navItems = [
    {
      id: 'get-started',
      label: 'Get Started',
      icon: RocketIcon,
      hasDropdown: true,
      expanded: getStartedExpanded,
      toggleExpand: () => setGetStartedExpanded(!getStartedExpanded),
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: HomeIcon
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: OrdersBoxIcon
    },
    {
      id: 'orders-analytics',
      label: 'Orders Analytics',
      icon: AnalyticsBarsIcon
    },
    {
      id: 'gold-subscription',
      label: 'Gold Subscription',
      icon: CrownIcon,
      hasDropdown: true,
      expanded: goldSubExpanded,
      toggleExpand: () => setGoldSubExpanded(!goldSubExpanded),
    },
    {
      id: 'my-invoices',
      label: 'My Invoice',
      icon: InvoiceTicketIcon
    },
    {
      id: 'bank-accounts',
      label: 'Bank Accounts',
      icon: BankBuildingIcon
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsGearIcon
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container: w-[260px] */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 
        ${isCollapsed ? 'w-[78px]' : 'w-[260px]'}
        md:sticky md:top-0 md:h-screen md:flex-shrink-0
        bg-gradient-to-br from-[#181135] via-[#1a133b] to-[#140E2D]
        text-white flex flex-col justify-between 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        shadow-xl md:shadow-none border-r border-white/10
      `}>
        {/* Top Header inside Sidebar: Hamburger Icon & Role Switch */}
        <div className="p-4 pt-4 pb-2">
          {/* Top row with Hamburger */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 md:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Mode: Two Separate Sleek Boxes (Merchant & Agency) */}
          {!isCollapsed ? (
            <div className="grid grid-cols-2 gap-2.5 w-full mb-2">
              <button
                onClick={() => setRoleMode('merchant')}
                className={`transition-all duration-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-center cursor-pointer ${
                  roleMode === 'merchant'
                    ? 'bg-[#6B38F8] text-white shadow-sm border border-[#7C4AF9]'
                    : 'bg-transparent text-white/70 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                Merchant
              </button>

              <button
                onClick={() => setRoleMode('agency')}
                className={`transition-all duration-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-center cursor-pointer ${
                  roleMode === 'agency'
                    ? 'bg-[#6B38F8] text-white shadow-sm border border-[#7C4AF9]'
                    : 'bg-transparent text-white/70 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                Agency
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 mb-2">
              <button
                onClick={() => setRoleMode('merchant')}
                className={`w-11 h-9 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center transition-all cursor-pointer ${
                  roleMode === 'merchant'
                    ? 'bg-[#6B38F8] text-white border border-[#7C4AF9]'
                    : 'bg-transparent text-white/70 border border-white/20 hover:text-white'
                }`}
                title="Merchant"
              >
                M
              </button>
              <button
                onClick={() => setRoleMode('agency')}
                className={`w-11 h-9 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center transition-all cursor-pointer ${
                  roleMode === 'agency'
                    ? 'bg-[#6B38F8] text-white border border-[#7C4AF9]'
                    : 'bg-transparent text-white/70 border border-white/20 hover:text-white'
                }`}
                title="Agency"
              >
                A
              </button>
            </div>
          )}
        </div>

        {/* Middle Navigation Links (Natural flexible height, not artificially limited) */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-270px)] sidebar-scroll px-3 space-y-1.5 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => {
                    setActivePage(item.id);
                    if (item.toggleExpand) item.toggleExpand();
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`
                    relative flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-3'} w-full rounded-xl transition-all duration-200 group text-[14.5px] font-semibold cursor-pointer leading-snug text-left
                    ${isActive
                      ? 'bg-gradient-to-r from-[#6A37F8] to-[#884BF9] text-white shadow-sm' 
                      : 'hover:bg-white/10 text-white/75 hover:text-white'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Left Yellow Accent Bar on Active item */}
                  {isActive && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-[#FFC727] rounded-r-md" />
                  )}

                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
                    {!isCollapsed && (
                      <span className="leading-tight break-words">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 flex-shrink-0 text-white/70 transition-transform ml-1 ${item.expanded ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Sticky Bottom WhatsApp Support Widget */}
        <div className="p-3.5 pb-4 border-t border-white/10 sticky bottom-0 bg-[#181135]/95 backdrop-blur-md">
          {!isCollapsed ? (
            <div className="bg-[#211B45] border border-purple-900/40 rounded-xl p-3 shadow-md">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <MessageCircle className="w-4.5 h-4.5 fill-white text-[#25D366]" />
                </div>
                {/* EXACT SAME FONT WEIGHT FOR ALL THREE WORDS: Zambeel Whatsapp Support */}
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide block leading-tight">
                  Zambeel Whatsapp Support
                </span>
              </div>

              <a
                href="https://wa.me/971568472271"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#22C55E] hover:bg-[#1EBE5D] text-white py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                <span>Chat with Us</span>
              </a>
            </div>
          ) : (
            <a
              href="https://wa.me/971568472271"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 mx-auto rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform"
              title="Zambeel WhatsApp Support"
            >
              <Phone className="w-4.5 h-4.5 fill-white" />
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
