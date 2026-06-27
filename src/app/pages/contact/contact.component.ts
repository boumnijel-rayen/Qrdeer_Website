import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  email: string;
  subject: string;
  body: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  form: ContactForm = {
    email: '',
    subject: '',
    body: ''
  };

  isSending = false;
  isSuccess = false;
  errorMessage = '';
  charCount = 0;
  maxChars = 2000;
  ticketRef = '';



  subjectOptions = [
    'Technical Issue',
    'Billing & Payment',
    'Feature Request',
    'Account Management',
    'Integration Help',
    'Performance Problem',
    'General Inquiry',
    'Other',
  ];


  onBodyInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.charCount = value.length;
  }



  isFormValid(): boolean {
    return (
      this.form.email.trim().length > 0 &&
      this.isValidEmail(this.form.email) &&
      this.form.subject.trim().length > 0 &&
      this.form.body.trim().length >= 10
    );
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  sendMessage(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.errorMessage = '';
    this.isSending = true;

    // Simulate API call
    setTimeout(() => {
      this.isSending = false;
      this.ticketRef = 'TKT-' + Math.floor(10000 + Math.random() * 90000);
      this.isSuccess = true;
      this.cdr.detectChanges();
    }, 1800);
  }

  resetForm(): void {
    this.form = { email: '', subject: '', body: '' };
    this.charCount = 0;
    this.isSuccess = false;
    this.errorMessage = '';
  }
}
