import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  dateStr: string;
  icon: string;
  color: string;
  type: 'order' | 'system' | 'service' | 'payment';
  unread: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  searchQuery = '';
  activeFilter: 'all' | 'unread' | 'order' | 'system' | 'service' | 'payment' = 'all';

  filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'order', label: 'Orders' },
    { id: 'payment', label: 'Payments' },
    { id: 'service', label: 'Service' },
    { id: 'system', label: 'System' }
  ];

  notifications: Notification[] = [
    { id: 1, title: 'New Order', message: 'Table 12 just placed an order (Order #430).', time: '10:45 AM', dateStr: 'Today', icon: 'restaurant_menu', color: 'var(--primary)', type: 'order', unread: true },
    { id: 2, title: 'Payment Received', message: 'Order #429 was paid successfully via Credit Card.', time: '10:30 AM', dateStr: 'Today', icon: 'payments', color: '#16a34a', type: 'payment', unread: true },
    { id: 3, title: 'Service Request', message: 'Table 08 requested a waiter for assistance.', time: '09:15 AM', dateStr: 'Today', icon: 'notifications_active', color: '#ca8a04', type: 'service', unread: false },
    { id: 4, title: 'System Update', message: 'Dashboard maintenance scheduled for 2 AM tonight.', time: '08:00 AM', dateStr: 'Today', icon: 'info', color: '#2563eb', type: 'system', unread: false },
    { id: 5, title: 'Order Cancelled', message: 'Order #421 was cancelled by the customer.', time: '09:45 PM', dateStr: 'Yesterday', icon: 'cancel', color: '#dc2626', type: 'order', unread: false },
    { id: 6, title: 'Low Stock Alert', message: 'Inventory for "Avocado" is running low.', time: '03:20 PM', dateStr: 'Yesterday', icon: 'inventory', color: '#ca8a04', type: 'system', unread: false },
    { id: 7, title: 'Table Reserved', message: 'Table 04 has been reserved for 8 PM.', time: '11:00 AM', dateStr: 'Yesterday', icon: 'event_seat', color: 'var(--primary)', type: 'service', unread: false },
  ];

  get filteredNotifications() {
    return this.notifications.filter(n => {
      // Filter by type/unread
      if (this.activeFilter === 'unread' && !n.unread) return false;
      if (this.activeFilter !== 'all' && this.activeFilter !== 'unread' && n.type !== this.activeFilter) return false;

      // Filter by search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        if (!n.title.toLowerCase().includes(query) && !n.message.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  }

  get groupedNotifications() {
    const groups: { dateStr: string; items: Notification[] }[] = [];
    
    this.filteredNotifications.forEach(n => {
      let group = groups.find(g => g.dateStr === n.dateStr);
      if (!group) {
        group = { dateStr: n.dateStr, items: [] };
        groups.push(group);
      }
      group.items.push(n);
    });

    return groups;
  }

  setFilter(filterId: any) {
    this.activeFilter = filterId;
  }

  updateSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.unread = false);
  }

  markAsRead(id: number) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.unread = false;
  }
}
