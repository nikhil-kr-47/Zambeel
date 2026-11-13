import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Download 
} from 'lucide-react';

export default function OrdersPage({ currentUser }) {
  const [selectedStore, setSelectedStore] = useState(currentUser.storeName);
  const [yourStoreOrdersOpen, setYourStoreOrdersOpen] = useState(true);
  const [zambeelOrdersOpen, setZambeelOrdersOpen] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync selectedStore when currentUser changes
  React.useEffect(() => {
    setSelectedStore(currentUser.storeName);
    setCurrentPage(1);
  }, [currentUser]);

  const allOrders = currentUser?.orders || [];
  const filteredOrders = selectedCountry 
    ? allOrders.filter(o => o.country.toLowerCase() === selectedCountry.toLowerCase())
    : allOrders;

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
        Orders Dashboard
      </h1>

      {/* Controls Row: Select Store & Action Buttons (Exact match from Screenshot) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Select Store */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Select Store
          </label>
          <div className="relative min-w-[260px]">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
            >
              <option value="">Select Store</option>
              <option value={currentUser.storeName}>{currentUser.storeName}</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Right: + Add a single order & Bulk upload orders */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Add single order modal')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add a single order</span>
          </button>

          <button
            onClick={() => alert('Bulk upload orders CSV modal')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 stroke-[2.2]" />
            <span>Bulk upload orders</span>
          </button>
        </div>
      </div>

      {/* Card 1: Your Store Orders (Exact match from Screenshot) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        {/* Card Header */}
        <div 
          onClick={() => setYourStoreOrdersOpen(!yourStoreOrdersOpen)}
          className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer select-none"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Your Store Orders
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Orders which are not yet processed to Zambeel.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700">
            <span>0 Orders</span>
            {yourStoreOrdersOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Card Body */}
        {yourStoreOrdersOpen && (
          <div className="p-6 space-y-6">
            {/* Buttons Row */}
            <div className="flex items-center justify-between">
              <button
                disabled
                className="px-6 py-2 rounded-xl bg-[#8FA2F8] opacity-90 text-white font-semibold text-xs sm:text-sm shadow-2xs cursor-not-allowed"
              >
                Send To Zambeel
              </button>

              <button
                disabled
                className="px-6 py-2 rounded-xl bg-[#EE7D77] opacity-90 text-white font-semibold text-xs sm:text-sm shadow-2xs cursor-not-allowed"
              >
                Delete Orders
              </button>
            </div>

            {/* Empty text */}
            <div className="py-8 text-center text-sm text-gray-500 font-medium">
              No orders found for this store.
            </div>
          </div>
        )}
      </div>

      {/* Card 2: Orders with Zambeel (Exact match from Screenshot) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        {/* Card Header */}
        <div 
          onClick={() => setZambeelOrdersOpen(!zambeelOrdersOpen)}
          className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer select-none"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Orders with Zambeel
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Orders that have been processed to Zambeel
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700">
            <span>{filteredOrders.length} Orders</span>
            {zambeelOrdersOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Card Body */}
        {zambeelOrdersOpen && (
          <div>
            {/* Filter and Action Bar */}
            <div className="p-4 md:px-6 bg-gray-50/40 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Country Dropdown */}
                <div className="relative min-w-[200px]">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-9 shadow-2xs cursor-pointer"
                  >
                    <option value="">All Countries</option>
                    <option value="UAE">UAE</option>
                    <option value="KSA">KSA</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="USA">USA</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
                </div>

                {/* Reset filter button if active */}
                {selectedCountry && (
                  <button
                    onClick={() => { setSelectedCountry(''); setCurrentPage(1); }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Export Orders Button */}
              <button
                onClick={() => alert(`Exporting ${filteredOrders.length} orders for ${currentUser.name} as CSV.`)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-4 h-4 text-gray-600" />
                <span>Export Orders</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <th className="py-4 px-5">ORDER ID</th>
                    <th className="py-4 px-5">COMPLAINT</th>
                    <th className="py-4 px-5">CUSTOMER NAME</th>
                    <th className="py-4 px-5">TOTAL AMOUNT</th>
                    <th className="py-4 px-5">PHONE NUMBER</th>
                    <th className="py-4 px-5">CITY</th>
                    <th className="py-4 px-5">COUNTRY</th>
                    <th className="py-4 px-5">STATUS</th>
                    <th className="py-4 px-5">ORDER DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {currentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-20 text-center">
                        <span className="text-base md:text-lg font-bold text-gray-700">
                          No Orders Found
                        </span>
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-purple-700 hover:underline cursor-pointer">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            order.complaint === 'None' 
                              ? 'bg-gray-100 text-gray-600' 
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {order.complaint}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-gray-900">
                          {order.customerName}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-gray-900">
                          {order.totalAmount}
                        </td>
                        <td className="py-3.5 px-5 text-gray-600 font-mono text-xs">
                          {order.phoneNumber}
                        </td>
                        <td className="py-3.5 px-5 text-gray-700">
                          {order.city}
                        </td>
                        <td className="py-3.5 px-5 text-gray-700 font-medium">
                          {order.country}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Delivered' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : order.status === 'In Transit' 
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'Out for Delivery'
                              ? 'bg-amber-100 text-amber-800'
                              : order.status === 'Confirmed'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-gray-500 whitespace-nowrap text-xs">
                          {order.orderDate}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 md:px-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600 bg-gray-50/30">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 pr-7 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
                </div>
                <span>entries per page</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Page:</span>
                <div className="relative">
                  <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 pr-7 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs cursor-pointer"
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>

              <div className="text-gray-500 font-medium text-xs sm:text-sm">
                Showing {filteredOrders.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredOrders.length)} of {filteredOrders.length} entries
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
