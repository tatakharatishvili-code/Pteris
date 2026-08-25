import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminContentService, AdminMessage } from '../../services/admin-content.service';

@Component({ selector: 'app-admin-messages', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './admin-messages.component.html', styleUrl: './admin-messages.component.scss' })
export class AdminMessagesComponent implements OnInit {
  private readonly api = inject(AdminContentService);
  readonly items = signal<AdminMessage[]>([]); readonly selectedId = signal<string | null>(null);
  readonly loading = signal(false); readonly saving = signal(false); readonly deletingId = signal<string | null>(null);
  readonly error = signal<string | null>(null); readonly success = signal<string | null>(null);
  name = ''; email = ''; phone = ''; message = '';

  ngOnInit(): void { this.load(); }
  load(): void { this.loading.set(true); this.error.set(null); this.api.getMessages().subscribe({ next: (items) => { this.items.set(items); this.loading.set(false); }, error: (error) => { this.error.set(this.toMessage(error, 'შეტყობინებები ვერ ჩაიტვირთა')); this.loading.set(false); } }); }
  select(item: AdminMessage): void { this.selectedId.set(item._id); this.name = item.name; this.email = item.email; this.phone = item.phone ?? ''; this.message = item.message; this.error.set(null); this.success.set(null); }
  submit(): void {
    const id = this.selectedId();
    if (!id || !this.name.trim() || !this.email.trim() || !this.message.trim()) { this.error.set('სახელი, ელფოსტა და შეტყობინება სავალდებულოა'); return; }
    this.saving.set(true); this.error.set(null); this.success.set(null);
    this.api.updateMessage(id, { name: this.name.trim(), email: this.email.trim(), phone: this.phone.trim(), message: this.message.trim() }).subscribe({ next: (saved) => { this.items.update((items) => items.map((item) => item._id === id ? saved : item)); this.select(saved); this.success.set('შეტყობინება განახლდა'); this.saving.set(false); }, error: (error) => { this.error.set(this.toMessage(error, 'შეტყობინება ვერ განახლდა')); this.saving.set(false); } });
  }
  remove(item: AdminMessage): void {
    if (!window.confirm(`წავშალოთ ${item.name}-ის შეტყობინება?`)) return;
    this.deletingId.set(item._id); this.api.deleteMessage(item._id).subscribe({ next: () => { this.items.update((items) => items.filter((entry) => entry._id !== item._id)); if (this.selectedId() === item._id) this.selectedId.set(null); this.success.set('შეტყობინება წაიშალა'); this.deletingId.set(null); }, error: (error) => { this.error.set(this.toMessage(error, 'შეტყობინება ვერ წაიშალა')); this.deletingId.set(null); } });
  }
  formatDate(value?: string): string { return value ? new Intl.DateTimeFormat('ka-GE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : ''; }
  private toMessage(error: any, fallback: string): string { return error?.error?.message ?? fallback; }
}