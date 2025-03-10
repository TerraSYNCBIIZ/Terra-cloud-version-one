"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function TaskCalendarPage() {
  // Mock data for calendar
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Function to get number of days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Function to get the day of week for the first day of the month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Create array of days for the calendar
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Create blank days to fill in the calendar grid
  const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  
  // Mock tasks data
  const tasks = [
    { 
      id: '1', 
      title: 'Irrigation System Maintenance', 
      property: 'North Campus',
      time: '9:00 AM',
      status: 'scheduled',
      priority: 'medium',
      day: 5,
    },
    { 
      id: '2', 
      title: 'Lawn Mowing', 
      property: 'Athletic Fields',
      time: '10:30 AM',
      status: 'scheduled',
      priority: 'high',
      day: 8,
    },
    { 
      id: '3', 
      title: 'Tree Trimming', 
      property: 'South Campus',
      time: '2:00 PM',
      status: 'scheduled',
      priority: 'medium',
      day: 12,
    },
    { 
      id: '4', 
      title: 'Equipment Inspection', 
      property: 'Main Office',
      time: '3:30 PM',
      status: 'scheduled',
      priority: 'low',
      day: 15,
    },
    { 
      id: '5', 
      title: 'Fertilization', 
      property: 'Research Park',
      time: '8:00 AM',
      status: 'scheduled',
      priority: 'high',
      day: 18,
    },
    { 
      id: '6', 
      title: 'Weed Control', 
      property: 'North Campus',
      time: '1:00 PM',
      status: 'scheduled',
      priority: 'medium',
      day: 18,
    },
    { 
      id: '7', 
      title: 'Irrigation System Inspection', 
      property: 'Athletic Fields',
      time: '9:30 AM',
      status: 'scheduled',
      priority: 'medium',
      day: 22,
    },
    { 
      id: '8', 
      title: 'Mulch Application', 
      property: 'South Campus',
      time: '11:00 AM',
      status: 'scheduled',
      priority: 'low',
      day: 25,
    },
  ];
  
  // Get tasks for a specific day
  const getTasksForDay = (day: number) => {
    return tasks.filter(task => task.day === day);
  };
  
  // Function to get the name of the month
  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };
  
  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="info" size="sm">Low</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Normal</Badge>;
    }
  };
  
  // Calendar view headers
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Task Calendar">
          <div className="flex space-x-2">
            <Link href="/tasks" className="btn-outline">
              List View
            </Link>
            <Link href="/tasks/new" className="btn-primary">
              Add Task
            </Link>
          </div>
        </PageHeader>
        
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {getMonthName(currentMonth)} {currentYear}
            </h2>
            <div className="flex space-x-2">
              <button
                type="button"
                className="inline-flex items-center p-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="sr-only">Previous Month</span>
              </button>
              <button
                type="button"
                className="btn-outline"
              >
                Today
              </button>
              <button
                type="button"
                className="inline-flex items-center p-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span className="sr-only">Next Month</span>
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="border-t border-neutral-200 dark:border-neutral-700">
            <div className="grid grid-cols-7 gap-px bg-neutral-200 dark:bg-neutral-700">
              {weekDays.map((day) => (
                <div 
                  key={`weekday-${day}`} 
                  className="py-2 bg-neutral-100 dark:bg-neutral-800 text-center text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-neutral-200 dark:bg-neutral-700">
              {/* Blank days at the start of the month */}
              {blankDays.map((blankDay) => (
                <div 
                  key={`blank-${blankDay}`} 
                  className="min-h-[120px] bg-neutral-50 dark:bg-neutral-850 p-1"
                />
              ))}
              
              {/* Calendar days */}
              {days.map((day) => {
                const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
                const dayTasks = getTasksForDay(day);
                
                return (
                  <div 
                    key={`day-${day}`}
                    className={`min-h-[120px] bg-white dark:bg-neutral-900 p-1 ${
                      isToday ? 'ring-2 ring-primary-500 z-10' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span 
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-sm ${
                          isToday 
                            ? 'bg-primary-600 text-white' 
                            : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {day}
                      </span>
                      {dayTasks.length > 0 && (
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                          {dayTasks.length} tasks
                        </span>
                      )}
                    </div>
                    <div className="mt-1 overflow-y-auto max-h-[86px]">
                      {dayTasks.slice(0, 3).map((task) => (
                        <Link 
                          key={task.id}
                          href={`/tasks/${task.id}`}
                          className="block text-xs bg-neutral-50 dark:bg-neutral-800 p-1 mb-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-750"
                        >
                          <div className="font-medium text-neutral-900 dark:text-white truncate">
                            {task.title}
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-neutral-500 dark:text-neutral-400">
                              {task.time}
                            </span>
                            {getPriorityBadge(task.priority)}
                          </div>
                        </Link>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-center text-primary-600 dark:text-primary-400 mt-1">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
        
        {/* Task List for Selected Day - Would be dynamic in real app */}
        <Card className="mt-6">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Tasks for Today - {getMonthName(currentMonth)} {currentDate.getDate()}, {currentYear}
          </h2>
          <div className="space-y-3">
            {getTasksForDay(currentDate.getDate()).length > 0 ? (
              getTasksForDay(currentDate.getDate()).map((task) => (
                <div 
                  key={task.id} 
                  className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-neutral-900 dark:text-white">
                        {task.title}
                      </h3>
                      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {task.time} • {task.property}
                      </div>
                    </div>
                    <div>
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <Link href={`/tasks/${task.id}`} className="btn-outline text-sm py-1 px-3">
                      View Details
                    </Link>
                    <button type="button" className="btn-primary text-sm py-1 px-3">
                      Complete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                <p>No tasks scheduled for today.</p>
                <Link href="/tasks/new" className="btn-outline mt-4">
                  Create a Task
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 