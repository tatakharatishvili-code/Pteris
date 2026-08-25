import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminContentService, AdminLesson, LessonPayload, NamedDescription } from '../../services/admin-content.service';

@Component({ selector: 'app-admin-lessons', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './admin-lessons.component.html', styleUrl: './admin-lessons.component.scss' })
export class AdminLessonsComponent implements OnInit {
  private readonly api = inject(AdminContentService);
  readonly items = signal<AdminLesson[]>([]);
  readonly selectedId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly isEditing = computed(() => this.selectedId() !== null);

  name = ''; shortDescription = ''; longDescription = ''; steps = ''; videos = ''; advices = '';

  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading.set(true); this.error.set(null);
    this.api.getLessons().subscribe({
      next: (items) => { this.items.set(items); this.loading.set(false); },
      error: (error) => { this.error.set(this.message(error, 'გაკვეთილები ვერ ჩაიტვირთა')); this.loading.set(false); },
    });
  }
  select(item: AdminLesson): void {
    this.selectedId.set(item._id); this.name = item.name; this.shortDescription = item.shortDescription;
    this.longDescription = item.longDescription; this.steps = this.joinPairs(item.steps);
    this.videos = this.join(item.videos); this.advices = this.join(item.advices); this.clearNotices();
  }
  reset(): void {
    this.selectedId.set(null); this.name = ''; this.shortDescription = ''; this.longDescription = '';
    this.steps = ''; this.videos = ''; this.advices = ''; this.clearNotices();
  }
  submit(): void {
    if (!this.name.trim() || !this.shortDescription.trim() || !this.longDescription.trim()) {
      this.error.set('სახელი, მოკლე და სრული აღწერა სავალდებულოა'); return;
    }
    const payload: LessonPayload = { name: this.name.trim(), shortDescription: this.shortDescription.trim(), longDescription: this.longDescription.trim(), steps: this.pairs(this.steps), videos: this.lines(this.videos), advices: this.lines(this.advices) };
    const id = this.selectedId(); this.saving.set(true); this.clearNotices();
    const request = id ? this.api.updateLesson(id, payload) : this.api.createLesson(payload);
    request.subscribe({
      next: (saved) => { this.saving.set(false); this.items.update((items) => id ? items.map((item) => item._id === id ? saved : item) : [saved, ...items]); this.select(saved); this.success.set(id ? 'გაკვეთილი განახლდა' : 'გაკვეთილი დაემატა'); },
      error: (error) => { this.error.set(this.message(error, 'გაკვეთილი ვერ შეინახა')); this.saving.set(false); },
    });
  }
  remove(item: AdminLesson): void {
    if (!window.confirm(`წავშალოთ გაკვეთილი „${item.name}“?`)) return;
    this.deletingId.set(item._id);
    this.api.deleteLesson(item._id).subscribe({
      next: () => { this.items.update((items) => items.filter((entry) => entry._id !== item._id)); if (this.selectedId() === item._id) this.reset(); this.success.set('გაკვეთილი წაიშალა'); this.deletingId.set(null); },
      error: (error) => { this.error.set(this.message(error, 'გაკვეთილი ვერ წაიშალა')); this.deletingId.set(null); },
    });
  }
  private lines(value: string): string[] { return value.split('\n').map((line) => line.trim()).filter(Boolean); }
  private pairs(value: string): NamedDescription[] { return this.lines(value).map((line) => { const [name, ...description] = line.split('|'); return { name: name.trim(), description: description.join('|').trim() }; }).filter((item) => item.name && item.description); }
  private join(value: string[] = []): string { return value.join('\n'); }
  private joinPairs(value: NamedDescription[] = []): string { return value.map((item) => `${item.name} | ${item.description}`).join('\n'); }
  private clearNotices(): void { this.error.set(null); this.success.set(null); }
  private message(error: any, fallback: string): string { return error?.error?.message ?? fallback; }
}