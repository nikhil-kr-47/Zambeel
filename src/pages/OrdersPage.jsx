import React, { useState } from 'react';
import { 
  ChevronDown, 
  Filter, 
  Download 
} from 'lucide-react';

export default function OrdersPage({ currentUser }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Exact 3 top records from authentic Zambeel screenshot
  const AUTHENTIC_SCREENSHOT_ORDERS = [
    {
      id: "1038",
      complaint: "-",
      customerName: "Abdulraheem -",
      totalAmount: "AED 76.00",
      phoneNumber: "971509992424",
      city: "Dubai",
      country: "United Arab Emirates",
      status: "Dispatching in Process",
      statusSubtitle: "Awaiting Pickup (Ready to Dispatch)"
    },
    {
      id: "1050",
      complaint: "-",
      customerName: "Jamal -",
      totalAmount: "AED 76.00",
      phoneNumber: "971508858188",
      city: "Dubai",
      country: "United Arab Emirates",
      status: "Approved",
      statusSubtitle: "Checking Inventory Dispatch (Checking Inventory)"
    },
    {
      id: "1049",
      complaint: "-",
      customerName: "Jirata -",
      totalAmount: "AED 76.00",
      phoneNumber: "971556402410",
      city: "-",
      country: "United Arab Emirates",
      status: "Cancelled",
      statusSubtitle: "Customer Refused (Did not order)"
    }
  ];

  // Country name mapping
  const getFullCountryName = (c) => {
    const map = {
      'UAE': 'United Arab Emirates',
      'KSA': 'Saudi Arabia',
      'Qatar': 'Qatar',
      'Kuwait': 'Kuwait',
      'Oman': 'Oman',
      'Bahrain': 'Bahrain',
      'Pakistan': 'Pakistan',
      'Iraq': 'Iraq',
      'USA': 'United States'
    };
    return map[c] || c || 'United Arab Emirates';
  };

  // Status subtitle mapping matching Zambeel
  const getStatusSubtitle = (status) => {
    switch(status) {
      case 'Dispatching in Process':
        return 'Awaiting Pickup (Ready to Dispatch)';
      case 'Approved':
        return 'Checking Inventory Dispatch (Checking Inventory)';
      case 'Cancelled':
        return 'Customer Refused (Did not order)';
      case 'Delivered':
        return 'Delivered Successfully (COD Collected)';
      case 'Returned':
        return 'Customer Returned (RTO)';
      case 'In Transit':
        return 'In Transit (With Courier)';
      case 'Out for Delivery':
        return 'Out for Delivery (Courier Assigned)';
      case 'Confirmed':
        return 'Call Verified & Confirmed';
      default:
        return 'Awaiting Fulfillment';
    }
  };

  // Convert user orders to exact screenshot format
  const normalizedUserOrders = (currentUser?.orders || []).map((o, idx) => {
    const rawDigits = o.phoneNumber.replace(/[^0-9]/g, '');
    const amountParts = o.totalAmount.split(' ');
    const formattedAmount = amountParts.length === 2 
      ? `${amountParts[1]} ${amountParts[0]}` 
      : o.totalAmount;

    // Generate clean integer ID counting down like Zambeel
    const numericId = String(1048 - idx);

    return {
      id: numericId,
      complaint: o.complaint === 'None' ? '-' : o.complaint,
      customerName: `${o.customerName} -`,
      totalAmount: formattedAmount,
      phoneNumber: rawDigits,
      city: o.city || '-',
      country: getFullCountryName(o.country),
      status: o.status === 'Confirmed' ? 'Approved' : o.status,
      statusSubtitle: getStatusSubtitle(o.status)
    };
  });

  // Combine: screenshot sample orders + user's orders
  const combinedOrders = [...AUTHENTIC_SCREENSHOT_ORDERS, ...normalizedUserOrders];

  // Filter by country
  const filteredOrders = selectedCountry 
    ? combinedOrders.filter(o => o.country.toLowerCase().includes(selectedCountry.toLowerCase()))
    : combinedOrders;

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* MAIN ORDERS CARD CONTAINER (Exact match from Screenshot) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        
        {/* TOP FILTER & ACTION CONTROLS BAR (Screenshot Match) */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: "Select a country" dropdown & Filter Funnel Icon button */}
          <div className="flex items-center gap-2.5">
            <div className="relative min-w-[200px]">
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
              >
                <option value="">Select a country</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Qatar">Qatar</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Oman">Oman</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Iraq">Iraq</option>
                <option value="United States">United States</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Filter Funnel Icon Button */}
            <button
              onClick={() => setShowFilterModal(!showFilterModal)}
              className="p-2.5 bg-white border border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-600 rounded-xl shadow-2xs transition-all cursor-pointer flex items-center justify-center"
              title="Filter Options"
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Right: Export Orders Button */}
          <button
            onClick={() => alert(`Exporting ${filteredOrders.length} orders as CSV.`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 active:scale-95 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-gray-600 stroke-[2.2]" />
            <span>Export Orders</span>
          </button>
        </div>

        {/* ORDERS TABLE (Exact Columns & Row Structure from Screenshot) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-white text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                <th className="py-4 px-5 whitespace-nowrap">ORDER ID</th>
                <th className="py-4 px-5 whitespace-nowrap">COMPLAINT</th>
                <th className="py-4 px-5 whitespace-nowrap">CUSTOMER NAME</th>
                <th className="py-4 px-5 whitespace-nowrap">TOTAL AMOUNT</th>
                <th className="py-4 px-5 whitespace-nowrap">PHONE NUMBER</th>
                <th className="py-4 px-5 whitespace-nowrap">CITY</th>
                <th className="py-4 px-5 whitespace-nowrap">COUNTRY</th>
                <th className="py-4 px-5 whitespace-nowrap">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-gray-500 font-medium">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    
                    {/* 1. ORDER ID (Blue Underlined Link) */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <button 
                        onClick={() => alert(`Viewing Order details for #${order.id}`)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
                      >
                        {order.id}
                      </button>
                    </td>

                    {/* 2. COMPLAINT (Dash or text) */}
                    <td className="py-4 px-5 text-gray-400 font-normal">
                      {order.complaint}
                    </td>

                    {/* 3. CUSTOMER NAME */}
                    <td className="py-4 px-5 text-gray-800 font-normal whitespace-nowrap">
                      {order.customerName}
                    </td>

                    {/* 4. TOTAL AMOUNT (Currency first: e.g. AED 76.00) */}
                    <td className="py-4 px-5 text-gray-800 font-normal whitespace-nowrap">
                      {order.totalAmount}
                    </td>

                    {/* 5. PHONE NUMBER (Raw continuous digits) */}
                    <td className="py-4 px-5 text-gray-600 font-normal whitespace-nowrap">
                      {order.phoneNumber}
                    </td>

                    {/* 6. CITY */}
                    <td className="py-4 px-5 text-gray-700 font-normal whitespace-nowrap">
                      {order.city}
                    </td>

                    {/* 7. COUNTRY (Full Name: e.g. United Arab Emirates) */}
                    <td className="py-4 px-5 text-gray-700 font-normal whitespace-nowrap">
                      {order.country}
                    </td>

                    {/* 8. STATUS (Two-line title + descriptive subtext) */}
                    <td className="py-4 px-5 min-w-[200px]">
                      <div className="leading-tight">
                        <span className="font-medium text-gray-900 block text-xs sm:text-sm">
                          {order.status}
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5 font-normal">
                          {order.statusSubtitle}
                        </span>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS FOOTER */}
        <div className="p-4 sm:px-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-gray-600 bg-gray-50/40">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 pr-7 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
            </div>
            <span>entries per page</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Page:</span>
            <div className="relative">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 pr-7 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs cursor-pointer"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
            </div>
            <span>of {totalPages}</span>
          </div>

          <div className="text-gray-500 font-medium">
            Showing {filteredOrders.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredOrders.length)} of {filteredOrders.length} entries
          </div>
        </div>

      </div>

    </div>
  );
}
