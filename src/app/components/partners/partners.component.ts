import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicContentService, PublicPartner } from '../../services/public-content.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent implements OnInit {
  private readonly contentApi = inject(PublicContentService);
  readonly partners = signal<PublicPartner[]>([]);

  ngOnInit(): void {
    this.contentApi.getPartners().subscribe({
      next: (partners) => this.partners.set(partners),
    });
  }

}
