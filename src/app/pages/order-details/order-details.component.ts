import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order = {
    id: 'GB-4922',
    type: 'DINE-IN TRANSACTION',
    date: 'Oct 24, 2023',
    time: '19:45',
    table: 'Table 12 (Main Dining Area)',
    currentStep: 1,
    items: [
      { name: 'Pan-Seared Sea Scallops', qty: 2, category: 'Starter', cook: 'Medium Well', price: '96.000 TND', modifier: 'EXTRA SEAR', modifierType: 'default', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlg3Cy_sisjHg3FlpeXiP0F-ZN28RnAU5XXDn9QbSaYa_HJMxVADwkjSHWkgTmJpfvnd-xi3wF91hbFMFIuquS-7PS1zYQJLQUl0iJlIaYmSIuNvKJ30KxxhCY-xWBqzZWuVMGUvj0fiakjLxncxdhWgh8n_DoWT2TxviGbGW0TQK6AKSYD0un-B4i1bbX7Ig9Ms4RCM7MvQ7nZDpP2nwJzlGNw7Qd0O6uN4nTT6cMufjZ1VYCcGa63dtE9RdWOnvyvVhs3wBJxT4' },
      { name: 'Aged Beef Tenderloin', qty: 1, category: 'Main', cook: 'Medium Rare', price: '145.000 TND', modifier: '', modifierType: '', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApYZg8YNTVQHw_QdgNSEmQWhU5gEUKCYf0fsCtJzOdks1SPP7xbiLaHO9reIc3RLcZuMv2QTBlqqg89D2HpqvUgZh8LVD8ASoCfns_JoDLMtuY6gMq-Pfd0qNzejUL5VCmxLRVtCVMHQpCf1p7WrHdo3cf3zP4xRIBFY9Oy2L9o7FyY_igUvY6cZtFvszT51jkt_5vuBAu2XDxyIDFf1W8DqG0Qu2hVWZq9bynt0wvnMYXvQ1qJ5hSYQ_yvLPonOu43IzX156E6tY' },
      { name: 'Heritage Garden Salad', qty: 1, category: 'Side', cook: '', price: '40.970 TND', modifier: 'NO CILANTRO', modifierType: 'warning', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKyaWfDqEU8RU2UDMsevJke6ppF1_w2PL8gPSPi6qkY19kgYgPnpQBZE2cUlVLj3IQZBh3TDh6lOOVPtjg-tQgaS5Cq4kkFhNx42BqeBT7H0Mdr1NAiE92-AlA8LzjlG_hgjEXgyq8RKSBXqJ6P5qbWcMneQa0VkgnddbGaHjVuokA7-AaXoA-EVFyZUxmgFTICMdK6_lwQufaI6inwdgPGM9qmDpbRfVEDpUd-mFRtbqBS25AcyQgpdr8Yo-tS338qBqTJ7ISVTM' },
    ],
    subtotal: '245.191 TND',
    tax: '36.779 TND',
    total: '281.970 TND',
  };

  steps = [
    { label: 'Order Received', icon: 'check_circle', status: 'completed' },
    { label: 'Preparing in Kitchen', icon: 'skillet', status: 'active' },
    { label: 'Ready for Serving', icon: 'restaurant', status: 'pending' },
    { label: 'Paid', icon: 'payments', status: 'pending' },
  ];
}
