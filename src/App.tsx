import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';
import { HeaderStatusBar } from './components/HeaderStatusBar.tsx';
import { FloatingNavBar, NavTabId } from './components/FloatingNavBar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { TimetableScheduleView } from './components/TimetableScheduleView.tsx';
import { CoursesAndTasksView } from './components/CoursesAndTasksView.tsx';
import { AICopilotView } from './components/AICopilotView.tsx';
import { FocusAndCampusView } from './components/FocusAndCampusView.tsx';
import { LectureModal } from './components/LectureModal.tsx';
import { AddScheduleModal } from './components/AddScheduleModal.tsx';
import { AddTaskModal } from './components/AddTaskModal.tsx';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_SCHEDULE,
  INITIAL_COURSES,
  INITIAL_TASKS,
} from './data/mockData.ts';
import { ScheduleItem, TaskItem, AIQueryPreset } from './types/index.ts';
import { calculateGPA, calculateDeliverableStats } from './utils/academic-logic.ts';

export default function App() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Core Academic State
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT_PROFILE);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  // Modals & AI Prefill
  const [selectedLecture, setSelectedLecture] = useState<ScheduleItem | null>(null);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [aiPrefillQuery, setAiPrefillQuery] = useState<string>('');
  const [aiPrefillCourse, setAiPrefillCourse] = useState<string>('CS 482');

  // Handle task checkoff
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'completed' ? 'upcoming' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Add new schedule item
  const handleAddScheduleItem = (newItem: ScheduleItem) => {
    setSchedule((prev) => [newItem, ...prev]);
  };

  // Add new task
  const handleAddTaskItem = (newTask: TaskItem) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Log study session hours
  const handleStudySessionLogged = (mins: number) => {
    const hours = parseFloat((mins / 60).toFixed(1));
    setStudentProfile((prev) => ({
      ...prev,
      studyHoursLogged: parseFloat((prev.studyHoursLogged + hours).toFixed(1)),
    }));
  };

  // AI trigger from lecture modal or pills
  const handleAskAI = (prompt: string, courseCode: string) => {
    setAiPrefillQuery(prompt);
    setAiPrefillCourse(courseCode);
    setActiveTab('ai');
  };

  const handleSelectPresetQuery = (preset: AIQueryPreset) => {
    setAiPrefillQuery(preset.prompt);
    setAiPrefillCourse(preset.tag);
    setActiveTab('ai');
  };

  const taskStats = calculateDeliverableStats(tasks);
  const currentGPA = calculateGPA(
    courses.map((c) => ({ currentGrade: c.currentGrade, credits: c.credits }))
  ).gpa;

  return (
    <div className="min-h-screen bg-[#080F2B] text-[#dde1ff] font-['Manrope'] antialiased selection:bg-[#7C3AED] selection:text-white flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 transition-all">
      {/* Top Controls Bar: Viewport Switcher & Brand Info */}
      <div className="w-full max-w-4xl flex items-center justify-between px-4 py-2 text-xs text-[#8996B5] mb-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] glow-violet" />
          <span className="font-bold text-white tracking-wide">NOCTURNE INTELLIGENCE</span>
          <span className="hidden sm:inline text-[#8996B5]">· Student Ambient OS</span>
        </div>

        {/* Viewport Frame Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#172447] border border-[#29375C] p-1 rounded-xl">
          <button
            onClick={() => setDeviceFrameMode(true)}
            title="Mobile Smartphone Frame (393px)"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              deviceFrameMode
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-[#8996B5] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Mobile Frame</span>
          </button>
          <button
            onClick={() => setDeviceFrameMode(false)}
            title="Responsive Fullscreen View"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              !deviceFrameMode
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-[#8996B5] hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Expanded</span>
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Frame vs Wide Responsive */}
      <main
        className={`w-full transition-all duration-300 relative ${
          deviceFrameMode
            ? 'max-w-[412px] bg-[#0A112D] sm:border sm:border-[#29375C] sm:rounded-[36px] sm:shadow-[0_20px_60px_rgba(0,0,0,0.85)] sm:ring-1 sm:ring-[#7C3AED]/20 overflow-hidden min-h-[852px]'
            : 'max-w-3xl bg-[#0A112D] sm:border sm:border-[#29375C] sm:rounded-3xl sm:shadow-2xl overflow-hidden'
        }`}
      >
        {/* Dynamic Header & Status Bar */}
        <HeaderStatusBar
          studentName={studentProfile.name}
          major={studentProfile.major}
          year={studentProfile.year}
          avatarUrl={studentProfile.avatarUrl}
          onOpenAI={() => {
            setAiPrefillQuery('Summarize upcoming priorities and exam concepts for today.');
            setActiveTab('ai');
          }}
          activeScreenTitle={
            activeTab === 'dashboard'
              ? 'Today Overview'
              : activeTab === 'timetable'
              ? 'Schedule & Lectures'
              : activeTab === 'courses'
              ? 'Modules & Tasks'
              : activeTab === 'ai'
              ? 'AI Academic Copilot'
              : 'Focus & Campus Hub'
          }
        />

        {/* View Content Body */}
        <div className="p-4 sm:p-5">
          {activeTab === 'dashboard' && (
            <DashboardView
              studentName={studentProfile.name}
              gpa={currentGPA}
              gpaDelta={studentProfile.gpaDelta}
              attendanceRate={studentProfile.attendanceRate}
              studyHoursLogged={studentProfile.studyHoursLogged}
              weeklyTargetHours={studentProfile.weeklyTargetHours}
              schedule={schedule}
              tasks={tasks}
              onSelectLecture={(item) => setSelectedLecture(item)}
              onToggleTask={handleToggleTask}
              onSelectAIQuery={handleSelectPresetQuery}
              onViewAllSchedule={() => setActiveTab('timetable')}
              onViewAllTasks={() => setActiveTab('courses')}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableScheduleView
              schedule={schedule}
              onSelectLecture={(item) => setSelectedLecture(item)}
              onOpenAddModal={() => setIsAddScheduleOpen(true)}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesAndTasksView
              courses={courses}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onOpenAddTaskModal={() => setIsAddTaskOpen(true)}
              onGenerateStudyPlan={() => {
                setAiPrefillQuery('Generate an optimized 3-day multi-course study plan for CS 482 CUDA implementation, MATH 314 Itô calculus p-set, and BIO 290 genomics lab.');
                setAiPrefillCourse('General');
                setActiveTab('ai');
              }}
              onAskAIAboutCourse={(code, name) => {
                setAiPrefillQuery(`Provide a high-yield study breakdown and key exam topics for ${code}: ${name}`);
                setAiPrefillCourse(code);
                setActiveTab('ai');
              }}
            />
          )}

          {activeTab === 'ai' && (
            <AICopilotView
              initialQuery={aiPrefillQuery}
              initialCourseContext={aiPrefillCourse}
            />
          )}

          {activeTab === 'campus' && (
            <FocusAndCampusView
              onStudySessionLogged={handleStudySessionLogged}
            />
          )}
        </div>

        {/* Floating Bottom Navigation Bar */}
        <FloatingNavBar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          pendingTasksCount={taskStats.pendingCount}
        />
      </main>

      {/* Interactive Modals */}
      <LectureModal
        lecture={selectedLecture}
        onClose={() => setSelectedLecture(null)}
        onAskAI={handleAskAI}
      />

      <AddScheduleModal
        isOpen={isAddScheduleOpen}
        onClose={() => setIsAddScheduleOpen(false)}
        onAdd={handleAddScheduleItem}
      />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAdd={handleAddTaskItem}
      />
    </div>
  );
}
