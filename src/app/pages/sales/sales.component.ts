import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  transactions = [
    { id: '#ORD-9281', date: 'Oct 24, 2023', time: '19:42 PM', table: 'Table 12', items: '3 items', amount: '154.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9279', date: 'Oct 24, 2023', time: '18:15 PM', table: 'Table 04', items: '7 items', amount: '312.500 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9275', date: 'Oct 24, 2023', time: '17:02 PM', table: 'Table 08', items: '1 item', amount: '24.000 TND', status: 'Pending', statusColor: 'amber' },
    { id: '#ORD-9260', date: 'Oct 23, 2023', time: '22:42 PM', table: 'Table 15', items: '12 items', amount: '842.000 TND', status: 'Refunded', statusColor: 'red' },
  ];

  currentPage = 1;
  totalPages = 3;

  constructor(private router: Router) {}

  viewDetails(id: string) {
    this.router.navigate(['/sales', encodeURIComponent(id)]);
  }
}
