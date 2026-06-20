import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-choose-plan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './choose-plan.html',
  styleUrl: './choose-plan.css'
})
export class ChoosePlan {
  authService = inject(AuthService);

  isAnnual = false;
  prices = { starter: 0, pro: 79, enterprise: 149 };

  subscription = {
    plan: 'Premium',
    status: 'Active'
  };


  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  selectedPlan: string = '';

  selectPlan(planName: string) {
    this.selectedPlan = planName;
  }

  showWarningModal = false;

  goToNext() {
    if (this.selectedPlan) {
      if (this.subscription.status === 'Active') {
        this.showWarningModal = true;
      } else {
        this.proceedToNext();
      }
    }
  }

  proceedToNext() {
    window.location.href = '/billing';
  }

  closeWarningModal() {
    this.showWarningModal = false;
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


}
