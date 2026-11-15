import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Download, 
  Eye, 
  X,
  FileText
} from 'lucide-react';

export default function InvoicesPage({ currentUser }) {
  // Sync selectedStore when currentUser changes
  const [selectedStore, setSelectedStore] = useState(currentUser?.storeName || 'EmirFlow');
  const [activeInvoiceDetail, setActiveInvoiceDetail] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentUser?.storeName) {
      setSelectedStore(currentUser.storeName);
      setCurrentPage(1);
    }
  }, [currentUser]);

  // Unique invoice datasets for each of the 4 accounts (Strictly 3-digit payouts)
  const STORE_INVOICES = {
    'EmirFlow': [
      {
        id: "33792-81899-emirflow_c32a325f-8663-42e6-b033-a12aa924c91.pdf",
        invoiceName: "33792-81899-emirflow_c32a325f-8663-42e6-b033-a12aa924c91.pdf",
        storeName: "EmirFlow",
        payout: "AED 284",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-13",
        billingPeriod: "Nov 06, 2026 - Nov 12, 2026",
        grossCod: "AED 489",
        sourcingCost: "AED 152",
        deliveryFee: "AED 53",
        ordersCount: 38
      },
      {
        id: "33792-81885-emirflow_b81f451a-7512-41d5-9128-d18bb819c12.pdf",
        invoiceName: "33792-81885-emirflow_b81f451a-7512-41d5-9128-d18bb819c12.pdf",
        storeName: "EmirFlow",
        payout: "AED 312",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-06",
        billingPeriod: "Oct 30, 2026 - Nov 05, 2026",
        grossCod: "AED 524",
        sourcingCost: "AED 161",
        deliveryFee: "AED 51",
        ordersCount: 42
      },
      {
        id: "33792-81872-emirflow_f72c189b-6401-49b2-a812-c98aa715d34.pdf",
        invoiceName: "33792-81872-emirflow_f72c189b-6401-49b2-a812-c98aa715d34.pdf",
        storeName: "EmirFlow",
        payout: "AED 264",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-30",
        billingPeriod: "Oct 23, 2026 - Oct 29, 2026",
        grossCod: "AED 445",
        sourcingCost: "AED 139",
        deliveryFee: "AED 42",
        ordersCount: 35
      },
      {
        id: "33792-81860-emirflow_e51a902d-5310-48a1-b703-b87cc624e56.pdf",
        invoiceName: "33792-81860-emirflow_e51a902d-5310-48a1-b703-b87cc624e56.pdf",
        storeName: "EmirFlow",
        payout: "AED 298",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-23",
        billingPeriod: "Oct 16, 2026 - Oct 22, 2026",
        grossCod: "AED 501",
        sourcingCost: "AED 156",
        deliveryFee: "AED 47",
        ordersCount: 39
      },
      {
        id: "33792-81848-emirflow_d40b891c-4209-4790-a692-a76bb513f78.pdf",
        invoiceName: "33792-81848-emirflow_d40b891c-4209-4790-a692-a76bb513f78.pdf",
        storeName: "EmirFlow",
        payout: "AED 345",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-16",
        billingPeriod: "Oct 09, 2026 - Oct 15, 2026",
        grossCod: "AED 582",
        sourcingCost: "AED 179",
        deliveryFee: "AED 58",
        ordersCount: 46
      },
      {
        id: "33792-81835-emirflow_a39c780b-3198-468f-9581-965aa402e67.pdf",
        invoiceName: "33792-81835-emirflow_a39c780b-3198-468f-9581-965aa402e67.pdf",
        storeName: "EmirFlow",
        payout: "AED 271",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-09",
        billingPeriod: "Oct 02, 2026 - Oct 08, 2026",
        grossCod: "AED 458",
        sourcingCost: "AED 142",
        deliveryFee: "AED 45",
        ordersCount: 36
      },
      {
        id: "33792-81822-emirflow_928b679a-2087-457e-8470-854993f1d56.pdf",
        invoiceName: "33792-81822-emirflow_928b679a-2087-457e-8470-854993f1d56.pdf",
        storeName: "EmirFlow",
        payout: "AED 329",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-02",
        billingPeriod: "Sep 25, 2026 - Oct 01, 2026",
        grossCod: "AED 549",
        sourcingCost: "AED 168",
        deliveryFee: "AED 52",
        ordersCount: 43
      },
      {
        id: "33792-81810-emirflow_817a5689-1976-446d-736f-743882e0c45.pdf",
        invoiceName: "33792-81810-emirflow_817a5689-1976-446d-736f-743882e0c45.pdf",
        storeName: "EmirFlow",
        payout: "AED 256",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-09-25",
        billingPeriod: "Sep 18, 2026 - Sep 24, 2026",
        grossCod: "AED 432",
        sourcingCost: "AED 135",
        deliveryFee: "AED 41",
        ordersCount: 33
      }
    ],
    'Riyadh Prime': [
      {
        id: "41285-92014-riyadhprime_a71b294e-1284-48d1-9310-f94cb831a22.pdf",
        invoiceName: "41285-92014-riyadhprime_a71b294e-1284-48d1-9310-f94cb831a22.pdf",
        storeName: "Riyadh Prime",
        payout: "SAR 295",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-13",
        billingPeriod: "Nov 06, 2026 - Nov 12, 2026",
        grossCod: "SAR 510",
        sourcingCost: "SAR 160",
        deliveryFee: "SAR 55",
        ordersCount: 40
      },
      {
        id: "41285-92002-riyadhprime_f62a183d-9173-47c0-8209-e83ba720b11.pdf",
        invoiceName: "41285-92002-riyadhprime_f62a183d-9173-47c0-8209-e83ba720b11.pdf",
        storeName: "Riyadh Prime",
        payout: "SAR 340",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-06",
        billingPeriod: "Oct 30, 2026 - Nov 05, 2026",
        grossCod: "SAR 580",
        sourcingCost: "SAR 182",
        deliveryFee: "SAR 58",
        ordersCount: 45
      },
      {
        id: "41285-91990-riyadhprime_e51f072c-8062-46b9-7198-d72a9619c00.pdf",
        invoiceName: "41285-91990-riyadhprime_e51f072c-8062-46b9-7198-d72a9619c00.pdf",
        storeName: "Riyadh Prime",
        payout: "SAR 280",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-30",
        billingPeriod: "Oct 23, 2026 - Oct 29, 2026",
        grossCod: "SAR 485",
        sourcingCost: "SAR 155",
        deliveryFee: "SAR 50",
        ordersCount: 37
      },
      {
        id: "41285-91978-riyadhprime_d40e961b-7951-45a8-6087-c6198508d99.pdf",
        invoiceName: "41285-91978-riyadhprime_d40e961b-7951-45a8-6087-c6198508d99.pdf",
        storeName: "Riyadh Prime",
        payout: "SAR 315",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-23",
        billingPeriod: "Oct 16, 2026 - Oct 22, 2026",
        grossCod: "SAR 535",
        sourcingCost: "SAR 168",
        deliveryFee: "SAR 52",
        ordersCount: 41
      }
    ],
    'Doha Elite': [
      {
        id: "52391-73125-dohaelite_c82b305f-2395-49e2-8421-a05dc942b33.pdf",
        invoiceName: "52391-73125-dohaelite_c82b305f-2395-49e2-8421-a05dc942b33.pdf",
        storeName: "Doha Elite",
        payout: "QAR 275",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-13",
        billingPeriod: "Nov 06, 2026 - Nov 12, 2026",
        grossCod: "QAR 470",
        sourcingCost: "QAR 148",
        deliveryFee: "QAR 47",
        ordersCount: 36
      },
      {
        id: "52391-73112-dohaelite_b71a294e-1284-48d1-7310-994cb831a22.pdf",
        invoiceName: "52391-73112-dohaelite_b71a294e-1284-48d1-7310-994cb831a22.pdf",
        storeName: "Doha Elite",
        payout: "QAR 320",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-06",
        billingPeriod: "Oct 30, 2026 - Nov 05, 2026",
        grossCod: "QAR 545",
        sourcingCost: "QAR 172",
        deliveryFee: "QAR 53",
        ordersCount: 42
      },
      {
        id: "52391-73099-dohaelite_a60f183d-0173-47c0-6209-883ba720b11.pdf",
        invoiceName: "52391-73099-dohaelite_a60f183d-0173-47c0-6209-883ba720b11.pdf",
        storeName: "Doha Elite",
        payout: "QAR 290",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-30",
        billingPeriod: "Oct 23, 2026 - Oct 29, 2026",
        grossCod: "QAR 495",
        sourcingCost: "QAR 156",
        deliveryFee: "QAR 49",
        ordersCount: 38
      }
    ],
    'Kuwait Direct': [
      {
        id: "63402-84236-kuwaitdirect_d93c416a-3406-40f3-9532-b16ed053c44.pdf",
        invoiceName: "63402-84236-kuwaitdirect_d93c416a-3406-40f3-9532-b16ed053c44.pdf",
        storeName: "Kuwait Direct",
        payout: "KWD 195",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-13",
        billingPeriod: "Nov 06, 2026 - Nov 12, 2026",
        grossCod: "KWD 335",
        sourcingCost: "KWD 105",
        deliveryFee: "KWD 35",
        ordersCount: 32
      },
      {
        id: "63402-84224-kuwaitdirect_c82b305f-2395-49e2-8421-a05dc942b33.pdf",
        invoiceName: "63402-84224-kuwaitdirect_c82b305f-2395-49e2-8421-a05dc942b33.pdf",
        storeName: "Kuwait Direct",
        payout: "KWD 215",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-11-06",
        billingPeriod: "Oct 30, 2026 - Nov 05, 2026",
        grossCod: "KWD 370",
        sourcingCost: "KWD 116",
        deliveryFee: "KWD 39",
        ordersCount: 35
      },
      {
        id: "63402-84211-kuwaitdirect_b71a294e-1284-48d1-7310-994cb831a22.pdf",
        invoiceName: "63402-84211-kuwaitdirect_b71a294e-1284-48d1-7310-994cb831a22.pdf",
        storeName: "Kuwait Direct",
        payout: "KWD 180",
        paymentStatus: "N/A",
        dateOfInvoice: "2026-10-30",
        billingPeriod: "Oct 23, 2026 - Oct 29, 2026",
        grossCod: "KWD 310",
        sourcingCost: "KWD 98",
        deliveryFee: "KWD 32",
        ordersCount: 29
      }
    ]
  };

  const currentStoreList = STORE_INVOICES[selectedStore] || STORE_INVOICES['EmirFlow'];
  
  // Combine all invoices for "All Stores" option
  const allInvoices = selectedStore === 'All Stores'
    ? Object.values(STORE_INVOICES).flat()
    : currentStoreList;

  const totalPages = Math.ceil(allInvoices.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedInvoices = allInvoices.slice(startIndex, startIndex + pageSize);

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
      
      {/* Top Banner matching official Zambeel screenshot */}
      <div className="bg-gradient-to-r from-[#6b42f4] via-[#5b54f6] to-[#486ff8] rounded-2xl p-6 sm:p-8 text-white shadow-2xs">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          My Invoices
        </h1>
        <p className="text-purple-100 text-xs sm:text-sm mt-1.5 font-normal">
          Manage and download your store invoices
        </p>
      </div>

      {/* Main Invoices Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-7">
        
        {/* Card Header matching Screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Invoices
          </h2>

          {/* Select Store Dropdown - Unique store name per account */}
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
                {['EmirFlow', 'Riyadh Prime', 'Doha Elite', 'Kuwait Direct'].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
                <option value="All Stores">All Stores</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Invoices Table: Clean, spacious 6-column layout with no overlap */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 mt-4">
          <table className="min-w-full divide-y divide-gray-100 text-left text-xs sm:text-sm border-collapse">
            
            {/* Thead with soft light blue background */}
            <thead className="bg-[#f0f6ff] text-[#1e293b] font-medium text-xs sm:text-sm">
              <tr>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Invoice Name</th>
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
                    
                    {/* Invoice Name: clean, comfortably readable without blowing width */}
                    <td className="py-4 px-4 font-mono text-xs text-gray-700 whitespace-nowrap">
                      <span 
                        className="inline-block max-w-[280px] sm:max-w-[340px] truncate align-middle"
                        title={inv.invoiceName}
                      >
                        {inv.invoiceName}
                      </span>
                    </td>

                    {/* Store Name */}
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap font-medium">
                      {inv.storeName}
                    </td>

                    {/* Payout: Strictly 3 digits */}
                    <td className="py-4 px-4 whitespace-nowrap font-semibold text-gray-900">
                      {inv.payout}
                    </td>

                    {/* Payment Status (N/A) */}
                    <td className="py-4 px-4 text-gray-400 italic whitespace-nowrap">
                      {inv.paymentStatus}
                    </td>

                    {/* Date of Invoice */}
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                      {inv.dateOfInvoice}
                    </td>

                    {/* Download Button */}
                    <td className="py-4 px-4 whitespace-nowrap text-right sm:text-left">
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
          
          {/* Left pagination controls: < [ 1 ] > */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
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
