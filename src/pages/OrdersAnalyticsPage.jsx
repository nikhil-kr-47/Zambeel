import React, { useState } from 'react';
import { 
  Headphones, 
  X, 
  Check, 
  Truck, 
  Plane, 
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
  // We can calculate dynamic counts based on currentUser orders, or default to authentic Zambeel figures
  const orders = currentUser?.orders || [];
  const hasOrders = orders.length > 0;

  // Pre-dispatch status counts
  const preDispatchTotal = hasOrders ? Math.round(orders.length * (21 / 49)) : 21;
  const confirmationPending = 0;
  const cancelled = hasOrders ? Math.round(preDispatchTotal * 0.62) : 13;
  const approved = hasOrders ? Math.round(preDispatchTotal * 0.29) : 6;
  const dispatchingInProcess = Math.max(0, preDispatchTotal - (confirmationPending + cancelled + approved));

  // Dispatched status counts
  const dispatchedTotal = hasOrders ? (orders.length - preDispatchTotal) : 28;
  const shipped = 0;
  const delivered = hasOrders ? Math.round(dispatchedTotal * 0.46) : 13;
  const undelivered = hasOrders ? Math.round(dispatchedTotal * 0.46) : 13;
  const returnInTransit = 0;
  const returned = Math.max(0, dispatchedTotal - (shipped + delivered + undelivered + returnInTransit));

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
      
      {/* 1. TOP PRE-DISPATCH STATUSES ROW (4 CARDS) */}
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
