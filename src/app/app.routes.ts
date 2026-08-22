import { Routes } from '@angular/router';
import { authGuard } from './admin/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/pages/login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/pages/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./admin/pages/services/admin-services.component').then(
            (m) => m.AdminServicesComponent
          ),
      },
      {
        path: 'results',
        loadComponent: () =>
          import('./admin/pages/results/admin-results.component').then(
            (m) => m.AdminResultsComponent
          ),
      },
    ],
  },
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
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(
        (m) => m.ContactPageComponent
      ),
  },
];
