import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicContentService, PublicLesson } from '../../services/public-content.service';

@Component({
  selector: 'app-care',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './care.component.html',
  styleUrl: './care.component.scss',
})
export class CareComponent implements OnInit {
  private readonly contentApi = inject(PublicContentService);
  readonly lessons = signal<PublicLesson[]>([]);

  ngOnInit(): void {
    this.contentApi.getLessons().subscribe({
      next: (lessons) => this.lessons.set(lessons.slice(0, 3)),
    });
  }
}
