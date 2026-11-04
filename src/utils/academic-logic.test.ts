import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateGPA,
  calculateAttendanceRate,
  filterSchedule,
  calculateDeliverableStats,
  formatFocusTimer,
  minutesBetween,
} from './academic-logic.ts';
import { ScheduleItem, TaskItem } from '../types/index.ts';

test('calculateGPA computes weighted GPA accurately', () => {
  const courses = [
    { currentGrade: 'A', credits: 4 },   // 4.0 * 4 = 16
    { currentGrade: 'A-', credits: 4 },  // 3.7 * 4 = 14.8
    { currentGrade: 'B+', credits: 3 },  // 3.3 * 3 = 9.9
    { currentGrade: 'A', credits: 3 },   // 4.0 * 3 = 12
  ];
  // total credits = 14
  // total points = 16 + 14.8 + 9.9 + 12 = 52.7
  // gpa = 52.7 / 14 = 3.764... -> 3.76
  const res = calculateGPA(courses);
  assert.equal(res.totalCredits, 14);
  assert.equal(res.gpa, 3.76);
});

test('calculateAttendanceRate computes percentage and status threshold', () => {
  const records = [
    { attended: 19, total: 20 },
    { attended: 18, total: 20 },
  ]; // 37 / 40 = 92.5%
  const res = calculateAttendanceRate(records);
  assert.equal(res.rate, 92.5);
  assert.equal(res.status, 'exemplary');

  const warningRecords = [{ attended: 15, total: 20 }]; // 75%
  const warnRes = calculateAttendanceRate(warningRecords);
  assert.equal(warnRes.rate, 75);
  assert.equal(warnRes.status, 'warning');
});

test('filterSchedule filters by day and type correctly', () => {
  const sampleSchedule: ScheduleItem[] = [
    {
      id: '1',
      courseCode: 'CS 482',
      title: 'Neural Nets',
      type: 'Lecture',
      day: 'Mon',
      startTime: '10:15',
      endTime: '11:45',
      room: 'B4',
      instructor: 'Chen',
      status: 'upcoming',
      accentColor: '#8B5CF6',
    },
    {
      id: '2',
      courseCode: 'BIO 290',
      title: 'Genomics Lab',
      type: 'Lab',
      day: 'Mon',
      startTime: '13:00',
      endTime: '15:00',
      room: 'Bio 3',
      instructor: 'Dr. Patel',
      status: 'upcoming',
      accentColor: '#22D3EE',
    },
    {
      id: '3',
      courseCode: 'MATH 314',
      title: 'Stochastic Calc',
      type: 'Lecture',
      day: 'Tue',
      startTime: '14:00',
      endTime: '15:30',
      room: 'Turing 102',
      instructor: 'Prof. Gauss',
      status: 'upcoming',
      accentColor: '#7C3AED',
    },
  ];

  const monLectures = filterSchedule(sampleSchedule, 'Mon', 'Lecture');
  assert.equal(monLectures.length, 1);
  assert.equal(monLectures[0].courseCode, 'CS 482');

  const allMon = filterSchedule(sampleSchedule, 'Mon', 'All');
  assert.equal(allMon.length, 2);

  const allLectures = filterSchedule(sampleSchedule, 'All', 'Lecture');
  assert.equal(allLectures.length, 2);
});

test('calculateDeliverableStats aggregates status totals and completion rate', () => {
  const sampleTasks: TaskItem[] = [
    {
      id: 't1',
      courseCode: 'CS 482',
      title: 'Assignment 3',
      dueDate: '2026-11-06',
      dueDay: 'Friday, 11:59 PM',
      difficulty: 'Challenging',
      status: 'upcoming',
      estimatedHours: 4,
      tags: ['Neural Nets'],
    },
    {
      id: 't2',
      courseCode: 'MATH 314',
      title: 'P-Set 4',
      dueDate: '2026-11-05',
      dueDay: 'Thursday, 5:00 PM',
      difficulty: 'Moderate',
      status: 'completed',
      estimatedHours: 2,
      tags: ['Calculus'],
    },
    {
      id: 't3',
      courseCode: 'BIO 290',
      title: 'Lab Report',
      dueDate: '2026-11-08',
      dueDay: 'Sunday, 11:59 PM',
      difficulty: 'Moderate',
      status: 'in-review',
      estimatedHours: 3,
      tags: ['Genomics'],
    },
  ];

  const stats = calculateDeliverableStats(sampleTasks);
  assert.equal(stats.totalCount, 3);
  assert.equal(stats.completedCount, 1);
  assert.equal(stats.inReviewCount, 1);
  assert.equal(stats.pendingCount, 1);
  assert.equal(stats.completionRate, 33);
});

test('formatFocusTimer formats minutes and seconds with padding', () => {
  assert.equal(formatFocusTimer(1500), '25:00');
  assert.equal(formatFocusTimer(59), '00:59');
  assert.equal(formatFocusTimer(65), '01:05');
});

test('minutesBetween calculates minute difference accurately', () => {
  assert.equal(minutesBetween('10:00', '10:45'), 45);
  assert.equal(minutesBetween('09:30', '11:15'), 105);
});
