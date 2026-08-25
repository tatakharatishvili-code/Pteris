import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminContentService, AdminProduct, NamedDescription, ProductPayload } from '../../services/admin-content.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit {
  private readonly api = inject(AdminContentService);

  readonly items = signal<AdminProduct[]>([]);
  readonly selectedId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly isEditing = computed(() => this.selectedId() !== null);

  name = '';
  price: number | null = null;
  volume = '';
  characteristics = '';
  instructions = '';
  composition = '';
  tips = '';

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getProducts().subscribe({
      next: (items) => { this.items.set(items); this.loading.set(false); },
      error: (error) => { this.error.set(this.message(error, 'პროდუქტები ვერ ჩაიტვირთა')); this.loading.set(false); },
    });
  }

  select(item: AdminProduct): void {
    this.selectedId.set(item._id);
    this.name = item.name;
    this.price = item.price;
    this.volume = item.volume ?? '';
    this.characteristics = this.joinLines(item.characteristics);
    this.instructions = this.joinPairs(item.instructions);
    this.composition = this.joinLines(item.composition);
    this.tips = this.joinLines(item.tips);
    this.clearNotices();
  }

  reset(): void {
    this.selectedId.set(null);
    this.name = '';
    this.price = null;
    this.volume = '';
    this.characteristics = '';
    this.instructions = '';
    this.composition = '';
    this.tips = '';
    this.clearNotices();
  }

  submit(): void {
    if (!this.name.trim() || this.price === null || this.price < 0) {
      this.error.set('სახელი და სწორი ფასი სავალდებულოა');
      return;
    }
    const payload: ProductPayload = {
      name: this.name.trim(),
      price: this.price,
      volume: this.volume.trim(),
      characteristics: this.lines(this.characteristics),
      instructions: this.pairs(this.instructions),
      composition: this.lines(this.composition),
      tips: this.lines(this.tips),
    };
    const id = this.selectedId();
    this.saving.set(true);
    this.clearNotices();
    const request = id ? this.api.updateProduct(id, payload) : this.api.createProduct(payload);
    request.subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.success.set(id ? 'პროდუქტი განახლდა' : 'პროდუქტი დაემატა');
        this.items.update((items) => id ? items.map((item) => item._id === id ? saved : item) : [saved, ...items]);
        this.selectWithoutClearing(saved);
      },
      error: (error) => { this.error.set(this.message(error, 'პროდუქტი ვერ შეინახა')); this.saving.set(false); },
    });
  }

  remove(item: AdminProduct): void {
    if (!window.confirm(`წავშალოთ პროდუქტი „${item.name}“?`)) return;
    this.deletingId.set(item._id);
    this.api.deleteProduct(item._id).subscribe({
      next: () => {
        this.items.update((items) => items.filter((entry) => entry._id !== item._id));
        if (this.selectedId() === item._id) this.reset();
        this.success.set('პროდუქტი წაიშალა');
        this.deletingId.set(null);
      },
      error: (error) => { this.error.set(this.message(error, 'პროდუქტი ვერ წაიშალა')); this.deletingId.set(null); },
    });
  }

  private selectWithoutClearing(item: AdminProduct): void {
    const notice = this.success();
    this.select(item);
    this.success.set(notice);
  }
  private lines(value: string): string[] { return value.split('\n').map((line) => line.trim()).filter(Boolean); }
  private pairs(value: string): NamedDescription[] { return this.lines(value).map((line) => { const [name, ...description] = line.split('|'); return { name: name.trim(), description: description.join('|').trim() }; }).filter((item) => item.name && item.description); }
  private joinLines(value: string[] = []): string { return value.join('\n'); }
  private joinPairs(value: NamedDescription[] = []): string { return value.map((item) => `${item.name} | ${item.description}`).join('\n'); }
  private clearNotices(): void { this.error.set(null); this.success.set(null); }
  private message(error: any, fallback: string): string { return error?.error?.message ?? fallback; }
}