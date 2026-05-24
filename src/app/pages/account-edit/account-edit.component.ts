import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="page-container">
      <div class="page-header">
        <div>
          <span class="section-label">ACCOUNT SETTINGS</span>
          <h2 class="section-title">Edit Profile</h2>
        </div>
        <button class="back-btn" routerLink="/account">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Account
        </button>
      </div>

      <div class="edit-layout">
        <!-- Left: Form -->
        <form class="edit-form" (ngSubmit)="saveProfile()">
          <!-- Avatar Section -->
          <div class="avatar-section">
            <div class="avatar-wrap">
              <div class="avatar-display">
                <span class="material-symbols-outlined">person</span>
              </div>
              <button type="button" class="avatar-change-btn">
                <span class="material-symbols-outlined">photo_camera</span>
                Change Photo
              </button>
            </div>
            <div class="avatar-hint">
              <p>Upload a square image for best results.</p>
              <p>Max file size: 2MB. JPG, PNG supported.</p>
            </div>
          </div>

          <div class="form-divider"></div>

          <h3 class="form-section-title">Personal Information</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-name">Full Name</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">person</span>
                <input id="edit-name" type="text" [(ngModel)]="profile.name" name="name" placeholder="e.g. John Doe" />
              </div>
            </div>
            <div class="form-group">
              <label for="edit-role">Role</label>
              <div class="input-wrap">
                <span class="material-symbols-outlined input-icon">badge</span>
                <select id="edit-role" [(ngModel)]="profile.role" name="role">
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="edit-email">Email Address</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">mail</span>
              <input id="edit-email" type="email" [(ngModel)]="profile.email" name="email" placeholder="you@example.com" />
            </div>
          </div>

          <div class="form-group">
            <label for="edit-restaurant">Restaurant Name</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">restaurant</span>
              <input id="edit-restaurant" type="text" [(ngModel)]="profile.restaurant" name="restaurant" placeholder="e.g. Le Petit Bistro" />
            </div>
          </div>

          <div class="form-group">
            <label for="edit-phone">Phone Number</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">phone</span>
              <input id="edit-phone" type="tel" [(ngModel)]="profile.phone" name="phone" placeholder="+216 XX XXX XXX" />
            </div>
          </div>

          <div class="form-divider"></div>

          <h3 class="form-section-title">Security</h3>

          <div class="form-group">
            <label for="edit-password">New Password</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">lock</span>
              <input id="edit-password" [type]="showPassword ? 'text' : 'password'" [(ngModel)]="profile.newPassword" name="newPassword" placeholder="Leave blank to keep current" />
              <button type="button" class="toggle-pass-btn" (click)="showPassword = !showPassword">
                <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="edit-confirm">Confirm New Password</label>
            <div class="input-wrap">
              <span class="material-symbols-outlined input-icon">lock_reset</span>
              <input id="edit-confirm" [type]="showPassword ? 'text' : 'password'" [(ngModel)]="profile.confirmPassword" name="confirmPassword" placeholder="Repeat new password" />
            </div>
          </div>

          @if (successMessage) {
            <div class="success-banner">
              <span class="material-symbols-outlined">check_circle</span>
              {{ successMessage }}
            </div>
          }

          <div class="form-actions">
            <button type="button" class="cancel-btn" routerLink="/account">Cancel</button>
            <button type="submit" class="save-btn">
              <span class="material-symbols-outlined">save</span>
              Save Changes
            </button>
          </div>
        </form>

        <!-- Right: Preview Card -->
        <div class="preview-col">
          <div class="preview-card">
            <div class="preview-header">
              <span class="preview-label">LIVE PREVIEW</span>
            </div>
            <div class="preview-avatar">
              <span class="material-symbols-outlined">person</span>
            </div>
            <h3 class="preview-name">{{ profile.name || 'Full Name' }}</h3>
            <p class="preview-email">{{ profile.email || 'email@example.com' }}</p>
            <span class="preview-role-badge">{{ profile.role }}</span>
            <div class="preview-divider"></div>
            <div class="preview-info-row">
              <span class="material-symbols-outlined">restaurant</span>
              <span>{{ profile.restaurant || 'Restaurant Name' }}</span>
            </div>
            <div class="preview-info-row">
              <span class="material-symbols-outlined">phone</span>
              <span>{{ profile.phone || 'Phone Number' }}</span>
            </div>
          </div>

          <div class="tip-card">
            <span class="material-symbols-outlined tip-icon">info</span>
            <div>
              <p class="tip-title">Profile Tip</p>
              <p class="tip-desc">A complete profile helps your team identify account holders quickly and ensures accurate audit trails.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-container { padding: 32px 40px; max-width: 1200px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
    .section-label { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--primary); display: block; margin-bottom: 8px; }
    .section-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em; color: var(--on-background); }
    .back-btn { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; transition: all 0.2s; cursor: pointer; }
    .back-btn:hover { background: #f8fafc; color: var(--primary); }

    .edit-layout { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }

    .edit-form { background: white; border-radius: 24px; padding: 40px; box-shadow: var(--shadow-ambient); display: flex; flex-direction: column; gap: 24px; }

    /* Avatar Section */
    .avatar-section { display: flex; align-items: center; gap: 32px; }
    .avatar-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .avatar-display { width: 96px; height: 96px; border-radius: 50%; background: linear-gradient(135deg, rgba(155,35,48,0.1), rgba(155,35,48,0.2)); display: flex; align-items: center; justify-content: center; border: 3px solid rgba(155,35,48,0.15); }
    .avatar-display .material-symbols-outlined { font-size: 44px; color: var(--primary); }
    .avatar-change-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.8rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
    .avatar-change-btn:hover { border-color: var(--primary); color: var(--primary); }
    .avatar-change-btn .material-symbols-outlined { font-size: 16px; }
    .avatar-hint p { font-size: 0.75rem; color: #94a3b8; margin-bottom: 4px; }

    .form-divider { border: none; border-top: 1px solid #f1f5f9; margin: 0; }
    .form-section-title { font-size: 1rem; font-weight: 700; color: var(--on-background); margin-bottom: 0; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-group label { font-size: 0.875rem; font-weight: 700; color: #475569; }

    .input-wrap { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 16px; font-size: 20px; color: #94a3b8; pointer-events: none; }
    .input-wrap input, .input-wrap select { width: 100%; padding: 14px 16px 14px 48px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 0.9375rem; color: var(--on-surface); background: #f8fafc; transition: border-color 0.2s, background 0.2s; }
    .input-wrap input:focus, .input-wrap select:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(155,35,48,0.08); }

    .toggle-pass-btn { position: absolute; right: 14px; background: none; border: none; cursor: pointer; color: #94a3b8; display: flex; align-items: center; padding: 4px; }
    .toggle-pass-btn:hover { color: var(--primary); }

    .success-banner { display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; color: #065f46; font-weight: 600; font-size: 0.9rem; }
    .success-banner .material-symbols-outlined { color: #10b981; font-size: 20px; }

    .form-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 8px; }
    .cancel-btn { padding: 14px 24px; border-radius: 12px; font-weight: 700; color: #64748b; background: none; border: 1px solid #e2e8f0; cursor: pointer; transition: background 0.2s; }
    .cancel-btn:hover { background: #f1f5f9; }
    .save-btn { display: flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 12px; font-weight: 700; color: white; background: var(--primary); border: none; box-shadow: 0 8px 24px rgba(155,35,48,0.2); transition: transform 0.2s, filter 0.2s; cursor: pointer; }
    .save-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
    .save-btn .material-symbols-outlined { font-size: 18px; }

    /* Preview Card */
    .preview-col { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 24px; }
    .preview-card { background: white; border-radius: 24px; padding: 32px; box-shadow: var(--shadow-ambient); text-align: center; }
    .preview-header { margin-bottom: 24px; }
    .preview-label { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #94a3b8; }
    .preview-avatar { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, rgba(155,35,48,0.1), rgba(155,35,48,0.2)); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; border: 2px solid rgba(155,35,48,0.1); }
    .preview-avatar .material-symbols-outlined { font-size: 36px; color: var(--primary); }
    .preview-name { font-size: 1.25rem; font-weight: 800; color: var(--on-background); margin-bottom: 4px; word-break: break-word; }
    .preview-email { font-size: 0.8rem; color: #64748b; margin-bottom: 12px; word-break: break-all; }
    .preview-role-badge { display: inline-block; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; background: rgba(155,35,48,0.1); color: var(--primary); padding: 4px 12px; border-radius: 999px; }
    .preview-divider { border: none; border-top: 1px solid #f1f5f9; margin: 20px 0; }
    .preview-info-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 0.875rem; color: #475569; }
    .preview-info-row .material-symbols-outlined { font-size: 18px; color: #94a3b8; }

    .tip-card { background: rgba(155,35,48,0.04); border: 1px solid rgba(155,35,48,0.1); border-radius: 16px; padding: 20px; display: flex; gap: 12px; }
    .tip-icon { font-size: 22px; color: var(--primary); flex-shrink: 0; margin-top: 2px; }
    .tip-title { font-size: 0.875rem; font-weight: 700; color: var(--on-background); margin-bottom: 6px; }
    .tip-desc { font-size: 0.8rem; color: #64748b; line-height: 1.6; }

    @media (max-width: 900px) {
      .edit-layout { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class AccountEditComponent {
  profile = {
    name: 'Restaurant Manager',
    email: 'admin@qrdeer.com',
    role: 'Manager',
    restaurant: 'Le Petit Bistro',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  };

  showPassword = false;
  successMessage = '';

  constructor(private router: Router, private authService: AuthService) {
    const user = this.authService.getUser();
    if (user) {
      this.profile.email = user.email || this.profile.email;
      this.profile.restaurant = user.restaurant || this.profile.restaurant;
      this.profile.role = user.role || this.profile.role;
    }
  }

  saveProfile() {
    this.successMessage = 'Profile updated successfully!';
    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/account']);
    }, 1500);
  }
}
