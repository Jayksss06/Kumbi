import React from 'react';
import { Home, BookOpen, Calculator, ChefHat, Users, Menu, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';
import { sound } from '../../lib/sound-effects';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: UserRole;
  onOpenMenu?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  userRole,
  onOpenMenu
}) => {
  const isKaderOrAdmin = userRole === 'KADER' || userRole === 'ADMIN';

  const handleNav = (view: string) => {
    sound.playClick();
    onNavigate(view);
  };

  const handleMenuClick = () => {
    sound.playClick();
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      onNavigate('kuis');
    }
  };

  const isHomeActive = currentView === 'home';
  const isEduActive = currentView === 'edukasi';
  const isCalcActive = currentView === 'kalkulator';
  const isRecipeActive = currentView === 'resep' || currentView.startsWith('resep-');
  const isKaderActive = currentView.startsWith('kader-') || currentView.startsWith('admin-');

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-auto sm:w-[460px] sm:left-1/2 sm:-translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-[0_8px_32px_rgba(46,90,68,0.12)] rounded-2xl px-2 py-1.5 transition-all no-print">
      <div 
        className="flex items-center justify-around w-full"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) * 0.5)' }}
      >
        
        {/* 1. Beranda */}
        <button
          onClick={() => handleNav('home')}
          className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
            isHomeActive 
              ? 'text-brand-green font-extrabold bg-brand-green/10' 
              : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Beranda"
        >
          <Home className={`w-5 h-5 transition-transform ${isHomeActive ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Beranda</span>
          {isHomeActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-green" />
          )}
        </button>

        {/* 2. Edukasi 3 Umbi */}
        <button
          onClick={() => handleNav('edukasi')}
          className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
            isEduActive 
              ? 'text-brand-green font-extrabold bg-brand-green/10' 
              : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Edukasi 3 Umbi"
        >
          <BookOpen className={`w-5 h-5 transition-transform ${isEduActive ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">3 Umbi</span>
          {isEduActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-green" />
          )}
        </button>

        {/* 3. Kalkulator Gizi */}
        <button
          onClick={() => handleNav('kalkulator')}
          className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
            isCalcActive 
              ? 'text-brand-green font-extrabold bg-brand-green/10' 
              : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Kalkulator Gizi"
        >
          <Calculator className={`w-5 h-5 transition-transform ${isCalcActive ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Kalkulator</span>
          {isCalcActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-green" />
          )}
        </button>

        {/* 4. Resep MPASI & Kudapan */}
        <button
          onClick={() => handleNav('resep')}
          className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
            isRecipeActive 
              ? 'text-brand-green font-extrabold bg-brand-green/10' 
              : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="Katalog Resep"
        >
          <ChefHat className={`w-5 h-5 transition-transform ${isRecipeActive ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Resep</span>
          {isRecipeActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-green" />
          )}
        </button>

        {/* 5. Ruang Kader (jika Kader/Admin) atau Menu Drawer */}
        {isKaderOrAdmin ? (
          <button
            onClick={() => handleNav('kader-dashboard')}
            className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
              isKaderActive 
                ? 'text-brand-orange font-extrabold bg-brand-orange/15' 
                : 'text-brand-orange hover:bg-orange-50/50'
            }`}
            aria-label="Ruang Kader"
          >
            <Users className={`w-5 h-5 transition-transform ${isKaderActive ? 'scale-110' : ''}`} />
            <span className="text-[10px] tracking-tight mt-0.5">Kader</span>
            {isKaderActive && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-orange" />
            )}
          </button>
        ) : (
          <button
            onClick={handleMenuClick}
            className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
              currentView === 'kuis' 
                ? 'text-brand-green font-extrabold bg-brand-green/10' 
                : 'text-stone-500 hover:text-stone-800'
            }`}
            aria-label="Menu Selengkapnya"
          >
            <Menu className="w-5 h-5 transition-transform" />
            <span className="text-[10px] tracking-tight mt-0.5">Menu</span>
          </button>
        )}

      </div>
    </div>
  );
};
