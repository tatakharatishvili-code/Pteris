import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeroComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  readonly emailClientOpened = signal(false);

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
    this.emailClientOpened.set(false);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.getRawValue();
    const subject = encodeURIComponent(`Pteris — ${value.service}`);
    const body = encodeURIComponent(
      [
        `სახელი: ${value.name}`,
        `ელ-ფოსტა: ${value.email}`,
        `ტელეფონი: ${value.phone || 'არ არის მითითებული'}`,
        `სერვისი: ${value.service}`,
        '',
        value.message,
      ].join('\n')
    );

    this.emailClientOpened.set(true);
    window.location.href = `mailto:info@pteris.ge?subject=${subject}&body=${body}`;
  }

  isInvalid(controlName: keyof ContactPageComponent['contactForm']['controls']): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}