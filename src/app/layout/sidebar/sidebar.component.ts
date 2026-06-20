import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  filled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: '/dashboard' },
    { icon: 'shopping_cart', label: 'Orders', route: '/orders' },
    { icon: 'restaurant', label: 'Tables', route: '/tables' },
    { icon: 'bar_chart', label: 'Sales', route: '/sales' },
    { icon: 'person', label: 'Account', route: '/account' },
    { icon: 'menu_book', label: 'Menu Management', route: '/menu' },
    { icon: 'group', label: 'Staff', route: '/staff' },
    { icon: 'receipt_long', label: 'Billing & Invoices', route: '/billing' },
  ];

  constructor(private authService: AuthService) {}

  get user() {
    return this.authService.getUser();
  }
}
