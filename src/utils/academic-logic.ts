import { DayOfWeek, ActivityType, ScheduleItem, TaskItem } from '../types/index.ts';

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0,
};

export function calculateGPA(courses: { currentGrade: string; credits: number }[]): {
  gpa: number;
  totalCredits: number;
  gradePoints: number;
} {
  if (!courses || courses.length === 0) {
    return { gpa: 0, totalCredits: 0, gradePoints: 0 };
  }

  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    const points = GRADE_POINTS[course.currentGrade] ?? 3.0;
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  }

  const gpa = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
  return { gpa, totalCredits, gradePoints: parseFloat(totalPoints.toFixed(1)) };
}

export function calculateAttendanceRate(records: { attended: number; total: number }[]): {
  rate: number;
  status: 'exemplary' | 'good' | 'warning' | 'critical';
} {
  if (!records || records.length === 0) {
    return { rate: 100, status: 'exemplary' };
  }

  let attendedSum = 0;
  let totalSum = 0;

  for (const rec of records) {
    attendedSum += rec.attended;
    totalSum += rec.total;
  }

  const rate = totalSum > 0 ? parseFloat(((attendedSum / totalSum) * 100).toFixed(1)) : 100;

  let status: 'exemplary' | 'good' | 'warning' | 'critical' = 'exemplary';
  if (rate >= 90) status = 'exemplary';
  else if (rate >= 80) status = 'good';
  else if (rate >= 70) status = 'warning';
  else status = 'critical';

  return { rate, status };
}

export function filterSchedule(
  schedule: ScheduleItem[],
  day: DayOfWeek | 'All',
  typeFilter: ActivityType | 'All'
): ScheduleItem[] {
  return schedule.filter((item) => {
    const matchesDay = day === 'All' || item.day === day;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesDay && matchesType;
  });
}

export function calculateDeliverableStats(tasks: TaskItem[]): {
  pendingCount: number;
  completedCount: number;
  inReviewCount: number;
  totalCount: number;
  completionRate: number;
} {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inReviewCount = tasks.filter((t) => t.status === 'in-review').length;
  const pendingCount = tasks.filter((t) => t.status === 'upcoming').length;

  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    pendingCount,
    completedCount,
    inReviewCount,
    totalCount,
    completionRate,
  };
}

export function formatFocusTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(mins)}:${pad(secs)}`;
}

export function minutesBetween(timeA: string, timeB: string): number {
  const [hA, mA] = timeA.split(':').map(Number);
  const [hB, mB] = timeB.split(':').map(Number);
  return (hB * 60 + mB) - (hA * 60 + mA);
}
