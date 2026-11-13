import React from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, Clock, Coins, ArrowRight } from 'lucide-react';
import FlagIcon from './FlagIcon';

export default function CountryModal({ country, onClose, onSelect }) {
  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <FlagIcon country={country.id} className="w-20 h-14 rounded-xl shadow-lg border-2 border-white/30 object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold tracking-tight">{country.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white">
                  {country.code}
                </span>
              </div>
              <p className="text-purple-200 text-xs mt-1">Zambeel Automated COD Fulfillment Network</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/15 text-center">
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-[10px] text-purple-200 uppercase font-semibold">Delivery Ratio</div>
              <div className="text-lg font-semibold text-amber-300">{country.deliveryRate}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-[10px] text-purple-200 uppercase font-semibold">Average TAT</div>
              <div className="text-lg font-semibold text-white">{country.avgDeliveryDays}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-[10px] text-purple-200 uppercase font-semibold">Currency</div>
              <div className="text-lg font-semibold text-white">{country.currency}</div>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              Available Zambeel Services in {country.name}
            </h4>
            <div className="space-y-2">
              {country.availableServices.map((service, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-3.5 border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Zero Local Registration Needed:</span> You can start receiving orders right away. Zambeel collects COD payments in {country.currency} and remits directly to your international bank account weekly.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelect(country);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Start Selling in {country.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
