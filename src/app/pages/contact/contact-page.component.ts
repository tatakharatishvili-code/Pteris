import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { PublicContentService } from '../../services/public-content.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeroComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  private readonly contentApi = inject(PublicContentService);
  readonly submitting = signal(false);
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { nonNullable: true }),
    service: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  readonly services = [
    'ლანდშაფტის დიზაინი',
    'მცენარეთა შერჩევა',
    'რეგულარული მოვლა',
    'ოფისის გამწვანება',
    'ღონისძიებების დეკორი',
    'ბოტანიკური კონსულტაცია',
    'სხვა',
  ];

  onSubmit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.getRawValue();
    this.submitting.set(true);
    this.contentApi.submitMessage({
      name: value.name.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
      message: `სერვისი: ${value.service}\n\n${value.message.trim()}`,
    }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.successMessage.set('შეტყობინება წარმატებით გაიგზავნა. მალე დაგიკავშირდებით.');
        this.contactForm.reset();
      },
      error: (error) => {
        this.submitting.set(false);
        this.errorMessage.set(error?.error?.message ?? 'შეტყობინება ვერ გაიგზავნა. სცადეთ ხელახლა.');
      },
    });
  }

  isInvalid(controlName: keyof ContactPageComponent['contactForm']['controls']): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}