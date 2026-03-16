import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
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

  testimonials = [
    {
      text: 'Pteris-მა ჩვენი ოფისი სრულიად ტრანსფორმაცია და მწვანე ოაზისად აქცია. თანამშრომლების პროდუქტიულობა 20%-ით გაიზარდა.',
      author: 'ნინო კაპანაძე',
      position: 'HR დირექტორი, TBC Bank',
    },
    {
      text: 'პროფესიონალიზმის უმაღლესი დონე. ყოველთვიური მოვლის სერვისი ზუსტი, პუნქტუალური და ხარისხიანია.',
      author: 'გიორგი მელაძე',
      position: 'გენერალური მენეჯერი, Stamba Hotel',
    },
    {
      text: 'ქორწილის ფლორისტიკა ჩვენს ოცნებაზე ბევრად მეტი აღმოჩნდა. ყოველი დეტალი სრულყოფილი იყო.',
      author: 'მარიამ ჯავახიშვილი',
      position: 'კერძო კლიენტი',
    },
  ];

  currentTestimonial = 0;

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial = this.currentTestimonial === 0
      ? this.testimonials.length - 1
      : this.currentTestimonial - 1;
  }
}
