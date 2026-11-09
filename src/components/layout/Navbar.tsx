import React from 'react';
import { 
  UtensilsCrossed, 
  BookOpen, 
  Calculator, 
  ChefHat,
  Home,
  HeartPulse
} from 'lucide-react';
import { sound } from '../../lib/sound-effects';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate
}) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'edukasi', label: 'Edukasi Umbi', icon: BookOpen },
    { id: 'info-gizi', label: 'Informasi Gizi', icon: HeartPulse },
    { id: 'kalkulator', label: 'Kalkulator Gizi', icon: Calculator },
    { id: 'resep', label: 'Katalog Resep', icon: ChefHat },
  ];

  return (
    <>
      {/* Top Accent Line */}
      <div className="h-1.5 bg-gradient-to-r from-brand-green via-brand-orange to-brand-purple w-full no-print" />

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* 1. Brand Logo & Title */}
            <div 
              onClick={() => {
                sound.playClick();
                onNavigate('home');
              }} 
              className="flex items-center gap-3 cursor-pointer group shrink-0 select-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brand-green flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-all">
                <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight group-hover:text-brand-green transition-colors block leading-none">
                  Kumbi
                </span>
                <p className="text-[11px] sm:text-xs text-stone-500 font-semibold mt-0.5">
                  Edukasi Gizi & Resep Olahan Umbi
                </p>
              </div>
            </div>

            {/* 2. Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-brand-cream p-1.5 rounded-2xl border border-brand-border">
              {navItems.map(item => {
                const IconComponent = item.icon;
                const isActive = currentView === item.id || (item.id === 'resep' && currentView.startsWith('resep-'));
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      onNavigate(item.id);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 select-none ${
                      isActive
                        ? 'bg-brand-green text-white shadow-sm'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-white'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-green'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* 3. Mobile Quick Action Button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('resep');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                <ChefHat className="w-4 h-4" />
                <span>Cari Resep</span>
              </button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};
