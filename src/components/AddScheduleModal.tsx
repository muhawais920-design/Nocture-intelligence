import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, BookOpen, User } from 'lucide-react';
import { ScheduleItem, DayOfWeek, ActivityType } from '../types/index.ts';

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: ScheduleItem) => void;
}

export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [courseCode, setCourseCode] = useState('CS 482');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ActivityType>('Study Block');
  const [day, setDay] = useState<DayOfWeek>('Mon');
  const [startTime, setStartTime] = useState('16:00');
  const [endTime, setEndTime] = useState('17:30');
  const [room, setRoom] = useState('Library Floor 3');
  const [instructor, setInstructor] = useState('Self-directed');
  const [topic, setTopic] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const colorMap: Record<ActivityType, string> = {
      Lecture: '#7C3AED',
      Lab: '#10BFA5',
      'Study Block': '#8B5CF6',
      'Office Hours': '#22D3EE',
      Exam: '#EF4444',
    };

    const newItem: ScheduleItem = {
      id: `sch-${Date.now()}`,
      courseCode: courseCode.trim().toUpperCase(),
      title: title.trim(),
      type,
      day,
      startTime,
      endTime,
      room: room.trim() || 'Campus Center',
      instructor: instructor.trim() || 'Academic Staff',
      status: 'upcoming',
      accentColor: colorMap[type] || '#7C3AED',
      hasNotesSync: true,
      hasLiveTranscript: false,
      topic: topic.trim() || undefined,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-schedule-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050C28]/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-[#172447] border border-[#29375C] rounded-2xl p-6 shadow-2xl text-[#dde1ff]">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8996B5] hover:text-white hover:bg-[#1E2D58] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#d2bbff]">
            <Calendar className="w-4 h-4" />
          </div>
          <h2 id="add-schedule-title" className="text-base sm:text-lg font-bold text-white">
            Schedule Academic Session
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#8996B5] mb-1">
              Course / Code
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
              <input
                type="text"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CS 482"
                className="w-full bg-[#101A3A] border border-[#29375C] focus:border-[#8B5CF6] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8996B5] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8996B5] mb-1">
              Session Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Neural Networks Lab Review"
              className="w-full bg-[#101A3A] border border-[#29375C] focus:border-[#8B5CF6] rounded-xl px-3 py-2 text-xs text-white placeholder-[#8996B5] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ActivityType)}
                className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab</option>
                <option value="Study Block">Study Block</option>
                <option value="Office Hours">Office Hours</option>
                <option value="Exam">Exam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Day
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as DayOfWeek)}
                className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
                <option value="Sun">Sunday</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Start Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-2 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                End Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-2 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Location / Room
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="e.g. Turing 102"
                  className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8996B5] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Instructor / Host
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
                <input
                  type="text"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  placeholder="e.g. Dr. Patel"
                  className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8996B5] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8996B5] mb-1">
              Topic / Focus Notes
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Midterm prep and theorem review"
              className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white placeholder-[#8996B5] outline-none"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-[#1E2D58] text-[#dde1ff] text-xs font-semibold hover:bg-[#29375C] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-semibold glow-violet hover:opacity-90 transition-opacity cursor-pointer"
            >
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
