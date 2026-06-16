import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMsg = 'Please fill out all fields.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMsg = 'New passwords do not match.';
      return;
    }
    
    // Proceed to OTP page
    this.router.navigate(['/account/password/verify']);
  }
}
