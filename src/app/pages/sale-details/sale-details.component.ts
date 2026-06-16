import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

interface OrderItem {
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
  category: string;
}

interface Transaction {
  id: string;
  date: string;
  time: string;
  table: string;
  items: string;
  amount: string;
  status: string;
  statusColor: string;
  server?: string;
  subtotal?: number;

  tip?: number;
  total?: number;
  paymentMethod?: string;
  note?: string;
  orderItems?: OrderItem[];
}

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page-container">
      <div class="page-header">
        <div>
          <span class="section-label">SALES</span>
          <h2 class="section-title">Order Details</h2>
        </div>
        <button class="back-btn" routerLink="/sales">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Sales
        </button>
      </div>

      @if (transaction) {
        <div class="details-layout">
          <!-- Left Column -->
          <div class="details-main">

            <!-- Status Banner -->
            <div class="status-banner" [attr.data-status]="transaction.statusColor">
              <div class="status-banner-left">
                <span class="material-symbols-outlined status-banner-icon">
                  {{ transaction.statusColor === 'green' ? 'check_circle' : transaction.statusColor === 'amber' ? 'pending' : 'cancel' }}
                </span>
                <div>
                  <p class="status-banner-label">ORDER STATUS</p>
                  <p class="status-banner-value">{{ transaction.status }}</p>
                </div>
              </div>
              <span class="status-tag-large" [attr.data-status]="transaction.statusColor">
                <span class="status-dot"></span>
                {{ transaction.status }}
              </span>
            </div>

            <!-- Items Table -->
            <div class="items-card">
              <div class="items-header">
                <h4>Order Items</h4>
                <span class="item-count">{{ transaction.orderItems?.length }} items</span>
              </div>
              <div class="items-table-wrap">
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>ITEM</th>
                      <th>CATEGORY</th>
                      <th class="center">QTY</th>
                      <th class="right">UNIT PRICE</th>
                      <th class="right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of transaction.orderItems; track item.name) {
                      <tr>
                        <td class="item-name">{{ item.name }}</td>
                        <td><span class="category-badge">{{ item.category }}</span></td>
                        <td class="center item-qty">{{ item.qty }}</td>
                        <td class="right item-price">{{ item.unitPrice.toFixed(3) }} TND</td>
                        <td class="right item-total">{{ item.total.toFixed(3) }} TND</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <!-- Totals -->
              <div class="totals-section">
                <div class="totals-row">
                  <span class="total-label">Subtotal</span>
                  <span class="total-val">{{ transaction.subtotal?.toFixed(3) }} TND</span>
                </div>

                <div class="totals-row">
                  <span class="total-label">Service Charge</span>
                  <span class="total-val">{{ transaction.tip?.toFixed(3) }} TND</span>
                </div>
                <div class="totals-divider"></div>
                <div class="totals-row grand-total">
                  <span>Grand Total</span>
                  <span>{{ transaction.total?.toFixed(3) }} TND</span>
                </div>
              </div>
            </div>

            <!-- Notes -->
            @if (transaction.note) {
              <div class="notes-card">
                <span class="material-symbols-outlined">sticky_note_2</span>
                <div>
                  <p class="notes-title">Order Note</p>
                  <p class="notes-text">{{ transaction.note }}</p>
                </div>
              </div>
            }
          </div>

          <!-- Right Column -->
          <div class="details-side">
            <!-- Order Info -->
            <div class="info-card">
              <h4 class="card-title">Order Information</h4>
              <div class="info-item">
                <span class="info-icon material-symbols-outlined">receipt</span>
                <div>
                  <p class="info-label">Order ID</p>
                  <p class="info-value mono">{{ transaction.id }}</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon material-symbols-outlined">calendar_today</span>
                <div>
                  <p class="info-label">Date & Time</p>
                  <p class="info-value">{{ transaction.date }}</p>
                  <p class="info-sub">{{ transaction.time }}</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon material-symbols-outlined">table_restaurant</span>
                <div>
                  <p class="info-label">Table</p>
                  <p class="info-value">{{ transaction.table }}</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon material-symbols-outlined">person</span>
                <div>
                  <p class="info-label">Served By</p>
                  <p class="info-value">{{ transaction.server }}</p>
                </div>
              </div>
            </div>

            <!-- Payment Info -->
            <div class="info-card payment-card">
              <h4 class="card-title">Payment Details</h4>
              <div class="payment-method-row">
                <div class="payment-icon">
                  <span class="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <p class="info-label">Method</p>
                  <p class="info-value">{{ transaction.paymentMethod }}</p>
                </div>
              </div>
              <div class="payment-amount-block">
                <p class="payment-amount-label">Amount Collected</p>
                <p class="payment-amount-value">{{ transaction.amount }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="actions-card">
              <h4 class="card-title">Actions</h4>
              <button class="action-btn print-btn">
                <span class="material-symbols-outlined">print</span>
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .page-container { padding: 32px 40px; max-width: 1300px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
    .section-label { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); display: block; margin-bottom: 8px; }
    .section-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em; color: var(--on-background); }
    .back-btn { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
    .back-btn:hover { background: #f8fafc; color: var(--primary); }

    .details-layout { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
    .details-main { display: flex; flex-direction: column; gap: 24px; }

    /* Status Banner */
    .status-banner { background: white; border-radius: 20px; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-ambient); border-left: 4px solid transparent; }
    .status-banner[data-status="green"] { border-left-color: #10b981; }
    .status-banner[data-status="amber"] { border-left-color: #f59e0b; }
    .status-banner[data-status="red"] { border-left-color: #ef4444; }
    .status-banner-left { display: flex; align-items: center; gap: 16px; }
    .status-banner-icon { font-size: 36px; }
    .status-banner[data-status="green"] .status-banner-icon { color: #10b981; }
    .status-banner[data-status="amber"] .status-banner-icon { color: #f59e0b; }
    .status-banner[data-status="red"] .status-banner-icon { color: #ef4444; }
    .status-banner-label { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
    .status-banner-value { font-size: 1.25rem; font-weight: 800; color: var(--on-background); }

    .status-tag-large { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 999px; font-size: 0.875rem; font-weight: 700; }
    .status-tag-large[data-status="green"] { background: #ecfdf5; color: #047857; }
    .status-tag-large[data-status="amber"] { background: #fffbeb; color: #a16207; }
    .status-tag-large[data-status="red"] { background: #fef2f2; color: #b91c1c; }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; }
    .status-tag-large[data-status="green"] .status-dot { background: #10b981; }
    .status-tag-large[data-status="amber"] .status-dot { background: #f59e0b; }
    .status-tag-large[data-status="red"] .status-dot { background: #ef4444; }

    /* Items Card */
    .items-card { background: white; border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-ambient); }
    .items-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; border-bottom: 1px solid #f8fafc; }
    .items-header h4 { font-size: 1.1rem; font-weight: 700; color: var(--on-surface); }
    .item-count { font-size: 0.75rem; font-weight: 700; color: var(--primary); background: rgba(155,35,48,0.08); padding: 4px 12px; border-radius: 999px; }
    .items-table-wrap { overflow-x: auto; }
    .items-table { width: 100%; border-collapse: collapse; }
    .items-table thead tr { background: #f8fafc; }
    .items-table th { padding: 14px 24px; font-size: 0.625rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; text-align: left; }
    .items-table td { padding: 18px 24px; border-bottom: 1px solid #f8fafc; }
    .items-table tbody tr:last-child td { border-bottom: none; }
    .items-table tbody tr:hover { background: #fafafa; }
    .center { text-align: center; }
    .right { text-align: right; }
    .item-name { font-size: 0.9375rem; font-weight: 600; color: var(--on-background); }
    .category-badge { display: inline-block; padding: 3px 10px; background: #f1f5f9; border-radius: 6px; font-size: 0.625rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
    .item-qty { font-size: 0.9375rem; font-weight: 700; color: var(--on-background); }
    .item-price { font-size: 0.875rem; color: #64748b; }
    .item-total { font-size: 0.9375rem; font-weight: 700; color: var(--on-background); }

    .totals-section { padding: 24px 32px; border-top: 1px solid #f1f5f9; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.875rem; color: #64748b; }
    .total-label { }
    .total-val { font-weight: 600; color: var(--on-background); }
    .totals-divider { border: none; border-top: 2px dashed #e2e8f0; margin: 12px 0; }
    .grand-total { font-size: 1.1rem; font-weight: 800; color: var(--on-background); }

    /* Notes Card */
    .notes-card { background: #fffbeb; border: 1px solid #fde68a; border-radius: 16px; padding: 20px 24px; display: flex; gap: 14px; align-items: flex-start; }
    .notes-card .material-symbols-outlined { font-size: 22px; color: #a16207; flex-shrink: 0; margin-top: 2px; }
    .notes-title { font-size: 0.875rem; font-weight: 700; color: #92400e; margin-bottom: 4px; }
    .notes-text { font-size: 0.875rem; color: #78350f; line-height: 1.6; }

    /* Side Cards */
    .details-side { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 24px; }
    .info-card { background: white; border-radius: 20px; padding: 24px; box-shadow: var(--shadow-ambient); }
    .card-title { font-size: 1rem; font-weight: 700; color: var(--on-background); margin-bottom: 20px; }
    .info-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
    .info-item:last-child { margin-bottom: 0; }
    .info-icon { font-size: 20px; color: var(--primary); background: rgba(155,35,48,0.08); padding: 8px; border-radius: 10px; flex-shrink: 0; }
    .info-label { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; }
    .info-value { font-size: 0.9375rem; font-weight: 700; color: var(--on-background); }
    .info-sub { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
    .mono { font-family: 'Courier New', monospace; }

    .payment-card { }
    .payment-method-row { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
    .payment-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(155,35,48,0.08); display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0; }
    .payment-icon .material-symbols-outlined { font-size: 22px; }
    .payment-amount-block { background: #f8fafc; border-radius: 12px; padding: 16px; text-align: center; }
    .payment-amount-label { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .payment-amount-value { font-size: 1.5rem; font-weight: 900; color: var(--on-background); }

    .actions-card { background: white; border-radius: 20px; padding: 24px; box-shadow: var(--shadow-ambient); display: flex; flex-direction: column; gap: 12px; }
    .action-btn { width: 100%; display: flex; align-items: center; gap: 10px; padding: 14px 18px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; transition: all 0.2s; cursor: pointer; border: 1px solid; }
    .action-btn .material-symbols-outlined { font-size: 20px; }
    .print-btn { background: #f8fafc; color: #475569; border-color: #e2e8f0; }
    .print-btn:hover { background: #f1f5f9; }
    .pdf-btn { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
    .pdf-btn:hover { background: #fee2e2; }
    .refund-btn { background: #fffbeb; color: #a16207; border-color: #fde68a; }
    .refund-btn:hover { background: #fef9c3; }

    @media (max-width: 1024px) {
      .details-layout { grid-template-columns: 1fr; }
    }
  `]
})
export class SaleDetailsComponent implements OnInit {
  transaction: Transaction | null = null;

  // Mock transactions matching the sales page data
  private allTransactions: Transaction[] = [
    {
      id: '#ORD-9281', date: 'Oct 24, 2023', time: '19:42 PM', table: 'Table 12',
      items: '3 items', amount: '154.000 TND', status: 'Completed', statusColor: 'green',
      server: 'Ahmed Ben Ali', paymentMethod: 'Credit Card',
      subtotal: 128.57, tip: 1.00, total: 129.57,
      note: 'Customer requested no onions on the main course.',
      orderItems: [
        { name: 'Grilled Sea Bass', category: 'Main', qty: 1, unitPrice: 58.000, total: 58.000 },
        { name: 'Salade Niçoise', category: 'Starter', qty: 2, unitPrice: 24.000, total: 48.000 },
        { name: 'Crème Brûlée', category: 'Dessert', qty: 1, unitPrice: 18.000, total: 18.000 },
        { name: 'Mineral Water', category: 'Beverage', qty: 2, unitPrice: 2.285, total: 4.570 },
      ]
    },
    {
      id: '#ORD-9279', date: 'Oct 24, 2023', time: '18:15 PM', table: 'Table 04',
      items: '7 items', amount: '312.500 TND', status: 'Completed', statusColor: 'green',
      server: 'Fatma Karray', paymentMethod: 'Cash',
      subtotal: 261.34, tip: 1.50, total: 262.84,
      orderItems: [
        { name: 'Filet Mignon', category: 'Main', qty: 2, unitPrice: 85.000, total: 170.000 },
        { name: 'Lobster Bisque', category: 'Starter', qty: 2, unitPrice: 32.000, total: 64.000 },
        { name: 'Chocolate Fondant', category: 'Dessert', qty: 2, unitPrice: 22.000, total: 44.000 },
        { name: 'House Wine', category: 'Beverage', qty: 1, unitPrice: 34.500, total: 34.500 },
      ]
    },
    {
      id: '#ORD-9275', date: 'Oct 24, 2023', time: '17:02 PM', table: 'Table 08',
      items: '1 item', amount: '24.000 TND', status: 'Pending', statusColor: 'amber',
      server: 'Youssef Trabelsi', paymentMethod: 'Pending',
      subtotal: 20.17, tip: 0, total: 20.17,
      note: 'Order placed but payment not yet received.',
      orderItems: [
        { name: 'Tuna Tartare', category: 'Starter', qty: 1, unitPrice: 24.000, total: 24.000 },
      ]
    },
    {
      id: '#ORD-9260', date: 'Oct 23, 2023', time: '22:42 PM', table: 'Table 15',
      items: '12 items', amount: '842.000 TND', status: 'Refunded', statusColor: 'red',
      server: 'Mariem Souissi', paymentMethod: 'Credit Card (Refunded)',
      subtotal: 706.72, tip: 1.00, total: 707.72,
      note: 'Full refund issued due to service quality complaint.',
      orderItems: [
        { name: 'Wagyu Beef', category: 'Main', qty: 4, unitPrice: 120.000, total: 480.000 },
        { name: 'Oyster Platter', category: 'Starter', qty: 2, unitPrice: 65.000, total: 130.000 },
        { name: 'Premium Wine', category: 'Beverage', qty: 3, unitPrice: 52.000, total: 156.000 },
        { name: 'Assorted Desserts', category: 'Dessert', qty: 4, unitPrice: 19.000, total: 76.000 },
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const decodedId = decodeURIComponent(id || '');
    
    this.transaction = this.allTransactions.find(t => t.id === decodedId) || null;
    
    if (!this.transaction && decodedId) {
      // Mock it on the fly if not found in the hardcoded list
      this.transaction = {
        id: decodedId, date: 'Oct 25, 2023', time: '12:00 PM', table: 'Table XX',
        items: '5 items', amount: '150.000 TND', status: 'Completed', statusColor: 'green',
        server: 'Auto-Generated', paymentMethod: 'Credit Card',
        subtotal: 130.000, tip: 20.000, total: 150.000,
        orderItems: [
          { name: 'Dynamic Item 1', category: 'Main', qty: 2, unitPrice: 50.000, total: 100.000 },
          { name: 'Dynamic Item 2', category: 'Beverage', qty: 1, unitPrice: 30.000, total: 30.000 }
        ]
      };
    }
    
    if (!this.transaction) {
      this.router.navigate(['/sales']);
    }
  }
}
