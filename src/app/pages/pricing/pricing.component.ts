import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  authService = inject(AuthService);

  isAnnual = false;
  prices = { starter: 0, pro: 79, enterprise: 149 };
  faqOpen: { [key: number]: boolean } = {};

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleBilling(): void {
    this.isAnnual = !this.isAnnual;
  }

  getStarterPrice(): string | number {
    const mult = this.isAnnual ? 0.8 : 1;
    const price = Math.round(this.prices.starter * mult);
    return price === 0 ? '0' : price;
  }

  getProPrice(): number {
    const mult = this.isAnnual ? 0.8 : 1;
    return Math.round(this.prices.pro * mult);
  }

  getEnterprisePrice(): number {
    const mult = this.isAnnual ? 0.8 : 1;
    return Math.round(this.prices.enterprise * mult);
  }

  toggleFaq(index: number): void {
    this.faqOpen[index] = !this.faqOpen[index];
  }

  isFaqOpen(index: number): boolean {
    return !!this.faqOpen[index];
  }
}
