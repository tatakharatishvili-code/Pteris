import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  name: string;
  category: string;
  price: string;
  description: string;
  badge?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  activeCategory = signal('all');

  categories = [
    { id: 'all', label: 'ყველა' },
    { id: 'indoor', label: 'ინტერიერის' },
    { id: 'outdoor', label: 'ექსტერიერის' },
    { id: 'rare', label: 'იშვიათი' },
    { id: 'succulent', label: 'სუკულენტები' },
  ];

  products: Product[] = [
    { name: 'მონსტერა დელიციოსა', category: 'indoor', price: '89 ₾', description: 'პოპულარული ტროპიკული მცენარე დიდი, ნაჭრილი ფოთლებით.', badge: 'ბესტსელერი' },
    { name: 'ფიკუს ლირატა', category: 'indoor', price: '120 ₾', description: 'ელეგანტური ვიკინურა ფოთლებით — იდეალური ინტერიერისთვის.' },
    { name: 'სტრელიცია ნიკოლაი', category: 'indoor', price: '150 ₾', description: 'გიგანტური ბანანისმაგვარი ფოთლები — ტროპიკული ატმოსფეროსთვის.', badge: 'ახალი' },
    { name: 'ზეთისხილი (Olea)', category: 'outdoor', price: '220 ₾', description: 'მედიტერანული კლასიკა — იდეალური ტერასებისა და ბაღებისთვის.' },
    { name: 'ლავანდა', category: 'outdoor', price: '35 ₾', description: 'სურნელოვანი მრავალწლოვანი — თაფლოვანი, არომატული ბაღისთვის.' },
    { name: 'ფილოდენდრონ პინკ პრინცესი', category: 'rare', price: '350 ₾', description: 'იშვიათი ვარიეგატული ფილოდენდრონი ვარდისფერი ფოთლებით.', badge: 'ლიმიტირებული' },
    { name: 'ეჩევერია "Lola"', category: 'succulent', price: '25 ₾', description: 'კომპაქტური ვარდისებრი სუკულენტი ლავენდისფერი ელფერით.' },
    { name: 'ალოე ვერა', category: 'succulent', price: '30 ₾', description: 'სამკურნალო თვისებებით სავსე, მოვლაში მარტივი მცენარე.' },
  ];

  get filteredProducts(): Product[] {
    const cat = this.activeCategory();
    return cat === 'all' ? this.products : this.products.filter((p) => p.category === cat);
  }

  setCategory(id: string): void {
    this.activeCategory.set(id);
  }
}
