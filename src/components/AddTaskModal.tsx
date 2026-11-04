import React, { useState } from 'react';
import { X, CheckSquare, Calendar, BookOpen, Clock } from 'lucide-react';
import { TaskItem } from '../types/index.ts';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: TaskItem) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [courseCode, setCourseCode] = useState('CS 482');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('2026-11-10');
  const [dueDay, setDueDay] = useState('Tuesday, 11:59 PM');
  const [difficulty, setDifficulty] = useState<TaskItem['difficulty']>('Moderate');
  const [estimatedHours, setEstimatedHours] = useState(3);
  const [tagsInput, setTagsInput] = useState('Assignment, Code');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newTask: TaskItem = {
      id: `t-${Date.now()}`,
      courseCode: courseCode.trim().toUpperCase(),
      title: title.trim(),
      dueDate,
      dueDay,
      difficulty,
      status: 'upcoming',
      estimatedHours: Number(estimatedHours) || 2,
      tags: tags.length ? tags : ['Academic'],
    };

    onAdd(newTask);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-title"
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
          <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/20 border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
            <CheckSquare className="w-4 h-4" />
          </div>
          <h2 id="add-task-title" className="text-base sm:text-lg font-bold text-white">
            Add Deliverable / Assignment
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#8996B5] mb-1">
              Course
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
              <input
                type="text"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CS 482"
                className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8996B5] mb-1">
              Deliverable Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement Transformer Attention Kernels"
              className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-2 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Display Deadline
              </label>
              <input
                type="text"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                placeholder="e.g. Thursday, 11:59 PM"
                className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Difficulty Tier
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as TaskItem['difficulty'])}
                className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Easy">Easy (Review)</option>
                <option value="Moderate">Moderate (P-Set)</option>
                <option value="Challenging">Challenging (Lab/Code)</option>
                <option value="High Stakes">High Stakes (Exam/Project)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8996B5] mb-1">
                Est. Hours
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-2.5 text-[#8996B5]" />
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl pl-9 pr-2 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8996B5] mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. GPU, Proof, Lab Report"
              className="w-full bg-[#101A3A] border border-[#29375C] rounded-xl px-3 py-2 text-xs text-white outline-none"
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
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#00CBE6] to-[#22D3EE] text-[#00363E] text-xs font-bold glow-cyan hover:opacity-90 transition-opacity cursor-pointer"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
