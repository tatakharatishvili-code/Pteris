import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicContentService, PublicProduct } from '../../services/public-content.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly contentApi = inject(PublicContentService);
  readonly products = signal<PublicProduct[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.contentApi.getProducts().subscribe({
      next: (products) => {
        this.products.set(products.slice(0, 4));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
