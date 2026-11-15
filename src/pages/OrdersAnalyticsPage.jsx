import React, { useState } from 'react';
import { 
  Headphones, 
  X, 
  Check, 
  Truck, 
  Plane, 
  Package,
  PackageCheck, 
  PackageX, 
  RotateCcw, 
  RotateCw, 
  ChevronRight, 
  Filter, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';

export default function OrdersAnalyticsPage({ currentUser, onNavigateToOrders }) {
  const [selectedStore, setSelectedStore] = useState(currentUser?.storeName || 'Dubai Trends');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 30 days');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedProduct, setSelectedProduct] = useState('All Products');

  // Sync store when user switches account
  React.useEffect(() => {
    if (currentUser?.storeName) {
      setSelectedStore(currentUser.storeName);
    }
  }, [currentUser]);

  // We can calculate dynamic counts based on currentUser orders, or default to authentic Zambeel figures
  const orders = currentUser?.orders || [];
  const hasOrders = orders.length > 0;

  // Authentic Zambeel dashboard baseline totals (21 pre-dispatch + 28 dispatched = 49 total orders)
  const totalOrdersCount = 49;
  const preDispatchTotal = 21;
  const confirmationPending = 0;
  const cancelled = 13;
  const approved = 6;
  const dispatchingInProcess = 2;

  // Dispatched status counts
  const dispatchedTotal = 28;
  const shipped = 0;
  const delivered = 13;
  const undelivered = 13;
  const returnInTransit = 0;
  const returned = 2;

  // Helper percentages
  const prePct = (val) => preDispatchTotal > 0 ? Math.round((val / preDispatchTotal) * 100) : 0;
  const dispPct = (val) => dispatchedTotal > 0 ? Math.round((val / dispatchedTotal) * 100) : 0;

  const handleCardClick = (status) => {
    if (onNavigateToOrders) {
      onNavigateToOrders(status);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP FILTERS ROW: Store, Time Period, Country, Product (Exact match from Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Filter 1: Store */}
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-900 block mb-1.5">
            Store
          </label>
          <div className="relative">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
            >
              {['Dubai Trends', 'Riyadh Prime', 'Doha Elite', 'Kuwait Direct'].map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
              <option value="All Stores">All Stores</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Filter 2: Time Period */}
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-900 block mb-1.5">
            Time Period
          </label>
          <div className="relative">
            <select
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
            >
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="All Time">All Time</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Filter 3: Country */}
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-900 block mb-1.5">
            Country
          </label>
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
            >
              <option value="All Countries">All Countries</option>
              <option value="UAE">UAE</option>
              <option value="KSA">KSA</option>
              <option value="Qatar">Qatar</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Oman">Oman</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Iraq">Iraq</option>
              <option value="USA">USA</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Filter 4: Product */}
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-900 block mb-1.5">
            Product
          </label>
          <div className="relative">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
            >
              <option value="All Products">All Products</option>
              <option value="Triple Action Eye Cream">Triple Action Eye Cream</option>
              <option value="BioRich - Fat Burner">BioRich - Fat Burner</option>
              <option value="Sol de Janeiro Beija Flor">Sol de Janeiro Beija Flor</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 2. ALL ORDERS CARD (Exact match from Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div 
          onClick={() => handleCardClick('All')}
          className="bg-white rounded-2xl p-5 border border-gray-100 border-l-4 border-l-[#64748B] shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#475569] shadow-2xs">
              <Package className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              All Orders
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 block tracking-tight">
              {totalOrdersCount}
            </span>
          </div>
        </div>
      </div>

      {/* 3. PRE-DISPATCH STATUSES ROW (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Confirmation Pending */}
        <div 
          onClick={() => handleCardClick('Confirmation Pending')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-white shadow-2xs">
              <Headphones className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Confirmation Pending
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {confirmationPending}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Pre-Dispatch: {prePct(confirmationPending)}% ({confirmationPending}/{preDispatchTotal})
            </span>
          </div>
        </div>

        {/* Card 2: Cancelled */}
        <div 
          onClick={() => handleCardClick('Cancelled')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#EF4444] flex items-center justify-center text-white shadow-2xs">
              <X className="w-5 h-5 stroke-[2.5]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Cancelled
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {cancelled}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Pre-Dispatch: {prePct(cancelled)}% ({cancelled}/{preDispatchTotal})
            </span>
          </div>
        </div>

        {/* Card 3: Approved */}
        <div 
          onClick={() => handleCardClick('Approved')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white shadow-2xs">
              <Check className="w-5 h-5 stroke-[2.8]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Approved
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {approved}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Pre-Dispatch: {prePct(approved)}% ({approved}/{preDispatchTotal})
            </span>
          </div>
        </div>

        {/* Card 4: Dispatching in Process */}
        <div 
          onClick={() => handleCardClick('Dispatching in Process')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white shadow-2xs">
              <Truck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Dispatching in Process
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {dispatchingInProcess}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Pre-Dispatch: {prePct(dispatchingInProcess)}% ({dispatchingInProcess}/{preDispatchTotal})
            </span>
          </div>
        </div>

      </div>

      {/* 2. DISPATCHED SECTION HEADER BANNER (Light Mint Gradient Banner) */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#DCFCE7]/70 via-[#E8F8F0] to-[#F0FDF4] border border-[#BBF7D0]/50 p-4 sm:p-5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#BBF7D0]/60 flex items-center justify-center text-[#15803D]">
            <Truck className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              Dispatched
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Orders that have been shipped out
            </p>
          </div>
        </div>

        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {dispatchedTotal}
          </span>
        </div>
      </div>

      {/* 3. DISPATCHED STATUSES ROW (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Shipped */}
        <div 
          onClick={() => handleCardClick('Shipped')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white shadow-2xs">
              <Plane className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Shipped
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {shipped}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Dispatched: {dispPct(shipped)}% ({shipped}/{dispatchedTotal})
            </span>
          </div>
        </div>

        {/* Card 2: Delivered */}
        <div 
          onClick={() => handleCardClick('Delivered')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#0D9488] flex items-center justify-center text-white shadow-2xs">
              <PackageCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Delivered
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {delivered}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Dispatched: {dispPct(delivered)}% ({delivered}/{dispatchedTotal})
            </span>
          </div>
        </div>

        {/* Card 3: Undelivered */}
        <div 
          onClick={() => handleCardClick('Undelivered')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white shadow-2xs">
              <PackageX className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Undelivered
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {undelivered}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Dispatched: {dispPct(undelivered)}% ({undelivered}/{dispatchedTotal})
            </span>
          </div>
        </div>

        {/* Card 4: Return in Transit */}
        <div 
          onClick={() => handleCardClick('Return in Transit')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#EA580C] flex items-center justify-center text-white shadow-2xs">
              <RotateCcw className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Return in Transit
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {returnInTransit}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Dispatched: {dispPct(returnInTransit)}% ({returnInTransit}/{dispatchedTotal})
            </span>
          </div>
        </div>

      </div>

      {/* 4. RETURN STATUS ROW (Card 1: Return) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div 
          onClick={() => handleCardClick('Returned')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white shadow-2xs">
              <RotateCw className="w-5 h-5 stroke-[2.2]" />
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="mt-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-800 block">
              Return
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 block tracking-tight">
              {returned}
            </span>
            <span className="text-[11px] text-gray-400 font-normal mt-1 block">
              % of Dispatched: {dispPct(returned)}% ({returned}/{dispatchedTotal})
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
