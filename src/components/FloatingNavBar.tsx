import React from 'react';
import { LayoutDashboard, CalendarDays, BookOpen, Sparkles, Radio } from 'lucide-react';

export type NavTabId = 'dashboard' | 'timetable' | 'courses' | 'ai' | 'campus';

interface FloatingNavBarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  pendingTasksCount?: number;
}

interface NavItem {
  id: NavTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  highlight?: boolean;
}

export const FloatingNavBar: React.FC<FloatingNavBarProps> = ({
  activeTab,
  onSelectTab,
  pendingTasksCount = 0,
}) => {
  const items: NavItem[] = [
    { id: 'dashboard', label: 'Today', icon: LayoutDashboard },
    { id: 'timetable', label: 'Schedule', icon: CalendarDays },
    { id: 'courses', label: 'Modules', icon: BookOpen, badge: pendingTasksCount > 0 ? pendingTasksCount : undefined },
    { id: 'ai', label: 'Nocturne AI', icon: Sparkles, highlight: true },
    { id: 'campus', label: 'Focus Hub', icon: Radio },
  ];

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="fixed bottom-4 left-0 right-0 z-40 mx-auto w-[92%] max-w-[420px] pointer-events-auto"
    >
      <div className="glass-nav rounded-full px-2 py-2 flex items-center justify-around shadow-2xl shadow-[#04091A]/80 border border-[#29375C]/90">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              aria-label={item.label}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#7C3AED]/25 text-[#5de6ff] scale-105'
                  : 'text-[#8996B5] hover:text-[#dde1ff] hover:bg-[#1E2D58]/40'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? item.highlight
                        ? 'text-[#d2bbff] drop-shadow-[0_0_8px_rgba(210,187,255,0.6)]'
                        : 'text-[#22D3EE] drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                      : 'text-[#8996B5]'
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-[#7C3AED] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-[#080F2B]">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'text-[#dde1ff] font-semibold' : 'text-[#8996B5]'
                }`}
              >
                {item.label}
              </span>

              {/* Active Dot Indicator */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#22D3EE] mt-0.5 shadow-[0_0_6px_#22D3EE]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
