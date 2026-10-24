import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  Shield, 
  Users, 
  QrCode, 
  ChevronDown, 
  Sparkles,
  ChefHat,
  Home,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { demoLogin } from '../../lib/storage-sync';
import { sound } from '../../lib/sound-effects';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: User;
  onUserChange: (user: User) => void;
  onOpenQuickPmt: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onUserChange,
  onOpenQuickPmt,
  isMobileMenuOpen = false,
  onToggleMobileMenu,
  onCloseMobileMenu
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [localMobileMenuOpen, setLocalMobileMenuOpen] = useState(false);

  const mobileOpen = onToggleMobileMenu ? isMobileMenuOpen : localMobileMenuOpen;
  const toggleMobile = () => {
    sound.playClick();
    if (onToggleMobileMenu) {
      onToggleMobileMenu();
    } else {
      setLocalMobileMenuOpen(!localMobileMenuOpen);
    }
  };
  const closeMobile = () => {
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    } else {
      setLocalMobileMenuOpen(false);
    }
  };

  const handleSwitchRole = (role: UserRole) => {
    sound.playCheck();
    const updated = demoLogin(role);
    onUserChange(updated);
    setIsRoleDropdownOpen(false);
    closeMobile();
  };

  const getUserInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getRoleTheme = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          avatarBg: 'bg-purple-700 text-white',
          label: 'Admin Fasilitator',
          subLabel: 'SDGs & Peneliti'
        };
      case 'KADER':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          avatarBg: 'bg-emerald-700 text-white',
          label: 'Kader Posyandu',
          subLabel: 'Meja 4 & PMT'
        };
      default:
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          avatarBg: 'bg-amber-600 text-white',
          label: 'Ibu Balita',
          subLabel: 'Akses Mandiri'
        };
    }
  };

  const currentTheme = getRoleTheme(currentUser.role);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'edukasi', label: 'Edukasi 3 Umbi', icon: BookOpen },
    { id: 'kalkulator', label: 'Kalkulator Gizi', icon: Calculator },
    { id: 'resep', label: 'Katalog Resep', icon: ChefHat },
    { id: 'kuis', label: 'Kuis & Mitos', icon: HelpCircle },
  ];

  return (
    <>
      {/* Top Hairline Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-brand-green via-emerald-500 via-brand-orange to-purple-600 w-full no-print" />

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-200/70 shadow-[0_4px_24px_-4px_rgba(46,90,68,0.06)] no-print transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* 1. Left: Brand Emblem & Logotype */}
            <div 
              onClick={() => {
                sound.playClick();
                onNavigate('home');
              }} 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 select-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-brand-green via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-brand-green/20 group-hover:scale-105 transition-all">
                <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight group-hover:text-brand-green transition-colors block">
                  Kumbi
                </span>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium hidden sm:block">
                  Dapur Edukasi & Resep Olahan Posyandu
                </p>
              </div>
            </div>

            {/* 2. Center: Desktop Segmented Island Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-full border border-stone-200/80 shadow-inner">
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 select-none ${
                      isActive
                        ? 'bg-white text-brand-green shadow-sm shadow-stone-200'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-brand-green' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Special Role Link for KADER / ADMIN */}
              {(currentUser.role === 'KADER' || currentUser.role === 'ADMIN') && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('kader-dashboard');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 select-none ${
                    currentView.startsWith('kader-')
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'text-brand-orange hover:bg-orange-50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Ruang Kader</span>
                </button>
              )}

              {/* Special Role Link for ADMIN */}
              {currentUser.role === 'ADMIN' && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate('admin-dashboard');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 select-none ${
                    currentView.startsWith('admin-')
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin SDGs</span>
                </button>
              )}
            </nav>

            {/* 3. Right: Quick Actions & User Switcher */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Quick PMT Code Trigger */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenQuickPmt();
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-xl sm:rounded-full text-xs font-bold transition-all border border-stone-200 active:scale-95 shadow-xs"
                title="Ketik kode kotak PMT (contoh: UMBI-01)"
              >
                <QrCode className="w-4 h-4 text-brand-orange" />
                <span className="hidden md:inline">Kode PMT</span>
                <span className="md:hidden text-[11px]">Kode</span>
              </button>

              {/* Desktop & Tablet User Role Switcher Pill */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsRoleDropdownOpen(!isRoleDropdownOpen);
                  }}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all active:scale-95 text-left bg-white shadow-xs ${currentTheme.border} hover:bg-stone-50`}
                >
                  {/* Monogram Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-xs ${currentTheme.avatarBg}`}>
                    {getUserInitials(currentUser.name)}
                  </div>

                  <div className="flex flex-col pr-1">
                    <span className="text-xs font-extrabold text-stone-800 truncate max-w-[110px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] font-semibold leading-none ${currentTheme.text}`}>
                      {currentTheme.label}
                    </span>
                  </div>

                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Desktop Role Switcher Dropdown */}
                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-xl border border-stone-200/90 p-3.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 bg-stone-50 rounded-xl border border-stone-200/60 mb-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Peran Aktif</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentTheme.badgeBg}`}>
                          {currentTheme.label}
                        </span>
                      </div>
                      <p className="font-extrabold text-stone-900 text-sm mt-1">{currentUser.name}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Posyandu Melati RW 05, Beji</p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-stone-500 px-1">Beralih Mode (One-Click Demo):</p>
                      
                      <button
                        onClick={() => handleSwitchRole('PUBLIC_USER')}
                        className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                          currentUser.role === 'PUBLIC_USER'
                            ? 'bg-amber-50 text-amber-900 font-bold border border-amber-300'
                            : 'hover:bg-stone-50 text-stone-700 border border-transparent'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-stone-900">Bunda Nisa</p>
                          <p className="text-[11px] text-stone-500">Ibu Balita (Edukasi, Kalkulator, Resep)</p>
                        </div>
                        {currentUser.role === 'PUBLIC_USER' && (
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                      </button>

                      <button
                        onClick={() => handleSwitchRole('KADER')}
                        className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                          currentUser.role === 'KADER'
                            ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-300'
                            : 'hover:bg-stone-50 text-stone-700 border border-transparent'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-stone-900">Ibu Siti</p>
                          <p className="text-[11px] text-stone-500">Kader Posyandu (Meja 4, Belanja PMT, Stiker QR)</p>
                        </div>
                        {currentUser.role === 'KADER' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        )}
                      </button>

                      <button
                        onClick={() => handleSwitchRole('ADMIN')}
                        className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                          currentUser.role === 'ADMIN'
                            ? 'bg-purple-50 text-purple-900 font-bold border border-purple-300'
                            : 'hover:bg-stone-50 text-stone-700 border border-transparent'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-stone-900">Fasilitator UI</p>
                          <p className="text-[11px] text-stone-500">Admin SDGs & Evaluasi Akademik</p>
                        </div>
                        {currentUser.role === 'ADMIN' && (
                          <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Quick User Role Avatar Button (Small screen) */}
              <button
                onClick={toggleMobile}
                className={`sm:hidden w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-xs border ${currentTheme.avatarBg} ${currentTheme.border} active:scale-95`}
                title="Buka Menu Pengguna"
                aria-label="Menu Pengguna"
              >
                {getUserInitials(currentUser.name)}
              </button>

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                onClick={toggleMobile}
                className="lg:hidden p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors border border-stone-200 active:scale-95"
                aria-label="Toggle Navigation Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* 4. Mobile Fullscreen Slide-Over Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur */}
          <div 
            onClick={closeMobile}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          {/* Drawer Sheet */}
          <div className="fixed top-0 right-0 bottom-0 w-[88vw] max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250 safe-top safe-bottom">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-green to-emerald-800 flex items-center justify-center text-white shadow-sm">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base leading-tight">Kumbi</h3>
                  <p className="text-[11px] text-stone-500 font-medium">Navigasi Terpadu Posyandu</p>
                </div>
              </div>

              <button
                onClick={closeMobile}
                className="p-2 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-stone-800 active:scale-95"
                aria-label="Tutup menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* User Profile & Quick Role Switcher Box */}
              <div className={`p-3.5 rounded-2xl border ${currentTheme.bg} ${currentTheme.border} space-y-3`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-xs ${currentTheme.avatarBg}`}>
                    {getUserInitials(currentUser.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-stone-900 text-sm">{currentUser.name}</span>
                    </div>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${currentTheme.badgeBg}`}>
                      {currentTheme.label}
                    </span>
                  </div>
                </div>

                {/* 3-Role Quick Switch Tabs */}
                <div className="pt-2 border-t border-stone-200/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                    Ganti Peran Pengguna:
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-stone-200">
                    <button
                      onClick={() => handleSwitchRole('PUBLIC_USER')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        currentUser.role === 'PUBLIC_USER'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Ibu Balita
                    </button>
                    <button
                      onClick={() => handleSwitchRole('KADER')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        currentUser.role === 'KADER'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Kader
                    </button>
                    <button
                      onClick={() => handleSwitchRole('ADMIN')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        currentUser.role === 'ADMIN'
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Destinations */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                  Menu Utama
                </span>

                {navItems.map(item => {
                  const IconComponent = item.icon;
                  const isActive = currentView === item.id || (item.id === 'resep' && currentView.startsWith('resep-'));
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playClick();
                        onNavigate(item.id);
                        closeMobile();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                        isActive
                          ? 'bg-brand-green text-white font-extrabold shadow-sm'
                          : 'text-stone-700 hover:bg-stone-100 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-300'}`} />
                    </button>
                  );
                })}

                {/* Special Link: Ruang Kader */}
                {(currentUser.role === 'KADER' || currentUser.role === 'ADMIN') && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onNavigate('kader-dashboard');
                      closeMobile();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                      currentView.startsWith('kader-')
                        ? 'bg-brand-orange text-white font-extrabold shadow-sm'
                        : 'text-brand-orange bg-orange-50/70 hover:bg-orange-100/70 font-bold border border-orange-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <div>
                        <span className="text-sm block">Ruang Kerja Kader</span>
                        <span className="text-[10px] opacity-80 block">Meja 4, Belanja PMT & Cetak QR</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {/* Special Link: Admin SDGs */}
                {currentUser.role === 'ADMIN' && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onNavigate('admin-dashboard');
                      closeMobile();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                      currentView.startsWith('admin-')
                        ? 'bg-purple-700 text-white font-extrabold shadow-sm'
                        : 'text-purple-700 bg-purple-50/70 hover:bg-purple-100/70 font-bold border border-purple-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <div>
                        <span className="text-sm block">Dashboard Admin SDGs</span>
                        <span className="text-[10px] opacity-80 block">Evaluasi Akademik & Ekspor CSV</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Box Code PMT Action */}
              <div className="p-4 bg-stone-100/80 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-800">
                  <QrCode className="w-4 h-4 text-brand-orange" />
                  <span className="text-xs font-bold">Punya Kotak PMT Posyandu?</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Masukkan kode unik (contoh: UMBI-01) untuk membaca panduan MPASI dan takaran gizi langsung di smartphone.
                </p>
                <button
                  onClick={() => {
                    closeMobile();
                    onOpenQuickPmt();
                  }}
                  className="w-full py-2.5 bg-brand-orange text-white rounded-xl text-xs font-bold shadow-xs hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Buka Kotak PMT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* SDGs Impact Alignment */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/60 text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                  <Award className="w-3.5 h-3.5 text-brand-green" />
                  <span>Kemitraan SDGs Terukur</span>
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed">
                  Mendukung SDG 2 (Tanpa Kelaparan), SDG 3 (Kesehatan Balita), dan SDG 12 (Konsumsi Pangan Bertanggung Jawab).
                </p>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-stone-200 text-center text-[10px] text-stone-400 bg-stone-50/50">
              Kumbi v1.0 • Platform Edukasi Resep Olahan Umbi Posyandu
            </div>

          </div>
        </div>
      )}
    </>
  );
};
