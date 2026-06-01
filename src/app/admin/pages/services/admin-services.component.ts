import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AdminServiceEntity,
  AdminServicesService,
  UpsertServicePayload,
} from '../../services/admin-services.service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.scss',
})
export class AdminServicesComponent implements OnInit {
  private readonly servicesApi = inject(AdminServicesService);

  readonly services = signal<AdminServiceEntity[]>([]);
  readonly selectedId = signal<string | null>(null);

  formName = '';
  formShortDescription = '';
  formLongDescription = '';
  formFeaturesText = '';
  formIconFile: File | null = null;

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly formError = signal<string | null>(null);
  readonly pageError = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly isEditing = computed(() => !!this.selectedId());
  readonly iconPreview = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll(): void {
    this.loading.set(true);
    this.pageError.set(null);

    this.servicesApi.getAll().subscribe({
      next: (services) => {
        this.services.set(services);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.pageError.set(
          err?.error?.message || 'სერვისების ჩატვირთვა ვერ მოხერხდა'
        );
      },
    });
  }

  onCreateNew(): void {
    this.selectedId.set(null);
    this.formName = '';
    this.formShortDescription = '';
    this.formLongDescription = '';
    this.formFeaturesText = '';
    this.formIconFile = null;
    this.iconPreview.set(null);
    this.formError.set(null);
    this.successMessage.set(null);
  }

  onSelectForEdit(service: AdminServiceEntity): void {
    this.formError.set(null);
    this.successMessage.set(null);

    this.servicesApi.getById(service._id).subscribe({
      next: (fullService) => {
        this.selectedId.set(fullService._id);
        this.formName = fullService.name;
        this.formShortDescription = fullService.shortDescription;
        this.formLongDescription = fullService.longDescription;
        this.formFeaturesText = (fullService.features || []).join('\n');
        this.formIconFile = null;
        this.iconPreview.set(fullService.icon || null);
      },
      error: (err) => {
        this.formError.set(
          err?.error?.message || 'სერვისის დეტალების წამოღება ვერ მოხერხდა'
        );
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.formIconFile = file;

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.iconPreview.set(typeof reader.result === 'string' ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (
      !this.formName.trim() ||
      !this.formShortDescription.trim() ||
      !this.formLongDescription.trim()
    ) {
      this.formError.set('Name, short description და long description სავალდებულოა');
      return;
    }

    this.formError.set(null);
    this.successMessage.set(null);
    this.saving.set(true);

    const payload: UpsertServicePayload = {
      name: this.formName,
      shortDescription: this.formShortDescription,
      longDescription: this.formLongDescription,
      features: this.parseFeatures(this.formFeaturesText),
      iconFile: this.formIconFile,
    };

    const selectedId = this.selectedId();
    const request$ = selectedId
      ? this.servicesApi.update(selectedId, payload)
      : this.servicesApi.create(payload);

    request$.subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.fetchAll();

        this.selectedId.set(saved._id);
        this.formName = saved.name;
        this.formShortDescription = saved.shortDescription;
        this.formLongDescription = saved.longDescription;
        this.formFeaturesText = (saved.features || []).join('\n');
        this.formIconFile = null;
        this.iconPreview.set(saved.icon || this.iconPreview());
        this.successMessage.set(
          selectedId
            ? 'სერვისი წარმატებით განახლდა'
            : 'სერვისი წარმატებით დაემატა'
        );
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(err?.error?.message || 'დაფიქსირდა შეცდომა შენახვისას');
      },
    });
  }

  onDelete(service: AdminServiceEntity): void {
    const accepted = window.confirm(`წავშალოთ სერვისი: ${service.name}?`);
    if (!accepted) {
      return;
    }

    this.deletingId.set(service._id);
    this.successMessage.set(null);
    this.formError.set(null);

    this.servicesApi.delete(service._id).subscribe({
      next: () => {
        this.deletingId.set(null);

        if (this.selectedId() === service._id) {
          this.onCreateNew();
        }

        this.fetchAll();
        this.successMessage.set('სერვისი წარმატებით წაიშალა');
      },
      error: (err) => {
        this.deletingId.set(null);
        this.formError.set(err?.error?.message || 'წაშლა ვერ შესრულდა');
      },
    });
  }

  trackById(_: number, service: AdminServiceEntity): string {
    return service._id;
  }

  private parseFeatures(raw: string): string[] {
    return raw
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => !!item);
  }
}
