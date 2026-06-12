import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="page-container">
      <div class="page-header">
        <div>
          <span class="section-label">FLOOR MANAGEMENT</span>
          <h2 class="section-title">Edit Table Details</h2>
        </div>
        <button class="back-btn" routerLink="/tables">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Tables
        </button>
      </div>

      <div class="form-container">
        <form (ngSubmit)="saveTable()">
          <div class="form-group">
            <label for="edit-name">Table Name / Number</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">tag</span>
              <input id="edit-name" type="text" [(ngModel)]="table.name" name="name" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="edit-area">Area / Zone</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">place</span>
              <select id="edit-area" [(ngModel)]="table.area" name="area">
                <option value="Indoor Area">Indoor Area</option>
                <option value="Terrace">Terrace</option>
                <option value="Bar Area">Bar Area</option>
                <option value="VIP Lounge">VIP Lounge</option>
              </select>
              <span class="material-symbols-outlined select-arrow">expand_more</span>
            </div>
          </div>

          <div class="form-group">
            <label>Status</label>
            <div class="status-toggle">
              <label class="toggle-option">
                <input type="radio" [(ngModel)]="table.status" name="status" value="available">
                <span class="toggle-btn">Available</span>
              </label>
              <label class="toggle-option">
                <input type="radio" [(ngModel)]="table.status" name="status" value="disabled">
                <span class="toggle-btn disabled-btn">Disabled</span>
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" routerLink="/tables">Cancel</button>
            <button type="submit" class="submit-btn">Save Changes</button>
          </div>
        </form>

        <div class="preview-panel">
          <div class="preview-card" [class.disabled-state]="table.status === 'disabled'">
            <div class="table-area-preview">{{ table.area }}</div>
            <div class="table-name-preview">{{ table.name }}</div>
            <div class="qr-preview-container">
              <img [src]="table.qrImage" alt="QR Preview" class="qr-image" *ngIf="table.qrImage">
              <span class="material-symbols-outlined placeholder-icon" *ngIf="!table.qrImage">qr_code_2</span>
            </div>
            <div class="qr-actions">
              <button type="button" class="view-qr-btn" [routerLink]="['/tables', table.id, 'qr']">
                <span class="material-symbols-outlined">qr_code_scanner</span>
                View QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-container { padding: 32px 40px; max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
    .section-label { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); display: block; margin-bottom: 8px; }
    .section-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em; color: var(--on-background); }
    .back-btn { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; transition: all 0.2s; }
    .back-btn:hover { background: #f8fafc; color: var(--primary); }
    
    .form-container { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
    form { background: white; padding: 40px; border-radius: 24px; box-shadow: var(--shadow-ambient); display: flex; flex-direction: column; gap: 24px; }
    
    .form-group label { display: block; font-size: 0.875rem; font-weight: 700; color: #475569; margin-bottom: 8px; }
    
    .input-wrap { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 16px; font-size: 20px; color: #94a3b8; pointer-events: none; }
    .input-wrap input, .input-wrap select { width: 100%; padding: 14px 16px 14px 48px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 0.9375rem; color: var(--on-surface); background: #f8fafc; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s; }
    .input-wrap input:focus, .input-wrap select:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(155,35,48,0.08); }
    
    .input-wrap select { appearance: none; padding-right: 48px; }
    .select-arrow { position: absolute; right: 16px; color: #94a3b8; pointer-events: none; }
    
    .status-toggle { display: flex; gap: 12px; margin-top: 8px; }
    .status-toggle .toggle-option { margin: 0; }
    .toggle-option input { display: none; }
    .toggle-btn { display: block; text-align: center; padding: 14px 24px; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
    .toggle-option input:checked + .toggle-btn { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 12px rgba(155, 35, 48, 0.2); }
    .toggle-option input:checked + .disabled-btn { background: #64748b; border-color: #64748b; box-shadow: none; }
    
    .form-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px; }
    .cancel-btn { padding: 16px 24px; border-radius: 12px; font-weight: 700; color: #64748b; transition: background 0.2s; border: none; background: transparent; cursor: pointer; }
    .cancel-btn:hover { background: #f1f5f9; }
    .submit-btn { padding: 16px 32px; border-radius: 12px; font-weight: 700; color: white; background: var(--primary); box-shadow: 0 8px 24px rgba(155, 35, 48, 0.2); transition: transform 0.2s; border: none; cursor: pointer; }
    .submit-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
    
    .preview-panel { display: flex; justify-content: center; align-items: flex-start; }
    .preview-card { background: white; border-radius: 24px; padding: 32px; box-shadow: var(--shadow-ambient); text-align: center; width: 100%; max-width: 320px; transition: all 0.3s; }
    .preview-card.disabled-state { background: #f8fafc; opacity: 0.8; filter: grayscale(1); }
    .table-area-preview { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 4px; }
    .table-name-preview { font-size: 1.5rem; font-weight: 900; color: var(--on-background); margin-bottom: 24px; }
    
    .qr-preview-container { width: 100%; aspect-ratio: 1; background: white; border: 1px solid #f1f5f9; border-radius: 16px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 24px; padding: 16px; }
    .qr-image { width: 100%; height: 100%; object-fit: contain; }
    .placeholder-icon { font-size: 64px !important; color: #cbd5e1; }
    
    .view-qr-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 12px; font-weight: 700; color: white; background: var(--primary); box-shadow: 0 8px 24px rgba(155, 35, 48, 0.2); border: none; cursor: pointer; transition: transform 0.2s, filter 0.2s; }
    .view-qr-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
    .view-qr-btn .material-symbols-outlined { font-size: 20px; }
  `]
})
export class TableEditComponent implements OnInit {
  table = {
    id: 1,
    name: 'Table 01',
    area: 'Indoor Area',
    status: 'available',
    qrImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLgadZSTv9_YBLke3dBZzUslXN66w76nnVQZI-7S372xecRtR_TDkc6PTBVDm7Br5Fbhx2KKJfwLSRt-_JkGqygufE5tyO6Kg5t8DZpyygmwIg3NanzUT2ieGQVDwhINLIyxBQFm5zZlZQ-StFcfjqannvGpLyKCNGeUC6ersRNhAKuYOjoFxFX6d8fy5a_xX9AAhIXemAcaJX-xRkDhgKOcY2jv6xaVy5W9nxQrGFF1_x83xNupwnB0ppxoi-Q49pUuQnnIwPa74'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // In a real app, fetch the table based on route.snapshot.params['id']
  }

  saveTable() {
    // Mock save, navigate back
    this.router.navigate(['/tables']);
  }
}
