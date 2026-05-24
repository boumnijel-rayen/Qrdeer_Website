import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-add',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="page-container">
      <div class="page-header">
        <div>
          <span class="section-label">TEAM DIRECTORY</span>
          <h2 class="section-title">Add Staff Member</h2>
        </div>
        <button class="back-btn" routerLink="/staff">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Staff
        </button>
      </div>

      <div class="form-container">
        <form (ngSubmit)="saveStaff()">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" [(ngModel)]="staff.name" name="name" required placeholder="e.g. John Doe">
          </div>
          
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" [(ngModel)]="staff.email" name="email" required placeholder="john.doe@example.com">
          </div>

          <div class="form-group">
            <label>Role</label>
            <select [(ngModel)]="staff.role" name="role">
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Server">Server</option>
            </select>
          </div>

          <div class="form-group">
            <label>Initial Status</label>
            <div class="status-toggle">
              <label class="toggle-option">
                <input type="radio" [(ngModel)]="staff.status" name="status" value="active">
                <span class="toggle-btn">Active</span>
              </label>
              <label class="toggle-option">
                <input type="radio" [(ngModel)]="staff.status" name="status" value="inactive">
                <span class="toggle-btn">Inactive</span>
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" routerLink="/staff">Cancel</button>
            <button type="submit" class="submit-btn">Save Member</button>
          </div>
        </form>

        <div class="preview-panel">
          <div class="staff-card-preview" [class.inactive]="staff.status === 'inactive'">
            <div class="card-header">
              <div class="avatar-container">
                <span class="initial">{{ staff.name ? staff.name.charAt(0).toUpperCase() : '?' }}</span>
                <div class="status-indicator" [class.online]="staff.status === 'active'"></div>
              </div>
            </div>
            
            <div class="staff-info">
              <h3 class="staff-name">{{ staff.name || 'Staff Name' }}</h3>
              <p class="staff-email">{{ staff.email || 'email@example.com' }}</p>
              
              <div class="role-badge" [ngClass]="staff.role.toLowerCase()">
                {{ staff.role }}
              </div>
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
    
    .form-group label { display: block; font-size: 0.875rem; font-weight: 700; color: var(--on-surface); margin-bottom: 8px; }
    .form-group input, .form-group select { width: 100%; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 1rem; color: var(--on-surface); background: #f8fafc; transition: border-color 0.2s; }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: var(--primary); background: white; }
    
    .status-toggle { display: flex; gap: 12px; }
    .toggle-option input { display: none; }
    .toggle-btn { flex: 1; text-align: center; padding: 14px; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
    .toggle-option input:checked + .toggle-btn { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 12px rgba(155, 35, 48, 0.2); }
    
    .form-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px; }
    .cancel-btn { padding: 16px 24px; border-radius: 12px; font-weight: 700; color: #64748b; transition: background 0.2s; }
    .cancel-btn:hover { background: #f1f5f9; }
    .submit-btn { padding: 16px 32px; border-radius: 12px; font-weight: 700; color: white; background: var(--primary); box-shadow: 0 8px 24px rgba(155, 35, 48, 0.2); transition: transform 0.2s; }
    .submit-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
    
    .preview-panel { display: flex; justify-content: center; align-items: flex-start; }
    .staff-card-preview { background: white; border-radius: 24px; padding: 32px; box-shadow: var(--shadow-ambient); text-align: center; width: 100%; max-width: 320px; display: flex; flex-direction: column; align-items: center; transition: all 0.3s; }
    .staff-card-preview.inactive { opacity: 0.7; filter: grayscale(1); }
    
    .card-header { margin-bottom: 24px; display: flex; justify-content: center; width: 100%; }
    .avatar-container { position: relative; width: 80px; height: 80px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
    .initial { font-size: 2rem; font-weight: 800; color: #94a3b8; }
    .status-indicator { position: absolute; bottom: 4px; right: 4px; width: 16px; height: 16px; border-radius: 50%; background: #cbd5e1; border: 3px solid white; }
    .status-indicator.online { background: #22c55e; }
    
    .staff-info { text-align: center; width: 100%; }
    .staff-name { font-size: 1.5rem; font-weight: 800; color: var(--on-background); margin-bottom: 4px; word-break: break-word; }
    .staff-email { font-size: 0.875rem; color: #64748b; margin-bottom: 24px; word-break: break-all; }
    
    .role-badge { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .role-badge.admin { background: rgba(155, 35, 48, 0.1); color: var(--primary); }
    .role-badge.manager { background: rgba(0, 67, 63, 0.1); color: var(--tertiary); }
    .role-badge.server { background: #f1f5f9; color: #475569; }
  `]
})
export class StaffAddComponent {
  staff = {
    name: '',
    email: '',
    role: 'Server',
    status: 'active'
  };

  constructor(private router: Router) {}

  saveStaff() {
    // Mock save, navigate back
    this.router.navigate(['/staff']);
  }
}
