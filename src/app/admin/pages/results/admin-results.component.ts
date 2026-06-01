import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AdminResultEntity,
  AdminResultsService,
  UpsertResultPayload,
} from '../../services/admin-results.service';

@Component({
  selector: 'app-admin-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-results.component.html',
  styleUrl: './admin-results.component.scss',
})
export class AdminResultsComponent implements OnInit {
  private readonly resultsApi = inject(AdminResultsService);

  readonly results = signal<AdminResultEntity[]>([]);
  readonly selectedId = signal<string | null>(null);

  formCategory = '';
  formClient = '';
  formLocation = '';
  formYear: number = new Date().getFullYear();
  formPlantsCount = '';
  formArea = '';
  formDuration = '';

  formBeforeImageFile: File | null = null;
  formAfterImageFile: File | null = null;
  formImageFiles: File[] = [];

  readonly beforeImagePreview = signal<string | null>(null);
  readonly afterImagePreview = signal<string | null>(null);
  readonly imagePreviews = signal<string[]>([]);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly formError = signal<string | null>(null);
  readonly pageError = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly isEditing = computed(() => !!this.selectedId());

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll(): void {
    this.loading.set(true);
    this.pageError.set(null);

    this.resultsApi.getAll().subscribe({
      next: (results) => {
        this.results.set(results);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.pageError.set(err?.error?.message || 'შედეგების ჩატვირთვა ვერ მოხერხდა');
      },
    });
  }

  onCreateNew(): void {
    this.selectedId.set(null);
    this.formCategory = '';
    this.formClient = '';
    this.formLocation = '';
    this.formYear = new Date().getFullYear();
    this.formPlantsCount = '';
    this.formArea = '';
    this.formDuration = '';
    this.formBeforeImageFile = null;
    this.formAfterImageFile = null;
    this.formImageFiles = [];
    this.beforeImagePreview.set(null);
    this.afterImagePreview.set(null);
    this.imagePreviews.set([]);
    this.formError.set(null);
    this.successMessage.set(null);
  }

  onSelectForEdit(result: AdminResultEntity): void {
    this.formError.set(null);
    this.successMessage.set(null);

    this.resultsApi.getById(result._id).subscribe({
      next: (r) => {
        this.selectedId.set(r._id);
        this.formCategory = r.category;
        this.formClient = r.client;
        this.formLocation = r.location;
        this.formYear = r.year;
        this.formPlantsCount = r.plantsCount;
        this.formArea = r.area;
        this.formDuration = r.duration;
        this.formBeforeImageFile = null;
        this.formAfterImageFile = null;
        this.formImageFiles = [];
        this.beforeImagePreview.set(r.beforeImage || null);
        this.afterImagePreview.set(r.afterImage || null);
        this.imagePreviews.set(r.images || []);
      },
      error: (err) => {
        this.formError.set(err?.error?.message || 'შედეგის დეტალების წამოღება ვერ მოხერხდა');
      },
    });
  }

  onBeforeImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.formBeforeImageFile = file;
    if (file) this.previewFile(file, (url) => this.beforeImagePreview.set(url));
  }

  onAfterImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.formAfterImageFile = file;
    if (file) this.previewFile(file, (url) => this.afterImagePreview.set(url));
  }

  onImagesChange(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    this.formImageFiles = files;
    const previews: string[] = [];
    let loaded = 0;
    if (!files.length) {
      this.imagePreviews.set([]);
      return;
    }
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews[i] = reader.result as string;
        loaded++;
        if (loaded === files.length) this.imagePreviews.set([...previews]);
      };
      reader.readAsDataURL(file);
    });
  }

  onSubmit(): void {
    if (
      !this.formCategory.trim() ||
      !this.formClient.trim() ||
      !this.formLocation.trim() ||
      !this.formYear ||
      !this.formPlantsCount.trim() ||
      !this.formArea.trim() ||
      !this.formDuration.trim()
    ) {
      this.formError.set('ყველა სავალდებულო ველი უნდა შეივსოს');
      return;
    }

    this.formError.set(null);
    this.successMessage.set(null);
    this.saving.set(true);

    const payload: UpsertResultPayload = {
      category: this.formCategory,
      client: this.formClient,
      location: this.formLocation,
      year: this.formYear,
      plantsCount: this.formPlantsCount,
      area: this.formArea,
      duration: this.formDuration,
      beforeImageFile: this.formBeforeImageFile,
      afterImageFile: this.formAfterImageFile,
      imageFiles: this.formImageFiles.length ? this.formImageFiles : undefined,
    };

    const selectedId = this.selectedId();
    const request$ = selectedId
      ? this.resultsApi.update(selectedId, payload)
      : this.resultsApi.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.fetchAll();
        this.selectedId.set(saved._id);
        this.formCategory = saved.category;
        this.formClient = saved.client;
        this.formLocation = saved.location;
        this.formYear = saved.year;
        this.formPlantsCount = saved.plantsCount;
        this.formArea = saved.area;
        this.formDuration = saved.duration;
        this.formBeforeImageFile = null;
        this.formAfterImageFile = null;
        this.formImageFiles = [];
        this.beforeImagePreview.set(saved.beforeImage || this.beforeImagePreview());
        this.afterImagePreview.set(saved.afterImage || this.afterImagePreview());
        this.imagePreviews.set(saved.images || this.imagePreviews());
        this.successMessage.set(
          selectedId ? 'შედეგი წარმატებით განახლდა' : 'შედეგი წარმატებით დაემატა'
        );
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(err?.error?.message || 'დაფიქსირდა შეცდომა შენახვისას');
      },
    });
  }

  onDelete(result: AdminResultEntity): void {
    const accepted = window.confirm(`წავშალოთ შედეგი: ${result.client} — ${result.category}?`);
    if (!accepted) return;

    this.deletingId.set(result._id);
    this.successMessage.set(null);
    this.formError.set(null);

    this.resultsApi.delete(result._id).subscribe({
      next: () => {
        this.deletingId.set(null);
        if (this.selectedId() === result._id) this.onCreateNew();
        this.fetchAll();
        this.successMessage.set('შედეგი წარმატებით წაიშალა');
      },
      error: (err) => {
        this.deletingId.set(null);
        this.formError.set(err?.error?.message || 'წაშლა ვერ შესრულდა');
      },
    });
  }

  trackById(_: number, result: AdminResultEntity): string {
    return result._id;
  }

  private previewFile(file: File, cb: (url: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result as string);
    reader.readAsDataURL(file);
  }
}
