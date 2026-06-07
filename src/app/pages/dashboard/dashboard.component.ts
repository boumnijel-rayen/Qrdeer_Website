import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Period {
  key: string;
  label: string;
  icon: string;
}

interface PeriodData {
  activeTables: { value: string; total: string; occupancy: string; trendDir: string };
  totalOrders: { value: string; trend: string; trendDir: string };
  revenue: { value: string; trend: string };
  avgTicket: { value: string; trend: string };
  peakPerf: { value: string; trend: string; ring: number };
  kitchenPrep: string;
  kitchenVolume: string;
  revenueTrend: { total: string; trend: string };
  revenueData: { day: string; value: number; amount: string; isToday?: boolean }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  periods: Period[] = [
    { key: 'today', label: 'Today', icon: 'today' },
    { key: '24h', label: 'Last 24 Hours', icon: 'schedule' },
    { key: '7d', label: 'Last 7 Days', icon: 'date_range' },
    { key: '30d', label: 'Last 30 Days', icon: 'calendar_month' },
    { key: 'month', label: 'This Month', icon: 'event' },
    { key: 'custom', label: 'Custom Range', icon: 'edit_calendar' },
  ];

  selectedPeriod: Period = this.periods[1]; // Default: Last 24 Hours
  periodDropdownOpen = false;

  showCustomDatePicker = false;
  customStartDate: string = '';
  customEndDate: string = '';
  dateError: string = '';

  // Data sets per period
  private periodDataMap: Record<string, PeriodData> = {
    'today': {
      activeTables: { value: '14', total: '/ 24', occupancy: '58% occupancy', trendDir: 'positive' },
      totalOrders: { value: '87', trend: '+5% from yesterday', trendDir: 'positive' },
      revenue: { value: '2,940', trend: 'Lunch rush ending' },
      avgTicket: { value: '33.80', trend: '+2.1% vs yesterday' },
      peakPerf: { value: '91', trend: '+1.8% vs yesterday', ring: 91 },
      kitchenPrep: '14.2m', kitchenVolume: '36 / hr',
      revenueTrend: { total: '2.9k', trend: '+5.0% vs yesterday' },
      revenueData: [
        { day: '9AM', value: 20, amount: '0.3k' },
        { day: '10AM', value: 35, amount: '0.5k' },
        { day: '11AM', value: 55, amount: '0.7k' },
        { day: '12PM', value: 90, amount: '1.1k' },
        { day: '1PM', value: 100, amount: '1.3k', isToday: true },
        { day: '2PM', value: 70, amount: '0.9k' },
        { day: '3PM', value: 45, amount: '0.6k' },
      ],
    },
    '24h': {
      activeTables: { value: '18', total: '/ 24', occupancy: '75% occupancy', trendDir: 'positive' },
      totalOrders: { value: '142', trend: '+12% from yesterday', trendDir: 'positive' },
      revenue: { value: '4,820', trend: 'Peak service active' },
      avgTicket: { value: '38.50', trend: '+6.2% vs last week' },
      peakPerf: { value: '94', trend: '+3.1% vs yesterday', ring: 94 },
      kitchenPrep: '12.4m', kitchenVolume: '42 / hr',
      revenueTrend: { total: '14.2k', trend: '+8.4% vs last week' },
      revenueData: [
        { day: 'Mon', value: 40, amount: '1.2k' },
        { day: 'Tue', value: 65, amount: '1.8k' },
        { day: 'Wed', value: 45, amount: '1.4k' },
        { day: 'Thu', value: 90, amount: '2.9k' },
        { day: 'Fri', value: 70, amount: '2.1k' },
        { day: 'Sat', value: 100, amount: '3.2k', isToday: true },
        { day: 'Sun', value: 55, amount: '1.6k' },
      ],
    },
    '7d': {
      activeTables: { value: '20', total: '/ 24', occupancy: '83% avg occupancy', trendDir: 'positive' },
      totalOrders: { value: '986', trend: '+18% vs prior week', trendDir: 'positive' },
      revenue: { value: '14,200', trend: 'Strong weekly growth' },
      avgTicket: { value: '36.20', trend: '+4.8% vs prior week' },
      peakPerf: { value: '92', trend: '+2.4% vs prior week', ring: 92 },
      kitchenPrep: '13.1m', kitchenVolume: '38 / hr',
      revenueTrend: { total: '14.2k', trend: '+18% vs prior week' },
      revenueData: [
        { day: 'Mon', value: 40, amount: '1.2k' },
        { day: 'Tue', value: 65, amount: '1.8k' },
        { day: 'Wed', value: 45, amount: '1.4k' },
        { day: 'Thu', value: 90, amount: '2.9k' },
        { day: 'Fri', value: 70, amount: '2.1k' },
        { day: 'Sat', value: 100, amount: '3.2k', isToday: true },
        { day: 'Sun', value: 55, amount: '1.6k' },
      ],
    },
    '30d': {
      activeTables: { value: '19', total: '/ 24', occupancy: '79% avg occupancy', trendDir: 'positive' },
      totalOrders: { value: '4,128', trend: '+22% vs prior month', trendDir: 'positive' },
      revenue: { value: '58,400', trend: 'Exceeding target' },
      avgTicket: { value: '35.80', trend: '+3.1% vs prior month' },
      peakPerf: { value: '89', trend: '+1.2% vs prior month', ring: 89 },
      kitchenPrep: '13.8m', kitchenVolume: '35 / hr',
      revenueTrend: { total: '58.4k', trend: '+22% vs prior month' },
      revenueData: [
        { day: 'Wk1', value: 60, amount: '12.8k' },
        { day: 'Wk2', value: 75, amount: '15.2k' },
        { day: 'Wk3', value: 85, amount: '16.1k' },
        { day: 'Wk4', value: 100, amount: '14.3k', isToday: true },
      ],
    },
    'month': {
      activeTables: { value: '19', total: '/ 24', occupancy: '79% avg occupancy', trendDir: 'positive' },
      totalOrders: { value: '3,240', trend: '+15% vs last month', trendDir: 'positive' },
      revenue: { value: '42,600', trend: 'On track for target' },
      avgTicket: { value: '37.10', trend: '+5.0% vs last month' },
      peakPerf: { value: '90', trend: '+2.0% vs last month', ring: 90 },
      kitchenPrep: '13.5m', kitchenVolume: '37 / hr',
      revenueTrend: { total: '42.6k', trend: '+15% vs last month' },
      revenueData: [
        { day: 'Wk1', value: 55, amount: '9.8k' },
        { day: 'Wk2', value: 70, amount: '11.4k' },
        { day: 'Wk3', value: 90, amount: '12.6k' },
        { day: 'Wk4', value: 80, amount: '8.8k', isToday: true },
      ],
    },
    'custom': {
      activeTables: { value: '18', total: '/ 24', occupancy: '75% occupancy', trendDir: 'positive' },
      totalOrders: { value: '142', trend: '+12% from yesterday', trendDir: 'positive' },
      revenue: { value: '4,820', trend: 'Peak service active' },
      avgTicket: { value: '38.50', trend: '+6.2% vs last week' },
      peakPerf: { value: '94', trend: '+3.1% vs yesterday', ring: 94 },
      kitchenPrep: '12.4m', kitchenVolume: '42 / hr',
      revenueTrend: { total: '14.2k', trend: '+8.4% vs last week' },
      revenueData: [
        { day: 'Mon', value: 40, amount: '1.2k' },
        { day: 'Tue', value: 65, amount: '1.8k' },
        { day: 'Wed', value: 45, amount: '1.4k' },
        { day: 'Thu', value: 90, amount: '2.9k' },
        { day: 'Fri', value: 70, amount: '2.1k' },
        { day: 'Sat', value: 100, amount: '3.2k', isToday: true },
        { day: 'Sun', value: 55, amount: '1.6k' },
      ],
    },
  };

  // Current dynamic values
  data: PeriodData = this.periodDataMap['24h'];

  get revenueData() { return this.data.revenueData; }
  get ringDashoffset(): number {
    const circumference = 2 * Math.PI * 28; // r=28
    return circumference - (this.data.peakPerf.ring / 100) * circumference;
  }

  peakHours = [
    { label: '12 PM - 3 PM', level: 'Very Busy', percent: 95, isPrimary: true },
    { label: '3 PM - 6 PM', level: 'Moderate', percent: 40, isPrimary: false },
    { label: '6 PM - 10 PM', level: 'Peak', percent: 100, isPrimary: true },
    { label: '10 PM - Close', level: 'Quiet', percent: 15, isPrimary: false },
  ];

  activities = [
    { icon: 'check_circle', bg: '#dcfce7', color: '#15803d', title: 'Order #429 Paid', detail: 'Table 04 • 128.50 TND', time: '2 mins ago' },
    { icon: 'restaurant_menu', bg: '#dbeafe', color: '#1d4ed8', title: 'New Order: Table 12', detail: '3 Items • 45.00 TND', time: '5 mins ago' },
    { icon: 'notifications_active', bg: '#fef9c3', color: '#a16207', title: 'Service Requested', detail: 'Table 08 • Waiting 3m', time: '8 mins ago' },
    { icon: 'group_add', bg: '#fee2e2', color: '#b91c1c', title: 'New Table Seated', detail: 'Table 19 • 4 Guests', time: '12 mins ago' },
  ];

  togglePeriodDropdown(event: Event) {
    event.stopPropagation();
    this.periodDropdownOpen = !this.periodDropdownOpen;
    if (this.periodDropdownOpen) {
      this.showCustomDatePicker = false;
    }
  }

  selectPeriod(period: Period) {
    if (period.key === 'custom') {
      this.showCustomDatePicker = true;
    } else {
      this.selectedPeriod = period;
      this.data = this.periodDataMap[period.key];
      this.periodDropdownOpen = false;
      this.showCustomDatePicker = false;
    }
  }

  onCustomDateChange() {
    if (this.customStartDate && this.customEndDate) {
      const start = new Date(this.customStartDate);
      const end = new Date(this.customEndDate);
      
      if (start <= end) {
        this.dateError = '';
        this.data = { ...this.periodDataMap['custom'] };
        this.selectedPeriod = { 
           key: 'custom', 
           label: `${this.customStartDate} to ${this.customEndDate}`, 
           icon: 'edit_calendar' 
        };
      } else {
        this.dateError = 'Start date must be before end date';
      }
    }
  }

  cancelCustomDate() {
    this.showCustomDatePicker = false;
    if (this.selectedPeriod.key === 'custom') {
      // If we cancel and custom was already selected but perhaps not valid, we might leave it.
      // Better yet, just close the dropdown.
      this.periodDropdownOpen = false;
    }
  }

  @HostListener('document:click')
  closePeriodDropdown() {
    this.periodDropdownOpen = false;
    this.showCustomDatePicker = false;
  }
}
