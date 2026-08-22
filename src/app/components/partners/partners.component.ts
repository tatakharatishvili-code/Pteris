import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent {
  partners = [
    { name: 'Radisson Blu', type: 'სასტუმრო' },
    { name: 'TBC Bank', type: 'ფინანსები' },
    { name: 'Stamba Hotel', type: 'სასტუმრო' },
    { name: 'Rooms Hotel', type: 'სასტუმრო' },
    { name: 'BOG', type: 'ფინანსები' },
    { name: 'Tbilisi Mall', type: 'სავაჭრო' },
    { name: 'East Point', type: 'სავაჭრო' },
    { name: 'Wyndham Grand', type: 'სასტუმრო' },
    { name: 'Sheraton', type: 'სასტუმრო' },
    { name: 'Hilton Garden', type: 'სასტუმრო' },
    { name: 'Liberty Bank', type: 'ფინანსები' },
    { name: 'Galleria Tbilisi', type: 'სავაჭრო' },
  ];

}
