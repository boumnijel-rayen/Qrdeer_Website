import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  revenueData = [
    { day: 'Mon', value: 40, amount: '1.2k' },
    { day: 'Tue', value: 65, amount: '1.8k' },
    { day: 'Wed', value: 45, amount: '1.4k' },
    { day: 'Thu', value: 90, amount: '2.9k' },
    { day: 'Fri', value: 70, amount: '2.1k' },
    { day: 'Sat', value: 100, amount: '3.2k', isToday: true },
    { day: 'Sun', value: 55, amount: '1.6k' },
  ];

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
}
