import React, { useState } from 'react';
import { 
  FeatureGlobeIcon, 
  FeatureAccountManagerIcon, 
  FeatureTruckIcon, 
  FeatureCalendarIcon 
} from '../components/ZambeelIcons';
import FlagIcon from '../components/FlagIcon';
import CountryModal from '../components/CountryModal';
import { COUNTRIES } from '../data/mockData';

export default function GetStartedPage({ onNavigateToOrders }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="space-y-8 md:space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* 1. FIRST: Welcome to Zambeel Hero Section */}
      <div className="relative w-full min-h-[260px] md:min-h-[290px] flex flex-col justify-center items-center bg-gradient-to-r from-[#17308D] via-[#2A2B86] to-[#5C2B88] text-white py-14 md:py-16 px-8 md:px-12 rounded-3xl overflow-hidden text-center shadow-md">
        {/* Soft background glow circles like authentic Zambeel */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Welcome to Zambeel
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-normal">
            You just focus on the marketing and we will manage everything from product sourcing to customer delivery.
          </p>
        </div>
      </div>

      {/* 2. SECOND: Select Country Where You Want To Start (Flag grid reveals when scrolling) */}
      <section className="bg-white rounded-3xl p-6 md:p-8 pt-8 md:pt-10 shadow-sm border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-2.5">
            Select Country Where You Want To Start
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-normal">
            Please select country below to see available services
          </p>
        </div>

        {/* 9 Countries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5 justify-center pt-2">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country)}
              className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3 text-center focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95 cursor-pointer"
            >
              {/* Country Flag Container */}
              <div className="w-full flex items-center justify-center pt-1">
                <FlagIcon 
                  country={country.id} 
                  className="w-18 h-12 sm:w-20 sm:h-13 rounded-lg shadow-2xs group-hover:scale-105 transition-transform duration-200 object-cover border border-gray-100" 
                />
              </div>

              {/* Country Name */}
              <div className="w-full">
                <span className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-purple-700 transition-colors block">
                  {country.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. LAST: Why Choose Zambeel? (4 Feature Cards) */}
      <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-2.5">
            Why Choose Zambeel?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto">
            Start your Ecommerce business from Anywhere in the world without business registration
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 items-start">
          
          {/* Card 1: 9 countries */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50/70 transition-all group">
            <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-2xs">
              <FeatureGlobeIcon className="w-10 h-10 text-[#3B49DF]" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
              9 countries, One Platform
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
              Operate across UAE, KSA, Qatar, Kuwait, Iraq, Oman, Bahrain, Pakistan and USA from a single platform
            </p>
          </div>

          {/* Card 2: Dedicated account manager */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50/70 transition-all group">
            <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-2xs">
              <FeatureAccountManagerIcon className="w-10 h-10 text-[#3B49DF]" fillTie="#EEF2FF" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
              Dedicated account manager for everyone
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
              Personal support from your own account manager to help you grow
            </p>
          </div>

          {/* Card 3: 80% delivery ratio */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50/70 transition-all group">
            <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-2xs">
              <FeatureTruckIcon className="w-10 h-10 text-[#3B49DF]" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
              80% delivery ratio on COD
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
              Industry-leading delivery success rate for cash on delivery orders
            </p>
          </div>

          {/* Card 4: Weekly payments */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50/70 transition-all group">
            <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-2xs">
              <FeatureCalendarIcon className="w-10 h-10 text-[#3B49DF]" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
              Weekly payments guaranteed
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
              Get your profits every week in any bank account around the world
            </p>
          </div>
        </div>
      </section>

      {/* Modal for detailed country view */}
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onSelect={(c) => {
            alert(`Selected ${c.name}! Country fulfillment rules applied.`);
            onNavigateToOrders();
          }}
        />
      )}
    </div>
  );
}
