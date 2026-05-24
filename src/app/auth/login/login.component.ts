import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Tabs
  activeTab: 'login' | 'register' = 'login';

  // Login Form
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  // Register Form
  registerRestaurantName = '';
  registerEmail = '';
  registerPassword = '';
  registerPhone = '';
  registerSuccessMessage = '';
  registerErrorMessage = '';
  isRegistering = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  switchTab(tab: 'login' | 'register'): void {
    this.activeTab = tab;
    this.errorMessage = '';
    this.registerErrorMessage = '';
    this.registerSuccessMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe(success => {
      this.isLoading = false;
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password. Try admin@qrdeer.com / password';
      }
    });
  }

  onRegisterSubmit(): void {
    this.registerErrorMessage = '';
    this.registerSuccessMessage = '';

    if (!this.registerRestaurantName || !this.registerEmail || !this.registerPassword) {
      this.registerErrorMessage = 'Please fill in all required fields.';
      return;
    }

    this.isRegistering = true;
    setTimeout(() => {
      this.isRegistering = false;
      this.registerSuccessMessage = 'Account created successfully! You can now log in.';
      // Reset register form fields
      this.registerRestaurantName = '';
      this.registerEmail = '';
      this.registerPassword = '';
      this.registerPhone = '';
      // Auto-switch to login tab after 2 seconds
      setTimeout(() => {
        this.switchTab('login');
      }, 2000);
    }, 1200);
  }
}
