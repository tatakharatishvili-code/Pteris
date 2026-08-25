import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AdminContentService } from '../../services/admin-content.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly contentApi = inject(AdminContentService);

  readonly loading = signal(true);
  readonly counts = signal({ products: 0, lessons: 0, coworkers: 0, messages: 0 });

  ngOnInit(): void {
    forkJoin({
      products: this.contentApi.getProducts(),
      lessons: this.contentApi.getLessons(),
      coworkers: this.contentApi.getCoworkers(),
      messages: this.contentApi.getMessages(),
    }).subscribe({
      next: (data) => {
        this.counts.set({ products: data.products.length, lessons: data.lessons.length, coworkers: data.coworkers.length, messages: data.messages.length });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
