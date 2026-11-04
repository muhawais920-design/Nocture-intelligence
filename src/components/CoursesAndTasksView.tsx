import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Plus,
  Sparkles,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CourseItem, TaskItem } from '../types/index.ts';
import { calculateDeliverableStats } from '../utils/academic-logic.ts';

interface CoursesAndTasksViewProps {
  courses: CourseItem[];
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onOpenAddTaskModal: () => void;
  onGenerateStudyPlan: () => void;
  onAskAIAboutCourse: (courseCode: string, courseName: string) => void;
}

export const CoursesAndTasksView: React.FC<CoursesAndTasksViewProps> = ({
  courses,
  tasks,
  onToggleTask,
  onOpenAddTaskModal,
  onGenerateStudyPlan,
  onAskAIAboutCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'courses'>('tasks');
  const [taskFilter, setTaskFilter] = useState<'All' | 'upcoming' | 'in-review' | 'completed'>('All');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('c-1');

  const stats = calculateDeliverableStats(tasks);

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'All') return true;
    return t.status === taskFilter;
  });

  return (
    <div className="space-y-4 pb-24 text-[#dde1ff]">
      {/* View Switcher: Deliverables vs Enrolled Courses */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
            Modules & Coursework
          </h2>
          <p className="text-xs text-[#8996B5]">
            4 Active Courses · {stats.pendingCount} Pending Tasks
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'tasks' && (
            <button
              onClick={onOpenAddTaskModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#22D3EE] text-[#00363E] text-xs font-bold glow-cyan transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          )}
        </div>
      </div>

      {/* Segmented Mode Selector */}
      <div className="grid grid-cols-2 p-1 bg-[#101A3A] rounded-xl border border-[#29375C]">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'tasks'
              ? 'bg-[#172447] text-white shadow-sm border border-[#29375C]'
              : 'text-[#8996B5] hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#10BFA5]" />
          Deliverables & Tasks ({tasks.length})
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'courses'
              ? 'bg-[#172447] text-white shadow-sm border border-[#29375C]'
              : 'text-[#8996B5] hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#7C3AED]" />
          Enrolled Modules ({courses.length})
        </button>
      </div>

      {activeTab === 'tasks' ? (
        <div className="space-y-3.5">
          {/* Deliverables Summary Card */}
          <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#8996B5] uppercase tracking-wider">
                Completion Velocity
              </span>
              <span className="text-xs font-bold text-[#10BFA5]">
                {stats.completionRate}% Done
              </span>
            </div>

            <div className="w-full bg-[#101A3A] h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-[#10BFA5] via-[#22D3EE] to-[#7C3AED] h-full rounded-full transition-all duration-300"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#101A3A] p-2 rounded-xl border border-[#29375C]/50">
                <p className="text-[#8996B5] text-[10px]">Upcoming</p>
                <p className="text-sm font-bold text-white mt-0.5">{stats.pendingCount}</p>
              </div>
              <div className="bg-[#101A3A] p-2 rounded-xl border border-[#29375C]/50">
                <p className="text-[#8996B5] text-[10px]">In Review</p>
                <p className="text-sm font-bold text-[#F59E0B] mt-0.5">{stats.inReviewCount}</p>
              </div>
              <div className="bg-[#101A3A] p-2 rounded-xl border border-[#29375C]/50">
                <p className="text-[#8996B5] text-[10px]">Completed</p>
                <p className="text-sm font-bold text-[#10BFA5] mt-0.5">{stats.completedCount}</p>
              </div>
            </div>

            <button
              onClick={onGenerateStudyPlan}
              className="mt-3.5 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-bold glow-violet hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5de6ff]" />
              Generate AI Multi-Course Revision Schedule
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            {(['All', 'upcoming', 'in-review', 'completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTaskFilter(filter)}
                className={`py-1 px-3 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                  taskFilter === filter
                    ? 'bg-[#7C3AED]/25 text-[#5de6ff] border border-[#7C3AED]/40 font-semibold'
                    : 'bg-[#172447] text-[#8996B5] hover:text-white border border-[#29375C]/60'
                }`}
              >
                {filter === 'All' ? 'All Tasks' : filter.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-2.5">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-10 bg-[#172447]/60 rounded-2xl border border-dashed border-[#29375C] p-4 text-[#8996B5]">
                No deliverables found for this filter.
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isDone = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    className={`bg-[#172447] border rounded-2xl p-4 transition-all ${
                      isDone
                        ? 'border-[#29375C]/40 opacity-70'
                        : 'border-[#29375C] hover:border-[#7C3AED]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        aria-label={`Toggle completion for ${task.title}`}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                          isDone
                            ? 'bg-[#10BFA5] border-[#10BFA5] text-white'
                            : 'border-[#29375C] hover:border-[#22D3EE] bg-[#101A3A]'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4 text-[#080F2B]" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[11px] font-bold text-[#5de6ff] bg-[#22D3EE]/10 px-2 py-0.5 rounded-md border border-[#22D3EE]/20">
                            {task.courseCode}
                          </span>
                          <span className="text-xs text-[#8996B5] flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-[#F59E0B]" />
                            {task.dueDay}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              task.difficulty === 'High Stakes'
                                ? 'bg-[#EF4444]/15 text-[#ffb4ab] border-[#EF4444]/30'
                                : task.difficulty === 'Challenging'
                                ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                                : 'bg-[#1E2D58] text-[#8996B5] border-[#29375C]'
                            }`}
                          >
                            {task.difficulty}
                          </span>
                        </div>

                        <h3
                          className={`text-sm font-bold ${
                            isDone ? 'line-through text-[#8996B5]' : 'text-white'
                          }`}
                        >
                          {task.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-[#8996B5] bg-[#101A3A] px-2 py-0.5 rounded-md border border-[#29375C]/50"
                            >
                              #{tag}
                            </span>
                          ))}
                          <span className="text-[10px] text-[#8996B5] ml-auto">
                            ~{task.estimatedHours} hrs study needed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Enrolled Courses Tab */
        <div className="space-y-3">
          {courses.map((course) => {
            const isExpanded = expandedCourseId === course.id;

            return (
              <div
                key={course.id}
                className="bg-[#172447] border border-[#29375C] rounded-2xl p-4 transition-all"
              >
                <div
                  onClick={() =>
                    setExpandedCourseId(isExpanded ? null : course.id)
                  }
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${course.color}25`,
                          color: course.color,
                        }}
                      >
                        {course.code}
                      </span>
                      <span className="text-xs text-[#8996B5]">
                        {course.credits} Credits · {course.instructor}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {course.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#10BFA5]">
                        {course.currentGrade}
                      </span>
                      <p className="text-[10px] text-[#8996B5]">Current Grade</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#8996B5]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#8996B5]" />
                    )}
                  </div>
                </div>

                {/* Course progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] mb-1 text-[#8996B5]">
                    <span>Term Syllabus Progress</span>
                    <span className="font-semibold text-white">
                      {course.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-[#101A3A] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: course.color,
                        width: `${course.progressPercent}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Details: Next Milestone, Syllabus, and Ask AI */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-[#29375C]/60 space-y-3">
                    <div className="bg-[#101A3A] p-2.5 rounded-xl border border-[#29375C]/50 text-xs">
                      <span className="text-[#F59E0B] font-bold flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Next Major Milestone:
                      </span>
                      <p className="text-white font-medium">{course.nextMilestone}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-[#8996B5] uppercase tracking-wider mb-1.5">
                        Core Syllabus Modules
                      </p>
                      <div className="space-y-1">
                        {course.syllabusHighlights.map((topic, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-[#B8C4E0]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onAskAIAboutCourse(course.code, course.name)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1E2D58] hover:bg-[#29375C] text-[#5de6ff] text-xs font-semibold border border-[#29375C] transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      Ask Nocturne AI for {course.code} Study Breakdown
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
