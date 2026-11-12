import React, { useState } from 'react';
import { Globe, Bell, ChevronDown, User, Check, Shield, Settings, Users } from 'lucide-react';
import ZambeelLogo from './ZambeelLogo';
import { USERS } from '../data/mockData';

export default function Navbar({ currentUser, onSelectUser, setActivePage }) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('ar');
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 px-4 md:px-8 flex items-center justify-between relative shadow-xs">
      
      {/* Left spacer so center stays perfectly balanced */}
      <div className="w-10"></div>

      {/* Center: Zambeel Logo (Centered horizontally across navbar) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <button 
          onClick={() => setActivePage('get-started')}
          className="focus:outline-none transition-transform hover:scale-[1.01]"
        >
          <ZambeelLogo className="h-10 sm:h-11" />
        </button>
      </div>

      {/* Right Controls: Language, Notifications, User Profile */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setLangMenuOpen(!langMenuOpen);
              setNotifMenuOpen(false);
              setProfileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-purple-700 text-xs font-semibold transition-all shadow-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{selectedLang === 'ar' ? 'اللغة' : 'English'}</span>
            <ChevronDown className={`w-3 h-3 text-purple-600 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 text-xs">
              <button
                onClick={() => { setSelectedLang('ar'); setLangMenuOpen(false); }}
                className={`w-full px-3 py-2 flex items-center justify-between hover:bg-purple-50 text-gray-800 font-medium ${selectedLang === 'ar' ? 'bg-purple-50/70 text-purple-700 font-bold' : ''}`}
              >
                <span>العربية (اللغة)</span>
                {selectedLang === 'ar' && <Check className="w-3.5 h-3.5 text-purple-600" />}
              </button>
              <button
                onClick={() => { setSelectedLang('en'); setLangMenuOpen(false); }}
                className={`w-full px-3 py-2 flex items-center justify-between hover:bg-purple-50 text-gray-800 font-medium ${selectedLang === 'en' ? 'bg-purple-50/70 text-purple-700 font-bold' : ''}`}
              >
                <span>English</span>
                {selectedLang === 'en' && <Check className="w-3.5 h-3.5 text-purple-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifMenuOpen(!notifMenuOpen);
              setLangMenuOpen(false);
              setProfileMenuOpen(false);
            }}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-30">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-semibold text-xs text-gray-800">Notifications</span>
                <span className="text-[11px] text-purple-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="py-2 space-y-2">
                <div className="p-2 rounded-xl bg-purple-50/60 border border-purple-100/80 text-xs">
                  <div className="font-semibold text-gray-900">Shipment Route Update</div>
                  <p className="text-[11px] text-gray-600 mt-0.5">Air shipments to KSA moving via priority dispatch channels.</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">15 mins ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar with 4 Users Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setLangMenuOpen(false);
              setNotifMenuOpen(false);
            }}
            className="w-9 h-9 rounded-full bg-[#E2E8F0] hover:bg-gray-300 border border-gray-300 flex items-center justify-center text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="User Account"
          >
            <User className="w-5 h-5 text-gray-500" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2.5 z-40 animate-in fade-in duration-150">
              
              {/* Active Current User Card */}
              <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50/50 border-b border-gray-100 mx-2 rounded-xl mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    {currentUser.role}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600">
                    {currentUser.balance}
                  </span>
                </div>
                <div className="font-extrabold text-sm text-gray-900 mt-1.5">{currentUser.name}</div>
                <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
                <div className="text-[11px] text-purple-800 font-medium mt-1 truncate">
                  🏬 {currentUser.storeName}
                </div>
              </div>

              {/* 4 Switchable Users Section */}
              <div className="px-4 py-1.5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Users className="w-3 h-3 text-purple-600" />
                  <span>Switch Account (4 Profiles)</span>
                </div>
                <div className="space-y-1">
                  {USERS.map((usr) => {
                    const isCurrent = usr.id === currentUser.id;
                    return (
                      <button
                        key={usr.id}
                        onClick={() => {
                          onSelectUser(usr);
                          setProfileMenuOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-colors text-xs ${
                          isCurrent
                            ? 'bg-purple-100/70 border border-purple-200 font-bold text-purple-900'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{usr.label}: {usr.name}</span>
                            <span className="text-[10px] text-gray-400">({usr.market})</span>
                          </div>
                          <div className="text-[10px] text-gray-500 truncate max-w-[170px]">
                            {usr.storeName}
                          </div>
                        </div>
                        {isCurrent && <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-2 border-t border-gray-100 text-xs">
                <button 
                  onClick={() => { setActivePage('settings'); setProfileMenuOpen(false); }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span>Account & Store Settings</span>
                </button>
                <button 
                  onClick={() => { setActivePage('my-invoices'); setProfileMenuOpen(false); }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span>Invoices & Weekly Payout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
