import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-qr',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page-container">
      <div class="page-header">
        <button class="back-btn" routerLink="/tables">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Tables
        </button>
      </div>

      <div class="qr-showcase">
        <div class="qr-card" id="print-section">
          <div class="brand-header">
            <span class="material-symbols-outlined brand-icon">restaurant_menu</span>
            <span class="brand-text">Qrdeer</span>
          </div>
          
          <div class="qr-content">
            <h2 class="table-name">{{ table.name }}</h2>
            <p class="table-area">{{ table.area }}</p>
            
            <div class="qr-frame">
              <div class="frame-corner top-left"></div>
              <div class="frame-corner top-right"></div>
              <div class="frame-corner bottom-left"></div>
              <div class="frame-corner bottom-right"></div>
              
              <div class="scan-overlay">
                <div class="scan-line"></div>
              </div>
              
              <img [src]="table.qrImage" alt="QR Code for {{ table.name }}" class="qr-image">
            </div>
            
            <p class="scan-instruction">Scan to view menu & order</p>
          </div>
        </div>

        <div class="action-panel">
          <h3>QR Code Actions</h3>
          <p class="action-desc">Download or print this QR code to place on the physical table.</p>
          
          <div class="action-buttons">
            <button class="action-btn primary" (click)="downloadQR()">
              <span class="material-symbols-outlined">download</span>
              Download PNG
            </button>
            <button class="action-btn secondary" (click)="printQR()">
              <span class="material-symbols-outlined">print</span>
              Print Now
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-container { padding: 32px 40px; max-width: 1400px; margin: 0 auto; min-height: 80vh; display: flex; flex-direction: column; }
    .page-header { margin-bottom: 40px; }
    .back-btn { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; transition: all 0.2s; display: inline-flex; }
    .back-btn:hover { background: #f8fafc; color: var(--primary); }
    
    .qr-showcase { display: flex; gap: 64px; align-items: center; justify-content: center; flex: 1; flex-wrap: wrap; }
    
    .qr-card { background: white; border-radius: 32px; padding: 48px; box-shadow: 0 32px 64px rgba(155, 35, 48, 0.15); display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 480px; position: relative; overflow: hidden; }
    
    .brand-header { display: flex; align-items: center; gap: 8px; margin-bottom: 32px; opacity: 0.5; }
    .brand-icon { font-variation-settings: 'FILL' 1; color: var(--primary); }
    .brand-text { font-weight: 800; font-size: 1.25rem; letter-spacing: -0.02em; }
    
    .qr-content { text-align: center; width: 100%; }
    .table-name { font-size: 2.5rem; font-weight: 900; color: var(--on-background); margin-bottom: 4px; }
    .table-area { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #94a3b8; margin-bottom: 40px; }
    
    .qr-frame { position: relative; width: 280px; height: 280px; margin: 0 auto 32px; padding: 24px; background: white; border-radius: 24px; box-shadow: inset 0 0 0 1px #f1f5f9; }
    .frame-corner { position: absolute; width: 32px; height: 32px; border: 4px solid var(--primary); border-radius: 8px; }
    .top-left { top: -2px; left: -2px; border-right: none; border-bottom: none; }
    .top-right { top: -2px; right: -2px; border-left: none; border-bottom: none; }
    .bottom-left { bottom: -2px; left: -2px; border-right: none; border-top: none; }
    .bottom-right { bottom: -2px; right: -2px; border-left: none; border-top: none; }
    
    .qr-image { width: 100%; height: 100%; object-fit: contain; position: relative; z-index: 2; }
    
    .scan-overlay { position: absolute; inset: 0; overflow: hidden; border-radius: 24px; z-index: 3; pointer-events: none; }
    .scan-line { width: 100%; height: 4px; background: rgba(155, 35, 48, 0.8); box-shadow: 0 0 16px var(--primary); position: absolute; top: 0; left: 0; animation: scan 3s ease-in-out infinite; }
    @keyframes scan { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
    
    .scan-instruction { font-size: 1rem; font-weight: 700; color: var(--primary); background: rgba(155, 35, 48, 0.05); padding: 12px 24px; border-radius: 999px; display: inline-block; }
    
    .action-panel { max-width: 400px; }
    .action-panel h3 { font-size: 1.5rem; font-weight: 800; color: var(--on-background); margin-bottom: 12px; }
    .action-desc { color: #64748b; line-height: 1.6; margin-bottom: 32px; }
    
    .action-buttons { display: flex; flex-direction: column; gap: 16px; }
    .action-btn { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 16px; border-radius: 16px; font-size: 1rem; font-weight: 700; transition: all 0.2s; }
    .action-btn.primary { background: var(--primary); color: white; box-shadow: 0 8px 24px rgba(155, 35, 48, 0.2); }
    .action-btn.primary:hover { transform: translateY(-2px); filter: brightness(1.1); }
    .action-btn.secondary { background: white; border: 2px solid #e2e8f0; color: #475569; }
    .action-btn.secondary:hover { border-color: var(--primary); color: var(--primary); }
    
    @media print {
      body * { visibility: hidden; }
      #print-section, #print-section * { visibility: visible; }
      #print-section { position: absolute; left: 0; top: 0; box-shadow: none; }
      .scan-overlay { display: none; }
    }
  `]
})
export class TableQrComponent implements OnInit {
  table = {
    id: 1,
    name: 'Table 01',
    area: 'Indoor Area',
    qrImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLgadZSTv9_YBLke3dBZzUslXN66w76nnVQZI-7S372xecRtR_TDkc6PTBVDm7Br5Fbhx2KKJfwLSRt-_JkGqygufE5tyO6Kg5t8DZpyygmwIg3NanzUT2ieGQVDwhINLIyxBQFm5zZlZQ-StFcfjqannvGpLyKCNGeUC6ersRNhAKuYOjoFxFX6d8fy5a_xX9AAhIXemAcaJX-xRkDhgKOcY2jv6xaVy5W9nxQrGFF1_x83xNupwnB0ppxoi-Q49pUuQnnIwPa74'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Fetch table details using route ID in real app
  }

  downloadQR() {
    alert('QR Code download started.');
  }

  printQR() {
    window.print();
  }
}
