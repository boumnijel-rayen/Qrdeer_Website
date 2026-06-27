import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';

export interface Invoice {
  id: string;
  number: string;
  date: string;
  billingPeriod: string;
  plan: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  statusColor: string;
  paymentMethod: string;
  paymentIcon: string;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {

  // ── Subscription Info ──
  subscription = {
    plan: 'Premium',
    status: 'Active' as 'Active' | 'Expired',
    monthlyCost: 49.900,
    nextBillingDate: 'Jul 19, 2026',
    startDate: 'Jan 19, 2026',
  };

  // ── Company & Customer Info (for invoice detail) ──
  companyInfo = {
    name: 'Qrdeer Technologies',
    address: 'Rue du Lac Léman, Les Berges du Lac',
    city: 'Tunis, Tunisia 1053',
    email: 'billing@qrdeer.com',
    phone: '+216 71 000 000',
    taxId: 'TN-1234567/A/M/000',
  };

  customerInfo = {
    name: 'Restaurant Le Méditerranéen',
    address: '45 Avenue Habib Bourguiba',
    city: 'Tunis, Tunisia 1000',
    email: 'contact@lemediterraneen.tn',
    phone: '+216 71 234 567',
  };

  // ── Mock Invoices ──
  invoices: Invoice[] = [
    { id: '1', number: 'INV-2026-0019', date: 'Jun 19, 2026', billingPeriod: 'Jun 1 – Jun 30, 2026', plan: 'Premium', amount: 99.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 4532', paymentIcon: 'credit_card' },
    { id: '2', number: 'INV-2026-0018', date: 'May 19, 2026', billingPeriod: 'May 1 – May 31, 2026', plan: 'Premium', amount: 99.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 4532', paymentIcon: 'credit_card' },
    { id: '3', number: 'INV-2026-0017', date: 'Apr 19, 2026', billingPeriod: 'Apr 1 – Apr 30, 2026', plan: 'Premium', amount: 99.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 4532', paymentIcon: 'credit_card' },
    { id: '4', number: 'INV-2026-0016', date: 'Mar 19, 2026', billingPeriod: 'Mar 1 – Mar 31, 2026', plan: 'Professional', amount: 49.900, status: 'Refunded', statusColor: 'amber', paymentMethod: 'Visa •••• 4532', paymentIcon: 'credit_card' },
    { id: '5', number: 'INV-2026-0015', date: 'Feb 19, 2026', billingPeriod: 'Feb 1 – Feb 28, 2026', plan: 'Professional', amount: 49.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Bank Transfer', paymentIcon: 'account_balance' },
    { id: '6', number: 'INV-2026-0014', date: 'Jan 19, 2026', billingPeriod: 'Jan 1 – Jan 31, 2026', plan: 'Professional', amount: 49.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Bank Transfer', paymentIcon: 'account_balance' },
    { id: '7', number: 'INV-2025-0013', date: 'Dec 19, 2025', billingPeriod: 'Dec 1 – Dec 31, 2025', plan: 'Starter', amount: 29.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 4532', paymentIcon: 'credit_card' },
    { id: '8', number: 'INV-2025-0012', date: 'Nov 19, 2025', billingPeriod: 'Nov 1 – Nov 30, 2025', plan: 'Starter', amount: 29.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 4532', paymentIcon: 'credit_card' },
    { id: '9', number: 'INV-2025-0011', date: 'Oct 19, 2025', billingPeriod: 'Oct 1 – Oct 31, 2025', plan: 'Starter', amount: 29.900, status: 'Failed', statusColor: 'red', paymentMethod: 'Visa •••• 8901', paymentIcon: 'credit_card' },
    { id: '10', number: 'INV-2025-0010', date: 'Sep 19, 2025', billingPeriod: 'Sep 1 – Sep 30, 2025', plan: 'Starter', amount: 29.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 8901', paymentIcon: 'credit_card' },
    { id: '11', number: 'INV-2025-0009', date: 'Aug 19, 2025', billingPeriod: 'Aug 1 – Aug 31, 2025', plan: 'Starter', amount: 29.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Visa •••• 8901', paymentIcon: 'credit_card' },
    { id: '12', number: 'INV-2025-0008', date: 'Jul 19, 2025', billingPeriod: 'Jul 1 – Jul 31, 2025', plan: 'Starter', amount: 29.900, status: 'Paid', statusColor: 'green', paymentMethod: 'Bank Transfer', paymentIcon: 'account_balance' },
    { id: '13', number: 'INV-2025-0007', date: 'Jun 19, 2025', billingPeriod: 'Jun 1 – Jun 30, 2025', plan: 'Starter', amount: 0, status: 'Paid', statusColor: 'green', paymentMethod: 'Free Trial', paymentIcon: 'redeem' },
  ];

  // ── Search & Filters ──
  searchQuery = '';
  startDate = '';
  endDate = '';

  // ── Pagination ──
  itemsPerPage = 5;
  currentPage = 1;

  // ── Invoice Detail Modal ──
  showInvoiceModal = false;
  selectedInvoice: Invoice | null = null;

  // ── Computed: Filtered Invoices ──
  get filteredInvoices(): Invoice[] {
    let result = this.invoices;

    // Search
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(inv =>
        inv.number.toLowerCase().includes(q) ||
        inv.paymentMethod.toLowerCase().includes(q) ||
        inv.plan.toLowerCase().includes(q)
      );
    }

    // Date Range Filter
    if (this.startDate || this.endDate) {
      result = result.filter(inv => {
        const d = new Date(inv.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const invDateStr = `${year}-${month}-${day}`;

        let isValid = true;
        if (this.startDate && invDateStr < this.startDate) {
          isValid = false;
        }
        if (this.endDate && invDateStr > this.endDate) {
          isValid = false;
        }
        return isValid;
      });
    }

    return result;
  }

  // ── Computed: Pagination ──
  get totalPages(): number {
    return Math.ceil(this.filteredInvoices.length / this.itemsPerPage) || 1;
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedInvoices(): Invoice[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredInvoices.slice(start, start + this.itemsPerPage);
  }

  get startItemIndex(): number {
    if (this.filteredInvoices.length === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredInvoices.length);
  }

  // ── Computed: Summary Stats ──
  get paidInvoiceCount(): number {
    return this.invoices.filter(inv => inv.status === 'Paid').length;
  }

  // ── Actions ──
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }



  viewInvoice(invoice: Invoice): void {
    this.selectedInvoice = invoice;
    this.showInvoiceModal = true;
  }

  closeInvoiceModal(): void {
    this.showInvoiceModal = false;
    this.selectedInvoice = null;
  }

  onBackdropClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeInvoiceModal();
    }
  }

  downloadPDF(invoice: Invoice): void {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.number}`, 20, 40);
    doc.text(`Invoice Date: ${invoice.date}`, 20, 50);
    doc.text(`Billing Period: ${invoice.billingPeriod}`, 20, 60);
    
    doc.setFontSize(14);
    doc.text('From:', 20, 80);
    doc.setFontSize(12);
    doc.text(this.companyInfo.name, 20, 90);
    doc.text(this.companyInfo.address, 20, 100);
    doc.text(this.companyInfo.city, 20, 110);
    doc.text(this.companyInfo.email, 20, 120);
    
    doc.setFontSize(14);
    doc.text('To:', 120, 80);
    doc.setFontSize(12);
    doc.text(this.customerInfo.name, 120, 90);
    doc.text(this.customerInfo.address, 120, 100);
    doc.text(this.customerInfo.city, 120, 110);
    doc.text(this.customerInfo.email, 120, 120);
    
    doc.line(20, 135, 190, 135);
    doc.setFontSize(12);
    doc.text('Description', 20, 145);
    doc.text('Amount (DT)', 160, 145);
    doc.line(20, 150, 190, 150);
    
    doc.text(`${invoice.plan} Plan (Monthly)`, 20, 160);
    doc.text(this.formatAmount(invoice.amount), 160, 160);
    
    doc.line(20, 170, 190, 170);
    
    doc.text('Subtotal:', 120, 180);
    doc.text(this.formatAmount(invoice.amount), 160, 180);
    
    doc.text('Tax (19%):', 120, 190);
    doc.text(this.formatAmount(invoice.amount * 0.19), 160, 190);
    
    doc.setFontSize(14);
    doc.text('Total:', 120, 205);
    doc.text(this.formatAmount(invoice.amount * 1.19), 160, 205);
    
    doc.setFontSize(12);
    doc.text(`Status: ${invoice.status}`, 20, 220);
    
    doc.text('Thank you for your business!', 105, 250, { align: 'center' });
    
    doc.save(`${invoice.number}.pdf`);
  }

  printInvoice(invoice: Invoice): void {
    this.selectedInvoice = invoice;
    this.showInvoiceModal = true;
    setTimeout(() => window.print(), 300);
  }

  formatAmount(amount: number): string {
    return amount.toFixed(3);
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Paid': return 'check_circle';
      case 'Pending': return 'schedule';
      case 'Failed': return 'error';
      case 'Refunded': return 'undo';
      default: return 'info';
    }
  }

  private generateInvoiceText(invoice: Invoice): string {
    return `
═══════════════════════════════════════
            INVOICE
═══════════════════════════════════════

Invoice Number: ${invoice.number}
Invoice Date:   ${invoice.date}
Billing Period: ${invoice.billingPeriod}

From:
  ${this.companyInfo.name}
  ${this.companyInfo.address}
  ${this.companyInfo.city}
  ${this.companyInfo.email}

To:
  ${this.customerInfo.name}
  ${this.customerInfo.address}
  ${this.customerInfo.city}
  ${this.customerInfo.email}

───────────────────────────────────────
Description              Amount (DT)
───────────────────────────────────────
${invoice.plan} Plan (Monthly)    ${this.formatAmount(invoice.amount)}
───────────────────────────────────────

Subtotal:    ${this.formatAmount(invoice.amount)}
Tax (19%):   ${this.formatAmount(invoice.amount * 0.19)}
Total:       ${this.formatAmount(invoice.amount * 1.19)}

Payment Method: ${invoice.paymentMethod}
Status: ${invoice.status}

═══════════════════════════════════════
    Thank you for your business!
═══════════════════════════════════════
    `.trim();
  }

  @HostListener('document:click')
  closeDropdowns(): void {
  }
}
