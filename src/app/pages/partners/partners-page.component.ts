import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { PublicContentService, PublicPartner } from '../../services/public-content.service';

export interface Partner {
    name: string;
    type: string;
    category: 'hotel' | 'finance' | 'retail' | 'private' | 'restaurant';
    description: string;
    projects: string;
    since: string;
}

@Component({
    selector: 'app-partners-page',
    standalone: true,
    imports: [CommonModule, PageHeroComponent],
    templateUrl: './partners-page.component.html',
    styleUrl: './partners-page.component.scss',
})
export class PartnersPageComponent implements OnInit {
    private readonly contentApi = inject(PublicContentService);
    activeFilter: string = 'all';
    readonly partners = signal<PublicPartner[]>([]);
    readonly loading = signal(true);
    readonly error = signal<string | null>(null);
    readonly categories = computed(() => ['all', ...new Set(this.partners().map((partner) => partner.category))]);
    readonly projectCount = computed(() => this.partners().reduce((total, partner) => total + partner.projectCount, 0));
    readonly earliestYear = computed(() => this.partners().length ? Math.min(...this.partners().map((partner) => partner.partnershipYear)) : null);

    ngOnInit(): void {
        this.contentApi.getPartners().subscribe({
            next: (partners) => { this.partners.set(partners); this.loading.set(false); },
            error: () => { this.error.set('პარტნიორების ჩატვირთვა ვერ მოხერხდა'); this.loading.set(false); },
        });
    }

    get filteredPartners(): PublicPartner[] {
        if (this.activeFilter === 'all') return this.partners();
        return this.partners().filter((partner) => partner.category === this.activeFilter);
    }

    setFilter(key: string): void {
        this.activeFilter = key;
    }

}
