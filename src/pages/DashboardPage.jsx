import React from 'react';
import { 
  Shield, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage({ 
  currentUser, 
  onNavigateToOrders, 
  onNavigateToInvoices,
  onNavigateToAnalytics,
  onNavigateToBankAccounts
}) {
  // Use user name or authentic fallback from screenshot
  const userName = currentUser?.name || 'M Bilal N Phansopkar';
  
  // Dynamic order stats according to account requirements
  const getAccountStats = (user) => {
    switch (user?.id) {
      case 'user2':
        return { totalOrders: 2647, deliveredOrders: 2011 };
      case 'user3':
        return { totalOrders: 687, deliveredOrders: 597 };
      case 'user4':
        return { totalOrders: 1420, deliveredOrders: 1150 };
      case 'user1':
      default:
        return { totalOrders: 1086, deliveredOrders: 809 };
    }
  };

  const accountStats = getAccountStats(currentUser);
  const totalOrders = accountStats.totalOrders;
  const deliveredOrders = accountStats.deliveredOrders;
  const deliveredPercent = Math.round((deliveredOrders / totalOrders) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP PURPLE HERO BANNER (Pixel-Perfect from Screenshot) */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#5E2EE8] via-[#6B38F8] to-[#7B46F8] text-white p-6 sm:p-8 overflow-hidden shadow-sm">
        {/* Soft background glow circles like authentic Zambeel */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-black/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-6">
          
          {/* Header Row: Greeting on Left & Action Buttons on Right */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold tracking-tight text-white mb-1.5 leading-snug">
                Good Afternoon, {userName}!
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-normal">
                Welcome back to your seller dashboard
              </p>
            </div>

            {/* Top Right Action Buttons matching Screenshot */}
            <div className="flex flex-col items-start md:items-end gap-2.5 flex-shrink-0">
              {/* Yellow/Amber Bank Accounts button */}
              <button
                onClick={onNavigateToBankAccounts || onNavigateToInvoices}
                className="bg-[#F6B72A] hover:bg-[#EAA920] active:scale-98 text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4 stroke-[2.4] text-gray-900" />
                <span>Official Zambeel Bank Accounts</span>
              </button>

              {/* View Analytics & View Orders buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={onNavigateToAnalytics || onNavigateToOrders}
                  className="bg-[#481AB8]/80 hover:bg-[#481AB8] active:scale-98 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-xs transition-all cursor-pointer border border-white/10"
                >
                  View Analytics
                </button>
                <button
                  onClick={onNavigateToOrders}
                  className="bg-white hover:bg-gray-100 active:scale-98 text-[#6B38F8] font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>

          {/* 4 Bottom Metric Columns inside Hero Card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            
            {/* 1. Total Stores */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-medium text-white/85">
                Total Stores
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  1
                </span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  (Currently Active)
                </span>
              </div>
            </div>

            {/* 2. Total Orders */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-medium text-white/85">
                Total Orders
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  {totalOrders.toLocaleString()}
                </span>
                <span className="text-[11px] text-transparent block mt-0.5 select-none">
                  &nbsp;
                </span>
              </div>
            </div>

            {/* 3. Delivered Orders */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-medium text-white/85">
                Delivered Orders
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  {deliveredOrders.toLocaleString()}
                </span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  {deliveredPercent} % of total orders
                </span>
              </div>
            </div>

            {/* 4. Profile Completion */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-medium text-white/85">
                Profile Completion
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  75%
                </span>
                <span className="text-[11px] text-white/70 block mt-0.5">
                  Complete your profile
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. SECOND SECTION: Complete Your Profile (Left) & Our Products (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Complete your profile (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              Complete your profile
            </h2>

            {/* Progress Bar matching Screenshot */}
            <div className="w-full bg-[#EAE8F5] rounded-full h-8 p-1 relative flex items-center mb-6 overflow-hidden">
              <div className="w-[75%] bg-[#6B38F8] h-full rounded-full flex items-center justify-center text-white text-xs sm:text-[13px] font-bold tracking-wide shadow-xs">
                75% Completed
              </div>
            </div>

            {/* 2x2 Steps Grid matching Screenshot */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              
              {/* Step 1: Sign Up */}
              <div className="bg-white border border-[#DCD3F7] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#5E2EE8] flex items-center justify-center flex-shrink-0 text-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <span className="truncate">Sign Up</span>
              </div>

              {/* Step 2: Bank Account */}
              <div className="bg-white border border-[#DCD3F7] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#5E2EE8] flex items-center justify-center flex-shrink-0 text-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <span className="truncate">Bank Account</span>
              </div>

              {/* Step 3: Store Integrated */}
              <div className="bg-white border border-[#DCD3F7] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#5E2EE8] flex items-center justify-center flex-shrink-0 text-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <span className="truncate">Store Integrated</span>
              </div>

              {/* Step 4: Subscription Plan (Pending) */}
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-500">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                <span className="truncate">Subscription Plan</span>
              </div>

            </div>
          </div>
        </div>

        {/* Right Card: Our Products (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header: Title & "See All Products" Button */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Our Products
              </h2>

              <button
                onClick={() => alert('Explore all products in catalog')}
                className="bg-[#F6B72A] hover:bg-[#EAA920] active:scale-98 text-gray-900 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-2xs transition-all cursor-pointer flex items-center gap-1"
              >
                <span>See All Products</span>
              </button>
            </div>

            {/* 3 Products Grid matching Screenshot */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
              
              {/* Product 1: Triple Action Eye Cream */}
              <div className="border border-gray-100 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between bg-white hover:border-purple-200 hover:shadow-md transition-all group cursor-pointer">
                <div>
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-1 relative mb-2">
                    <img 
                      src="/products/eye-cream.jpg" 
                      alt="Triple Action Eye Cream" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mt-1 min-h-[34px]">
                    Triple Action Eye Cream
                  </h3>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-gray-900 mt-2">
                  30.00 <span className="text-xs font-semibold text-gray-600">AED</span>
                </div>
              </div>

              {/* Product 2: BioRich - Fat Burner... */}
              <div className="border border-gray-100 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between bg-white hover:border-purple-200 hover:shadow-md transition-all group cursor-pointer">
                <div>
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-1 relative mb-2">
                    <img 
                      src="/products/fat-burner.jpg" 
                      alt="BioRich - Fat Burner" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mt-1 min-h-[34px]">
                    BioRich - Fat Burner...
                  </h3>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-gray-900 mt-2">
                  73.00 <span className="text-xs font-semibold text-gray-600">AED</span>
                </div>
              </div>

              {/* Product 3: Sol de Janeiro Beij... */}
              <div className="border border-gray-100 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between bg-white hover:border-purple-200 hover:shadow-md transition-all group cursor-pointer">
                <div>
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-1 relative mb-2">
                    <img 
                      src="/products/sol-de-janeiro.jpg" 
                      alt="Sol de Janeiro" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mt-1 min-h-[34px]">
                    Sol de Janeiro Beij...
                  </h3>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-gray-900 mt-2">
                  59.00 <span className="text-xs font-semibold text-gray-600">AED</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
