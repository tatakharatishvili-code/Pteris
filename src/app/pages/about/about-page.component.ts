import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { PublicContentService, PublicCoworker } from '../../services/public-content.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, PageHeroComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
  private readonly contentApi = inject(PublicContentService);
  readonly coworkers = signal<PublicCoworker[]>([]);

  ngOnInit(): void {
    this.contentApi.getCoworkers().subscribe({
      next: (coworkers) => this.coworkers.set(coworkers),
    });
  }
  features = [
    {
      icon: 'leaf',
      title: 'ბოტანიკური ექსპერტიზა',
      description:
        'ჩვენი გუნდი შედგება გამოცდილი ბოტანიკოსებისა და ლანდშაფტის დიზაინერებისგან, რომლებიც 15 წელზე მეტია მუშაობენ მცენარეთა სამყაროში.',
    },
    {
      icon: 'shield',
      title: 'ხარისხის გარანტია',
      description:
        'ყველა მცენარე გადის მრავალსაფეხურიან შემოწმებას. გთავაზობთ ჯანმრთელ, ძლიერ მცენარეებს სრული მოვლის ინსტრუქციებით.',
    },
    {
      icon: 'globe',
      title: 'გლობალური მომწოდებლები',
      description:
        'თანამშრომლობთ მსოფლიოს წამყვან სანერგეებთან — ჰოლანდიიდან იაპონიამდე, ეკვადორიდან ტაილანდამდე.',
    },
    {
      icon: 'heart',
      title: 'ინდივიდუალური მიდგომა',
      description:
        'ყოველი კლიენტი უნიკალურია. ვქმნით პერსონალიზებულ გადაწყვეტილებებს თქვენი სივრცისა და ცხოვრების წესის გათვალისწინებით.',
    },
  ];

  stats = [
    { value: '15+', label: 'წელი გამოცდილება' },
    { value: '500+', label: 'დასრულებული პროექტი' },
    { value: '200+', label: 'კმაყოფილი კლიენტი' },
    { value: '50+', label: 'მცენარის სახეობა' },
  ];

  timeline = [
    {
      year: '2010',
      title: 'დაარსება',
      description:
        'Pteris დაარსდა ორი ბოტანიკოსის — ნიკა ჩხეიძისა და ანა ხარატიშვილის ინიციატივით, რომელთაც სურდათ საქართველოში თანამედროვე გამწვანების კულტურის დანერგვა.',
    },
    {
      year: '2014',
      title: 'პირველი მსხვილი პროექტი',
      description:
        'მოვიპოვეთ პირველი კორპორატიული კონტრაქტი — TBC ბანკის ცენტრალური ოფისის სრული გამწვანება, რამაც ბაზარზე ჩვენი პოზიცია განამტკიცა.',
    },
    {
      year: '2018',
      title: 'საერთაშორისო პარტნიორობა',
      description:
        'დავიწყეთ თანამშრომლობა ჰოლანდიურ და იტალიურ სანერგეებთან, რამაც შესაძლებელი გახადა იშვიათი და ეგზოტიკური მცენარეების იმპორტი.',
    },
    {
      year: '2021',
      title: 'სასტუმრო ინდუსტრია',
      description:
        'შევედით სასტუმრო სეგმენტში — Radisson Blu Iveria და Stamba Hotel-ის პროექტებმა Pteris-ს ახალი მასშტაბი შესძინა.',
    },
    {
      year: '2024',
      title: 'ციფრული ტრანსფორმაცია',
      description:
        'გავუშვით ონლაინ კონსულტაციების პლატფორმა და მცენარეთა მოვლის ინტელექტუალური სისტემა, რომელიც კლიენტებს პერსონალიზებულ რჩევებს სთავაზობს.',
    },
  ];

  values = [
    {
      icon: 'sustainability',
      title: 'მდგრადობა',
      description:
        'ვმუშაობთ ეკოლოგიურად სუფთა მასალებით და ვუწყობთ ხელს ბიომრავალფეროვნების შენარჩუნებას.',
    },
    {
      icon: 'innovation',
      title: 'ინოვაცია',
      description:
        'ვიყენებთ თანამედროვე ტექნოლოგიებს მცენარეთა მოვლისა და მონიტორინგისთვის.',
    },
    {
      icon: 'quality',
      title: 'ხარისხი',
      description:
        'არ ვაკეთებთ კომპრომისს ხარისხზე — ყოველი დეტალი გააზრებულია და ყურადღებით შესრულებული.',
    },
  ];
}
