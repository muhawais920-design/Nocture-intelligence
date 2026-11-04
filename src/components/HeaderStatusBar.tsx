import React from 'react';
import { Wifi, Battery, Sparkles, Bell, Radio } from 'lucide-react';

interface HeaderStatusBarProps {
  studentName: string;
  major: string;
  year: string;
  avatarUrl: string;
  onOpenAI: () => void;
  onOpenProfile?: () => void;
  activeScreenTitle?: string;
  isMobileFrame?: boolean;
}

export const HeaderStatusBar: React.FC<HeaderStatusBarProps> = ({
  studentName,
  major,
  year,
  avatarUrl,
  onOpenAI,
  activeScreenTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#080F2B]/90 backdrop-blur-md border-b border-[#29375C]/60 pt-2 pb-3 px-4 transition-all">
      {/* Mobile-Style Top Status Strip */}
      <div className="flex items-center justify-between text-[11px] text-[#8996B5] font-medium tracking-wide mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-white tracking-normal text-xs">09:41</span>
          <span className="text-[10px] text-[#10BFA5] font-semibold flex items-center gap-1 bg-[#10BFA5]/10 px-1.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10BFA5] animate-pulse"></span>
            LIVE
          </span>
        </div>

        {/* Dynamic Island / Status capsule */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#172447] border border-[#29375C] px-2.5 py-0.5 rounded-full text-[10px] text-[#B8C4E0]">
          <Radio className="w-3 h-3 text-[#22D3EE] animate-pulse" />
          <span>CS 482 · In Progress (34m left)</span>
        </div>

        <div className="flex items-center gap-2 text-white">
          <span className="text-[10px] font-semibold tracking-wider text-[#B8C4E0]">5G</span>
          <Wifi className="w-3.5 h-3.5 text-[#B8C4E0]" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#B8C4E0]">98%</span>
            <Battery className="w-3.5 h-3.5 text-[#10BFA5]" />
          </div>
        </div>
      </div>

      {/* Main Student Header Bar */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: Avatar with Mint Online Beacon & Student Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt={studentName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#29375C] border border-[#172447]"
            />
            {/* Mint status beacon ring */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10BFA5] ring-2 ring-[#080F2B] flex items-center justify-center glow-mint"
              title="Focus Mode Active"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                {studentName}
              </h1>
              <span className="text-[10px] font-medium text-[#10BFA5] bg-[#10BFA5]/15 px-2 py-0.5 rounded-full shrink-0 border border-[#10BFA5]/30">
                Focus Mode
              </span>
            </div>
            <p className="text-xs text-[#8996B5] truncate">
              {major} · {year}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Pill Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAI}
            aria-label="Open Nocturne AI Copilot"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-semibold glow-violet hover:opacity-95 transition-all active:scale-95 cursor-pointer shadow-lg shadow-purple-900/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5de6ff] animate-spin-slow" />
            <span className="hidden xs:inline">Ask Nocturne</span>
            <span className="xs:hidden">AI</span>
          </button>
        </div>
      </div>

      {activeScreenTitle && (
        <div className="mt-2.5 pt-2 border-t border-[#29375C]/40 flex items-center justify-between text-xs">
          <span className="text-[#8996B5]">Active View:</span>
          <span className="font-semibold text-[#5de6ff]">{activeScreenTitle}</span>
        </div>
      )}
    </header>
  );
};
