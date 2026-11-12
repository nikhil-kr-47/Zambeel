import React from 'react';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Truck, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

export default function DashboardPage({ onNavigateToOrders, onNavigateToInvoices }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Merchant Overview
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time analytics across your 9 Zambeel fulfillment countries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToOrders}
            className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Manage Orders</span>
          </button>
          <button
            onClick={onNavigateToInvoices}
            className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-all shadow-xs"
          >
            Invoices & Payouts
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Gross COD Revenue</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">72,450.00 AED</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14.2% from last cycle</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Orders Dispatched</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">326 Orders</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>88.4% COD Delivery Success</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Net Profit Payout</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">33,260.00 AED</div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <span>Weekly cycle paid every Monday</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active Countries</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">9 / 9 Hubs</div>
          <div className="flex items-center gap-1 text-[11px] text-purple-600 font-semibold mt-1">
            <ShieldCheck className="w-3 h-3" />
            <span>All warehouses operational</span>
          </div>
        </div>
      </div>

      {/* Regional breakdown and Live Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Top Performing GCC Destinations</h3>
            <span className="text-xs text-purple-600 font-semibold">Last 30 Days</span>
          </div>

          <div className="space-y-3">
            {[
              { country: 'Saudi Arabia (KSA)', share: '48%', orders: '156 orders', revenue: '34,800 SAR', color: 'bg-emerald-500' },
              { country: 'United Arab Emirates (UAE)', share: '32%', orders: '104 orders', revenue: '22,400 AED', color: 'bg-blue-500' },
              { country: 'Qatar', share: '12%', orders: '39 orders', revenue: '9,850 QAR', color: 'bg-purple-500' },
              { country: 'Kuwait & Bahrain', share: '8%', orders: '27 orders', revenue: '5,400 USD', color: 'bg-amber-500' },
            ].map((reg, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{reg.country}</span>
                  <div className="space-x-3 text-right">
                    <span className="text-gray-400">{reg.orders}</span>
                    <span className="font-bold text-gray-900">{reg.revenue}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${reg.color} rounded-full`} style={{ width: reg.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Support / Account Manager card */}
        <div className="bg-gradient-to-br from-[#181335] to-[#2B1B54] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-bold">
              <span>Dedicated Account Manager</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-3">Hamza Al-Sayed</h3>
            <p className="text-xs text-purple-200 mt-1">Zambeel Senior Merchant Growth Specialist</p>

            <div className="mt-5 space-y-2 text-xs text-purple-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Daily inventory stock check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp address confirmation assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Custom product sourcing from China & UAE</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <a
              href="https://api.whatsapp.com/send?phone=971500000000"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <span>Message Account Manager</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
