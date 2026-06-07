import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  icon: string;
  color: string;
  unread: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isNotificationOpen = false;
  
  notifications: Notification[] = [
    { id: 1, title: 'New Order', message: 'Table 12 just placed an order.', time: '2 min ago', icon: 'restaurant_menu', color: 'var(--primary)', unread: true },
    { id: 2, title: 'Payment Received', message: 'Order #429 was paid successfully.', time: '15 min ago', icon: 'payments', color: '#16a34a', unread: true },
    { id: 3, title: 'Service Request', message: 'Table 08 requested a waiter.', time: '1 hour ago', icon: 'notifications_active', color: '#ca8a04', unread: false },
    { id: 4, title: 'System Update', message: 'Dashboard maintenance scheduled for 2 AM.', time: '3 hours ago', icon: 'info', color: '#2563eb', unread: false }
  ];

  constructor(private authService: AuthService) {}

  get user() {
    return this.authService.getUser();
  }

  get unreadCount() {
    return this.notifications.filter(n => n.unread).length;
  }

  toggleNotification(event: Event): void {
    event.stopPropagation();
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  markAllAsRead(event: Event): void {
    event.stopPropagation();
    this.notifications.forEach(n => n.unread = false);
  }

  @HostListener('document:click')
  closeNotification(): void {
    this.isNotificationOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
