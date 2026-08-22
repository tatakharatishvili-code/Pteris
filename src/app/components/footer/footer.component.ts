import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'ჩვენს შესახებ', anchor: '#about' },
    { label: 'სერვისები', anchor: '#services' },
    { label: 'შედეგები', anchor: '#results' },
    { label: 'პროდუქტები', anchor: '#products' },
  ];

  serviceLinks = [
    { label: 'ლანდშაფტის დიზაინი', anchor: '#services' },
    { label: 'ინტერიერის გამწვანება', anchor: '#services' },
    { label: 'მცენარეთა მოვლა', anchor: '#care' },
    { label: 'კონსულტაცია', anchor: '/contact' },
  ];

  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  ];
}
