import React, { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  Eye, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  X
} from 'lucide-react';

export default function InvoicesPage({ currentUser }) {
  const [selectedStore, setSelectedStore] = useState(currentUser?.storeId || '');
  const [activeInvoiceDetail, setActiveInvoiceDetail] = useState(null);

  React.useEffect(() => {
    setSelectedStore(currentUser?.storeId || '');
  }, [currentUser]);

  // Invoices filtered by user store
  const userInvoices = (currentUser?.invoices || []).filter(inv => 
    !selectedStore || inv.storeId === selectedStore
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Main Card matching Screenshot 5 */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        
        {/* Card Header matching Screenshot 5 */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Invoices
            </h1>
          </div>

          {/* Select Store Dropdown matching screenshot */}
          <div className="flex items-center gap-3">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
              Select Store
            </label>
            <div className="relative min-w-[240px]">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-9 shadow-2xs cursor-pointer"
              >
                <option value="">Select Store</option>
                <option value={currentUser.storeId}>{currentUser.storeName}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-6 min-h-[380px] flex items-center justify-center">
          {!selectedStore ? (
            /* EXACT Empty State from Screenshot 5 */
            <div className="text-center py-12 px-4 max-w-md mx-auto">
              {/* Receipt / Invoice Icon with Dollar Sign */}
              <div className="w-20 h-24 mx-auto mb-4 border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50/50 relative shadow-2xs">
                {/* Top notch decoration */}
                <div className="absolute -top-1 w-10 h-1 bg-gray-300 rounded-full" />
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mb-1">
                  <DollarSign className="w-6 h-6 text-gray-400 stroke-[2.5]" />
                </div>
                <div className="w-10 h-1.5 bg-gray-200 rounded-full mb-1" />
                <div className="w-6 h-1.5 bg-gray-200 rounded-full" />
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                No Invoices Found
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                Select a store to view available invoices.
              </p>

              {/* Quick Click Hint */}
              <button
                onClick={() => setSelectedStore(currentUser.storeId)}
                className="mt-6 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-bold border border-purple-200 transition-colors cursor-pointer"
              >
                Quick view: {currentUser.storeName}
              </button>
            </div>
          ) : (
            /* Populated Invoices List for Selected Store */
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                <span>Showing {userInvoices.length} remittance statements for {currentUser.storeName}</span>
                <span className="font-semibold text-emerald-600">Weekly Guaranteed Payout Active</span>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">INVOICE NO</th>
                      <th className="py-3 px-4">BILLING PERIOD</th>
                      <th className="py-3 px-4">DELIVERY RATIO</th>
                      <th className="py-3 px-4">GROSS COD</th>
                      <th className="py-3 px-4">SOURCING & FEES</th>
                      <th className="py-3 px-4">NET PAYOUT</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {userInvoices.map((inv) => (
                      <tr key={inv.invoiceNumber} className="hover:bg-purple-50/20 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-purple-700 font-mono">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">
                          {inv.billingPeriod}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-700">
                          {inv.deliveryRate} ({inv.ordersCount} orders)
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          {inv.grossCodCollected}
                        </td>
                        <td className="py-3.5 px-4 text-rose-600 font-medium">
                          -{inv.sourcingCost}
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-emerald-600 text-sm">
                          {inv.netProfit}
                        </td>
                        <td className="py-3.5 px-4">
                          {inv.status === 'Paid' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" /> Processing
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setActiveInvoiceDetail(inv)}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                            title="View Statement"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => alert(`Downloading PDF statement for ${inv.invoiceNumber}`)}
                            className="p-1.5 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Breakdown Modal */}
      {activeInvoiceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="bg-[#181135] p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Statement Breakdown</span>
                <h3 className="text-lg font-bold">{activeInvoiceDetail.invoiceNumber}</h3>
              </div>
              <button 
                onClick={() => setActiveInvoiceDetail(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Store Name:</span>
                <span className="font-semibold text-gray-900">{activeInvoiceDetail.storeName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Billing Period:</span>
                <span className="font-semibold text-gray-900">{activeInvoiceDetail.billingPeriod}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Gross COD Collected:</span>
                <span className="font-bold text-gray-900">{activeInvoiceDetail.grossCodCollected}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 text-rose-600">
                <span>Product Sourcing Cost:</span>
                <span>-{activeInvoiceDetail.sourcingCost}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 text-rose-600">
                <span>Zambeel Delivery & Handling Fee:</span>
                <span>-{activeInvoiceDetail.deliveryFee}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-200 text-sm font-black text-emerald-600">
                <span>Net Transferred to Bank:</span>
                <span className="text-base">{activeInvoiceDetail.netProfit}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    alert('PDF downloaded');
                    setActiveInvoiceDetail(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Tax Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
