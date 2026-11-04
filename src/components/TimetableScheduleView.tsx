import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  User,
  Filter,
  FileText,
  Search,
} from 'lucide-react';
import { ScheduleItem, DayOfWeek, ActivityType } from '../types/index.ts';
import { filterSchedule } from '../utils/academic-logic.ts';

interface TimetableScheduleViewProps {
  schedule: ScheduleItem[];
  onSelectLecture: (item: ScheduleItem) => void;
  onOpenAddModal: () => void;
}

export const TimetableScheduleView: React.FC<TimetableScheduleViewProps> = ({
  schedule,
  onSelectLecture,
  onOpenAddModal,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Mon');
  const [selectedType, setSelectedType] = useState<ActivityType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const days: { day: DayOfWeek; label: string; dateNum: string }[] = [
    { day: 'Mon', label: 'Mon', dateNum: '04' },
    { day: 'Tue', label: 'Tue', dateNum: '05' },
    { day: 'Wed', label: 'Wed', dateNum: '06' },
    { day: 'Thu', label: 'Thu', dateNum: '07' },
    { day: 'Fri', label: 'Fri', dateNum: '08' },
    { day: 'Sat', label: 'Sat', dateNum: '09' },
    { day: 'Sun', label: 'Sun', dateNum: '10' },
  ];

  const types: (ActivityType | 'All')[] = [
    'All',
    'Lecture',
    'Lab',
    'Study Block',
    'Office Hours',
  ];

  const filteredSchedule = filterSchedule(schedule, selectedDay, selectedType).filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.courseCode.toLowerCase().includes(q) ||
      item.instructor.toLowerCase().includes(q) ||
      item.room.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-24 text-[#dde1ff]">
      {/* Header and Add Session Trigger */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#22D3EE]" />
            Timetable & Lectures
          </h2>
          <p className="text-xs text-[#8996B5]">
            Fall 2026 Academic Schedule · Week 10
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-xs font-semibold glow-violet transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Session</span>
        </button>
      </div>

      {/* Week Timeline / Day Selector (Horizontal Capsule Bar) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        {days.map((d) => {
          const isSelected = selectedDay === d.day;
          const dayCount = schedule.filter((s) => s.day === d.day).length;

          return (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`flex flex-col items-center justify-center min-w-[50px] py-2 px-2.5 rounded-2xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#7C3AED] to-[#4F46E5] text-white shadow-lg shadow-purple-900/40 border border-[#d2bbff]/40 scale-105'
                  : 'bg-[#172447] text-[#8996B5] hover:text-[#dde1ff] hover:bg-[#1E2D58] border border-[#29375C]'
              }`}
            >
              <span className="text-[11px] font-medium tracking-tight uppercase">
                {d.label}
              </span>
              <span className="text-base font-extrabold mt-0.5 tracking-normal">
                {d.dateNum}
              </span>
              <span
                className={`text-[9px] font-bold mt-1 px-1.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#101A3A] text-[#8996B5]'
                }`}
              >
                {dayCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lectures, halls, topics, or faculty..."
            className="w-full bg-[#101A3A] border border-[#29375C] focus:border-[#22D3EE] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8996B5] outline-none transition-colors"
          />
        </div>

        {/* Activity Type Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-[#8996B5] shrink-0 ml-1 mr-0.5" />
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === t
                  ? 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40 font-semibold'
                  : 'bg-[#172447] text-[#8996B5] hover:text-white border border-[#29375C]/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3 pt-1">
        {filteredSchedule.length === 0 ? (
          <div className="text-center py-12 bg-[#172447]/60 rounded-2xl border border-dashed border-[#29375C] p-6">
            <CalendarIcon className="w-8 h-8 text-[#8996B5] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-white">No sessions found</p>
            <p className="text-xs text-[#8996B5] mt-1 max-w-xs mx-auto">
              No academic activities match "{selectedType}" for {selectedDay}. Click "Add Session" to schedule a study block or seminar.
            </p>
          </div>
        ) : (
          filteredSchedule.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectLecture(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectLecture(item)}
              className="relative bg-[#172447] hover:bg-[#1E2D58] border border-[#29375C] rounded-2xl p-4 pl-5 shadow-lg transition-all cursor-pointer group"
            >
              {/* 4px Left Accent Indicator Stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: item.accentColor }}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${item.accentColor}25`,
                        color: item.accentColor,
                      }}
                    >
                      {item.courseCode}
                    </span>
                    <span className="text-xs text-[#8996B5] font-medium">
                      {item.type}
                    </span>
                    {item.status === 'in-progress' && (
                      <span className="text-[10px] font-bold text-[#10BFA5] bg-[#10BFA5]/15 px-2 py-0.5 rounded-full border border-[#10BFA5]/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10BFA5] animate-ping" />
                        In Progress
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#5de6ff] transition-colors">
                    {item.title}
                  </h3>

                  {item.topic && (
                    <p className="text-xs text-[#B8C4E0] mt-1 line-clamp-1">
                      {item.topic}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#8996B5] mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span className="text-white font-medium">
                        {item.startTime} – {item.endTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#10BFA5]" />
                      <span className="truncate">{item.room}</span>
                    </div>

                    <div className="flex items-center gap-1.5 col-span-full">
                      <User className="w-3.5 h-3.5 text-[#d2bbff]" />
                      <span className="truncate">{item.instructor}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  {item.hasNotesSync && (
                    <span className="flex items-center gap-1 text-[10px] text-[#10BFA5] bg-[#10BFA5]/10 px-2 py-0.5 rounded-md">
                      <FileText className="w-3 h-3" />
                      Live Notes
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-[#8B5CF6] group-hover:underline">
                    View &gt;
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
