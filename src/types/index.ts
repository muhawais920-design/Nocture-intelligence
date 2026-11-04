export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type ActivityType = 'Lecture' | 'Lab' | 'Study Block' | 'Office Hours' | 'Exam';

export interface ScheduleItem {
  id: string;
  courseCode: string;
  title: string;
  type: ActivityType;
  day: DayOfWeek;
  startTime: string; // e.g. "10:15"
  endTime: string;   // e.g. "11:45"
  room: string;
  instructor: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  accentColor: string; // hex
  hasNotesSync?: boolean;
  hasLiveTranscript?: boolean;
  topic?: string;
}

export interface TaskItem {
  id: string;
  courseCode: string;
  title: string;
  dueDate: string; // ISO date string or formatted date
  dueDay: string;  // e.g. "Thursday, 11:59 PM"
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'High Stakes';
  status: 'upcoming' | 'in-review' | 'completed';
  estimatedHours: number;
  tags: string[];
}

export interface CourseItem {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  currentGrade: string;
  progressPercent: number;
  color: string;
  nextMilestone: string;
  syllabusHighlights: string[];
}

export interface MetricCardData {
  label: string;
  value: string;
  subValue: string;
  trend?: string;
  trendPositive?: boolean;
  accent: 'cyan' | 'violet' | 'mint' | 'amber';
}

export interface CampusService {
  id: string;
  name: string;
  location: string;
  type: 'Study Space' | 'Tech & Printing' | 'Dining' | 'Library';
  status: 'Open' | 'High Traffic' | 'Closing Soon' | 'Available';
  occupancyPercent: number;
  availableSlots: string;
  accent: string;
}

export interface AIQueryPreset {
  id: string;
  title: string;
  prompt: string;
  iconName: string;
  tag: string;
}
