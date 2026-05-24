import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  email: string;
  name: string;
  role: string;
  restaurant: string;
  plan: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'qrdeer_auth';
  private authenticatedSubject = new BehaviorSubject<boolean>(this.hasStoredAuth());
  isAuthenticated$ = this.authenticatedSubject.asObservable();

  private currentUser: User | null = null;

  constructor(private router: Router) {
    if (this.hasStoredAuth()) {
      this.currentUser = {
        email: 'admin@qrdeer.com',
        name: 'Le Petit Bistro',
        role: 'Manager',
        restaurant: 'Le Petit Bistro',
        plan: 'Premium Plan',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw2265TgWm90sb98xnrqRq4EaW61IjxJpsa9OK1Hj0HYBsCxUtc9fKltLXw6FB2_QMfQUbRmdnBOglcX0zSjGdYZeLmtXGBmMw3M3uIx_s7sGqSx9GHOAuyWAA405N0kvxVEjnOIz4x8f_ln2EnuCylOeAFy4PRU62XdzpdRFPQao2vjN0odeQqfkDvNoFlB_O7eYPuV6_wvmLk8z6Xg4DfGfZZHdbLT2G1vJ12FTAU24W703dpkDPuddi_FfwugKxTlfmWgtHCck'
      };
    }
  }

  private hasStoredAuth(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  login(email: string, password: string): Observable<boolean> {
    const success = email === 'admin@qrdeer.com' && password === 'password';

    if (success) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      this.currentUser = {
        email,
        name: 'Le Petit Bistro',
        role: 'Manager',
        restaurant: 'Le Petit Bistro',
        plan: 'Premium Plan',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw2265TgWm90sb98xnrqRq4EaW61IjxJpsa9OK1Hj0HYBsCxUtc9fKltLXw6FB2_QMfQUbRmdnBOglcX0zSjGdYZeLmtXGBmMw3M3uIx_s7sGqSx9GHOAuyWAA405N0kvxVEjnOIz4x8f_ln2EnuCylOeAFy4PRU62XdzpdRFPQao2vjN0odeQqfkDvNoFlB_O7eYPuV6_wvmLk8z6Xg4DfGfZZHdbLT2G1vJ12FTAU24W703dpkDPuddi_FfwugKxTlfmWgtHCck'
      };
      this.authenticatedSubject.next(true);
    }

    return of(success).pipe(delay(600));
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser = null;
    this.authenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }

  getUser(): User | null {
    return this.currentUser;
  }
}
