import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

export interface PublicServiceItem {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon?: string;
  features: string[];
}

export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

// Legacy dataset is kept for /services/:slug detail pages.
export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'landscape-design',
    icon: 'design',
    title: 'ლანდშაფტის დიზაინი',
    description:
      'პროფესიონალური ლანდშაფტის დაგეგმარება და დიზაინი, რომელიც თქვენს სივრცეს უნიკალურ სახეს მისცემს.',
    features: ['3D ვიზუალიზაცია', 'ინდივიდუალური პროექტი', 'ეკო მასალები'],
  },
  {
    slug: 'plant-selection',
    icon: 'plant',
    title: 'მცენარეთა შერჩევა',
    description:
      'ექსპერტთა კონსულტაცია თქვენი სივრცისთვის იდეალური მცენარეების შესარჩევად — კლიმატისა და განათების გათვალისწინებით.',
    features: ['კლიმატის ანალიზი', 'ალერგენების შემოწმება', 'სეზონური გეგმა'],
  },
  {
    slug: 'regular-care',
    icon: 'care',
    title: 'რეგულარული მოვლა',
    description:
      'სრული მოვლის სერვისი — მორწყვა, გასხვლა, განოყიერება და დაავადებების პრევენცია პროფესიონალთა გუნდისგან.',
    features: ['ყოველკვირეული ვიზიტი', 'ჯანმრთელობის მონიტორინგი', 'გარანტია'],
  },
  {
    slug: 'office-greenery',
    icon: 'office',
    title: 'ოფისის გამწვანება',
    description:
      'კორპორატიული სივრცეების გამწვანება, რომელიც ზრდის პროდუქტიულობას და ქმნის სასიამოვნო სამუშაო გარემოს.',
    features: ['აუდიტი და გეგმა', 'ინსტალაცია', 'მუდმივი მოვლა'],
  },
  {
    slug: 'event-decor',
    icon: 'event',
    title: 'ღონისძიებების დეკორი',
    description:
      'ქორწილები, კორპორატიული ივენთები და სპეციალური ღონისძიებებისთვის მცენარეებით დეკორაცია.',
    features: ['კონცეფციის შექმნა', 'ინსტალაცია/დემონტაჟი', 'სეზონური ყვავილები'],
  },
  {
    slug: 'botanical-consultation',
    icon: 'consult',
    title: 'ბოტანიკური კონსულტაცია',
    description:
      'ონლაინ და ადგილზე კონსულტაციები მცენარეთა მოვლის, დაავადებების დიაგნოსტიკისა და ოპტიმალური პირობების შესახებ.',
    features: ['ვიდეო კონსულტაცია', 'ადგილზე ვიზიტი', 'მოვლის გეგმა'],
  },
];

const STATIC_PUBLIC_SERVICES: PublicServiceItem[] = SERVICES_DATA.map((service) => ({
  _id: service.slug,
  name: service.title,
  shortDescription: service.description,
  longDescription: service.description,
  features: service.features,
}));

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, PageHeroComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
})
export class ServicesPageComponent {
  readonly services = signal<PublicServiceItem[]>(STATIC_PUBLIC_SERVICES);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  trackById(_: number, service: PublicServiceItem): string {
    return service._id;
  }
}
