import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface OrderItem {
  qty: number;
  name: string;
  price: string;
}

export interface Order {
  id: string;
  table: string;
  status: 'new' | 'preparing' | 'ready' | 'cancelled' | 'paid';
  time: string;
  items: OrderItem[];
  total: string;
  prepTime?: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  activeFilter = 'all';

  filters = ['all', 'new', 'preparing', 'ready', 'cancelled', 'paid'];

  orders: Order[] = [
    { id: 'ORD-1001', table: 'T-04', status: 'new', time: '14:22', items: [{ qty: 2, name: 'Sea Bass', price: '76.000 TND' }, { qty: 1, name: 'Quinoa', price: '22.500 TND' }], total: '22.000 TND' },
    { id: 'ORD-1002', table: 'T-12', status: 'preparing', time: '14:10', prepTime: '12m', items: [{ qty: 1, name: 'Tagine', price: '34.000 TND' }], total: '52.000 TND' },
    { id: 'ORD-1003', table: 'T-01', status: 'ready', time: '13:55', items: [{ qty: 4, name: 'Espresso', price: '24.000 TND' }], total: '52.000 TND' },
    { id: 'ORD-1004', table: 'T-09', status: 'cancelled', time: '14:05', items: [{ qty: 1, name: 'Salad Bowl', price: '15.000 TND' }], total: '0.000 TND' },
    { id: 'ORD-1005', table: 'T-22', status: 'paid', time: '13:40', items: [{ qty: 1, name: 'Steak', price: '85.000 TND' }], total: '85.000 TND' },
    { id: 'ORD-1006', table: 'T-15', status: 'new', time: '14:25', items: [{ qty: 1, name: 'Couscous', price: '28.000 TND' }], total: '32.500 TND' },
    { id: 'ORD-1007', table: 'T-03', status: 'preparing', time: '14:15', prepTime: '8m', items: [{ qty: 2, name: 'Burger', price: '44.000 TND' }], total: '56.000 TND' },
  ];

  get filteredOrders(): Order[] {
    if (this.activeFilter === 'all') return this.orders;
    return this.orders.filter(o => o.status === this.activeFilter);
  }

  get activeCount(): number {
    return this.orders.filter(o => o.status !== 'cancelled' && o.status !== 'paid').length;
  }

  setFilter(f: string): void {
    this.activeFilter = f;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'preparing': return '#f97316';
      case 'ready': return '#22c55e';
      case 'cancelled': return '#ef4444';
      case 'paid': return '#94a3b8';
      default: return '#94a3b8';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'new': return 'New';
      case 'preparing': return 'Prep';
      case 'ready': return 'Ready';
      case 'cancelled': return 'Cancelled';
      case 'paid': return 'Paid';
      default: return status;
    }
  }

  getActionLabel(status: string): string {
    switch (status) {
      case 'new': return 'Accept';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Delivered';
      case 'cancelled': return 'Archived';
      case 'paid': return 'View Invoice';
      default: return 'View';
    }
  }
}
