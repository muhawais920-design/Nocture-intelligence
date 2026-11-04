import React from 'react';
import { X, MapPin, User, Clock, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScheduleItem } from '../types/index.ts';

interface LectureModalProps {
  lecture: ScheduleItem | null;
  onClose: () => void;
  onAskAI: (prompt: string, courseCode: string) => void;
}

export const LectureModal: React.FC<LectureModalProps> = ({ lecture, onClose, onAskAI }) => {
  if (!lecture) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lecture-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050C28]/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#172447] border border-[#29375C] rounded-2xl p-6 shadow-2xl text-[#dde1ff] overflow-hidden">
        {/* Accent top stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: lecture.accentColor || '#7C3AED' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8996B5] hover:text-white hover:bg-[#1E2D58] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-6">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
              style={{
                borderColor: `${lecture.accentColor}50`,
                backgroundColor: `${lecture.accentColor}18`,
                color: lecture.accentColor,
              }}
            >
              {lecture.courseCode} · {lecture.type}
            </span>
            <span className="text-xs text-[#8996B5] uppercase tracking-wider font-semibold">
              {lecture.day}
            </span>
            {lecture.status === 'in-progress' && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#10BFA5] bg-[#10BFA5]/15 px-2 py-0.5 rounded-full border border-[#10BFA5]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10BFA5] animate-ping" />
                Live Session
              </span>
            )}
          </div>
          <h2 id="lecture-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {lecture.title}
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2.5 bg-[#101A3A] p-3 rounded-xl border border-[#29375C]/60">
            <Clock className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <div className="text-xs">
              <p className="text-[#8996B5]">Session Time</p>
              <p className="font-semibold text-white">
                {lecture.startTime} – {lecture.endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-[#101A3A] p-3 rounded-xl border border-[#29375C]/60">
            <MapPin className="w-4 h-4 text-[#10BFA5] shrink-0" />
            <div className="text-xs">
              <p className="text-[#8996B5]">Hall / Location</p>
              <p className="font-semibold text-white truncate">{lecture.room}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-[#101A3A] p-3 rounded-xl border border-[#29375C]/60">
            <User className="w-4 h-4 text-[#d2bbff] shrink-0" />
            <div className="text-xs">
              <p className="text-[#8996B5]">Lead Instructor</p>
              <p className="font-semibold text-white truncate">{lecture.instructor}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-[#101A3A] p-3 rounded-xl border border-[#29375C]/60">
            <FileText className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <div className="text-xs">
              <p className="text-[#8996B5]">Sync & Notes</p>
              <p className="font-semibold text-[#10BFA5] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live Transcript Ready
              </p>
            </div>
          </div>
        </div>

        {/* Current Topic breakdown */}
        {lecture.topic && (
          <div className="mb-5 bg-[#1E2D58]/60 p-3.5 rounded-xl border border-[#29375C]">
            <p className="text-xs font-semibold text-[#8996B5] uppercase tracking-wider mb-1">
              Lecture Syllabus Focus
            </p>
            <p className="text-sm font-medium text-white">{lecture.topic}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-[#29375C]/70">
          <button
            onClick={() => {
              onClose();
              onAskAI(`Summarize the core concepts and lecture takeaways for ${lecture.courseCode}: "${lecture.title}" (${lecture.topic || ''})`, lecture.courseCode);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-semibold glow-violet hover:opacity-90 active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#5de6ff]" />
            Generate AI Summary & Notes
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-[#1E2D58] text-[#dde1ff] text-xs font-semibold hover:bg-[#29375C] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
