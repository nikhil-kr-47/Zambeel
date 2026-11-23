import React, { useState } from 'react';
import { 
  Landmark, 
  CreditCard, 
  Clock, 
  Check, 
  Scissors, 
  Upload, 
  Info, 
  ChevronRight, 
  ChevronDown, 
  Coins, 
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function BankAccountsPage({ currentUser }) {
  const [bankTransferExpanded, setBankTransferExpanded] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Bank details customized according to each of the 5 accounts
  const getAccountBankDetails = (user) => {
    switch (user?.id) {
      case 'user2':
        return {
          bankName: 'Emirates Islamic - Dubai',
          holderName: 'Fatima Al-Dosari',
          code: 'AE29 0260 0012 3456 7890 222',
          country: 'United Arab Emirates',
          connectedSince: 'Connected since 15 Sep 2026',
          currency: 'AED'
        };
      case 'user3':
        return {
          bankName: 'Abu Dhabi Commercial Bank (ADCB)',
          holderName: 'Ahmed Al-Thani',
          code: 'AE55 0030 0001 2345 6789 333',
          country: 'United Arab Emirates',
          connectedSince: 'Connected since 02 Aug 2026',
          currency: 'AED'
        };
      case 'user4':
        return {
          bankName: 'First Abu Dhabi Bank (FAB)',
          holderName: 'Abdullah Al-Sabah',
          code: 'AE03 0030 0009 8765 4321 444',
          country: 'United Arab Emirates',
          connectedSince: 'Connected since 18 Jun 2026',
          currency: 'AED'
        };
      case 'user5':
        return {
          bankName: 'Dubai Islamic Bank (DIB)',
          holderName: 'Sultan Al-Qasimi',
          code: 'AE44 0240 0012 3456 7890 555',
          country: 'United Arab Emirates',
          connectedSince: 'Connected since 05 Jan 2026',
          currency: 'AED'
        };
      case 'user1':
      default:
        return {
          bankName: 'Kotak mahindra bank',
          holderName: 'M Bilal N Phansopkar',
          code: 'KKBK0001418',
          country: 'India',
          connectedSince: 'Connected since 23 Oct 2026',
          currency: 'AED'
        };
    }
  };

  const currentBank = getAccountBankDetails(currentUser);

  // Form state for replace account modal
  const [newBankName, setNewBankName] = useState(currentBank.bankName);
  const [newHolderName, setNewHolderName] = useState(currentBank.holderName);
  const [newCode, setNewCode] = useState(currentBank.code);
  const [newCountry, setNewCountry] = useState(currentBank.country);

  const handleReplaceAccount = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowReplaceModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* Top Header Section matching official Zambeel portal */}
      <div>
        <span className="text-[11px] font-bold text-amber-600 tracking-wider uppercase">
          BANK ACCOUNTS
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
          Payment Methods
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          One primary account is used for payouts across all your stores.
        </p>
      </div>

      {/* Primary Account Card matching Screenshot 3 (media_1794764513777_98a5dcd7.jpg) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Landmark Bank Icon */}
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 shadow-2xs">
              <Landmark className="w-6 h-6 stroke-[1.8]" />
            </div>

            {/* Bank Details */}
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {currentBank.bankName}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {currentBank.holderName}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-gray-600 pt-0.5">
                {currentBank.code}
              </p>
              <p className="text-xs text-gray-500">
                {currentBank.country}
              </p>
              <p className="text-xs text-gray-400 pt-1">
                {currentBank.connectedSince}
              </p>
            </div>
          </div>

          {/* Primary Badge */}
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              Primary
            </span>
          </div>
        </div>

        {/* Replace Account Button & Notice */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowReplaceModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs cursor-pointer"
          >
            Replace Account
          </button>
          <p className="text-xs text-gray-400 mt-2.5">
            Your current account stays under Previous Accounts. It cannot be deleted.
          </p>
        </div>
      </div>

      {/* Middle Card: Payment Processing Timeline matching Screenshot 2 (media_1794764513778_3744ca66.jpg) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 sm:p-7">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-900">
            <Clock className="w-4 h-4 text-gray-700 stroke-[2.2]" />
            <h2 className="font-bold text-sm sm:text-base tracking-tight">
              Payment Processing Timeline
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            UAE Time
          </span>
        </div>

        {/* 4-Step Connected Timeline */}
        <div className="relative mt-8 mb-4">
          {/* Horizontal Connecting Line */}
          <div className="hidden sm:block absolute top-5 left-10 right-10 h-[2px] bg-gray-200 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 relative z-10">
            
            {/* Step 1: Green Circle */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center sm:justify-center gap-1 text-xs font-semibold text-gray-900">
                  <span>Payment Method Locked</span>
                  <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Thu 6 PM
                </p>
              </div>
            </div>

            {/* Step 2: Pink/Rose Circle */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#e11d48] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Scissors className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center sm:justify-center gap-1 text-xs font-semibold text-gray-900">
                  <span>Orders Cut-Off for Invoices</span>
                  <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Thu 7 PM
                </p>
              </div>
            </div>

            {/* Step 3: Blue Circle */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Upload className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center sm:justify-center gap-1 text-xs font-semibold text-gray-900">
                  <span>Invoice uploaded on Portal</span>
                  <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Fri 6 PM
                </p>
              </div>
            </div>

            {/* Step 4: Yellow/Amber Circle */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <CreditCard className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center sm:justify-center gap-1 text-xs font-semibold text-gray-900">
                  <span>Payments Processed by Zambeel</span>
                  <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Mon-Tue
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Card: Payment type details matching Screenshot 1 (media_1794764513774_a91724b8.jpg) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 sm:p-7">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
          Payment type details
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Payment Methods, Processing Times, and Minimum Invoice Thresholds
        </p>

        {/* Table with Orange/Amber Headers */}
        <div className="overflow-x-auto rounded-xl border border-gray-200/80 mt-5">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            
            {/* Thead with orange uppercase text */}
            <thead className="border-b border-gray-200 text-[#d97706] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider bg-white">
              <tr>
                <th className="py-3.5 px-3 w-16 text-center">EXPAND</th>
                <th className="py-3.5 px-4 font-bold">PAYMENT METHOD / COUNTRY</th>
                <th className="py-3.5 px-4 font-bold">ACCOUNT TYPE</th>
                <th className="py-3.5 px-4 font-bold">MINIMUM PAYMENT AMOUNT</th>
                <th className="py-3.5 px-4 font-bold">
                  PAYMENT PROCESSING TIME <span className="normal-case font-normal text-gray-400">(After Zambeel has processed the payment)</span>
                </th>
              </tr>
            </thead>

            {/* Tbody */}
            <tbody className="divide-y divide-gray-100 text-gray-700">
              
              {/* Row 1: Bank Transfer */}
              <tr 
                onClick={() => setBankTransferExpanded(!bankTransferExpanded)}
                className="hover:bg-gray-50/70 transition-colors cursor-pointer"
              >
                <td className="py-4 px-3 text-center">
                  <button className="text-gray-400 hover:text-gray-700 inline-flex items-center justify-center">
                    {bankTransferExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-700" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-4 bg-[#2563eb] rounded-[3px] flex items-center justify-center text-white text-[9px] font-bold">
                      💳
                    </div>
                    <span className="font-semibold text-gray-900">Bank Transfer</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                  Click to see more
                </td>
                <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                  Click to see more
                </td>
                <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                  Click to see more
                </td>
              </tr>

              {/* Sub-rows for Bank Transfer when expanded */}
              {bankTransferExpanded && (
                <>
                  <tr className="bg-gray-50/50 text-xs">
                    <td className="py-2.5 px-3"></td>
                    <td className="py-2.5 px-4 pl-8 text-gray-600 font-medium">🇦🇪 United Arab Emirates (Local Transfer)</td>
                    <td className="py-2.5 px-4 text-gray-600">IBAN / Central Bank</td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">100 AED</td>
                    <td className="py-2.5 px-4 text-gray-600">Same day / 1 Business Day</td>
                  </tr>
                  <tr className="bg-gray-50/50 text-xs">
                    <td className="py-2.5 px-3"></td>
                    <td className="py-2.5 px-4 pl-8 text-gray-600 font-medium">🇸🇦 Saudi Arabia (SARIE Direct)</td>
                    <td className="py-2.5 px-4 text-gray-600">SAR IBAN</td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">100 SAR</td>
                    <td className="py-2.5 px-4 text-gray-600">1 Business Day</td>
                  </tr>
                  <tr className="bg-gray-50/50 text-xs">
                    <td className="py-2.5 px-3"></td>
                    <td className="py-2.5 px-4 pl-8 text-gray-600 font-medium">🇶🇦 Qatar (QCB Transfer)</td>
                    <td className="py-2.5 px-4 text-gray-600">QAR IBAN</td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">100 QAR</td>
                    <td className="py-2.5 px-4 text-gray-600">1 Business Day</td>
                  </tr>
                  <tr className="bg-gray-50/50 text-xs">
                    <td className="py-2.5 px-3"></td>
                    <td className="py-2.5 px-4 pl-8 text-gray-600 font-medium">🇰🇼 Kuwait (K-Net Wire)</td>
                    <td className="py-2.5 px-4 text-gray-600">KWD IBAN</td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">10 KWD</td>
                    <td className="py-2.5 px-4 text-gray-600">1 Business Day</td>
                  </tr>
                  <tr className="bg-gray-50/50 text-xs">
                    <td className="py-2.5 px-3"></td>
                    <td className="py-2.5 px-4 pl-8 text-gray-600 font-medium">🇮🇳 India / 🇵🇰 Pakistan (International Remittance)</td>
                    <td className="py-2.5 px-4 text-gray-600">SWIFT / Local RTGS</td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">100 AED equiv.</td>
                    <td className="py-2.5 px-4 text-gray-600">1-2 Business Days</td>
                  </tr>
                </>
              )}

              {/* Row 2: Crypto Payments */}
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="py-4 px-3 text-center"></td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                      ₿
                    </div>
                    <span className="font-semibold text-gray-900">Crypto Payments</span>
                    <span className="ml-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      Fastest Payments
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  TRON-20 supported
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">
                  10 AED
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  Same day
                </td>
              </tr>

              {/* Row 3: Paypal */}
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="py-4 px-3 text-center"></td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0070ba] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                      P
                    </div>
                    <span className="font-semibold text-gray-900">Paypal</span>
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  Paypal
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">
                  375 AED
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  1 Business Day
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Replace Account Modal */}
      {showReplaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="bg-[#181135] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Account Management</span>
                <h3 className="text-lg font-bold">Replace Primary Bank Account</h3>
              </div>
              <button 
                onClick={() => setShowReplaceModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReplaceAccount} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={newHolderName}
                  onChange={(e) => setNewHolderName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">IBAN / Account Number</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Account updated successfully. Verification in process.</span>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReplaceModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Save New Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
