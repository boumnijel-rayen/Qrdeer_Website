import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="staff-page">
      <div class="staff-header">
        <div>
          <h2 class="staff-title">
            Staff Management
          </h2>
          <p class="staff-subtitle">Manage your team members and their roles.</p>
        </div>
        <button class="add-staff-btn" routerLink="/staff/add">
          <span class="material-symbols-outlined">person_add</span>
          Add Staff Member
        </button>
      </div>

      <div class="filters-row">
        <div class="tabs">
          @for (role of roles; track role) {
            <button 
              class="tab" 
              [class.active]="activeRole === role"
              (click)="setRole(role)"
            >
              {{ role }}
            </button>
          }
        </div>
        <div class="search-box">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search staff..." [(ngModel)]="searchQuery">
        </div>
      </div>

      <div class="staff-grid">
        @for (staff of filteredStaffList; track staff.id) {
          <div class="staff-card" [class.inactive]="staff.status === 'inactive'">
            <div class="card-header">
              <div class="avatar-container">
                <img *ngIf="staff.avatar" [src]="staff.avatar" [alt]="staff.name">
                <span *ngIf="!staff.avatar" class="initial">{{ staff.name.charAt(0) }}</span>
                <div class="status-indicator" [class.online]="staff.status === 'active'"></div>
              </div>
              <div class="menu-container">
                <button class="more-btn" (click)="toggleMenu(staff.id, $event)">
                  <span class="material-symbols-outlined">more_vert</span>
                </button>
                <div class="dropdown-menu" *ngIf="openMenuId === staff.id">
                  <a class="dropdown-item" [routerLink]="['/staff', staff.id, 'edit']">
                    <span class="material-symbols-outlined">edit</span>
                    Edit Profile
                  </a>
                  <button class="dropdown-item" (click)="toggleStatus(staff)">
                    <span class="material-symbols-outlined">
                      {{ staff.status === 'active' ? 'block' : 'check_circle' }}
                    </span>
                    {{ staff.status === 'active' ? 'Disable Access' : 'Enable Access' }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="staff-info">
              <h3 class="staff-name">{{ staff.name }}</h3>
              <p class="staff-email">{{ staff.email }}</p>
              
              <div class="role-badge" [ngClass]="staff.role.toLowerCase()">
                {{ staff.role }}
              </div>
            </div>
            
            <div class="card-footer">
              <span class="last-login">Last active: {{ staff.lastLogin }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .staff-page { padding: 40px; }
    
    .staff-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .staff-title { font-size: 1.875rem; font-weight: 900; letter-spacing: -0.02em; color: var(--on-background); display: flex; align-items: center; gap: 12px; margin: 0; }
    .active-badge { font-size: 0.75rem; background: rgba(155,35,48,0.1); color: var(--primary); padding: 4px 12px; border-radius: 999px; font-weight: 700; text-transform: uppercase; }
    .staff-subtitle { color: #94a3b8; font-size: 0.875rem; font-weight: 500; margin-top: 4px; margin-bottom: 0; }
    
    .add-staff-btn { display: flex; align-items: center; gap: 8px; padding: 14px 24px; background: var(--primary); color: white; border-radius: 12px; font-weight: 700; box-shadow: 0 8px 24px rgba(155, 35, 48, 0.2); transition: all 0.2s; }
    .add-staff-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
    
    .filters-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; gap: 24px; flex-wrap: wrap; }
    .tabs { display: flex; background: white; padding: 4px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .tab { padding: 10px 24px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; color: #64748b; transition: all 0.2s; }
    .tab:hover { background: #f8fafc; color: var(--primary); }
    .tab.active { background: #fdf2f2; color: var(--primary); font-weight: 700; }
    
    .search-box { display: flex; align-items: center; gap: 8px; background: white; padding: 0 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); flex: 1; max-width: 300px; }
    .search-box .material-symbols-outlined { color: #94a3b8; font-size: 20px; }
    .search-box input { border: none; padding: 12px 0; outline: none; font-size: 0.875rem; color: var(--on-surface); width: 100%; background: transparent; }
    
    .staff-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
    
    .staff-card { background: white; border-radius: 24px; padding: 24px; box-shadow: var(--shadow-ambient); transition: transform 0.2s; display: flex; flex-direction: column; }
    .staff-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
    .staff-card.inactive { opacity: 0.7; filter: grayscale(1); }
    
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .avatar-container { position: relative; width: 64px; height: 64px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
    .avatar-container img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
    .initial { font-size: 1.5rem; font-weight: 800; color: #94a3b8; }
    .status-indicator { position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; border-radius: 50%; background: #cbd5e1; border: 2px solid white; }
    .status-indicator.online { background: #22c55e; }
    
    .more-btn { color: #94a3b8; padding: 4px; border-radius: 50%; transition: background 0.2s; margin: -8px; border: none; background: transparent; cursor: pointer; }
    .more-btn:hover { background: #f1f5f9; color: var(--on-surface); }
    
    .menu-container { position: relative; }
    .dropdown-menu { position: absolute; top: 100%; right: 0; background: white; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); padding: 8px; z-index: 10; min-width: 160px; border: 1px solid #f1f5f9; }
    .dropdown-item { display: flex; align-items: center; gap: 8px; width: 100%; padding: 10px 12px; border: none; background: transparent; text-align: left; font-size: 0.875rem; font-weight: 600; color: var(--on-surface); border-radius: 8px; cursor: pointer; transition: background 0.2s; text-decoration: none; }
    .dropdown-item:hover { background: #f8fafc; color: var(--primary); }
    .dropdown-item .material-symbols-outlined { font-size: 18px; }
    
    .staff-info { text-align: center; margin-bottom: 24px; flex: 1; }
    .staff-name { font-size: 1.25rem; font-weight: 800; color: var(--on-background); margin-bottom: 4px; }
    .staff-email { font-size: 0.875rem; color: #64748b; margin-bottom: 16px; }
    
    .role-badge { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .role-badge.admin { background: rgba(155, 35, 48, 0.1); color: var(--primary); }
    .role-badge.manager { background: rgba(0, 67, 63, 0.1); color: var(--tertiary); }
    .role-badge.server { background: #f1f5f9; color: #475569; }
    
    .card-footer { border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; }
    .last-login { font-size: 0.75rem; color: #94a3b8; }
  `]
})
export class StaffComponent {
  searchQuery = '';
  openMenuId: number | null = null;
  activeRole: string = 'All Members';
  roles: string[] = ['All Members', 'Admins', 'Managers', 'Servers'];

  staffList: StaffMember[] = [
    { id: 1, name: 'Emma Wilson', email: 'emma@qrdeer.com', role: 'Admin', status: 'active', lastLogin: 'Just now', avatar: '' },
    { id: 2, name: 'James Rodriguez', email: 'james.r@qrdeer.com', role: 'Manager', status: 'active', lastLogin: '2 hours ago', avatar: '' },
    { id: 3, name: 'Sarah Chen', email: 'sarah.c@qrdeer.com', role: 'Server', status: 'active', lastLogin: '5 mins ago', avatar: '' },
    { id: 4, name: 'Michael Chang', email: 'michael@qrdeer.com', role: 'Server', status: 'inactive', lastLogin: '2 days ago', avatar: '' },
    { id: 5, name: 'Jessica Taylor', email: 'jessica@qrdeer.com', role: 'Manager', status: 'active', lastLogin: '1 hour ago', avatar: '' },
  ];

  setRole(role: string) {
    this.activeRole = role;
  }

  get filteredStaffList() {
    let filtered = this.staffList;

    if (this.activeRole !== 'All Members') {
      const roleMatch = this.activeRole === 'Admins' ? 'Admin' : 
                        this.activeRole === 'Managers' ? 'Manager' : 
                        this.activeRole === 'Servers' ? 'Server' : '';
      filtered = filtered.filter(s => s.role === roleMatch);
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.email.toLowerCase().includes(q) || 
        s.role.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuId = null;
  }

  toggleStatus(staff: StaffMember) {
    staff.status = staff.status === 'active' ? 'inactive' : 'active';
    this.openMenuId = null;
  }
}
