import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Period {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  periods: Period[] = [
    { key: 'today', label: 'Today', icon: 'today' },
    { key: '24h', label: 'Last 24 Hours', icon: 'schedule' },
    { key: '7d', label: 'Last 7 Days', icon: 'date_range' },
    { key: '30d', label: 'Last 30 Days', icon: 'calendar_month' },
    { key: 'month', label: 'This Month', icon: 'event' },
    { key: 'custom', label: 'Custom Range', icon: 'edit_calendar' },
  ];

  selectedPeriod: Period = this.periods[3]; // Default: Last 30 Days
  periodDropdownOpen = false;

  showCustomDatePicker = false;
  customStartDate: string = '';
  customEndDate: string = '';
  dateError: string = '';

  filterDropdownOpen = false;
  selectedFilter = 'All';
  filterOptions = ['All', 'Completed', 'Refunded'];

  itemsPerPage = 5; // Display 5 orders per page
  currentPage = 1;

  transactions = [
    { id: '#ORD-9300', date: 'Oct 25, 2023', time: '21:30 PM', table: 'Table 01', items: '2 items', amount: '85.500 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9299', date: 'Oct 25, 2023', time: '20:15 PM', table: 'Table 05', items: '4 items', amount: '210.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9298', date: 'Oct 25, 2023', time: '19:45 PM', table: 'Table 09', items: '1 item', amount: '15.000 TND', status: 'Refunded', statusColor: 'red' },
    { id: '#ORD-9297', date: 'Oct 25, 2023', time: '19:10 PM', table: 'Table 03', items: '6 items', amount: '340.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9296', date: 'Oct 25, 2023', time: '18:50 PM', table: 'Table 11', items: '3 items', amount: '120.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9295', date: 'Oct 25, 2023', time: '18:20 PM', table: 'Table 02', items: '2 items', amount: '90.000 TND', status: 'Refunded', statusColor: 'red' },
    { id: '#ORD-9294', date: 'Oct 25, 2023', time: '17:30 PM', table: 'Table 07', items: '5 items', amount: '275.500 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9293', date: 'Oct 25, 2023', time: '16:45 PM', table: 'Table 08', items: '1 item', amount: '25.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9292', date: 'Oct 25, 2023', time: '15:15 PM', table: 'Table 04', items: '8 items', amount: '410.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9291', date: 'Oct 25, 2023', time: '14:30 PM', table: 'Table 14', items: '2 items', amount: '65.000 TND', status: 'Refunded', statusColor: 'red' },
    { id: '#ORD-9290', date: 'Oct 24, 2023', time: '22:10 PM', table: 'Table 10', items: '4 items', amount: '185.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9289', date: 'Oct 24, 2023', time: '21:05 PM', table: 'Table 06', items: '3 items', amount: '140.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9288', date: 'Oct 24, 2023', time: '20:45 PM', table: 'Table 12', items: '5 items', amount: '260.000 TND', status: 'Refunded', statusColor: 'red' },
    { id: '#ORD-9287', date: 'Oct 24, 2023', time: '19:50 PM', table: 'Table 15', items: '2 items', amount: '95.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9286', date: 'Oct 24, 2023', time: '19:20 PM', table: 'Table 01', items: '7 items', amount: '350.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9285', date: 'Oct 24, 2023', time: '18:40 PM', table: 'Table 09', items: '1 item', amount: '30.000 TND', status: 'Refunded', statusColor: 'red' },
    { id: '#ORD-9284', date: 'Oct 24, 2023', time: '17:55 PM', table: 'Table 03', items: '4 items', amount: '190.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9283', date: 'Oct 24, 2023', time: '17:15 PM', table: 'Table 05', items: '2 items', amount: '80.000 TND', status: 'Completed', statusColor: 'green' },
    { id: '#ORD-9282', date: 'Oct 24, 2023', time: '16:30 PM', table: 'Table 11', items: '6 items', amount: '315.000 TND', status: 'Refunded', statusColor: 'red' },
    { id: '#ORD-9281', date: 'Oct 24, 2023', time: '15:45 PM', table: 'Table 07', items: '3 items', amount: '145.000 TND', status: 'Completed', statusColor: 'green' },
  ];

  get filteredTransactions() {
    if (this.selectedFilter === 'All') return this.transactions;
    return this.transactions.filter(t => t.status === this.selectedFilter);
  }


  get totalPages() {
    return Math.ceil(this.filteredTransactions.length / this.itemsPerPage) || 1;
  }

  get pagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTransactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get startItemIndex() {
    if (this.filteredTransactions.length === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex() {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredTransactions.length);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  constructor(private router: Router) {}

  viewDetails(id: string) {
    this.router.navigate(['/sales', encodeURIComponent(id)]);
  }

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.filterDropdownOpen = !this.filterDropdownOpen;
    if (this.filterDropdownOpen) {
      this.periodDropdownOpen = false; // Close the other dropdown if open
    }
  }

  selectFilter(option: string) {
    this.selectedFilter = option;
    this.filterDropdownOpen = false;
    this.currentPage = 1; // Reset pagination on filter change
  }

  togglePeriodDropdown(event: Event) {
    event.stopPropagation();
    this.periodDropdownOpen = !this.periodDropdownOpen;
    if (this.periodDropdownOpen) {
      this.showCustomDatePicker = false;
      this.filterDropdownOpen = false; // Close the other dropdown if open
    }
  }

  selectPeriod(period: Period) {
    if (period.key === 'custom') {
      this.showCustomDatePicker = true;
    } else {
      this.selectedPeriod = period;
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
      this.periodDropdownOpen = false;
    }
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.periodDropdownOpen = false;
    this.showCustomDatePicker = false;
    this.filterDropdownOpen = false;
  }
}
