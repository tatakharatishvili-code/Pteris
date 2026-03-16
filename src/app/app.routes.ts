import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page.component').then(
        (m) => m.AboutPageComponent
      ),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services-page.component').then(
        (m) => m.ServicesPageComponent
      ),
  },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent
      ),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./pages/results/results-page.component').then(
        (m) => m.ResultsPageComponent
      ),
  },
  {
    path: 'results/:slug',
    loadComponent: () =>
      import('./pages/result-detail/result-detail.component').then(
        (m) => m.ResultDetailComponent
      ),
  },
  {
    path: 'partners',
    loadComponent: () =>
      import('./pages/partners/partners-page.component').then(
        (m) => m.PartnersPageComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products-page.component').then(
        (m) => m.ProductsPageComponent
      ),
  },
  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: 'care',
    loadComponent: () =>
      import('./pages/care/care-page.component').then(
        (m) => m.CarePageComponent
      ),
  },
  {
    path: 'care/:slug',
    loadComponent: () =>
      import('./pages/care-detail/care-detail.component').then(
        (m) => m.CareDetailComponent
      ),
  },
];
