import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  ChevronRight,
  Radio,
  FileText,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { ScheduleItem, TaskItem, AIQueryPreset } from '../types/index.ts';
import { AI_QUERY_PRESETS } from '../data/mockData.ts';

interface DashboardViewProps {
  studentName: string;
  gpa: number;
  gpaDelta: string;
  attendanceRate: number;
  studyHoursLogged: number;
  weeklyTargetHours: number;
  schedule: ScheduleItem[];
  tasks: TaskItem[];
  onSelectLecture: (item: ScheduleItem) => void;
  onToggleTask: (taskId: string) => void;
  onSelectAIQuery: (preset: AIQueryPreset) => void;
  onViewAllSchedule: () => void;
  onViewAllTasks: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  studentName,
  gpa,
  gpaDelta,
  attendanceRate,
  studyHoursLogged,
  weeklyTargetHours,
  schedule,
  tasks,
  onSelectLecture,
  onToggleTask,
  onSelectAIQuery,
  onViewAllSchedule,
  onViewAllTasks,
}) => {
  // Sort today's / active lectures
  const todayLectures = schedule.slice(0, 3);
  const pendingTasks = tasks.filter((t) => t.status !== 'completed').slice(0, 3);

  return (
    <div className="space-y-5 pb-24 text-[#dde1ff]">
      {/* Flight Deck Header & Greeting */}
      <section className="pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#8996B5] uppercase tracking-wider">
              Today's Flight Deck
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Good day, {studentName.split(' ')[0]}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172447] border border-[#29375C] text-xs text-[#22D3EE]">
            <Radio className="w-3.5 h-3.5 text-[#22D3EE] animate-pulse" />
            <span className="font-medium text-[11px]">Next: CS 482 (24m)</span>
          </div>
        </div>
      </section>

      {/* Quick-Metric Cards (2x2 Grid) */}
      <section aria-label="Academic Metrics" className="grid grid-cols-2 gap-3">
        {/* GPA Metric */}
        <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-black/20 relative overflow-hidden group hover:border-[#7C3AED]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8996B5]">Term GPA</span>
            <span className="p-1.5 rounded-lg bg-[#7C3AED]/15 text-[#d2bbff]">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {gpa.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-[#10BFA5] flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              {gpaDelta}
            </span>
          </div>
          <p className="text-[11px] text-[#8996B5] mt-1">Dean's Honor Roll Standing</p>
        </div>

        {/* Attendance Metric */}
        <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-black/20 relative overflow-hidden group hover:border-[#10BFA5]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8996B5]">Attendance</span>
            <span className="p-1.5 rounded-lg bg-[#10BFA5]/15 text-[#10BFA5]">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {attendanceRate}%
            </span>
            <span className="text-[11px] font-bold text-[#10BFA5] bg-[#10BFA5]/15 px-1.5 py-0.5 rounded-md border border-[#10BFA5]/30">
              Exemplary
            </span>
          </div>
          <p className="text-[11px] text-[#8996B5] mt-1">100% lab compliance</p>
        </div>

        {/* Weekly Study Hours */}
        <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-black/20 relative overflow-hidden group hover:border-[#22D3EE]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8996B5]">Study Hours</span>
            <span className="p-1.5 rounded-lg bg-[#22D3EE]/15 text-[#22D3EE]">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {studyHoursLogged}
            </span>
            <span className="text-xs text-[#8996B5]">/ {weeklyTargetHours}h target</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-[#101A3A] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] h-full rounded-full"
              style={{ width: `${Math.min(100, (studyHoursLogged / weeklyTargetHours) * 100)}%` }}
            />
          </div>
        </div>

        {/* Active Deliverables */}
        <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-black/20 relative overflow-hidden group hover:border-[#F59E0B]/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8996B5]">Deliverables</span>
            <span className="p-1.5 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B]">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {pendingTasks.length}
            </span>
            <span className="text-xs font-medium text-[#F59E0B]">Due this week</span>
          </div>
          <p className="text-[11px] text-[#8996B5] mt-1">CS 482 & MATH 314 next</p>
        </div>
      </section>

      {/* AI Smart Assistant Card - Specification Hero Component */}
      <section
        aria-label="Nocturne Ambient AI"
        className="relative bg-[#1E2D58]/70 backdrop-blur-xl border border-[#29375C] rounded-2xl p-4 sm:p-5 shadow-xl shadow-[#7C3AED]/10 ambient-ai-ring overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center glow-violet">
                <Sparkles className="w-4 h-4 text-[#5de6ff]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Nocturne Ambient AI
                </h3>
                <p className="text-[11px] text-[#8996B5]">
                  Academic Synthesis & Exam Reasoning Partner
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#5de6ff] bg-[#22D3EE]/15 px-2 py-0.5 rounded-full border border-[#22D3EE]/30">
              Active Sync
            </span>
          </div>

          <p className="text-xs text-[#B8C4E0] leading-relaxed mb-3">
            Ready to break down today's lecture manifolds, generate stochastic calc proofs, or optimize your submission flight plan.
          </p>

          {/* Contextual Query Pills - Clickable */}
          <div className="flex flex-wrap gap-2 pt-1">
            {AI_QUERY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectAIQuery(preset)}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#101A3A]/80 border border-[#29375C] hover:border-[#8B5CF6] hover:bg-[#7C3AED]/20 text-xs font-medium text-[#dde1ff] hover:text-[#5de6ff] transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="text-[#8B5CF6] text-xs font-bold">⚡</span>
                <span>{preset.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Lectures & Timetable Cards (with 4px accent indicator stripe) */}
      <section aria-label="Today Schedule" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#22D3EE]" />
            Today's Timetable
          </h3>
          <button
            onClick={onViewAllSchedule}
            className="text-xs font-semibold text-[#5de6ff] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Full Week <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {todayLectures.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectLecture(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectLecture(item)}
              className="relative bg-[#172447] hover:bg-[#1E2D58] border border-[#29375C] rounded-2xl p-4 pl-5 shadow-md transition-all cursor-pointer overflow-hidden group"
            >
              {/* 4px Left Accent Indicator Stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: item.accentColor }}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${item.accentColor}20`,
                        color: item.accentColor,
                      }}
                    >
                      {item.courseCode}
                    </span>
                    <span className="text-[11px] text-[#8996B5] font-medium">
                      {item.type}
                    </span>
                    {item.status === 'in-progress' && (
                      <span className="text-[10px] font-bold text-[#10BFA5] bg-[#10BFA5]/15 px-2 py-0.5 rounded-full border border-[#10BFA5]/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10BFA5] animate-pulse" />
                        In Progress
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-[#5de6ff] transition-colors truncate">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-[#8996B5] mt-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                      {item.startTime} - {item.endTime}
                    </span>
                    <span>·</span>
                    <span className="truncate">{item.room}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {item.hasNotesSync && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#10BFA5] bg-[#10BFA5]/10 px-2 py-0.5 rounded-md">
                      <FileText className="w-3 h-3" />
                      Synced
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Priority Coursework Deliverables */}
      <section aria-label="Priority Deliverables" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
            Active Course Deliverables
          </h3>
          <button
            onClick={onViewAllTasks}
            className="text-xs font-semibold text-[#5de6ff] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            All Tasks ({tasks.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-[#172447] border border-[#29375C] p-3 rounded-xl hover:border-[#7C3AED]/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => onToggleTask(task.id)}
                  aria-label={`Mark ${task.title} as completed`}
                  className="w-5 h-5 rounded-md border border-[#29375C] hover:border-[#10BFA5] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                >
                  {task.status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-[#10BFA5]" />
                  )}
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#5de6ff]">
                      {task.courseCode}
                    </span>
                    <span className="text-[10px] text-[#8996B5]">·</span>
                    <span className="text-[10px] text-[#F59E0B] font-semibold">
                      {task.dueDay}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-white truncate">
                    {task.title}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1E2D58] text-[#8996B5] shrink-0 border border-[#29375C]">
                {task.difficulty}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
