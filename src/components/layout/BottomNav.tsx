import React from 'react';
import { Home, BookOpen, HeartPulse, Calculator, ChefHat } from 'lucide-react';
import { sound } from '../../lib/sound-effects';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate
}) => {
  const handleNav = (view: string) => {
    sound.playClick();
    onNavigate(view);
  };

  const items = [
    { id: 'home', label: 'Beranda', icon: Home, active: currentView === 'home' },
    { id: 'edukasi', label: 'Edukasi', icon: BookOpen, active: currentView === 'edukasi' },
    { id: 'info-gizi', label: 'Info Gizi', icon: HeartPulse, active: currentView === 'info-gizi' },
    { id: 'kalkulator', label: 'Kalkulator', icon: Calculator, active: currentView === 'kalkulator' },
    { id: 'resep', label: 'Resep', icon: ChefHat, active: currentView === 'resep' || currentView.startsWith('resep-') },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 no-print">
      <div 
        className="flex items-center justify-around max-w-md mx-auto"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) * 0.5)' }}
      >
        {items.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 min-h-[52px] py-1 rounded-xl transition-all active:scale-95 touch-manipulation ${
                item.active 
                  ? 'text-brand-green font-extrabold bg-brand-green/10' 
                  : 'text-stone-500 hover:text-stone-800 font-semibold'
              }`}
              aria-label={item.label}
            >
              <IconComponent className={`w-5 h-5 ${item.active ? 'text-brand-green' : 'text-stone-500'}`} />
              <span className="text-[11px] tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
