import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ResultsComponent } from '../../components/results/results.component';
import { PartnersComponent } from '../../components/partners/partners.component';
import { ProductsComponent } from '../../components/products/products.component';
import { CareComponent } from '../../components/care/care.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    ResultsComponent,
    PartnersComponent,
    ProductsComponent,
    CareComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
