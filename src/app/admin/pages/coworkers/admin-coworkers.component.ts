import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminContentService, AdminCoworker, CoworkerPayload } from '../../services/admin-content.service';

@Component({ selector: 'app-admin-coworkers', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './admin-coworkers.component.html', styleUrl: './admin-coworkers.component.scss' })
export class AdminCoworkersComponent implements OnInit {
  private readonly api = inject(AdminContentService);
  readonly items = signal<AdminCoworker[]>([]); readonly selectedId = signal<string | null>(null);
  readonly loading = signal(false); readonly saving = signal(false); readonly deletingId = signal<string | null>(null);
  readonly error = signal<string | null>(null); readonly success = signal<string | null>(null);
  readonly preview = signal<string | null>(null); readonly isEditing = computed(() => this.selectedId() !== null);
  name = ''; position = ''; description = ''; image: File | null = null;

  ngOnInit(): void { this.load(); }
  load(): void { this.loading.set(true); this.error.set(null); this.api.getCoworkers().subscribe({ next: (items) => { this.items.set(items); this.loading.set(false); }, error: (error) => { this.error.set(this.message(error, 'გუნდი ვერ ჩაიტვირთა')); this.loading.set(false); } }); }
  select(item: AdminCoworker): void { this.selectedId.set(item._id); this.name = item.name; this.position = item.position; this.description = item.description; this.image = null; this.preview.set(item.image ?? null); this.clearNotices(); }
  reset(): void { this.selectedId.set(null); this.name = ''; this.position = ''; this.description = ''; this.image = null; this.preview.set(null); this.clearNotices(); }
  fileChanged(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) { this.error.set('სურათის მაქსიმალური ზომაა 5MB'); return; }
    this.image = file;
    if (file) { const reader = new FileReader(); reader.onload = () => this.preview.set(String(reader.result)); reader.readAsDataURL(file); }
  }
  submit(): void {
    if (!this.name.trim() || !this.position.trim() || !this.description.trim()) { this.error.set('სახელი, პოზიცია და აღწერა სავალდებულოა'); return; }
    const payload: CoworkerPayload = { name: this.name, position: this.position, description: this.description, image: this.image };
    const id = this.selectedId(); this.saving.set(true); this.clearNotices();
    const request = id ? this.api.updateCoworker(id, payload) : this.api.createCoworker(payload);
    request.subscribe({ next: (saved) => { this.saving.set(false); this.items.update((items) => id ? items.map((item) => item._id === id ? saved : item) : [saved, ...items]); this.select(saved); this.success.set(id ? 'თანამშრომელი განახლდა' : 'თანამშრომელი დაემატა'); }, error: (error) => { this.error.set(this.message(error, 'თანამშრომელი ვერ შეინახა')); this.saving.set(false); } });
  }
  remove(item: AdminCoworker): void {
    if (!window.confirm(`წავშალოთ თანამშრომელი „${item.name}“?`)) return;
    this.deletingId.set(item._id); this.api.deleteCoworker(item._id).subscribe({ next: () => { this.items.update((items) => items.filter((entry) => entry._id !== item._id)); if (this.selectedId() === item._id) this.reset(); this.success.set('თანამშრომელი წაიშალა'); this.deletingId.set(null); }, error: (error) => { this.error.set(this.message(error, 'თანამშრომელი ვერ წაიშალა')); this.deletingId.set(null); } });
  }
  private clearNotices(): void { this.error.set(null); this.success.set(null); }
  private message(error: any, fallback: string): string { return error?.error?.message ?? fallback; }
}