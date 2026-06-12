import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as L from 'leaflet';

interface SizePrice {
  size: string;
  price: number | null;
}

interface MenuItem {
  name: string;
  price: number | null;
  isMultiPrice: boolean;
  sizePrices: SizePrice[];
  photo?: string | null;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
  isEditing: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  basePrice: number;
  maxTables: number | string;
  maxStaff: number | string;
  features: string[];
  isFeatured: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  currentStep = 1;
  totalSteps = 4;
  stepDirection: 'next' | 'prev' = 'next';
  animating = false;
  
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  // Step 1: General Information
  restaurantName = '';
  email = '';
  phone = '';
  city = '';
  password = '';
  confirmPassword = '';
  mapLat = 36.8065;
  mapLng = 10.1815;

  // Step 2: Menu Setup
  categories: MenuCategory[] = [];
  newCategoryName = '';

  // Step 3: Subscription Plans
  // Step 3: Subscription Plans
  selectedPlanId = '';
  isAnnual = false;
  plans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      basePrice: 0,
      maxTables: 5,
      maxStaff: 1,
      features: [
        '1 QR Digital Menu',
        'Up to 5 tables',
        'Basic menu editor',
        'QR code generator'
      ],
      isFeatured: false
    },
    {
      id: 'pro',
      name: 'Professional',
      basePrice: 79,
      maxTables: 50,
      maxStaff: 3,
      features: [
        'Unlimited QR Menus',
        'Up to 50 tables',
        '3 staff accounts',
        'Advanced menu editor',
        'Live order management',
        'Sales analytics dashboard',
        'Table management'
      ],
      isFeatured: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      basePrice: 149,
      maxTables: 'Unlimited',
      maxStaff: 'Unlimited',
      features: [
        'Unlimited QR Menus',
        'Unlimited tables',
        'Unlimited staff accounts',
        'Full menu suite + API',
        'Live order management',
        'Advanced analytics + export',
        'Custom branding',
        'Dedicated priority support'
      ],
      isFeatured: false
    }
  ];

  toggleBilling(): void {
    this.isAnnual = !this.isAnnual;
  }

  getPlanPrice(basePrice: number): number | string {
    if (basePrice === 0) return '0';
    const mult = this.isAnnual ? 0.8 : 1;
    return Math.round(basePrice * mult);
  }

  // Step 4: Confirmation
  isSubmitting = false;
  submitSuccess = false;

  // Error handling
  stepErrors: { [key: number]: string } = {};

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Initialize map on first load
    setTimeout(() => this.initMap(), 100);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  initMap() {
    if (this.currentStep !== 1) return;
    const mapContainer = document.getElementById('map-picker');
    if (!mapContainer) return;

    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }

    mapContainer.innerHTML = '';
    
    this.map = L.map(mapContainer).setView([this.mapLat, this.mapLng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    this.marker = L.marker([this.mapLat, this.mapLng], { icon: iconDefault, draggable: true }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.mapLat = e.latlng.lat;
      this.mapLng = e.latlng.lng;
      this.marker?.setLatLng(e.latlng);
    });

    this.marker.on('dragend', () => {
      const pos = this.marker?.getLatLng();
      if (pos) {
        this.mapLat = pos.lat;
        this.mapLng = pos.lng;
      }
    });

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  // ─── Navigation ─────────────────────────────────────────

  goToStep(step: number): void {
    if (step < 1 || step > this.totalSteps || this.animating) return;
    if (step > this.currentStep && !this.validateStep(this.currentStep)) return;
    // Only allow going to steps that have been reached
    if (step > this.currentStep + 1) return;

    this.stepDirection = step > this.currentStep ? 'next' : 'prev';
    this.animating = true;
    this.currentStep = step;
    setTimeout(() => {
      this.animating = false;
      if (step === 1) {
        this.initMap();
      }
    }, 400);
  }

  nextStep(): void {
    if (!this.validateStep(this.currentStep)) return;
    this.goToStep(this.currentStep + 1);
  }

  prevStep(): void {
    this.goToStep(this.currentStep - 1);
  }

  isStepCompleted(step: number): boolean {
    if (step >= this.currentStep) return false;
    return true;
  }

  isStepAccessible(step: number): boolean {
    return step <= this.currentStep;
  }

  // ─── Validation ─────────────────────────────────────────

  validateStep(step: number): boolean {
    this.stepErrors[step] = '';

    switch (step) {
      case 1:
        if (!this.restaurantName.trim()) {
          this.stepErrors[1] = 'Please enter your restaurant or coffee shop name.';
          return false;
        }
        if (!this.email.trim() || !this.isValidEmail(this.email)) {
          this.stepErrors[1] = 'Please enter a valid email address.';
          return false;
        }
        if (!this.phone.trim()) {
          this.stepErrors[1] = 'Please enter your phone number.';
          return false;
        }
        if (!this.city.trim()) {
          this.stepErrors[1] = 'Please enter your city.';
          return false;
        }
        if (!this.password || this.password.length < 6) {
          this.stepErrors[1] = 'Password must be at least 6 characters.';
          return false;
        }
        if (this.password !== this.confirmPassword) {
          this.stepErrors[1] = 'Passwords do not match.';
          return false;
        }
        return true;

      case 2:
        if (this.categories.length === 0) {
          this.stepErrors[2] = 'Please add at least one menu category.';
          return false;
        }
        for (const cat of this.categories) {
          if (cat.items.length === 0) {
            this.stepErrors[2] = `Category "${cat.name}" must have at least one item.`;
            return false;
          }
          for (const item of cat.items) {
            if (!item.name.trim()) {
              this.stepErrors[2] = 'All menu items must have a name.';
              return false;
            }
            if (item.isMultiPrice) {
              if (item.sizePrices.length === 0) {
                this.stepErrors[2] = `Item "${item.name}" needs at least one size/price.`;
                return false;
              }
            } else {
              if (item.price === null || item.price < 0) {
                this.stepErrors[2] = `Item "${item.name}" needs a valid price.`;
                return false;
              }
            }
          }
        }
        return true;

      case 3:
        if (!this.selectedPlanId) {
          this.stepErrors[3] = 'Please select a subscription plan.';
          return false;
        }
        return true;

      default:
        return true;
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ─── Step 2: Menu Management ────────────────────────────

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.categories.push({
      name: this.newCategoryName.trim(),
      items: [],
      isEditing: false
    });
    this.newCategoryName = '';
  }

  removeCategory(index: number): void {
    this.categories.splice(index, 1);
  }

  addItem(categoryIndex: number): void {
    this.categories[categoryIndex].items.push({
      name: '',
      price: null,
      isMultiPrice: false,
      sizePrices: [
        { size: 'Small', price: null },
        { size: 'Medium', price: null },
        { size: 'Large', price: null }
      ],
      photo: null
    });
  }

  removeItem(categoryIndex: number, itemIndex: number): void {
    this.categories[categoryIndex].items.splice(itemIndex, 1);
  }

  toggleMultiPrice(categoryIndex: number, itemIndex: number): void {
    const item = this.categories[categoryIndex].items[itemIndex];
    item.isMultiPrice = !item.isMultiPrice;
    if (item.isMultiPrice && item.sizePrices.length === 0) {
      item.sizePrices = [
        { size: 'Small', price: null },
        { size: 'Medium', price: null },
        { size: 'Large', price: null }
      ];
    }
  }

  addSizePrice(categoryIndex: number, itemIndex: number): void {
    this.categories[categoryIndex].items[itemIndex].sizePrices.push({
      size: '',
      price: null
    });
  }

  removeSizePrice(categoryIndex: number, itemIndex: number, sizeIndex: number): void {
    this.categories[categoryIndex].items[itemIndex].sizePrices.splice(sizeIndex, 1);
  }

  onPhotoSelected(event: any, categoryIndex: number, itemIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.categories[categoryIndex].items[itemIndex].photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(categoryIndex: number, itemIndex: number): void {
    this.categories[categoryIndex].items[itemIndex].photo = null;
  }

  // ─── Step 3: Plan Selection ─────────────────────────────

  selectPlan(planId: string): void {
    this.selectedPlanId = planId;
  }

  getSelectedPlan(): SubscriptionPlan | undefined {
    return this.plans.find(p => p.id === this.selectedPlanId);
  }

  // ─── Step 4: Submit ─────────────────────────────────────

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      // Redirect to login after 2.5 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500);
    }, 2000);
  }

  // ─── Helpers ────────────────────────────────────────────

  getTotalMenuItems(): number {
    return this.categories.reduce((total, cat) => total + cat.items.length, 0);
  }

  getMenuStatus(): { label: string; isReady: boolean } {
    if (this.categories.length === 0) return { label: 'Empty', isReady: false };
    
    // Use the same logic as validateStep(2) but without setting errors
    for (const cat of this.categories) {
      if (cat.items.length === 0) {
        return { label: 'Incomplete', isReady: false };
      }
      for (const item of cat.items) {
        if (!item.name.trim()) {
          return { label: 'Incomplete', isReady: false };
        }
        if (item.isMultiPrice) {
          if (item.sizePrices.length === 0 || item.sizePrices.some(sp => sp.price === null || sp.price < 0)) {
            return { label: 'Incomplete', isReady: false };
          }
        } else {
          if (item.price === null || item.price < 0) {
            return { label: 'Incomplete', isReady: false };
          }
        }
      }
    }
    return { label: 'Ready', isReady: true };
  }

  getItemPriceDisplay(item: MenuItem): string {
    if (item.isMultiPrice) {
      const prices = item.sizePrices
        .filter(sp => sp.price !== null)
        .map(sp => `${sp.size}: ${sp.price} DT`);
      return prices.join(' · ') || 'No prices set';
    }
    return item.price !== null ? `${item.price} DT` : 'No price set';
  }
}
