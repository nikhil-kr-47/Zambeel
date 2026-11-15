import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Download, 
  Eye, 
  X,
  FileText,
  CheckCircle2
} from 'lucide-react';

// Deterministic hash generator for authentic Zambeel invoice filenames
function generateInvoiceHash(seed) {
  const chars = "abcdef0123456789";
  let hash = "";
  for (let i = 0; i < 32; i++) {
    const code = (seed * 9301 + 49297 + i * 233) % 233280;
    hash += chars[code % 16];
    if (i === 7 || i === 11 || i === 15 || i === 19) hash += "-";
  }
  return hash;
}

// Generate 100 authentic invoices per store (3-digit payouts, line-breaking filenames)
function generateStoreInvoices(storeName, storeSlug, currency, count = 100) {
  const baseDate = new Date(2026, 10, 13); // Nov 13, 2026
  const list = [];

  for (let i = 0; i < count; i++) {
    const invDate = new Date(baseDate.getTime() - i * 7 * 86400000);
    const dateStr = invDate.toISOString().split("T")[0];
    
    const prevDate = new Date(invDate.getTime() - 6 * 86400000);
    const startMonth = prevDate.toLocaleString('en-US', { month: 'short' });
    const endMonth = invDate.toLocaleString('en-US', { month: 'short' });
    const startDay = String(prevDate.getDate()).padStart(2, '0');
    const endDay = String(invDate.getDate()).padStart(2, '0');
    const year = invDate.getFullYear();
    const billingPeriod = `${startMonth} ${startDay}, ${year} - ${endMonth} ${endDay}, ${year}`;

    // Strictly 3-digit payout (200 - 379)
    const payoutNum = 200 + ((i * 37 + 84) % 180);
    const grossNum = 420 + ((i * 43 + 69) % 200);
    const sourcingNum = 130 + ((i * 19 + 22) % 60);
    const deliveryNum = 40 + ((i * 11 + 13) % 20);
    const ordersCount = 28 + (i % 22);

    const invoiceNumber = 81899 - i;
    const hash = generateInvoiceHash(i + (storeSlug.length * 17));
    const invoiceName = `33792-${invoiceNumber}-${storeSlug}_${hash}.pdf`;

    list.push({
      id: invoiceName,
      invoiceName,
      storeName,
      payout: `${currency} ${payoutNum}`,
      paymentStatus: "Success",
      dateOfInvoice: dateStr,
      billingPeriod,
      grossCod: `${currency} ${grossNum}`,
      sourcingCost: `${currency} ${sourcingNum}`,
      deliveryFee: `${currency} ${deliveryNum}`,
      ordersCount
    });
  }

  return list;
}

export default function InvoicesPage({ currentUser }) {
  // 4 Unique Store Names across all 4 accounts (No EmirFlow)
  const [selectedStore, setSelectedStore] = useState(currentUser?.storeName || 'Dubai Trends');
  const [activeInvoiceDetail, setActiveInvoiceDetail] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentUser?.storeName) {
      setSelectedStore(currentUser.storeName);
      setCurrentPage(1);
    }
  }, [currentUser]);

  // 100+ invoices for each unique store
  const ALL_STORE_INVOICES = useMemo(() => ({
    'Dubai Trends': generateStoreInvoices('Dubai Trends', 'dubaitrends', 'AED', 100),
    'Riyadh Prime': generateStoreInvoices('Riyadh Prime', 'riyadhprime', 'SAR', 100),
    'Doha Elite': generateStoreInvoices('Doha Elite', 'dohaelite', 'QAR', 100),
    'Kuwait Direct': generateStoreInvoices('Kuwait Direct', 'kuwaitdirect', 'KWD', 100)
  }), []);

  const currentStoreList = ALL_STORE_INVOICES[selectedStore] || ALL_STORE_INVOICES['Dubai Trends'];
  
  // Combine all invoices for "All Stores" option (400 invoices total)
  const allInvoices = selectedStore === 'All Stores'
    ? Object.values(ALL_STORE_INVOICES).flat()
    : currentStoreList;

  const totalPages = Math.ceil(allInvoices.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedInvoices = allInvoices.slice(startIndex, startIndex + pageSize);

  // Compact pagination window (up to 5 buttons)
  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }, [totalPages, currentPage]);

  const handleDownload = (invoice) => {
    const content = `ZAMBEEL LOGISTICS & DROPSHIPPING PORTAL\n` +
      `OFFICIAL STORE INVOICE / REMITTANCE STATEMENT\n` +
      `--------------------------------------------------\n` +
      `Invoice File: ${invoice.invoiceName}\n` +
      `Store Name: ${invoice.storeName}\n` +
      `Date of Invoice: ${invoice.dateOfInvoice}\n` +
      `Billing Period: ${invoice.billingPeriod}\n` +
      `Net Payout: ${invoice.payout}\n` +
      `Gross COD Collected: ${invoice.grossCod}\n` +
      `Product Sourcing Cost: ${invoice.sourcingCost}\n` +
      `Zambeel Delivery Fee: ${invoice.deliveryFee}\n` +
      `Payment Status: ${invoice.paymentStatus}\n` +
      `--------------------------------------------------\n` +
      `Generated by Zambeel Portal (portal.myzambeel.com)\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = invoice.invoiceName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner matching official Zambeel portal */}
      <div className="bg-gradient-to-r from-[#6b42f4] via-[#5b54f6] to-[#486ff8] rounded-2xl p-6 sm:p-8 text-white shadow-2xs">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          My Invoices
        </h1>
        <p className="text-purple-100 text-xs sm:text-sm mt-1.5 font-normal">
          Manage and download your store invoices ({allInvoices.length} total statements)
        </p>
      </div>

      {/* Main Invoices Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-7">
        
        {/* Card Header matching Screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Invoices
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
              {allInvoices.length} invoices
            </span>
          </div>

          {/* Select Store Dropdown - 4 Unique store names (No EmirFlow) */}
          <div className="flex items-center gap-3">
            <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
              Select Store
            </label>
            <div className="relative min-w-[200px]">
              <select
                value={selectedStore}
                onChange={(e) => {
                  setSelectedStore(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-9 shadow-2xs cursor-pointer"
              >
                {['Dubai Trends', 'Riyadh Prime', 'Doha Elite', 'Kuwait Direct'].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
                <option value="All Stores">All Stores (400 Invoices)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Invoices Table: 6 columns, no Payment Reason, line breaks for long names */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 mt-4">
          <table className="min-w-full divide-y divide-gray-100 text-left text-xs sm:text-sm border-collapse">
            
            {/* Thead with soft light blue background */}
            <thead className="bg-[#f0f6ff] text-[#1e293b] font-medium text-xs sm:text-sm">
              <tr>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[220px] max-w-[340px]">Invoice Name</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Store Name</th>
                {/* Payout column strictly 3-digits */}
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Payout</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Payment Status</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Date of Invoice</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap text-right sm:text-left">Download</th>
              </tr>
            </thead>

            {/* Tbody */}
            <tbody className="divide-y divide-gray-100">
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No invoices found for {selectedStore}
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Invoice Name: natural line break on long string (break-all / whitespace-normal) */}
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-700 min-w-[220px] max-w-[340px]">
                      <span className="break-all whitespace-normal block leading-relaxed">
                        {inv.invoiceName}
                      </span>
                    </td>

                    {/* Store Name */}
                    <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap font-medium">
                      {inv.storeName}
                    </td>

                    {/* Payout: Strictly 3 digits */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-gray-900">
                      {inv.payout}
                    </td>

                    {/* Payment Status: Success with green */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Success
                      </span>
                    </td>

                    {/* Date of Invoice */}
                    <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                      {inv.dateOfInvoice}
                    </td>

                    {/* Download Button */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right sm:text-left">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(inv)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f6ff] hover:bg-blue-100 text-[#2563eb] text-xs font-semibold rounded-lg border border-blue-100 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5 text-[#2563eb]" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => setActiveInvoiceDetail(inv)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          title="View statement breakdown"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2">
          
          {/* Left pagination controls: < [ 1 ] [ 2 ] ... > */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {visiblePages.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                  currentPage === pageNum 
                    ? 'bg-[#2563eb] text-white shadow-2xs' 
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right controls: Per page & Go to */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Per page:</span>
              <div className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs sm:text-sm font-medium text-gray-700 pr-6 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <span>Go to:</span>
              <div className="relative">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs sm:text-sm font-medium text-gray-700 pr-6 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-2xs cursor-pointer"
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>

            <span className="text-gray-400 text-xs hidden md:inline">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, allInvoices.length)} of {allInvoices.length}
            </span>
          </div>

        </div>

      </div>

      {/* Invoice Detail Modal */}
      {activeInvoiceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="bg-gradient-to-r from-[#6b42f4] to-[#486ff8] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-purple-200" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">Statement Breakdown</span>
                  <h3 className="text-sm font-semibold truncate max-w-[280px]">{activeInvoiceDetail.invoiceName}</h3>
                </div>
              </div>
              <button 
                onClick={() => setActiveInvoiceDetail(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Store Name:</span>
                <span className="font-semibold text-gray-900">{activeInvoiceDetail.storeName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Payment Status:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Success
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Date of Invoice:</span>
                <span className="font-semibold text-gray-900">{activeInvoiceDetail.dateOfInvoice}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Billing Period:</span>
                <span className="font-semibold text-gray-900">{activeInvoiceDetail.billingPeriod}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Gross COD Collected:</span>
                <span className="font-bold text-gray-900">{activeInvoiceDetail.grossCod}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-rose-600">
                <span>Product Sourcing Cost:</span>
                <span>-{activeInvoiceDetail.sourcingCost}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-rose-600">
                <span>Zambeel Delivery & Handling Fee:</span>
                <span>-{activeInvoiceDetail.deliveryFee}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-200 text-sm font-bold text-emerald-600">
                <span>Net Transferred to Bank (Payout):</span>
                <span className="text-base">{activeInvoiceDetail.payout}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleDownload(activeInvoiceDetail);
                    setActiveInvoiceDetail(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Invoice Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
