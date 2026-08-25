import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicContentService, PublicResult } from '../../services/public-content.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  private readonly contentApi = inject(PublicContentService);
  readonly projects = signal<PublicResult[]>([]);
  readonly loading = signal(true);

  sliderPositions: Record<string, number> = {};

  ngOnInit(): void {
    this.contentApi.getResults().subscribe({
      next: (projects) => {
        this.projects.set(projects.slice(0, 4));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  getSliderPosition(slug: string): number {
    return this.sliderPositions[slug] ?? 50;
  }

  onSliderMove(event: MouseEvent | TouchEvent, slug: string, element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    this.sliderPositions[slug] = (x / rect.width) * 100;
  }

  imageBackground(url: string, fallback: string): string {
    return url ? `center / cover no-repeat url("${url}")` : fallback;
  }
}
