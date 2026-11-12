import React, { useState, useEffect } from 'react';
import { 
  User, 
  Store, 
  CreditCard, 
  Shield, 
  Save,
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage({ currentUser }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states linked to active user
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [businessName, setBusinessName] = useState(currentUser.storeName);
  const [defaultCountry, setDefaultCountry] = useState(currentUser.market);
  const [currency, setCurrency] = useState(currentUser.currency);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [smsConfirmation, setSmsConfirmation] = useState(true);

  useEffect(() => {
    setFullName(currentUser.name);
    setEmail(currentUser.email);
    setPhone(currentUser.phone);
    setBusinessName(currentUser.storeName);
    setDefaultCountry(currentUser.market);
    setCurrency(currentUser.currency);
  }, [currentUser]);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Account Settings
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Managing profile for <span className="font-semibold text-purple-700">{currentUser.name}</span> ({currentUser.role})
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Business</span>
        </button>

        <button
          onClick={() => setActiveTab('stores')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'stores'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Connected Stores</span>
        </button>

        <button
          onClick={() => setActiveTab('payouts')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'payouts'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payout Bank Details</span>
        </button>

        <button
          onClick={() => setActiveTab('fulfillment')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'fulfillment'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Fulfillment & COD Rules</span>
        </button>
      </div>

      {/* Tab 1: Profile & Business */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 md:p-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Registered Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Store / Brand Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Primary Target Market</label>
                <select
                  value={defaultCountry}
                  onChange={(e) => setDefaultCountry(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="UAE">UAE (Dubai Hub)</option>
                  <option value="KSA">KSA (Riyadh Hub)</option>
                  <option value="Qatar">Qatar (Doha Hub)</option>
                  <option value="Kuwait">Kuwait (Kuwait City Hub)</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="USA">USA</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">Base Payout Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="QAR">QAR - Qatari Riyal</option>
                  <option value="KWD">KWD - Kuwaiti Dinar</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              {saveSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings updated successfully!</span>
                </div>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Connected Stores */}
      {activeTab === 'stores' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">Connected Store for {currentUser.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Automated order syncing and courier dispatch.</p>
          </div>

          <div className="border border-purple-200 bg-purple-50/40 rounded-2xl p-5 flex items-start justify-between max-w-xl">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-purple-700 text-sm shadow-2xs">
                🏪
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900">{currentUser.storeName}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Market: {currentUser.market} | Currency: {currentUser.currency}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Webhook Active: Real-time syncing</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Payout Details */}
      {activeTab === 'payouts' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">Weekly Guaranteed Payout Bank Account</h2>
            <p className="text-xs text-gray-500 mt-0.5">Zambeel deposits net COD profits every week into your designated account.</p>
          </div>

          <div className="bg-gradient-to-r from-[#171336] to-[#2B1B54] text-white rounded-2xl p-6 shadow-md max-w-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-purple-300 uppercase">Primary Payout Method</span>
                <div className="text-lg font-black mt-1">{currentUser.bankName}</div>
              </div>
              <CreditCard className="w-8 h-8 text-amber-300" />
            </div>

            <div className="mt-6 space-y-1 font-mono text-xs">
              <div className="text-purple-200 text-[10px] font-sans">IBAN:</div>
              <div className="tracking-widest font-semibold">{currentUser.bankIban}</div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/15 flex justify-between text-xs text-purple-200">
              <div>
                <span className="text-[10px] block opacity-75">Account Title:</span>
                <span className="font-semibold text-white">{currentUser.bankTitle}</span>
              </div>
              <div>
                <span className="text-[10px] block opacity-75">Status:</span>
                <span className="font-semibold text-emerald-300">Verified & Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Fulfillment Preferences */}
      {activeTab === 'fulfillment' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">COD Fulfillment & Dispatch Automation</h2>
            <p className="text-xs text-gray-500 mt-0.5">Configure automated delivery rules and customer confirmation.</p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <div>
                <span className="font-bold text-gray-900 text-sm block">Auto-Dispatch New Orders</span>
                <span className="text-gray-500">Automatically route incoming orders to the closest Zambeel fulfillment hub within 2 hours.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={smsConfirmation}
                onChange={(e) => setSmsConfirmation(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <div>
                <span className="font-bold text-gray-900 text-sm block">Automated WhatsApp Address Verification</span>
                <span className="text-gray-500">Send an automated WhatsApp confirmation message to customers before dispatch to ensure 85%+ delivery success.</span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
