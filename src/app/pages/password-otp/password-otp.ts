import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-otp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './password-otp.html',
  styleUrl: './password-otp.css',
})
export class PasswordOtp implements AfterViewInit {
  otp: string[] = ['', '', '', '', '', ''];
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  errorMsg = '';
  successMsg = '';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Focus first input on load
    setTimeout(() => {
      if (this.otpInputs && this.otpInputs.first) {
        this.otpInputs.first.nativeElement.focus();
      }
    }, 100);
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData) {
      const numbers = pastedData.replace(/\D/g, '').split('');
      for (let i = 0; i < 6; i++) {
        if (numbers[i]) {
          this.otp[i] = numbers[i];
        }
      }
      // Focus last filled input or the last input
      const focusIndex = Math.min(numbers.length, 5);
      this.otpInputs.toArray()[focusIndex].nativeElement.focus();
    }
  }

  verify() {
    const fullOtp = this.otp.join('');
    if (fullOtp.length < 6) {
      this.errorMsg = 'Please enter all 6 digits.';
      return;
    }
    
    this.errorMsg = '';
    this.successMsg = 'Password successfully changed! Redirecting...';
    
    setTimeout(() => {
      this.router.navigate(['/account']);
    }, 2000);
  }
}
