import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('bgVideo') bgVideo?: ElementRef<HTMLVideoElement>;

  currentSlide = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  slides = [
    {
      title: 'ბუნების ჰარმონია',
      subtitle: 'თქვენს სივრცეში',
      description:
        'ვქმნით უნიკალურ მწვანე გარემოს, რომელიც სიცოცხლეს შთაბერავს თქვენს სახლსა და ოფისს. Pteris — სადაც ბუნება ხელოვნებას ხვდება.',
      badge: '15+ წლიანი გამოცდილება',
    },
    {
      title: 'პროფესიონალური',
      subtitle: 'მცენარეთა მოვლა',
      description:
        'სრული სერვისი — შერჩევიდან მოვლამდე. ჩვენი ექსპერტთა გუნდი უზრუნველყოფს თქვენი მცენარეების ჯანმრთელობასა და სილამაზეს.',
      badge: '500+ კმაყოფილი კლიენტი',
    },
    {
      title: 'ექსკლუზიური',
      subtitle: 'კოლექციები',
      description:
        'იშვიათი და ეგზოტიკური მცენარეები მსოფლიოს ყველა კუთხიდან. აღმოაჩინეთ ბოტანიკური სამყაროს საუკეთესო ნიმუშები.',
      badge: '200+ სახეობა',
    },
  ];

  stats = [
    { value: '15+', label: 'წლიანი გამოცდილება' },
    { value: '500+', label: 'კმაყოფილი კლიენტი' },
    { value: '200+', label: 'მცენარის სახეობა' },
    { value: '50+', label: 'პარტნიორი' },
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    // Angular sets `muted` as an attribute only, so browsers treat the video
    // as unmuted and block autoplay. Set the property and start playback.
    const video = this.bgVideo?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      /* autoplay blocked (e.g. low-power mode) — first frame stays as poster */
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide.update((i) => (i + 1) % this.slides.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  scrollToContent(): void {
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      const nextSection = heroEl.nextElementSibling as HTMLElement;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: heroEl.clientHeight,
          behavior: 'smooth',
        });
      }
    }
  }
}
